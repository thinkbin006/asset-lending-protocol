use anchor_lang::prelude::*;

#[account]
pub struct Market {
    pub admin: Pubkey,
    pub total_collateral_gold: u64,
    pub total_borrowed_cash: u64,

    // financial parameters

    pub base_rate: u64,
    pub optimal_utilization: u64,
    pub slope_1: u64,
    pub slope_2: u64,

    pub last_updated_slot: u64,
}

impl Market {
    pub const LEN: usize =96;
}

#[account]
pub struct UserPosition {
    pub owner: Pubkey,
    pub market: Pubkey,
    pub collateral_amount: u64,
    pub borrow_amount: u64,
    pub health_factor: u64,
    pub last_update_ts: i64,
}

impl UserPosition {
    pub const LEN: usize = 96;
}