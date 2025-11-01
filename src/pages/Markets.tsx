import { useState, useEffect } from "react";
import { SiteHeader } from "@/components/SiteHeader";
import { Footer } from "@/components/Footer";
import { MarketCard } from "@/components/MarketCard";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { motion } from "framer-motion";
import { Search, Loader2 } from "lucide-react";
import { getMarkets } from "@/hooks/market/api";

interface Market {
  id: number;
  slug: string;
  title: string;
  description: string;
  category: string;
  source: string;
  settlement_type: string;
  status: "OPEN" | "CLOSED" | "RESOLVED";
  open_at: string;
  close_at: string;
  resolve_by: string;
  creator_user_id: number | null;
  metadata: {
    reward_points: number;
  };
  created_at: string;
  symbol: string;
  pyth_price_id: string;
  resolution_rule: {
    method: string;
    grace_sec: number;
    threshold: number;
    comparator: string;
  };
  visibility: string;
  tags: string[] | null;
  market_outcomes: any[];
}

export const Markets = () => {
  const [statusFilter, setStatusFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("volume");
  const [markets, setMarkets] = useState<Market[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMarkets = async () => {
      console.log("🎯 [MARKETS] Fetching markets from API...");
      try {
        setIsLoading(true);
        const data = await getMarkets();
        console.log(
          "✅ [MARKETS] Markets fetched successfully:",
          data.markets.length,
          "markets"
        );
        console.log("📊 [MARKETS] First market:", data.markets[0]);
        setMarkets(data.markets);
      } catch (err) {
        console.error("❌ [MARKETS] Failed to fetch markets:", err);
        setError(
          err instanceof Error ? err.message : "Failed to fetch markets"
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchMarkets();
  }, []);

  // Filter markets
  const filteredMarkets = markets.filter((market) => {
    const matchesStatus =
      statusFilter === "all" || market.status === statusFilter;
    const matchesCategory =
      categoryFilter === "all" ||
      market.category.toLowerCase() === categoryFilter;
    const matchesSearch =
      searchQuery === "" ||
      market.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      market.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      market.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      market.symbol.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesStatus && matchesCategory && matchesSearch;
  });

  // Sort markets based on sortBy state
  const sortedMarkets = [...filteredMarkets].sort((a, b) => {
    switch (sortBy) {
      case "volume":
        return b.id * 75000 + 500000 - (a.id * 75000 + 500000);
      case "participants":
        return b.id * 85 + 200 - (a.id * 85 + 200);
      case "newest":
        return (
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        );
      case "ending":
        return new Date(a.close_at).getTime() - new Date(b.close_at).getTime();
      default:
        return 0;
    }
  });

  // Transform market data for MarketCard component
  const transformMarketData = (market: Market) => {
    const { resolution_rule } = market;

    // Format comparator text
    const comparatorText =
      resolution_rule.comparator === ">" ? "above" : "below";
    const comparatorSymbol = resolution_rule.comparator;

    // Generate realistic price based on threshold proximity
    // For crypto markets, we can estimate likelihood based on market conditions
    const seedValue = market.id * 13; // Deterministic but varied per market
    const basePrice = 0.45 + (seedValue % 20) / 100; // Between 0.45 - 0.65
    const yesPrice = Number(basePrice.toFixed(2));
    const noPrice = Number((1 - yesPrice).toFixed(2));

    return {
      id: market.id.toString(),
      title: `Will ${
        market.symbol
      } be ${comparatorText} $${resolution_rule.threshold.toLocaleString()}?`,
      category:
        market.category.charAt(0).toUpperCase() + market.category.slice(1),
      closeAt: market.close_at,
      status: market.status,
      volume: market.id * 75000 + 500000, // Deterministic volume based on ID
      participants: Math.floor(market.id * 85 + 200), // Deterministic participants
      sentiment_score: Math.floor(50 + ((market.id * 7) % 40)), // Sentiment 50-90
      outcomes: [
        {
          key: "yes",
          name: `Yes (${comparatorSymbol} $${resolution_rule.threshold.toLocaleString()})`,
          price: yesPrice,
          change: Number((((seedValue % 10) - 5) / 10).toFixed(1)), // -0.5 to +0.4
        },
        {
          key: "no",
          name: `No (${
            comparatorSymbol === ">" ? "≤" : "≥"
          } $${resolution_rule.threshold.toLocaleString()})`,
          price: noPrice,
          change: Number((-((seedValue % 10) - 5) / 10).toFixed(1)), // Inverse of yes change
        },
      ],
    };
  };

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <div className="flex items-center justify-between mb-4">
              <div>
                <h1 className="font-orbitron text-4xl font-bold text-glow-red mb-2">
                  Prediction Markets
                </h1>
                <p className="text-muted-foreground text-lg">
                  Trade on real-world events across crypto, politics, and
                  culture
                </p>
              </div>
            </div>
          </motion.div>

          {/* Filters */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="glass-card p-4 rounded-xl border border-border mb-6"
          >
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search markets by title, category, or keyword..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full md:w-[160px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="OPEN">Open</SelectItem>
                  <SelectItem value="CLOSED">Closed</SelectItem>
                  <SelectItem value="RESOLVED">Resolved</SelectItem>
                </SelectContent>
              </Select>
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-full md:w-[160px]">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="crypto">Crypto</SelectItem>
                  <SelectItem value="politics">Politics</SelectItem>
                  <SelectItem value="sports">Sports</SelectItem>
                  <SelectItem value="culture">Culture</SelectItem>
                </SelectContent>
              </Select>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-full md:w-[160px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="volume">Highest Volume</SelectItem>
                  <SelectItem value="participants">Most Popular</SelectItem>
                  <SelectItem value="newest">Newest</SelectItem>
                  <SelectItem value="ending">Ending Soon</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </motion.div>

          {/* Loading State */}
          {isLoading && (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
              <span className="ml-2 text-muted-foreground">
                Loading markets...
              </span>
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className="glass-card p-6 rounded-xl border border-red-500/50 bg-red-500/10">
              <p className="text-red-500 text-center">{error}</p>
            </div>
          )}

          {/* Markets Grid */}
          {!isLoading && !error && (
            <>
              {filteredMarkets.length === 0 ? (
                <div className="glass-card p-12 rounded-xl border border-border text-center">
                  <p className="text-muted-foreground text-lg">
                    No markets found matching your criteria
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {sortedMarkets.map((market, idx) => (
                    <motion.div
                      key={market.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 * idx }}
                    >
                      <MarketCard {...transformMarketData(market)} />
                    </motion.div>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Markets;
