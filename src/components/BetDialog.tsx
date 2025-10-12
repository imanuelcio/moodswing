import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Tabs, TabsList, TabsTrigger } from "./ui/tabs";
import { TrendingUp, TrendingDown } from "lucide-react";
import { toast } from "sonner";

interface BetDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  marketId: string;
  outcomeName: string;
  currentPrice: number;
}

export const BetDialog = ({
  open,
  onOpenChange,
  outcomeName,
  currentPrice,
}: BetDialogProps) => {
  const [direction, setDirection] = useState<"BUY" | "SELL">("BUY");
  const [stakePoints, setStakePoints] = useState("");
  const [platform, setPlatform] = useState<"msw" | "kalshi" | "polymarket">(
    "msw"
  );

  const handlePlaceBet = () => {
    // POST /bets - mock for now
    toast.success("Bet placed!", {
      description: `${direction} ${stakePoints} points on ${outcomeName}`,
    });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md glass-card border-border">
        <DialogHeader>
          <DialogTitle className="font-orbitron text-glow-red">
            Place Bet
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <Label className="text-sm text-muted-foreground">Outcome</Label>
            <div className="mt-1 p-3 rounded-lg border border-border bg-background/50">
              <p className="font-medium text-foreground">{outcomeName}</p>
              <p className="text-xs text-muted-foreground mt-1">
                Current price:{" "}
                <span className="font-mono text-success">
                  {(currentPrice * 100).toFixed(1)}¢
                </span>
              </p>
            </div>
          </div>

          <div>
            <Label className="text-sm text-muted-foreground mb-2 block">
              Direction
            </Label>
            <div className="grid grid-cols-2 gap-2">
              <Button
                variant={direction === "BUY" ? "default" : "outline"}
                onClick={() => setDirection("BUY")}
                className="gap-2"
              >
                <TrendingUp className="h-4 w-4" />
                Buy (Long)
              </Button>
              <Button
                variant={direction === "SELL" ? "default" : "outline"}
                onClick={() => setDirection("SELL")}
                className="gap-2"
              >
                <TrendingDown className="h-4 w-4" />
                Sell (Short)
              </Button>
            </div>
          </div>

          <div>
            <Label htmlFor="stake" className="text-sm text-muted-foreground">
              Stake (Points)
            </Label>
            <Input
              id="stake"
              type="number"
              placeholder="100"
              value={stakePoints}
              onChange={(e) => setStakePoints(e.target.value)}
              className="mt-1 font-mono"
            />
          </div>

          <div>
            <Label className="text-sm text-muted-foreground mb-2 block">
              Platform
            </Label>
            <Tabs
              value={platform}
              onValueChange={(v) => setPlatform(v as typeof platform)}
            >
              <TabsList className="grid grid-cols-3 w-full">
                <TabsTrigger value="msw">MSW</TabsTrigger>
                <TabsTrigger value="kalshi">Kalshi</TabsTrigger>
                <TabsTrigger value="polymarket">Polymarket</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          {stakePoints && (
            <div className="p-3 rounded-lg border border-primary/20 bg-primary/5">
              <div className="flex justify-between text-sm mb-1">
                <span className="text-muted-foreground">Estimated shares</span>
                <span className="font-mono text-foreground">
                  {(parseFloat(stakePoints) / currentPrice).toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Potential return</span>
                <span className="font-mono text-success">
                  {direction === "BUY"
                    ? `${(parseFloat(stakePoints) * (1 / currentPrice)).toFixed(
                        2
                      )} pts`
                    : `${(
                        parseFloat(stakePoints) *
                        (1 / (1 - currentPrice))
                      ).toFixed(2)} pts`}
                </span>
              </div>
            </div>
          )}

          <Button
            onClick={handlePlaceBet}
            className="w-full"
            disabled={!stakePoints}
          >
            Confirm Bet
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
