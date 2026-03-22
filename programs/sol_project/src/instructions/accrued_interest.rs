use anchor_lang::prelude::*;
use crate::Clock;
use crate::state::*;

pub fn sync_interest(user_position: &mut Account<UserPosition>) -> Result<()> {
    let now = Clock::get()?.unix_timestamp;
    let seconds_passed = (now - user_position.last_update_ts).max(0) as u64;

    if seconds_passed > 0 && user_position.borrow_amount > 0 {
        let annual_rate_bps = 500; // 5% Interest
        let seconds_in_year = 31_536_000;

        // Interest = (Principal * Rate * Time) / (SecondsInYear * 10000 BPS)
        let interest = (user_position.borrow_amount as u128)
            .checked_mul(annual_rate_bps as u128).unwrap()
            .checked_mul(seconds_passed as u128).unwrap()
            .checked_div(seconds_in_year as u128 * 10000).unwrap();

        user_position.borrow_amount += interest as u64;
    }

    user_position.last_update_ts = now;
    Ok(())
}