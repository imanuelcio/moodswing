import { Badge } from "@/components/ui/badge";

interface OutcomePillProps {
  name: string;
  price: number;
  change?: number;
  onClick?: () => void;
}

export function OutcomePill({
  name,
  price,
  change,
  onClick,
}: OutcomePillProps) {
  const isPositive = change && change > 0;
  const isNegative = change && change < 0;

  return (
    <Badge
      onClick={onClick}
      className={`flex w-full cursor-pointer items-center justify-between rounded-lg px-4 py-2 text-sm transition-all
        ${
          isPositive
            ? "bg-green-500/10 text-green-400 hover:bg-green-500/20"
            : ""
        }
        ${isNegative ? "bg-red-500/10 text-red-400 hover:bg-red-500/20" : ""}
        ${!change ? "bg-muted hover:bg-muted/70 text-muted-foreground" : ""}
      `}
    >
      <span>{name}</span>
      <span className="font-mono">
        {price.toFixed(2)}
        {change !== undefined && (
          <span
            className={`ml-2 text-xs ${
              isPositive
                ? "text-green-400"
                : isNegative
                ? "text-red-400"
                : "text-muted-foreground"
            }`}
          >
            {isPositive ? `+${change.toFixed(1)}%` : `${change.toFixed(1)}%`}
          </span>
        )}
      </span>
    </Badge>
  );
}
