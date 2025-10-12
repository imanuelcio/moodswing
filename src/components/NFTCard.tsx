import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Sparkles, TrendingUp } from "lucide-react";

interface NFTCardProps {
  id: string;
  name: string;
  image: string;
  tier: string;
  pointsBoost: number;
  supply: number;
  minted: number;
  onClick: () => void;
}

export const NFTCard = ({
  name,
  image,
  tier,
  pointsBoost,
  supply,
  minted,
  onClick,
}: NFTCardProps) => {
  const getTierColor = (tier: string) => {
    switch (tier.toLowerCase()) {
      case "legendary":
        return "text-yellow-500 border-yellow-500/50";
      case "epic":
        return "text-purple-500 border-purple-500/50";
      case "rare":
        return "text-blue-500 border-blue-500/50";
      default:
        return "text-gray-500 border-gray-500/50";
    }
  };

  const availability = ((supply - minted) / supply) * 100;

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
          />
          <div className="absolute top-3 right-3">
            <Badge className={`${getTierColor(tier)} backdrop-blur-sm`}>
              <Sparkles className="h-3 w-3 mr-1" />
              {tier}
            </Badge>
          </div>
          {availability < 20 && (
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
              <TrendingUp className="h-4 w-4 text-accent" />
              <span>+{pointsBoost}% Points Boost</span>
            </div>
          </div>
          <div className="flex justify-between items-center pt-2 border-t border-border">
            <span className="text-sm text-muted-foreground">
              {minted}/{supply} minted
            </span>
            <div className="w-20 h-1.5 bg-border rounded-full overflow-hidden">
              <div
                className="h-full bg-primary transition-all"
                style={{ width: `${(minted / supply) * 100}%` }}
              />
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};
