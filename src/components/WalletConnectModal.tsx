// import { useState, useEffect } from "react";
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
//   DialogDescription,
// } from "@/components/ui/dialog";
// import { Button } from "@/components/ui/button";
// import { motion, AnimatePresence } from "framer-motion";
// import {
//   Wallet,
//   Loader2,
//   AlertCircle,
//   CheckCircle2,
//   ArrowRight,
//   Shield,
//   Zap,
// } from "lucide-react";
// import {
//   useGenerateNonce,
//   useVerifySignature,
// } from "@/hooks/auth/useConnectWallet";
// import { createWeb3Modal, defaultConfig } from "@web3modal/ethers/react";
// import {
//   useWeb3Modal,
//   useWeb3ModalAccount,
//   useWeb3ModalProvider,
// } from "@web3modal/ethers/react";
// import { BrowserProvider } from "ethers";

// // 1. Get projectId from https://cloud.walletconnect.com
// const projectId = "90588251cd499167509b5c9d3ac1fc84";

// // 2. Set chains
// const mainnet = {
//   chainId: 1,
//   name: "Ethereum",
//   currency: "ETH",
//   explorerUrl: "https://etherscan.io",
//   rpcUrl: "https://cloudflare-eth.com",
// };

// // const solana = {
// //   chainId: 5000,
// //   name: "Solana",
// //   currency: "SOL",
// //   explorerUrl: "https://explorer.solana.com",
// //   rpcUrl: "https://api.mainnet-beta.solana.com",
// // };

// // 3. Create modal config
// const metadata = {
//   name: "Mood Swing",
//   description: "Decentralized Prediction Markets",
//   url: "https://moodswing.vercel.app",
//   icons: ["https://avatars.githubusercontent.com/u/37784886"],
// };

// createWeb3Modal({
//   ethersConfig: defaultConfig({ metadata }),
//   chains: [mainnet],
//   projectId,
//   enableAnalytics: true,
// });

// interface WalletConnectModalProps {
//   open: boolean;
//   onOpenChange: (open: boolean) => void;
//   onConnected?: (address: string) => void;
// }

// const walletOptions = [
//   {
//     name: "MetaMask",
//     icon: "🦊",
//     description: "Connect with MetaMask browser extension",
//     type: "evm" as const,
//     color: "from-orange-500 to-yellow-500",
//   },
//   {
//     name: "WalletConnect",
//     icon: "🔗",
//     description: "Scan with WalletConnect",
//     type: "evm" as const,
//     color: "from-blue-500 to-cyan-500",
//   },
//   {
//     name: "Phantom",
//     icon: "👻",
//     description: "Connect with Phantom wallet",
//     type: "solana" as const,
//     color: "from-purple-500 to-pink-500",
//   },
//   {
//     name: "Coinbase Wallet",
//     icon: "🔵",
//     description: "Connect with Coinbase",
//     type: "evm" as const,
//     color: "from-blue-600 to-indigo-600",
//   },
// ];

// export const WalletConnectModal = ({
//   open,
//   onOpenChange,
//   onConnected,
// }: WalletConnectModalProps) => {
//   const [connecting, setConnecting] = useState<string | null>(null);
//   const [loadingStep, setLoadingStep] = useState<string>("");
//   const [error, setError] = useState<string>("");
//   const [showSuccess, setShowSuccess] = useState(false);

//   const { open: openWeb3Modal } = useWeb3Modal();
//   const { address, isConnected } = useWeb3ModalAccount();
//   const { walletProvider } = useWeb3ModalProvider();

//   const generateNonce = useGenerateNonce();
//   const verifySignature = useVerifySignature();

//   // Handle MetaMask connection
//   const handleMetaMask = async () => {
//     setConnecting("MetaMask");
//     setError("");
//     setLoadingStep("Opening MetaMask...");

//     try {
//       if (!window.ethereum) {
//         throw new Error(
//           "MetaMask is not installed. Please install MetaMask extension."
//         );
//       }

//       const provider = new BrowserProvider(window.ethereum);
//       const accounts = await provider.send("eth_requestAccounts", []);
//       const address = accounts[0];

//       await completeAuthentication(address, "evm", provider, "MetaMask");
//     } catch (error: any) {
//       console.error("MetaMask connection error:", error);
//       setError(error.message || "Failed to connect with MetaMask");
//       setConnecting(null);
//       setLoadingStep("");
//     }
//   };

//   // Handle WalletConnect
//   const handleWalletConnect = async () => {
//     setConnecting("WalletConnect");
//     setError("");
//     setLoadingStep("Opening WalletConnect...");

//     try {
//       await openWeb3Modal();
//       // Connection will be handled by useEffect when isConnected changes
//     } catch (error: any) {
//       console.error("WalletConnect error:", error);
//       setError(error.message || "Failed to connect with WalletConnect");
//       setConnecting(null);
//       setLoadingStep("");
//     }
//   };

//   // Handle Phantom
//   const handlePhantom = async () => {
//     setConnecting("Phantom");
//     setError("");
//     setLoadingStep("Opening Phantom...");

//     try {
//       if (!window.solana || !window.solana.isPhantom) {
//         throw new Error(
//           "Phantom wallet is not installed. Please install Phantom extension."
//         );
//       }

//       const resp = await window.solana.connect();
//       const address = resp.publicKey.toString();

//       await completeAuthentication(address, "solana", window.solana, "Phantom");
//     } catch (error: any) {
//       console.error("Phantom connection error:", error);
//       setError(error.message || "Failed to connect with Phantom");
//       setConnecting(null);
//       setLoadingStep("");
//     }
//   };

//   // Handle Coinbase Wallet
//   const handleCoinbase = async () => {
//     setConnecting("Coinbase Wallet");
//     setError("");
//     setLoadingStep("Opening Coinbase Wallet...");

//     try {
//       if (!window.ethereum) {
//         throw new Error(
//           "Coinbase Wallet is not installed. Please install Coinbase Wallet extension."
//         );
//       }

//       const provider = new BrowserProvider(window.ethereum);
//       const accounts = await provider.send("eth_requestAccounts", []);
//       const address = accounts[0];

//       await completeAuthentication(address, "evm", provider, "Coinbase Wallet");
//     } catch (error: any) {
//       console.error("Coinbase connection error:", error);
//       setError(error.message || "Failed to connect with Coinbase Wallet");
//       setConnecting(null);
//       setLoadingStep("");
//     }
//   };

//   // Complete authentication flow
//   const completeAuthentication = async (
//     address: string,
//     chainKind: "evm" | "solana",
//     provider: any,
//     walletName: string
//   ) => {
//     try {
//       // Generate nonce
//       setLoadingStep("Generating secure nonce...");
//       const domain = window.location.hostname;
//       const nonceResult = await generateNonce.mutateAsync({
//         address,
//         chainKind,
//         domain,
//       });

//       if (!nonceResult || !nonceResult.message) {
//         throw new Error("Failed to generate nonce");
//       }

//       const { nonce, message } = nonceResult;

//       // Sign message
//       setLoadingStep("Please sign the message in your wallet...");
//       let signature: string;

//       if (chainKind === "evm") {
//         const signer = await provider.getSigner();
//         signature = await signer.signMessage(message);
//       } else {
//         // Solana
//         const encodedMessage = new TextEncoder().encode(message);
//         const signedMessage = await provider.signMessage(
//           encodedMessage,
//           "utf8"
//         );
//         signature = Buffer.from(signedMessage.signature).toString("hex");
//       }

//       // Verify signature
//       setLoadingStep("Verifying signature...");
//       const verifyResult = await verifySignature.mutateAsync({
//         address,
//         chainKind,
//         nonce,
//         signature,
//         domain,
//       });

//       if (!verifyResult.success) {
//         throw new Error("Failed to verify signature");
//       }

//       // Success!
//       setLoadingStep("Connected successfully!");
//       setShowSuccess(true);

//       // Store wallet info
//       localStorage.setItem(
//         "wallet",
//         JSON.stringify({
//           address,
//           chainKind,
//           walletName,
//           connectedAt: new Date().toISOString(),
//         })
//       );

//       // Callback
//       if (onConnected) {
//         onConnected(address);
//       }

//       // Close modal after success
//       setTimeout(() => {
//         onOpenChange(false);
//         setConnecting(null);
//         setLoadingStep("");
//         setShowSuccess(false);
//       }, 1500);
//     } catch (error: any) {
//       throw error;
//     }
//   };

//   // Handle WalletConnect connection via Web3Modal
//   useEffect(() => {
//     if (
//       isConnected &&
//       address &&
//       connecting === "WalletConnect" &&
//       walletProvider
//     ) {
//       const provider = new BrowserProvider(walletProvider);
//       completeAuthentication(address, "evm", provider, "WalletConnect").catch(
//         (error) => {
//           console.error("WalletConnect auth error:", error);
//           setError(error.message || "Failed to authenticate");
//           setConnecting(null);
//           setLoadingStep("");
//         }
//       );
//     }
//   }, [isConnected, address, connecting, walletProvider]);

//   const handleWalletClick = (walletName: string) => {
//     switch (walletName) {
//       case "MetaMask":
//         handleMetaMask();
//         break;
//       case "WalletConnect":
//         handleWalletConnect();
//         break;
//       case "Phantom":
//         handlePhantom();
//         break;
//       case "Coinbase Wallet":
//         handleCoinbase();
//         break;
//     }
//   };

//   return (
//     <Dialog open={open} onOpenChange={onOpenChange}>
//       <DialogContent className="glass-card border-primary/30 max-w-lg p-0 gap-0 overflow-hidden">
//         {/* Header with gradient */}
//         <div className="relative px-6 pt-6 pb-4 bg-gradient-to-br from-primary/10 via-background to-secondary/10">
//           <DialogHeader>
//             <DialogTitle className="text-3xl font-orbitron flex items-center gap-3">
//               <div className="p-2 rounded-xl bg-primary/20 border border-primary/30">
//                 <Wallet className="h-6 w-6 text-primary" />
//               </div>
//               Connect Wallet
//             </DialogTitle>
//             <DialogDescription className="text-base mt-2">
//               Choose your preferred wallet to get started
//             </DialogDescription>
//           </DialogHeader>

//           {/* Status Messages */}
//           <AnimatePresence mode="wait">
//             {loadingStep && (
//               <motion.div
//                 initial={{ opacity: 0, y: -10 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 exit={{ opacity: 0, y: -10 }}
//                 className="flex items-center gap-2 mt-4 p-3 rounded-lg bg-primary/10 border border-primary/20"
//               >
//                 {showSuccess ? (
//                   <CheckCircle2 className="h-4 w-4 text-green-500 flex-shrink-0" />
//                 ) : (
//                   <Loader2 className="h-4 w-4 animate-spin text-primary flex-shrink-0" />
//                 )}
//                 <span className="text-sm font-medium">{loadingStep}</span>
//               </motion.div>
//             )}

//             {error && (
//               <motion.div
//                 initial={{ opacity: 0, y: -10 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 exit={{ opacity: 0, y: -10 }}
//                 className="flex items-center gap-2 mt-4 p-3 rounded-lg bg-destructive/10 border border-destructive/20"
//               >
//                 <AlertCircle className="h-4 w-4 text-destructive flex-shrink-0" />
//                 <span className="text-sm font-medium text-destructive">
//                   {error}
//                 </span>
//               </motion.div>
//             )}
//           </AnimatePresence>
//         </div>

//         {/* Wallet Options */}
//         <div className="p-6 space-y-3">
//           {walletOptions.map((wallet, idx) => (
//             <motion.div
//               key={wallet.name}
//               initial={{ opacity: 0, x: -20 }}
//               animate={{ opacity: 1, x: 0 }}
//               transition={{ delay: idx * 0.1 }}
//             >
//               <Button
//                 variant="outline"
//                 className="w-full h-auto p-0 border-border hover:border-primary/50 transition-all disabled:opacity-50 overflow-hidden group relative"
//                 onClick={() => handleWalletClick(wallet.name)}
//                 disabled={connecting !== null}
//               >
//                 {/* Gradient overlay on hover */}
//                 <div
//                   className={`absolute inset-0 bg-gradient-to-r ${wallet.color} opacity-0 group-hover:opacity-10 transition-opacity`}
//                 />

//                 <div className="flex items-center gap-4 p-4 w-full relative z-10">
//                   {/* Icon */}
//                   <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-background to-muted border border-border group-hover:border-primary/30 transition-colors">
//                     {connecting === wallet.name ? (
//                       <Loader2 className="h-6 w-6 animate-spin text-primary" />
//                     ) : (
//                       <span className="text-2xl">{wallet.icon}</span>
//                     )}
//                   </div>

//                   {/* Content */}
//                   <div className="flex-1 text-left">
//                     <div className="font-semibold text-base mb-0.5 group-hover:text-primary transition-colors">
//                       {wallet.name}
//                     </div>
//                     <div className="text-xs text-muted-foreground">
//                       {connecting === wallet.name
//                         ? "Connecting..."
//                         : wallet.description}
//                     </div>
//                   </div>

//                   {/* Arrow */}
//                   <div className="flex items-center">
//                     {showSuccess && connecting === wallet.name ? (
//                       <CheckCircle2 className="h-5 w-5 text-green-500" />
//                     ) : (
//                       <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
//                     )}
//                   </div>
//                 </div>
//               </Button>
//             </motion.div>
//           ))}
//         </div>

//         {/* Footer */}
//         <div className="px-6 pb-6 space-y-4">
//           {/* Security badge */}
//           <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground p-3 rounded-lg bg-muted/30 border border-border">
//             <Shield className="h-3.5 w-3.5" />
//             <span>Secured with end-to-end encryption</span>
//           </div>

//           {/* Features */}
//           <div className="grid grid-cols-2 gap-3">
//             <div className="flex items-center gap-2 text-xs text-muted-foreground">
//               <Zap className="h-3.5 w-3.5 text-primary" />
//               <span>Instant connection</span>
//             </div>
//             <div className="flex items-center gap-2 text-xs text-muted-foreground">
//               <Shield className="h-3.5 w-3.5 text-primary" />
//               <span>Non-custodial</span>
//             </div>
//           </div>

//           {/* Terms */}
//           <p className="text-xs text-muted-foreground text-center">
//             By connecting, you agree to our{" "}
//             <a href="/terms" className="text-primary hover:underline">
//               Terms of Service
//             </a>{" "}
//             and{" "}
//             <a href="/privacy" className="text-primary hover:underline">
//               Privacy Policy
//             </a>
//           </p>
//         </div>
//       </DialogContent>
//     </Dialog>
//   );
// };

// // TypeScript declarations
// declare global {
//   interface Window {
//     ethereum?: Record<string, unknown> | undefined;
//     solana?: any;
//   }
// }

// export default WalletConnectModal;
