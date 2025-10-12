import { useState } from "react";
import { useParams } from "react-router-dom";
import { SiteHeader } from "@/components/SiteHeader";
import { Footer } from "@/components/Footer";
import { LiveBets } from "@/components/LiveBets";
import { BetDialog } from "@/components/BetDialog";
import { PositionsTable } from "@/components/PositionsTable";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowDownRight, ArrowUpRight, Clock, Users } from "lucide-react";
import {
  Activity,
  Globe,
  Target,
  BarChart3,
  TrendingUp,
  DollarSign,
  Trophy,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts";

export const MarketDetail = () => {
  const { id } = useParams();
  const [betDialogOpen, setBetDialogOpen] = useState(false);
  const [selectedOutcome, setSelectedOutcome] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("overview");

  const market = {
    id,
    title: "Will Bitcoin reach $100k by end of 2025?",
    description:
      "This market resolves to YES if Bitcoin (BTC) reaches or exceeds $100,000 USD on any major exchange (Binance, Coinbase, Kraken) before December 31, 2025 23:59:59 UTC. Price must be sustained for at least 5 minutes. Market will be resolved within 24 hours of the event or deadline.",
    category: "Crypto",
    status: "OPEN",
    closeAt: "2025-12-31T23:59:59Z",
    totalVolume: 2847562.4,
    participants: 1893,
    totalBets: 4567,
    sentiment_score: 82,
    outcomes: [
      { key: "yes", name: "Yes", price: 0.65, change: 2.3, volume: 1851515.56 },
      { key: "no", name: "No", price: 0.35, change: -2.3, volume: 996046.84 },
    ],
    chain: "Solana",
    createdAt: "2025-01-15T12:00:00Z",
  };

  const priceHistory = [
    { date: "Jan 15", yes: 0.55, no: 0.45 },
    { date: "Jan 20", yes: 0.58, no: 0.42 },
    { date: "Feb 1", yes: 0.62, no: 0.38 },
    { date: "Feb 10", yes: 0.6, no: 0.4 },
    { date: "Feb 20", yes: 0.63, no: 0.37 },
    { date: "Mar 1", yes: 0.65, no: 0.35 },
  ];

  const sentimentData = [
    { date: "Jan", score: 45 },
    { date: "Feb", score: 52 },
    { date: "Mar", score: 58 },
    { date: "Apr", score: 65 },
    { date: "May", score: 68 },
    { date: "Jun", score: 82 },
  ];

  const userPositions = [
    {
      id: "1",
      marketTitle: "Will Bitcoin reach $100k by end of 2025?",
      outcome: "Yes",
      direction: "BUY" as const,
      avgPrice: 0.62,
      quantity: 100,
      currentPrice: 0.65,
      pnl: 4.84,
    },
  ];

  const handleBetClick = (outcomeKey: string) => {
    setSelectedOutcome(outcomeKey);
    setBetDialogOpen(true);
  };

  const selectedOutcomeData = market.outcomes.find(
    (o) => o.key === selectedOutcome
  );

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-3">
                  <Badge variant="outline" className="border-primary/50">
                    {market.category}
                  </Badge>
                  <Badge
                    variant="default"
                    className="bg-green-500/20 text-green-500 border-green-500/50"
                  >
                    <Activity className="h-3 w-3 mr-1 animate-pulse" />
                    {market.status}
                  </Badge>
                  <Badge variant="outline" className="border-border">
                    <Globe className="h-3 w-3 mr-1" />
                    {market.chain}
                  </Badge>
                </div>
                <h1 className="font-orbitron text-3xl md:text-4xl font-bold text-glow-red mb-3">
                  {market.title}
                </h1>
                <p className="text-muted-foreground text-sm md:text-base max-w-3xl">
                  {market.description}
                </p>
              </div>
            </div>

            {/* Stats Bar */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="glass-card p-4 rounded-xl border border-border">
                <div className="flex items-center gap-2 text-muted-foreground text-sm mb-1">
                  <DollarSign className="h-4 w-4" />
                  Total Volume
                </div>
                <div className="text-2xl font-bold font-mono text-primary">
                  ${(market.totalVolume / 1000000).toFixed(2)}M
                </div>
              </div>
              <div className="glass-card p-4 rounded-xl border border-border">
                <div className="flex items-center gap-2 text-muted-foreground text-sm mb-1">
                  <Users className="h-4 w-4" />
                  Participants
                </div>
                <div className="text-2xl font-bold font-mono">
                  {market.participants.toLocaleString()}
                </div>
              </div>
              <div className="glass-card p-4 rounded-xl border border-border">
                <div className="flex items-center gap-2 text-muted-foreground text-sm mb-1">
                  <Trophy className="h-4 w-4" />
                  Total Bets
                </div>
                <div className="text-2xl font-bold font-mono">
                  {market.totalBets.toLocaleString()}
                </div>
              </div>
              <div className="glass-card p-4 rounded-xl border border-border">
                <div className="flex items-center gap-2 text-muted-foreground text-sm mb-1">
                  <Clock className="h-4 w-4" />
                  Closes In
                </div>
                <div className="text-2xl font-bold font-mono text-amber-500">
                  245d 12h
                </div>
              </div>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Price Chart */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <Card className="glass-card border-border">
                  <CardHeader>
                    <CardTitle className="font-orbitron flex items-center gap-2">
                      <TrendingUp className="h-5 w-5 text-primary" />
                      Price History
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <AreaChart data={priceHistory}>
                        <defs>
                          <linearGradient
                            id="yesGradient"
                            x1="0"
                            y1="0"
                            x2="0"
                            y2="1"
                          >
                            <stop
                              offset="5%"
                              stopColor="hsl(var(--primary))"
                              stopOpacity={0.3}
                            />
                            <stop
                              offset="95%"
                              stopColor="hsl(var(--primary))"
                              stopOpacity={0}
                            />
                          </linearGradient>
                          <linearGradient
                            id="noGradient"
                            x1="0"
                            y1="0"
                            x2="0"
                            y2="1"
                          >
                            <stop
                              offset="5%"
                              stopColor="hsl(var(--secondary))"
                              stopOpacity={0.3}
                            />
                            <stop
                              offset="95%"
                              stopColor="hsl(var(--secondary))"
                              stopOpacity={0}
                            />
                          </linearGradient>
                        </defs>
                        <CartesianGrid
                          strokeDasharray="3 3"
                          stroke="hsl(var(--border))"
                        />
                        <XAxis
                          dataKey="date"
                          stroke="hsl(var(--muted-foreground))"
                        />
                        <YAxis
                          stroke="hsl(var(--muted-foreground))"
                          domain={[0, 1]}
                          tickFormatter={(value) =>
                            `${(value * 100).toFixed(0)}%`
                          }
                        />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: "hsl(var(--background))",
                            border: "1px solid hsl(var(--border))",
                            borderRadius: "8px",
                          }}
                          formatter={(value: number) =>
                            `${(value * 100).toFixed(1)}%`
                          }
                        />
                        <Area
                          type="monotone"
                          dataKey="yes"
                          stroke="hsl(var(--primary))"
                          fill="url(#yesGradient)"
                          strokeWidth={2}
                        />
                        <Area
                          type="monotone"
                          dataKey="no"
                          stroke="hsl(var(--secondary))"
                          fill="url(#noGradient)"
                          strokeWidth={2}
                        />
                      </AreaChart>
                    </ResponsiveContainer>
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
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="sentiment">Sentiment</TabsTrigger>
                    <TabsTrigger value="positions">My Positions</TabsTrigger>
                  </TabsList>

                  <TabsContent value="overview" className="space-y-6 mt-6">
                    <LiveBets />
                  </TabsContent>

                  <TabsContent value="sentiment" className="mt-6">
                    <Card className="glass-card border-border">
                      <CardHeader>
                        <CardTitle className="font-orbitron flex items-center gap-2">
                          <BarChart3 className="h-5 w-5 text-primary" />
                          Sentiment Score Over Time
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ResponsiveContainer width="100%" height={300}>
                          <LineChart data={sentimentData}>
                            <CartesianGrid
                              strokeDasharray="3 3"
                              stroke="hsl(var(--border))"
                            />
                            <XAxis
                              dataKey="date"
                              stroke="hsl(var(--muted-foreground))"
                            />
                            <YAxis
                              stroke="hsl(var(--muted-foreground))"
                              domain={[0, 100]}
                            />
                            <Tooltip
                              contentStyle={{
                                backgroundColor: "hsl(var(--background))",
                                border: "1px solid hsl(var(--border))",
                                borderRadius: "8px",
                              }}
                            />
                            <Line
                              type="monotone"
                              dataKey="score"
                              stroke="hsl(var(--primary))"
                              strokeWidth={3}
                              dot={{ fill: "hsl(var(--primary))", r: 5 }}
                            />
                          </LineChart>
                        </ResponsiveContainer>
                      </CardContent>
                    </Card>
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

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Outcomes */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
              >
                <Card className="glass-card border-border">
                  <CardHeader>
                    <CardTitle className="font-orbitron flex items-center gap-2">
                      <Target className="h-5 w-5 text-primary" />
                      Place Your Bet
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {market.outcomes.map((outcome) => (
                      <div
                        key={outcome.key}
                        className="glass-card p-4 rounded-xl border border-border hover:border-primary/50 transition-all cursor-pointer group"
                        onClick={() => handleBetClick(outcome.key)}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-semibold text-lg">
                            {outcome.name}
                          </span>
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
                            {Math.abs(outcome.change)}%
                          </Badge>
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="text-3xl font-bold font-mono text-primary">
                              {(outcome.price * 100).toFixed(1)}¢
                            </div>
                            <div className="text-xs text-muted-foreground">
                              ${(outcome.volume / 1000000).toFixed(2)}M volume
                            </div>
                          </div>
                          <Button
                            size="sm"
                            className="bg-primary hover:bg-primary/90 group-hover:scale-105 transition-transform"
                          >
                            Buy
                          </Button>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </motion.div>

              {/* Market Info */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                <Card className="glass-card border-border">
                  <CardHeader>
                    <CardTitle className="font-orbitron text-lg">
                      Market Info
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Market ID</span>
                      <code className="font-mono text-xs">{market.id}</code>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Chain</span>
                      <Badge variant="outline">{market.chain}</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Created</span>
                      <span>Jan 15, 2025</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Closes</span>
                      <span>Dec 31, 2025</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Sentiment</span>
                      <div className="flex items-center gap-2">
                        <div className="text-primary font-bold">
                          {market.sentiment_score}
                        </div>
                        <Badge className="bg-primary/20 text-primary border-primary/50">
                          Bullish
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </div>
      </main>
      <Footer />

      {selectedOutcomeData && (
        <BetDialog
          open={betDialogOpen}
          onOpenChange={setBetDialogOpen}
          marketId={market.id || ""}
          outcomeName={selectedOutcomeData.name}
          currentPrice={selectedOutcomeData.price}
        />
      )}
    </div>
  );
};
export default MarketDetail;
