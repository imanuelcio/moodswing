import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Coins } from "lucide-react";

interface StakingOverviewProps {
  staking: {
    stakedAmount: number;
    apr: number;
    earned: number;
    lockDuration: string;
    unlockDate: string;
    daysRemaining: number;
  };
}

export const StakingOverview = ({ staking }: StakingOverviewProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 1 }}
      className="glass-card rounded-xl border border-border"
    >
      <div className="px-4 py-3 border-b border-border bg-muted/20">
        <h3 className="font-orbitron text-lg font-bold flex items-center gap-2">
          <Coins className="h-5 w-5 text-accent" />
          Staking Overview
        </h3>
      </div>

      <div className="p-4">
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <p className="text-xs text-muted-foreground mb-1">Staked Amount</p>
            <p className="text-xl font-bold">
              {staking.stakedAmount.toLocaleString()} SFI
            </p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground mb-1">APR</p>
            <p className="text-xl font-bold text-green-500">{staking.apr}%</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground mb-1">Earned</p>
            <p className="text-xl font-bold text-accent">
              {staking.earned} SFI
            </p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground mb-1">Unlock In</p>
            <p className="text-xl font-bold">{staking.daysRemaining}d</p>
          </div>
        </div>

        <Button variant="outline" className="w-full">
          Manage Staking
        </Button>
      </div>
    </motion.div>
  );
};
