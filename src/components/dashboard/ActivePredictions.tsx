import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Activity, TrendingUp, TrendingDown, Timer } from "lucide-react";

interface Prediction {
  id: string;
  market: string;
  side: "Long" | "Short";
  stake: number;
  currentScore: number;
  scoreChange: number;
  potentialPayout: number;
  expiresIn: string;
  status: "active" | "winning";
}

interface ActivePredictionsProps {
  predictions: Prediction[];
}

export const ActivePredictions = ({ predictions }: ActivePredictionsProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.6 }}
      className="glass-card rounded-xl border border-border"
    >
      <div className="px-4 py-3 border-b border-border bg-muted/20">
        <div className="flex items-center justify-between">
          <h3 className="font-orbitron text-lg font-bold flex items-center gap-2">
            <Activity className="h-5 w-5 text-primary" />
            Active Predictions
          </h3>
          <Badge variant="secondary">{predictions.length}</Badge>
        </div>
      </div>

      <div className="p-4 space-y-3">
        {predictions.map((pred, idx) => (
          <motion.div
            key={pred.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 + idx * 0.1 }}
            className="p-4 rounded-lg border border-border bg-muted/5 hover:bg-muted/10 transition-all"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <h4 className="font-semibold text-sm mb-1">{pred.market}</h4>
                <div className="flex items-center gap-2">
                  <Badge
                    variant={pred.side === "Long" ? "default" : "secondary"}
                    className="text-xs"
                  >
                    {pred.side}
                  </Badge>
                  <span className="text-xs text-muted-foreground">
                    Stake: {pred.stake} pts
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-1 text-xs">
                <Timer className="h-3 w-3" />
                {pred.expiresIn}
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div>
                <p className="text-xs text-muted-foreground mb-1">
                  Current Score
                </p>
                <div className="flex items-center gap-1">
                  <p className="text-lg font-bold">{pred.currentScore}</p>
                  {pred.scoreChange !== 0 && (
                    <span
                      className={`text-xs flex items-center ${
                        pred.scoreChange > 0 ? "text-green-500" : "text-red-500"
                      }`}
                    >
                      {pred.scoreChange > 0 ? (
                        <TrendingUp className="h-3 w-3" />
                      ) : (
                        <TrendingDown className="h-3 w-3" />
                      )}
                      {Math.abs(pred.scoreChange)}
                    </span>
                  )}
                </div>
              </div>

              <div>
                <p className="text-xs text-muted-foreground mb-1">
                  Potential Payout
                </p>
                <p className="text-lg font-bold text-accent">
                  +{pred.potentialPayout}
                </p>
              </div>

              <div>
                <p className="text-xs text-muted-foreground mb-1">Status</p>
                <Badge
                  variant={pred.status === "winning" ? "default" : "secondary"}
                  className="text-xs"
                >
                  {pred.status === "winning" ? "Winning" : "Active"}
                </Badge>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};
