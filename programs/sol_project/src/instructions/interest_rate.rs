use crate::state::*;

pub fn calculate_current_rate(market: &Market) -> u64 {
    if market.total_deposited == 0 { return market.base_rate; }

    // Utilization = (Borrowed / Deposited) * 10000
    let utilization = (market.total_borrowed_cash as u128)
        .checked_mul(10000).unwrap()
        .checked_div(market.total_deposited as u128).unwrap() as u64;

    if utilization <= market.optimal_utilization {
        // Linear increase from base_rate to optimal_rate
        // Rate = Base + (Utilization / Optimal) * (OptimalRate - Base)
        market.base_rate + (utilization * (market.optimal_rate - market.base_rate) / market.optimal_utilization)
    } else {
        // Sharp "Jump" increase from optimal_rate to max_rate
        // Rate = OptimalRate + ((Utilization - Optimal) / (100% - Optimal)) * (MaxRate - OptimalRate)
        let excess_util = utilization - market.optimal_utilization;
        let total_excess = 10000 - market.optimal_utilization;
        market.optimal_rate + (excess_util * (market.max_rate - market.optimal_rate) / total_excess)
    }
}