"use client";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";

export default function Home() {
  return (
    <main className="p-10 bg-black min-h-screen text-white">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-blue-500">SOL-LEND</h1>
        <WalletMultiButton />
      </div>
      <div className="mt-10 p-10 border border-dashed border-gray-700 rounded-lg text-center">
        <p>Ready to rebuild the stats and deposit components!</p>
      </div>
    </main>
  );
}