import { useState } from "react";
import { SiteHeader } from "@/components/SiteHeader";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import IntroductionSection from "@/components/api-docs/IntroductionSection";
import QuickStartSection from "@/components/api-docs/QuickStartSection";
import AuthenticationSection from "@/components/api-docs/AuthenticationSection";
import MarketsEndpoint from "@/components/api-docs/endpoints/MarketsEndpoint";
import MarketDetailsEndpoint from "@/components/api-docs/endpoints/MarketDetailsEndpoint";
import SentimentEndpoint from "@/components/api-docs/endpoints/SentimentEndpoint";
import BetsEndpoint from "@/components/api-docs/endpoints/BetsEndpoint";
import LeaderboardsEndpoint from "@/components/api-docs/endpoints/LeaderboardsEndpoint";
import UserStatsEndpoint from "@/components/api-docs/endpoints/UserStatsEndpoint";
import WebSocketSection from "@/components/api-docs/WebSocketSection";
import WebhooksSection from "@/components/api-docs/WebhooksSection";
import RateLimitsSection from "@/components/api-docs/RateLimitsSection";
import ErrorHandlingSection from "@/components/api-docs/ErrorHandlingSection";
import DocsSidebar from "@/components/DocsSidebar";
import SubscriptionsSection from "@/components/api-docs/SubscriptionsSection";

const Docs = () => {
  const [activeSection, setActiveSection] = useState("introduction");

  const renderSection = () => {
    switch (activeSection) {
      case "introduction":
        return <IntroductionSection />;
      case "quick-start":
        return <QuickStartSection />;
      case "authentication":
        return <AuthenticationSection />;
      case "api-markets":
        return <MarketsEndpoint />;
      case "api-market-details":
        return <MarketDetailsEndpoint />;
      case "api-sentiment":
        return <SentimentEndpoint />;
      case "api-bets":
        return <BetsEndpoint />;
      case "api-leaderboards":
        return <LeaderboardsEndpoint />;
      case "api-user-stats":
        return <UserStatsEndpoint />;
      case "websocket":
        return <WebSocketSection />;
      case "subscriptions":
        return <SubscriptionsSection />;
      case "webhooks":
        return <WebhooksSection />;
      case "rate-limits":
        return <RateLimitsSection />;
      case "error-handling":
        return <ErrorHandlingSection />;
      default:
        return <IntroductionSection />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SiteHeader />
      <div className="flex flex-1">
        <DocsSidebar
          activeSection={activeSection}
          setActiveSection={setActiveSection}
        />
        <main className="flex-1 container mx-auto px-8 py-12 max-w-6xl">
          <motion.div
            key={activeSection}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-12"
          >
            {renderSection()}

            {/* Support CTA */}
            {activeSection === "error-handling" && (
              <section className="glass-card rounded-xl p-8 border border-primary/30 bg-gradient-to-br from-primary/5 to-secondary/5 text-center">
                <h2 className="text-2xl font-orbitron font-bold mb-4">
                  Need Help?
                </h2>
                <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                  Our developer support team is here to help you integrate and
                  scale your application. Join our community or contact us
                  directly.
                </p>
                <div className="flex gap-4 justify-center">
                  <Button variant="outline" className="border-primary/50">
                    Join Discord
                  </Button>
                  <Button className="bg-primary hover:bg-primary/90">
                    Contact Support
                  </Button>
                </div>
              </section>
            )}
          </motion.div>
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default Docs;
