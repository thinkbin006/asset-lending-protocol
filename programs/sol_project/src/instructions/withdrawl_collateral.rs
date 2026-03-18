use anchor_lang::prelude::*;
use anchor_spl::token::{self, Token, TokenAccount, Transfer};
use crate::error::LendingError;
use crate::state::*;

#[derive(Accounts)]
pub struct WithdrawCollateral<'info> {
    
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

    pub owner: Signer<'info>,
    pub token_program: Program<'info, Token>,
}

pub fn withdrawl_handler(ctx: Context<WithdrawCollateral>, amount: u64) -> Result<()> {
    let user_position = &mut ctx.accounts.user_position;

    require!(
        user_position.borrow_amount == 0,
        LendingError::ActiveDebtRemaining
    );
    
    require!(
        user_position.collateral_amount >= amount,
        LendingError::InsufficientCollateral
    );

    user_position.collateral_amount -= amount;

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