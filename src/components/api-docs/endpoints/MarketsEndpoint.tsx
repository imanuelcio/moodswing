import CodeBlock from "@/components/CodeBlock";
import { Badge } from "@/components/ui/badge";
import { TrendingUp } from "lucide-react";

// ==================== ENDPOINT: MARKETS ====================
const MarketsEndpoint = () => (
  <div className="space-y-6">
    <div className="flex items-center gap-3">
      <TrendingUp className="h-6 w-6 text-secondary" />
      <h2 className="text-3xl font-orbitron font-bold">Markets</h2>
    </div>

    <div className="glass-card rounded-xl p-6 border border-border space-y-4">
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <Badge className="bg-green-500/20 text-green-500 border-green-500/50">
              GET
            </Badge>
            <code className="text-lg font-mono font-semibold">/v1/markets</code>
          </div>
          <p className="text-muted-foreground">
            Retrieve all active prediction markets across all chains
          </p>
        </div>
      </div>

      <div className="space-y-3">
        <h4 className="text-sm font-semibold">Query Parameters</h4>
        <div className="space-y-2 text-sm">
          {[
            {
              param: "chain",
              desc: "Filter by blockchain (solana, ethereum, polygon, base)",
            },
            {
              param: "status",
              desc: "Filter by status (active, resolved, cancelled)",
            },
            {
              param: "limit",
              desc: "Number of results (default: 50, max: 100)",
            },
            { param: "page", desc: "Page number for pagination" },
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
          id="markets-response"
          language="json"
          code={`{
  "success": true,
  "data": {
    "markets": [
      {
        "id": "mkt_abc123",
        "title": "Will Bitcoin reach $100k by Q2 2025?",
        "chain": "solana",
        "status": "active",
        "total_volume": "2847562.40",
        "sentiment_score": 82,
        "yes_price": 0.68,
        "no_price": 0.32,
        "resolution_date": "2025-06-30T23:59:59Z",
        "created_at": "2025-01-15T12:00:00Z"
      }
    ],
    "pagination": {
      "total": 247,
      "page": 1,
      "per_page": 50
    }
  }
}`}
        />
      </div>
    </div>
  </div>
);

export default MarketsEndpoint;
