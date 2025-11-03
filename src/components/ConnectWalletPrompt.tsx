import { motion } from "framer-motion";
import { Wallet,  Sparkles } from "lucide-react";

export const ConnectWalletPrompt = () => {
  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-2xl w-full"
      >
        {/* Main Card */}
        <div className="relative">
          {/* Glow effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-purple-500/20 to-pink-500/20 blur-3xl animate-pulse" />

          <div className="relative glass-card rounded-3xl border-2 border-primary/30 p-8 md:p-12">
            {/* Icon */}
            <div className="mb-8 flex justify-center">
              <div className="relative">
                <div className="absolute inset-0 bg-primary/20 blur-2xl animate-pulse" />
                <div className="relative bg-gradient-to-br from-primary/20 to-purple-500/20 p-6 rounded-3xl border-2 border-primary/30">
                  <Wallet className="w-16 h-16 text-primary" />
                </div>
              </div>
            </div>

            {/* Title */}
            <div className="text-center mb-8">
              <h1 className="font-orbitron text-3xl md:text-4xl font-bold mb-3 text-glow-red">
                Connect Your Wallet
              </h1>
            </div>

            {/* CTA */}
            <div className="text-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6 }}
                className="bg-gradient-to-r from-primary/20 to-purple-500/20 rounded-xl p-6 border border-primary/30"
              >
                <Sparkles className="w-8 h-8 text-primary mx-auto mb-3" />
                <p className="text-sm font-medium mb-2">
                  Ready to get started?
                </p>
                <p className="text-xs text-muted-foreground">
                  Click{" "}
                  <span className="text-primary font-semibold">
                    "Connect Wallet"
                  </span>{" "}
                  in the navigation bar above to access your dashboard
                </p>
              </motion.div>

              {/* Decorative dots */}
              <div className="mt-6 flex justify-center gap-1">
                {[...Array(3)].map((_, i) => (
                  <motion.div
                    key={i}
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [0.5, 1, 0.5],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: i * 0.2,
                    }}
                    className="w-2 h-2 rounded-full bg-primary"
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom text */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-center text-xs text-muted-foreground mt-6"
        >
          By connecting your wallet, you agree to our{" "}
          <a href="/terms" className="text-primary hover:underline">
            Terms of Service
          </a>{" "}
          and{" "}
          <a href="/privacy" className="text-primary hover:underline">
            Privacy Policy
          </a>
        </motion.p>
      </motion.div>
    </div>
  );
};
