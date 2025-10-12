import { useState } from "react";
import { SiteHeader } from "@/components/SiteHeader";
import { Footer } from "@/components/Footer";
import { MarketCard } from "@/components/MarketCard";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { motion } from "framer-motion";
import {
  Search,
  Clock,
  Users,
  TrendingUp,
  Activity,
  DollarSign,
  Target,
  Filter,
  BarChart3,
  ArrowUpRight,
  ArrowDownRight,
  Zap,
  Globe,
  Trophy,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export const Markets = () => {
  const [statusFilter, setStatusFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("volume");

  const markets = [
    {
      id: "1",
      title: "Will Bitcoin reach $100k by end of 2025?",
      category: "Crypto",
      closeAt: "2025-12-31T23:59:59Z",
      status: "OPEN" as const,
      volume: 2847562.4,
      participants: 1893,
      sentiment_score: 82,
      outcomes: [
        { key: "yes", name: "Yes", price: 0.65, change: 2.3 },
        { key: "no", name: "No", price: 0.35, change: -2.3 },
      ],
    },
    {
      id: "2",
      title: "Will Ethereum surpass $5,000 by Q2 2025?",
      category: "Crypto",
      closeAt: "2025-06-30T23:59:59Z",
      status: "OPEN" as const,
      volume: 1678943.2,
      participants: 1234,
      sentiment_score: 76,
      outcomes: [
        { key: "yes", name: "Yes", price: 0.58, change: 1.8 },
        { key: "no", name: "No", price: 0.42, change: -1.8 },
      ],
    },
    {
      id: "3",
      title: "Solana network uptime > 99% this month?",
      category: "Crypto",
      closeAt: "2025-01-31T23:59:59Z",
      status: "OPEN" as const,
      volume: 892456.7,
      participants: 567,
      sentiment_score: 68,
      outcomes: [
        { key: "yes", name: "Yes", price: 0.72, change: -0.5 },
        { key: "no", name: "No", price: 0.28, change: 0.5 },
      ],
    },
    {
      id: "4",
      title: "Next US Presidential Election Winner",
      category: "Politics",
      closeAt: "2024-11-05T23:59:59Z",
      status: "OPEN" as const,
      volume: 5234789.3,
      participants: 3456,
      sentiment_score: 52,
      outcomes: [
        { key: "dem", name: "Democrat", price: 0.52, change: 0.3 },
        { key: "rep", name: "Republican", price: 0.48, change: -0.3 },
      ],
    },
  ];

  const stats = [
    {
      label: "Total Volume",
      value: "$12.4M",
      icon: DollarSign,
      change: "+15.3%",
      trend: "up",
    },
    {
      label: "Active Markets",
      value: "247",
      icon: Activity,
      change: "+8",
      trend: "up",
    },
    {
      label: "Total Traders",
      value: "8,234",
      icon: Users,
      change: "+234",
      trend: "up",
    },
    {
      label: "Win Rate Avg",
      value: "76.3%",
      icon: Target,
      change: "+2.1%",
      trend: "up",
    },
  ];

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
                  Prediction Markets
                </h1>
                <p className="text-muted-foreground text-lg">
                  Trade on real-world events across crypto, politics, and
                  culture
                </p>
              </div>
              <Button className="bg-primary hover:bg-primary/90">
                <Zap className="mr-2 h-4 w-4" />
                Create Market
              </Button>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              {stats.map((stat, idx) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="glass-card p-4 rounded-xl border border-border"
                >
                  <div className="flex items-center justify-between mb-2">
                    <stat.icon className="h-5 w-5 text-primary" />
                    <Badge
                      variant="outline"
                      className={`text-xs ${
                        stat.trend === "up"
                          ? "border-green-500/50 text-green-500"
                          : "border-red-500/50 text-red-500"
                      }`}
                    >
                      {stat.change}
                    </Badge>
                  </div>
                  <div className="text-2xl font-bold font-mono mb-1">
                    {stat.value}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {stat.label}
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
            className="glass-card p-4 rounded-xl border border-border mb-6"
          >
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search markets by title, category, or keyword..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full md:w-[160px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="OPEN">Open</SelectItem>
                  <SelectItem value="CLOSED">Closed</SelectItem>
                  <SelectItem value="RESOLVED">Resolved</SelectItem>
                </SelectContent>
              </Select>
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-full md:w-[160px]">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="crypto">Crypto</SelectItem>
                  <SelectItem value="politics">Politics</SelectItem>
                  <SelectItem value="sports">Sports</SelectItem>
                  <SelectItem value="culture">Culture</SelectItem>
                </SelectContent>
              </Select>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-full md:w-[160px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="volume">Highest Volume</SelectItem>
                  <SelectItem value="participants">Most Popular</SelectItem>
                  <SelectItem value="newest">Newest</SelectItem>
                  <SelectItem value="ending">Ending Soon</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </motion.div>

          {/* Markets Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {markets.map((market, idx) => (
              <motion.div
                key={market.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * idx }}
              >
                <MarketCard {...market} />
              </motion.div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Markets;
