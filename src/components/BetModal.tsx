import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Slider } from "./ui/slider";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { TrendingUp, TrendingDown } from "lucide-react";

interface BetModalProps {
  open: boolean;
  onClose: () => void;
  trend: {
    tag: string;
    score: number;
    chain: string;
  };
}

export const BetModal = ({ open, onClose, trend }: BetModalProps) => {
  const [betType, setBetType] = useState<"standard" | "micro">("standard");
  const [direction, setDirection] = useState<"long" | "short">("long");
  const [stake, setStake] = useState(100);
  const [platform, setPlatform] = useState<"msw" | "kalshi" | "polymarket">(
    "msw"
  );

  const handlePlaceBet = () => {
    // Mock bet placement
    console.log("Placing bet:", { betType, direction, stake, platform, trend });
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md glass-card border-primary/30">
        <DialogHeader>
          <DialogTitle className="font-orbitron text-xl">
            Place Prediction Bet
          </DialogTitle>
          <DialogDescription>
            Betting on{" "}
            <span className="font-semibold text-foreground">{trend.tag}</span> (
            {trend.chain})
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Bet Type */}
          <div className="space-y-2">
            <Label className="text-sm font-medium">Bet Type</Label>
            <RadioGroup
              value={betType}
              onValueChange={(v) => setBetType(v as any)}
            >
              <div className="flex items-center space-x-2 glass-card p-3 rounded-lg">
                <RadioGroupItem value="standard" id="standard" />
                <Label htmlFor="standard" className="flex-1 cursor-pointer">
                  <div className="font-medium">Standard</div>
                  <div className="text-xs text-muted-foreground">
                    High stakes, 24h lock
                  </div>
                </Label>
              </div>
              <div className="flex items-center space-x-2 glass-card p-3 rounded-lg">
                <RadioGroupItem value="micro" id="micro" />
                <Label htmlFor="micro" className="flex-1 cursor-pointer">
                  <div className="font-medium">Micro</div>
                  <div className="text-xs text-muted-foreground">
                    Low stakes, fast resolution
                  </div>
                </Label>
              </div>
            </RadioGroup>
          </div>

          {/* Direction */}
          <div className="space-y-2">
            <Label className="text-sm font-medium">Direction</Label>
            <div className="grid grid-cols-2 gap-3">
              <Button
                variant={direction === "long" ? "default" : "outline"}
                className={`${
                  direction === "long"
                    ? "bg-accent hover:bg-accent/90 border-accent"
                    : "border-border hover:border-accent/50"
                }`}
                onClick={() => setDirection("long")}
              >
                <TrendingUp className="h-4 w-4 mr-2" />
                Long
              </Button>
              <Button
                variant={direction === "short" ? "default" : "outline"}
                className={`${
                  direction === "short"
                    ? "bg-destructive hover:bg-destructive/90 border-destructive"
                    : "border-border hover:border-destructive/50"
                }`}
                onClick={() => setDirection("short")}
              >
                <TrendingDown className="h-4 w-4 mr-2" />
                Short
              </Button>
            </div>
          </div>

          {/* Stake */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label className="text-sm font-medium">Stake Points</Label>
              <span className="font-mono text-sm font-semibold">{stake}</span>
            </div>
            <Slider
              value={[stake]}
              onValueChange={(v) => setStake(v[0])}
              min={10}
              max={1000}
              step={10}
              className="py-2"
            />
          </div>

          {/* Platform */}
          <div className="space-y-2">
            <Label className="text-sm font-medium">Mirror to Platform</Label>
            <RadioGroup
              value={platform}
              onValueChange={(v) => setPlatform(v as any)}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="msw" id="msw" />
                <Label htmlFor="msw" className="cursor-pointer">
                  MSW Points Only
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="kalshi" id="kalshi" />
                <Label htmlFor="kalshi" className="cursor-pointer">
                  Kalshi
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="polymarket" id="polymarket" />
                <Label htmlFor="polymarket" className="cursor-pointer">
                  Polymarket
                </Label>
              </div>
            </RadioGroup>
          </div>
        </div>

        <div className="flex gap-3">
          <Button variant="outline" onClick={onClose} className="flex-1">
            Cancel
          </Button>
          <Button
            onClick={handlePlaceBet}
            className="flex-1 bg-primary hover:bg-primary/90 hover-neon-glow"
          >
            Place Bet
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
