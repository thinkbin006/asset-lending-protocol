use anchor_lang::prelude::*;
use crate::Clock;
use pyth_sdk_solana::load_price_feed_from_account_info;

pub fn get_pyth_price(price_account: &AccountInfo) -> Result<u64> {
    

    if price_account.data_is_empty() {
        msg!("Warning: Pyth account empty. Using Mock Price: $2000");
        return Ok(2000_000000); // 2000 with 6 decimals
    }
    let price_feed = load_price_feed_from_account_info(price_account).unwrap();
    let current_timestamp = Clock::get()?.unix_timestamp;
    
    let price = price_feed.get_price_no_older_than(current_timestamp, 60).unwrap();

    let expo_abs = price.expo.abs() as u32;
    let normalized_price = (price.price as u64) / 10u64.pow(expo_abs);
    
    Ok(normalized_price)
}