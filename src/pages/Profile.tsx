import { SiteHeader } from "@/components/SiteHeader";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Trophy,
  TrendingUp,
  Award,
  Zap,
  Twitter,
  ExternalLink,
  Wallet,
  Link as LinkIcon,
} from "lucide-react";

const Profile = () => {
  // Mock user data - replace with React Query API calls
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
  };

  // Mock wallets from user_wallets
  const wallets = [
    { id: "1", address: "0x7a4b...3f9c", chain: "Ethereum", isPrimary: true },
    { id: "2", address: "5Gw8...xK3m", chain: "Solana", isPrimary: false },
  ];

  // Mock points ledger
  const pointsHistory = [
    {
      id: "1",
      type: "bet_win",
      amount: +120,
      timestamp: "2h ago",
      description: "Won bet on BTC market",
    },
    {
      id: "2",
      type: "decay",
      amount: -15,
      timestamp: "1d ago",
      description: "15% monthly decay",
    },
    {
      id: "3",
      type: "streak_bonus",
      amount: +50,
      timestamp: "3d ago",
      description: "7-day streak bonus",
    },
  ];

  // Mock NFTs from user perspective
  const nfts = [
    {
      id: "1",
      name: "Mood Swing Genesis #042",
      rarity: "Rare",
      tier: "Gold",
      image: "🎭",
    },
    {
      id: "2",
      name: "Sentiment Oracle #127",
      rarity: "Epic",
      tier: "Platinum",
      image: "🔮",
    },
    {
      id: "3",
      name: "Hype Beast #891",
      rarity: "Common",
      tier: "Silver",
      image: "🚀",
    },
  ];

  // Mock badges from user_badges
  const badges = [
    { id: "1", name: "Hot Streak", description: "5 wins in a row", icon: "🔥" },
    {
      id: "2",
      name: "Early Adopter",
      description: "Joined in beta",
      icon: "⭐",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-4 mb-2">
              <h1 className="font-orbitron text-4xl font-bold text-glow-red">
                Profile
              </h1>
              <Badge variant="secondary" className="text-sm">
                {userData.role}
              </Badge>
            </div>
            <p className="text-muted-foreground">
              Manage your account and view your stats
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <Card className="glass-card border-border">
              <CardHeader className="pb-3">
                <div className="flex items-center gap-2">
                  <Trophy className="h-4 w-4 text-primary" />
                  <p className="text-sm text-muted-foreground">Total Points</p>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-mono text-success">
                  {userData.totalPoints.toLocaleString()}
                </p>
              </CardContent>
            </Card>

            <Card className="glass-card border-border">
              <CardHeader className="pb-3">
                <div className="flex items-center gap-2">
                  <Zap className="h-4 w-4 text-primary" />
                  <p className="text-sm text-muted-foreground">Win Streak</p>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-mono text-foreground">
                  {userData.winStreak} days
                </p>
              </CardContent>
            </Card>

            <Card className="glass-card border-border">
              <CardHeader className="pb-3">
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-primary" />
                  <p className="text-sm text-muted-foreground">Win Rate</p>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-mono text-foreground">
                  {userData.winRate}%
                </p>
              </CardContent>
            </Card>

            <Card className="glass-card border-border">
              <CardHeader className="pb-3">
                <div className="flex items-center gap-2">
                  <Award className="h-4 w-4 text-primary" />
                  <p className="text-sm text-muted-foreground">NFTs Owned</p>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-mono text-foreground">
                  {userData.ownedNFTs}
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Wallets Section */}
          <Card className="glass-card border-border mb-8">
            <CardHeader>
              <CardTitle className="font-orbitron text-glow-red flex items-center gap-2">
                <Wallet className="h-5 w-5" />
                Connected Wallets
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {wallets.map((wallet) => (
                <div
                  key={wallet.id}
                  className="flex items-center justify-between p-3 rounded-lg border border-border hover:border-primary/50 transition-all"
                >
                  <div>
                    <p className="font-mono text-foreground">
                      {wallet.address}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {wallet.chain}
                    </p>
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
                </div>
              ))}
              <Button variant="outline" className="w-full">
                <Wallet className="h-4 w-4 mr-2" />
                Add Wallet
              </Button>
            </CardContent>
          </Card>

          {/* Points Ledger */}
          <Card className="glass-card border-border mb-8">
            <CardHeader>
              <CardTitle className="font-orbitron text-glow-red flex items-center gap-2">
                <Trophy className="h-5 w-5" />
                Points History
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="mb-4 p-3 rounded-lg bg-primary/5 border border-primary/20">
                <p className="text-sm text-muted-foreground">Current Balance</p>
                <p className="text-2xl font-mono text-success">
                  {userData.totalPoints.toLocaleString()} pts
                </p>
                <p className="text-xs text-destructive mt-1">
                  ⚠️ 15% decay in 30 days
                </p>
              </div>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Type</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                    <TableHead>Time</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {pointsHistory.map((entry) => (
                    <TableRow key={entry.id}>
                      <TableCell>
                        <div>
                          <p className="font-medium text-sm">
                            {entry.description}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {entry.type}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <span
                          className={`font-mono ${
                            entry.amount > 0
                              ? "text-success"
                              : "text-destructive"
                          }`}
                        >
                          {entry.amount > 0 ? "+" : ""}
                          {entry.amount}
                        </span>
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {entry.timestamp}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <div className="grid md:grid-cols-2 gap-8 mb-8">
            {/* NFTs Section */}
            <Card className="glass-card border-border">
              <CardHeader>
                <CardTitle className="font-orbitron text-glow-red">
                  Owned NFTs
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {nfts.map((nft) => (
                  <div
                    key={nft.id}
                    className="flex items-center gap-3 p-3 rounded-lg border border-border hover:border-primary/50 transition-all"
                  >
                    <div className="text-3xl">{nft.image}</div>
                    <div className="flex-1">
                      <p className="font-medium text-foreground">{nft.name}</p>
                      <div className="flex gap-2 mt-1">
                        <Badge variant="outline" className="text-xs">
                          {nft.rarity}
                        </Badge>
                        <Badge variant="secondary" className="text-xs">
                          {nft.tier}
                        </Badge>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Badges Section */}
            <Card className="glass-card border-border">
              <CardHeader>
                <CardTitle className="font-orbitron text-glow-red flex items-center gap-2">
                  <Award className="h-5 w-5" />
                  Earned Badges
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {badges.map((badge) => (
                  <div
                    key={badge.id}
                    className="flex items-center gap-3 p-3 rounded-lg border border-border hover:border-primary/50 transition-all"
                  >
                    <div className="text-3xl">{badge.icon}</div>
                    <div>
                      <p className="font-medium text-foreground">
                        {badge.name}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {badge.description}
                      </p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Social Integrations */}
          <Card className="glass-card border-border">
            <CardHeader>
              <CardTitle className="font-orbitron text-glow-red flex items-center gap-2">
                <LinkIcon className="h-5 w-5" />
                Social Integrations
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between p-3 rounded-lg border border-border hover:border-primary/50 transition-all">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <Twitter className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">X (Twitter)</p>
                    <p className="text-sm text-muted-foreground">
                      Not connected
                    </p>
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  Connect
                </Button>
              </div>

              <div className="flex items-center justify-between p-3 rounded-lg border border-border hover:border-primary/50 transition-all">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center">
                    <Trophy className="h-5 w-5 text-secondary" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">
                      Oracle Network
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Not connected
                    </p>
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  Connect
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Profile;
