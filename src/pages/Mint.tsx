import { useState } from "react";
import { SiteHeader } from "@/components/SiteHeader";
import { Footer } from "@/components/Footer";
import { NFTCard } from "@/components/NFTCard";
import { NFTDetailModal } from "@/components/NFTDetailModal";
import { motion } from "framer-motion";
import { useLenis } from "@/hooks/useLenis";
import { Filter } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const mockNFTs = [
  {
    id: "1",
    name: "Genesis Trader",
    image:
      "https://images.unsplash.com/photo-1620321023374-d1a68fbc720d?w=500&h=500&fit=crop",
    tier: "Legendary",
    pointsBoost: 50,
    supply: 100,
    minted: 87,
    description:
      "The ultimate NFT for serious traders. Unlock maximum benefits and exclusive features.",
    benefits: [
      "50% reduced trading fees",
      "Priority market access",
      "Exclusive Discord channel",
      "Early access to new features",
    ],
    requirements: {
      points: 10000,
      level: 10,
    },
    price: "2.5 SOL",
  },
  {
    id: "2",
    name: "Elite Predictor",
    image:
      "https://images.unsplash.com/photo-1634973357973-f2ed2657db3c?w=500&h=500&fit=crop",
    tier: "Epic",
    pointsBoost: 30,
    supply: 500,
    minted: 342,
    description:
      "For experienced predictors who want to maximize their earnings and influence.",
    benefits: [
      "30% reduced trading fees",
      "Enhanced analytics dashboard",
      "Priority customer support",
    ],
    requirements: {
      points: 5000,
      level: 5,
    },
    price: "1.2 SOL",
  },
  {
    id: "3",
    name: "Market Maven",
    image:
      "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=500&h=500&fit=crop",
    tier: "Rare",
    pointsBoost: 20,
    supply: 1000,
    minted: 745,
    description:
      "Perfect for active traders looking to boost their prediction power.",
    benefits: [
      "20% reduced trading fees",
      "Advanced market insights",
      "Custom notifications",
    ],
    requirements: {
      points: 2000,
      level: 3,
    },
    price: "0.5 SOL",
  },
  {
    id: "4",
    name: "Trend Spotter",
    image:
      "https://images.unsplash.com/photo-1622630998477-20aa696ecb05?w=500&h=500&fit=crop",
    tier: "Common",
    pointsBoost: 10,
    supply: 5000,
    minted: 3421,
    description:
      "Entry-level NFT to start your prediction journey with bonus benefits.",
    benefits: [
      "10% reduced trading fees",
      "Basic analytics",
      "Community access",
    ],
    requirements: {
      points: 500,
      level: 1,
    },
    price: "0.1 SOL",
  },
  {
    id: "5",
    name: "Sentiment Master",
    image:
      "https://images.unsplash.com/photo-1635322966219-b75ed372eb01?w=500&h=500&fit=crop",
    tier: "Epic",
    pointsBoost: 35,
    supply: 300,
    minted: 156,
    description:
      "Harness the power of sentiment analysis with this exclusive NFT.",
    benefits: [
      "35% reduced trading fees",
      "Real-time sentiment alerts",
      "API access",
    ],
    requirements: {
      points: 7500,
      level: 7,
      previousNFT: "Market Maven",
    },
    price: "1.8 SOL",
  },
  {
    id: "6",
    name: "Crystal Ball",
    image:
      "https://images.unsplash.com/photo-1618172193622-ae2d025f4032?w=500&h=500&fit=crop",
    tier: "Legendary",
    pointsBoost: 60,
    supply: 50,
    minted: 12,
    description:
      "The rarest NFT with unparalleled benefits. For the elite few.",
    benefits: [
      "60% reduced trading fees",
      "Private consultation sessions",
      "Governance voting rights",
      "Revenue share program",
    ],
    requirements: {
      points: 25000,
      level: 15,
      previousNFT: "Genesis Trader",
    },
    price: "5 SOL",
  },
];

const Mint = () => {
  useLenis();
  const [selectedNFT, setSelectedNFT] = useState<(typeof mockNFTs)[0] | null>(
    null
  );
  const [tierFilter, setTierFilter] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("tier");

  const filteredNFTs = mockNFTs.filter((nft) => {
    if (tierFilter === "all") return true;
    return nft.tier.toLowerCase() === tierFilter.toLowerCase();
  });

  const sortedNFTs = [...filteredNFTs].sort((a, b) => {
    switch (sortBy) {
      case "tier":
        const tierOrder = { Legendary: 0, Epic: 1, Rare: 2, Common: 3 };
        return (
          tierOrder[a.tier as keyof typeof tierOrder] -
          tierOrder[b.tier as keyof typeof tierOrder]
        );
      case "price":
        return parseFloat(b.price) - parseFloat(a.price);
      case "availability":
        return b.supply - b.minted - (a.supply - a.minted);
      default:
        return 0;
    }
  });

  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />

      <main className="flex-1 container mx-auto px-4 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-orbitron font-bold mb-4 text-glow-red">
            NFT Collection
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Mint exclusive NFTs to unlock premium features, boost your earnings,
            and gain exclusive access to advanced trading tools
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex flex-wrap gap-4 items-center justify-between mb-8"
        >
          <div className="flex items-center gap-2">
            <Filter className="h-5 w-5 text-muted-foreground" />
            <span className="text-sm font-medium">Filter by:</span>
            <Select value={tierFilter} onValueChange={setTierFilter}>
              <SelectTrigger className="w-[150px] border-border">
                <SelectValue placeholder="All Tiers" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Tiers</SelectItem>
                <SelectItem value="legendary">Legendary</SelectItem>
                <SelectItem value="epic">Epic</SelectItem>
                <SelectItem value="rare">Rare</SelectItem>
                <SelectItem value="common">Common</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">Sort by:</span>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[150px] border-border">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="tier">Tier</SelectItem>
                <SelectItem value="price">Price</SelectItem>
                <SelectItem value="availability">Availability</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </motion.div>

        {/* NFT Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {sortedNFTs.map((nft, idx) => (
            <motion.div
              key={nft.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
            >
              <NFTCard {...nft} onClick={() => setSelectedNFT(nft)} />
            </motion.div>
          ))}
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-card rounded-xl p-8 border border-primary/30 max-w-4xl mx-auto"
        >
          <h2 className="text-2xl font-orbitron font-bold text-center mb-6">
            Collection Stats
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { label: "Total NFTs", value: mockNFTs.length },
              {
                label: "Total Minted",
                value: mockNFTs.reduce((acc, nft) => acc + nft.minted, 0),
              },
              {
                label: "Total Supply",
                value: mockNFTs.reduce((acc, nft) => acc + nft.supply, 0),
              },
              {
                label: "Avg. Boost",
                value: `${Math.round(
                  mockNFTs.reduce((acc, nft) => acc + nft.pointsBoost, 0) /
                    mockNFTs.length
                )}%`,
              },
            ].map((stat, idx) => (
              <div key={idx} className="text-center">
                <div className="text-3xl font-orbitron font-bold text-primary mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </main>

      <NFTDetailModal
        open={!!selectedNFT}
        onOpenChange={(open) => !open && setSelectedNFT(null)}
        nft={selectedNFT}
      />

      <Footer />
    </div>
  );
};

export default Mint;
