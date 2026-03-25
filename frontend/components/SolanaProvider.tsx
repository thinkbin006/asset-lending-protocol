"use client";

import { useMemo } from 'react';
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';

export default function SolanaProvider({ children }: { children: React.ReactNode }) {
    // Localhost RPC
    const endpoint = useMemo(() => "http://127.0.0.1:8899", []);
    const wallets = useMemo(() => [], []); 

    return (
        <ConnectionProvider endpoint={endpoint}>
            <WalletProvider wallets={wallets} autoConnect>
                <WalletModalProvider>
                    {children}
                </WalletModalProvider>
            </WalletProvider>
        </ConnectionProvider>
    );
}