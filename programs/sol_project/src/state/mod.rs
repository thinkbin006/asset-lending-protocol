use anchor_lang::prelude::*;

#[account]
pub struct Market {
    pub admin: Pubkey,
    pub treasury_vault: Pubkey,
    pub reserve_factor: u64,
    pub accrued_treasury_fees: u64,
    pub total_collateral_gold: u64,
    pub total_borrowed_cash: u64,
    pub max_borrow_cap: u64,
    pub total_deposited: u64,
    pub bump: u8,


    // financial parameters

    pub base_rate: u64,
    pub optimal_utilization: u64,
    pub optimal_rate: u64,
    pub max_rate: u64,

    pub last_updated_slot: u64,
}

impl Market {
    pub const LEN: usize = 8 + 32 + 32 + (10 * 8) + 1 + 8;
}

#[account]
pub struct UserPosition {
    pub owner: Pubkey,
    pub market: Pubkey,
    pub collateral_mint: Pubkey,
    pub collateral_amount: u64,
    pub borrow_amount: u64,
    pub health_factor: u64,
    pub last_update_ts: i64,
}

impl UserPosition {
    pub const LEN: usize = 8 + 32 + 32 + 32 + 8 + 8 + 8 + 8;
}


#[account]
pub struct AssetConfig {
    pub asset_mint: Pubkey,            // The Token Mint
    pub price_feed: Pubkey,      // The Pyth Price Feed for this asset
    pub market: Pubkey,
    pub ltv: u64,                
    pub liquidation_threshold: u64, 
    pub liquidation_bonus: u64,  
    pub decimals: u8,            // Decimals of the collateral token
}

impl AssetConfig {
    pub const  LEN: usize = 8 + 32 + 32 + 32 + 8 + 8 + 8 + 1 + 7;
}