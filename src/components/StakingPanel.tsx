import { motion } from "framer-motion";
import { TrendingUp, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface StakingMiniPanelProps {
  aprPct: number;
  totalStaked: number;
  earned: number;
  onStake?: (days: number) => void;
}

export const StakingMiniPanel = ({
  aprPct,
  totalStaked,
  earned,
  onStake,
}: StakingMiniPanelProps) => {
  const stakingOptions = [
    { days: 14, label: "14d" },
    { days: 30, label: "30d" },
    { days: 90, label: "90d" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card rounded-xl p-5 border border-border hover:border-accent/30 transition-all"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Lock className="h-5 w-5 text-accent" />
          <h3 className="font-orbitron font-bold text-lg">Stake Points</h3>
        </div>
        <div className="flex items-center gap-1.5 bg-accent/20 px-3 py-1 rounded-full border border-accent/30">
          <TrendingUp className="h-3.5 w-3.5 text-accent" />
          <span className="font-mono font-bold text-sm text-accent">
            {aprPct}% APR
          </span>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="bg-muted/10 rounded-lg p-3">
          <div className="text-xs text-muted-foreground mb-1">Total Staked</div>
          <div className="font-mono font-bold text-lg">
            {totalStaked.toLocaleString()}
          </div>
        </div>
        <div className="bg-accent/10 rounded-lg p-3 border border-accent/20">
          <div className="text-xs text-muted-foreground mb-1">Earned</div>
          <div className="font-mono font-bold text-lg text-accent">
            +{earned.toLocaleString()}
          </div>
        </div>
      </div>

      {/* Staking Options */}
      <div className="space-y-2">
        <div className="text-xs text-muted-foreground mb-2">Lock Duration</div>
        <div className="grid grid-cols-3 gap-2">
          <TooltipProvider>
            {stakingOptions.map((option) => (
              <Tooltip key={option.days}>
                <TooltipTrigger asChild>
                  <div>
                    <Button
                      size="sm"
                      variant="outline"
                      disabled
                      className="w-full font-mono text-xs border-border hover:border-accent/50"
                    >
                      {option.label}
                    </Button>
                  </div>
                </TooltipTrigger>
                <TooltipContent className="glass-card border-border">
                  <p className="text-sm">PoC demo</p>
                </TooltipContent>
              </Tooltip>
            ))}
          </TooltipProvider>
        </div>
      </div>

      {/* Info Text */}
      <div className="mt-3 pt-3 border-t border-border">
        <p className="text-xs text-muted-foreground">
          Stake points to earn rewards. Longer locks = higher APR.
        </p>
      </div>
    </motion.div>
  );
};
