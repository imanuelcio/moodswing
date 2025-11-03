import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import {
  Sparkles,
  Shield,
  Award,
  Users,
  Loader2,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
} from "lucide-react";

interface NFTDetailModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  nft: {
    id: string;
    name: string;
    image: string;
    description: string;
    price: string;
    totalSupply: number;
    minted: number;
    utilities: string[];
    contractAddress?: string;
  } | null;
}

export const NFTDetailModal = ({
  open,
  onOpenChange,
  nft,
}: NFTDetailModalProps) => {
  const [isMinting, setIsMinting] = useState(false);
  const [mintSuccess, setMintSuccess] = useState(false);
  const [mintError, setMintError] = useState<string | null>(null);
  const [txSignature, setTxSignature] = useState<string | null>(null);

  if (!nft) return null;

  const isComingSoon = nft.minted === 0 && nft.totalSupply > 0;
  const isSoldOut = nft.minted >= nft.totalSupply;

  const handleMint = async () => {
    setIsMinting(true);
    setMintError(null);
    setMintSuccess(false);

    try {
      // TODO: Replace with actual mint logic
      // 1. Check wallet connection
      // 2. Check SOL balance
      // 3. Call mint smart contract
      // 4. Wait for confirmation

      const response = await fetch("/api/nft/mint", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // Add authentication if needed
        },
        body: JSON.stringify({
          nftId: nft.id,
          walletAddress: "user_wallet_address", // Get from wallet context
        }),
      });

      if (!response.ok) {
        throw new Error("Mint transaction failed");
      }

      const data = await response.json();
      setTxSignature(data.signature);
      setMintSuccess(true);

      // Refresh NFT data after successful mint
      // fetchNFTCollection();
    } catch (err) {
      console.error("Mint error:", err);
      setMintError(err instanceof Error ? err.message : "Failed to mint NFT");
    } finally {
      setIsMinting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="glass-card border-primary/30 max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-orbitron flex items-center gap-2">
            <Sparkles className="h-6 w-6 text-primary" />
            NFT Details
          </DialogTitle>
        </DialogHeader>

        <div className="grid md:grid-cols-2 gap-6 mt-4">
          {/* Image Section */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative"
          >
            <div className="aspect-square rounded-xl overflow-hidden border border-border">
              <img
                src={nft.image}
                alt={nft.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute top-4 right-4">
              <Badge className="text-primary border-primary/50 bg-primary/10 backdrop-blur-sm text-sm">
                <Sparkles className="h-3 w-3 mr-1" />
                Exclusive
              </Badge>
            </div>
            {isComingSoon && (
              <div className="absolute inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center rounded-xl">
                <Badge className="bg-primary/20 text-primary border-primary/50 backdrop-blur-sm text-lg px-4 py-2">
                  {/* <Loader2 className="h-4 w-4 mr-2 animate-spin" /> */}
                  Coming Soon
                </Badge>
              </div>
            )}
          </motion.div>

          {/* Details Section */}
          <div className="space-y-6">
            <div>
              <h2 className="text-3xl font-orbitron font-bold mb-2">
                {nft.name}
              </h2>
              <p className="text-muted-foreground">{nft.description}</p>
            </div>

            {/* Availability */}
            <div className="glass-card rounded-lg p-4 border border-border">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted-foreground flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  {isComingSoon ? "Total Supply" : "Availability"}
                </span>
                <span className="font-semibold">
                  {isComingSoon
                    ? `${nft.totalSupply.toLocaleString()} NFTs`
                    : `${(
                        nft.totalSupply - nft.minted
                      ).toLocaleString()} / ${nft.totalSupply.toLocaleString()}`}
                </span>
              </div>
              {!isComingSoon && (
                <div className="w-full h-2 bg-border rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary transition-all"
                    style={{
                      width: `${(nft.minted / nft.totalSupply) * 100}%`,
                    }}
                  />
                </div>
              )}
            </div>

            {/* Utilities */}
            <div>
              <h3 className="font-orbitron font-semibold mb-3 flex items-center gap-2">
                <Award className="h-5 w-5 text-primary" />
                NFT Utilities
              </h3>
              <div className="space-y-2">
                {nft.utilities.map((utility, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-sm">
                    <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                    <span>{utility}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Contract Info */}
            {nft.contractAddress && (
              <div>
                <h3 className="font-orbitron font-semibold mb-3 flex items-center gap-2">
                  <Shield className="h-5 w-5 text-secondary" />
                  Contract Info
                </h3>
                <div className="glass-card rounded-lg p-3 border border-border">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs text-muted-foreground">
                      Contract Address
                    </span>
                    <a
                      href={`https://solscan.io/token/${nft.contractAddress}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-mono text-primary hover:underline flex items-center gap-1"
                    >
                      {nft.contractAddress.slice(0, 8)}...
                      {nft.contractAddress.slice(-6)}
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  </div>
                </div>
              </div>
            )}

            {/* Success Message */}
            {mintSuccess && txSignature && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass-card rounded-lg p-4 border border-green-500/50 bg-green-500/5"
              >
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5" />
                  <div className="flex-1">
                    <h4 className="font-semibold text-green-500 mb-1">
                      Mint Successful!
                    </h4>
                    <p className="text-sm text-muted-foreground mb-2">
                      Your NFT has been minted successfully.
                    </p>
                    <a
                      href={`https://solscan.io/tx/${txSignature}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-primary hover:underline flex items-center gap-1"
                    >
                      View transaction
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Error Message */}
            {mintError && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass-card rounded-lg p-4 border border-destructive/50 bg-destructive/5"
              >
                <div className="flex items-start gap-3">
                  <AlertCircle className="h-5 w-5 text-destructive mt-0.5" />
                  <div className="flex-1">
                    <h4 className="font-semibold text-destructive mb-1">
                      Mint Failed
                    </h4>
                    <p className="text-sm text-muted-foreground">{mintError}</p>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Price and Mint Button */}
            <div className="space-y-3 pt-4 border-t border-border">
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Price</span>
                <span className="text-2xl font-orbitron font-bold text-primary">
                  {nft.price}
                </span>
              </div>

              {isComingSoon ? (
                <Button disabled className="w-full" size="lg">
                  {/* <Loader2 className="mr-2 h-5 w-5 animate-spin" /> */}
                  Coming Soon
                </Button>
              ) : isSoldOut ? (
                <Button disabled className="w-full" size="lg">
                  Sold Out
                </Button>
              ) : (
                <Button
                  onClick={handleMint}
                  disabled={isMinting || mintSuccess}
                  className="w-full bg-primary hover:bg-primary/90 hover-neon-glow"
                  size="lg"
                >
                  {isMinting ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Minting...
                    </>
                  ) : mintSuccess ? (
                    <>
                      <CheckCircle2 className="mr-2 h-5 w-5" />
                      Minted!
                    </>
                  ) : (
                    <>
                      <Sparkles className="mr-2 h-5 w-5" />
                      Mint NFT
                    </>
                  )}
                </Button>
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
