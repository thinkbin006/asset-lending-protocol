use anchor_lang::prelude::*;
use anchor_spl::token::{self, Token, TokenAccount, Transfer};
use crate::state::*;

pub fn repay_handler(ctx: Context<RepayCash>, amount: u64) -> Result<()> {
    let user_position = &mut ctx.accounts.user_position;

    if amount >= user_position.borrow_amount{
        user_position.borrow_amount = 0;
    } else {
        user_position.borrow_amount -= amount;
    }

    let cpi_accounts = Transfer {
        from: ctx.accounts.user_cash_account.to_account_info(),
        to: ctx.accounts.vault_cash_account.to_account_info(),
        authority: ctx.accounts.owner.to_account_info(),
    };

    token::transfer(
        CpiContext::new(ctx.accounts.token_program.to_account_info(), cpi_accounts),
        amount,
    )?;
    Ok(())
}

#[derive(Accounts)]
pub struct RepayCash<'info> {
    #[account(mut, has_one = owner)]
    pub user_position: Account<'info, UserPosition>,
    pub market: Account<'info, Market>,

    #[account(mut)]
    pub vault_cash_account: Account<'info, TokenAccount>,
    #[account(mut)]
    pub user_cash_account: Account<'info, TokenAccount>,

    pub owner: Signer<'info>,
    pub token_program: Program<'info, Token>,
}
