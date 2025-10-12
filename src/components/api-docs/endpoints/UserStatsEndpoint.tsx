import CodeBlock from "@/components/CodeBlock";
import { Badge } from "@/components/ui/badge";
import { Users } from "lucide-react";

// ==================== ENDPOINT: USER STATS ====================
const UserStatsEndpoint = () => (
  <div className="space-y-6">
    <div className="flex items-center gap-3">
      <Users className="h-6 w-6 text-secondary" />
      <h2 className="text-3xl font-orbitron font-bold">User Statistics</h2>
    </div>

    <div className="glass-card rounded-xl p-6 border border-border space-y-4">
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <Badge className="bg-green-500/20 text-green-500 border-green-500/50">
              GET
            </Badge>
            <code className="text-lg font-mono font-semibold">
              /v1/users/:id/stats
            </code>
          </div>
          <p className="text-muted-foreground">
            Get comprehensive statistics for a specific user
          </p>
        </div>
      </div>

      <div>
        <h4 className="text-sm font-semibold mb-2">Example Response</h4>
        <CodeBlock
          id="user-stats-response"
          language="json"
          code={`{
  "success": true,
  "data": {
    "user_id": "usr_123",
    "username": "crypto_king",
    "total_bets": 234,
    "total_volume": "45820.50",
    "total_profit": "8945.23",
    "roi": 145.2,
    "win_rate": 68.5,
    "current_streak": 5,
    "best_streak": 12,
    "rank": {
      "roi": 1,
      "volume": 3,
      "points": 2
    },
    "badges": ["top_10", "high_roller", "perfect_week"],
    "joined_at": "2024-08-15T12:00:00Z"
  }
}`}
        />
      </div>
    </div>
  </div>
);

export default UserStatsEndpoint;
