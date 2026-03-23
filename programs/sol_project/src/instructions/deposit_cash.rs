use anchor_lang::prelude::*;
use anchor_spl::token::{self, Transfer, Token, TokenAccount};
use crate::state::*;

#[derive(Accounts)]
pub struct DepositCash<'info> {
    #[account(mut)]
    pub market: Account<'info, Market>,
    #[account(mut)]
    pub vault_cash_account: Account<'info, TokenAccount>,
    #[account(mut)]
    pub lender_cash_accouont: Account<'info, TokenAccount>,

    pub lender: Signer<'info>,
    pub token_program: Program<'info, Token>,
}

pub fn deposit_cash_handler(ctx: Context<DepositCash>, amount: u64)
 -> Result<()> {
    let cpi_accounts = Transfer {
        from: ctx.accounts.lender_cash_accouont.to_account_info(),
        to: ctx.accounts.vault_cash_account.to_account_info(),
        authority: ctx.accounts.lender.to_account_info(),
    };

    token::transfer(
        CpiContext::new(ctx.accounts.token_program.to_account_info(), cpi_accounts),
        amount,
    )?;

    ctx.accounts.market.total_deposited = ctx.accounts.market.total_deposited.checked_add(amount).unwrap();

    msg!("Deposit successful: {} USDC added to liquidity pool", amount);
    Ok(())
 }