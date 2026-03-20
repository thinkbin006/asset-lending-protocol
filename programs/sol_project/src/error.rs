use anchor_lang::prelude::*;

#[error_code]
pub enum ErrorCode {
    #[msg("Custom error message")]
    CustomError,
}

#[error_code]
pub enum LendingError {
    #[msg("The amount of collateral is too low for this loan.")]
    InsufficientCollateral,
    
    #[msg("The account is already healthy and cannot be liquidated.")]
    NotLiquidatable,
    
    #[msg("The Oracle price is stale or invalid.")]
    InvalidOraclePrice,
    
    #[msg("Math overflow occurred.")]
    MathOverflow,

    #[msg("Active debt remaining for the account.")]
    ActiveDebtRemaining,

    #[msg("No debt to liquidate!")]
    PositionNotLiquidatable,
}