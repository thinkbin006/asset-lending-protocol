"use client";
import { useAnchorWallet, useConnection } from "@solana/wallet-adapter-react";
import { AnchorProvider, Program } from "@coral-xyz/anchor";
import { useMemo } from "react";
import idl from "../target/sol_project.json"; // Copy your target/idl/sol_project.json here
import { SolProject } from "../target/sol_project"; // Copy your target/types/sol_project.ts here

export const useWorkspace = () => {
  const { connection } = useConnection();
  const wallet = useAnchorWallet();

  const program = useMemo(() => {
    if (!wallet) return null;

    // The Provider is the "Authenticated" connection
    const provider = new AnchorProvider(connection, wallet, {
      preflightCommitment: "processed",
    });

    // This creates the Program object we use to call methods
    return new Program(idl as any, provider) as Program<SolProject>;
  }, [connection, wallet]);

  return { program, wallet, connection };
};