import { ArrowRight, BookOpen, Globe, Terminal, Zap } from "lucide-react";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";

const IntroductionSection = () => (
  <div className="space-y-6">
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-lg bg-primary/10 border border-primary/20">
          <BookOpen className="h-6 w-6 text-primary" />
        </div>
        <Badge variant="outline" className="border-primary/50">
          v1.0.0
        </Badge>
      </div>
      <h1 className="text-4xl md:text-5xl font-orbitron font-bold text-glow-red">
        API Documentation
      </h1>
      <p className="text-xl text-muted-foreground max-w-3xl">
        Integrate real-time prediction market data and sentiment analysis into
        your application. Built for developers, enterprises, and trading
        platforms.
      </p>
      <div className="flex gap-4 pt-4">
        <Button className="bg-primary hover:bg-primary/90">
          Get API Key
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
        <Button variant="outline" className="border-primary/50">
          <Terminal className="mr-2 h-4 w-4" />
          Try in Sandbox
        </Button>
      </div>
    </div>

    <div className="grid md:grid-cols-3 gap-6">
      {[
        {
          icon: Zap,
          title: "Real-time Data",
          description:
            "Sub-second latency with WebSocket support for live market updates",
        },
        {
          icon: Lock,
          title: "Enterprise Security",
          description:
            "OAuth 2.0, API key rotation, and role-based access control",
        },
        {
          icon: Globe,
          title: "Multi-chain Support",
          description:
            "Access markets across Solana, Ethereum, Polygon, and Base",
        },
      ].map((feature, idx) => (
        <div
          key={idx}
          className="glass-card p-6 rounded-xl border border-border hover:border-primary/50 transition-all"
        >
          {/* <feature.icon className="h-8 w-8 text-primary mb-3" /> */}
          <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
          <p className="text-sm text-muted-foreground">{feature.description}</p>
        </div>
      ))}
    </div>
  </div>
);

export default IntroductionSection;
