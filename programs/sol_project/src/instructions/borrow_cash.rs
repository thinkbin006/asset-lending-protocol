use anchor_lang::prelude::*;
use anchor_spl::token::{self, Transfer, Token, TokenAccount};
use pyth_sdk_solana::load_price_feed_from_account_info;
use crate::accrued_interest::*;
use crate::state::*;
use crate::error::LendingError;
use crate::pyth_price_handler::get_pyth_price;

pub fn borrow_handler(ctx: Context<BorrowCash>, amount: u64) -> Result<()> {
    let user_position = &mut ctx.accounts.user_position;
    let market = &ctx.accounts.market.key();
    let asset_config = &ctx.accounts.asset_config;

    sync_interest(user_position)?;

    let asset_price = get_pyth_price(&ctx.accounts.pyth_price_feed)?;
    let collateral_value = (user_position.collateral_amount as u128)
        .checked_mul(asset_price as u128).unwrap()
        .checked_div(10u128.pow(asset_config.decimals as u32)).unwrap();    
    
    let max_borrow = (collateral_value * asset_config.ltv as u128) / 10000;

    let new_total_debt = (user_position.borrow_amount as u128)
                        .checked_add(amount as u128)
                        .unwrap();
    
    require!(
        new_total_debt <= max_borrow.into(),
        LendingError::InsufficientCollateral
    );

    user_position.borrow_amount += amount;

    let new_total_borrowed = ctx.accounts.market.total_borrowed_cash
    .checked_add(amount)
    .ok_or(LendingError::MathOverflow)?;

    require!(
        new_total_borrowed <= ctx.accounts.market.max_borrow_cap,
        LendingError::GlobalBorrowCapReached
    );
    
    ctx.accounts.market.total_borrowed_cash = new_total_borrowed;
    
    let cpi_accounts = Transfer {
        from: ctx.accounts.vault_cash_account.to_account_info(),
        to: ctx.accounts.user_cash_account.to_account_info(),
        authority: ctx.accounts.vault_authority.to_account_info(),
    };

    let seeds=&[
        b"vault".as_ref(),
        market.as_ref(),
        &[ctx.bumps.vault_authority],
    ];

    let signer = &[&seeds[..]];
    token::transfer(
            CpiContext::new_with_signer(
            ctx.accounts.token_program.to_account_info(),
            cpi_accounts,
            signer,
        ),
        amount,
    )?;

    Ok(())
}

#[derive(Accounts)]
pub struct BorrowCash<'info> {
    pub asset_config: Account<'info, AssetConfig>,
    #[account(mut)]
    pub market: Account<'info, Market>,
    /// CHECK: This is a PDA used as a signing authority for the vault. 
    /// Its safety is guaranteed by the seeds and bump constraints.
    #[account(
        seeds = [b"vault", market.key().as_ref()], 
        bump
    )]
    pub vault_authority: AccountInfo<'info>,

    /// CHECK: This is the Pyth Price Feed account for Asset
    pub pyth_price_feed: AccountInfo<'info>,

    #[account(mut, has_one = owner)]
    pub user_position: Account<'info, UserPosition>,
    #[account(mut)]
    pub vault_cash_account: Account<'info, TokenAccount>,
    #[account(mut)]
    pub user_cash_account: Account<'info, TokenAccount>,
    pub owner: Signer<'info>,
    pub token_program: Program<'info,Token>,
}