use anchor_lang::prelude::*;
use anchor_spl::token::{self, Transfer, Token, TokenAccount};
use crate::state::*;

#[derive(Accounts)]
pub struct WithdrawTreasury<'info> {
    #[account(mut, constraint = market.admin == admin.key())]
    pub market: Account<'info, Market>,
    
    #[account(mut)]
    pub vault_cash_account: Account<'info, TokenAccount>,
    
    #[account(mut)]
    pub admin_cash_account: Account<'info, TokenAccount>,
    
    pub admin: Signer<'info>,
    pub token_program: Program<'info, Token>,
}

pub fn handler(ctx: Context<WithdrawTreasury>) -> Result<()> {
    let amount = ctx.accounts.market.accrued_treasury_fees;
    
    // Reset the counter
    ctx.accounts.market.accrued_treasury_fees = 0;

    let cpi_accounts= Transfer {
        from: ctx.accounts.vault_cash_account.to_account_info(),
        to: ctx.accounts.admin_cash_account.to_account_info(),
        authority: ctx.accounts.admin.to_account_info(),
    };

    token::transfer(
        CpiContext::new(ctx.accounts.token_program.to_account_info(),cpi_accounts),
        amount,
    )?;
    Ok(())
}