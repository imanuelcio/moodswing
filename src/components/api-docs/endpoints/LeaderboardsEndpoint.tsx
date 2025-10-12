import CodeBlock from "@/components/CodeBlock";
import { Badge } from "@/components/ui/badge";
import { Trophy } from "lucide-react";

// ==================== ENDPOINT: LEADERBOARDS ====================
const LeaderboardsEndpoint = () => (
  <div className="space-y-6">
    <div className="flex items-center gap-3">
      <Trophy className="h-6 w-6 text-secondary" />
      <h2 className="text-3xl font-orbitron font-bold">Leaderboards</h2>
    </div>

    <div className="glass-card rounded-xl p-6 border border-border space-y-4">
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <Badge className="bg-green-500/20 text-green-500 border-green-500/50">
              GET
            </Badge>
            <code className="text-lg font-mono font-semibold">
              /v1/leaderboards
            </code>
          </div>
          <p className="text-muted-foreground">
            Get top traders ranked by various metrics
          </p>
        </div>
      </div>

      <div className="space-y-3">
        <h4 className="text-sm font-semibold">Query Parameters</h4>
        <div className="space-y-2 text-sm">
          {[
            { param: "period", desc: "Time period (week, month, all-time)" },
            {
              param: "metric",
              desc: "Ranking metric (roi, winrate, volume, points)",
            },
            {
              param: "limit",
              desc: "Number of results (default: 10, max: 100)",
            },
          ].map((item) => (
            <div key={item.param} className="flex items-start gap-3">
              <code className="px-2 py-1 bg-primary/10 rounded text-xs font-mono">
                {item.param}
              </code>
              <span className="text-muted-foreground flex-1">{item.desc}</span>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h4 className="text-sm font-semibold mb-2">Example Response</h4>
        <CodeBlock
          id="leaderboard-response"
          language="json"
          code={`{
  "success": true,
  "data": {
    "period": "month",
    "metric": "roi",
    "leaderboard": [
      {
        "rank": 1,
        "user_id": "usr_123",
        "username": "crypto_king",
        "value": 145.2,
        "total_bets": 234,
        "win_rate": 68.5
      },
      {
        "rank": 2,
        "user_id": "usr_456",
        "username": "market_master",
        "value": 132.8,
        "total_bets": 189,
        "win_rate": 71.2
      }
    ]
  }
}`}
        />
      </div>
    </div>
  </div>
);

export default LeaderboardsEndpoint;
