import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Sparkles } from "lucide-react";

interface NFTCardProps {
  id: string;
  name: string;
  image: string;
  tier: string;
  pointsBoost?: number; // Optional
  supply: number;
  minted: number;
  price: string;
  onClick: () => void;
}

export const NFTCard = ({
  name,
  image,
  tier,
  supply,
  minted,
  price,
  onClick,
}: NFTCardProps) => {
  const getTierColor = (tier: string) => {
    switch (tier.toLowerCase()) {
      case "legendary":
        return "text-yellow-500 border-yellow-500/50 bg-yellow-500/10";
      case "epic":
        return "text-purple-500 border-purple-500/50 bg-purple-500/10";
      case "rare":
        return "text-blue-500 border-blue-500/50 bg-blue-500/10";
      case "exclusive":
        return "text-primary border-primary/50 bg-primary/10";
      default:
        return "text-gray-500 border-gray-500/50 bg-gray-500/10";
    }
  };

  const availability = supply > 0 ? ((supply - minted) / supply) * 100 : 0;
  const isComingSoon = minted === 0 && supply > 0;

  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -5 }}
      transition={{ duration: 0.2 }}
    >
      <Card
        className="glass-card border-border hover:border-primary/50 cursor-pointer overflow-hidden group transition-all hover-neon-glow"
        onClick={onClick}
      >
        <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-background to-muted">
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
            loading="lazy"
          />
          <div className="absolute top-3 right-3">
            <Badge className={`${getTierColor(tier)} backdrop-blur-sm`}>
              <Sparkles className="h-3 w-3 mr-1" />
              {tier}
            </Badge>
          </div>
          {isComingSoon && (
            <div className="absolute inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center">
              <Badge className="bg-primary/20 text-primary border-primary/50 backdrop-blur-sm text-lg px-4 py-2">
                {/* <Loader2 className="h-4 w-4 mr-2 animate-spin" /> */}
                Coming Soon
              </Badge>
            </div>
          )}
          {!isComingSoon && availability < 20 && availability > 0 && (
            <div className="absolute top-3 left-3">
              <Badge
                variant="destructive"
                className="backdrop-blur-sm animate-pulse"
              >
                Low Stock!
              </Badge>
            </div>
          )}
        </div>
        <div className="p-4 space-y-3">
          <div>
            <h3 className="font-orbitron font-semibold text-lg mb-1">{name}</h3>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Sparkles className="h-4 w-4 text-primary" />
              <span className="font-semibold text-primary">{price}</span>
            </div>
          </div>

          {!isComingSoon && (
            <div className="flex justify-between items-center pt-2 border-t border-border">
              <span className="text-sm text-muted-foreground">
                {minted.toLocaleString()}/{supply.toLocaleString()} minted
              </span>
              <div className="w-20 h-1.5 bg-border rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary transition-all"
                  style={{ width: `${(minted / supply) * 100}%` }}
                />
              </div>
            </div>
          )}

          {isComingSoon && (
            <div className="pt-2 border-t border-border">
              <div className="text-sm text-center text-muted-foreground">
                Total Supply: {supply.toLocaleString()} NFTs
              </div>
            </div>
          )}
        </div>
      </Card>
    </motion.div>
  );
};
