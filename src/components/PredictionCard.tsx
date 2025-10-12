import { useState } from "react";
import { Button } from "./ui/button";
import { TrendingUp, TrendingDown, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";
import { BetModal } from "./BetModal";

interface PredictionCardProps {
  tag: string;
  score: number;
  change: number;
  chain: string;
  volume: string;
}

export const PredictionCard = ({
  tag,
  score,
  change,
  chain,
  volume,
}: PredictionCardProps) => {
  const [modalOpen, setModalOpen] = useState(false);
  const isPositive = change >= 0;

  return (
    <>
      <motion.div
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.15 }}
        className="glass-card rounded-xl p-6 border border-border hover:border-primary/50 transition-all hover-neon-glow"
      >
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="font-orbitron text-lg font-semibold mb-1">{tag}</h3>
            <p className="text-sm text-muted-foreground">{chain}</p>
          </div>
          <div className="text-right">
            <div className="flex items-center gap-1 mb-1">
              <span className="text-2xl font-bold font-mono">{score}</span>
              {isPositive ? (
                <TrendingUp className="h-4 w-4 text-accent" />
              ) : (
                <TrendingDown className="h-4 w-4 text-destructive" />
              )}
            </div>
            <span
              className={`text-xs font-medium ${
                isPositive ? "text-accent" : "text-destructive"
              }`}
            >
              {isPositive ? "+" : ""}
              {change}%
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between text-sm mb-4">
          <span className="text-muted-foreground">24h Volume</span>
          <span className="font-mono font-medium">{volume}</span>
        </div>

        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            className="flex-1 border-primary/50 hover:border-primary hover-neon-glow"
            onClick={() => (window.location.href = `/markets`)}
          >
            Bet
          </Button>
          <Button variant="ghost" size="sm" className="aspect-square p-0">
            <ExternalLink className="h-4 w-4" />
          </Button>
        </div>
      </motion.div>

      <BetModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        trend={{ tag, score, chain }}
      />
    </>
  );
};
