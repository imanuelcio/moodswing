import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  Shield,
  Award,
  Users,
  Loader2,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  TrendingUp,
  Zap,
  Crown,
  DollarSign,
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
    revenueAllocation?: {
      currency: string;
      treasury_pct: number;
      treasury_usd: number;
      liquidity_pct: number;
      liquidity_usd: number;
    };
    status?: string;
  } | null;
  onMintSuccess?: () => void;
}

export const NFTDetailModal = ({
  open,
  onOpenChange,
  nft,
  onMintSuccess,
}: NFTDetailModalProps) => {
  const [isMinting, setIsMinting] = useState(false);
  const [mintSuccess, setMintSuccess] = useState(false);
  const [mintError, setMintError] = useState<string | null>(null);
  const [txSignature, setTxSignature] = useState<string | null>(null);

  if (!nft) return null;

  const isComingSoon = nft.status === "COMING_SOON";
  const isSoldOut = nft.status === "SOLD_OUT" || nft.minted >= nft.totalSupply;
  const isLive = nft.status === "LIVE";

  const handleMint = async () => {
    setIsMinting(true);
    setMintError(null);
    setMintSuccess(false);

    try {
      const response = await fetch("/api/nft/mint", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nftId: nft.id,
          walletAddress: "user_wallet_address", // TODO: Get from wallet context
        }),
      });

      if (!response.ok) throw new Error("Mint transaction failed");

      const data = await response.json();
      setTxSignature(data.signature);
      setMintSuccess(true);

      // Call success callback to refresh data
      if (onMintSuccess) {
        onMintSuccess();
      }
    } catch (err) {
      console.error("Mint error:", err);
      setMintError(err instanceof Error ? err.message : "Failed to mint NFT");
    } finally {
      setIsMinting(false);
    }
  };

  const getStatusBadge = () => {
    switch (nft.status) {
      case "COMING_SOON":
        return (
          <Badge className="bg-blue-500/20 text-blue-500 border-blue-500/50">
            Coming Soon
          </Badge>
        );
      case "LIVE":
        return (
          <Badge className="bg-green-500/20 text-green-500 border-green-500/50 animate-pulse">
            Live Now
          </Badge>
        );
      case "SOLD_OUT":
        return (
          <Badge className="bg-red-500/20 text-red-500 border-red-500/50">
            Sold Out
          </Badge>
        );
      default:
        return null;
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="glass-card border-primary/30 max-w-6xl max-h-[80vh] overflow-y-auto p-0">
        <div className="grid lg:grid-cols-5 gap-0">
          {/* LEFT: Image Section */}
          <div className="lg:col-span-2 relative bg-linear-to-br from-primary/5 to-secondary/5 p-8">
            <div className="absolute inset-0 bg-grid-white/[0.02]" />

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="relative"
            >
              {/* Glow Effect */}
              <div className="absolute inset-0 bg-linear-to-br from-primary/20 to-secondary/20 rounded-2xl blur-2xl" />

              {/* Image Card */}
              <div className="relative aspect-square rounded-2xl overflow-hidden border-2 border-primary/30 shadow-2xl">
                <img
                  src={nft.image}
                  alt={nft.name}
                  className="w-full h-full object-cover"
                />

                {/* Top Badges */}
                <div className="absolute top-4 right-4 flex flex-col gap-2 items-end">
                  <Badge className="bg-primary/20 text-primary border-primary/50 backdrop-blur-md text-sm px-3 py-1.5">
                    <Sparkles className="h-3.5 w-3.5 mr-1.5" />
                    Exclusive
                  </Badge>
                  {getStatusBadge()}
                </div>

                {/* Coming Soon Overlay */}
                {isComingSoon && (
                  <div className="absolute inset-0 bg-background/95 backdrop-blur-md flex items-center justify-center">
                    <div className="text-center">
                      <Sparkles className="h-16 w-16 text-primary mx-auto mb-4 animate-pulse" />
                      <div className="text-2xl font-orbitron font-bold text-primary mb-2">
                        Coming Soon
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Stay tuned for launch date
                      </p>
                    </div>
                  </div>
                )}

                {/* Bottom Gradient */}
                <div className="absolute inset-x-0 bottom-0 h-32 bg-linear-to-t from-black/60 to-transparent" />
              </div>

              {/* Stats Below Image */}
              <div className="mt-6 grid grid-cols-2 gap-4">
                <div className="glass-card rounded-xl p-4 border border-border text-center">
                  <div className="text-2xl font-bold font-mono text-primary mb-1">
                    {nft.totalSupply.toLocaleString()}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Max Supply
                  </div>
                </div>
                <div className="glass-card rounded-xl p-4 border border-border text-center">
                  <div className="text-2xl font-bold font-mono text-amber-500 mb-1">
                    {nft.minted.toLocaleString()}
                  </div>
                  <div className="text-xs text-muted-foreground">Minted</div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* RIGHT: Details Section */}
          <div className="lg:col-span-3 p-8 space-y-6">
            <DialogHeader>
              <DialogTitle className="text-3xl font-orbitron font-bold flex items-center gap-3">
                <Crown className="h-8 w-8 text-primary" />
                {nft.name}
              </DialogTitle>
              <p className="text-muted-foreground leading-relaxed pt-2">
                {nft.description}
              </p>
            </DialogHeader>

            {/* Availability Progress */}
            {isLive && (
              <div className="glass-card rounded-xl p-5 border border-border bg-muted/30">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-semibold flex items-center gap-2">
                    <Users className="h-4 w-4 text-primary" />
                    Availability
                  </span>
                  <span className="text-sm font-mono">
                    {(nft.totalSupply - nft.minted).toLocaleString()} /{" "}
                    {nft.totalSupply.toLocaleString()} remaining
                  </span>
                </div>
                <div className="h-3 bg-border rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{
                      width: `${(nft.minted / nft.totalSupply) * 100}%`,
                    }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="h-full bg-linear-to-r from-primary to-secondary"
                  />
                </div>
                <div className="flex justify-between text-xs text-muted-foreground mt-2">
                  <span>
                    {((nft.minted / nft.totalSupply) * 100).toFixed(1)}% minted
                  </span>
                  <span>
                    {(
                      ((nft.totalSupply - nft.minted) / nft.totalSupply) *
                      100
                    ).toFixed(1)}
                    % available
                  </span>
                </div>
              </div>
            )}

            {/* Utilities Grid */}
            <div>
              <h3 className="font-orbitron font-semibold mb-4 flex items-center gap-2 text-lg">
                <Award className="h-5 w-5 text-primary" />
                NFT Benefits
              </h3>
              <div className="grid gap-3">
                {nft.utilities.map((utility, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    className="flex items-start gap-3 p-3 rounded-xl border border-border hover:bg-accent/50 transition-all"
                  >
                    <div className="p-1.5 rounded-lg bg-primary/10 shrink-0">
                      <CheckCircle2 className="h-4 w-4 text-primary" />
                    </div>
                    <span className="text-sm leading-relaxed">{utility}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Revenue Allocation */}
            {nft.revenueAllocation && (
              <div>
                <h3 className="font-orbitron font-semibold mb-4 flex items-center gap-2 text-lg">
                  <DollarSign className="h-5 w-5 text-amber-500" />
                  Revenue Allocation
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="glass-card rounded-xl p-4 border border-border bg-blue-500/5">
                    <div className="flex items-center gap-2 mb-2">
                      <TrendingUp className="h-4 w-4 text-blue-500" />
                      <span className="text-sm font-semibold text-blue-500">
                        Liquidity Pool
                      </span>
                    </div>
                    <div className="text-2xl font-bold font-mono mb-1">
                      {nft.revenueAllocation.liquidity_pct}%
                    </div>
                    <div className="text-xs text-muted-foreground">
                      ${nft.revenueAllocation.liquidity_usd.toLocaleString()}{" "}
                      {nft.revenueAllocation.currency}
                    </div>
                  </div>

                  <div className="glass-card rounded-xl p-4 border border-border bg-amber-500/5">
                    <div className="flex items-center gap-2 mb-2">
                      <Award className="h-4 w-4 text-amber-500" />
                      <span className="text-sm font-semibold text-amber-500">
                        DAO Treasury
                      </span>
                    </div>
                    <div className="text-2xl font-bold font-mono mb-1">
                      {nft.revenueAllocation.treasury_pct}%
                    </div>
                    <div className="text-xs text-muted-foreground">
                      ${nft.revenueAllocation.treasury_usd.toLocaleString()}{" "}
                      {nft.revenueAllocation.currency}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Contract Info */}
            {nft.contractAddress && (
              <div className="glass-card rounded-xl p-5 border border-border bg-muted/30">
                <h3 className="font-semibold mb-3 flex items-center gap-2 text-sm">
                  <Shield className="h-4 w-4 text-secondary" />
                  Smart Contract
                </h3>
                <div className="flex items-center justify-between gap-3">
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
            )}

            {/* Success Message */}
            <AnimatePresence>
              {mintSuccess && txSignature && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="glass-card rounded-xl p-5 border-2 border-green-500/50 bg-green-500/5"
                >
                  <div className="flex items-start gap-4">
                    <div className="p-2 rounded-xl bg-green-500/10">
                      <CheckCircle2 className="h-6 w-6 text-green-500" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-green-500 mb-2 text-lg">
                        Mint Successful! 🎉
                      </h4>
                      <p className="text-sm text-muted-foreground mb-3">
                        Your exclusive NFT has been minted successfully. Welcome
                        to the club!
                      </p>
                      <a
                        href={`https://solscan.io/tx/${txSignature}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-primary hover:underline flex items-center gap-1 font-semibold"
                      >
                        View transaction
                        <ExternalLink className="h-3.5 w-3.5" />
                      </a>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Error Message */}
            <AnimatePresence>
              {mintError && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="glass-card rounded-xl p-5 border-2 border-destructive/50 bg-destructive/5"
                >
                  <div className="flex items-start gap-4">
                    <div className="p-2 rounded-xl bg-destructive/10">
                      <AlertCircle className="h-6 w-6 text-destructive" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-destructive mb-2 text-lg">
                        Mint Failed
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        {mintError}
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Price & Action Section */}
            <div className="sticky bottom-0 bg-background/95 backdrop-blur-sm border-t border-border pt-6 -mx-8 px-8 pb-2">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <div className="text-sm text-muted-foreground mb-1">
                    Mint Price
                  </div>
                  <div className="text-4xl font-orbitron font-bold text-primary flex items-baseline gap-2">
                    {nft.price}
                    <Badge variant="outline" className="text-xs font-normal">
                      + gas
                    </Badge>
                  </div>
                </div>

                {/* Status Badge */}
                <div className="text-right">
                  {isLive && (
                    <Badge className="bg-green-500/20 text-green-500 border-green-500/50 px-4 py-2 text-sm">
                      <Sparkles className="h-4 w-4 mr-2 animate-pulse" />
                      Available Now
                    </Badge>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-4">
                <Button
                  onClick={() => onOpenChange(false)}
                  variant="outline"
                  size="lg"
                  className="h-14"
                >
                  Close
                </Button>

                {isComingSoon ? (
                  <Button disabled className="h-14" size="lg">
                    <Sparkles className="mr-2 h-5 w-5" />
                    Coming Soon
                  </Button>
                ) : isSoldOut ? (
                  <Button disabled className="h-14" size="lg">
                    Sold Out
                  </Button>
                ) : (
                  <Button
                    onClick={handleMint}
                    disabled={isMinting || mintSuccess}
                    className="h-14 bg-linear-to-r from-primary to-secondary hover:opacity-90 hover-neon-glow font-bold text-base"
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
                        <Zap className="mr-2 h-5 w-5" />
                        Mint NFT Now
                      </>
                    )}
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
