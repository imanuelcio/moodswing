import { SiteHeader } from "@/components/SiteHeader";
import { Footer } from "@/components/Footer";
import { motion } from "framer-motion";
import { useWalletAuth } from "@/hooks/auth/useWalletAuth";
import { ConnectWalletPrompt } from "@/components/ConnectWalletPrompt";
import { Clock } from "lucide-react";

import { OverviewCards } from "@/components/dashboard/OverviewCards";
import { ActivePredictions } from "@/components/dashboard/ActivePredictions";
import { AISentimentFeed } from "@/components/dashboard/AISentimentFeed";
import { RecentActivity } from "@/components/dashboard/RecentActivity";
import { LeaderboardPreview } from "@/components/dashboard/LeaderboardPreview";
import { StakingOverview } from "@/components/dashboard/StakingOverview";

const Dashboard = () => {
  const { isAuthenticated, isConnected } = useWalletAuth();

  // Overview Stats
  const overviewStats = {
    totalPoints: 8450,
    sfiBalance: 1250,
    nftHoldings: 3,
    currentRank: 42,
    totalUsers: 5000,
    rankProgress: 65,
    lastUpdated: "2 mins ago",
    pendingRewards: 150,
  };

  // Active Predictions
  const activePredictions = [
    {
      id: "1",
      market: "BTC sentiment > 60 this week?",
      side: "Long" as const,
      stake: 200,
      currentScore: 57,
      scoreChange: -3,
      potentialPayout: 350,
      expiresIn: "2d 4h",
      status: "active" as const,
    },
    {
      id: "2",
      market: "SOL hype exceeds 75 by Friday?",
      side: "Short" as const,
      stake: 150,
      currentScore: 68,
      scoreChange: 5,
      potentialPayout: 280,
      expiresIn: "1d 12h",
      status: "active" as const,
    },
    {
      id: "3",
      market: "AI tokens sentiment bullish?",
      side: "Long" as const,
      stake: 300,
      currentScore: 82,
      scoreChange: 8,
      potentialPayout: 525,
      expiresIn: "3d 6h",
      status: "winning" as const,
    },
  ];

  // AI Sentiment Feed
  const sentimentFeed = [
    {
      id: "1",
      symbol: "BTC",
      name: "Bitcoin",
      score: 82,
      label: "HYPE" as const,
      change: 6,
      sparkline: [75, 77, 78, 80, 79, 81, 82],
      color: "#F7931A",
    },
    {
      id: "2",
      symbol: "SOL",
      name: "Solana",
      score: 68,
      label: "NEUTRAL" as const,
      change: -2,
      sparkline: [72, 71, 70, 69, 68, 69, 68],
      color: "#14F195",
    },
    {
      id: "3",
      symbol: "DOGE",
      name: "Dogecoin",
      score: 45,
      label: "FUD" as const,
      change: -8,
      sparkline: [55, 53, 50, 48, 47, 46, 45],
      color: "#C2A633",
    },
    {
      id: "4",
      symbol: "AI",
      name: "AI Tokens",
      score: 91,
      label: "HYPE" as const,
      change: 12,
      sparkline: [78, 80, 83, 86, 88, 90, 91],
      color: "#9333EA",
    },
  ];

  // Points Activity
  const pointsActivity = [
    {
      id: "1",
      type: "earned" as const,
      description: "Correct prediction: BTC > 60",
      amount: 350,
      timestamp: "2 hours ago",
    },
    {
      id: "2",
      type: "lost" as const,
      description: "Wrong prediction: SOL < 40",
      amount: -150,
      timestamp: "5 hours ago",
    },
    {
      id: "3",
      type: "expired" as const,
      description: "Points degradation",
      amount: -100,
      timestamp: "1 day ago",
    },
    {
      id: "4",
      type: "claimed" as const,
      description: "Monthly SFI reward claimed",
      amount: 1000,
      timestamp: "2 days ago",
      token: "SFI" as const,
    },
  ];

  // Leaderboard Preview
  const leaderboardPreview = {
    position: 42,
    totalUsers: 5000,
    xp: 14500,
    winRate: 78,
    nearbyUsers: [
      { rank: 40, handle: "@whale_trader", points: 15200 },
      { rank: 41, handle: "@crypto_pro", points: 14850 },
      { rank: 42, handle: "You", points: 14500 },
      { rank: 43, handle: "@sentiment_guru", points: 14200 },
      { rank: 44, handle: "@defi_king", points: 13980 },
    ],
  };

  // Staking Overview
  const stakingOverview = {
    stakedAmount: 5000,
    apr: 8.5,
    earned: 320,
    lockDuration: "90 days",
    unlockDate: "2025-02-15",
    daysRemaining: 45,
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-background via-background to-primary/5">
      <SiteHeader />

      <main className="flex-1 container mx-auto px-4 py-6">
        {!isAuthenticated || !isConnected ? (
          <ConnectWalletPrompt />
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {/* Header */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <h1 className="text-3xl md:text-4xl font-orbitron font-bold text-glow-red">
                  Dashboard
                </h1>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Clock className="h-3 w-3" />
                  Updated {overviewStats.lastUpdated}
                </div>
              </div>
              <p className="text-muted-foreground text-sm">
                Track your predictions, manage points, and explore trends
              </p>
            </div>

            {/* Overview Cards */}
            <div className="mb-6">
              <OverviewCards
                totalPoints={overviewStats.totalPoints}
                sfiBalance={overviewStats.sfiBalance}
                nftHoldings={overviewStats.nftHoldings}
                currentRank={overviewStats.currentRank}
                rankProgress={overviewStats.rankProgress}
                pendingRewards={overviewStats.pendingRewards}
              />
            </div>

            {/* Quick Actions Bar */}
            {/* <div className="mb-6">
              <QuickActionsBar pendingRewards={overviewStats.pendingRewards} />
            </div> */}

            {/* Main Content Grid */}
            <div className="grid lg:grid-cols-12 gap-4 mb-6">
              {/* Left Column - Active Predictions & AI Sentiment */}
              <div className="lg:col-span-7 space-y-4">
                <ActivePredictions predictions={activePredictions} />
                <AISentimentFeed sentimentFeed={sentimentFeed} />
              </div>

              {/* Right Column - Points Activity & Leaderboard */}
              <div className="lg:col-span-5 space-y-4">
                <RecentActivity activities={pointsActivity} />
                <LeaderboardPreview leaderboard={leaderboardPreview} />
                <StakingOverview staking={stakingOverview} />
              </div>
            </div>
          </motion.div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Dashboard;
