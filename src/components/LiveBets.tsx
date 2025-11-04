import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { TrendingUp, TrendingDown } from "lucide-react";

interface Bet {
  id: string;
  username: string;
  direction: "BUY" | "SELL";
  outcome: string;
  amount: number;
  timestamp: string;
}

export const LiveBets = () => {
  // Mock live bets data
  const liveBets: Bet[] = [
    {
      id: "1",
      username: "trader_01",
      direction: "BUY",
      outcome: "Yes",
      amount: 250,
      timestamp: "2s ago",
    },
    // {
    //   id: "2",
    //   username: "crypto_whale",
    //   direction: "SELL",
    //   outcome: "No",
    //   amount: 500,
    //   timestamp: "5s ago",
    // },
    // {
    //   id: "3",
    //   username: "moon_boy",
    //   direction: "BUY",
    //   outcome: "Yes",
    //   amount: 150,
    //   timestamp: "12s ago",
    // },
    // {
    //   id: "4",
    //   username: "bear_hunter",
    //   direction: "SELL",
    //   outcome: "No",
    //   amount: 320,
    //   timestamp: "18s ago",
    // },
    // {
    //   id: "5",
    //   username: "nft_king",
    //   direction: "BUY",
    //   outcome: "Yes",
    //   amount: 420,
    //   timestamp: "25s ago",
    // },
  ];

  return (
    <Card className="glass-card border-border">
      <CardHeader>
        <CardTitle className="font-orbitron text-glow-red">Live Bets</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {liveBets.map((bet) => (
            <div
              key={bet.id}
              className="flex items-center justify-between p-3 rounded-lg border border-border hover:border-primary/50 transition-all"
            >
              <div className="flex items-center gap-3">
                {bet.direction === "BUY" ? (
                  <TrendingUp className="h-4 w-4 text-success" />
                ) : (
                  <TrendingDown className="h-4 w-4 text-destructive" />
                )}
                <div>
                  <p className="font-medium text-sm">{bet.username}</p>
                  <p className="text-xs text-muted-foreground">
                    {bet.timestamp}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Badge
                  variant={bet.direction === "BUY" ? "default" : "secondary"}
                >
                  {bet.direction}
                </Badge>
                <span className="font-mono text-sm">{bet.outcome}</span>
                <span className="font-mono text-primary font-semibold">
                  {bet.amount} pts
                </span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
