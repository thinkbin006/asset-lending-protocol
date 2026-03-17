use anchor_lang::prelude::*;
use anchor_spl::token::{self, Transfer, Token, TokenAccount};
use crate::state::*;
use crate::error::LendingError;

pub fn liquidation_handler(ctx: Context<Liquidate>, repay_amount: u64) -> Result<()> {
    let user_position= &mut ctx.accounts.user_position;

    let gold_price: i64 = 2000_00000000;
    let collateral_value =(user_position.collateral_amount as u128)*(gold_price as u128);
    let liquidation_threshold=8000;

    let health_factor = (collateral_value * liquidation_threshold / 10000) / (user_position.borrow_amount as u128);

    require!(health_factor < 1, LendingError::NotLiquidatable);

    let cpi_repay = Transfer {
        from: ctx.accounts.liquidator_cash_account.to_account_info(),
        to: ctx.accounts.vault_cash_account.to_account_info(),
        authority: ctx.accounts.liquidator.to_account_info(),
    };

    token::transfer(CpiContext::new(ctx.accounts.token_program.to_account_info(), cpi_repay), repay_amount)?;

    let gold_to_transfer = (repay_amount as u128 * 11000 / 10000) / (gold_price as u128);


    let seeds = &[b"vault".as_ref(), &[ctx.bumps.vault_authority]];
    let signer = &[&seeds[..]];

    let cpi_reward = Transfer {
        from: ctx.accounts.vault_gold_account.to_account_info(),
        to: ctx.accounts.liquidator_gold_account.to_account_info(),
        authority: ctx.accounts.vault_authority.to_account_info(),
    };
    
    token::transfer(
        CpiContext::new_with_signer(ctx.accounts.token_program.to_account_info(), cpi_reward, signer),
        gold_to_transfer as u64
    )?;

    user_position.borrow_amount -= repay_amount;
    user_position.collateral_amount -= gold_to_transfer as u64;

    Ok(())
}
 

#[derive(Accounts)]
pub struct Liquidate<'info> {
    pub market: Account<'info, Market>,
    /// CHECK: This is a PDA used as a signing authority for the vault. 
    /// Its safety is guaranteed by the seeds and bump constraints.
    #[account(
        seeds = [b"vault", market.key().as_ref()], 
        bump
    )]
    pub vault_authority: AccountInfo<'info>,
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