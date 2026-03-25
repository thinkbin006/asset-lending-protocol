pub mod constants;
pub mod error;
pub mod instructions;
pub mod state;

use anchor_lang::prelude::*;
use anchor_spl::token::{self, Token, TokenAccount, Transfer};



pub use constants::*;
pub use state::*;
use crate::instructions::*;

declare_id!("DBi9Wids5DqV4QJtRyz3ib3YYNMJZUwCw82Ybh1dhxed");

#[program]
pub mod sol_project {
    use super::*;

    pub fn initialize_market(
        ctx: Context<InitializeMarket>, 
        base_rate: u64,
        optimal_util: u64,
        optimal_rate: u64,
        max_rate: u64,
        reserve_factor: u64,
        treasury_vault: Pubkey,
    ) -> Result<()> {
        instructions::market_initializer::market_handler(
            ctx, 
            base_rate, 
            optimal_util, 
            optimal_rate, 
            max_rate, 
            reserve_factor, 
            treasury_vault
        )
    }

    pub fn add_asset(ctx: Context<AddAsset>, _asset_mint: Pubkey, price: Pubkey, ltv: u64, bonus: u64, decimals: u8) -> Result<()> {
        instructions::asset_handler(ctx, _asset_mint, price, ltv, bonus, decimals)
    }

    pub fn deposit_collateral(ctx : Context<DepositCollateral>, amount: u64) -> Result<()> {

        let user_position = &mut ctx.accounts.user_position;

        user_position.owner = ctx.accounts.user.key();

        user_position.collateral_amount += amount;

        let cpi_accounts = Transfer {
            from: ctx.accounts.user_token_account.to_account_info(),
            to: ctx.accounts.vault_token_account.to_account_info(),
            authority: ctx.accounts.user.to_account_info()
        };

        let cpi_program= ctx.accounts.token_program.to_account_info();
        let cpi_ctx = CpiContext::new(cpi_program, cpi_accounts);
        
        token::transfer(cpi_ctx ,amount)?;

        msg!("Deposited {}g of gold. New collateral; {}", amount,user_position.collateral_amount);
        Ok(())
    }

    pub fn borrow_cash(ctx: Context<BorrowCash>, amount: u64) -> Result<()> {
        instructions::borrow_cash::borrow_handler(ctx, amount)
        
    }
    pub fn liquidate(ctx: Context<Liquidate>, repay_amount: u64) -> Result<()> {
        instructions::liquidate::liquidation_handler(ctx, repay_amount)
    }

    pub fn withdrawl_collateral(ctx: Context<WithdrawCollateral>, amount: u64) -> Result<()> {
        instructions::withdrawl_collateral::withdrawl_handler(ctx, amount)
    }

    pub fn repay_cash(ctx: Context<RepayCash>, amount: u64) -> Result<()> {
        instructions::repay_cash::repay_handler(ctx, amount)
    }

    
}

#[derive(Accounts)]
pub struct DepositCollateral<'info> {
    #[account(
        init_if_needed,
        payer = user,
        space = 8 + UserPosition::LEN,
    )]
    pub user_position: Account<'info, UserPosition>,

    #[account(mut)]
    pub user_token_account: Account<'info, TokenAccount>,
    #[account(mut)]
    pub vault_token_account: Account<'info, TokenAccount>,

    #[account(mut)]
    pub user: Signer<'info>,
    pub system_program: Program<'info, System>,
    pub token_program: Program<'info, Token>
}