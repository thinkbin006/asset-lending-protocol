use anchor_lang::prelude::*;
use crate::state::*;

#[derive(Accounts)]
#[instruction(asset_mint: Pubkey)]
pub struct AddAsset<'info> {
    #[account(mut)]
    pub market: Account<'info, Market>,

    #[account(init, payer: admin,
        space= 8 + 32 + 32 +8 +8 +1,
        seeds = [b"asset_config", market.key().as_ref(), asset_mint.as_ref()],
        bump)]
        pub asset_config: Account<'info, AssetConfig>,

        #[account(mut, constraint = market.admin == admin.key())]
        pub admin: Signer<'info>,

        pub system_program: Program<'info, System>,

}

pub fn handler(
    ctx: Context<AddAsset>,
    _asset_mint: Pubkey,
    price: Pubkey,
    ltv: u64,
    bonus: u64,
    decimals: u8,
) -> Result<()> {
    let asset_config = &mut ctx.accounts.asset_config;
    asset_config.market= ctx.accounts.market.key();
    asset_config.asset_mint = _asset_mint;
    asset_config.price_feed = price_feed;
    asset_config.ltv= ltv;
    asset_config.liquidation_bonus = bonus;
    asset_config.decimals = decimals;

    msg!("Asset Added: {:?}", _asset_mint);
    Ok(())
}