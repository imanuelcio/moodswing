import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { Sparkles, TrendingUp, Shield, Zap, Award, Users } from "lucide-react";

interface NFTDetailModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  nft: {
    id: string;
    name: string;
    image: string;
    tier: string;
    pointsBoost: number;
    supply: number;
    minted: number;
    description: string;
    benefits: string[];
    requirements: {
      points?: number;
      level?: number;
      previousNFT?: string;
    };
    price: string;
  } | null;
}

export const NFTDetailModal = ({
  open,
  onOpenChange,
  nft,
}: NFTDetailModalProps) => {
  if (!nft) return null;

  const getTierColor = (tier: string) => {
    switch (tier.toLowerCase()) {
      case "legendary":
        return "text-yellow-500 border-yellow-500/50 bg-yellow-500/10";
      case "epic":
        return "text-purple-500 border-purple-500/50 bg-purple-500/10";
      case "rare":
        return "text-blue-500 border-blue-500/50 bg-blue-500/10";
      default:
        return "text-gray-500 border-gray-500/50 bg-gray-500/10";
    }
  };

  const handleMint = () => {
    console.log(`Minting NFT: ${nft.name}`);
    // Add mint logic here
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
              <Badge
                className={`${getTierColor(nft.tier)} backdrop-blur-sm text-sm`}
              >
                <Sparkles className="h-3 w-3 mr-1" />
                {nft.tier}
              </Badge>
            </div>
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
                  Availability
                </span>
                <span className="font-semibold">
                  {nft.supply - nft.minted} / {nft.supply}
                </span>
              </div>
              <div className="w-full h-2 bg-border rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary transition-all"
                  style={{ width: `${(nft.minted / nft.supply) * 100}%` }}
                />
              </div>
            </div>

            {/* Benefits */}
            <div>
              <h3 className="font-orbitron font-semibold mb-3 flex items-center gap-2">
                <Award className="h-5 w-5 text-accent" />
                Benefits
              </h3>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <TrendingUp className="h-4 w-4 text-accent" />
                  <span>+{nft.pointsBoost}% Points Boost</span>
                </div>
                {nft.benefits.map((benefit, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-sm">
                    <Zap className="h-4 w-4 text-accent" />
                    <span>{benefit}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Requirements */}
            <div>
              <h3 className="font-orbitron font-semibold mb-3 flex items-center gap-2">
                <Shield className="h-5 w-5 text-primary" />
                Requirements
              </h3>
              <div className="space-y-2 text-sm">
                {nft.requirements.points && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Points</span>
                    <span className="font-semibold">
                      {nft.requirements.points}
                    </span>
                  </div>
                )}
                {nft.requirements.level && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Level</span>
                    <span className="font-semibold">
                      {nft.requirements.level}
                    </span>
                  </div>
                )}
                {nft.requirements.previousNFT && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Previous NFT</span>
                    <span className="font-semibold">
                      {nft.requirements.previousNFT}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Price and Mint Button */}
            <div className="space-y-3 pt-4 border-t border-border">
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Price</span>
                <span className="text-2xl font-orbitron font-bold text-primary">
                  {nft.price}
                </span>
              </div>
              <Button
                onClick={handleMint}
                className="w-full bg-primary hover:bg-primary/90 hover-neon-glow"
                size="lg"
              >
                <Sparkles className="mr-2 h-5 w-5" />
                Mint NFT
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
