import CodeBlock from "@/components/CodeBlock";
import { Badge } from "@/components/ui/badge";
import { Activity } from "lucide-react";

// ==================== ENDPOINT: MARKET DETAILS ====================
const MarketDetailsEndpoint = () => (
  <div className="space-y-6">
    <div className="flex items-center gap-3">
      <Activity className="h-6 w-6 text-secondary" />
      <h2 className="text-3xl font-orbitron font-bold">Market Details</h2>
    </div>

    <div className="glass-card rounded-xl p-6 border border-border space-y-4">
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <Badge className="bg-green-500/20 text-green-500 border-green-500/50">
              GET
            </Badge>
            <code className="text-lg font-mono font-semibold">
              /v1/markets/:id
            </code>
          </div>
          <p className="text-muted-foreground">
            Get detailed information about a specific market including price
            history
          </p>
        </div>
      </div>

      <div>
        <h4 className="text-sm font-semibold mb-2">Example Response</h4>
        <CodeBlock
          id="market-detail-response"
          language="json"
          code={`{
  "success": true,
  "data": {
    "market": {
      "id": "mkt_abc123",
      "title": "Will Bitcoin reach $100k by Q2 2025?",
      "description": "Market resolves YES if Bitcoin reaches $100,000 or higher...",
      "chain": "solana",
      "status": "active",
      "total_volume": "2847562.40",
      "sentiment_score": 82,
      "yes_price": 0.68,
      "no_price": 0.32,
      "total_bets": 1893,
      "unique_traders": 847,
      "resolution_date": "2025-06-30T23:59:59Z",
      "created_at": "2025-01-15T12:00:00Z",
      "price_history": [
        { "timestamp": "2025-01-15T12:00:00Z", "yes": 0.55, "no": 0.45 },
        { "timestamp": "2025-01-15T18:00:00Z", "yes": 0.68, "no": 0.32 }
      ]
    }
  }
}`}
        />
      </div>
    </div>
  </div>
);

export default MarketDetailsEndpoint;
