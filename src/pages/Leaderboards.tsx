import { useState } from "react";
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
  TrendingUp,
  Target,
  DollarSign,
  Crown,
  Medal,
  Award,
  Users,
  Activity,
  ArrowUpRight,
  Sparkles,
} from "lucide-react";

const Leaderboards = () => {
  const [period, setPeriod] = useState("month");
  const [metric, setMetric] = useState("roi");

  // Mock data with avatars
  const leaderboardData = {
    week: {
      roi: [
        {
          rank: 1,
          username: "crypto_wizard",
          value: 189.45,
          badge: "🏆",
          avatar:
            "https://api.dicebear.com/7.x/avataaars/svg?seed=crypto_wizard",
          streak: 12,
          totalBets: 234,
        },
        {
          rank: 2,
          username: "bull_runner",
          value: 156.23,
          badge: "🥈",
          avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=bull_runner",
          streak: 8,
          totalBets: 189,
        },
        {
          rank: 3,
          username: "whale_watcher",
          value: 142.87,
          badge: "🥉",
          avatar:
            "https://api.dicebear.com/7.x/avataaars/svg?seed=whale_watcher",
          streak: 6,
          totalBets: 156,
        },
        {
          rank: 4,
          username: "diamond_hands",
          value: 128.91,
          badge: "",
          avatar:
            "https://api.dicebear.com/7.x/avataaars/svg?seed=diamond_hands",
          streak: 5,
          totalBets: 142,
        },
        {
          rank: 5,
          username: "moon_shooter",
          value: 115.34,
          badge: "",
          avatar:
            "https://api.dicebear.com/7.x/avataaars/svg?seed=moon_shooter",
          streak: 4,
          totalBets: 128,
        },
        {
          rank: 6,
          username: "profit_seeker",
          value: 98.76,
          badge: "",
          avatar:
            "https://api.dicebear.com/7.x/avataaars/svg?seed=profit_seeker",
          streak: 3,
          totalBets: 115,
        },
        {
          rank: 7,
          username: "smart_trader",
          value: 87.23,
          badge: "",
          avatar:
            "https://api.dicebear.com/7.x/avataaars/svg?seed=smart_trader",
          streak: 2,
          totalBets: 98,
        },
        {
          rank: 8,
          username: "risk_taker",
          value: 76.45,
          badge: "",
          avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=risk_taker",
          streak: 1,
          totalBets: 87,
        },
        {
          rank: 9,
          username: "steady_gains",
          value: 65.89,
          badge: "",
          avatar:
            "https://api.dicebear.com/7.x/avataaars/svg?seed=steady_gains",
          streak: 1,
          totalBets: 76,
        },
        {
          rank: 10,
          username: "market_ninja",
          value: 54.32,
          badge: "",
          avatar:
            "https://api.dicebear.com/7.x/avataaars/svg?seed=market_ninja",
          streak: 0,
          totalBets: 65,
        },
      ],
      winrate: [
        {
          rank: 1,
          username: "prediction_ace",
          value: 94.5,
          badge: "🏆",
          avatar:
            "https://api.dicebear.com/7.x/avataaars/svg?seed=prediction_ace",
          streak: 15,
          totalBets: 200,
        },
        {
          rank: 2,
          username: "accuracy_king",
          value: 91.2,
          badge: "🥈",
          avatar:
            "https://api.dicebear.com/7.x/avataaars/svg?seed=accuracy_king",
          streak: 12,
          totalBets: 180,
        },
        {
          rank: 3,
          username: "sure_bet",
          value: 88.7,
          badge: "🥉",
          avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=sure_bet",
          streak: 10,
          totalBets: 165,
        },
      ],
      volume: [
        {
          rank: 1,
          username: "volume_lord",
          value: 45820.5,
          badge: "🏆",
          avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=volume_lord",
          streak: 7,
          totalBets: 450,
        },
        {
          rank: 2,
          username: "big_player",
          value: 38976.3,
          badge: "🥈",
          avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=big_player",
          streak: 5,
          totalBets: 389,
        },
        {
          rank: 3,
          username: "mega_trader",
          value: 32145.8,
          badge: "🥉",
          avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=mega_trader",
          streak: 4,
          totalBets: 321,
        },
      ],
      points: [
        {
          rank: 1,
          username: "point_hunter",
          value: 8945,
          badge: "🏆",
          avatar:
            "https://api.dicebear.com/7.x/avataaars/svg?seed=point_hunter",
          streak: 20,
          totalBets: 300,
        },
        {
          rank: 2,
          username: "score_master",
          value: 7823,
          badge: "🥈",
          avatar:
            "https://api.dicebear.com/7.x/avataaars/svg?seed=score_master",
          streak: 18,
          totalBets: 278,
        },
        {
          rank: 3,
          username: "top_scorer",
          value: 6756,
          badge: "🥉",
          avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=top_scorer",
          streak: 15,
          totalBets: 245,
        },
      ],
    },
    month: {
      roi: [
        {
          rank: 1,
          username: "crypto_king",
          value: 145.2,
          badge: "🏆",
          avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=crypto_king",
          streak: 25,
          totalBets: 567,
        },
        {
          rank: 2,
          username: "market_master",
          value: 132.8,
          badge: "🥈",
          avatar:
            "https://api.dicebear.com/7.x/avataaars/svg?seed=market_master",
          streak: 22,
          totalBets: 489,
        },
        {
          rank: 3,
          username: "prediction_pro",
          value: 118.5,
          badge: "🥉",
          avatar:
            "https://api.dicebear.com/7.x/avataaars/svg?seed=prediction_pro",
          streak: 18,
          totalBets: 423,
        },
      ],
      winrate: [
        {
          rank: 1,
          username: "consistent_win",
          value: 87.3,
          badge: "🏆",
          avatar:
            "https://api.dicebear.com/7.x/avataaars/svg?seed=consistent_win",
          streak: 30,
          totalBets: 456,
        },
      ],
      volume: [
        {
          rank: 1,
          username: "trade_titan",
          value: 186742.8,
          badge: "🏆",
          avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=trade_titan",
          streak: 15,
          totalBets: 789,
        },
      ],
      points: [
        {
          rank: 1,
          username: "legend_status",
          value: 34567,
          badge: "🏆",
          avatar:
            "https://api.dicebear.com/7.x/avataaars/svg?seed=legend_status",
          streak: 45,
          totalBets: 1234,
        },
      ],
    },
    "all-time": {
      roi: [
        {
          rank: 1,
          username: "eternal_king",
          value: 524.8,
          badge: "🏆",
          avatar:
            "https://api.dicebear.com/7.x/avataaars/svg?seed=eternal_king",
          streak: 100,
          totalBets: 2345,
        },
      ],
      winrate: [
        {
          rank: 1,
          username: "perfect_record",
          value: 92.8,
          badge: "🏆",
          avatar:
            "https://api.dicebear.com/7.x/avataaars/svg?seed=perfect_record",
          streak: 150,
          totalBets: 1890,
        },
      ],
      volume: [
        {
          rank: 1,
          username: "ultimate_whale",
          value: 2847562.4,
          badge: "🏆",
          avatar:
            "https://api.dicebear.com/7.x/avataaars/svg?seed=ultimate_whale",
          streak: 80,
          totalBets: 5678,
        },
      ],
      points: [
        {
          rank: 1,
          username: "point_god",
          value: 456789,
          badge: "🏆",
          avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=point_god",
          streak: 200,
          totalBets: 8901,
        },
      ],
    },
  };

  const metricConfig = {
    roi: {
      label: "ROI",
      icon: TrendingUp,
      suffix: "%",
      color: "text-green-500",
    },
    winrate: {
      label: "Win Rate",
      icon: Target,
      suffix: "%",
      color: "text-blue-500",
    },
    volume: {
      label: "Volume",
      icon: DollarSign,
      suffix: " pts",
      color: "text-purple-500",
    },
    points: {
      label: "Points",
      icon: Trophy,
      suffix: " pts",
      color: "text-amber-500",
    },
  };

  const currentMetric = metricConfig[metric as keyof typeof metricConfig];
  const Icon = currentMetric.icon;

  const leaderboard =
    leaderboardData[period as keyof typeof leaderboardData]?.[
      metric as keyof typeof leaderboardData.week
    ] || [];

  // const getRankIcon = (rank: number) => {
  //   switch (rank) {
  //     case 1:
  //       return <Crown className="h-5 w-5 text-amber-500" />;
  //     case 2:
  //       return <Medal className="h-5 w-5 text-slate-400" />;
  //     case 3:
  //       return <Award className="h-5 w-5 text-amber-700" />;
  //     default:
  //       return null;
  //   }
  // };

  const topThree = leaderboard.slice(0, 3);
  const restOfLeaderboard = leaderboard.slice(3);

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
                  Leaderboards
                </h1>
                <p className="text-muted-foreground text-lg">
                  Top performers in the prediction markets
                </p>
              </div>
              <Button variant="outline" className="border-primary/50">
                <Users className="mr-2 h-4 w-4" />
                View My Rank
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: "Total Traders", value: "8,234", icon: Users },
                { label: "Active Now", value: "1,247", icon: Activity },
                { label: "Total Volume", value: "$12.4M", icon: DollarSign },
                { label: "Avg Win Rate", value: "68.5%", icon: Target },
              ].map((stat, idx) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="glass-card p-4 rounded-xl border border-border"
                >
                  <div className="flex items-center gap-2 text-muted-foreground text-sm mb-1">
                    <stat.icon className="h-4 w-4" />
                    {stat.label}
                  </div>
                  <div className="text-2xl font-bold font-mono">
                    {stat.value}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Filters */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="flex flex-col md:flex-row gap-4 mb-8"
          >
            <Select value={period} onValueChange={setPeriod}>
              <SelectTrigger className="w-full md:w-[200px]">
                <SelectValue placeholder="Period" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="week">This Week</SelectItem>
                <SelectItem value="month">This Month</SelectItem>
                <SelectItem value="all-time">All Time</SelectItem>
              </SelectContent>
            </Select>

            <Select value={metric} onValueChange={setMetric}>
              <SelectTrigger className="w-full md:w-[200px]">
                <SelectValue placeholder="Metric" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="roi">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="h-4 w-4" />
                    ROI
                  </div>
                </SelectItem>
                <SelectItem value="winrate">
                  <div className="flex items-center gap-2">
                    <Target className="h-4 w-4" />
                    Win Rate
                  </div>
                </SelectItem>
                <SelectItem value="volume">
                  <div className="flex items-center gap-2">
                    <DollarSign className="h-4 w-4" />
                    Volume
                  </div>
                </SelectItem>
                <SelectItem value="points">
                  <div className="flex items-center gap-2">
                    <Trophy className="h-4 w-4" />
                    Points
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </motion.div>

          {/* Top 3 Podium */}
          {topThree.length >= 3 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mb-8"
            >
              <div className="grid grid-cols-3 gap-4 max-w-4xl mx-auto">
                {/* 2nd Place */}
                <div className="flex flex-col items-center pt-8">
                  <div className="glass-card p-6 rounded-2xl border border-border hover:border-slate-400 transition-all w-full text-center relative">
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-slate-400/20 rounded-full p-2 border-2 border-slate-400">
                      <Medal className="h-6 w-6 text-slate-400" />
                    </div>
                    <Avatar className="h-20 w-20 mx-auto mb-3 border-4 border-slate-400/50">
                      <AvatarImage src={topThree[1].avatar} />
                      <AvatarFallback>{topThree[1].username[0]}</AvatarFallback>
                    </Avatar>
                    <h3 className="font-semibold text-lg mb-1">
                      {topThree[1].username}
                    </h3>
                    <div
                      className={`text-3xl font-bold font-mono mb-2 ${currentMetric.color}`}
                    >
                      {metric === "volume" || metric === "points"
                        ? topThree[1].value.toLocaleString()
                        : topThree[1].value}
                      {currentMetric.suffix}
                    </div>
                    <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                      <Sparkles className="h-3 w-3" />
                      {topThree[1].streak} day streak
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
                          {topThree[0].username[0]}
                        </AvatarFallback>
                      </Avatar>
                      <Badge className="mb-2 bg-amber-500/20 text-amber-500 border-amber-500/50">
                        <Trophy className="h-3 w-3 mr-1" />
                        Champion
                      </Badge>
                      <h3 className="font-semibold text-xl mb-1">
                        {topThree[0].username}
                      </h3>
                      <div
                        className={`text-4xl font-bold font-mono mb-2 ${currentMetric.color}`}
                      >
                        {metric === "volume" || metric === "points"
                          ? topThree[0].value.toLocaleString()
                          : topThree[0].value}
                        {currentMetric.suffix}
                      </div>
                      <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                        <Sparkles className="h-3 w-3" />
                        {topThree[0].streak} day streak
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
                      <AvatarFallback>{topThree[2].username[0]}</AvatarFallback>
                    </Avatar>
                    <h3 className="font-semibold text-lg mb-1">
                      {topThree[2].username}
                    </h3>
                    <div
                      className={`text-3xl font-bold font-mono mb-2 ${currentMetric.color}`}
                    >
                      {metric === "volume" || metric === "points"
                        ? topThree[2].value.toLocaleString()
                        : topThree[2].value}
                      {currentMetric.suffix}
                    </div>
                    <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                      <Sparkles className="h-3 w-3" />
                      {topThree[2].streak} day streak
                    </div>
                  </div>
                </div>
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
                <CardTitle className="font-orbitron flex items-center gap-2">
                  <Icon className={`h-5 w-5 ${currentMetric.color}`} />
                  {currentMetric.label} Rankings
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-20">Rank</TableHead>
                      <TableHead>Trader</TableHead>
                      <TableHead className="text-center">Streak</TableHead>
                      <TableHead className="text-center">Bets</TableHead>
                      <TableHead className="text-right">
                        {currentMetric.label}
                      </TableHead>
                      <TableHead className="w-20"></TableHead>
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
                          <div className="flex items-center gap-2">
                            <span className="font-mono font-bold text-muted-foreground">
                              #{entry.rank}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <Avatar className="h-10 w-10 border-2 border-border">
                              <AvatarImage src={entry.avatar} />
                              <AvatarFallback>
                                {entry.username[0].toUpperCase()}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="font-medium">
                                {entry.username}
                              </div>
                              <div className="text-xs text-muted-foreground">
                                Rank #{entry.rank}
                              </div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="text-center">
                          <Badge
                            variant="outline"
                            className="font-mono text-xs"
                          >
                            {entry.streak} 🔥
                          </Badge>
                        </TableCell>
                        <TableCell className="text-center">
                          <span className="text-sm text-muted-foreground">
                            {entry.totalBets}
                          </span>
                        </TableCell>
                        <TableCell className="text-right">
                          <Badge
                            variant="secondary"
                            className={`font-mono ${currentMetric.color}`}
                          >
                            {metric === "volume" || metric === "points"
                              ? entry.value.toLocaleString()
                              : entry.value}
                            {currentMetric.suffix}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0"
                          >
                            <ArrowUpRight className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </motion.tr>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Leaderboards;
