import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Target, Coins, Gift, Trophy } from "lucide-react";
import { useState } from "react";
import { PredictMarketDialog } from "./PredictMarketDialog";
import { StakeSFIDialog } from "./StakeSFIDialog";
import { ClaimRewardsDialog } from "./ClaimRewardsDialog";
import { ViewBadgesDialog } from "./ViewBadgesDialog";

interface QuickActionsBarProps {
  pendingRewards: number;
}

export const QuickActionsBar = ({ pendingRewards }: QuickActionsBarProps) => {
  const [predictOpen, setPredictOpen] = useState(false);
  const [stakeOpen, setStakeOpen] = useState(false);
  const [claimOpen, setClaimOpen] = useState(false);
  const [badgesOpen, setBadgesOpen] = useState(false);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="glass-card rounded-xl border border-border p-4"
      >
        <div className="flex flex-wrap gap-3">
          <Button
            className="flex-1 sm:flex-none"
            onClick={() => setPredictOpen(true)}
          >
            <Target className="h-4 w-4 mr-2" />
            Predict New Market
          </Button>
          <Button
            variant="outline"
            className="flex-1 sm:flex-none"
            onClick={() => setStakeOpen(true)}
          >
            <Coins className="h-4 w-4 mr-2" />
            Stake SFI
          </Button>
          <Button
            variant="outline"
            className="flex-1 sm:flex-none"
            onClick={() => setClaimOpen(true)}
          >
            <Gift className="h-4 w-4 mr-2" />
            Claim Rewards
            {pendingRewards > 0 && (
              <Badge variant="destructive" className="ml-2">
                {pendingRewards}
              </Badge>
            )}
          </Button>
          <Button
            variant="outline"
            className="flex-1 sm:flex-none"
            onClick={() => setBadgesOpen(true)}
          >
            <Trophy className="h-4 w-4 mr-2" />
            View Badges
          </Button>
        </div>
      </motion.div>

      <PredictMarketDialog open={predictOpen} onOpenChange={setPredictOpen} />
      <StakeSFIDialog open={stakeOpen} onOpenChange={setStakeOpen} />
      <ClaimRewardsDialog open={claimOpen} onOpenChange={setClaimOpen} />
      <ViewBadgesDialog open={badgesOpen} onOpenChange={setBadgesOpen} />
    </>
  );
};
