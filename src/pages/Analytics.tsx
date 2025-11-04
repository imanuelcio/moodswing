import React, { useEffect, useState } from "react";
import { SiteHeader } from "@/components/SiteHeader";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion } from "framer-motion";
import {
  BarChart3,
  Activity,
  Users,
  DollarSign,
  Target,
  Zap,
  ArrowUpRight,
  ArrowDownRight,
  Flame,
  Trophy,
  Coins,
  Gift,
  Vote,
  Download,
} from "lucide-react";

// Types
interface AnalyticsMetrics {
  overview: {
    totalVolume: number;
    volumeChange: number;
    totalUsers: number;
    usersChange: number;
    totalMarkets: number;
    marketsChange: number;
    avgAccuracy: number;
    accuracyChange: number;
  };

  markets: {
    mostActive: Array<{
      id: string;
      title: string;
      volume: number;
      participants: number;
      category: string;
    }>;
    byCategory: Array<{
      category: string;
      count: number;
      volume: number;
    }>;
  };

  users: {
    topPredictors: Array<{
      id: string;
      name: string;
      avatar?: string;
      accuracy: number;
      totalPredictions: number;
      pointsEarned: number;
    }>;
    topTippers: Array<{
      id: string;
      name: string;
      avatar?: string;
      totalTipped: number;
      postsSupported: number;
      bonusEarned: number;
    }>;
  };

  governance: {
    proposalsCount: number;
    votersCount: number;
    participationRate: number;
    treasuryBalance: number;
  };

  staking: {
    totalStaked: number;
    totalStakers: number;
    avgStakeDuration: number;
    totalRewardsDistributed: number;
  };
}

// Dummy data
const dummyMetrics: AnalyticsMetrics = {
  overview: {
    totalVolume: 5847392,
    volumeChange: 12.5,
    totalUsers: 15847,
    usersChange: 8.3,
    totalMarkets: 127,
    marketsChange: 5.2,
    avgAccuracy: 67.8,
    accuracyChange: 2.1,
  },
  markets: {
    mostActive: [
      {
        id: "1",
        title: "BTC Price Prediction",
        volume: 1250000,
        participants: 2345,
        category: "Crypto",
      },
      {
        id: "2",
        title: "AI Development Trends",
        volume: 980000,
        participants: 1892,
        category: "Technology",
      },
      {
        id: "3",
        title: "Climate Change Actions",
        volume: 750000,
        participants: 1456,
        category: "Environment",
      },
    ],
    byCategory: [
      { category: "Crypto", count: 45, volume: 2100000 },
      { category: "Technology", count: 32, volume: 1800000 },
      { category: "Politics", count: 18, volume: 890000 },
      { category: "Sports", count: 15, volume: 650000 },
      { category: "Environment", count: 17, volume: 407392 },
    ],
  },
  users: {
    topPredictors: [
      {
        id: "1",
        name: "CryptoSage",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=sage",
        accuracy: 87.5,
        totalPredictions: 342,
        pointsEarned: 125000,
      },
      {
        id: "2",
        name: "TrendHunter",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=hunter",
        accuracy: 84.2,
        totalPredictions: 298,
        pointsEarned: 98500,
      },
      {
        id: "3",
        name: "MarketMaven",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=maven",
        accuracy: 81.8,
        totalPredictions: 267,
        pointsEarned: 87300,
      },
    ],
    topTippers: [
      {
        id: "1",
        name: "GenerosusDude",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=generous",
        totalTipped: 15000,
        postsSupported: 145,
        bonusEarned: 300,
      },
      {
        id: "2",
        name: "SupportKing",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=support",
        totalTipped: 12500,
        postsSupported: 98,
        bonusEarned: 250,
      },
      {
        id: "3",
        name: "ContentLover",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=lover",
        totalTipped: 9800,
        postsSupported: 76,
        bonusEarned: 196,
      },
    ],
  },
  governance: {
    proposalsCount: 24,
    votersCount: 3456,
    participationRate: 42.5,
    treasuryBalance: 2500000,
  },
  staking: {
    totalStaked: 3500000,
    totalStakers: 1892,
    avgStakeDuration: 45,
    totalRewardsDistributed: 125000,
  },
};

const Analytics = () => {
  const [metrics, setMetrics] = useState<AnalyticsMetrics>(dummyMetrics);
  const [timeRange, setTimeRange] = useState<"7d" | "30d" | "90d">("7d");
  const [activeTab, setActiveTab] = useState<
    "overview" | "markets" | "users" | "platform"
  >("overview");
  // const [isLoading, setIsLoading] = useState(false);

  const fetchAnalytics = async () => {
    //   setIsLoading(true);

    try {
      const response = await fetch(`/api/analytics?timeRange=${timeRange}`, {
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) throw new Error("Failed to fetch analytics");

      const data = await response.json();
      setMetrics(data.metrics);
    } catch (err) {
      console.error("Analytics fetch error:", err);
    } finally {
      // setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAnalytics();
  }, [timeRange]);

  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(2)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toString();
  };

  const formatCurrency = (num: number) => {
    return `$${formatNumber(num)}`;
  };

  const getChangeColor = (change: number) => {
    return change >= 0 ? "text-green-500" : "text-red-500";
  };

  const getChangeIcon = (change: number) => {
    return change >= 0 ? ArrowUpRight : ArrowDownRight;
  };

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          {/* Compact Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="font-orbitron text-3xl font-bold text-glow-red mb-1">
                Analytics
              </h1>
              <p className="text-sm text-muted-foreground">
                Platform performance & insights
              </p>
            </div>

            <div className="flex items-center gap-3">
              {/* Time Range Pills */}
              <div className="flex items-center gap-2 glass-card p-1 rounded-lg">
                {(["7d", "30d", "90d"] as const).map((range) => (
                  <Button
                    key={range}
                    variant={timeRange === range ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setTimeRange(range)}
                    className="h-8 px-3 text-xs"
                  >
                    {range === "7d" && "7 Days"}
                    {range === "30d" && "30 Days"}
                    {range === "90d" && "90 Days"}
                  </Button>
                ))}
              </div>

              {/* Export Button */}
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* LEFT SIDEBAR - STICKY */}
            <div className="lg:col-span-3">
              <div className="sticky top-24 space-y-4">
                {/* Quick Stats */}
                <Card className="glass-card border-border">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm font-semibold flex items-center gap-2">
                      <Zap className="h-4 w-4 text-amber-500" />
                      Quick Stats
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2 text-sm">
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Proposals</span>
                      <span className="font-mono font-semibold">
                        {metrics.governance.proposalsCount}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Stakers</span>
                      <span className="font-mono font-semibold">
                        {metrics.staking.totalStakers.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">
                        Participation
                      </span>
                      <span className="font-semibold text-green-500 text-xs">
                        {metrics.governance.participationRate.toFixed(1)}%
                      </span>
                    </div>
                    <div className="flex justify-between items-center pt-2 border-t border-border">
                      <span className="text-muted-foreground">Treasury</span>
                      <span className="font-mono font-semibold text-amber-500 text-xs">
                        {formatCurrency(metrics.governance.treasuryBalance)}
                      </span>
                    </div>
                  </CardContent>
                </Card>

                {/* Platform Health */}
                <Card className="glass-card border-border">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm font-semibold flex items-center gap-2">
                      <Activity className="h-4 w-4 text-blue-500" />
                      Platform Health
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="space-y-1">
                      <div className="flex justify-between items-center text-xs">
                        <span className="text-muted-foreground">Staking</span>
                        <span className="text-green-500 font-semibold">
                          Healthy
                        </span>
                      </div>
                      <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                        <div className="h-full bg-green-500 w-[85%]" />
                      </div>
                    </div>
                    <div className="space-y-1">
                      <div className="flex justify-between items-center text-xs">
                        <span className="text-muted-foreground">
                          Governance
                        </span>
                        <span className="text-blue-500 font-semibold">
                          Active
                        </span>
                      </div>
                      <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                        <div className="h-full bg-blue-500 w-[72%]" />
                      </div>
                    </div>
                    <div className="space-y-1">
                      <div className="flex justify-between items-center text-xs">
                        <span className="text-muted-foreground">Markets</span>
                        <span className="text-purple-500 font-semibold">
                          Growing
                        </span>
                      </div>
                      <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                        <div className="h-full bg-purple-500 w-[68%]" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* RIGHT CONTENT - SCROLLABLE */}
            <div className="lg:col-span-9">
              {/* Overview Metrics Grid - Compact */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6"
              >
                {/* Total Volume */}
                <Card className="glass-card border-border hover:border-primary/30 transition-all group">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="p-2 rounded-lg bg-blue-500/10 group-hover:bg-blue-500/20 transition-colors">
                        <DollarSign className="h-4 w-4 text-blue-500" />
                      </div>
                      <Badge
                        variant="outline"
                        className={`${getChangeColor(
                          metrics.overview.volumeChange
                        )} border-0 bg-transparent text-xs`}
                      >
                        {React.createElement(
                          getChangeIcon(metrics.overview.volumeChange),
                          { className: "h-3 w-3 mr-0.5" }
                        )}
                        {Math.abs(metrics.overview.volumeChange).toFixed(1)}%
                      </Badge>
                    </div>
                    <div className="text-xl font-bold font-mono mb-0.5">
                      {formatCurrency(metrics.overview.totalVolume)}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Total Volume
                    </div>
                  </CardContent>
                </Card>

                {/* Total Users */}
                <Card className="glass-card border-border hover:border-primary/30 transition-all group">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="p-2 rounded-lg bg-green-500/10 group-hover:bg-green-500/20 transition-colors">
                        <Users className="h-4 w-4 text-green-500" />
                      </div>
                      <Badge
                        variant="outline"
                        className={`${getChangeColor(
                          metrics.overview.usersChange
                        )} border-0 bg-transparent text-xs`}
                      >
                        {React.createElement(
                          getChangeIcon(metrics.overview.usersChange),
                          { className: "h-3 w-3 mr-0.5" }
                        )}
                        {Math.abs(metrics.overview.usersChange).toFixed(1)}%
                      </Badge>
                    </div>
                    <div className="text-xl font-bold font-mono mb-0.5">
                      {metrics.overview.totalUsers.toLocaleString()}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Total Users
                    </div>
                  </CardContent>
                </Card>

                {/* Total Markets */}
                <Card className="glass-card border-border hover:border-primary/30 transition-all group">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="p-2 rounded-lg bg-purple-500/10 group-hover:bg-purple-500/20 transition-colors">
                        <Target className="h-4 w-4 text-purple-500" />
                      </div>
                      <Badge
                        variant="outline"
                        className={`${getChangeColor(
                          metrics.overview.marketsChange
                        )} border-0 bg-transparent text-xs`}
                      >
                        {React.createElement(
                          getChangeIcon(metrics.overview.marketsChange),
                          { className: "h-3 w-3 mr-0.5" }
                        )}
                        {Math.abs(metrics.overview.marketsChange).toFixed(1)}%
                      </Badge>
                    </div>
                    <div className="text-xl font-bold font-mono mb-0.5">
                      {metrics.overview.totalMarkets}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Active Markets
                    </div>
                  </CardContent>
                </Card>

                {/* Avg Accuracy */}
                <Card className="glass-card border-border hover:border-primary/30 transition-all group">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="p-2 rounded-lg bg-amber-500/10 group-hover:bg-amber-500/20 transition-colors">
                        <Trophy className="h-4 w-4 text-amber-500" />
                      </div>
                      <Badge
                        variant="outline"
                        className={`${getChangeColor(
                          metrics.overview.accuracyChange
                        )} border-0 bg-transparent text-xs`}
                      >
                        {React.createElement(
                          getChangeIcon(metrics.overview.accuracyChange),
                          { className: "h-3 w-3 mr-0.5" }
                        )}
                        {Math.abs(metrics.overview.accuracyChange).toFixed(1)}%
                      </Badge>
                    </div>
                    <div className="text-xl font-bold font-mono mb-0.5">
                      {metrics.overview.avgAccuracy.toFixed(1)}%
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Avg Accuracy
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Tabs - Compact */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <Tabs
                  value={activeTab}
                  onValueChange={(v: any) => setActiveTab(v)}
                >
                  <TabsList className="glass-card grid grid-cols-4 mb-6 h-auto p-1">
                    <TabsTrigger value="overview" className="text-xs py-2">
                      <BarChart3 className="h-3.5 w-3.5 mr-1.5" />
                      Overview
                    </TabsTrigger>
                    <TabsTrigger value="markets" className="text-xs py-2">
                      <Target className="h-3.5 w-3.5 mr-1.5" />
                      Markets
                    </TabsTrigger>
                    <TabsTrigger value="users" className="text-xs py-2">
                      <Users className="h-3.5 w-3.5 mr-1.5" />
                      Users
                    </TabsTrigger>
                    <TabsTrigger value="platform" className="text-xs py-2">
                      <Activity className="h-3.5 w-3.5 mr-1.5" />
                      Platform
                    </TabsTrigger>
                  </TabsList>

                  {/* Overview Tab */}
                  <TabsContent value="overview" className="space-y-6 mt-0">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Staking Card */}
                      <Card className="glass-card border-border">
                        <CardHeader className="pb-3">
                          <CardTitle className="text-base font-semibold flex items-center gap-2">
                            <Coins className="h-4 w-4 text-amber-500" />
                            Staking Overview
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2.5 text-sm">
                          <div className="flex justify-between items-center">
                            <span className="text-muted-foreground">
                              Total Staked
                            </span>
                            <span className="font-mono font-semibold">
                              {formatNumber(metrics.staking.totalStaked)} SFI
                            </span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-muted-foreground">
                              Stakers
                            </span>
                            <span className="font-mono font-semibold">
                              {metrics.staking.totalStakers.toLocaleString()}
                            </span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-muted-foreground">
                              Avg Duration
                            </span>
                            <span className="font-mono font-semibold">
                              {metrics.staking.avgStakeDuration}d
                            </span>
                          </div>
                          <div className="flex justify-between items-center pt-2 border-t border-border">
                            <span className="text-muted-foreground">
                              Rewards Paid
                            </span>
                            <span className="font-mono font-semibold text-green-500">
                              {formatNumber(
                                metrics.staking.totalRewardsDistributed
                              )}{" "}
                              SFI
                            </span>
                          </div>
                        </CardContent>
                      </Card>

                      {/* Governance Card */}
                      <Card className="glass-card border-border">
                        <CardHeader className="pb-3">
                          <CardTitle className="text-base font-semibold flex items-center gap-2">
                            <Vote className="h-4 w-4 text-blue-500" />
                            Governance Stats
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2.5 text-sm">
                          <div className="flex justify-between items-center">
                            <span className="text-muted-foreground">
                              Proposals
                            </span>
                            <span className="font-mono font-semibold">
                              {metrics.governance.proposalsCount}
                            </span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-muted-foreground">
                              Voters
                            </span>
                            <span className="font-mono font-semibold">
                              {metrics.governance.votersCount.toLocaleString()}
                            </span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-muted-foreground">
                              Participation
                            </span>
                            <span className="font-semibold text-green-500">
                              {metrics.governance.participationRate.toFixed(1)}%
                            </span>
                          </div>
                          <div className="flex justify-between items-center pt-2 border-t border-border">
                            <span className="text-muted-foreground">
                              Treasury
                            </span>
                            <span className="font-mono font-semibold text-amber-500">
                              {formatCurrency(
                                metrics.governance.treasuryBalance
                              )}
                            </span>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </TabsContent>

                  {/* Markets Tab */}
                  <TabsContent value="markets" className="space-y-6 mt-0">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      {/* Most Active */}
                      <Card className="glass-card border-border">
                        <CardHeader className="pb-3">
                          <CardTitle className="text-base font-semibold flex items-center gap-2">
                            <Flame className="h-4 w-4 text-orange-500" />
                            Most Active
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2">
                          {metrics.markets.mostActive.map((market, idx) => (
                            <div
                              key={market.id}
                              className="flex items-center gap-3 p-2.5 rounded-lg border border-border hover:bg-accent/50 transition-all cursor-pointer"
                            >
                              <div className="flex items-center justify-center w-6 h-6 rounded-full bg-primary/10 font-bold text-primary text-xs">
                                {idx + 1}
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="font-semibold text-sm truncate">
                                  {market.title}
                                </div>
                                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                  <Badge
                                    variant="outline"
                                    className="text-[10px] px-1.5 py-0"
                                  >
                                    {market.category}
                                  </Badge>
                                  <span className="flex items-center gap-0.5">
                                    <Users className="h-3 w-3" />
                                    {market.participants.toLocaleString()}
                                  </span>
                                </div>
                              </div>
                              <div className="text-right">
                                <div className="font-bold font-mono text-primary text-sm">
                                  {formatCurrency(market.volume)}
                                </div>
                              </div>
                            </div>
                          ))}
                        </CardContent>
                      </Card>

                      {/* By Category */}
                      <Card className="glass-card border-border">
                        <CardHeader className="pb-3">
                          <CardTitle className="text-base font-semibold flex items-center gap-2">
                            <Target className="h-4 w-4 text-purple-500" />
                            By Category
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                          {metrics.markets.byCategory.map((cat) => {
                            const totalVolume =
                              metrics.markets.byCategory.reduce(
                                (sum, c) => sum + c.volume,
                                0
                              );
                            const percentage = (cat.volume / totalVolume) * 100;

                            return (
                              <div key={cat.category}>
                                <div className="flex items-center justify-between mb-1.5">
                                  <div className="flex items-center gap-2">
                                    <span className="font-semibold text-sm">
                                      {cat.category}
                                    </span>
                                    <Badge
                                      variant="outline"
                                      className="text-[10px] px-1.5 py-0"
                                    >
                                      {cat.count}
                                    </Badge>
                                  </div>
                                  <div className="text-xs font-mono font-semibold">
                                    {formatCurrency(cat.volume)}
                                  </div>
                                </div>
                                <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                                  <div
                                    className="h-full bg-gradient-to-r from-primary to-secondary transition-all"
                                    style={{ width: `${percentage}%` }}
                                  />
                                </div>
                              </div>
                            );
                          })}
                        </CardContent>
                      </Card>
                    </div>
                  </TabsContent>

                  {/* Users Tab */}
                  <TabsContent value="users" className="space-y-6 mt-0">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      {/* Top Predictors */}
                      <Card className="glass-card border-border">
                        <CardHeader className="pb-3">
                          <CardTitle className="text-base font-semibold flex items-center gap-2">
                            <Trophy className="h-4 w-4 text-amber-500" />
                            Top Predictors
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2">
                          {metrics.users.topPredictors.map((user, idx) => (
                            <div
                              key={user.id}
                              className="flex items-center gap-3 p-2.5 rounded-lg border border-border hover:bg-accent/50 transition-all"
                            >
                              <div className="flex items-center justify-center w-5 h-5 rounded-full bg-amber-500/10 font-bold text-amber-500 text-xs">
                                {idx + 1}
                              </div>
                              <img
                                src={user.avatar}
                                alt={user.name}
                                className="w-8 h-8 rounded-full border-2 border-border"
                              />
                              <div className="flex-1 min-w-0">
                                <div className="font-semibold text-sm truncate">
                                  {user.name}
                                </div>
                                <div className="text-xs text-muted-foreground">
                                  {user.totalPredictions} predictions
                                </div>
                              </div>
                              <div className="text-right">
                                <div className="font-bold text-green-500 text-sm">
                                  {user.accuracy.toFixed(1)}%
                                </div>
                                <div className="text-xs text-muted-foreground">
                                  {formatNumber(user.pointsEarned)}
                                </div>
                              </div>
                            </div>
                          ))}
                        </CardContent>
                      </Card>

                      {/* Top Tippers */}
                      <Card className="glass-card border-border">
                        <CardHeader className="pb-3">
                          <CardTitle className="text-base font-semibold flex items-center gap-2">
                            <Gift className="h-4 w-4 text-pink-500" />
                            Top Tippers
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2">
                          {metrics.users.topTippers.map((user, idx) => (
                            <div
                              key={user.id}
                              className="flex items-center gap-3 p-2.5 rounded-lg border border-border hover:bg-accent/50 transition-all"
                            >
                              <div className="flex items-center justify-center w-5 h-5 rounded-full bg-pink-500/10 font-bold text-pink-500 text-xs">
                                {idx + 1}
                              </div>
                              <img
                                src={user.avatar}
                                alt={user.name}
                                className="w-8 h-8 rounded-full border-2 border-border"
                              />
                              <div className="flex-1 min-w-0">
                                <div className="font-semibold text-sm truncate">
                                  {user.name}
                                </div>
                                <div className="text-xs text-muted-foreground">
                                  {user.postsSupported} posts
                                </div>
                              </div>
                              <div className="text-right">
                                <div className="font-bold text-primary text-sm">
                                  {formatNumber(user.totalTipped)}
                                </div>
                                <div className="text-xs text-green-500">
                                  +{user.bonusEarned}
                                </div>
                              </div>
                            </div>
                          ))}
                        </CardContent>
                      </Card>
                    </div>
                  </TabsContent>

                  {/* Platform Tab */}
                  <TabsContent value="platform" className="space-y-6 mt-0">
                    <Card className="glass-card border-border">
                      <CardHeader className="pb-3">
                        <CardTitle className="text-base font-semibold flex items-center gap-2">
                          <Activity className="h-4 w-4 text-blue-500" />
                          Platform Metrics
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="h-[300px] flex items-center justify-center border border-dashed border-border rounded-lg bg-muted/10">
                          <div className="text-center">
                            <BarChart3 className="h-12 w-12 text-muted-foreground mx-auto mb-3 opacity-30" />
                            <p className="text-sm text-muted-foreground">
                              Detailed platform metrics
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                </Tabs>
              </motion.div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Analytics;
