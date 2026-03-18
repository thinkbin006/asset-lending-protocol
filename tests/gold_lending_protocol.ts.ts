import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { SolProject } from "../target/types/sol_project";
import { expect, use } from "chai";

import { 
  createMint, 
  getOrCreateAssociatedTokenAccount, 
  mintTo,
  TOKEN_PROGRAM_ID 
} from "@solana/spl-token";
describe("gold_lending_protocol", () => {

  const provider = anchor.AnchorProvider.env();
  anchor.setProvider(provider);

  const program = anchor.workspace.SolProject as Program<SolProject>;

  let goldMint: anchor.web3.PublicKey;
  let aliceGoldAccount: anchor.web3.PublicKey;
  let vaultGoldAccount: anchor.web3.PublicKey;
  let cashMint: anchor.web3.PublicKey;
  let aliceCashAccount: anchor.web3.PublicKey;
  let vaultCashAccount: anchor.web3.PublicKey;
  let userPosition = anchor.web3.Keypair.generate();

  
  
  const market = anchor.web3.Keypair.generate();
  const admin = provider.wallet;

  const [vaultAuthority, bump] = anchor.web3.PublicKey.findProgramAddressSync(
    [
      Buffer.from("vault"),
      market.publicKey.toBuffer()
    ], // Make sure this matches your Rust seeds exactly!
    program.programId
  );
  
  // --- NEW SETUP BLOCK ---
  it("Sets up Gold Token and Accounts", async () => {
    // 1. Create the Gold Token (Mint)
    goldMint = await createMint(
      provider.connection,
      (admin as any).payer,
      admin.publicKey,
      null,
      9 // 9 decimals
    );

    // 2. Create Alice's gold wallet and give her 100 Gold
    const aliceAccount = await getOrCreateAssociatedTokenAccount(
      provider.connection,
      (admin as any).payer,
      goldMint,
      admin.publicKey // Admin is acting as Alice for this test
    );
    aliceGoldAccount = aliceAccount.address;

    await mintTo(
      provider.connection,
      (admin as any).payer,
      goldMint,
      aliceGoldAccount,
      admin.publicKey,
      100 * 10 ** 9
    );

    // 3. Create the Vault's gold wallet (Owned by the Market)
    const vaultAccount = await getOrCreateAssociatedTokenAccount(
      provider.connection,
      (admin as any).payer,
      goldMint,
      vaultAuthority,
      true // allowOwnerOffCurve: true because 'market' is a Keypair, not a PDA yet
    );
    vaultGoldAccount = vaultAccount.address;

    console.log("Token Setup Complete.");
  });

  it("Initializes the Market!", async () => {
    const baseRate = new anchor.BN(200);
    const optimalUtil = new anchor.BN(8000);

    await program.methods
      .initializeMarket(baseRate, optimalUtil)
      .accounts({ 
        market: market.publicKey,
        admin: admin.publicKey,
      })
      .signers([market]) 
      .rpc();
    
    const marketAccount = await program.account.market.fetch(market.publicKey);
    expect(marketAccount.baseRate.toNumber()).to.equal(200);
  });

  it("Alice deposits 10 gold!", async () => {
    const depositAmount = new anchor.BN(10 * 10 ** 9); 

      await program.methods
        .depositCollateral(depositAmount)
        .accounts({
          userPosition: userPosition.publicKey,
          userTokenAccount: aliceGoldAccount,
          vaultTokenAccount: vaultGoldAccount,
          user: admin.publicKey,
          tokenProgram: TOKEN_PROGRAM_ID,
        })
        .signers([userPosition]) 
        .rpc();

      const position = await program.account.userPosition.fetch(userPosition.publicKey);
      console.log("Alice's Collateral Balance:", position.collateralAmount.toString());
      
      expect(position.collateralAmount.toNumber()).to.equal(depositAmount.toNumber());
    });

    it("Sets up Cash (USDC) and Funds the Vault", async() => {
        cashMint = await createMint(
          provider.connection,
          (admin as any).payer,
          admin.publicKey,
          null,
          6
        );

        const aliceAccount = await getOrCreateAssociatedTokenAccount(
          provider.connection,
          (admin as any).payer,
          cashMint,
          admin.publicKey,
        );
        aliceCashAccount= aliceAccount.address;

        

        const vaultAccount= await getOrCreateAssociatedTokenAccount(
          provider.connection,
          (admin as any).payer,
          cashMint,
          vaultAuthority,
          true,
        );
        vaultCashAccount = vaultAccount.address;

        await mintTo(
        provider.connection,
        (admin as any).payer,
        cashMint,
        vaultCashAccount,
        admin.publicKey,
        1000000 * 10 ** 6
      );
    });

    it("Alice borrows 500 USDC!", async () => {
    
    const borrowAmount = new anchor.BN(500 * 10 ** 6); 
    await program.methods
        .borrowCash(borrowAmount)
        .accounts({
            userPosition: userPosition.publicKey, 
            market: market.publicKey,
            vaultAuthority: vaultAuthority,
            vaultCashAccount: vaultCashAccount,
            userCashAccount: aliceCashAccount,
            userPosition: userPosition.publicKey, 
            owner: admin.publicKey,
            tokenProgram: TOKEN_PROGRAM_ID,
        })
        .rpc();

    const position = await program.account.userPosition.fetch(userPosition.publicKey);
    console.log("Alice's Debt:", position.borrowAmount.toString());
    
    expect(position.borrowAmount.toNumber()).to.equal(borrowAmount.toNumber());

    const aliceBalance = await provider.connection.getTokenAccountBalance(aliceCashAccount);
    expect(Number(aliceBalance.value.amount)).to.equal(500 * 10 ** 6);
  });

  it("Bob liquidates Alice!", async () => {

    const bob = anchor.web3.Keypair.generate();
    
    const signature = await provider.connection.requestAirdrop(bob.publicKey, 1 * anchor.web3.LAMPORTS_PER_SOL);
    await provider.connection.confirmTransaction(signature);

    const bobCashAccount = await getOrCreateAssociatedTokenAccount(
        provider.connection,
        (admin as any).payer,
        cashMint,
        bob.publicKey
    );
    
    await mintTo(
        provider.connection,
        (admin as any).payer,
        cashMint,
        bobCashAccount.address,
        admin.publicKey,
        600 * 10 ** 6 
    );

    const bobGoldAccount = await getOrCreateAssociatedTokenAccount(
        provider.connection,
        (admin as any).payer,
        goldMint,
        bob.publicKey
    );

    const repayAmount = new anchor.BN(500 * 10 ** 6); 

    await program.methods
        .liquidate(repayAmount)
        .accounts({
            userPosition: userPosition.publicKey,
            market: market.publicKey,
            liquidator: bob.publicKey,
            liquidatorCashAccount: bobCashAccount.address,
            liquidatorGoldAccount: bobGoldAccount.address,
            vaultCashAccount: vaultCashAccount,
            vaultGoldAccount: vaultGoldAccount,
            vaultAuthority: vaultAuthority,
            tokenProgram: TOKEN_PROGRAM_ID,
        })
        .signers([bob]) 
        .rpc();

    const position = await program.account.userPosition.fetch(userPosition.publicKey);
    expect(position.borrowAmount.toNumber()).to.equal(0);
    
    const bobGoldBalance = await provider.connection.getTokenAccountBalance(bobGoldAccount.address);
    console.log("Bob seized collateral! New Gold Balance:", bobGoldBalance.value.uiAmount);
  });

  it("Alice withdraws her gold after staying debt-free", async () => {

    const positionBefore = await program.account.userPosition.fetch(userPosition.publicKey);
    console.log("Current Debt:", positionBefore.borrowAmount.toString());

    const withdrawAmount = new anchor.BN(5 * 10 ** 9);

    await program.methods
        .withdrawlCollateral(withdrawAmount)
        .accounts({
            userPosition: userPosition.publicKey,
            market: market.publicKey,
            vaultTokenAccount: vaultGoldAccount, 
            userTokenAccount: aliceGoldAccount,   
            vaultAuthority: vaultAuthority,
            owner: admin.publicKey,
            tokenProgram: TOKEN_PROGRAM_ID,
        })
        .rpc();

    const positionAfter = await program.account.userPosition.fetch(userPosition.publicKey);
    expect(positionAfter.collateralAmount.toNumber()).to.equal(4999999890);
    
    console.log("Withdrawal successful! Alice reclaimed 5g of Gold.");
  });
});


