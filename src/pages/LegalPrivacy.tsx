import { SiteHeader } from "@/components/SiteHeader";
import { Footer } from "@/components/Footer";
import { motion } from "framer-motion";

const LegalPrivacy = () => {
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
            Privacy Policy
          </h1>

          <div className="glass-card rounded-xl p-8 border border-border space-y-6 text-muted-foreground">
            <section>
              <h2 className="text-xl font-orbitron font-semibold text-foreground mb-3">
                Introduction
              </h2>
              <p>
                Mood Swing ("we", "our", "us") respects your privacy and is
                committed to protecting your personal data. This privacy policy
                explains how we collect, use, and safeguard your information
                when you use our platform.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-orbitron font-semibold text-foreground mb-3">
                Data We Collect
              </h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>Wallet addresses and transaction data</li>
                <li>Usage patterns and platform interactions</li>
                <li>API usage metrics for B2B customers</li>
                <li>Technical data (IP address, browser type, etc.)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-orbitron font-semibold text-foreground mb-3">
                How We Use Your Data
              </h2>
              <p>We use collected data to:</p>
              <ul className="list-disc pl-6 space-y-2 mt-2">
                <li>Provide and improve our services</li>
                <li>Calculate sentiment scores and predictions</li>
                <li>Manage leaderboards and rewards</li>
                <li>Communicate important updates</li>
                <li>Ensure platform security</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-orbitron font-semibold text-foreground mb-3">
                Data Security
              </h2>
              <p>
                We implement industry-standard security measures to protect your
                data, including encryption, secure APIs, and regular security
                audits. However, no method of transmission over the internet is
                100% secure.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-orbitron font-semibold text-foreground mb-3">
                Contact Us
              </h2>
              <p>
                For questions about this privacy policy, please contact us at{" "}
                <span className="text-primary">privacy@moodswing.fi</span>
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

export default LegalPrivacy;
