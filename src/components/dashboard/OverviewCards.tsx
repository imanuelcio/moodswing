import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Zap, Coins, Image as ImageIcon, Trophy } from "lucide-react";

interface OverviewCardsProps {
  totalPoints: number;
  sfiBalance: number;
  nftHoldings: number;
  currentRank: number;
  rankProgress: number;
  pendingRewards: number;
}

export const OverviewCards = ({
  totalPoints,
  sfiBalance,
  nftHoldings,
  currentRank,
  rankProgress,
  pendingRewards,
}: OverviewCardsProps) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Card className="glass-card border-border p-4">
          <div className="flex items-center gap-2 mb-2">
            <Zap className="h-4 w-4 text-primary" />
            <p className="text-xs text-muted-foreground">Total Points</p>
          </div>
          <p className="text-2xl font-bold">{totalPoints.toLocaleString()}</p>
          <p className="text-xs text-muted-foreground mt-1">This month</p>
        </Card>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Card className="glass-card border-border p-4">
          <div className="flex items-center gap-2 mb-2">
            <Coins className="h-4 w-4 text-accent" />
            <p className="text-xs text-muted-foreground">SFI Balance</p>
          </div>
          <p className="text-2xl font-bold text-accent">
            {sfiBalance.toLocaleString()}
          </p>
          {pendingRewards > 0 && (
            <Button
              variant="link"
              size="sm"
              className="h-auto p-0 text-xs mt-1"
            >
              +{pendingRewards} to claim
            </Button>
          )}
        </Card>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <Card className="glass-card border-border p-4">
          <div className="flex items-center gap-2 mb-2">
            <ImageIcon className="h-4 w-4 text-purple-400" />
            <p className="text-xs text-muted-foreground">NFT Holdings</p>
          </div>
          <p className="text-2xl font-bold text-purple-400">{nftHoldings}</p>
          <p className="text-xs text-muted-foreground mt-1">Sentimentals</p>
        </Card>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <Card className="glass-card border-border p-4">
          <div className="flex items-center gap-2 mb-2">
            <Trophy className="h-4 w-4 text-amber-400" />
            <p className="text-xs text-muted-foreground">Current Rank</p>
          </div>
          <p className="text-2xl font-bold text-amber-400">#{currentRank}</p>
          <div className="mt-2">
            <Progress value={rankProgress} className="h-1" />
            <p className="text-xs text-muted-foreground mt-1">
              {rankProgress}% to next rank
            </p>
          </div>
        </Card>
      </motion.div>
    </div>
  );
};
