import { SiteHeader } from "@/components/SiteHeader";
import { Footer } from "@/components/Footer";
import { motion } from "framer-motion";

const LegalTerms = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />

      <main className="flex-1 container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-3xl mx-auto"
        >
          <h1 className="text-4xl md:text-5xl font-orbitron font-bold mb-8">
            Terms of Service
          </h1>

          <div className="glass-card rounded-xl p-8 border border-border space-y-6 text-muted-foreground">
            <section>
              <h2 className="text-xl font-orbitron font-semibold text-foreground mb-3">
                Acceptance of Terms
              </h2>
              <p>
                By accessing and using Mood Swing, you accept and agree to be
                bound by these Terms of Service. If you do not agree to these
                terms, please do not use our platform.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-orbitron font-semibold text-foreground mb-3">
                Platform Usage
              </h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>You must be 18 years or older to use this platform</li>
                <li>
                  You are responsible for maintaining the security of your
                  wallet
                </li>
                <li>
                  You agree not to manipulate sentiment scores or engage in
                  fraudulent activity
                </li>
                <li>You understand that predictions involve financial risk</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-orbitron font-semibold text-foreground mb-3">
                Intellectual Property
              </h2>
              <p>
                All content, features, and functionality on Mood Swing are owned
                by us and protected by international copyright, trademark, and
                other intellectual property laws.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-orbitron font-semibold text-foreground mb-3">
                Disclaimer
              </h2>
              <p>
                Mood Swing provides sentiment data and prediction tools for
                informational purposes only. We do not provide financial advice.
                All trading and prediction decisions are made at your own risk.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-orbitron font-semibold text-foreground mb-3">
                Limitation of Liability
              </h2>
              <p>
                To the maximum extent permitted by law, Mood Swing shall not be
                liable for any indirect, incidental, special, consequential, or
                punitive damages resulting from your use of the platform.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-orbitron font-semibold text-foreground mb-3">
                Changes to Terms
              </h2>
              <p>
                We reserve the right to modify these terms at any time.
                Continued use of the platform after changes constitutes
                acceptance of the modified terms.
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

export default LegalTerms;
