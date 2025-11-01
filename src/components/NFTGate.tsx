import { motion } from "framer-motion";
import { Award, ExternalLink, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

interface NftGateTileProps {
  isHolder: boolean;
  count?: number;
  onMint?: () => void;
  onViewMyNfts?: () => void;
}

export const NftGateTile = ({
  isHolder,
  count,
  onMint,
  onViewMyNfts,
}: NftGateTileProps) => {
  if (isHolder) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ scale: 1.02 }}
        className="glass-card rounded-xl p-5 border border-border hover:border-primary/50 transition-all bg-gradient-to-br from-primary/5 to-transparent"
      >
        {/* Holder Badge */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-primary/20 border border-primary/30">
              <Award className="h-5 w-5 text-primary" />
            </div>
            <div>
              <div className="font-orbitron font-bold text-sm">NFT Holder</div>
              <div className="text-xs text-muted-foreground">
                {count} NFT{count !== 1 ? "s" : ""}
              </div>
            </div>
          </div>
          <div className="px-2.5 py-1 rounded-full bg-primary/20 border border-primary/30">
            <span className="text-xs font-mono font-bold text-primary">
              ✓ Active
            </span>
          </div>
        </div>

        {/* Benefits */}
        <div className="bg-muted/10 rounded-lg p-3 mb-3">
          <div className="flex items-start gap-2">
            <Sparkles className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
            <div className="text-xs text-muted-foreground leading-relaxed">
              You receive monthly points and revenue share benefits
            </div>
          </div>
        </div>

        {/* View NFTs Link */}
        <Button
          size="sm"
          variant="outline"
          onClick={onViewMyNfts}
          className="w-full font-mono text-xs border-primary/30 hover:bg-primary/10 hover:border-primary/50"
        >
          <span>View My NFTs</span>
          <ExternalLink className="h-3 w-3 ml-2" />
        </Button>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
      className="glass-card rounded-xl p-5 border border-border hover:border-accent/50 transition-all"
    >
      {/* Non-Holder Header */}
      <div className="flex items-center gap-2 mb-3">
        <div className="p-2 rounded-lg bg-muted/20 border border-border">
          <Award className="h-5 w-5 text-muted-foreground" />
        </div>
        <div>
          <div className="font-orbitron font-bold text-sm">Become a Holder</div>
          <div className="text-xs text-muted-foreground">Unlock benefits</div>
        </div>
      </div>

      {/* Benefits Preview */}
      <div className="bg-gradient-to-br from-accent/5 to-primary/5 rounded-lg p-3 mb-3 border border-accent/20">
        <div className="flex items-start gap-2 mb-2">
          <Sparkles className="h-4 w-4 text-accent mt-0.5 flex-shrink-0" />
          <div className="text-xs text-muted-foreground leading-relaxed">
            Holders receive monthly points and revenue share
          </div>
        </div>
      </div>

      {/* Mint Button */}
      <Button
        size="sm"
        onClick={onMint}
        className="w-full font-mono text-xs bg-gradient-to-r from-primary to-accent hover:opacity-90"
      >
        <Sparkles className="h-3 w-3 mr-2" />
        Mint NFT
      </Button>
    </motion.div>
  );
};
