import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { motion, AnimatePresence } from "framer-motion";
import {
  Gift,
  TrendingUp,
  Loader2,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  Sparkles,
  Target,
  TrendingDown,
  Activity,
} from "lucide-react";

interface CreatorPost {
  id: string;
  creator: {
    id: string;
    username: string;
    displayName: string;
    avatar?: string;
    verified: boolean;
    predictionAccuracy: number;
  };
  content: string;
  sentiment: "bullish" | "bearish" | "neutral";
  prediction: {
    topic: string;
    direction: "long" | "short";
    confidence: number;
  };
  isHighQuality: boolean;
}

interface TipPostModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  post: CreatorPost | null;
  onTipSuccess?: () => void;
}

export const TipPostModal = ({
  open,
  onOpenChange,
  post,
  onTipSuccess,
}: TipPostModalProps) => {
  const [tipAmount, setTipAmount] = useState<number>(100);
  const [customAmount, setCustomAmount] = useState<string>("");
  const [isTipping, setIsTipping] = useState(false);
  const [tipSuccess, setTipSuccess] = useState(false);
  const [tipError, setTipError] = useState<string | null>(null);
  const [txSignature, setTxSignature] = useState<string | null>(null);

  // Preset amounts
  const presetAmounts = [50, 100, 250, 500, 1000];

  // Calculate bonus (2% for high-quality posts)
  const bonusAmount =
    post && post.isHighQuality ? Math.round(tipAmount * 0.02) : 0;

  // User's SFI balance (mock - get from wallet context)
  const userBalance = 5000; // TODO: Get from wallet

  const handleTip = async () => {
    if (!post) return;

    setIsTipping(true);
    setTipError(null);
    setTipSuccess(false);

    try {
      // Validate amount
      if (tipAmount <= 0) {
        throw new Error("Tip amount must be greater than 0");
      }

      if (tipAmount > userBalance) {
        throw new Error("Insufficient SFI balance");
      }

      // TODO: Replace with actual tip transaction
      const response = await fetch("/api/posts/tip", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          postId: post.id,
          creatorId: post.creator.id,
          amount: tipAmount,
          walletAddress: "user_wallet_address", // Get from wallet context
        }),
      });

      if (!response.ok) {
        throw new Error("Tip transaction failed");
      }

      const data = await response.json();
      setTxSignature(data.signature);
      setTipSuccess(true);

      // Call success callback
      if (onTipSuccess) {
        onTipSuccess();
      }

      // Reset form after delay
      setTimeout(() => {
        handleClose();
      }, 3000);
    } catch (err) {
      console.error("Tip error:", err);
      setTipError(err instanceof Error ? err.message : "Failed to tip post");
    } finally {
      setIsTipping(false);
    }
  };

  const handleClose = () => {
    setTipAmount(100);
    setCustomAmount("");
    setTipSuccess(false);
    setTipError(null);
    setTxSignature(null);
    onOpenChange(false);
  };

  const handlePresetClick = (amount: number) => {
    setTipAmount(amount);
    setCustomAmount("");
  };

  const handleCustomAmountChange = (value: string) => {
    setCustomAmount(value);
    const numValue = parseInt(value) || 0;
    if (numValue > 0) {
      setTipAmount(numValue);
    }
  };

  const getSentimentIcon = (sentiment: string) => {
    switch (sentiment) {
      case "bullish":
        return TrendingUp;
      case "bearish":
        return TrendingDown;
      default:
        return Activity;
    }
  };

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case "bullish":
        return "text-green-500";
      case "bearish":
        return "text-red-500";
      default:
        return "text-blue-500";
    }
  };

  if (!post) return null;

  const SentimentIcon = getSentimentIcon(post.sentiment);

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="glass-card border-primary/30 max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-orbitron flex items-center gap-2">
            <Gift className="h-6 w-6 text-primary" />
            Tip Prediction
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 mt-4">
          {/* Creator Info */}
          <div className="flex items-center gap-4 glass-card p-4 rounded-xl border border-border">
            <Avatar className="h-14 w-14 border-2 border-primary/30">
              <AvatarImage src={post.creator.avatar} />
              <AvatarFallback>
                {post.creator.displayName[0]?.toUpperCase() || "?"}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="font-semibold text-lg truncate">
                  {post.creator.displayName}
                </h3>
                {post.creator.verified && (
                  <CheckCircle2 className="h-4 w-4 text-blue-500 shrink-0" />
                )}
              </div>
              <p className="text-sm text-muted-foreground">
                {post.creator.predictionAccuracy.toFixed(1)}% accuracy
              </p>
            </div>
          </div>

          {/* Prediction Summary */}
          <div className="glass-card rounded-xl p-4 border border-border">
            <div className="flex items-center gap-2 mb-3">
              <Target className="h-4 w-4 text-primary" />
              <span className="font-semibold">{post.prediction.topic}</span>
            </div>
            <div className="flex items-center gap-4 text-sm mb-3">
              <Badge
                className={
                  getSentimentColor(post.sentiment) + " bg-transparent border"
                }
              >
                <SentimentIcon className="h-3 w-3 mr-1" />
                {post.sentiment}
              </Badge>
              <span className="text-muted-foreground">
                Direction:{" "}
                <strong
                  className={
                    post.prediction.direction === "long"
                      ? "text-green-500"
                      : "text-red-500"
                  }
                >
                  {post.prediction.direction.toUpperCase()}
                </strong>
              </span>
              <span className="text-muted-foreground">
                Confidence: <strong>{post.prediction.confidence}%</strong>
              </span>
            </div>
            <p className="text-sm text-muted-foreground line-clamp-3">
              {post.content}
            </p>
          </div>

          {/* Quality Badge */}
          {post.isHighQuality && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="glass-card rounded-lg p-3 border border-green-500/30 bg-green-500/5"
            >
              <div className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-green-500" />
                <div className="flex-1">
                  <p className="text-sm font-semibold text-green-500">
                    High-Quality Prediction
                  </p>
                  <p className="text-xs text-muted-foreground">
                    AI-verified quality • Earn 2% bonus on your tip!
                  </p>
                </div>
              </div>
            </motion.div>
          )}

          {/* Tip Amount Selection */}
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-2 block">
                Select Tip Amount
              </label>
              <div className="grid grid-cols-5 gap-2">
                {presetAmounts.map((amount) => (
                  <Button
                    key={amount}
                    variant={tipAmount === amount ? "default" : "outline"}
                    size="sm"
                    onClick={() => handlePresetClick(amount)}
                    className={tipAmount === amount ? "bg-primary" : ""}
                  >
                    {amount}
                  </Button>
                ))}
              </div>
            </div>

            {/* Custom Amount */}
            <div>
              <label className="text-sm font-medium mb-2 block">
                Or Enter Custom Amount
              </label>
              <div className="relative">
                <Input
                  type="number"
                  placeholder="Enter amount..."
                  value={customAmount}
                  onChange={(e) => handleCustomAmountChange(e.target.value)}
                  className="border-border pr-16"
                  min="1"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground font-semibold">
                  SFI
                </span>
              </div>
            </div>

            {/* Slider */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Amount</span>
                <span className="font-semibold">{tipAmount} SFI</span>
              </div>
              <Slider
                value={[tipAmount]}
                onValueChange={([value]) => {
                  setTipAmount(value);
                  setCustomAmount("");
                }}
                min={10}
                max={Math.min(userBalance, 5000)}
                step={10}
                className="cursor-pointer"
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>10 SFI</span>
                <span>{Math.min(userBalance, 5000)} SFI</span>
              </div>
            </div>
          </div>

          {/* Breakdown */}
          <div className="glass-card rounded-lg p-4 border border-border space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Tip to Creator</span>
              <span className="font-semibold">{tipAmount} SFI</span>
            </div>
            {bonusAmount > 0 && (
              <div className="flex justify-between text-green-500">
                <span className="flex items-center gap-1">
                  <TrendingUp className="h-3 w-3" />
                  Your Bonus (2%)
                </span>
                <span className="font-semibold">+{bonusAmount} SFI</span>
              </div>
            )}
            <div className="flex justify-between pt-2 border-t border-border">
              <span className="text-muted-foreground">Your Balance</span>
              <span className="font-semibold">
                {userBalance.toLocaleString()} SFI
              </span>
            </div>
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>After Tip</span>
              <span>{(userBalance - tipAmount).toLocaleString()} SFI</span>
            </div>
          </div>

          {/* Success Message */}
          <AnimatePresence>
            {tipSuccess && txSignature && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="glass-card rounded-lg p-4 border border-green-500/50 bg-green-500/5"
              >
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 shrink-0" />
                  <div className="flex-1">
                    <h4 className="font-semibold text-green-500 mb-1">
                      Tip Sent Successfully!
                    </h4>
                    <p className="text-sm text-muted-foreground mb-2">
                      Your tip of {tipAmount} SFI has been sent
                      {bonusAmount > 0 &&
                        ` and you earned ${bonusAmount} SFI bonus!`}
                    </p>
                    <a
                      href={`https://solscan.io/tx/${txSignature}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-primary hover:underline flex items-center gap-1"
                    >
                      View transaction
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Error Message */}
          <AnimatePresence>
            {tipError && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="glass-card rounded-lg p-4 border border-destructive/50 bg-destructive/5"
              >
                <div className="flex items-start gap-3">
                  <AlertCircle className="h-5 w-5 text-destructive mt-0.5 shrink-0" />
                  <div className="flex-1">
                    <h4 className="font-semibold text-destructive mb-1">
                      Tip Failed
                    </h4>
                    <p className="text-sm text-muted-foreground">{tipError}</p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Buttons */}
          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={handleClose}
              disabled={isTipping}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              onClick={handleTip}
              disabled={
                isTipping ||
                tipSuccess ||
                tipAmount <= 0 ||
                tipAmount > userBalance
              }
              className="flex-1 bg-primary hover:bg-primary/90 hover-neon-glow"
            >
              {isTipping ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Sending...
                </>
              ) : tipSuccess ? (
                <>
                  <CheckCircle2 className="mr-2 h-4 w-4" />
                  Sent!
                </>
              ) : (
                <>
                  <Gift className="mr-2 h-4 w-4" />
                  Send Tip
                </>
              )}
            </Button>
          </div>

          {/* Info */}
          <p className="text-xs text-muted-foreground text-center">
            Tips support quality creators.{" "}
            {bonusAmount > 0
              ? "You'll receive a 2% bonus!"
              : "High-quality posts earn you a 2% bonus!"}
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};
