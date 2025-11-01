import { motion } from "framer-motion";
import { ExternalLink, User } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Creator {
  id: string;
  handle: string;
  totalTipsIdr: number;
  tiktokUrl?: string;
}

interface TippingPanelProps {
  creators: Creator[];
  onTip?: (id: string) => void;
}

export const TippingPanel = ({ creators, onTip }: TippingPanelProps) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
  };

  const formatIDR = (amount: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="glass-card rounded-xl border border-border overflow-hidden">
      <div className="px-6 py-4 border-b border-border bg-muted/20">
        <h3 className="font-orbitron text-xl font-bold">Top Creators Today</h3>
        <p className="text-sm text-muted-foreground mt-1">
          Support your favorite creators
        </p>
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="divide-y divide-border"
      >
        {creators.length === 0 ? (
          <div className="px-6 py-12 text-center text-muted-foreground">
            No creators found
          </div>
        ) : (
          creators.map((creator) => (
            <motion.div
              key={creator.id}
              variants={itemVariants}
              className="px-6 py-4 hover:bg-muted/10 transition-colors group"
            >
              <div className="flex items-center gap-4">
                {/* Avatar */}
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 border border-border flex items-center justify-center">
                    <User className="h-6 w-6 text-primary" />
                  </div>
                </div>

                {/* Creator Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-semibold text-base truncate">
                      {creator.handle}
                    </span>
                    {creator.tiktokUrl && (
                      <a
                        href={creator.tiktokUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-shrink-0 text-muted-foreground hover:text-primary transition-colors"
                        aria-label="View TikTok profile"
                      >
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    )}
                  </div>
                  <div className="text-sm text-muted-foreground font-mono mt-0.5">
                    {formatIDR(creator.totalTipsIdr)} total tips
                  </div>
                </div>

                {/* Tip Button */}
                <div className="flex-shrink-0">
                  <Button
                    size="sm"
                    onClick={() => onTip?.(creator.id)}
                    className="bg-primary hover:bg-primary/90 text-primary-foreground font-mono transition-all group-hover:shadow-md"
                  >
                    Tip
                  </Button>
                </div>
              </div>
            </motion.div>
          ))
        )}
      </motion.div>
    </div>
  );
};
