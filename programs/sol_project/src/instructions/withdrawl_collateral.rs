use anchor_lang::prelude::*;
use anchor_spl::token::{self, Token, TokenAccount, Transfer};
use crate::error::LendingError;
use crate::instructions::{get_pyth_price, sync_interest};
use crate::state::*;

#[derive(Accounts)]
pub struct WithdrawCollateral<'info> {
    
    pub asset_config: Account<'info, AssetConfig>,
    #[account(mut, has_one = owner)]
    pub user_position: Account<'info, UserPosition>,
    pub market: Account<'info, Market>,

    #[account(mut)]
    pub vault_token_account: Account<'info, TokenAccount>,
    #[account(mut)]
    pub user_token_account: Account<'info, TokenAccount>,

    /// CHECK: PDA Signer
    #[account(seeds = [b"vault", market.key().as_ref()], bump)]
    pub vault_authority: AccountInfo<'info>,
    /// CHECK: This is the Pyth Price Feed account for Asset
    pub pyth_price_feed: AccountInfo<'info>,
    pub owner: Signer<'info>,
    pub token_program: Program<'info, Token>,
}

pub fn withdrawl_handler(ctx: Context<WithdrawCollateral>, amount: u64) -> Result<()> {
    let user_position = &mut ctx.accounts.user_position;
    let asset_config = &ctx.accounts.asset_config;
    let market= &ctx.accounts.market;

    require!(
        user_position.collateral_mint == asset_config.asset_mint,
        LendingError::InvalidAsset
    );

    sync_interest(user_position, market)?;

    require!(
        user_position.borrow_amount == 0,
        LendingError::ActiveDebtRemaining
    );

    let remaining_amount = user_position.collateral_amount.checked_sub(amount)
        .ok_or(LendingError::InsufficientCollateral)?;
    let asset_price = get_pyth_price(&ctx.accounts.pyth_price_feed)?;


    let remaining_value = (remaining_amount as u128)
        .checked_mul(asset_price as u128).unwrap()
        .checked_div(10u128.pow(asset_config.decimals as u32)).unwrap();
    
    let max_borrow_allowed = (remaining_value * asset_config.ltv as u128) / 10000;
    
    require!(
        (user_position.borrow_amount as u128) <= max_borrow_allowed,
        LendingError::WithdrawalWouldTriggerLiquidation
    );
    
    user_position.collateral_amount = remaining_amount;

    let market_key = ctx.accounts.market.key();
    let seeds = &[
        b"vault".as_ref(),
        market_key.as_ref(),
        &[ctx.bumps.vault_authority],
    ];
    let signer = &[&seeds[..]];

    let cpi_accounts = Transfer {
        from: ctx.accounts.vault_token_account.to_account_info(),
        to: ctx.accounts.user_token_account.to_account_info(),
        authority: ctx.accounts.vault_authority.to_account_info(),
    };

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