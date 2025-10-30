import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Activity,
  Target,
  ArrowUpRight,
  ArrowDownRight,
  BarChart3,
  TrendingUp,
  TrendingDown,
  Loader2,
} from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BetDialog } from "@/components/BetDialog";
import { LiveBets } from "@/components/LiveBets";
import { PositionsTable } from "@/components/PositionsTable";
import { useMarketSSE } from "@/hooks/market/useMarketSSE";
import { getMarketById } from "@/hooks/market/api";
import type { Market } from "@/hooks/market/api";

// Pyth price formatting - prices come with 8 decimals
function formatPythPrice(price: string | number, decimals: number = 8): number {
  const priceNum = typeof price === "string" ? parseFloat(price) : price;
  return priceNum / Math.pow(10, decimals);
}

// Format price untuk display
function formatPrice(price: number, symbol: string): string {
  // BTC, ETH - show 2 decimals
  if (symbol.includes("BTC") || symbol.includes("ETH")) {
    return price.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  }

  // Stablecoins - show 4 decimals
  if (
    symbol.includes("USDC") ||
    symbol.includes("USDT") ||
    symbol.includes("DAI")
  ) {
    return price.toLocaleString("en-US", {
      minimumFractionDigits: 4,
      maximumFractionDigits: 4,
    });
  }

  // Others - show 2 decimals
  return price.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

export const MarketDetail = () => {
  const { id } = useParams();
  const [betDialogOpen, setBetDialogOpen] = useState(false);
  const [selectedOutcome, setSelectedOutcome] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("overview");
  const [market, setMarket] = useState<Market | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPrice, setCurrentPrice] = useState<number | null>(null);
  const [priceChange24h, setPriceChange24h] = useState<number>(0);
  const [initialPrice, setInitialPrice] = useState<number | null>(null);

  // Fetch initial market data
  useEffect(() => {
    const fetchMarket = async () => {
      if (!id) return;

      try {
        setIsLoading(true);
        const response = await getMarketById(id);
        setMarket(response.market);
      } catch (error) {
        console.error("Failed to fetch market:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMarket();
  }, [id]);

  // Connect to SSE for real-time price updates
  const { priceData } = useMarketSSE({
    marketId: id || "",
    enabled: !!id && !!market,
    onUpdate: (data) => {
      const formattedPrice = formatPythPrice(data.price);
      setCurrentPrice(formattedPrice);

      // Set initial price for 24h change calculation
      if (!initialPrice) {
        setInitialPrice(formattedPrice);
      } else {
        const change = ((formattedPrice - initialPrice) / initialPrice) * 100;
        setPriceChange24h(change);
      }
    },
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto mb-4" />
          <p className="text-muted-foreground">Loading market...</p>
        </div>
      </div>
    );
  }

  if (!market) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <p className="text-muted-foreground text-lg">Market not found</p>
        </div>
      </div>
    );
  }

  // Calculate outcomes based on current price and threshold
  const { resolution_rule } = market;
  const threshold = resolution_rule.threshold;
  const isAbove = currentPrice ? currentPrice > threshold : false;

  // Calculate implied probabilities
  const yesPrice =
    currentPrice && threshold
      ? Math.min(0.95, Math.max(0.05, currentPrice / (threshold * 1.5)))
      : 0.5;
  const noPrice = 1 - yesPrice;

  const outcomes = [
    {
      key: "yes",
      name: `Yes`,
      description: `Price > $${threshold.toLocaleString()}`,
      price: yesPrice,
      change: priceChange24h,
      volume: 1851515.56,
    },
    {
      key: "no",
      name: `No`,
      description: `Price ≤ $${threshold.toLocaleString()}`,
      price: noPrice,
      change: -priceChange24h,
      volume: 996046.84,
    },
  ];

  const userPositions = [
    {
      id: "1",
      marketTitle: market.title,
      outcome: "Yes",
      direction: "BUY" as const,
      avgPrice: 0.62,
      quantity: 100,
      currentPrice: yesPrice,
      pnl: (yesPrice - 0.62) * 100,
    },
  ];

  const handleBetClick = (outcomeKey: string) => {
    setSelectedOutcome(outcomeKey);
    setBetDialogOpen(true);
  };

  const selectedOutcomeData = outcomes.find((o) => o.key === selectedOutcome);

  // const daysUntilClose = Math.floor(
  //   (new Date(market.close_at).getTime() - Date.now()) / (1000 * 60 * 60 * 24)
  // );

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main className="flex-1">
        <div className="container mx-auto px-4 py-8 max-w-7xl">
          {/* Header Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            {/* Breadcrumb & Status */}
            <div className="flex items-center gap-3 mb-4">
              <Badge variant="outline" className="border-primary/50">
                {market.category}
              </Badge>
              <Badge
                variant="default"
                className={`${
                  market.status === "OPEN"
                    ? "bg-green-500/20 text-green-500 border-green-500/50"
                    : "bg-gray-500/20 text-gray-500 border-gray-500/50"
                }`}
              >
                <Activity className="h-3 w-3 mr-1 animate-pulse" />
                {market.status}
              </Badge>
              {/* <Badge
                variant="outline"
                className={`border-border ${
                  isConnected
                    ? "border-green-500/50 text-green-500"
                    : "border-red-500/50 text-red-500"
                }`}
              >
                <div
                  className={`h-2 w-2 rounded-full ${
                    isConnected ? "bg-green-500" : "bg-red-500"
                  } mr-2 animate-pulse`}
                />
                {isConnected ? "Live" : "Disconnected"}
              </Badge> */}
            </div>

            {/* Title */}
            <h1 className="font-orbitron text-3xl md:text-4xl font-bold text-glow-red mb-4">
              {market.title}
            </h1>

            {/* Description */}
            <p className="text-muted-foreground text-base max-w-4xl mb-6">
              {market.description}
            </p>

            {/* Stats Grid */}
            {/* <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="glass-card p-4 rounded-xl border border-border">
                <div className="flex items-center gap-2 text-muted-foreground text-sm mb-1">
                  <DollarSign className="h-4 w-4" />
                  Total Volume
                </div>
                <div className="text-2xl font-bold font-mono text-primary">
                  $2.85M
                </div>
              </div>
              <div className="glass-card p-4 rounded-xl border border-border">
                <div className="flex items-center gap-2 text-muted-foreground text-sm mb-1">
                  <Users className="h-4 w-4" />
                  Participants
                </div>
                <div className="text-2xl font-bold font-mono">1,893</div>
              </div>
              <div className="glass-card p-4 rounded-xl border border-border">
                <div className="flex items-center gap-2 text-muted-foreground text-sm mb-1">
                  <Trophy className="h-4 w-4" />
                  Total Bets
                </div>
                <div className="text-2xl font-bold font-mono">4,567</div>
              </div>
              <div className="glass-card p-4 rounded-xl border border-border">
                <div className="flex items-center gap-2 text-muted-foreground text-sm mb-1">
                  <Clock className="h-4 w-4" />
                  Closes In
                </div>
                <div className="text-2xl font-bold font-mono text-amber-500">
                  {daysUntilClose}d
                </div>
              </div>
            </div> */}
          </motion.div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column - Price & Outcomes */}
            <div className="lg:col-span-2 space-y-6">
              {/* Live Price Card */}
              {currentPrice && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                >
                  <Card className="glass-card border-primary/30 overflow-hidden">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-6">
                        <div>
                          <div className="text-sm text-muted-foreground mb-2">
                            Current Market Price
                          </div>
                          <div className="flex items-baseline gap-3">
                            <div className="text-5xl font-bold font-mono text-primary">
                              ${formatPrice(currentPrice, market.symbol)}
                            </div>
                            <Badge
                              variant="outline"
                              className={`text-base ${
                                priceChange24h >= 0
                                  ? "border-green-500/50 text-green-500"
                                  : "border-red-500/50 text-red-500"
                              }`}
                            >
                              {priceChange24h >= 0 ? (
                                <TrendingUp className="h-4 w-4 mr-1" />
                              ) : (
                                <TrendingDown className="h-4 w-4 mr-1" />
                              )}
                              {Math.abs(priceChange24h).toFixed(2)}%
                            </Badge>
                          </div>
                          <div className="text-sm text-muted-foreground mt-2">
                            {market.symbol} • {priceData?.source}
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm text-muted-foreground mb-1">
                            Threshold
                          </div>
                          <div className="text-2xl font-bold font-mono">
                            ${threshold.toLocaleString()}
                          </div>
                          <Badge
                            className={`mt-2 ${
                              isAbove
                                ? "bg-green-500/20 text-green-500 border-green-500/50"
                                : "bg-red-500/20 text-red-500 border-red-500/50"
                            }`}
                          >
                            {isAbove ? "Above" : "Below"}
                          </Badge>
                        </div>
                      </div>

                      {/* Price Info */}
                      <div className="grid grid-cols-3 gap-4 pt-4 border-t border-border">
                        <div>
                          <div className="text-xs text-muted-foreground mb-1">
                            Last Update
                          </div>
                          <div className="text-sm font-mono">
                            {priceData
                              ? new Date(priceData.ts).toLocaleTimeString()
                              : "-"}
                          </div>
                        </div>
                        <div>
                          <div className="text-xs text-muted-foreground mb-1">
                            Confidence
                          </div>
                          <div className="text-sm font-mono">
                            ±$
                            {priceData
                              ? formatPrice(
                                  formatPythPrice(priceData.conf),
                                  market.symbol
                                )
                              : "-"}
                          </div>
                        </div>
                        <div>
                          <div className="text-xs text-muted-foreground mb-1">
                            Source
                          </div>
                          <div className="text-sm font-mono">
                            {priceData?.source || "N/A"}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )}

              {/* Outcomes - Place Bet */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <Card className="glass-card border-border">
                  <CardHeader>
                    <CardTitle className="font-orbitron flex items-center gap-2">
                      <Target className="h-5 w-5 text-primary" />
                      Place Your Bet
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {outcomes.map((outcome) => (
                      <div
                        key={outcome.key}
                        className="glass-card p-5 rounded-xl border border-border hover:border-primary/50 transition-all cursor-pointer group"
                        onClick={() => handleBetClick(outcome.key)}
                      >
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <div className="text-xl font-bold mb-1">
                              {outcome.name}
                            </div>
                            <div className="text-sm text-muted-foreground">
                              {outcome.description}
                            </div>
                          </div>
                          <Badge
                            variant="outline"
                            className={`font-mono ${
                              outcome.change > 0
                                ? "border-green-500/50 text-green-500"
                                : "border-red-500/50 text-red-500"
                            }`}
                          >
                            {outcome.change > 0 ? (
                              <ArrowUpRight className="h-3 w-3 mr-1" />
                            ) : (
                              <ArrowDownRight className="h-3 w-3 mr-1" />
                            )}
                            {Math.abs(outcome.change).toFixed(1)}%
                          </Badge>
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="text-4xl font-bold font-mono text-primary mb-1">
                              {(outcome.price * 100).toFixed(1)}¢
                            </div>
                            <div className="text-xs text-muted-foreground">
                              ${(outcome.volume / 1000000).toFixed(2)}M volume
                            </div>
                          </div>
                          <Button
                            size="lg"
                            className="bg-primary hover:bg-primary/90 group-hover:scale-105 transition-transform"
                          >
                            Buy Shares
                          </Button>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </motion.div>

              {/* Tabs */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <Tabs value={activeTab} onValueChange={setActiveTab}>
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="overview">Live Activity</TabsTrigger>
                    <TabsTrigger value="positions">My Positions</TabsTrigger>
                  </TabsList>

                  <TabsContent value="overview" className="mt-6">
                    <LiveBets />
                  </TabsContent>

                  <TabsContent value="positions" className="mt-6">
                    <Card className="glass-card border-border">
                      <CardHeader>
                        <CardTitle className="font-orbitron">
                          Your Positions
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <PositionsTable positions={userPositions} />
                      </CardContent>
                    </Card>
                  </TabsContent>
                </Tabs>
              </motion.div>
            </div>

            {/* Right Sidebar - Market Info */}
            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
              >
                <Card className="glass-card border-border">
                  <CardHeader>
                    <CardTitle className="font-orbitron text-lg">
                      Market Details
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4 text-sm">
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Market ID</span>
                      <code className="font-mono text-xs bg-muted px-2 py-1 rounded">
                        {market.id}
                      </code>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Symbol</span>
                      <Badge variant="outline">{market.symbol}</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Type</span>
                      <Badge variant="outline">{market.settlement_type}</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Category</span>
                      <Badge variant="outline">{market.category}</Badge>
                    </div>
                    <div className="pt-4 border-t border-border">
                      <div className="flex justify-between mb-2">
                        <span className="text-muted-foreground">Created</span>
                        <span className="font-mono">
                          {new Date(market.created_at).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="flex justify-between mb-2">
                        <span className="text-muted-foreground">Opens</span>
                        <span className="font-mono">
                          {new Date(market.open_at).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="flex justify-between mb-2">
                        <span className="text-muted-foreground">Closes</span>
                        <span className="font-mono text-amber-500">
                          {new Date(market.close_at).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">
                          Resolves By
                        </span>
                        <span className="font-mono">
                          {new Date(market.resolve_by).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                    <div className="pt-4 border-t border-border">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-muted-foreground">
                          Resolution Method
                        </span>
                        <Badge variant="outline">
                          {resolution_rule.method}
                        </Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-muted-foreground">
                          Grace Period
                        </span>
                        <span className="font-mono">
                          {resolution_rule.grace_sec}s
                        </span>
                      </div>
                    </div>
                    {market.metadata?.reward_points && (
                      <div className="pt-4 border-t border-border">
                        <div className="flex justify-between items-center">
                          <span className="text-muted-foreground">
                            Reward Points
                          </span>
                          <Badge className="bg-amber-500/20 text-amber-500 border-amber-500/50">
                            {market.metadata.reward_points} pts
                          </Badge>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>

              {/* Price Feed Info */}
              {priceData && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <Card className="glass-card border-border">
                    <CardHeader>
                      <CardTitle className="font-orbitron text-lg flex items-center gap-2">
                        <BarChart3 className="h-5 w-5 text-primary" />
                        Price Feed
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Source</span>
                        <span className="font-mono">{priceData.source}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Price ID</span>
                        <code className="font-mono text-xs bg-muted px-2 py-1 rounded truncate max-w-[180px]">
                          {priceData.priceId.slice(0, 8)}...
                          {priceData.priceId.slice(-6)}
                        </code>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">
                          Last Update
                        </span>
                        <span className="font-mono">
                          {new Date(priceData.ts).toLocaleTimeString()}
                        </span>
                      </div>
                      <div className="pt-3 border-t border-border">
                        <a
                          href={`https://pyth.network/price-feeds/${priceData.priceId}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary hover:underline text-xs flex items-center gap-1"
                        >
                          View on Pyth Network
                          <ArrowUpRight className="h-3 w-3" />
                        </a>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />

      {selectedOutcomeData && (
        <BetDialog
          open={betDialogOpen}
          onOpenChange={setBetDialogOpen}
          marketId={market.id.toString() || ""}
          outcomeName={selectedOutcomeData.name}
          currentPrice={selectedOutcomeData.price}
        />
      )}
    </div>
  );
};

export default MarketDetail;
