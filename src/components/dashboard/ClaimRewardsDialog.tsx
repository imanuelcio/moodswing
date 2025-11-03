import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Gift, Loader2, Sparkles, Coins, Zap, Trophy } from "lucide-react";
import { toast } from "sonner";
import { motion } from "framer-motion";

interface ClaimRewardsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const ClaimRewardsDialog = ({
  open,
  onOpenChange,
}: ClaimRewardsDialogProps) => {
  const [isClaiming, setIsClaiming] = useState(false);

  // Mock rewards data
  const rewards = [
    {
      id: "1",
      type: "prediction",
      title: "Prediction Win Bonus",
      amount: 350,
      token: "pts",
      icon: Trophy,
      color: "text-amber-400",
      bgColor: "bg-amber-500/20",
    },
    {
      id: "2",
      type: "staking",
      title: "Staking Rewards",
      amount: 125,
      token: "SFI",
      icon: Coins,
      color: "text-accent",
      bgColor: "bg-accent/20",
    },
    {
      id: "3",
      type: "daily",
      title: "Daily Login Streak (7 days)",
      amount: 50,
      token: "pts",
      icon: Zap,
      color: "text-primary",
      bgColor: "bg-primary/20",
    },
    {
      id: "4",
      type: "referral",
      title: "Referral Bonus",
      amount: 200,
      token: "pts",
      icon: Gift,
      color: "text-purple-400",
      bgColor: "bg-purple-500/20",
    },
  ];

  const totalPoints = rewards
    .filter((r) => r.token === "pts")
    .reduce((sum, r) => sum + r.amount, 0);
  const totalSFI = rewards
    .filter((r) => r.token === "SFI")
    .reduce((sum, r) => sum + r.amount, 0);

  const handleClaimAll = async () => {
    setIsClaiming(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));

      toast.success(
        `Claimed ${totalPoints} points and ${totalSFI} SFI successfully!`
      );
      onOpenChange(false);
    } catch (error) {
      toast.error("Failed to claim rewards");
    } finally {
      setIsClaiming(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[550px]">
        <DialogHeader>
          <DialogTitle className="font-orbitron flex items-center gap-2">
            <Gift className="h-5 w-5 text-primary" />
            Claim Your Rewards
          </DialogTitle>
          <DialogDescription>
            You have {rewards.length} rewards available to claim
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {/* Total Summary */}
          <div className="grid grid-cols-2 gap-3">
            <div className="p-4 rounded-lg bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/30">
              <div className="flex items-center gap-2 mb-1">
                <Zap className="h-4 w-4 text-primary" />
                <span className="text-xs text-muted-foreground">
                  Total Points
                </span>
              </div>
              <p className="text-2xl font-bold">{totalPoints}</p>
            </div>

            <div className="p-4 rounded-lg bg-gradient-to-br from-accent/10 to-accent/5 border border-accent/30">
              <div className="flex items-center gap-2 mb-1">
                <Coins className="h-4 w-4 text-accent" />
                <span className="text-xs text-muted-foreground">Total SFI</span>
              </div>
              <p className="text-2xl font-bold text-accent">{totalSFI}</p>
            </div>
          </div>

          {/* Rewards List */}
          <div className="space-y-2 max-h-[300px] overflow-y-auto">
            {rewards.map((reward, idx) => {
              const Icon = reward.icon;
              return (
                <motion.div
                  key={reward.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="flex items-center justify-between p-3 rounded-lg border border-border bg-muted/5 hover:bg-muted/10 transition-all"
                >
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${reward.bgColor}`}>
                      <Icon className={`h-5 w-5 ${reward.color}`} />
                    </div>
                    <div>
                      <p className="font-semibold text-sm">{reward.title}</p>
                      <Badge variant="secondary" className="text-xs mt-1">
                        {reward.type}
                      </Badge>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`text-lg font-bold ${reward.color}`}>
                      +{reward.amount}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {reward.token}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Bonus Info */}
          <div className="flex gap-2 p-3 rounded-lg bg-gradient-to-r from-primary/10 via-purple-500/10 to-accent/10 border border-primary/30">
            <Sparkles className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-sm font-semibold mb-1">
                🎉 Streak Bonus Active!
              </p>
              <p className="text-xs text-muted-foreground">
                Keep your 7-day streak to unlock a 2x multiplier on tomorrow's
                rewards
              </p>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={isClaiming}
          >
            Cancel
          </Button>
          <Button onClick={handleClaimAll} disabled={isClaiming}>
            {isClaiming ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Claiming...
              </>
            ) : (
              <>
                <Gift className="h-4 w-4 mr-2" />
                Claim All Rewards
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
