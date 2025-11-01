import { SiteHeader } from "@/components/SiteHeader";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import {
  Trophy,
  TrendingUp,
  Award,
  Zap,
  Twitter,
  ExternalLink,
  Wallet,
  Link as LinkIcon,
  Shield,
  Star,
  Sparkles,
  TrendingDown,
  Activity,
  Target,
  Flame,
} from "lucide-react";

const Profile = () => {
  // Mock user data
  const userData = {
    username: "crypto_trader_01",
    walletAddress: "0x7a4b...3f9c",
    role: "Premium Trader",
    totalPoints: 12450,
    winStreak: 7,
    ownedNFTs: 3,
    totalPredictions: 48,
    winRate: 68.5,
    totalEarnings: 8240,
    rank: 42,
    level: 12,
    xp: 7840,
    nextLevelXp: 10000,
  };

  const wallets = [
    {
      id: "1",
      address: "0x7a4b...3f9c",
      chain: "Ethereum",
      isPrimary: true,
      verified: true,
    },
    {
      id: "2",
      address: "5Gw8...xK3m",
      chain: "Solana",
      isPrimary: false,
      verified: true,
    },
    {
      id: "3",
      address: "tz1K...9mPq",
      chain: "Tezos",
      isPrimary: false,
      verified: false,
    },
  ];

  const pointsHistory = [
    {
      id: "1",
      type: "bet_win",
      amount: +120,
      timestamp: "2h ago",
      description: "Won bet on BTC market",
      category: "win",
    },
    {
      id: "2",
      type: "decay",
      amount: -15,
      timestamp: "1d ago",
      description: "15% monthly decay",
      category: "decay",
    },
    {
      id: "3",
      type: "streak_bonus",
      amount: +50,
      timestamp: "3d ago",
      description: "7-day streak bonus",
      category: "bonus",
    },
    {
      id: "4",
      type: "bet_win",
      amount: +200,
      timestamp: "5d ago",
      description: "Won bet on ETH market",
      category: "win",
    },
    {
      id: "5",
      type: "tip_received",
      amount: +25,
      timestamp: "1w ago",
      description: "Tip from @crypto_fan",
      category: "bonus",
    },
  ];

  const nfts = [
    {
      id: "1",
      name: "Mood Swing Genesis #042",
      rarity: "Rare",
      tier: "Gold",
      image: "🎭",
      benefits: "+5% points boost",
    },
    {
      id: "2",
      name: "Sentiment Oracle #127",
      rarity: "Epic",
      tier: "Platinum",
      image: "🔮",
      benefits: "Early access to markets",
    },
    {
      id: "3",
      name: "Hype Beast #891",
      rarity: "Common",
      tier: "Silver",
      image: "🚀",
      benefits: "Community badge",
    },
  ];

  const badges = [
    {
      id: "1",
      name: "Hot Streak",
      description: "5 wins in a row",
      icon: "🔥",
      progress: 100,
    },
    {
      id: "2",
      name: "Early Adopter",
      description: "Joined in beta",
      icon: "⭐",
      progress: 100,
    },
    {
      id: "3",
      name: "Whale Watcher",
      description: "Track 100 whales",
      icon: "🐋",
      progress: 75,
    },
    {
      id: "4",
      name: "Diamond Hands",
      description: "Hold position 30d",
      icon: "💎",
      progress: 60,
    },
  ];

  const stats = [
    {
      label: "Win Rate",
      value: `${userData.winRate}%`,
      icon: Target,
      color: "text-green-400",
    },
    {
      label: "Total Bets",
      value: userData.totalPredictions,
      icon: Activity,
      color: "text-blue-400",
    },
    {
      label: "Earnings",
      value: `${userData.totalEarnings.toLocaleString()} pts`,
      icon: TrendingUp,
      color: "text-accent",
    },
    {
      label: "Global Rank",
      value: `#${userData.rank}`,
      icon: Trophy,
      color: "text-primary",
    },
  ];

  const xpPercentage = (userData.xp / userData.nextLevelXp) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <SiteHeader />

      <main className="flex-1">
        <div className="container mx-auto px-4 py-6">
          {/* Hero Section - Split Design */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid lg:grid-cols-12 gap-6 mb-6"
          >
            {/* Left - Profile Card */}
            <div className="lg:col-span-4">
              <div className="glass-card rounded-2xl border border-border p-6 h-full bg-gradient-to-br from-primary/10 to-transparent">
                {/* Avatar & Username */}
                <div className="flex flex-col items-center mb-6">
                  <div className="relative mb-4">
                    <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-4xl font-bold">
                      {userData.username.charAt(0).toUpperCase()}
                    </div>
                    <div className="absolute -bottom-2 -right-2 w-10 h-10 rounded-full bg-accent border-4 border-background flex items-center justify-center">
                      <Shield className="h-5 w-5 text-background" />
                    </div>
                  </div>

                  <h2 className="font-orbitron text-2xl font-bold text-glow-red mb-1">
                    {userData.username}
                  </h2>

                  <Badge variant="secondary" className="mb-2">
                    {userData.role}
                  </Badge>

                  <p className="font-mono text-sm text-muted-foreground">
                    {userData.walletAddress}
                  </p>
                </div>

                {/* Level Progress */}
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Star className="h-4 w-4 text-accent" />
                      <span className="font-orbitron text-sm font-semibold">
                        Level {userData.level}
                      </span>
                    </div>
                    <span className="text-xs text-muted-foreground">
                      {userData.xp} / {userData.nextLevelXp} XP
                    </span>
                  </div>
                  <div className="w-full bg-muted/20 rounded-full h-2 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${xpPercentage}%` }}
                      transition={{ duration: 1, delay: 0.2 }}
                      className="h-full bg-gradient-to-r from-accent to-primary rounded-full"
                    />
                  </div>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-background/50 rounded-lg p-3 text-center">
                    <Trophy className="h-5 w-5 text-primary mx-auto mb-1" />
                    <p className="text-2xl font-bold font-mono">
                      {userData.totalPoints.toLocaleString()}
                    </p>
                    <p className="text-xs text-muted-foreground">Points</p>
                  </div>
                  <div className="bg-background/50 rounded-lg p-3 text-center">
                    <Flame className="h-5 w-5 text-accent mx-auto mb-1" />
                    <p className="text-2xl font-bold font-mono">
                      {userData.winStreak}
                    </p>
                    <p className="text-xs text-muted-foreground">Streak</p>
                  </div>
                  <div className="bg-background/50 rounded-lg p-3 text-center">
                    <Sparkles className="h-5 w-5 text-secondary mx-auto mb-1" />
                    <p className="text-2xl font-bold font-mono">
                      {userData.ownedNFTs}
                    </p>
                    <p className="text-xs text-muted-foreground">NFTs</p>
                  </div>
                  <div className="bg-background/50 rounded-lg p-3 text-center">
                    <Trophy className="h-5 w-5 text-green-400 mx-auto mb-1" />
                    <p className="text-2xl font-bold font-mono">
                      #{userData.rank}
                    </p>
                    <p className="text-xs text-muted-foreground">Rank</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right - Stats Grid */}
            <div className="lg:col-span-8 space-y-4">
              {/* Performance Stats */}
              <div className="grid sm:grid-cols-4 gap-4">
                {stats.map((stat, idx) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: idx * 0.1 }}
                    className="glass-card rounded-xl border border-border p-4 hover:border-primary/50 transition-all"
                  >
                    <stat.icon className={`h-5 w-5 ${stat.color} mb-2`} />
                    <p className="text-xs text-muted-foreground mb-1">
                      {stat.label}
                    </p>
                    <p className="text-xl font-bold font-mono">{stat.value}</p>
                  </motion.div>
                ))}
              </div>

              {/* Wallets - Horizontal Cards */}
              <div className="glass-card rounded-xl border border-border p-5">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-orbitron text-lg font-bold flex items-center gap-2">
                    <Wallet className="h-5 w-5 text-primary" />
                    Connected Wallets
                  </h3>
                  <Button variant="outline" size="sm">
                    <Wallet className="h-4 w-4 mr-2" />
                    Add Wallet
                  </Button>
                </div>

                <div className="space-y-2">
                  {wallets.map((wallet, idx) => (
                    <motion.div
                      key={wallet.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      className="flex items-center justify-between p-3 rounded-lg bg-muted/10 border border-border hover:border-primary/30 transition-all"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 border border-primary/30 flex items-center justify-center">
                          <span className="text-xs font-bold">
                            {wallet.chain.substring(0, 2).toUpperCase()}
                          </span>
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <p className="font-mono text-sm font-semibold">
                              {wallet.address}
                            </p>
                            {wallet.verified && (
                              <Shield className="h-3 w-3 text-green-400" />
                            )}
                          </div>
                          <p className="text-xs text-muted-foreground">
                            {wallet.chain}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {wallet.isPrimary && (
                          <Badge variant="default" className="text-xs">
                            Primary
                          </Badge>
                        )}
                        <Button variant="ghost" size="sm">
                          <ExternalLink className="h-4 w-4" />
                        </Button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Content Grid */}
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Points History - Timeline Style */}
            <div className="lg:col-span-2">
              <div className="glass-card rounded-xl border border-border p-5">
                <div className="flex items-center justify-between mb-5">
                  <h3 className="font-orbitron text-lg font-bold flex items-center gap-2">
                    <Activity className="h-5 w-5 text-primary" />
                    Activity Timeline
                  </h3>
                  <div className="text-right">
                    <p className="text-xs text-muted-foreground">Balance</p>
                    <p className="text-lg font-mono font-bold text-primary">
                      {userData.totalPoints.toLocaleString()} pts
                    </p>
                  </div>
                </div>

                {/* Timeline */}
                <div className="space-y-4">
                  {pointsHistory.map((entry, idx) => (
                    <motion.div
                      key={entry.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.05 }}
                      className="relative flex gap-4"
                    >
                      {/* Timeline Line */}
                      {idx !== pointsHistory.length - 1 && (
                        <div className="absolute left-[15px] top-8 w-0.5 h-full bg-border" />
                      )}

                      {/* Icon */}
                      <div
                        className={`relative z-10 w-8 h-8 rounded-full flex items-center justify-center ${
                          entry.category === "win"
                            ? "bg-green-500/20 border-2 border-green-500"
                            : entry.category === "bonus"
                            ? "bg-accent/20 border-2 border-accent"
                            : "bg-red-500/20 border-2 border-red-500"
                        }`}
                      >
                        {entry.category === "win" ? (
                          <TrendingUp className="h-4 w-4 text-green-400" />
                        ) : entry.category === "bonus" ? (
                          <Sparkles className="h-4 w-4 text-accent" />
                        ) : (
                          <TrendingDown className="h-4 w-4 text-red-400" />
                        )}
                      </div>

                      {/* Content */}
                      <div className="flex-1 pb-4">
                        <div className="flex items-start justify-between">
                          <div>
                            <p className="font-medium text-sm">
                              {entry.description}
                            </p>
                            <p className="text-xs text-muted-foreground mt-0.5">
                              {entry.timestamp}
                            </p>
                          </div>
                          <span
                            className={`font-mono font-bold text-lg ${
                              entry.amount > 0
                                ? "text-green-400"
                                : "text-red-400"
                            }`}
                          >
                            {entry.amount > 0 ? "+" : ""}
                            {entry.amount}
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            {/* NFTs & Badges Stack */}
            <div className="space-y-6">
              {/* NFTs - Compact Grid */}
              <div className="glass-card rounded-xl border border-border p-5">
                <h3 className="font-orbitron text-lg font-bold mb-4 flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-accent" />
                  NFT Collection
                </h3>
                <div className="space-y-3">
                  {nfts.map((nft, idx) => (
                    <motion.div
                      key={nft.id}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: idx * 0.1 }}
                      className="group p-3 rounded-lg border border-border hover:border-primary/50 transition-all bg-gradient-to-br from-muted/5 to-transparent cursor-pointer"
                    >
                      <div className="flex items-center gap-3 mb-2">
                        <div className="text-3xl">{nft.image}</div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-sm truncate">
                            {nft.name}
                          </p>
                          <div className="flex gap-1.5 mt-1">
                            <Badge variant="outline" className="text-xs">
                              {nft.rarity}
                            </Badge>
                            <Badge variant="secondary" className="text-xs">
                              {nft.tier}
                            </Badge>
                          </div>
                        </div>
                      </div>
                      <p className="text-xs text-muted-foreground pl-12">
                        {nft.benefits}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Badges - Progress Style */}
              <div className="glass-card rounded-xl border border-border p-5">
                <h3 className="font-orbitron text-lg font-bold mb-4 flex items-center gap-2">
                  <Award className="h-5 w-5 text-primary" />
                  Achievements
                </h3>
                <div className="space-y-3">
                  {badges.map((badge, idx) => (
                    <motion.div
                      key={badge.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      className="p-3 rounded-lg border border-border bg-muted/5"
                    >
                      <div className="flex items-center gap-3 mb-2">
                        <div className="text-2xl">{badge.icon}</div>
                        <div className="flex-1">
                          <p className="font-medium text-sm">{badge.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {badge.description}
                          </p>
                        </div>
                        <span className="text-xs font-mono text-accent">
                          {badge.progress}%
                        </span>
                      </div>
                      {badge.progress < 100 && (
                        <div className="w-full bg-muted/20 rounded-full h-1.5 overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${badge.progress}%` }}
                            transition={{ duration: 1, delay: 0.2 + idx * 0.1 }}
                            className="h-full bg-gradient-to-r from-accent to-primary rounded-full"
                          />
                        </div>
                      )}
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Social Integrations - Compact */}
              <div className="glass-card rounded-xl border border-border p-5">
                <h3 className="font-orbitron text-lg font-bold mb-4 flex items-center gap-2">
                  <LinkIcon className="h-5 w-5 text-secondary" />
                  Integrations
                </h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-3 rounded-lg border border-border bg-muted/5">
                    <div className="flex items-center gap-2">
                      <Twitter className="h-4 w-4 text-blue-400" />
                      <span className="text-sm font-medium">Twitter</span>
                    </div>
                    <Button variant="ghost" size="sm" className="text-xs">
                      Connect
                    </Button>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-lg border border-border bg-muted/5">
                    <div className="flex items-center gap-2">
                      <Trophy className="h-4 w-4 text-accent" />
                      <span className="text-sm font-medium">Oracle</span>
                    </div>
                    <Button variant="ghost" size="sm" className="text-xs">
                      Connect
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Profile;
