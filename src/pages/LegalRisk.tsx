import { SiteHeader } from "@/components/SiteHeader";
import { Footer } from "@/components/Footer";
import { motion } from "framer-motion";
import { AlertTriangle } from "lucide-react";

const LegalRisk = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />

      <main className="flex-1 container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-3xl mx-auto"
        >
          <div className="flex items-center gap-3 mb-8">
            <AlertTriangle className="h-10 w-10 text-destructive" />
            <h1 className="text-4xl md:text-5xl font-orbitron font-bold">
              Risk Disclosure
            </h1>
          </div>

          <div className="glass-card rounded-xl p-8 border border-destructive/50 space-y-6 text-muted-foreground">
            <section>
              <h2 className="text-xl font-orbitron font-semibold text-foreground mb-3">
                High Risk Warning
              </h2>
              <p>
                Trading and prediction markets involve substantial risk of loss
                and are not suitable for all individuals. You should carefully
                consider whether trading or prediction activities are
                appropriate for you in light of your experience, objectives,
                financial resources, and other relevant circumstances.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-orbitron font-semibold text-foreground mb-3">
                Volatility Risk
              </h2>
              <p>
                Cryptocurrency and sentiment-based predictions are highly
                volatile. Prices and sentiment scores can fluctuate dramatically
                in short periods, potentially resulting in significant losses.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-orbitron font-semibold text-foreground mb-3">
                No Guarantees
              </h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>Past performance is not indicative of future results</li>
                <li>Sentiment scores do not guarantee price movements</li>
                <li>
                  Platform predictions are probabilistic, not deterministic
                </li>
                <li>You may lose all funds committed to predictions</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-orbitron font-semibold text-foreground mb-3">
                Technical Risks
              </h2>
              <p>
                Blockchain and smart contract technology carry inherent risks
                including but not limited to network congestion, smart contract
                vulnerabilities, and wallet security breaches. Always secure
                your private keys and use hardware wallets when possible.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-orbitron font-semibold text-foreground mb-3">
                Regulatory Uncertainty
              </h2>
              <p>
                The regulatory status of cryptocurrencies and prediction markets
                varies by jurisdiction and is subject to change. You are solely
                responsible for ensuring compliance with applicable laws in your
                location.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-orbitron font-semibold text-foreground mb-3">
                Acknowledgment
              </h2>
              <p className="text-foreground font-medium">
                By using Mood Swing, you acknowledge that you have read,
                understood, and accepted all risks disclosed herein, and that
                you are solely responsible for any trading or prediction
                decisions you make.
              </p>
            </section>

            <div className="text-sm pt-6 border-t border-border">
              Last updated: January 15, 2025
            </div>
          </div>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
};

export default LegalRisk;
