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
  CheckCircle,
  XCircle,
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
import { CryptoChart } from "@/components/MarketChart";
import { useBinanceSSE } from "@/hooks/market/useMarketSSE";
import { getMarketById } from "@/hooks/market/api";
import type { Market } from "@/hooks/market/api";

// Format price untuk display
function formatPrice(price: number, symbol: string): string {
  if (symbol.includes("BTC") || symbol.includes("ETH")) {
    return price.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  }

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

  // Connect to Binance SSE for real-time price updates
  const {
    klineData,
    historicalData,
    isConnected,
    getCurrentPrice,
    getPriceChange,
  } = useBinanceSSE({
    marketId: id || "",
    enabled: !!id && !!market,
    onUpdate: (data) => {
      console.log("📊 Received Binance update:", data);
    },
    onError: (error) => {
      console.error("❌ Binance SSE error:", error);
    },
  });

  const currentPrice = getCurrentPrice();
  const priceChange24h = getPriceChange();

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

  // Calculate outcomes
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
      color: "green",
      icon: CheckCircle,
    },
    {
      key: "no",
      name: `No`,
      description: `Price ≤ $${threshold.toLocaleString()}`,
      price: noPrice,
      change: -priceChange24h,
      volume: 996046.84,
      color: "red",
      icon: XCircle,
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
              <Badge
                variant="outline"
                className={`${
                  isConnected
                    ? "border-green-500/50 text-green-500"
                    : "border-red-500/50 text-red-500"
                }`}
              >
                <div
                  className={`w-2 h-2 rounded-full mr-2 ${
                    isConnected ? "bg-green-500 animate-pulse" : "bg-red-500"
                  }`}
                />
                {isConnected ? "Live Data" : "Connecting..."}
              </Badge>
            </div>

            <h1 className="font-orbitron text-3xl md:text-4xl font-bold text-glow-red mb-4">
              {market.title}
            </h1>

            <p className="text-muted-foreground text-base max-w-4xl mb-6">
              {market.description}
            </p>
          </motion.div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column - Price & Outcomes */}
            <div className="lg:col-span-2 space-y-6">
              {/* Real-time Chart */}
              {historicalData.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 }}
                >
                  <CryptoChart
                    data={historicalData}
                    currentKline={klineData?.data}
                    symbol={market.symbol}
                    interval="1m"
                    priceChange={priceChange24h}
                    isConnected={isConnected}
                  />
                </motion.div>
              )}

              {/* Outcomes - Side by Side with Strong Colors */}
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
                  <CardContent>
                    {/* Side by Side Bet Options */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {outcomes.map((outcome, idx) => {
                        const OutcomeIcon = outcome.icon;
                        const isYes = outcome.key === "yes";

                        return (
                          <motion.div
                            key={outcome.key}
                            initial={{ opacity: 0, x: idx === 0 ? -20 : 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.1 + idx * 0.1 }}
                            className={`
                              relative overflow-hidden rounded-2xl border-2 transition-all cursor-pointer group
                              ${
                                isYes
                                  ? "border-green-500/50 bg-gradient-to-br from-green-500/10 via-green-500/5 to-transparent hover:border-green-500 hover:shadow-[0_0_30px_rgba(34,197,94,0.3)]"
                                  : "border-red-500/50 bg-gradient-to-br from-red-500/10 via-red-500/5 to-transparent hover:border-red-500 hover:shadow-[0_0_30px_rgba(239,68,68,0.3)]"
                              }
                            `}
                            onClick={() => handleBetClick(outcome.key)}
                          >
                            {/* Background Pattern */}
                            <div className="absolute inset-0 opacity-5">
                              <div
                                className={`absolute inset-0 ${
                                  isYes ? "bg-green-500" : "bg-red-500"
                                }`}
                              />
                            </div>

                            <div className="relative p-6 space-y-4">
                              {/* Header with Icon */}
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                  <div
                                    className={`
                                    p-3 rounded-xl ${
                                      isYes
                                        ? "bg-green-500/20 border border-green-500/30"
                                        : "bg-red-500/20 border border-red-500/30"
                                    }
                                  `}
                                  >
                                    <OutcomeIcon
                                      className={`
                                      h-6 w-6 ${
                                        isYes
                                          ? "text-green-500"
                                          : "text-red-500"
                                      }
                                    `}
                                    />
                                  </div>
                                  <div>
                                    <div
                                      className={`
                                      text-2xl font-bold font-orbitron ${
                                        isYes
                                          ? "text-green-500"
                                          : "text-red-500"
                                      }
                                    `}
                                    >
                                      {outcome.name}
                                    </div>
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

                              {/* Description */}
                              <div
                                className={`
                                text-sm font-medium px-3 py-2 rounded-lg ${
                                  isYes
                                    ? "bg-green-500/10 text-green-500/90"
                                    : "bg-red-500/10 text-red-500/90"
                                }
                              `}
                              >
                                {outcome.description}
                              </div>

                              {/* Price Display */}
                              <div className="space-y-2">
                                <div
                                  className={`
                                  text-5xl font-bold font-mono ${
                                    isYes ? "text-green-500" : "text-red-500"
                                  }
                                `}
                                >
                                  {(outcome.price * 100).toFixed(1)}¢
                                </div>
                                <div className="text-xs text-muted-foreground">
                                  ${(outcome.volume / 1000000).toFixed(2)}M
                                  volume
                                </div>
                              </div>

                              {/* Buy Button */}
                              <Button
                                size="lg"
                                className={`
                                  w-full font-semibold group-hover:scale-105 transition-all ${
                                    isYes
                                      ? "bg-green-500 hover:bg-green-600 text-white shadow-[0_0_20px_rgba(34,197,94,0.3)]"
                                      : "bg-red-500 hover:bg-red-600 text-white shadow-[0_0_20px_rgba(239,68,68,0.3)]"
                                  }
                                `}
                              >
                                Buy {outcome.name}
                              </Button>
                            </div>
                          </motion.div>
                        );
                      })}
                    </div>
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
              {klineData && (
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
                        <span className="font-mono">Binance</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Interval</span>
                        <Badge variant="outline">{klineData.interval}</Badge>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">
                          Last Update
                        </span>
                        <span className="font-mono">
                          {new Date(
                            klineData.data.close_time
                          ).toLocaleTimeString()}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Trades</span>
                        <span className="font-mono">
                          {klineData.data.trades_count.toLocaleString()}
                        </span>
                      </div>
                      <div className="pt-3 border-t border-border">
                        <a
                          href={`https://www.binance.com/en/trade/${market.symbol}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary hover:underline text-xs flex items-center gap-1"
                        >
                          View on Binance
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
