import { motion } from "framer-motion";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface GlobalFiltersBarProps {
  timeframe: string;
  onTimeframeChange: (value: string) => void;
  chain: string;
  onChainChange: (value: string) => void;
  query: string;
  onQueryChange: (value: string) => void;
}

export const GlobalFiltersBar = ({
  timeframe,
  onTimeframeChange,
  chain,
  onChainChange,
  query,
  onQueryChange,
}: GlobalFiltersBarProps) => {
  const timeframes = [
    { value: "1h", label: "1h" },
    { value: "24h", label: "24h" },
    { value: "7d", label: "7d" },
  ];

  const chains = [
    { value: "all", label: "All Chains" },
    { value: "solana", label: "Solana" },
    { value: "ethereum", label: "Ethereum" },
    { value: "polygon", label: "Polygon" },
    { value: "arbitrum", label: "Arbitrum" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card rounded-xl p-4 md:p-5 border border-border mb-8"
    >
      <div className="flex flex-col md:flex-row gap-3 md:items-center">
        {/* Timeframe Segmented Control */}
        <div className="flex gap-1 bg-muted/20 p-1 rounded-lg border border-border/50">
          {timeframes.map((tf) => (
            <button
              key={tf.value}
              onClick={() => onTimeframeChange(tf.value)}
              className={`px-4 py-2 rounded-md font-mono text-sm font-medium transition-all ${
                timeframe === tf.value
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/30"
              }`}
            >
              {tf.label}
            </button>
          ))}
        </div>

        {/* Chain Select */}
        <Select value={chain} onValueChange={onChainChange}>
          <SelectTrigger className="w-full md:w-[180px] bg-background/50 border-border hover:border-border/80 transition-colors">
            <SelectValue placeholder="Select chain" />
          </SelectTrigger>
          <SelectContent className="glass-card border-border">
            {chains.map((c) => (
              <SelectItem
                key={c.value}
                value={c.value}
                className="font-mono text-sm hover:bg-muted/20"
              >
                {c.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Search Input */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search topics or #hashtags…"
            value={query}
            onChange={(e) => onQueryChange(e.target.value)}
            className="pl-10 bg-background/50 border-border hover:border-border/80 focus:border-primary/50 transition-colors font-mono text-sm"
          />
        </div>
      </div>
    </motion.div>
  );
};
