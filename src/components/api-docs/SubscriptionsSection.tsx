import { Target } from "lucide-react";
import CodeBlock from "../CodeBlock";

// ==================== SECTION: SUBSCRIPTIONS ====================
const SubscriptionsSection = () => (
  <div className="space-y-6">
    <div className="flex items-center gap-3">
      <Target className="h-6 w-6 text-primary" />
      <h2 className="text-3xl font-orbitron font-bold">
        WebSocket Subscriptions
      </h2>
    </div>

    <div className="glass-card rounded-xl p-6 border border-border space-y-4">
      <p className="text-muted-foreground">
        Available channels for real-time subscriptions
      </p>

      <div className="space-y-4">
        <div>
          <h4 className="text-sm font-semibold mb-2">Available Channels</h4>
          <div className="space-y-2">
            {[
              { channel: "markets", desc: "All market updates" },
              { channel: "market:{id}", desc: "Specific market updates" },
              { channel: "sentiment:{asset}", desc: "Asset sentiment updates" },
              { channel: "leaderboards", desc: "Leaderboard changes" },
            ].map((item) => (
              <div
                key={item.channel}
                className="flex items-start gap-3 p-3 bg-background/50 rounded-lg border border-border"
              >
                <code className="px-2 py-1 bg-primary/10 rounded text-xs font-mono">
                  {item.channel}
                </code>
                <span className="text-sm text-muted-foreground flex-1">
                  {item.desc}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h4 className="text-sm font-semibold mb-2">Example Message</h4>
          <CodeBlock
            id="ws-message"
            language="json"
            code={`{
  "type": "market_update",
  "channel": "market:mkt_abc123",
  "data": {
    "market_id": "mkt_abc123",
    "yes_price": 0.68,
    "no_price": 0.32,
    "total_volume": "2847562.40",
    "timestamp": "2025-01-15T12:00:00Z"
  }
}`}
          />
        </div>
      </div>
    </div>
  </div>
);

export default SubscriptionsSection;
