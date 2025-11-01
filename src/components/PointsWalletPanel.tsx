import { motion } from "framer-motion";
import {
  Wallet,
  Clock,
  Gift,
  TrendingDown,
  Trophy,
  Flame,
  TrendingUp,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface PointsWalletPanelProps {
  spendable: number;
  expiring: { amount: number; daysLeft: number };
  monthly: { allocated: number; claimed: boolean };
  buckets: Array<{ label: string; amount: number }>;
  onClaim?: () => void;
  // New stats
  totalPoints?: number;
  streak?: number;
  activeBets?: number;
}

export const PointsWalletPanel = ({
  spendable,
  expiring,
  monthly,
  buckets,
  onClaim,
  totalPoints = 0,
  streak = 0,
  activeBets = 0,
}: PointsWalletPanelProps) => {
  const totalBuckets = buckets.reduce((sum, b) => sum + b.amount, 0);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card rounded-xl p-6 border border-border"
    >
      {/* Header */}
      <div className="flex items-center gap-2 mb-5">
        <Wallet className="h-6 w-6 text-primary" />
        <h3 className="font-orbitron font-bold text-xl">Points Overview</h3>
      </div>

      {/* Quick Stats Grid - NEW */}
      <div className="grid grid-cols-3 gap-3 mb-5">
        <div className="bg-primary/10 rounded-lg p-3 border border-primary/20">
          <div className="flex items-center gap-2 mb-1">
            <Trophy className="h-4 w-4 text-primary" />
            <span className="text-xs text-muted-foreground">Total</span>
          </div>
          <div className="font-mono text-lg font-bold text-primary">
            {totalPoints.toLocaleString()}
          </div>
        </div>

        <div className="bg-accent/10 rounded-lg p-3 border border-accent/20">
          <div className="flex items-center gap-2 mb-1">
            <Flame className="h-4 w-4 text-accent" />
            <span className="text-xs text-muted-foreground">Streak</span>
          </div>
          <div className="font-mono text-lg font-bold text-accent">
            {streak}d
          </div>
        </div>

        <div className="bg-secondary/10 rounded-lg p-3 border border-secondary/20">
          <div className="flex items-center gap-2 mb-1">
            <TrendingUp className="h-4 w-4 text-secondary" />
            <span className="text-xs text-muted-foreground">Active</span>
          </div>
          <div className="font-mono text-lg font-bold text-secondary">
            {activeBets}
          </div>
        </div>
      </div>

      {/* Spendable Points - Big Number */}
      <div className="bg-gradient-to-br from-primary/10 to-accent/10 rounded-lg p-4 mb-4 border border-primary/20">
        <div className="text-xs text-muted-foreground mb-1">
          Spendable Balance
        </div>
        <div className="font-mono text-3xl font-bold text-primary">
          {spendable.toLocaleString()}
        </div>
      </div>

      {/* Expiring Soon + Monthly Allocation */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="bg-muted/10 rounded-lg p-3 border border-border">
          <div className="flex items-center gap-1.5 mb-2">
            <Clock className="h-4 w-4 text-accent" />
            <span className="text-xs text-muted-foreground">Expiring Soon</span>
          </div>
          <div className="font-mono font-bold text-lg text-accent">
            {expiring.amount.toLocaleString()}
          </div>
          <div className="text-xs text-muted-foreground mt-1">
            in {expiring.daysLeft}d
          </div>
        </div>

        <div
          className={`rounded-lg p-3 border ${
            monthly.claimed
              ? "bg-muted/10 border-border"
              : "bg-gradient-to-br from-accent/10 to-primary/10 border-accent/30"
          }`}
        >
          <div className="flex items-center gap-1.5 mb-2">
            <Gift className="h-4 w-4 text-primary" />
            <span className="text-xs text-muted-foreground">Monthly Drop</span>
          </div>
          <div className="font-mono font-bold text-lg">
            {monthly.allocated.toLocaleString()}
          </div>
          {monthly.claimed ? (
            <div className="text-xs text-muted-foreground mt-1">✓ Claimed</div>
          ) : (
            <Button
              size="sm"
              onClick={onClaim}
              className="w-full mt-2 h-7 text-xs font-mono bg-primary hover:bg-primary/90"
            >
              Claim Now
            </Button>
          )}
        </div>
      </div>

      {/* Decay Buckets Visualization */}
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <TrendingDown className="h-3.5 w-3.5" />
          <span>Decay Timeline</span>
        </div>

        <TooltipProvider>
          <div className="flex h-6 rounded-full overflow-hidden border border-border bg-muted/20">
            {buckets.map((bucket, idx) => {
              const percentage = (bucket.amount / totalBuckets) * 100;
              const colors = [
                "bg-accent",
                "bg-primary",
                "bg-secondary",
                "bg-muted-foreground",
              ];
              const color = colors[idx % colors.length];

              return (
                <Tooltip key={idx}>
                  <TooltipTrigger asChild>
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${percentage}%` }}
                      transition={{ delay: idx * 0.1, duration: 0.5 }}
                      className={`${color} hover:opacity-80 transition-opacity cursor-pointer`}
                    />
                  </TooltipTrigger>
                  <TooltipContent className="glass-card border-border">
                    <div className="text-xs">
                      <div className="font-semibold">{bucket.label}</div>
                      <div className="font-mono text-muted-foreground">
                        {bucket.amount.toLocaleString()} pts
                      </div>
                    </div>
                  </TooltipContent>
                </Tooltip>
              );
            })}
          </div>
        </TooltipProvider>

        {/* Bucket Legend */}
        <div className="grid grid-cols-2 gap-2 pt-2">
          {buckets.map((bucket, idx) => {
            const colors = [
              "bg-accent",
              "bg-primary",
              "bg-secondary",
              "bg-muted-foreground",
            ];
            const color = colors[idx % colors.length];

            return (
              <div key={idx} className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${color}`} />
                <span className="text-xs text-muted-foreground truncate">
                  {bucket.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
};
