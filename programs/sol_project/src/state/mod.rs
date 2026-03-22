use anchor_lang::prelude::*;

#[account]
pub struct Market {
    pub admin: Pubkey,
    pub total_collateral_gold: u64,
    pub total_borrowed_cash: u64,
    pub borrow_cap: u128,

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
    pub collateral_mint: u64,
    pub collateral_amount: u64,
    pub borrow_amount: u64,
    pub health_factor: u64,
    pub last_update_ts: i64,
}

impl UserPosition {
    pub const LEN: usize = 96;
}


#[account]
pub struct AssetConfig {
    pub asset_mint: Pubkey,            // The Token Mint
    pub price_feed: Pubkey,      // The Pyth Price Feed for this asset
    pub ltv: u64,                
    pub liquidation_threshold: u64, 
    pub liquidation_bonus: u64,  
    pub decimals: u8,            // Decimals of the collateral token
}