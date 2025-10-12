import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface MarketBubble {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
  sentiment: "bullish" | "bearish" | "neutral";
}

export const AnimatedBackground = () => {
  const [bubbles, setBubbles] = useState<MarketBubble[]>([]);

  useEffect(() => {
    const newBubbles: MarketBubble[] = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 60 + 40,
      duration: Math.random() * 10 + 15,
      delay: Math.random() * 5,
      sentiment: ["bullish", "bearish", "neutral"][
        Math.floor(Math.random() * 3)
      ] as "bullish" | "bearish" | "neutral",
    }));
    setBubbles(newBubbles);
  }, []);

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case "bullish":
        return "rgba(16, 185, 129, 0.15)"; // success
      case "bearish":
        return "rgba(220, 38, 38, 0.15)"; // primary/destructive
      case "neutral":
        return "rgba(79, 70, 229, 0.15)"; // secondary
      default:
        return "rgba(255, 255, 255, 0.05)";
    }
  };

  const getSentimentGlow = (sentiment: string) => {
    switch (sentiment) {
      case "bullish":
        return "rgba(16, 185, 129, 0.4)";
      case "bearish":
        return "rgba(220, 38, 38, 0.4)";
      case "neutral":
        return "rgba(79, 70, 229, 0.4)";
      default:
        return "rgba(255, 255, 255, 0.2)";
    }
  };

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {bubbles.map((bubble) => (
        <motion.div
          key={bubble.id}
          className="absolute rounded-full"
          style={{
            left: `${bubble.x}%`,
            top: `${bubble.y}%`,
            width: bubble.size,
            height: bubble.size,
          }}
          animate={{
            x: [0, Math.random() * 100 - 50, 0],
            y: [0, Math.random() * 100 - 50, 0],
            scale: [1, 1.3, 1],
            opacity: [0.4, 0.7, 0.4],
          }}
          transition={{
            duration: bubble.duration,
            delay: bubble.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <div
            className="w-full h-full rounded-full blur-2xl"
            style={{
              background: `radial-gradient(circle, ${getSentimentGlow(
                bubble.sentiment
              )}, ${getSentimentColor(bubble.sentiment)})`,
              boxShadow: `0 0 ${bubble.size}px ${getSentimentGlow(
                bubble.sentiment
              )}`,
            }}
          />
        </motion.div>
      ))}

      {/* Grid overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(220,38,38,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(220,38,38,0.05)_1px,transparent_1px)] bg-[size:50px_50px]" />

      {/* Vignette effect */}
      <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-background" />
    </div>
  );
};
