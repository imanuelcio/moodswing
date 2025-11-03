import { useState, useEffect } from "react";
import { SiteHeader } from "@/components/SiteHeader";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import {
  Trophy,
  Target,
  Crown,
  Medal,
  Award,
  Sparkles,
  Star,
  TrendingUp,
  Loader2,
  AlertCircle,
  RefreshCw,
} from "lucide-react";

// Types for leaderboard data
interface LeaderboardEntry {
  rank: number;
  walletAddress: string;
  username?: string;
  avatar?: string;
  nftHolder: boolean;
  accuracy: number; // 0-100
  totalPredictions: number;
  correctPredictions: number;
  pointsUsed: number;
  pointsRemaining: number;
  sfiEarned: number; // From airdrops
  currentStreak: number; // Days
  lastActive: string;
}

interface LeaderboardResponse {
  period: string;
  metric: string;
  data: LeaderboardEntry[];
  userRank?: {
    rank: number;
    entry: LeaderboardEntry;
  };
  totalParticipants: number;
  updatedAt: string;
}

const Leaderboards = () => {
  const [period, setPeriod] = useState<"week" | "month" | "all-time">("week");
  const [metric, setMetric] = useState<"accuracy" | "predictions" | "points">(
    "accuracy"
  );

  const [leaderboardData, setLeaderboardData] = useState<LeaderboardEntry[]>(
    []
  );
  const [userRank, setUserRank] = useState<LeaderboardResponse["userRank"]>();
  const [totalParticipants, setTotalParticipants] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch leaderboard data
  const fetchLeaderboard = async () => {
    setIsLoading(true);
    setError(null);

    try {
      // TODO: Replace with actual API endpoint
      // const response = await fetch(
      //   `/api/leaderboard?period=${period}&metric=${metric}`,
      //   {
      //     headers: {
      //       "Content-Type": "application/json",
      //       // Add authentication token if needed
      //       // 'Authorization': `Bearer ${token}`
      //     },
      //   }
      // );

      // if (!response.ok) {
      //   throw new Error("Failed to fetch leaderboard");
      // }

      // const data: LeaderboardResponse = await response.json();

      // setLeaderboardData(data.data);
      // setUserRank(data.userRank);
      // setTotalParticipants(data.totalParticipants);
      setLeaderboardData([
        {
          rank: 1,
          walletAddress: "0x1234567890123456789012345678901234567890",
          username: "John Doe",
          avatar: "https://example.com/avatar.jpg",
          nftHolder: true,
          accuracy: 90,
          totalPredictions: 100,
          correctPredictions: 90,
          pointsUsed: 100,
          pointsRemaining: 10,
          sfiEarned: 100,
          currentStreak: 5,
          lastActive: "2023-06-01",
        },
      ]);
      setUserRank({
        rank: 1,
        entry: {
          rank: 1,
          walletAddress: "0x1234567890123456789012345678901234567890",
          username: "John Doe",
          avatar: "https://example.com/avatar.jpg",
          nftHolder: true,
          accuracy: 90,
          totalPredictions: 100,
          correctPredictions: 90,
          pointsUsed: 100,
          pointsRemaining: 10,
          sfiEarned: 100,
          currentStreak: 5,
          lastActive: "2023-06-01",
        },
      });
      setTotalParticipants(100);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
      console.error("Leaderboard fetch error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch on mount and when filters change
  useEffect(() => {
    fetchLeaderboard();
  }, [period, metric]);

  // Metric configuration based on PoC
  const metricConfig = {
    accuracy: {
      label: "Prediction Accuracy",
      description: "Top performers ",
      icon: Target,
      suffix: "%",
      color: "text-green-500",
      getValue: (entry: LeaderboardEntry) => entry.accuracy.toFixed(1),
    },
    predictions: {
      label: "Total Predictions",
      description: "Most active predictors",
      icon: TrendingUp,
      suffix: "",
      color: "text-blue-500",
      getValue: (entry: LeaderboardEntry) => entry.totalPredictions.toString(),
    },
    points: {
      label: "Points Used",
      description: "Monthly points allocation tracking",
      icon: Star,
      suffix: " pts",
      color: "text-purple-500",
      getValue: (entry: LeaderboardEntry) => entry.pointsUsed.toLocaleString(),
    },
  };

  const currentMetric = metricConfig[metric];
  const Icon = currentMetric.icon;

  const topThree = leaderboardData.slice(0, 3);
  const restOfLeaderboard = leaderboardData.slice(3);

  // Helper to format wallet address
  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  // Empty state
  if (!isLoading && leaderboardData.length === 0 && !error) {
    return (
      <div className="min-h-screen bg-background">
        <SiteHeader />
        <main className="flex-1">
          <div className="container mx-auto px-4 py-16">
            <Card className="glass-card border-border max-w-2xl mx-auto">
              <CardContent className="pt-16 pb-16 text-center">
                <Trophy className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <h2 className="text-2xl font-orbitron font-bold mb-2">
                  No Leaderboard Data Yet
                </h2>
                <p className="text-muted-foreground mb-6">
                  Be the first to start predicting and climb the leaderboard!
                </p>
                <Button asChild className="bg-primary hover:bg-primary/90">
                  <a href="/markets">
                    <Sparkles className="mr-2 h-4 w-4" />
                    Start Predicting
                  </a>
                </Button>
              </CardContent>
            </Card>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

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
                  Leaderboard
                </h1>
                <p className="text-muted-foreground text-lg">
                  {currentMetric.description}
                </p>
              </div>

              {userRank && (
                <Button variant="outline" className="border-primary/50" asChild>
                  <a href="#user-rank">
                    <Trophy className="mr-2 h-4 w-4" />
                    My Rank: #{userRank.rank}
                  </a>
                </Button>
              )}
            </div>

            {/* Info Banner */}
            {/* <div className="glass-card rounded-xl p-4 border border-primary/20 bg-primary/5">
              <div className="flex items-start gap-3">
                <Sparkles className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <h3 className="font-semibold mb-1">How Leaderboard Works</h3>
                  <p className="text-sm text-muted-foreground">
                    Top predictors with highest accuracy receive larger SFI
                    airdrops. Use your monthly points wisely - accuracy matters
                    more than volume!
                  </p>
                </div>
              </div>
            </div> */}
          </motion.div>

          {/* Filters */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="flex flex-col md:flex-row gap-4 mb-8"
          >
            <Select value={period} onValueChange={(v: any) => setPeriod(v)}>
              <SelectTrigger className="w-full md:w-[200px]">
                <SelectValue placeholder="Period" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="week">This Week</SelectItem>
                <SelectItem value="month">This Month</SelectItem>
                <SelectItem value="all-time">All Time</SelectItem>
              </SelectContent>
            </Select>

            <Select value={metric} onValueChange={(v: any) => setMetric(v)}>
              <SelectTrigger className="w-full md:w-[200px]">
                <SelectValue placeholder="Metric" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="accuracy">
                  <div className="flex items-center gap-2">
                    <Target className="h-4 w-4" />
                    Accuracy
                  </div>
                </SelectItem>
                <SelectItem value="predictions">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="h-4 w-4" />
                    Predictions
                  </div>
                </SelectItem>
                <SelectItem value="points">
                  <div className="flex items-center gap-2">
                    <Star className="h-4 w-4" />
                    Points Used
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>

            <Button
              variant="outline"
              size="sm"
              onClick={fetchLeaderboard}
              disabled={isLoading}
              className="md:ml-auto"
            >
              <RefreshCw
                className={`h-4 w-4 mr-2 ${isLoading ? "animate-spin" : ""}`}
              />
              Refresh
            </Button>
          </motion.div>

          {/* Error State */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8"
            >
              <Card className="glass-card border-destructive/50 bg-destructive/5">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-3">
                    <AlertCircle className="h-5 w-5 text-destructive" />
                    <div>
                      <h3 className="font-semibold text-destructive mb-1">
                        Failed to load leaderboard
                      </h3>
                      <p className="text-sm text-muted-foreground">{error}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* Loading State */}
          {isLoading && (
            <div className="flex items-center justify-center py-20">
              <div className="text-center">
                <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto mb-4" />
                <p className="text-muted-foreground">Loading leaderboard...</p>
              </div>
            </div>
          )}

          {/* Leaderboard Content */}
          {!isLoading && !error && leaderboardData.length > 0 && (
            <>
              {/* Top 3 Podium */}
              {topThree.length >= 3 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="mb-8"
                >
                  {/* Desktop Podium */}
                  <div className="hidden md:grid grid-cols-3 gap-4 max-w-4xl mx-auto">
                    {/* 2nd Place */}
                    <div className="flex flex-col items-center pt-8">
                      <div className="glass-card p-6 rounded-2xl border border-border hover:border-slate-400 transition-all w-full text-center relative">
                        <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-slate-400/20 rounded-full p-2 border-2 border-slate-400">
                          <Medal className="h-6 w-6 text-slate-400" />
                        </div>
                        <Avatar className="h-20 w-20 mx-auto mb-3 border-4 border-slate-400/50">
                          <AvatarImage src={topThree[1].avatar} />
                          <AvatarFallback>
                            {topThree[1].username?.[0] ||
                              topThree[1].walletAddress.slice(0, 2)}
                          </AvatarFallback>
                        </Avatar>
                        <h3 className="font-semibold text-lg mb-1 truncate">
                          {topThree[1].username ||
                            formatAddress(topThree[1].walletAddress)}
                        </h3>
                        {topThree[1].nftHolder && (
                          <Badge variant="secondary" className="mb-2 text-xs">
                            <Sparkles className="h-3 w-3 mr-1" />
                            NFT Holder
                          </Badge>
                        )}
                        <div
                          className={`text-3xl font-bold font-mono mb-2 ${currentMetric.color}`}
                        >
                          {currentMetric.getValue(topThree[1])}
                          {currentMetric.suffix}
                        </div>
                        <div className="text-xs text-muted-foreground space-y-1">
                          <div>
                            {topThree[1].correctPredictions}/
                            {topThree[1].totalPredictions} correct
                          </div>
                          <div className="flex items-center justify-center gap-1">
                            <Sparkles className="h-3 w-3" />
                            {topThree[1].currentStreak}d streak
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* 1st Place */}
                    <div className="flex flex-col items-center">
                      <div className="glass-card p-6 rounded-2xl border-2 border-amber-500 hover:border-amber-400 transition-all w-full text-center relative shadow-[0_0_30px_rgba(251,191,36,0.3)]">
                        <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-amber-500/20 rounded-full p-3 border-2 border-amber-500">
                          <Crown className="h-8 w-8 text-amber-500" />
                        </div>
                        <div className="pt-4">
                          <Avatar className="h-24 w-24 mx-auto mb-3 border-4 border-amber-500/50">
                            <AvatarImage src={topThree[0].avatar} />
                            <AvatarFallback>
                              {topThree[0].username?.[0] ||
                                topThree[0].walletAddress.slice(0, 2)}
                            </AvatarFallback>
                          </Avatar>
                          <Badge className="mb-2 bg-amber-500/20 text-amber-500 border-amber-500/50">
                            <Trophy className="h-3 w-3 mr-1" />
                            Champion
                          </Badge>
                          <h3 className="font-semibold text-xl mb-1 truncate">
                            {topThree[0].username ||
                              formatAddress(topThree[0].walletAddress)}
                          </h3>
                          {topThree[0].nftHolder && (
                            <Badge variant="secondary" className="mb-2 text-xs">
                              <Sparkles className="h-3 w-3 mr-1" />
                              NFT Holder
                            </Badge>
                          )}
                          <div
                            className={`text-4xl font-bold font-mono mb-2 ${currentMetric.color}`}
                          >
                            {currentMetric.getValue(topThree[0])}
                            {currentMetric.suffix}
                          </div>
                          <div className="text-sm text-muted-foreground space-y-1">
                            <div>
                              {topThree[0].correctPredictions}/
                              {topThree[0].totalPredictions} correct
                            </div>
                            <div className="flex items-center justify-center gap-1">
                              <Sparkles className="h-3 w-3" />
                              {topThree[0].currentStreak}d streak
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* 3rd Place */}
                    <div className="flex flex-col items-center pt-8">
                      <div className="glass-card p-6 rounded-2xl border border-border hover:border-amber-700 transition-all w-full text-center relative">
                        <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-amber-700/20 rounded-full p-2 border-2 border-amber-700">
                          <Award className="h-6 w-6 text-amber-700" />
                        </div>
                        <Avatar className="h-20 w-20 mx-auto mb-3 border-4 border-amber-700/50">
                          <AvatarImage src={topThree[2].avatar} />
                          <AvatarFallback>
                            {topThree[2].username?.[0] ||
                              topThree[2].walletAddress.slice(0, 2)}
                          </AvatarFallback>
                        </Avatar>
                        <h3 className="font-semibold text-lg mb-1 truncate">
                          {topThree[2].username ||
                            formatAddress(topThree[2].walletAddress)}
                        </h3>
                        {topThree[2].nftHolder && (
                          <Badge variant="secondary" className="mb-2 text-xs">
                            <Sparkles className="h-3 w-3 mr-1" />
                            NFT Holder
                          </Badge>
                        )}
                        <div
                          className={`text-3xl font-bold font-mono mb-2 ${currentMetric.color}`}
                        >
                          {currentMetric.getValue(topThree[2])}
                          {currentMetric.suffix}
                        </div>
                        <div className="text-xs text-muted-foreground space-y-1">
                          <div>
                            {topThree[2].correctPredictions}/
                            {topThree[2].totalPredictions} correct
                          </div>
                          <div className="flex items-center justify-center gap-1">
                            <Sparkles className="h-3 w-3" />
                            {topThree[2].currentStreak}d streak
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Mobile Stack */}
                  <div className="md:hidden space-y-4">
                    {topThree.map((entry, idx) => {
                      const isFirst = idx === 0;
                      const isSecond = idx === 1;

                      return (
                        <div
                          key={entry.rank}
                          className={`glass-card p-4 rounded-xl border transition-all relative ${
                            isFirst
                              ? "border-2 border-amber-500 shadow-[0_0_20px_rgba(251,191,36,0.2)]"
                              : isSecond
                              ? "border border-slate-400"
                              : "border border-amber-700"
                          }`}
                        >
                          <div className="flex items-center gap-4">
                            <div className="relative">
                              <Avatar
                                className={`h-16 w-16 border-4 ${
                                  isFirst
                                    ? "border-amber-500/50"
                                    : isSecond
                                    ? "border-slate-400/50"
                                    : "border-amber-700/50"
                                }`}
                              >
                                <AvatarImage src={entry.avatar} />
                                <AvatarFallback>
                                  {entry.username?.[0] ||
                                    entry.walletAddress.slice(0, 2)}
                                </AvatarFallback>
                              </Avatar>
                              <div
                                className={`absolute -top-2 -right-2 rounded-full p-1.5 ${
                                  isFirst
                                    ? "bg-amber-500/20 border-2 border-amber-500"
                                    : isSecond
                                    ? "bg-slate-400/20 border-2 border-slate-400"
                                    : "bg-amber-700/20 border-2 border-amber-700"
                                }`}
                              >
                                {isFirst ? (
                                  <Crown className="h-4 w-4 text-amber-500" />
                                ) : isSecond ? (
                                  <Medal className="h-4 w-4 text-slate-400" />
                                ) : (
                                  <Award className="h-4 w-4 text-amber-700" />
                                )}
                              </div>
                            </div>

                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-1 flex-wrap">
                                <h3 className="font-semibold text-lg truncate">
                                  {entry.username ||
                                    formatAddress(entry.walletAddress)}
                                </h3>
                                {entry.nftHolder && (
                                  <Badge
                                    variant="secondary"
                                    className="text-xs"
                                  >
                                    <Sparkles className="h-3 w-3 mr-1" />
                                    NFT
                                  </Badge>
                                )}
                              </div>
                              <div
                                className={`text-2xl font-bold font-mono mb-1 ${currentMetric.color}`}
                              >
                                {currentMetric.getValue(entry)}
                                {currentMetric.suffix}
                              </div>
                              <div className="flex items-center gap-3 text-xs text-muted-foreground">
                                <div>
                                  {entry.correctPredictions}/
                                  {entry.totalPredictions}
                                </div>
                                <div className="flex items-center gap-1">
                                  <Sparkles className="h-3 w-3" />
                                  {entry.currentStreak}d
                                </div>
                              </div>
                            </div>

                            <div className="text-3xl font-mono font-bold text-muted-foreground">
                              #{entry.rank}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </motion.div>
              )}

              {/* Leaderboard Table */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <Card className="glass-card border-border">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="font-orbitron flex items-center gap-2">
                        <Icon className={`h-5 w-5 ${currentMetric.color}`} />
                        {currentMetric.label} Rankings
                      </CardTitle>
                      <Badge variant="outline" className="text-xs">
                        {totalParticipants} participants
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="overflow-x-auto -mx-6 px-6">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead className="w-16 md:w-20">Rank</TableHead>
                            <TableHead>Predictor</TableHead>
                            <TableHead className="text-center hidden md:table-cell">
                              Accuracy
                            </TableHead>
                            <TableHead className="text-center hidden lg:table-cell">
                              Predictions
                            </TableHead>
                            <TableHead className="text-right">
                              {currentMetric.label}
                            </TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {restOfLeaderboard.map((entry, idx) => (
                            <motion.tr
                              key={entry.rank}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.05 * idx }}
                              className="hover:bg-primary/5 cursor-pointer transition-all"
                            >
                              <TableCell>
                                <span className="font-mono font-bold text-muted-foreground text-sm md:text-base">
                                  #{entry.rank}
                                </span>
                              </TableCell>
                              <TableCell>
                                <div className="flex items-center gap-2 md:gap-3">
                                  <Avatar className="h-8 w-8 md:h-10 md:w-10 border-2 border-border">
                                    <AvatarImage src={entry.avatar} />
                                    <AvatarFallback>
                                      {entry.username?.[0]?.toUpperCase() ||
                                        entry.walletAddress.slice(0, 2)}
                                    </AvatarFallback>
                                  </Avatar>
                                  <div className="min-w-0">
                                    <div className="font-medium text-sm md:text-base truncate">
                                      {entry.username ||
                                        formatAddress(entry.walletAddress)}
                                    </div>
                                    {entry.nftHolder && (
                                      <Badge
                                        variant="outline"
                                        className="text-[10px] mt-0.5"
                                      >
                                        <Sparkles className="h-2 w-2 mr-1" />
                                        NFT
                                      </Badge>
                                    )}
                                  </div>
                                </div>
                              </TableCell>
                              <TableCell className="text-center hidden md:table-cell">
                                <span className="text-sm text-muted-foreground">
                                  {entry.accuracy.toFixed(1)}%
                                </span>
                              </TableCell>
                              <TableCell className="text-center hidden lg:table-cell">
                                <span className="text-sm text-muted-foreground">
                                  {entry.totalPredictions}
                                </span>
                              </TableCell>
                              <TableCell className="text-right">
                                <Badge
                                  variant="secondary"
                                  className={`font-mono text-xs md:text-sm ${currentMetric.color}`}
                                >
                                  {currentMetric.getValue(entry)}
                                  {currentMetric.suffix}
                                </Badge>
                              </TableCell>
                            </motion.tr>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* User Rank Card (if user is authenticated) */}
              {userRank && (
                <motion.div
                  id="user-rank"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="mt-8"
                >
                  <Card className="glass-card border-primary/50 bg-primary/5">
                    <CardHeader>
                      <CardTitle className="font-orbitron text-lg">
                        Your Ranking
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="text-4xl font-mono font-bold text-primary">
                            #{userRank.rank}
                          </div>
                          <div>
                            <div className="font-semibold mb-1">
                              {userRank.entry.username ||
                                formatAddress(userRank.entry.walletAddress)}
                            </div>
                            <div className="text-sm text-muted-foreground">
                              {userRank.entry.correctPredictions}/
                              {userRank.entry.totalPredictions} correct
                              predictions
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div
                            className={`text-2xl font-bold font-mono ${currentMetric.color}`}
                          >
                            {currentMetric.getValue(userRank.entry)}
                            {currentMetric.suffix}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {userRank.entry.currentStreak}d streak
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )}
            </>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Leaderboards;
