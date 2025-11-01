import { motion } from "framer-motion";
import { TrendingUp, TrendingDown, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useEffect, useState } from "react";

interface Position {
  id: string;
  tag: string;
  side: "Long" | "Short";
  entryScore: number;
  currentScore: number;
  etaSeconds: number;
  estPayout: number;
  type: "points" | "money"; // NEW: Position type
  currency?: string; // NEW: For money type (e.g., "IDR", "USDT")
}

interface MyOpenPositionsProps {
  items: Position[];
}

export const MyOpenPositions = ({ items }: MyOpenPositionsProps) => {
  const [countdowns, setCountdowns] = useState<Record<string, number>>({});

  useEffect(() => {
    const initialCountdowns: Record<string, number> = {};
    items.forEach((item) => {
      initialCountdowns[item.id] = item.etaSeconds;
    });
    setCountdowns(initialCountdowns);

    const interval = setInterval(() => {
      setCountdowns((prev) => {
        const updated = { ...prev };
        items.forEach((item) => {
          if (updated[item.id] > 0) {
            updated[item.id] = updated[item.id] - 1;
          }
        });
        return updated;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [items]);

  const formatCountdown = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  const calculateProgress = (currentSeconds: number, totalSeconds: number) => {
    return ((totalSeconds - currentSeconds) / totalSeconds) * 100;
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const formatIDR = (amount: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const formatPayout = (amount: number, type: string, currency?: string) => {
    if (type === "money") {
      if (currency === "IDR") {
        return formatIDR(amount);
      }
      return `${amount.toLocaleString()} ${currency || "USD"}`;
    }
    return `${amount.toLocaleString()} pts`;
  };

  if (items.length === 0) {
    return (
      <div className="glass-card rounded-xl border border-border p-12 text-center">
        <p className="text-muted-foreground">No open positions</p>
      </div>
    );
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
    >
      {items.map((item) => {
        const delta = item.currentScore - item.entryScore;
        const isPositive = delta > 0;
        const progress = calculateProgress(
          countdowns[item.id] || item.etaSeconds,
          item.etaSeconds
        );

        return (
          <motion.div
            key={item.id}
            variants={cardVariants}
            whileHover={{ scale: 1.02 }}
            className="glass-card rounded-xl p-6 border border-border hover:border-primary/30 transition-all"
          >
            {/* Header: Tag + Side Badge + Type Badge */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h4 className="font-mono font-bold text-lg mb-2">{item.tag}</h4>
                <div className="flex items-center gap-2">
                  <span
                    className={`px-2.5 py-1 rounded-full text-xs font-mono font-semibold ${
                      item.side === "Long"
                        ? "bg-accent/20 text-accent border border-accent/30"
                        : "bg-primary/20 text-primary border border-primary/30"
                    }`}
                  >
                    {item.side}
                  </span>
                  <span
                    className={`px-2.5 py-1 rounded-full text-xs font-mono font-semibold ${
                      item.type === "money"
                        ? "bg-green-500/20 text-green-400 border border-green-500/30"
                        : "bg-blue-500/20 text-blue-400 border border-blue-500/30"
                    }`}
                  >
                    {item.type === "money" ? "💰 Real Money" : "⚡ Points"}
                  </span>
                </div>
              </div>
            </div>

            {/* Scores */}
            <div className="space-y-3 mb-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Entry</span>
                <span className="font-mono font-semibold">
                  {item.entryScore}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Current</span>
                <div className="flex items-center gap-2">
                  <span className="font-mono font-semibold">
                    {item.currentScore}
                  </span>
                  <span
                    className={`flex items-center text-xs font-mono font-semibold ${
                      isPositive ? "text-accent" : "text-primary"
                    }`}
                  >
                    {isPositive ? (
                      <TrendingUp className="h-3 w-3 mr-0.5" />
                    ) : (
                      <TrendingDown className="h-3 w-3 mr-0.5" />
                    )}
                    {isPositive ? "+" : ""}
                    {delta}
                  </span>
                </div>
              </div>
            </div>

            {/* Estimated Payout */}
            <div className="bg-muted/20 rounded-lg p-3 mb-4">
              <div className="text-xs text-muted-foreground mb-1">
                Est. Payout
              </div>
              <div
                className={`font-mono text-xl font-bold ${
                  item.type === "money" ? "text-green-400" : "text-accent"
                }`}
              >
                {formatPayout(item.estPayout, item.type, item.currency)}
              </div>
            </div>

            {/* Countdown + Progress */}
            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  <span className="font-mono">Resolves in</span>
                </div>
                <span className="font-mono font-semibold text-sm">
                  {formatCountdown(countdowns[item.id] || item.etaSeconds)}
                </span>
              </div>
              <div className="w-full bg-muted/20 rounded-full h-1.5 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.5 }}
                  className="h-full bg-gradient-to-r from-primary to-accent rounded-full"
                />
              </div>
            </div>

            {/* Close Early Button */}
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div>
                    <Button
                      size="sm"
                      variant="outline"
                      disabled
                      className="w-full font-mono border-border hover:border-border/80"
                    >
                      Close Early
                    </Button>
                  </div>
                </TooltipTrigger>
                <TooltipContent className="glass-card border-border">
                  <p className="text-sm">Coming soon</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </motion.div>
        );
      })}
    </motion.div>
  );
};
