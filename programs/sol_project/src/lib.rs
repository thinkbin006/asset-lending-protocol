pub mod constants;
pub mod error;
pub mod instructions;
pub mod state;

use anchor_lang::prelude::*;

pub use constants::*;
pub use instructions::*;
pub use state::*;

declare_id!("DBi9Wids5DqV4QJtRyz3ib3YYNMJZUwCw82Ybh1dhxed");

#[program]
pub mod sol_project {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        initialize::handler(ctx)
    }
}

pub fn initialize_market(
    ctx: Context<Initialize_market>,
    base_rate: u64,
    optimal_util: u64
) -> Result<()> {
    let market = &mut ctx.accounts.market;
    market.admin = *ctx.accounts.admin.key;
    market.base_rate = base_rate;
    market.optimal_utilization = optimal_util;
    market.total_collateral_gold = 0;
    market.total_borrowed_cash = 0;

    msg!("Market Initialized by Admin: {}", market.admin);
    Ok(())
}

#[derive(Accounts)]
pub struct Initialize_market<'info> {
    #[account(init, payer=admin, space = 8+ Market::LEN)]
    pub market: Account<'info, Market>,
    #[account(mut)]
    pub admin: Signer<'info>,
    pub system_program: Program<'info, System>,
}