use anchor_lang::prelude::*;
use crate::Clock;
use crate::instructions::calculate_current_rate;
use crate::state::*;

pub fn sync_interest(user_position: &mut Account<UserPosition>, market: &mut Market) -> Result<()> {
    let now = Clock::get()?.unix_timestamp;
    let seconds_passed = (now - user_position.last_update_ts).max(0) as u64;

    if seconds_passed > 0 && user_position.borrow_amount > 0 {
        let current_rate_bps = calculate_current_rate(market);
        let seconds_in_year = 31_536_000;

        // Interest = (Principal * Rate * Time) / (SecondsInYear * 10000 BPS)
        let interest: u64 = (user_position.borrow_amount as u128)
            .checked_mul(current_rate_bps as u128).unwrap()
            .checked_mul(seconds_passed as u128).unwrap()
            .checked_div(seconds_in_year as u128 * 10000).unwrap() as u64;

        let treasury_cut= (interest as u128 * market.reserve_factor as u128 / 10000) as u64;
        let lender_share = interest -  treasury_cut;

        user_position.borrow_amount += interest;
        market.total_borrowed_cash += lender_share;
        market.accrued_treasury_fees += treasury_cut;
    }

    user_position.last_update_ts = now;
    Ok(())
}