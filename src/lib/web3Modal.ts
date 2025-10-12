import { createWeb3Modal, defaultConfig } from "@web3modal/ethers/react";

// Get projectId from https://cloud.walletconnect.com
const projectId = "90588251cd499167509b5c9d3ac1fc84";

// Define chains
const mainnet = {
  chainId: 1,
  name: "Ethereum",
  currency: "ETH",
  explorerUrl: "https://etherscan.io",
  rpcUrl: "https://cloudflare-eth.com",
};

const polygon = {
  chainId: 137,
  name: "Polygon",
  currency: "MATIC",
  explorerUrl: "https://polygonscan.com",
  rpcUrl: "https://polygon-rpc.com",
};

const base = {
  chainId: 8453,
  name: "Base",
  currency: "ETH",
  explorerUrl: "https://basescan.org",
  rpcUrl: "https://mainnet.base.org",
};

const arbitrum = {
  chainId: 42161,
  name: "Arbitrum",
  currency: "ETH",
  explorerUrl: "https://arbiscan.io",
  rpcUrl: "https://arb1.arbitrum.io/rpc",
};

// Metadata
const metadata = {
  name: "Mood Swing",
  description: "Decentralized Prediction Markets",
  url: "https://moodswing.fi",
  icons: ["https://moodswing.fi/logo.png"],
};

// Create modal
createWeb3Modal({
  ethersConfig: defaultConfig({
    metadata,
    enableEIP6963: true, // Enable EIP-6963 for multi-wallet detection
    enableInjected: true, // Enable injected wallets
    enableCoinbase: true, // Enable Coinbase Wallet
  }),
  chains: [mainnet, polygon, base, arbitrum],
  projectId,
  enableAnalytics: true,
  // Only show wallet options, no social logins
  featuredWalletIds: [
    "c57ca95b47569778a828d19178114f4db188b89b763c899ba0be274e97267d96", // MetaMask
    "4622a2b2d6af1c9844944291e5e7351a6aa24cd7b23099efac1b2fd875da31a0", // Trust Wallet
    "1ae92b26df02f0abca6304df07debccd18262fdf5fe82daa81593582dac9a369", // Rainbow
    "fd20dc426fb37566d803205b19bbc1d4096b248ac04548e3cfb6b3a38bd033aa", // Coinbase
  ],
  includeWalletIds: [
    "c57ca95b47569778a828d19178114f4db188b89b763c899ba0be274e97267d96", // MetaMask
    "4622a2b2d6af1c9844944291e5e7351a6aa24cd7b23099efac1b2fd875da31a0", // Trust Wallet
    "1ae92b26df02f0abca6304df07debccd18262fdf5fe82daa81593582dac9a369", // Rainbow
    "fd20dc426fb37566d803205b19bbc1d4096b248ac04548e3cfb6b3a38bd033aa", // Coinbase
  ],
  // Disable social logins
  enableOnramp: false, // Disable buy crypto
});
