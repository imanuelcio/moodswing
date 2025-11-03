import { SiteHeader } from "@/components/SiteHeader";
import { Footer } from "@/components/Footer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { motion } from "framer-motion";
import {
  Trophy,
  Twitter,
  ExternalLink,
  Wallet,
  Shield,
  Star,
  Edit2,
  Trash2,
  Loader2,
  TrendingUp,
  TrendingDown,
  Calendar,
  Target,
  BarChart3,
  Award,
  Users,
  Copy,
  Check,
  Share2,
  Image as ImageIcon,
  Zap,
  Brain,
  Gem,
  Vote,
} from "lucide-react";
import { useDetailProfile } from "@/hooks/profile/useDetailProfile";
import { useState } from "react";
import { toast } from "sonner";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const Profile = () => {
  const { data, isLoading, refetch } = useDetailProfile();
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [newUsername, setNewUsername] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);
  const [deletingWalletId, setDeletingWalletId] = useState<number | null>(null);
  const [copied, setCopied] = useState(false);
  const [copiedAddress, setCopiedAddress] = useState(false);

  // Mock data - Replace with actual API data
  const statsData = {
    totalPredictions: 123,
    correctPredictions: 95,
    accuracy: 77.2,
    lifetimePL: 13400,
    roi: 58,
    averageStake: 210,
    level: "Oracle",
    xp: 7840,
    nextLevelXp: 10000,
    joinedDate: "Q1 2026",
  };

  const performanceHistory = [
    { month: "Jan", roi: 12, xp: 1200 },
    { month: "Feb", roi: 25, xp: 2400 },
    { month: "Mar", roi: 35, xp: 3800 },
    { month: "Apr", roi: 42, xp: 5200 },
    { month: "May", roi: 51, xp: 6500 },
    { month: "Jun", roi: 58, xp: 7840 },
  ];

  const accuracyByTopic = [
    { name: "BTC", accuracy: 83, color: "#F7931A" },
    { name: "SOL", accuracy: 68, color: "#14F195" },
    { name: "MEME", accuracy: 71, color: "#FF6B6B" },
    { name: "AI", accuracy: 89, color: "#9333EA" },
    { name: "DeFi", accuracy: 75, color: "#3B82F6" },
  ];

  const sentimentBias = [
    { name: "Bullish", value: 64, color: "#10B981" },
    { name: "Bearish", value: 36, color: "#EF4444" },
  ];

  const achievements = [
    {
      id: 1,
      icon: Brain,
      title: "AI Whisperer",
      description: "90% sentiment accuracy",
      unlocked: true,
      color: "text-purple-400",
      bgColor: "bg-purple-500/20",
    },
    {
      id: 2,
      icon: Award,
      title: "Hype Hunter",
      description: "20 correct bullish calls",
      unlocked: true,
      color: "text-orange-400",
      bgColor: "bg-orange-500/20",
    },
    {
      id: 3,
      icon: Gem,
      title: "Diamond Hands",
      description: "3-month staking streak",
      unlocked: true,
      color: "text-blue-400",
      bgColor: "bg-blue-500/20",
    },
    {
      id: 4,
      icon: Vote,
      title: "Governance Voter",
      description: "Participated in DAO 5x",
      unlocked: true,
      color: "text-green-400",
      bgColor: "bg-green-500/20",
    },
    {
      id: 5,
      icon: Zap,
      title: "Speed Trader",
      description: "100 predictions in 24h",
      unlocked: false,
      color: "text-yellow-400",
      bgColor: "bg-yellow-500/20",
    },
    {
      id: 6,
      icon: Trophy,
      title: "Top 10 Trader",
      description: "Ranked in top 10 leaderboard",
      unlocked: false,
      color: "text-amber-400",
      bgColor: "bg-amber-500/20",
    },
  ];

  const predictionHistory = [
    {
      id: 1,
      market: "BTC > 60 Sentiment",
      side: "Long",
      outcome: "Won",
      stake: 200,
      payout: 350,
      status: "Claimed",
      date: "2024-10-15",
    },
    {
      id: 2,
      market: "SOL < 40 Sentiment",
      side: "Short",
      outcome: "Lost",
      stake: 150,
      payout: 0,
      status: "Lost",
      date: "2024-10-14",
    },
    {
      id: 3,
      market: "ETH Merge Hype",
      side: "Long",
      outcome: "Won",
      stake: 300,
      payout: 525,
      status: "Claimed",
      date: "2024-10-13",
    },
    {
      id: 4,
      market: "DOGE Moon Mission",
      side: "Long",
      outcome: "Won",
      stake: 100,
      payout: 180,
      status: "Claimed",
      date: "2024-10-12",
    },
  ];

  const ownedNFTs = [
    {
      id: 1,
      name: "Sentimentals Genesis #42",
      image: "/nft-placeholder.png",
      multiplier: 1.5,
      revenueShare: "0.05%",
      airdropsEarned: 120,
    },
    {
      id: 2,
      name: "Sentimentals Genesis #156",
      image: "/nft-placeholder.png",
      multiplier: 1.5,
      revenueShare: "0.05%",
      airdropsEarned: 98,
    },
    {
      id: 3,
      name: "Sentimentals Genesis #789",
      image: "/nft-placeholder.png",
      multiplier: 1.5,
      revenueShare: "0.05%",
      airdropsEarned: 145,
    },
  ];

  const socialStats = {
    followers: 1247,
    following: 432,
    referredUsers: 18,
    profileViews: 3842,
  };

  const handleUpdateUsername = async () => {
    if (!newUsername.trim()) {
      toast.error("Username cannot be empty");
      return;
    }

    setIsUpdating(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      toast.success("Profile updated successfully");
      setIsEditDialogOpen(false);
      setNewUsername("");
      refetch();
    } catch (error) {
      toast.error("Failed to update profile");
    } finally {
      setIsUpdating(false);
    }
  };

  const handleDeleteWallet = async (walletId: number, isPrimary: boolean) => {
    if (isPrimary) {
      toast.error("You cannot delete your primary wallet");
      return;
    }

    setDeletingWalletId(walletId);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      toast.success("Wallet deleted successfully");
      refetch();
    } catch (error) {
      toast.error("Failed to delete wallet");
    } finally {
      setDeletingWalletId(null);
    }
  };

  const truncateAddress = (address: string) => {
    if (!address) return "";
    return `${address.substring(0, 6)}...${address.substring(
      address.length - 4
    )}`;
  };

  const copyToClipboard = (text: string, type: "profile" | "address") => {
    navigator.clipboard.writeText(text);
    if (type === "profile") {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } else {
      setCopiedAddress(true);
      setTimeout(() => setCopiedAddress(false), 2000);
    }
    toast.success("Copied to clipboard!");
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  const profile = data?.profile;
  if (!profile) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 flex items-center justify-center">
        <p className="text-muted-foreground">Profile not found</p>
      </div>
    );
  }

  const xpPercentage = (statsData.xp / statsData.nextLevelXp) * 100;
  const profileUrl = `sentimentalfi.com/@${profile.handle}`;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <SiteHeader />

      <main className="flex-1">
        <div className="container mx-auto px-4 py-6">
          {/* Hero Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid lg:grid-cols-12 gap-6 mb-6"
          >
            {/* Left - Identity Card */}
            <div className="lg:col-span-4">
              <div className="glass-card rounded-2xl border border-border p-6 h-full bg-gradient-to-br from-primary/10 to-transparent">
                {/* Avatar & Basic Info */}
                <div className="flex flex-col items-center mb-6">
                  <div className="relative mb-4">
                    <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-4xl font-bold">
                      {profile.username?.charAt(0).toUpperCase() || "U"}
                    </div>
                    <div className="absolute -bottom-2 -right-2 w-10 h-10 rounded-full bg-accent border-4 border-background flex items-center justify-center">
                      <Shield className="h-5 w-5 text-background" />
                    </div>
                  </div>

                  <div className="flex items-center gap-2 mb-1">
                    <h2 className="font-orbitron text-2xl font-bold text-glow-red">
                      {profile.username || profile.handle}
                    </h2>
                    <Dialog
                      open={isEditDialogOpen}
                      onOpenChange={setIsEditDialogOpen}
                    >
                      <DialogTrigger asChild>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0"
                          onClick={() => setNewUsername(profile.username || "")}
                        >
                          <Edit2 className="h-4 w-4" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Edit Profile Name</DialogTitle>
                          <DialogDescription>
                            Update your display name visible to other users.
                          </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4 py-4">
                          <div className="space-y-2">
                            <label className="text-sm font-medium">
                              Username
                            </label>
                            <Input
                              value={newUsername}
                              onChange={(e) => setNewUsername(e.target.value)}
                              placeholder="Enter new username"
                              disabled={isUpdating}
                            />
                          </div>
                        </div>
                        <DialogFooter>
                          <Button
                            variant="outline"
                            onClick={() => setIsEditDialogOpen(false)}
                            disabled={isUpdating}
                          >
                            Cancel
                          </Button>
                          <Button
                            onClick={handleUpdateUsername}
                            disabled={isUpdating}
                          >
                            {isUpdating ? (
                              <>
                                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                                Updating...
                              </>
                            ) : (
                              "Save Changes"
                            )}
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </div>

                  <Badge variant="secondary" className="mb-2">
                    @{profile.handle}
                  </Badge>

                  <div className="flex items-center gap-2 mb-2">
                    <p className="font-mono text-sm text-muted-foreground">
                      {truncateAddress(profile.primaryWallet?.address || "")}
                    </p>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-6 w-6 p-0"
                      onClick={() =>
                        copyToClipboard(
                          profile.primaryWallet?.address || "",
                          "address"
                        )
                      }
                    >
                      {copiedAddress ? (
                        <Check className="h-3 w-3 text-green-500" />
                      ) : (
                        <Copy className="h-3 w-3" />
                      )}
                    </Button>
                  </div>

                  <div className="flex items-center gap-4 text-xs text-muted-foreground mb-4">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      Joined {statsData.joinedDate}
                    </div>
                  </div>

                  {/* Share Profile */}
                  <div className="flex gap-2 w-full">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1"
                      onClick={() => copyToClipboard(profileUrl, "profile")}
                    >
                      {copied ? (
                        <Check className="h-4 w-4 mr-2" />
                      ) : (
                        <Copy className="h-4 w-4 mr-2" />
                      )}
                      {copied ? "Copied!" : "Copy Link"}
                    </Button>
                    <Button variant="outline" size="sm">
                      <Share2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {/* Level & XP */}
                <div className="mb-6 p-4 rounded-lg bg-gradient-to-br from-accent/20 to-primary/20 border border-accent/30">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <Star className="h-5 w-5 text-accent" />
                      <span className="font-orbitron text-lg font-bold">
                        {statsData.level}
                      </span>
                    </div>
                    <Badge variant="secondary" className="text-xs">
                      Level {Math.floor(statsData.xp / 1000)}
                    </Badge>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-muted-foreground">Progress</span>
                      <span className="font-mono font-semibold">
                        {statsData.xp} / {statsData.nextLevelXp} XP
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
                </div>

                {/* Social Stats */}
                <div className="grid grid-cols-2 gap-3 mb-6">
                  <div className="p-3 rounded-lg bg-muted/10 border border-border text-center">
                    <Users className="h-4 w-4 mx-auto mb-1 text-primary" />
                    <p className="text-lg font-bold">
                      {socialStats.followers.toLocaleString()}
                    </p>
                    <p className="text-xs text-muted-foreground">Followers</p>
                  </div>
                  <div className="p-3 rounded-lg bg-muted/10 border border-border text-center">
                    <Target className="h-4 w-4 mx-auto mb-1 text-accent" />
                    <p className="text-lg font-bold">
                      {socialStats.referredUsers}
                    </p>
                    <p className="text-xs text-muted-foreground">Referred</p>
                  </div>
                </div>

                {/* Social Connections */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-3 rounded-lg border border-border bg-muted/5 hover:bg-muted/10 transition-colors">
                    <div className="flex items-center gap-2">
                      <Twitter className="h-4 w-4 text-blue-400" />
                      <span className="text-sm font-medium">Twitter</span>
                    </div>
                    <Button variant="ghost" size="sm" className="text-xs">
                      Connect
                    </Button>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-lg border border-border bg-muted/5 hover:bg-muted/10 transition-colors">
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

            {/* Right - Main Content */}
            <div className="lg:col-span-8">
              <Tabs defaultValue="performance" className="space-y-4">
                <TabsList className="grid w-full grid-cols-5">
                  <TabsTrigger value="performance">Performance</TabsTrigger>
                  <TabsTrigger value="nfts">NFTs</TabsTrigger>
                  <TabsTrigger value="achievements">Achievements</TabsTrigger>
                  <TabsTrigger value="history">History</TabsTrigger>
                  <TabsTrigger value="wallets">Wallets</TabsTrigger>
                </TabsList>

                {/* Performance Tab */}
                <TabsContent value="performance" className="space-y-4">
                  {/* Stats Grid */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="glass-card rounded-xl border border-border p-4"
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <Target className="h-4 w-4 text-primary" />
                        <p className="text-xs text-muted-foreground">
                          Total Predictions
                        </p>
                      </div>
                      <p className="text-2xl font-bold">
                        {statsData.totalPredictions}
                      </p>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 }}
                      className="glass-card rounded-xl border border-border p-4"
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <TrendingUp className="h-4 w-4 text-green-500" />
                        <p className="text-xs text-muted-foreground">
                          Accuracy
                        </p>
                      </div>
                      <p className="text-2xl font-bold text-green-500">
                        {statsData.accuracy}%
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {statsData.correctPredictions}/
                        {statsData.totalPredictions} won
                      </p>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                      className="glass-card rounded-xl border border-border p-4"
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <BarChart3 className="h-4 w-4 text-accent" />
                        <p className="text-xs text-muted-foreground">
                          Lifetime P&L
                        </p>
                      </div>
                      <p className="text-2xl font-bold text-accent">
                        +{statsData.lifetimePL.toLocaleString()}
                      </p>
                      <p className="text-xs text-muted-foreground">points</p>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      className="glass-card rounded-xl border border-border p-4"
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <TrendingUp className="h-4 w-4 text-primary" />
                        <p className="text-xs text-muted-foreground">ROI</p>
                      </div>
                      <p className="text-2xl font-bold text-primary">
                        +{statsData.roi}%
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Avg stake: {statsData.averageStake} pts
                      </p>
                    </motion.div>
                  </div>

                  {/* Performance Chart */}
                  <div className="glass-card rounded-xl border border-border p-6">
                    <h3 className="font-orbitron text-lg font-bold mb-4">
                      Historical Performance
                    </h3>
                    <ResponsiveContainer width="100%" height={300}>
                      <LineChart data={performanceHistory}>
                        <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                        <XAxis dataKey="month" />
                        <YAxis yAxisId="left" />
                        <YAxis yAxisId="right" orientation="right" />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: "hsl(var(--background))",
                            border: "1px solid hsl(var(--border))",
                            borderRadius: "8px",
                          }}
                        />
                        <Line
                          yAxisId="left"
                          type="monotone"
                          dataKey="roi"
                          stroke="hsl(var(--primary))"
                          strokeWidth={2}
                          name="ROI %"
                        />
                        <Line
                          yAxisId="right"
                          type="monotone"
                          dataKey="xp"
                          stroke="hsl(var(--accent))"
                          strokeWidth={2}
                          name="XP"
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>

                  {/* Analytics Grid */}
                  <div className="grid md:grid-cols-2 gap-4">
                    {/* Accuracy by Topic */}
                    <div className="glass-card rounded-xl border border-border p-6">
                      <h3 className="font-orbitron text-lg font-bold mb-4">
                        Accuracy by Topic
                      </h3>
                      <div className="space-y-3">
                        {accuracyByTopic.map((topic) => (
                          <div key={topic.name}>
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-sm font-medium">
                                {topic.name}
                              </span>
                              <span className="text-sm font-bold">
                                {topic.accuracy}%
                              </span>
                            </div>
                            <div className="w-full bg-muted/20 rounded-full h-2">
                              <div
                                className="h-full rounded-full transition-all"
                                style={{
                                  width: `${topic.accuracy}%`,
                                  backgroundColor: topic.color,
                                }}
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Sentiment Bias */}
                    <div className="glass-card rounded-xl border border-border p-6">
                      <h3 className="font-orbitron text-lg font-bold mb-4">
                        Sentiment Bias
                      </h3>
                      <div className="flex items-center justify-center h-48">
                        <ResponsiveContainer width="100%" height="100%">
                          <PieChart>
                            <Pie
                              data={sentimentBias}
                              cx="50%"
                              cy="50%"
                              innerRadius={60}
                              outerRadius={80}
                              paddingAngle={5}
                              dataKey="value"
                            >
                              {sentimentBias.map((entry, index) => (
                                <Cell
                                  key={`cell-${index}`}
                                  fill={entry.color}
                                />
                              ))}
                            </Pie>
                            <Tooltip />
                          </PieChart>
                        </ResponsiveContainer>
                      </div>
                      <div className="grid grid-cols-2 gap-3 mt-4">
                        {sentimentBias.map((item) => (
                          <div
                            key={item.name}
                            className="flex items-center gap-2"
                          >
                            <div
                              className="w-3 h-3 rounded-full"
                              style={{ backgroundColor: item.color }}
                            />
                            <span className="text-sm">
                              {item.name}: {item.value}%
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </TabsContent>

                {/* NFTs Tab */}
                <TabsContent value="nfts">
                  <div className="glass-card rounded-xl border border-border p-6">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="font-orbitron text-lg font-bold">
                        Owned NFTs ({ownedNFTs.length})
                      </h3>
                      <Button variant="outline" size="sm">
                        <ImageIcon className="h-4 w-4 mr-2" />
                        View All
                      </Button>
                    </div>

                    <div className="grid md:grid-cols-3 gap-4">
                      {ownedNFTs.map((nft, idx) => (
                        <motion.div
                          key={nft.id}
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: idx * 0.1 }}
                          className="group relative rounded-xl border border-border bg-muted/10 overflow-hidden hover:border-primary/50 transition-all"
                        >
                          <div className="aspect-square bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                            <ImageIcon className="h-16 w-16 text-muted-foreground" />
                          </div>
                          <div className="p-4">
                            <h4 className="font-semibold text-sm mb-3">
                              {nft.name}
                            </h4>
                            <div className="space-y-2 text-xs">
                              <div className="flex items-center justify-between">
                                <span className="text-muted-foreground">
                                  Multiplier
                                </span>
                                <Badge variant="secondary">
                                  {nft.multiplier}x
                                </Badge>
                              </div>
                              <div className="flex items-center justify-between">
                                <span className="text-muted-foreground">
                                  Revenue Share
                                </span>
                                <span className="font-mono">
                                  {nft.revenueShare}
                                </span>
                              </div>
                              <div className="flex items-center justify-between">
                                <span className="text-muted-foreground">
                                  Airdrops Earned
                                </span>
                                <span className="font-bold text-accent">
                                  {nft.airdropsEarned} SFI
                                </span>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>

                    {/* NFT Benefits Summary */}
                    <div className="mt-6 p-4 rounded-lg bg-gradient-to-br from-primary/10 to-accent/10 border border-primary/30">
                      <h4 className="font-semibold mb-3">Your NFT Benefits</h4>
                      <div className="grid md:grid-cols-3 gap-4 text-sm">
                        <div>
                          <p className="text-muted-foreground mb-1">
                            Total Multiplier
                          </p>
                          <p className="text-xl font-bold">
                            {ownedNFTs.length * 1.5}x
                          </p>
                        </div>
                        <div>
                          <p className="text-muted-foreground mb-1">
                            Revenue Share
                          </p>
                          <p className="text-xl font-bold">
                            {(ownedNFTs.length * 0.05).toFixed(2)}%
                          </p>
                        </div>
                        <div>
                          <p className="text-muted-foreground mb-1">
                            Total Airdrops
                          </p>
                          <p className="text-xl font-bold text-accent">
                            {ownedNFTs.reduce(
                              (sum, nft) => sum + nft.airdropsEarned,
                              0
                            )}{" "}
                            SFI
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                {/* Achievements Tab */}
                <TabsContent value="achievements">
                  <div className="glass-card rounded-xl border border-border p-6">
                    <h3 className="font-orbitron text-lg font-bold mb-6">
                      Achievements & Badges
                    </h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      {achievements.map((achievement, idx) => {
                        const Icon = achievement.icon;
                        return (
                          <motion.div
                            key={achievement.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            className={`p-4 rounded-xl border transition-all ${
                              achievement.unlocked
                                ? `${achievement.bgColor} border-primary/30 hover:border-primary/50`
                                : "bg-muted/5 border-muted opacity-50"
                            }`}
                          >
                            <div className="flex items-start gap-3">
                              <div
                                className={`p-3 rounded-lg ${achievement.bgColor}`}
                              >
                                <Icon
                                  className={`h-6 w-6 ${achievement.color}`}
                                />
                              </div>
                              <div className="flex-1">
                                <h4 className="font-semibold mb-1">
                                  {achievement.title}
                                </h4>
                                <p className="text-xs text-muted-foreground">
                                  {achievement.description}
                                </p>
                                {achievement.unlocked && (
                                  <Badge
                                    variant="secondary"
                                    className="mt-2 text-xs"
                                  >
                                    ✓ Unlocked
                                  </Badge>
                                )}
                              </div>
                            </div>
                          </motion.div>
                        );
                      })}
                    </div>
                  </div>
                </TabsContent>

                {/* History Tab */}
                <TabsContent value="history">
                  <div className="glass-card rounded-xl border border-border p-6">
                    <h3 className="font-orbitron text-lg font-bold mb-6">
                      Prediction History
                    </h3>
                    <div className="overflow-x-auto">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Market</TableHead>
                            <TableHead>Side</TableHead>
                            <TableHead>Outcome</TableHead>
                            <TableHead>Stake</TableHead>
                            <TableHead>Payout</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Date</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {predictionHistory.map((pred) => (
                            <TableRow key={pred.id}>
                              <TableCell className="font-medium">
                                {pred.market}
                              </TableCell>
                              <TableCell>
                                <Badge
                                  variant={
                                    pred.side === "Long"
                                      ? "default"
                                      : "secondary"
                                  }
                                >
                                  {pred.side}
                                </Badge>
                              </TableCell>
                              <TableCell>
                                {pred.outcome === "Won" ? (
                                  <div className="flex items-center gap-1 text-green-500">
                                    <TrendingUp className="h-4 w-4" />
                                    Won
                                  </div>
                                ) : (
                                  <div className="flex items-center gap-1 text-red-500">
                                    <TrendingDown className="h-4 w-4" />
                                    Lost
                                  </div>
                                )}
                              </TableCell>
                              <TableCell className="font-mono">
                                {pred.stake} pts
                              </TableCell>
                              <TableCell className="font-mono font-bold">
                                {pred.payout > 0 ? (
                                  <span className="text-green-500">
                                    +{pred.payout} pts
                                  </span>
                                ) : (
                                  <span className="text-red-500">0</span>
                                )}
                              </TableCell>
                              <TableCell>
                                <Badge
                                  variant={
                                    pred.status === "Claimed"
                                      ? "default"
                                      : "destructive"
                                  }
                                >
                                  {pred.status}
                                </Badge>
                              </TableCell>
                              <TableCell className="text-sm text-muted-foreground">
                                {pred.date}
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </div>
                </TabsContent>

                {/* Wallets Tab */}
                <TabsContent value="wallets">
                  <div className="glass-card rounded-xl border border-border p-6">
                    <div className="flex items-center justify-between mb-6">
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
                      {profile.wallets?.map((wallet, idx) => (
                        <motion.div
                          key={wallet.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: idx * 0.1 }}
                          className="flex items-center justify-between p-4 rounded-lg bg-muted/10 border border-border hover:border-primary/30 transition-all"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 border border-primary/30 flex items-center justify-center">
                              <span className="text-sm font-bold">
                                {wallet.chains.name
                                  .substring(0, 2)
                                  .toUpperCase()}
                              </span>
                            </div>
                            <div>
                              <div className="flex items-center gap-2 mb-1">
                                <p className="font-mono text-sm font-semibold">
                                  {truncateAddress(wallet.address)}
                                </p>
                                <Shield className="h-3 w-3 text-green-400" />
                              </div>
                              <p className="text-xs text-muted-foreground">
                                {wallet.chains.name}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            {wallet.is_primary && (
                              <Badge variant="default" className="text-xs">
                                Primary
                              </Badge>
                            )}
                            <Button variant="ghost" size="sm">
                              <ExternalLink className="h-4 w-4" />
                            </Button>
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  disabled={
                                    wallet.is_primary ||
                                    deletingWalletId === wallet.id
                                  }
                                >
                                  {deletingWalletId === wallet.id ? (
                                    <Loader2 className="h-4 w-4 animate-spin" />
                                  ) : (
                                    <Trash2 className="h-4 w-4 text-destructive" />
                                  )}
                                </Button>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>
                                    Delete Wallet
                                  </AlertDialogTitle>
                                  <AlertDialogDescription>
                                    Are you sure you want to delete this wallet?
                                    This action cannot be undone.
                                    <div className="mt-4 p-3 bg-muted rounded-lg">
                                      <p className="font-mono text-sm">
                                        {wallet.address}
                                      </p>
                                      <p className="text-xs text-muted-foreground mt-1">
                                        {wallet.chains.name}
                                      </p>
                                    </div>
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                                  <AlertDialogAction
                                    onClick={() =>
                                      handleDeleteWallet(
                                        wallet.id,
                                        wallet.is_primary
                                      )
                                    }
                                    className="bg-destructive hover:bg-destructive/90"
                                  >
                                    Delete
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Profile;
