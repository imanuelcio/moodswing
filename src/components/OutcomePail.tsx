import { Badge } from "./ui/badge";
import { TrendingUp, TrendingDown } from "lucide-react";

interface OutcomePillProps {
  name: string;
  price: number;
  change?: number;
  selected?: boolean;
  onClick?: () => void;
}

export const OutcomePill = ({
  name,
  price,
  change,
  selected,
  onClick,
}: OutcomePillProps) => {
  return (
    <button
      onClick={onClick}
      className={`
        px-4 py-3 rounded-lg border-2 transition-all text-left w-full
        ${
          selected
            ? "border-primary bg-primary/10 text-glow-red"
            : "border-border hover:border-primary/50 hover-neon-glow"
        }
      `}
    >
      <div className="flex items-center justify-between">
        <span className="font-medium text-foreground">{name}</span>
        <div className="flex items-center gap-2">
          {change !== undefined && (
            <div className="flex items-center gap-1 text-xs">
              {change >= 0 ? (
                <TrendingUp className="h-3 w-3 text-success" />
              ) : (
                <TrendingDown className="h-3 w-3 text-destructive" />
              )}
              <span
                className={change >= 0 ? "text-success" : "text-destructive"}
              >
                {Math.abs(change).toFixed(1)}%
              </span>
            </div>
          )}
          <Badge variant="secondary" className="font-mono">
            {(price * 100).toFixed(1)}¢
          </Badge>
        </div>
      </div>
    </button>
  );
};
