"use client";
import { useEffect, useState } from "react";
import { useWorkspace } from "../hooks/useWorkspace";
import { PublicKey } from "@solana/web3.js";

export const MarketStats = () => {
  const { program, wallet } = useWorkspace();
  const [marketData, setMarketData] = useState<any>(null);

  const fetchMarket = async () => {
    if (!program || !wallet) return;

    // 1. Derive the Market PDA (Must match your Rust seeds!)
    const [marketPDA] = PublicKey.findProgramAddressSync(
      [Buffer.from("market"), wallet.publicKey.toBuffer()],
      program.programId
    );

    try {
      const data = await program.account.market.fetch(marketPDA);
      setMarketData(data);
    } catch (e) {
      console.error("Failed to fetch market:", e);
    }
  };

  useEffect(() => { fetchMarket(); }, [program]);

  if (!marketData) return <div>Connect Wallet to see Market Stats...</div>;

  return (
    <div className="p-6 bg-gray-900 text-white rounded-xl border border-blue-500">
      <h2 className="text-2xl font-bold mb-4">Protocol Overview</h2>
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-gray-800 p-4 rounded">
          <p className="text-gray-400">Total Borrowed</p>
          <p className="text-xl font-mono">${(marketData.totalBorrowedCash.toNumber() / 1e6).toFixed(2)}</p>
        </div>
        <div className="bg-gray-800 p-4 rounded">
          <p className="text-gray-400">Reserve Factor</p>
          <p className="text-xl font-mono">{marketData.reserveFactor.toNumber() / 100}%</p>
        </div>
      </div>
    </div>
  );
};