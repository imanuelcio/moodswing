import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "./ui/tabs";
import {
  TrendingUp,
  TrendingDown,
  Trophy,
  Wallet,
  CreditCard,
  AlertCircle,
  Check,
  Loader2,
} from "lucide-react";
import { toast } from "sonner";
import { Badge } from "./ui/badge";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Alert, AlertDescription } from "./ui/alert";

interface BetDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  marketId: string;
  outcomeName: string;
  currentPrice: number;
}

type BetMode = "prediction" | "pool";
type PaymentMethod = "wallet" | "card" | "crypto";

export const BetDialog = ({
  open,
  onOpenChange,
  marketId,
  outcomeName,
  currentPrice,
}: BetDialogProps) => {
  const [mode, setMode] = useState<BetMode>("prediction");
  const [direction, setDirection] = useState<"BUY" | "SELL">("BUY");
  const [amount, setAmount] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("wallet");
  const [isProcessing, setIsProcessing] = useState(false);

  // Mock user balance
  const userPoints = 5000;
  const userWalletBalance = 1250.5;

  const calculateShares = () => {
    if (!amount) return 0;
    return parseFloat(amount) / currentPrice;
  };

  const calculatePotentialReturn = () => {
    if (!amount) return 0;
    const shares = calculateShares();
    if (direction === "BUY") {
      return shares * (1 - currentPrice);
    } else {
      return shares * currentPrice;
    }
  };

  const handlePlacePrediction = async () => {
    console.log("🎯 [BET] Starting prediction bet placement...");
    console.log("📊 [BET] Details:", {
      marketId,
      outcome: outcomeName,
      direction,
      points: parseFloat(amount),
    });

    setIsProcessing(true);

    try {
      // Import placeBet from hooks
      const { placeBet } = await import("@/hooks/bet/api");

      console.log("🔄 [BET] Calling API...");
      const result = await placeBet({
        market_id: parseInt(marketId),
        outcome_id: 1, // You'll need to pass actual outcome_id
        amount: parseFloat(amount),
      });

      console.log("✅ [BET] Bet placed successfully!", result);
      toast.success("Prediction placed!", {
        description: `${direction} ${amount} points on ${outcomeName}`,
      });

      onOpenChange(false);
    } catch (error) {
      console.error("❌ [BET] Failed to place bet:", error);
      toast.error("Failed to place prediction", {
        description: error instanceof Error ? error.message : "Try again later",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const handlePlacePoolBet = async () => {
    setIsProcessing(true);

    try {
      // Step 1: Create bet order
      const orderResponse = await fetch("/api/v1/bets/pool", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          marketId,
          outcome: outcomeName,
          direction,
          amount: parseFloat(amount),
          paymentMethod,
        }),
      });

      if (!orderResponse.ok) throw new Error("Failed to create bet order");

      const { orderId, paymentUrl } = await orderResponse.json();

      // Step 2: Process payment based on method
      if (paymentMethod === "wallet") {
        // Direct wallet deduction
        const paymentResponse = await fetch(
          `/api/v1/payments/wallet/${orderId}`,
          {
            method: "POST",
            credentials: "include",
          }
        );

        if (!paymentResponse.ok) throw new Error("Payment failed");

        toast.success("Bet placed successfully!", {
          description: `${direction} $${amount} on ${outcomeName}`,
        });

        onOpenChange(false);
      } else if (paymentMethod === "card" || paymentMethod === "crypto") {
        // Redirect to payment gateway
        toast.info("Redirecting to payment gateway...");
        window.location.href = paymentUrl;
      }
    } catch (error) {
      toast.error("Failed to place bet", {
        description: error instanceof Error ? error.message : "Try again later",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleConfirm = () => {
    if (mode === "prediction") {
      handlePlacePrediction();
    } else {
      handlePlacePoolBet();
    }
  };

  const isValid = () => {
    if (!amount || parseFloat(amount) <= 0) return false;

    if (mode === "prediction") {
      return parseFloat(amount) <= userPoints;
    } else {
      if (paymentMethod === "wallet") {
        return parseFloat(amount) <= userWalletBalance;
      }
      return true; // Card/crypto will be validated by payment gateway
    }
  };

  const getInsufficientFundsMessage = () => {
    if (mode === "prediction" && parseFloat(amount) > userPoints) {
      return "Insufficient points";
    }
    if (
      mode === "pool" &&
      paymentMethod === "wallet" &&
      parseFloat(amount) > userWalletBalance
    ) {
      return "Insufficient wallet balance";
    }
    return null;
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-xl glass-card border-border max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-orbitron text-glow-red text-xl">
            Place Your Bet
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Mode Selection */}
          <div>
            <Label className="text-sm text-muted-foreground mb-3 block">
              Betting Mode
            </Label>
            <Tabs value={mode} onValueChange={(v) => setMode(v as BetMode)}>
              <TabsList className="grid grid-cols-2 w-full">
                <TabsTrigger value="prediction" className="gap-2">
                  <Trophy className="h-4 w-4" />
                  Prediction (Points)
                </TabsTrigger>
                <TabsTrigger value="pool" className="gap-2">
                  <Wallet className="h-4 w-4" />
                  Pool (Real Money)
                </TabsTrigger>
              </TabsList>

              {/* Prediction Tab Content */}
              <TabsContent value="prediction" className="space-y-4 mt-4">
                <Alert>
                  <Trophy className="h-4 w-4" />
                  <AlertDescription>
                    Use points to predict the outcome. Win points if your
                    prediction is correct!
                  </AlertDescription>
                </Alert>

                <div className="flex items-center justify-between p-3 rounded-lg border border-border bg-background/50">
                  <span className="text-sm text-muted-foreground">
                    Your Points Balance
                  </span>
                  <span className="font-mono font-bold text-primary text-lg">
                    {userPoints.toLocaleString()} pts
                  </span>
                </div>
              </TabsContent>

              {/* Pool Tab Content */}
              <TabsContent value="pool" className="space-y-4 mt-4">
                <Alert>
                  <Wallet className="h-4 w-4" />
                  <AlertDescription>
                    Bet real money in the liquidity pool. Win based on market
                    odds!
                  </AlertDescription>
                </Alert>

                <div className="flex items-center justify-between p-3 rounded-lg border border-border bg-background/50">
                  <span className="text-sm text-muted-foreground">
                    Wallet Balance
                  </span>
                  <span className="font-mono font-bold text-green-500 text-lg">
                    ${userWalletBalance.toFixed(2)}
                  </span>
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Outcome Display */}
          <div>
            <Label className="text-sm text-muted-foreground">Outcome</Label>
            <div className="mt-2 p-4 rounded-lg border border-border bg-background/50">
              <div className="flex items-start justify-between">
                <div>
                  <p className="font-medium text-foreground text-lg">
                    {outcomeName}
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Current odds:{" "}
                    <span className="font-mono text-primary font-bold">
                      {(currentPrice * 100).toFixed(1)}¢
                    </span>
                  </p>
                </div>
                <Badge variant="outline" className="border-primary/50">
                  Market #{marketId}
                </Badge>
              </div>
            </div>
          </div>

          {/* Direction Selection */}
          <div>
            <Label className="text-sm text-muted-foreground mb-3 block">
              Position
            </Label>
            <div className="grid grid-cols-2 gap-3">
              <Button
                variant={direction === "BUY" ? "default" : "outline"}
                onClick={() => setDirection("BUY")}
                className="gap-2 h-auto py-4"
                size="lg"
              >
                <TrendingUp className="h-5 w-5" />
                <div className="text-left">
                  <div>Buy Yes</div>
                  <div className="text-xs opacity-70">Long position</div>
                </div>
              </Button>
              <Button
                variant={direction === "SELL" ? "default" : "outline"}
                onClick={() => setDirection("SELL")}
                className="gap-2 h-auto py-4"
                size="lg"
              >
                <TrendingDown className="h-5 w-5" />
                <div className="text-left">
                  <div>Buy No</div>
                  <div className="text-xs opacity-70">Short position</div>
                </div>
              </Button>
            </div>
          </div>

          {/* Amount Input */}
          <div>
            <Label htmlFor="amount" className="text-sm text-muted-foreground">
              {mode === "prediction" ? "Points to Stake" : "Amount (USD)"}
            </Label>
            <div className="relative mt-2">
              <Input
                id="amount"
                type="number"
                placeholder={mode === "prediction" ? "100" : "10.00"}
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="font-mono text-lg pr-16"
                min="0"
                step={mode === "prediction" ? "1" : "0.01"}
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground font-mono">
                {mode === "prediction" ? "pts" : "USD"}
              </div>
            </div>
            {getInsufficientFundsMessage() && (
              <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                <AlertCircle className="h-3 w-3" />
                {getInsufficientFundsMessage()}
              </p>
            )}
          </div>

          {/* Quick Amount Buttons */}
          <div className="grid grid-cols-4 gap-2">
            {mode === "prediction"
              ? [100, 250, 500, 1000].map((pts) => (
                  <Button
                    key={pts}
                    variant="outline"
                    size="sm"
                    onClick={() => setAmount(pts.toString())}
                    className="font-mono"
                  >
                    {pts}
                  </Button>
                ))
              : [10, 25, 50, 100].map((usd) => (
                  <Button
                    key={usd}
                    variant="outline"
                    size="sm"
                    onClick={() => setAmount(usd.toString())}
                    className="font-mono"
                  >
                    ${usd}
                  </Button>
                ))}
          </div>

          {/* Payment Method (Pool only) */}
          {mode === "pool" && (
            <div>
              <Label className="text-sm text-muted-foreground mb-3 block">
                Payment Method
              </Label>
              <RadioGroup
                value={paymentMethod}
                onValueChange={(v) => setPaymentMethod(v as PaymentMethod)}
              >
                <div className="space-y-2">
                  <div className="flex items-center space-x-2 p-3 rounded-lg border border-border hover:bg-accent/50 cursor-pointer">
                    <RadioGroupItem value="wallet" id="wallet" />
                    <Label
                      htmlFor="wallet"
                      className="flex-1 cursor-pointer flex items-center gap-2"
                    >
                      <Wallet className="h-4 w-4" />
                      <div>
                        <div>Wallet Balance</div>
                        <div className="text-xs text-muted-foreground">
                          Available: ${userWalletBalance.toFixed(2)}
                        </div>
                      </div>
                    </Label>
                    {paymentMethod === "wallet" && (
                      <Check className="h-4 w-4 text-primary" />
                    )}
                  </div>

                  <div className="flex items-center space-x-2 p-3 rounded-lg border border-border hover:bg-accent/50 cursor-pointer">
                    <RadioGroupItem value="card" id="card" />
                    <Label
                      htmlFor="card"
                      className="flex-1 cursor-pointer flex items-center gap-2"
                    >
                      <CreditCard className="h-4 w-4" />
                      <div>
                        <div>Credit/Debit Card</div>
                        <div className="text-xs text-muted-foreground">
                          Via Stripe
                        </div>
                      </div>
                    </Label>
                    {paymentMethod === "card" && (
                      <Check className="h-4 w-4 text-primary" />
                    )}
                  </div>

                  <div className="flex items-center space-x-2 p-3 rounded-lg border border-border hover:bg-accent/50 cursor-pointer">
                    <RadioGroupItem value="crypto" id="crypto" />
                    <Label
                      htmlFor="crypto"
                      className="flex-1 cursor-pointer flex items-center gap-2"
                    >
                      <Wallet className="h-4 w-4" />
                      <div>
                        <div>Cryptocurrency</div>
                        <div className="text-xs text-muted-foreground">
                          USDC, USDT, ETH
                        </div>
                      </div>
                    </Label>
                    {paymentMethod === "crypto" && (
                      <Check className="h-4 w-4 text-primary" />
                    )}
                  </div>
                </div>
              </RadioGroup>
            </div>
          )}

          {/* Summary */}
          {amount && parseFloat(amount) > 0 && (
            <div className="p-4 rounded-lg border border-primary/20 bg-primary/5 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Position</span>
                <span className="font-medium text-foreground">
                  {direction === "BUY" ? "Yes (Long)" : "No (Short)"}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Stake</span>
                <span className="font-mono text-foreground font-bold">
                  {mode === "prediction"
                    ? `${parseFloat(amount).toLocaleString()} points`
                    : `$${parseFloat(amount).toFixed(2)}`}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Estimated shares</span>
                <span className="font-mono text-foreground">
                  {calculateShares().toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between text-sm pt-2 border-t border-primary/20">
                <span className="text-muted-foreground">Potential return</span>
                <span className="font-mono text-green-500 font-bold">
                  {mode === "prediction"
                    ? `+${(
                        parseFloat(amount) + calculatePotentialReturn()
                      ).toFixed(0)} pts`
                    : `+$${(
                        parseFloat(amount) + calculatePotentialReturn()
                      ).toFixed(2)}`}
                </span>
              </div>
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Max profit</span>
                <span className="font-mono">
                  {mode === "prediction"
                    ? `${calculatePotentialReturn().toFixed(0)} pts`
                    : `$${calculatePotentialReturn().toFixed(2)}`}
                </span>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-3 pt-2">
            <Button
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="flex-1"
              disabled={isProcessing}
            >
              Cancel
            </Button>
            <Button
              onClick={handleConfirm}
              className="flex-1"
              disabled={!isValid() || isProcessing}
            >
              {isProcessing ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  Confirm Bet
                  {mode === "prediction" && ` (${amount} pts)`}
                  {mode === "pool" && ` ($${amount})`}
                </>
              )}
            </Button>
          </div>

          {/* Disclaimer */}
          <p className="text-xs text-muted-foreground text-center">
            {mode === "prediction"
              ? "Points are non-refundable. Predict wisely!"
              : "Real money betting involves risk. Bet responsibly."}
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};
