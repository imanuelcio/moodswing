import { SiteHeader } from "@/components/SiteHeader";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useLenis } from "@/hooks/useLenis";
import {
  Zap,
  Trophy,
  Database,
  BarChart3,
  Lock,
  Rocket,
  ArrowUpRight,
  Activity,
  Sparkles,
  Heart,
  MessageCircle,
  Target,
  Star,
  Brain,
  Coins,
  Vote,
} from "lucide-react";

const Index = () => {
  useLenis();

  // Feature highlights for the hero section
  const uspHighlights = [
    {
      icon: Star,
      label: "Points System",
      description: "Monthly allocation",
    },
    {
      icon: Trophy,
      label: "NFT Utilities",
      description: "Exclusive perks",
    },
    {
      icon: Heart,
      label: "Creator Tips",
      description: "Support & earn",
    },
  ];

  const moodFeatures = [
    {
      icon: Star,
      title: "Points-Based Predictions",
      description:
        "Receive monthly points to predict sentiment trends. Top performers earn bigger SFI airdrops based on accuracy.",
      color: "text-yellow-500",
    },
    {
      icon: Heart,
      title: "Support Creators",
      description:
        "Tip KOLs and content creators with SFI tokens. Earn bonus rewards on high-value predictions and quality content.",
      color: "text-pink-500",
    },
    {
      icon: Sparkles,
      title: "NFT Power-Ups",
      description:
        "Sentimentals NFTs unlock governance rights, premium analytics, revenue share, and exclusive platform features.",
      color: "text-purple-500",
    },
  ];

  const coreFeatures = [
    {
      icon: Brain,
      title: "AI Sentiment Engine",
      description:
        "BERT-powered NLP analyzes real-time sentiment from X/Twitter, scoring hype and FUD from 0-100 with precision.",
    },
    {
      icon: Coins,
      title: "Token Economy",
      description:
        "SFI token powers predictions, staking rewards, governance, and creator tips with deflationary burn mechanics.",
    },
    {
      icon: Vote,
      title: "Community Governance",
      description:
        "NFT holders get enhanced voting power to shape platform decisions, features, and revenue allocation.",
    },
  ];

  const b2bFeatures = [
    {
      icon: Database,
      title: "Sentiment API",
      description:
        "Enterprise-grade real-time sentiment data with multi-chain support and institutional-level reliability.",
    },
    {
      icon: BarChart3,
      title: "Analytics Dashboard",
      description:
        "Advanced insights into market trends, viral predictions, and sentiment cycles with premium NFT access.",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SiteHeader />

      <main className="flex-1">
        {/* Hero Section - Split Layout */}
        <section className="relative container mx-auto px-4 py-12 md:py-20">
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
                  AI-Powered Sentiment Predictions
                </span>
              </div>

              <h1 className="text-5xl md:text-6xl lg:text-7xl font-orbitron font-bold leading-tight">
                Predict Moodz.
                <br />
                <span className="text-glow-red">Earn Rewards.</span>
              </h1>

              <p className="text-lg md:text-xl text-muted-foreground max-w-xl">
                Decentralized InfoFi platform on Solana. Predict sentiment
                trends, support creators, and earn from social media hype with
                AI-powered insights.
              </p>

              <div className="flex flex-wrap gap-4">
                <Button
                  asChild
                  size="lg"
                  className="bg-primary hover:bg-primary/90 hover-neon-glow"
                >
                  <Link to="/markets">
                    Coming Soon
                    <Rocket className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="border-primary/50 hover:border-primary hover-neon-glow"
                >
                  <Link to="/mint">
                    <Sparkles className="mr-2 h-5 w-5" />
                    Join Waitlist
                  </Link>
                </Button>
              </div>

              {/* USP Highlights - No fake numbers */}
              <div className="grid grid-cols-3 gap-4 pt-4">
                {uspHighlights.map((highlight, idx) => (
                  <motion.div
                    key={highlight.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 + idx * 0.1 }}
                    className="glass-card p-4 rounded-lg border border-border hover:border-primary/30 transition-all"
                  >
                    <highlight.icon className="h-6 w-6 text-primary mb-2" />
                    <div className="text-sm font-semibold">
                      {highlight.label}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {highlight.description}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Right: Feature Showcase */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="glass-card rounded-2xl p-8 border border-primary/20 backdrop-blur-xl">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-orbitron font-semibold text-xl">
                    Platform Features
                  </h3>
                  <Badge
                    variant="outline"
                    className="border-primary/50 text-primary"
                  >
                    <Sparkles className="h-3 w-3 mr-1" />
                    Coming Soon
                  </Badge>
                </div>

                <div className="space-y-6">
                  {/* AI Predictions */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="glass-card p-6 rounded-xl border border-border"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary/20 to-purple-500/20 flex items-center justify-center shrink-0">
                        <Brain className="h-6 w-6 text-primary" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-lg mb-2 font-orbitron">
                          AI Sentiment Analysis
                        </h4>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          Real-time BERT-powered sentiment scoring from social
                          media. Predict hype cycles before they peak.
                        </p>
                      </div>
                    </div>
                  </motion.div>

                  {/* Points System */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                    className="glass-card p-6 rounded-xl border border-border"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-yellow-500/20 to-orange-500/20 flex items-center justify-center shrink-0">
                        <Star className="h-6 w-6 text-yellow-500" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-lg mb-2 font-orbitron">
                          Monthly Points Allocation
                        </h4>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          Test your prediction skills with monthly points. Top
                          performers earn larger SFI airdrops.
                        </p>
                      </div>
                    </div>
                  </motion.div>

                  {/* NFT Utilities */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                    className="glass-card p-6 rounded-xl border border-border"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center shrink-0">
                        <Sparkles className="h-6 w-6 text-purple-500" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-lg mb-2 font-orbitron">
                          Moodz NFT
                        </h4>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          Exclusive collection unlocking governance, revenue
                          share, and premium platform features.
                        </p>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Play with Moodz Section */}
        <section className="container mx-auto px-4 py-16 bg-gradient-to-b from-transparent to-primary/5">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-orbitron font-bold mb-4">
                Play with Moodz
              </h2>
              <p className="text-muted-foreground text-lg">
                Predict sentiment, support creators, earn rewards
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {moodFeatures.map((feature, idx) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  viewport={{ once: true }}
                  className="glass-card rounded-xl p-6 border border-border hover:border-primary/50 transition-all hover-neon-glow"
                >
                  <feature.icon className={`h-10 w-10 ${feature.color} mb-4`} />
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
                  icon: Sparkles,
                  title: "1. Mint NFT",
                  description:
                    "Get Sentimentals NFT for governance rights and exclusive perks",
                },
                {
                  icon: Star,
                  title: "2. Get Points",
                  description:
                    "Receive monthly points allocation to test your prediction skills",
                },
                {
                  icon: Target,
                  title: "3. Predict",
                  description:
                    "Use points on hype/FUD sentiment predictions. Accuracy matters!",
                },
                {
                  icon: Trophy,
                  title: "4. Earn SFI",
                  description:
                    "Top performers get bigger airdrops plus revenue share",
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

        {/* Core Technology */}
        <section className="container mx-auto px-4 py-16 bg-gradient-to-b from-transparent to-secondary/5">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-orbitron font-bold text-center mb-12">
              Core Technology
            </h2>
            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {coreFeatures.map((feature, idx) => (
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

        {/* Platform Advantages */}
        <section className="container mx-auto px-4 py-16">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-orbitron font-bold text-center mb-12">
              Platform Advantages
            </h2>
            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {[
                {
                  icon: Zap,
                  title: "Solana Speed",
                  description:
                    "Built on Solana for lightning-fast predictions with minimal fees and instant settlements",
                },
                {
                  icon: Lock,
                  title: "Transparent & Secure",
                  description:
                    "Rust-based smart contracts with external audits and on-chain verification",
                },
                {
                  icon: MessageCircle,
                  title: "Creator Economy",
                  description:
                    "Integrated tipping system to support quality content creators while you predict",
                },
              ].map((feature, idx) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  viewport={{ once: true }}
                  className="glass-card rounded-xl p-8 border border-border hover:border-primary/50 transition-all text-center"
                >
                  <feature.icon className="h-12 w-12 text-primary mx-auto mb-4" />
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
        <section className="container mx-auto px-4 py-16 bg-gradient-to-b from-transparent to-primary/5">
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
                Enterprise-grade sentiment data powered by AI
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
              Ready to Predict Moodz?
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Be part of the first points-based sentiment prediction platform on
              Solana
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button
                asChild
                size="lg"
                className="bg-primary hover:bg-primary/90 hover-neon-glow"
              >
                <Link to="/markets">
                  <Rocket className="mr-2 h-5 w-5" />
                  Join Waitlist
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-primary/50 hover:border-primary"
              >
                <Link to="/mint">
                  <Sparkles className="mr-2 h-5 w-5" />
                  Learn About NFTs
                </Link>
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
