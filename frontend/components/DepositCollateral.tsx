"use client";
import { useState } from 'react';
import { useWorkspace } from '../hooks/useWorkspace';
import { BN } from '@coral-xyz/anchor';
import { PublicKey } from '@solana/web3.js';

export const DepositCollateral = () => {
  const { program, wallet } = useWorkspace();
  const [amount, setAmount] = useState("");

  const handleDeposit = async () => {
    if (!program || !wallet) return alert("Connect Wallet First!");

    try {
      // 1. Re-derive the PDAs needed for the transaction
      const [marketPDA] = PublicKey.findProgramAddressSync(
        [Buffer.from("market"), wallet.publicKey.toBuffer()], // Using admin as seed for now
        program.programId
      );

      // Note: In a real app, you'd fetch the specific asset_mint from a config
      const goldMint = new PublicKey("YOUR_GOLD_MINT_ADDRESS_FROM_TESTS");
      
      const [assetConfigPDA] = PublicKey.findProgramAddressSync(
        [Buffer.from("asset_config"), marketPDA.toBuffer(), goldMint.toBuffer()],
        program.programId
      );

      // 2. Execute the transaction
      const tx = await program.methods
        .depositCollateral(new BN(parseFloat(amount) * 1e9)) // Assuming 9 decimals for Gold
        .accounts({
          market: marketPDA,
          assetConfig: assetConfigPDA,
          // Add other required accounts from your Rust struct here
        })
        .rpc();

      console.log("Deposit Success! TX:", tx);
      alert("Deposit Successful!");
    } catch (err) {
      console.error("Deposit failed", err);
    }
  };

  return (
    <div className="p-6 bg-gray-800 rounded-lg mt-4 border border-yellow-500/30">
      <h3 className="text-xl font-semibold text-yellow-500 mb-4">Deposit Gold</h3>
      <input 
        type="number" 
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Amount in Gold"
        className="w-full p-2 bg-gray-700 rounded mb-4 text-white outline-none focus:ring-2 focus:ring-yellow-500"
      />
      <button 
        onClick={handleDeposit}
        className="w-full py-2 bg-yellow-600 hover:bg-yellow-500 text-white font-bold rounded transition-colors"
      >
        Confirm Deposit
      </button>
    </div>
  );
};