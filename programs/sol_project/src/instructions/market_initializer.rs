use anchor_lang::prelude::*;
use crate::state::*;

#[derive(Accounts)]
pub struct InitializeMarket<'info> {
    #[account(
        init,
        payer = admin,
        space = Market::LEN + 8,
        seeds = [b"market", admin.key().as_ref()],
        bump
    )]
    pub market: Account<'info, Market>,
    
    #[account(mut)]
    pub admin: Signer<'info>,
    
    pub system_program: Program<'info, System>,
}

pub fn market_handler(
    ctx: Context<InitializeMarket>,
    base_rate: u64,
    optimal_util: u64,
    optimal_rate: u64,
    max_rate: u64,
    reserve_factor: u64,
    treasury_vault: Pubkey,
) -> Result<()> {
    let market = &mut ctx.accounts.market;
    market.admin = ctx.accounts.admin.key();
    market.treasury_vault = treasury_vault;
    market.reserve_factor = reserve_factor;
    
    market.base_rate = base_rate;
    market.optimal_utilization = optimal_util;
    market.optimal_rate = optimal_rate;
    market.max_rate = max_rate;
    
    market.total_borrowed_cash = 0;
    market.total_deposited = 0;
    market.accrued_treasury_fees = 0;

    msg!("Market Initialized by Admin: {:?}", market.admin);
    Ok(())
}