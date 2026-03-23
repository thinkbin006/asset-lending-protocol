use anchor_lang::prelude::*;
use anchor_spl::token::{self, Transfer, Token, TokenAccount};
use crate::state::*;
use crate::error::LendingError;
use crate::pyth_price_handler::*;
use crate::accrued_interest::*;

pub fn liquidation_handler(ctx: Context<Liquidate>, repay_amount: u64) -> Result<()> {
    let asset_config = &ctx.accounts.asset_config;
    let user_position= &mut ctx.accounts.user_position;
    let market = &ctx.accounts.market;

    sync_interest(user_position, market)?;


    let asset_price = get_pyth_price(&ctx.accounts.pyth_price_feed)?;

    let collateral_value = (user_position.collateral_amount as u128)
        .checked_mul(asset_price as u128).unwrap()
        .checked_div(10u128.pow(asset_config.decimals as u32)).unwrap();    

    let liquidation_threshold = (collateral_value * asset_config.liquidation_threshold as u128) / 10000;

    require!(
        (user_position.borrow_amount as u128) > liquidation_threshold,
        LendingError::PositionNotLiquidatable
    );

    let cpi_repay = Transfer {
        from: ctx.accounts.liquidator_cash_account.to_account_info(),
        to: ctx.accounts.vault_cash_account.to_account_info(),
        authority: ctx.accounts.liquidator.to_account_info(),
    };

    token::transfer(CpiContext::new(ctx.accounts.token_program.to_account_info(),
             cpi_repay), repay_amount)?;

    let bonus_multiplier = 10000 + asset_config.liquidation_bonus;
    let asset_to_seize_value = (repay_amount as u128 * bonus_multiplier as u128) / 10000;
    
    let asset_amount = (asset_to_seize_value * 10u128.pow(asset_config.decimals as u32)) / (asset_price as u128);
    let asset_to_transfer = (asset_amount as u64).min(user_position.collateral_amount);


    let bump = ctx.bumps.vault_authority; 
    let market_key = ctx.accounts.market.key();

    let seeds = &[
        b"vault".as_ref(),
        market_key.as_ref(),
        &[bump], 
    ];
    let signer = &[&seeds[..]];

    let cpi_reward = Transfer {
        from: ctx.accounts.vault_gold_account.to_account_info(),
        to: ctx.accounts.liquidator_gold_account.to_account_info(),
        authority: ctx.accounts.vault_authority.to_account_info(),
    };
    
    token::transfer(
        CpiContext::new_with_signer(
            ctx.accounts.token_program.to_account_info(),
            cpi_reward,
            signer,
        ),
        asset_to_transfer as u64,
    )?;

    user_position.borrow_amount -= repay_amount;
    user_position.collateral_amount -= asset_to_transfer as u64;

    Ok(())
}
 

#[derive(Accounts)]
pub struct Liquidate<'info> {
    pub asset_config: Account<'info, AssetConfig>,
    pub market: Account<'info, Market>,
    /// CHECK: This is a PDA used as a signing authority for the vault. 
    /// Its safety is guaranteed by the seeds and bump constraints.
    #[account(
        seeds = [b"vault", market.key().as_ref()], 
        bump
    )]
    pub vault_authority: AccountInfo<'info>,
    /// CHECK: We verify this is the official Pyth Gold price feed in our logic
    pub pyth_price_feed: AccountInfo<'info>,
    #[account(mut)]
    pub user_position: Account<'info, UserPosition>,
    #[account(mut)]
    pub vault_cash_account: Account<'info, TokenAccount>,
    #[account(mut)]
    pub vault_gold_account: Account<'info, TokenAccount>,
    #[account(mut)]
    pub liquidator_cash_account: Account<'info, TokenAccount>,
    #[account(mut)]
    pub liquidator_gold_account: Account<'info, TokenAccount>,
    pub liquidator: Signer<'info>,
    pub token_program: Program<'info, Token>,
}