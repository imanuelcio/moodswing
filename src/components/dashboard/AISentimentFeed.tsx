import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Sparkles, TrendingUp, TrendingDown } from "lucide-react";
import { Sparklines, SparklinesLine } from "react-sparklines";

interface SentimentItem {
  id: string;
  symbol: string;
  name: string;
  score: number;
  label: "HYPE" | "NEUTRAL" | "FUD";
  change: number;
  sparkline: number[];
  color: string;
}

interface AISentimentFeedProps {
  sentimentFeed: SentimentItem[];
}

export const AISentimentFeed = ({ sentimentFeed }: AISentimentFeedProps) => {
  const getSentimentColor = (label: string) => {
    switch (label) {
      case "HYPE":
        return "text-green-500 bg-green-500/20 border-green-500/30";
      case "NEUTRAL":
        return "text-yellow-500 bg-yellow-500/20 border-yellow-500/30";
      case "FUD":
        return "text-red-500 bg-red-500/20 border-red-500/30";
      default:
        return "text-muted-foreground bg-muted/20 border-border";
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.9 }}
      className="glass-card rounded-xl border border-border"
    >
      <div className="px-4 py-3 border-b border-border bg-muted/20">
        <div className="flex items-center justify-between">
          <h3 className="font-orbitron text-lg font-bold flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            AI Sentiment Feed
          </h3>
          <Badge variant="outline" className="text-xs">
            Live
          </Badge>
        </div>
      </div>

      <div className="p-4 space-y-2">
        {sentimentFeed.map((item, idx) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1 + idx * 0.1 }}
            className="p-3 rounded-lg border border-border bg-muted/5 hover:bg-muted/10 transition-all group"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3 flex-1">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm"
                  style={{
                    backgroundColor: `${item.color}20`,
                    color: item.color,
                  }}
                >
                  {item.symbol}
                </div>

                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-semibold text-sm">{item.name}</h4>
                    <Badge
                      className={`text-xs ${getSentimentColor(item.label)}`}
                    >
                      {item.label}
                    </Badge>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1">
                      <p className="text-lg font-bold">{item.score}</p>
                      <span
                        className={`text-xs flex items-center ${
                          item.change > 0 ? "text-green-500" : "text-red-500"
                        }`}
                      >
                        {item.change > 0 ? (
                          <TrendingUp className="h-3 w-3" />
                        ) : (
                          <TrendingDown className="h-3 w-3" />
                        )}
                        {Math.abs(item.change)}
                      </span>
                    </div>

                    <div className="w-24 h-8">
                      <Sparklines data={item.sparkline}>
                        <SparklinesLine
                          color={item.color}
                          style={{ strokeWidth: 2 }}
                        />
                      </Sparklines>
                    </div>
                  </div>
                </div>
              </div>

              <Button
                size="sm"
                variant="outline"
                className="opacity-0 group-hover:opacity-100 transition-opacity"
              >
                Predict
              </Button>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};
