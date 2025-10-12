import CodeBlock from "@/components/CodeBlock";
import { Badge } from "@/components/ui/badge";
import { BarChart3 } from "lucide-react";

// ==================== ENDPOINT: SENTIMENT ====================
const SentimentEndpoint = () => (
  <div className="space-y-6">
    <div className="flex items-center gap-3">
      <BarChart3 className="h-6 w-6 text-secondary" />
      <h2 className="text-3xl font-orbitron font-bold">Sentiment Analysis</h2>
    </div>

    <div className="glass-card rounded-xl p-6 border border-border space-y-4">
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <Badge className="bg-green-500/20 text-green-500 border-green-500/50">
              GET
            </Badge>
            <code className="text-lg font-mono font-semibold">
              /v1/sentiment/:asset
            </code>
          </div>
          <p className="text-muted-foreground">
            Get real-time sentiment analysis for any crypto asset
          </p>
        </div>
      </div>

      <div>
        <h4 className="text-sm font-semibold mb-2">Example Response</h4>
        <CodeBlock
          id="sentiment-response"
          language="json"
          code={`{
  "success": true,
  "data": {
    "asset": "bitcoin",
    "score": 82,
    "sentiment": "bullish",
    "change_24h": 6.2,
    "volume_24h": "2847562.40",
    "social_mentions": 15234,
    "trending_tags": ["#BitcoinHype", "#BTCto100k", "#BullRun"],
    "chain_distribution": {
      "solana": 0.35,
      "ethereum": 0.42,
      "polygon": 0.15,
      "base": 0.08
    },
    "timestamp": "2025-01-15T12:00:00Z"
  }
}`}
        />
      </div>
    </div>
  </div>
);
export default SentimentEndpoint;
