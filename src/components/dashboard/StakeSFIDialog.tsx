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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Badge } from "@/components/ui/badge";
import { Coins, Loader2, Info, Clock, TrendingUp } from "lucide-react";
import { toast } from "sonner";

interface StakeSFIDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const StakeSFIDialog = ({ open, onOpenChange }: StakeSFIDialogProps) => {
  const [amount, setAmount] = useState("");
  const [duration, setDuration] = useState("90");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const availableBalance = 5000; // Mock data

  const stakingOptions = [
    { days: "30", apr: 5, label: "Flexible" },
    { days: "90", apr: 8.5, label: "Standard" },
    { days: "180", apr: 12, label: "Premium" },
    { days: "365", apr: 18, label: "Diamond" },
  ];

  const selectedOption = stakingOptions.find((opt) => opt.days === duration);
  const estimatedRewards =
    ((parseFloat(amount) * (selectedOption?.apr || 0)) / 100) *
    (parseInt(duration) / 365);

  const handleSubmit = async () => {
    const stakeAmount = parseFloat(amount);

    if (!amount || stakeAmount <= 0) {
      toast.error("Please enter a valid amount");
      return;
    }

    if (stakeAmount > availableBalance) {
      toast.error("Insufficient balance");
      return;
    }

    setIsSubmitting(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));

      toast.success(
        `Successfully staked ${stakeAmount} SFI for ${duration} days`
      );
      onOpenChange(false);

      setAmount("");
      setDuration("90");
    } catch (error) {
      toast.error("Failed to stake SFI");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="font-orbitron flex items-center gap-2">
            <Coins className="h-5 w-5 text-accent" />
            Stake SFI
          </DialogTitle>
          <DialogDescription>
            Lock your SFI tokens to earn passive rewards. Longer lock periods
            offer higher APR.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Balance Info */}
          <div className="p-3 rounded-lg bg-muted/20 border border-border">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">
                Available Balance
              </span>
              <span className="font-mono font-bold">
                {availableBalance.toLocaleString()} SFI
              </span>
            </div>
          </div>

          {/* Amount Input */}
          <div className="space-y-2">
            <Label>Stake Amount</Label>
            <div className="relative">
              <Input
                type="number"
                placeholder="Enter amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="pr-20"
              />
              <Button
                variant="ghost"
                size="sm"
                className="absolute right-2 top-1/2 -translate-y-1/2 text-xs"
                onClick={() => setAmount(availableBalance.toString())}
              >
                MAX
              </Button>
            </div>
          </div>

          {/* Duration Selection */}
          <div className="space-y-3">
            <Label>Lock Duration</Label>
            <RadioGroup value={duration} onValueChange={setDuration}>
              <div className="grid grid-cols-2 gap-3">
                {stakingOptions.map((option) => (
                  <label
                    key={option.days}
                    className={`relative flex cursor-pointer rounded-lg border p-4 transition-all ${
                      duration === option.days
                        ? "border-primary bg-primary/10"
                        : "border-border hover:border-primary/50"
                    }`}
                  >
                    <RadioGroupItem value={option.days} className="sr-only" />
                    <div className="w-full">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-semibold text-sm">
                          {option.label}
                        </span>
                        <Badge
                          variant="secondary"
                          className="text-xs bg-green-500/20 text-green-400"
                        >
                          {option.apr}% APR
                        </Badge>
                      </div>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        {option.days} days
                      </div>
                    </div>
                  </label>
                ))}
              </div>
            </RadioGroup>
          </div>

          {/* Estimated Rewards */}
          {amount && !isNaN(parseFloat(amount)) && (
            <div className="p-4 rounded-lg bg-gradient-to-br from-accent/10 to-primary/10 border border-accent/30">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">
                    Lock Period
                  </span>
                  <span className="font-semibold">{duration} days</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">APR</span>
                  <span className="font-semibold text-green-500">
                    {selectedOption?.apr}%
                  </span>
                </div>
                <div className="flex items-center justify-between pt-2 border-t border-border/50">
                  <span className="text-sm flex items-center gap-1">
                    <TrendingUp className="h-4 w-4 text-accent" />
                    Est. Rewards
                  </span>
                  <span className="text-xl font-bold text-accent">
                    +{estimatedRewards.toFixed(2)} SFI
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Info Box */}
          <div className="flex gap-2 p-3 rounded-lg bg-blue-500/10 border border-blue-500/30">
            <Info className="h-4 w-4 text-blue-400 mt-0.5 flex-shrink-0" />
            <p className="text-xs text-blue-400">
              Staked tokens are locked for the selected duration. Early
              withdrawal may result in penalties.
            </p>
          </div>
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Staking...
              </>
            ) : (
              "Stake SFI"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
