import { useMemo, type ReactNode } from "react";
import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import { PhantomWalletAdapter } from "@solana/wallet-adapter-wallets";
import { clusterApiUrl } from "@solana/web3.js";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";

interface SolanaWalletProviderProps {
  children: ReactNode;
}

/**
 * CRITICAL: Wallet Provider Setup
 *
 * This is the correct way to setup wallet adapters for Solana.
 * Make sure this wraps your entire app (usually in App.tsx or _app.tsx)
 */
export function SolanaWalletProvider({ children }: SolanaWalletProviderProps) {
  // Choose network - you can change this to Devnet or Mainnet
  const network = WalletAdapterNetwork.Mainnet; // or Devnet, Testnet

  // You can also provide a custom RPC endpoint
  const endpoint = useMemo(() => {
    // Option 1: Use default Solana RPC
    return clusterApiUrl(network);

    // Option 2: Use custom RPC (recommended for production)
    // return 'https://your-rpc-endpoint.com';
    //
    // Popular RPC providers:
    // - Helius: https://mainnet.helius-rpc.com/?api-key=YOUR_KEY
    // - QuickNode: https://your-endpoint.quiknode.pro/YOUR_KEY
    // - Alchemy: https://solana-mainnet.g.alchemy.com/v2/YOUR_KEY
  }, [network]);

  // CRITICAL: Initialize wallet adapters
  // Only Phantom wallet for now
  const wallets = useMemo(
    () => [
      // Phantom Wallet
      new PhantomWalletAdapter(),

      // Add more wallets here if needed later:
      // new SolflareWalletAdapter({ network }),
      // new BackpackWalletAdapter(),
      // new GlowWalletAdapter(),
    ],
    [network]
  );

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider
        wallets={wallets}
        autoConnect={false} // Set to false to manually control connection
      >
        {children}
      </WalletProvider>
    </ConnectionProvider>
  );
}

export default SolanaWalletProvider;
