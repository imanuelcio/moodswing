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
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown, Loader2 } from "lucide-react";
import { toast } from "sonner";

interface PredictMarketDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const PredictMarketDialog = ({
  open,
  onOpenChange,
}: PredictMarketDialogProps) => {
  const [market, setMarket] = useState("");
  const [side, setSide] = useState<"long" | "short">("long");
  const [stake, setStake] = useState([100]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const availableMarkets = [
    { id: "btc-60", label: "BTC sentiment > 60 this week?" },
    { id: "eth-75", label: "ETH hype exceeds 75 by Friday?" },
    { id: "sol-80", label: "SOL sentiment reaches 80?" },
    { id: "ai-bullish", label: "AI tokens sentiment bullish?" },
  ];

  const handleSubmit = async () => {
    if (!market) {
      toast.error("Please select a market");
      return;
    }

    setIsSubmitting(true);
    try {
      // TODO: Implement actual API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      toast.success(`Prediction placed: ${stake[0]} points on ${side}`);
      onOpenChange(false);

      // Reset form
      setMarket("");
      setSide("long");
      setStake([100]);
    } catch (error) {
      toast.error("Failed to place prediction");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="font-orbitron">
            Predict New Market
          </DialogTitle>
          <DialogDescription>
            Choose a market and place your prediction. Win points if you're
            correct!
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Market Selection */}
          <div className="space-y-2">
            <Label>Select Market</Label>
            <Select value={market} onValueChange={setMarket}>
              <SelectTrigger>
                <SelectValue placeholder="Choose a prediction market" />
              </SelectTrigger>
              <SelectContent>
                {availableMarkets.map((m) => (
                  <SelectItem key={m.id} value={m.id}>
                    {m.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Side Selection */}
          <div className="space-y-2">
            <Label>Prediction Side</Label>
            <div className="grid grid-cols-2 gap-3">
              <Button
                variant={side === "long" ? "default" : "outline"}
                onClick={() => setSide("long")}
                className="h-auto py-4"
              >
                <div className="text-left w-full">
                  <div className="flex items-center gap-2 mb-1">
                    <TrendingUp className="h-4 w-4" />
                    <span className="font-semibold">Long</span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Bet sentiment will increase
                  </p>
                </div>
              </Button>

              <Button
                variant={side === "short" ? "default" : "outline"}
                onClick={() => setSide("short")}
                className="h-auto py-4"
              >
                <div className="text-left w-full">
                  <div className="flex items-center gap-2 mb-1">
                    <TrendingDown className="h-4 w-4" />
                    <span className="font-semibold">Short</span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Bet sentiment will decrease
                  </p>
                </div>
              </Button>
            </div>
          </div>

          {/* Stake Amount */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label>Stake Amount</Label>
              <Badge variant="secondary">{stake[0]} points</Badge>
            </div>
            <Slider
              value={stake}
              onValueChange={setStake}
              min={50}
              max={1000}
              step={50}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Min: 50 pts</span>
              <span>Max: 1000 pts</span>
            </div>
          </div>

          {/* Potential Payout */}
          <div className="p-4 rounded-lg bg-gradient-to-br from-primary/10 to-accent/10 border border-primary/30">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">
                Potential Payout
              </span>
              <span className="text-xl font-bold text-accent">
                +{Math.floor(stake[0] * 1.75)} pts
              </span>
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              Based on current odds (1.75x multiplier)
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
                Placing...
              </>
            ) : (
              "Place Prediction"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
