import CodeBlock from "@/components/CodeBlock";
import { Badge } from "@/components/ui/badge";
import { DollarSign } from "lucide-react";

// ==================== ENDPOINT: BETS ====================
const BetsEndpoint = () => (
  <div className="space-y-6">
    <div className="flex items-center gap-3">
      <DollarSign className="h-6 w-6 text-secondary" />
      <h2 className="text-3xl font-orbitron font-bold">Place Bet</h2>
    </div>

    <div className="glass-card rounded-xl p-6 border border-border space-y-4">
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <Badge className="bg-blue-500/20 text-blue-500 border-blue-500/50">
              POST
            </Badge>
            <code className="text-lg font-mono font-semibold">
              /v1/markets/:id/bet
            </code>
          </div>
          <p className="text-muted-foreground">
            Place a bet on a prediction market (requires user authentication)
          </p>
        </div>
      </div>

      <div className="space-y-3">
        <h4 className="text-sm font-semibold">Request Body</h4>
        <CodeBlock
          id="bet-request"
          language="json"
          code={`{
  "outcome": "yes",
  "amount": "100.00",
  "max_slippage": 0.05
}`}
        />
      </div>

      <div>
        <h4 className="text-sm font-semibold mb-2">Example Response</h4>
        <CodeBlock
          id="bet-response"
          language="json"
          code={`{
  "success": true,
  "data": {
    "bet_id": "bet_xyz789",
    "market_id": "mkt_abc123",
    "user_id": "usr_123",
    "outcome": "yes",
    "amount": "100.00",
    "price": 0.68,
    "potential_payout": "147.06",
    "status": "pending",
    "transaction_hash": "0x1234...abcd",
    "created_at": "2025-01-15T12:00:00Z"
  }
}`}
        />
      </div>
    </div>
  </div>
);

export default BetsEndpoint;
