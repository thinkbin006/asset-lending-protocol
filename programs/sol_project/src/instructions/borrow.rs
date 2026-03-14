use anchor_lang:prelude::*;
use anchor_spl::token{self, Transfer, Token, TokenAccount};
use crate::state::*;

pub fn handler(ctx: Context<Borrow>, amount: u64) -> Result<()> {
    let user_position = &mut ctx.accounts.user_position;
    let market = &ctx.accounts.market;

    let gold_price: u64 = 2000_00000000;

    let collateral_value = (user_position.collateral_amount as u128)
                            .checked_mul(gold_price as u128)
                            .unwrap();

    let ltv_ratio = 7500;
    let max_borrow = collateral_value
                    .checked_mul(ltv_ratio)
                    .unwrap()
                    .checked_div(10000)
                    .unwrap();
    
    let new_total_debt = (user_position.borrow_amount as u128)
                        .checked_add(amount as u128)
                        .unwrap();
    
    require!(
        new_total_debt <= max_borrow,
        LendingError::InsufficientCollateral
    );

    user_position.borrow_amount += amount;

    let cpi_accounts = Transfer {
        from: ctx.accounts.vault_cash_amount.to_account_info(),
        to: ctx.accounts.user_cash_account.to_account_info(),
        authority: ctx.accounts.market.to_account_info(),
    };

    let seeds=&[
        b"vault".as_ref(),
        &[ctx.bumps.market],
    ]

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
pub struct Borrow<'info> {
    #[account(mut)]
    pub market: Account<'info, Market>,
    #[account(mut, has_one = owner)]
    pub user_position: Account<'info, UserPosition>,
    #[account(mut)]
    pub vault_cash_amount: Account<'info, TokenAccount>,
    #[account(mut)]
    pub user_cash_account: Account<'info, TokenAccount>,
    pub owner: Signer<'info>,
    pub token_program: Program<'info,Token>,
}