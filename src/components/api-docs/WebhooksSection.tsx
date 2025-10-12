import { Webhook } from "lucide-react";
import CodeBlock from "../CodeBlock";

// ==================== SECTION: WEBHOOKS ====================
const WebhooksSection = () => (
  <div className="space-y-6">
    <div className="flex items-center gap-3">
      <Webhook className="h-6 w-6 text-primary" />
      <h2 className="text-3xl font-orbitron font-bold">Webhooks</h2>
    </div>

    <div className="glass-card rounded-xl p-6 border border-border space-y-4">
      <p className="text-muted-foreground">
        Configure webhooks to receive notifications when specific events occur
      </p>

      <div className="space-y-4">
        <div>
          <h4 className="text-sm font-semibold mb-2">Available Events</h4>
          <div className="space-y-2">
            {[
              "market.created",
              "market.resolved",
              "bet.placed",
              "bet.settled",
              "leaderboard.updated",
            ].map((event) => (
              <div
                key={event}
                className="flex items-center gap-3 p-3 bg-background/50 rounded-lg border border-border"
              >
                <code className="px-2 py-1 bg-primary/10 rounded text-xs font-mono">
                  {event}
                </code>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h4 className="text-sm font-semibold mb-2">Webhook Payload</h4>
          <CodeBlock
            id="webhook-payload"
            language="json"
            code={`{
  "event": "bet.placed",
  "timestamp": "2025-01-15T12:00:00Z",
  "data": {
    "bet_id": "bet_xyz789",
    "market_id": "mkt_abc123",
    "user_id": "usr_123",
    "outcome": "yes",
    "amount": "100.00"
  }
}`}
          />
        </div>
      </div>
    </div>
  </div>
);

export default WebhooksSection;
