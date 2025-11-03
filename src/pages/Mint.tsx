import { useState, useEffect } from "react";
import { SiteHeader } from "@/components/SiteHeader";
import { Footer } from "@/components/Footer";
import { NFTCard } from "@/components/NFTCard";
import { NFTDetailModal } from "@/components/NFTDetailModal";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useLenis } from "@/hooks/useLenis";
import {
  Sparkles,
  Loader2,
  AlertCircle,
  RefreshCw,
  Trophy,
  Star,
  Shield,
  Gift,
  Users,
  TrendingUp,
} from "lucide-react";

// NFT Type based on PoC
interface SentimentalNFT {
  id: string;
  name: string;
  image: string;
  description: string;
  price: string; // in SOL
  totalSupply: number;
  minted: number;
  utilities: string[];
  contractAddress?: string;
  metadataUri?: string;
}

interface NFTCollectionInfo {
  totalSupply: number;
  totalMinted: number;
  mintPrice: string;
  revenueAllocation: {
    liquidity: string;
    treasury: string;
  };
  utilities: string[];
}

const Mint = () => {
  useLenis();

  const [nftData, setNftData] = useState<SentimentalNFT | null>(null);
  const [collectionInfo, setCollectionInfo] =
    useState<NFTCollectionInfo | null>(null);
  const [selectedNFT, setSelectedNFT] = useState<SentimentalNFT | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch NFT collection data
  const fetchNFTCollection = async () => {
    setIsLoading(true);
    setError(null);

    try {
      // TODO: Replace with actual API endpoint
      const response = await fetch("/api/nft/collection", {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch NFT collection");
      }

      const data = await response.json();
      setNftData(data.nft);
      setCollectionInfo(data.collectionInfo);
    } catch (err) {
      // Use dummy data on error (for development)
      console.error("NFT fetch error:", err);

      // Dummy data based on PoC
      const dummyNFT: SentimentalNFT = {
        id: "sentimentals-001",
        name: "Moodz NFT",
        image:
          "https://images.unsplash.com/photo-1620321023374-d1a68fbc720d?w=500&h=500&fit=crop",
        description:
          "Exclusive Sentimentals NFT collection. Unlock governance rights, premium analytics, revenue share, and monthly points allocation.",
        price: "0.5 SOL",
        totalSupply: 5000,
        minted: 0, // Coming soon
        utilities: [
          "20% platform revenue share",
          "Premium analytics access",
          "1.5x governance voting power",
          "Ad-free experience",
          "Monthly points allocation",
          "Exclusive features access",
        ],
        contractAddress: undefined, // Will be set on launch
        metadataUri: undefined,
      };

      const dummyCollectionInfo: NFTCollectionInfo = {
        totalSupply: 5000,
        totalMinted: 0,
        mintPrice: "0.5 SOL",
        revenueAllocation: {
          liquidity: "30% ($75,000)",
          treasury: "70% ($175,000)",
        },
        utilities: dummyNFT.utilities,
      };

      setNftData(dummyNFT);
      setCollectionInfo(dummyCollectionInfo);
      setError(null); // Don't show error for dummy data
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch on mount
  useEffect(() => {
    fetchNFTCollection();
  }, []);

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <SiteHeader />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto mb-4" />
            <p className="text-muted-foreground">Loading NFT collection...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // Error state (only show if no dummy data loaded)
  if (error && !nftData) {
    return (
      <div className="min-h-screen flex flex-col">
        <SiteHeader />
        <main className="flex-1 container mx-auto px-4 py-16">
          <Card className="glass-card border-destructive/50 bg-destructive/5 max-w-2xl mx-auto">
            <CardContent className="pt-16 pb-16">
              <div className="text-center">
                <AlertCircle className="h-16 w-16 text-destructive mx-auto mb-4" />
                <h2 className="text-2xl font-orbitron font-bold mb-2">
                  Failed to Load NFT Collection
                </h2>
                <p className="text-muted-foreground mb-6">{error}</p>
                <Button onClick={fetchNFTCollection} variant="outline">
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Try Again
                </Button>
              </div>
            </CardContent>
          </Card>
        </main>
        <Footer />
      </div>
    );
  }

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
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-4">
            <Sparkles className="h-4 w-4 text-primary animate-pulse" />
            <span className="text-sm font-medium text-primary">
              Exclusive NFT Collection
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-orbitron font-bold mb-4 text-glow-red">
            Sentimentals NFT
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {collectionInfo?.totalSupply.toLocaleString()} exclusive NFTs
            unlocking governance, revenue share, and premium platform features
          </p>
        </motion.div>

        {/* NFT Card Display */}
        {nftData && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="max-w-md mx-auto mb-12"
          >
            <NFTCard
              id={nftData.id}
              name={nftData.name}
              image={nftData.image}
              tier="Exclusive"
              pointsBoost={0} // Not applicable for this NFT
              supply={nftData.totalSupply}
              minted={nftData.minted}
              price={nftData.price}
              onClick={() => setSelectedNFT(nftData)}
            />
          </motion.div>
        )}

        {/* Utilities Grid */}
        {/* <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-12"
        >
          <h2 className="text-3xl font-orbitron font-bold text-center mb-8">
            NFT Utilities
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              {
                icon: TrendingUp,
                title: "20% Revenue Share",
                description:
                  "Earn monthly revenue distribution from platform fees",
                color: "text-green-500",
              },
              {
                icon: Shield,
                title: "Governance Rights",
                description:
                  "1.5x voting power on platform decisions and proposals",
                color: "text-blue-500",
              },
              {
                icon: Sparkles,
                title: "Premium Analytics",
                description:
                  "Access to advanced sentiment insights and market data",
                color: "text-purple-500",
              },
              {
                icon: Star,
                title: "Monthly Points",
                description: "Receive points allocation to test predictions",
                color: "text-amber-500",
              },
              {
                icon: Gift,
                title: "Priority Access",
                description:
                  "Early access to new features and exclusive events",
                color: "text-pink-500",
              },
              {
                icon: Users,
                title: "Ad-Free Experience",
                description: "Enjoy the platform without advertisements",
                color: "text-cyan-500",
              },
            ].map((utility, idx) => (
              <motion.div
                key={utility.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + idx * 0.1 }}
                className="glass-card rounded-xl p-6 border border-border hover:border-primary/50 transition-all"
              >
                <utility.icon className={`h-8 w-8 ${utility.color} mb-4`} />
                <h3 className="font-semibold text-lg mb-2">{utility.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {utility.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div> */}

        {/* Collection Info */}
        {collectionInfo && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="glass-card rounded-xl p-8 border border-primary/30 max-w-4xl mx-auto"
          >
            <h2 className="text-2xl font-orbitron font-bold text-center mb-6">
              Collection Details
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="text-4xl font-orbitron font-bold text-primary mb-2">
                  {collectionInfo.totalSupply.toLocaleString()}
                </div>
                <div className="text-sm text-muted-foreground">
                  Total Supply
                </div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-orbitron font-bold text-secondary mb-2">
                  {collectionInfo.mintPrice}
                </div>
                <div className="text-sm text-muted-foreground">Mint Price</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-orbitron font-bold text-amber-500 mb-2">
                  {collectionInfo.totalMinted}
                </div>
                <div className="text-sm text-muted-foreground">Minted</div>
              </div>
            </div>
          </motion.div>
        )}
      </main>

      {/* NFT Detail Modal */}
      {nftData && (
        <NFTDetailModal
          open={!!selectedNFT}
          onOpenChange={(open) => !open && setSelectedNFT(null)}
          nft={selectedNFT}
        />
      )}

      <Footer />
    </div>
  );
};

export default Mint;
