import { motion } from "framer-motion";
import { Badge } from "./ui/badge";
import { Clock, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";

interface MarketCardProps {
  id: string;
  title: string;
  category: string;
  closeAt: string;
  status: "OPEN" | "CLOSED" | "RESOLVED";
  outcomes: Array<{
    key: string;
    name: string;
    price: number;
  }>;
}

export const MarketCard = ({
  id,
  title,
  category,
  closeAt,
  status,
  outcomes,
}: MarketCardProps) => {
  const timeRemaining = new Date(closeAt).getTime() - Date.now();
  const hours = Math.floor(timeRemaining / (1000 * 60 * 60));
  const days = Math.floor(hours / 24);

  return (
    <Link to={`/markets/${id}`}>
      <motion.div
        whileHover={{ scale: 1.02 }}
        className="glass-card p-4 rounded-xl border border-border hover:border-primary/50 transition-all hover-neon-glow cursor-pointer"
      >
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <h3 className="font-orbitron font-semibold text-foreground mb-1">
              {title}
            </h3>
            <Badge variant="outline" className="text-xs">
              {category}
            </Badge>
          </div>
          <Badge
            variant={
              status === "OPEN"
                ? "default"
                : status === "CLOSED"
                ? "secondary"
                : "outline"
            }
            className="ml-2"
          >
            {status}
          </Badge>
        </div>

        <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3">
          <Clock className="h-3 w-3" />
          {status === "OPEN" && days > 0
            ? `${days}d ${hours % 24}h`
            : `${hours}h left`}
        </div>

        <div className="space-y-2">
          {outcomes.slice(0, 2).map((outcome) => (
            <div
              key={outcome.key}
              className="flex items-center justify-between text-sm"
            >
              <span className="text-foreground/80">{outcome.name}</span>
              <div className="flex items-center gap-1">
                <TrendingUp className="h-3 w-3 text-success" />
                <span className="font-mono text-success">
                  {(outcome.price * 100).toFixed(1)}%
                </span>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </Link>
  );
};
