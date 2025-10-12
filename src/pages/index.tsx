import { useState, useEffect } from "react";
import { SiteHeader } from "@/components/SiteHeader";
import { Footer } from "@/components/Footer";
import { PredictionCard } from "@/components/PredictionCard";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useLenis } from "@/hooks/useLenis";
import {
  Zap,
  Trophy,
  Shield,
  TrendingUp,
  Database,
  BarChart3,
  Globe,
  Lock,
  Rocket,
  Users,
  ArrowUpRight,
  ArrowDownRight,
  Activity,
  DollarSign,
} from "lucide-react";

const Index = () => {
  useLenis();
  const liveMarketData = [
    { name: "BTC/USD", price: 67234, change: 5.2, volume: "2.4B" },
    { name: "ETH/USD", price: 3456, change: -2.1, volume: "1.8B" },
    { name: "SOL/USD", price: 142, change: 8.7, volume: "892M" },
    { name: "MATIC/USD", price: 0.89, change: 3.4, volume: "456M" },
  ];
  const [activeMarkets, setActiveMarkets] = useState(0);
  const [activeBets, setActiveBets] = useState(0);
  const [chartData, setChartData] = useState(
    liveMarketData.map((m) => ({
      ...m,
      bars: Array.from({ length: 20 }, () => Math.random() * 100),
    }))
  );

  useEffect(() => {
    const marketInterval = setInterval(() => {
      setActiveMarkets((prev) => (prev >= 247 ? 247 : prev + 1));
    }, 20);

    const betInterval = setInterval(() => {
      setActiveBets((prev) => (prev >= 1893 ? 1893 : prev + 1));
    }, 10);

    // Update chart bars slowly
    const chartInterval = setInterval(() => {
      setChartData((prev) =>
        prev.map((market) => ({
          ...market,
          bars: [...market.bars.slice(1), Math.random() * 100],
        }))
      );
    }, 2000); // Update every 2 seconds

    return () => {
      clearInterval(marketInterval);
      clearInterval(betInterval);
      clearInterval(chartInterval);
    };
  }, []);

  const mockTrends = [
    {
      tag: "#BitcoinHype",
      score: 82,
      change: 6,
      chain: "Solana",
      volume: "$2.4M",
    },
    {
      tag: "#ETHMerge",
      score: 76,
      change: -3,
      chain: "Ethereum",
      volume: "$1.8M",
    },
    {
      tag: "#AIBoom",
      score: 91,
      change: 12,
      chain: "Polygon",
      volume: "$3.2M",
    },
  ];

  const marqueeItems = [
    { label: "Active Markets", value: "247", icon: Activity },
    { label: "Live Bets", value: "1,893", icon: TrendingUp },
    { label: "Total Volume", value: "$12.4M", icon: DollarSign },
    { label: "Win Rate", value: "76.3%", icon: Trophy },
    { label: "Active Users", value: "8,234", icon: Users },
    { label: "Chains", value: "4", icon: Globe },
  ];

  const retailFeatures = [
    {
      icon: Zap,
      title: "Micro-Predictions",
      description:
        "24h low-stake bets with fast resolution and instant rewards",
    },
    {
      icon: Trophy,
      title: "Leaderboards & Badges",
      description: "Compete globally, earn NFT badges, unlock exclusive perks",
    },
    {
      icon: Shield,
      title: "NFT Utilities",
      description:
        "Mint to unlock premium features, reduced fees, and voting power",
    },
  ];

  const b2bFeatures = [
    {
      icon: Database,
      title: "Sentiment API",
      description: "Real-time multi-chain sentiment data with 99.9% uptime SLA",
    },
    {
      icon: BarChart3,
      title: "Analytics Dashboard",
      description: "Enterprise-grade insights, custom alerts, CSV/JSON exports",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SiteHeader />

      <main className="flex-1">
        {/* Hero Section - Split Layout */}
        <section className="relative container mx-auto px-4 py-5">
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
            {/* Left: Text Content */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
                <Activity className="h-4 w-4 text-primary animate-pulse" />
                <span className="text-sm font-medium text-primary">
                  Live Prediction Markets
                </span>
              </div>

              <h1 className="text-5xl md:text-6xl lg:text-7xl font-orbitron font-bold leading-tight">
                Predict Hype.
                <br />
                <span className="text-glow-red">Win Big.</span>
              </h1>

              <p className="text-lg md:text-xl text-muted-foreground max-w-xl">
                Decentralized InfoFi platform for multi-chain sentiment
                prediction. Trade on market trends and earn rewards.
              </p>

              <div className="flex flex-wrap gap-4">
                <Button
                  asChild
                  size="lg"
                  className="bg-primary hover:bg-primary/90 hover-neon-glow"
                >
                  <Link to="/markets">
                    Explore Markets
                    <ArrowUpRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="border-primary/50 hover:border-primary hover-neon-glow"
                >
                  <Link to="/mint">Mint NFT</Link>
                </Button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 pt-4">
                <div className="glass-card p-4 rounded-lg border border-border">
                  <div className="text-2xl font-bold font-mono text-primary">
                    {activeMarkets}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Active Markets
                  </div>
                </div>
                <div className="glass-card p-4 rounded-lg border border-border">
                  <div className="text-2xl font-bold font-mono text-secondary">
                    {activeBets.toLocaleString()}
                  </div>
                  <div className="text-sm text-muted-foreground">Live Bets</div>
                </div>
                <div className="glass-card p-4 rounded-lg border border-border">
                  <div className="text-2xl font-bold font-mono text-green-500">
                    $12.4M
                  </div>
                  <div className="text-sm text-muted-foreground">Volume</div>
                </div>
              </div>
            </motion.div>

            {/* Right: Live Market Component */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="glass-card rounded-2xl p-6 border border-primary/20 backdrop-blur-xl">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-orbitron font-semibold text-lg">
                    Live Markets
                  </h3>
                  <Badge
                    variant="outline"
                    className="border-green-500/50 text-green-500"
                  >
                    <Activity className="h-3 w-3 mr-1 animate-pulse" />
                    Live
                  </Badge>
                </div>

                <div className="space-y-4">
                  {chartData.map((market, idx) => (
                    <motion.div
                      key={market.name}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.3 + idx * 0.1 }}
                      className="glass-card p-4 rounded-xl border border-border hover:border-primary/50 transition-all cursor-pointer hover-neon-glow"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                            <TrendingUp className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <div className="font-semibold font-mono">
                              {market.name}
                            </div>
                            <div className="text-xs text-muted-foreground">
                              Vol: {market.volume}
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-bold font-mono text-lg">
                            ${market.price.toLocaleString()}
                          </div>
                          <div
                            className={`flex items-center gap-1 text-sm font-semibold ${
                              market.change > 0
                                ? "text-green-500"
                                : "text-red-500"
                            }`}
                          >
                            {market.change > 0 ? (
                              <ArrowUpRight className="h-4 w-4" />
                            ) : (
                              <ArrowDownRight className="h-4 w-4" />
                            )}
                            {Math.abs(market.change)}%
                          </div>
                        </div>
                      </div>

                      {/* Mini chart simulation */}
                      <div className="flex items-end gap-1 h-12 mt-3">
                        {market.bars.map((height, i) => (
                          <motion.div
                            key={i}
                            className={`flex-1 rounded-t ${
                              market.change > 0
                                ? "bg-green-500/30"
                                : "bg-red-500/30"
                            }`}
                            initial={{ height: 0 }}
                            animate={{ height: `${height}%` }}
                            transition={{ duration: 0.5 }}
                          />
                        ))}
                      </div>
                    </motion.div>
                  ))}
                </div>

                <Button
                  asChild
                  variant="ghost"
                  className="w-full mt-4 border border-primary/20 hover:border-primary/50"
                >
                  <Link to="/markets">
                    View All Markets
                    <ArrowUpRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>

              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 1 }}
                className="absolute -bottom-4 -left-4 glass-card px-4 py-2 rounded-full border border-primary/50 backdrop-blur-xl"
              >
                <div className="flex items-center gap-2">
                  <Trophy className="h-4 w-4 text-primary" />
                  <span className="text-sm font-semibold">Top 10 Platform</span>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Marquee Section */}
        <section className="py-6 border-y border-border bg-background/50 backdrop-blur-sm overflow-hidden">
          <div className="relative">
            <motion.div
              animate={{ x: [0, -1920] }}
              transition={{
                duration: 30,
                repeat: Infinity,
                ease: "linear",
              }}
              className="flex gap-8 whitespace-nowrap"
            >
              {[...marqueeItems, ...marqueeItems, ...marqueeItems].map(
                (item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-3 px-6 py-2 glass-card rounded-full border border-border"
                  >
                    <item.icon className="h-4 w-4 text-primary" />
                    <span className="text-sm font-medium text-muted-foreground">
                      {item.label}:
                    </span>
                    <span className="text-sm font-bold font-mono">
                      {item.value}
                    </span>
                  </div>
                )
              )}
            </motion.div>
          </div>
        </section>

        {/* Live Trends */}
        <section className="container mx-auto px-4 py-16">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-3xl md:text-4xl font-orbitron font-bold mb-2">
                  Trending Now
                </h2>
                <p className="text-muted-foreground">
                  Hot prediction markets across all chains
                </p>
              </div>
              <Button asChild variant="outline" className="border-primary/50">
                <Link to="/dashboard">
                  View All
                  <ArrowUpRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {mockTrends.map((trend, idx) => (
                <motion.div
                  key={trend.tag}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: idx * 0.1 }}
                  viewport={{ once: true }}
                >
                  <PredictionCard {...trend} />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* Retail Features */}
        <section className="container mx-auto px-4 py-16 bg-gradient-to-b from-transparent to-primary/5">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-orbitron font-bold mb-4">
                For Traders & Enthusiasts
              </h2>
              <p className="text-muted-foreground text-lg">
                Everything you need to start predicting and winning
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {retailFeatures.map((feature, idx) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  viewport={{ once: true }}
                  className="glass-card rounded-xl p-6 border border-border hover:border-primary/50 transition-all hover-neon-glow"
                >
                  <feature.icon className="h-10 w-10 text-primary mb-4" />
                  <h3 className="font-orbitron text-xl font-semibold mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* How It Works */}
        <section className="container mx-auto px-4 py-16">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-orbitron font-bold text-center mb-12">
              How It Works
            </h2>
            <div className="grid md:grid-cols-4 gap-6 max-w-5xl mx-auto">
              {[
                {
                  icon: Users,
                  title: "1. Connect",
                  description: "Link your wallet and join the community",
                },
                {
                  icon: TrendingUp,
                  title: "2. Predict",
                  description: "Bet on market sentiment and trends",
                },
                {
                  icon: Trophy,
                  title: "3. Earn",
                  description: "Win rewards and climb the leaderboard",
                },
                {
                  icon: Rocket,
                  title: "4. Level Up",
                  description: "Mint NFTs and unlock premium features",
                },
              ].map((step, idx) => (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  viewport={{ once: true }}
                  className="text-center"
                >
                  <div className="glass-card rounded-full w-20 h-20 mx-auto mb-4 flex items-center justify-center border border-primary/30">
                    <step.icon className="h-10 w-10 text-primary" />
                  </div>
                  <h3 className="font-orbitron font-semibold mb-2">
                    {step.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {step.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* Why Choose Us */}
        <section className="container mx-auto px-4 py-16 bg-gradient-to-b from-transparent to-secondary/5">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-orbitron font-bold text-center mb-12">
              Why Choose Us
            </h2>
            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {[
                {
                  icon: Globe,
                  title: "Multi-Chain Support",
                  description:
                    "Trade across Solana, Ethereum, Polygon, and Base with seamless cross-chain integration",
                },
                {
                  icon: Lock,
                  title: "Secure & Transparent",
                  description:
                    "Smart contract-based resolution with on-chain verification and automated payouts",
                },
                {
                  icon: Zap,
                  title: "Lightning Fast",
                  description:
                    "Real-time sentiment analysis with instant bet placement and sub-second confirmations",
                },
              ].map((feature, idx) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  viewport={{ once: true }}
                  className="glass-card rounded-xl p-8 border border-border hover:border-secondary/50 transition-all text-center"
                >
                  <feature.icon className="h-12 w-12 text-secondary mx-auto mb-4" />
                  <h3 className="font-orbitron text-xl font-semibold mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* B2B Section */}
        <section className="container mx-auto px-4 py-16">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-orbitron font-bold mb-4">
                For Businesses & Developers
              </h2>
              <p className="text-muted-foreground text-lg">
                Enterprise-grade sentiment data and analytics
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {b2bFeatures.map((feature, idx) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, x: idx % 2 === 0 ? -20 : 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  viewport={{ once: true }}
                  className="glass-card rounded-xl p-8 border border-border hover:border-secondary/50 transition-all hover:shadow-[0_0_20px_rgba(79,70,229,0.3)]"
                >
                  <feature.icon className="h-12 w-12 text-secondary mb-4" />
                  <h3 className="font-orbitron text-2xl font-semibold mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    {feature.description}
                  </p>
                  <Button
                    asChild
                    variant="outline"
                    className="border-secondary/50 hover:border-secondary"
                  >
                    <Link to="/api-keys">
                      Learn More
                      <ArrowUpRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* CTA Section */}
        <section className="container mx-auto px-4 py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="glass-card rounded-2xl p-12 border border-primary/30 text-center max-w-3xl mx-auto bg-gradient-to-br from-primary/5 to-secondary/5"
          >
            <h2 className="text-3xl md:text-4xl font-orbitron font-bold mb-4">
              Ready to Start Predicting?
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Join thousands of traders making informed predictions
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button
                asChild
                size="lg"
                className="bg-primary hover:bg-primary/90 hover-neon-glow"
              >
                <Link to="/markets">
                  Explore Markets
                  <ArrowUpRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-primary/50 hover:border-primary hover-neon-glow"
              >
                <Link to="/mint">Mint NFT</Link>
              </Button>
            </div>
          </motion.div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
