import { useState, useEffect } from "react";
import { SiteHeader } from "@/components/SiteHeader";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion } from "framer-motion";
import {
  Gift,
  TrendingUp,
  Heart,
  Sparkles,
  Loader2,
  AlertCircle,
  Trophy,
  Star,
  MessageCircle,
  ThumbsUp,
  TrendingDown,
  Activity,
  Calendar,
  CheckCircle2,
  Target,
  Eye,
  Zap,
} from "lucide-react";
import { TipPostModal } from "@/components/Tipcreatormodal";

// Types
interface CreatorPost {
  id: string;
  creator: {
    id: string;
    username: string;
    displayName: string;
    avatar?: string;
    verified: boolean;
    predictionAccuracy: number;
  };
  content: string;
  sentiment: "bullish" | "bearish" | "neutral";
  category: string;
  tags: string[];
  prediction: {
    topic: string;
    direction: "long" | "short";
    confidence: number;
    timeframe: string;
    reasoning: string;
  };
  tips: {
    total: number;
    count: number;
  };
  likes: number;
  views: number;
  createdAt: string;
  isHighQuality: boolean;
}

interface TippingStats {
  yourTotalTipped: number;
  yourBonusEarned: number;
  postsYouTipped: number;
  topPost?: CreatorPost;
}

// Dummy data
const dummyPosts: CreatorPost[] = [
  {
    id: "post-1",
    creator: {
      id: "creator-1",
      username: "crypto_sage",
      displayName: "Crypto Sage",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=crypto_sage",
      verified: true,
      predictionAccuracy: 87.5,
    },
    content:
      "Strong bullish sentiment detected on AI sector. Recent OpenAI developments and enterprise adoption driving major hype. Momentum indicators show sustained upward pressure. Technical breakout confirmed above key resistance.",
    sentiment: "bullish",
    category: "Technology",
    tags: ["AI", "Tech Stocks", "Bullish"],
    prediction: {
      topic: "AI Development Trends",
      direction: "long",
      confidence: 85,
      timeframe: "7 days",
      reasoning:
        "Multiple positive catalysts: enterprise adoption +40%, new model releases, and institutional investment flowing in. Sentiment score climbing from 65 to 82 in 48 hours.",
    },
    tips: { total: 2450, count: 18 },
    likes: 234,
    views: 1890,
    createdAt: "2025-11-03T10:30:00Z",
    isHighQuality: true,
  },
  {
    id: "post-2",
    creator: {
      id: "creator-2",
      username: "market_maven",
      displayName: "Market Maven",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=market_maven",
      verified: false,
      predictionAccuracy: 72.3,
    },
    content:
      "Climate policy sentiment turning bearish. New regulations causing FUD in energy sector. Short-term downward pressure expected as market digests policy changes. Watch for reversal signals.",
    sentiment: "bearish",
    category: "Environment",
    tags: ["Climate", "Policy", "Energy"],
    prediction: {
      topic: "Climate Change Actions",
      direction: "short",
      confidence: 68,
      timeframe: "3 days",
      reasoning:
        "Negative sentiment spike following regulatory announcements. Social media analysis shows 65% negative mentions, institutional investors taking cautious stance.",
    },
    tips: { total: 890, count: 7 },
    likes: 156,
    views: 980,
    createdAt: "2025-11-03T09:15:00Z",
    isHighQuality: true,
  },
  {
    id: "post-3",
    creator: {
      id: "creator-3",
      username: "trend_hunter",
      displayName: "Trend Hunter",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=trend_hunter",
      verified: true,
      predictionAccuracy: 91.2,
    },
    content:
      "Gaming industry showing explosive growth potential! New AAA releases + streaming platform expansion creating perfect storm. Community engagement at all-time highs. Strong buy signal across multiple indicators.",
    sentiment: "bullish",
    category: "Entertainment",
    tags: ["Gaming", "Entertainment", "Growth"],
    prediction: {
      topic: "Gaming Industry Growth",
      direction: "long",
      confidence: 92,
      timeframe: "14 days",
      reasoning:
        "Exceptional fundamentals: major title launches, user growth +35% QoQ, streaming revenue doubling. Sentiment analysis shows overwhelming positive momentum with 88/100 hype score.",
    },
    tips: { total: 3200, count: 24 },
    likes: 412,
    views: 2340,
    createdAt: "2025-11-03T08:00:00Z",
    isHighQuality: true,
  },
  {
    id: "post-4",
    creator: {
      id: "creator-4",
      username: "sentiment_pro",
      displayName: "Sentiment Pro",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=sentiment_pro",
      verified: false,
      predictionAccuracy: 79.8,
    },
    content:
      "Social media evolution hitting inflection point. Platform fatigue vs innovation battle. Mixed signals but slight bullish bias emerging. New features driving re-engagement among key demographics.",
    sentiment: "neutral",
    category: "Social",
    tags: ["Social Media", "Tech", "Trends"],
    prediction: {
      topic: "Social Media Evolution",
      direction: "long",
      confidence: 58,
      timeframe: "10 days",
      reasoning:
        "Sentiment divided but trending positive. Early adopter engagement up, new feature rollouts successful. However, regulatory concerns dampening enthusiasm. Net positive but cautious positioning advised.",
    },
    tips: { total: 560, count: 5 },
    likes: 89,
    views: 567,
    createdAt: "2025-11-03T07:30:00Z",
    isHighQuality: false,
  },
];

const CreatorTips = () => {
  const [posts, setPosts] = useState<CreatorPost[]>(dummyPosts);
  const [tippingStats, setTippingStats] = useState<TippingStats>({
    yourTotalTipped: 1250,
    yourBonusEarned: 25,
    postsYouTipped: 3,
    topPost: dummyPosts[0],
  });
  const [selectedPost, setSelectedPost] = useState<CreatorPost | null>(null);
  const [activeTab, setActiveTab] = useState<"trending" | "recent" | "top">(
    "trending"
  );
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch posts
  const fetchPosts = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/creator-posts?filter=${activeTab}`, {
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) throw new Error("Failed to fetch posts");

      const data = await response.json();
      setPosts(data.posts);
      setTippingStats(data.stats);
    } catch (err) {
      console.error("Posts fetch error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [activeTab]);

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case "bullish":
        return "text-green-500 bg-green-500/10 border-green-500/30";
      case "bearish":
        return "text-red-500 bg-red-500/10 border-red-500/30";
      default:
        return "text-blue-500 bg-blue-500/10 border-blue-500/30";
    }
  };

  const getSentimentIcon = (sentiment: string) => {
    switch (sentiment) {
      case "bullish":
        return TrendingUp;
      case "bearish":
        return TrendingDown;
      default:
        return Activity;
    }
  };

  const formatTimeAgo = (date: string) => {
    const now = new Date();
    const posted = new Date(date);
    const diffHours = Math.floor(
      (now.getTime() - posted.getTime()) / (1000 * 60 * 60)
    );

    if (diffHours < 1) return "Just now";
    if (diffHours < 24) return `${diffHours}h ago`;
    return `${Math.floor(diffHours / 24)}d ago`;
  };

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* LEFT SIDEBAR - STICKY */}
            <div className="lg:col-span-4 xl:col-span-3">
              <div className="sticky top-24 space-y-6">
                {/* Header */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-4"
                >
                  <div>
                    <h1 className="font-orbitron text-4xl font-bold text-glow-red mb-2">
                      Creator Tips
                    </h1>
                    <p className="text-muted-foreground">
                      Support quality predictions and earn 2% bonus
                    </p>
                  </div>

                  {/* Info Banner */}
                  <div className="glass-card rounded-xl p-4 border border-primary/20 bg-primary/5">
                    <div className="flex items-start gap-3">
                      <Sparkles className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                      <div>
                        <h3 className="font-semibold mb-1 text-sm">
                          How It Works
                        </h3>
                        <p className="text-xs text-muted-foreground leading-relaxed">
                          Tip valuable predictions with SFI. High-quality posts
                          give you
                          <strong className="text-primary"> 2% bonus</strong>!
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Your Stats */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <Card className="glass-card border-border">
                    <CardHeader className="pb-3">
                      <h3 className="font-orbitron font-semibold flex items-center gap-2">
                        <Trophy className="h-4 w-4 text-primary" />
                        Your Stats
                      </h3>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">
                            Total Tipped
                          </span>
                          <span className="font-semibold font-mono">
                            {tippingStats.yourTotalTipped.toLocaleString()} SFI
                          </span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">
                            Bonus Earned
                          </span>
                          <span className="font-semibold font-mono text-green-500">
                            +{tippingStats.yourBonusEarned} SFI
                          </span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">
                            Posts Tipped
                          </span>
                          <span className="font-semibold font-mono">
                            {tippingStats.postsYouTipped}
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>

                {/* Tabs */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <Tabs
                    value={activeTab}
                    onValueChange={(v: any) => setActiveTab(v)}
                  >
                    <TabsList className="glass-card w-full grid grid-cols-3 p-1">
                      <TabsTrigger value="trending" className="text-xs">
                        <TrendingUp className="h-3 w-3 mr-1" />
                        Trending
                      </TabsTrigger>
                      <TabsTrigger value="recent" className="text-xs">
                        <Calendar className="h-3 w-3 mr-1" />
                        Recent
                      </TabsTrigger>
                      <TabsTrigger value="top" className="text-xs">
                        <Trophy className="h-3 w-3 mr-1" />
                        Top
                      </TabsTrigger>
                    </TabsList>
                  </Tabs>
                </motion.div>

                {/* How It Works */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <Card className="glass-card border-border">
                    <CardHeader className="pb-3">
                      <h3 className="font-orbitron font-semibold text-sm">
                        Why Tip?
                      </h3>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex items-start gap-3">
                        <div className="p-2 rounded-lg bg-amber-500/10 shrink-0">
                          <Star className="h-4 w-4 text-amber-500" />
                        </div>
                        <div>
                          <div className="font-semibold text-sm mb-1">
                            Support Quality
                          </div>
                          <p className="text-xs text-muted-foreground">
                            Reward valuable predictions
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <div className="p-2 rounded-lg bg-green-500/10 shrink-0">
                          <TrendingUp className="h-4 w-4 text-green-500" />
                        </div>
                        <div>
                          <div className="font-semibold text-sm mb-1">
                            Earn 2% Bonus
                          </div>
                          <p className="text-xs text-muted-foreground">
                            Get bonus on quality posts
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <div className="p-2 rounded-lg bg-blue-500/10 shrink-0">
                          <Trophy className="h-4 w-4 text-blue-500" />
                        </div>
                        <div>
                          <div className="font-semibold text-sm mb-1">
                            Build Community
                          </div>
                          <p className="text-xs text-muted-foreground">
                            Help best content rise
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </div>
            </div>

            {/* RIGHT CONTENT - SCROLLABLE */}
            <div className="lg:col-span-8 xl:col-span-9">
              {/* Loading State */}
              {isLoading && posts.length === 0 && (
                <div className="flex items-center justify-center py-20">
                  <div className="text-center">
                    <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto mb-4" />
                    <p className="text-muted-foreground">
                      Loading predictions...
                    </p>
                  </div>
                </div>
              )}

              {/* Error State */}
              {error && (
                <Card className="glass-card border-destructive/50 bg-destructive/5 mb-6">
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-3">
                      <AlertCircle className="h-5 w-5 text-destructive" />
                      <div>
                        <h3 className="font-semibold text-destructive mb-1">
                          Failed to load posts
                        </h3>
                        <p className="text-sm text-muted-foreground">{error}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Posts Feed */}
              <Tabs value={activeTab} className="mt-0">
                <div className="space-y-6">
                  {posts.map((post, idx) => {
                    const SentimentIcon = getSentimentIcon(post.sentiment);

                    return (
                      <motion.div
                        key={post.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.05 }}
                      >
                        <Card className="glass-card border-border hover:border-primary/50 transition-all">
                          <CardHeader className="pb-3">
                            {/* Creator Info */}
                            <div className="flex items-start justify-between gap-4">
                              <div className="flex items-center gap-3">
                                <Avatar className="h-12 w-12 border-2 border-primary/30">
                                  <AvatarImage src={post.creator.avatar} />
                                  <AvatarFallback>
                                    {post.creator.displayName[0]?.toUpperCase()}
                                  </AvatarFallback>
                                </Avatar>
                                <div>
                                  <div className="flex items-center gap-2">
                                    <span className="font-semibold">
                                      {post.creator.displayName}
                                    </span>
                                    {post.creator.verified && (
                                      <CheckCircle2 className="h-4 w-4 text-blue-500" />
                                    )}
                                    {post.isHighQuality && (
                                      <Badge className="bg-amber-500/10 text-amber-500 border-amber-500/30 text-xs">
                                        <Sparkles className="h-3 w-3 mr-1" />
                                        Quality
                                      </Badge>
                                    )}
                                  </div>
                                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                    <span>@{post.creator.username}</span>
                                    <span>•</span>
                                    <span>
                                      {post.creator.predictionAccuracy.toFixed(
                                        1
                                      )}
                                      % accuracy
                                    </span>
                                    <span>•</span>
                                    <span>{formatTimeAgo(post.createdAt)}</span>
                                  </div>
                                </div>
                              </div>

                              {/* Sentiment Badge */}
                              <Badge
                                className={getSentimentColor(post.sentiment)}
                              >
                                <SentimentIcon className="h-3 w-3 mr-1" />
                                {post.sentiment}
                              </Badge>
                            </div>
                          </CardHeader>

                          <CardContent className="space-y-4">
                            {/* Prediction Topic */}
                            <div className="glass-card p-3 rounded-lg border border-border bg-primary/5">
                              <div className="flex items-center gap-2 mb-1">
                                <Target className="h-4 w-4 text-primary" />
                                <span className="font-semibold text-sm">
                                  {post.prediction.topic}
                                </span>
                              </div>
                              <div className="flex items-center gap-4 text-xs text-muted-foreground">
                                <span>
                                  Direction:{" "}
                                  <strong
                                    className={
                                      post.prediction.direction === "long"
                                        ? "text-green-500"
                                        : "text-red-500"
                                    }
                                  >
                                    {post.prediction.direction.toUpperCase()}
                                  </strong>
                                </span>
                                <span>
                                  Confidence:{" "}
                                  <strong>{post.prediction.confidence}%</strong>
                                </span>
                                <span>
                                  Timeframe:{" "}
                                  <strong>{post.prediction.timeframe}</strong>
                                </span>
                              </div>
                            </div>

                            {/* Content */}
                            <p className="text-sm leading-relaxed">
                              {post.content}
                            </p>

                            {/* Reasoning */}
                            <div className="text-sm text-muted-foreground italic border-l-2 border-primary/30 pl-3">
                              {post.prediction.reasoning}
                            </div>

                            {/* Tags */}
                            <div className="flex flex-wrap gap-2">
                              <Badge variant="outline" className="text-xs">
                                {post.category}
                              </Badge>
                              {post.tags.map((tag) => (
                                <Badge
                                  key={tag}
                                  variant="outline"
                                  className="text-xs"
                                >
                                  #{tag}
                                </Badge>
                              ))}
                            </div>

                            {/* Engagement Stats & Actions */}
                            <div className="flex items-center justify-between pt-3 border-t border-border">
                              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                <div className="flex items-center gap-1">
                                  <Gift className="h-4 w-4" />
                                  <span className="font-semibold text-primary">
                                    {post.tips.total.toLocaleString()} SFI
                                  </span>
                                  <span className="text-xs">
                                    ({post.tips.count})
                                  </span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <ThumbsUp className="h-4 w-4" />
                                  {post.likes}
                                </div>
                                <div className="flex items-center gap-1">
                                  <Eye className="h-4 w-4" />
                                  {post.views.toLocaleString()}
                                </div>
                              </div>

                              {/* Tip Button */}
                              <Button
                                onClick={() => setSelectedPost(post)}
                                size="sm"
                                className="bg-primary hover:bg-primary/90 hover-neon-glow"
                              >
                                <Gift className="mr-2 h-4 w-4" />
                                Tip Post
                                {post.isHighQuality && (
                                  <Badge className="ml-2 bg-green-500/20 text-green-500 border-green-500/30 text-[10px] px-1.5">
                                    +2%
                                  </Badge>
                                )}
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    );
                  })}
                </div>
              </Tabs>
            </div>
          </div>
        </div>
      </main>

      {/* Tip Modal */}
      <TipPostModal
        open={!!selectedPost}
        onOpenChange={(open: boolean) => !open && setSelectedPost(null)}
        post={selectedPost}
        onTipSuccess={() => fetchPosts()}
      />

      <Footer />
    </div>
  );
};

export default CreatorTips;
