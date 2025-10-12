import { SiteHeader } from "@/components/SiteHeader";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { motion } from "framer-motion";
import { Database, BarChart3, Zap, Shield, Clock, Globe } from "lucide-react";

const APIKeys = () => {
  const features = [
    {
      icon: Database,
      title: "Real-time Sentiment API",
      description:
        "Access multi-chain sentiment data with millisecond latency, 99.9% uptime SLA, and comprehensive historical archives.",
    },
    {
      icon: BarChart3,
      title: "Enterprise Analytics Dashboard",
      description:
        "Custom alerts, CSV/JSON exports, white-label branding, and advanced correlation insights across 20+ blockchains.",
    },
  ];

  const benefits = [
    { icon: Zap, title: "Lightning Fast", desc: "<10ms response time" },
    {
      icon: Shield,
      title: "Enterprise Grade",
      desc: "SOC 2 Type II certified",
    },
    { icon: Clock, title: "24/7 Support", desc: "Dedicated account manager" },
    { icon: Globe, title: "Global Coverage", desc: "20+ chains, 500+ tokens" },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />

      <main className="flex-1">
        {/* Hero */}
        <section className="container mx-auto px-4 py-20 md:py-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto text-center mb-16"
          >
            <h1 className="text-5xl md:text-7xl font-orbitron font-bold mb-6 text-glow-red">
              API Keys
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8">
              Manage your API keys and access enterprise features
            </p>
          </motion.div>
        </section>

        {/* Features */}
        <section className="container mx-auto px-4 py-16">
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {features.map((feature, idx) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.2 }}
                viewport={{ once: true }}
                className="glass-card rounded-xl p-8 border border-border hover:border-secondary/50 transition-all hover:shadow-[0_0_30px_rgba(79,70,229,0.3)]"
              >
                <feature.icon className="h-14 w-14 text-secondary mb-6" />
                <h3 className="font-orbitron text-2xl font-semibold mb-4">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Benefits */}
        <section className="container mx-auto px-4 py-16">
          <h2 className="text-3xl md:text-4xl font-orbitron font-bold text-center mb-12">
            Why Choose Mood Swing
          </h2>
          <div className="grid md:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {benefits.map((benefit, idx) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="glass-card rounded-xl p-6 border border-border text-center hover:border-primary/50 transition-all"
              >
                <benefit.icon className="h-10 w-10 text-primary mx-auto mb-3" />
                <h4 className="font-orbitron font-semibold mb-2">
                  {benefit.title}
                </h4>
                <p className="text-sm text-muted-foreground">{benefit.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Request Access */}
        <section className="container mx-auto px-4 py-16">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="max-w-xl mx-auto glass-card rounded-xl p-8 border border-secondary/50"
          >
            <h2 className="text-3xl font-orbitron font-bold mb-6 text-center">
              Get Started Today
            </h2>
            <form className="space-y-4">
              <div>
                <Label htmlFor="company">Company Name</Label>
                <Input
                  id="company"
                  placeholder="Acme Corp"
                  className="bg-background/50 border-border"
                />
              </div>
              <div>
                <Label htmlFor="email">Work Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@company.com"
                  className="bg-background/50 border-border"
                />
              </div>
              <div>
                <Label htmlFor="use-case">Use Case</Label>
                <Input
                  id="use-case"
                  placeholder="Trading platform, analytics, etc."
                  className="bg-background/50 border-border"
                />
              </div>
              <Button
                type="submit"
                className="w-full bg-secondary hover:bg-secondary/90 neon-glow-indigo"
              >
                Request API Access
              </Button>
            </form>
          </motion.div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default APIKeys;
