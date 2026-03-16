import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { SolProject } from "../target/types/sol_project";
import { expect } from "chai";

describe("gold_lending_protocol", () => {
  // 1. Setup the connection to the local cluster
  const provider = anchor.AnchorProvider.env();
  anchor.setProvider(provider);

  const program = anchor.workspace.SolProject as Program<SolProject>;

  // 2. Define the "Accounts" (The Bank and the User)
  const market = anchor.web3.Keypair.generate();
  const admin = provider.wallet;

  it("Initializes the Market!", async () => {
    // 3. Define our Finance Parameters
    const baseRate = new anchor.BN(200); // 2%
    const optimalUtil = new anchor.BN(8000); // 80%

    // 4. Call the 'initialize_market' function in our Rust code
    await program.methods
      .initializeMarket(baseRate, optimalUtil)
      .accounts({
        market: market.publicKey,
        admin: admin.publicKey,
        systemProgram: anchor.web3.SystemProgram.programId,
      })
      .signers([market]) // The market account needs to sign because it's being initialized
      .rpc();
    
    // 5. Fetch the account back from the blockchain to verify
    const marketAccount = await program.account.market.fetch(market.publicKey);

    console.log("Admin Pubkey:", marketAccount.admin.toBase58());
    console.log("Base Rate:", marketAccount.baseRate.toString());

    // 6. Assertions (The "Audit")
    expect(marketAccount.baseRate.toNumber()).to.equal(200);
    expect(marketAccount.admin.toBase58()).to.equal(admin.publicKey.toBase58());
  });
});