"use client";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { MarketStats } from "../components/MarketStats";
import { DepositCollateral } from "../components/DepositCollateral";

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white p-8">
      <nav className="flex justify-between items-center mb-12">
        <h1 className="text-3xl font-extrabold tracking-tighter text-blue-500">
          SOL-LEND <span className="text-gray-500 text-sm font-normal">v1.0</span>
        </h1>
        <WalletMultiButton />
      </nav>

      <div className="max-w-4xl mx-auto space-y-8">
        <MarketStats />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <DepositCollateral />
          {/* We will add BorrowCash here next! */}
        </div>
      </div>
    </main>
  );
}