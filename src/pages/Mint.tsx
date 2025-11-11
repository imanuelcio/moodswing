import { useState } from "react";
import { SiteHeader } from "@/components/SiteHeader";
import { Footer } from "@/components/Footer";
import { NFTCard } from "@/components/NFTCard";
import { NFTDetailModal } from "@/components/NFTDetailModal";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { useLenis } from "@/hooks/useLenis";
import { useGetListNFT } from "@/hooks/nft/useNFT";
import { Sparkles, Loader2, AlertCircle, RefreshCw } from "lucide-react";

// Types from API
interface NFTData {
  id: number;
  chain_id: number;
  contract_address: string | null;
  symbol: string;
  name: string;
  royalties_bps: number;
  revenue_share_pct: number;
  created_at: string;
  slug: string;
  description: string;
  image_url: string;
  mint_currency: string;
  mint_price: number;
  max_supply: number;
  metadata_base_uri: string | null;
  utilities: string[];
  revenue_allocation: {
    currency: string;
    treasury_pct: number;
    treasury_usd: number;
    liquidity_pct: number;
    liquidity_usd: number;
  };
  status: string;
  candy_machine_address: string | null;
  mintedCount: number;
}

const Mint = () => {
  useLenis();

  const [selectedNFT, setSelectedNFT] = useState<NFTData | null>(null);

  // Fetch NFT list from API
  const { data, isLoading, isError, error, refetch } = useGetListNFT();

  const nftList: NFTData[] = data?.data || [];
  console.log(nftList);
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

  // Error state
  if (isError) {
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
                <p className="text-muted-foreground mb-6">
                  {error?.message || "Something went wrong"}
                </p>
                <Button onClick={() => refetch()} variant="outline">
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

  // Calculate total stats
  const totalSupply = nftList.reduce((sum, nft) => sum + nft.max_supply, 0);
  const totalMinted = nftList.reduce((sum, nft) => sum + nft.mintedCount, 0);
  const liveCollections = nftList.filter((nft) => nft.status === "LIVE").length;

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SiteHeader />

      <main className="flex-1">
        {/* Header Section */}
        <section className="relative border-b border-border">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5" />
          <div className="absolute inset-0 bg-grid-white/[0.02]" />

          <div className="container mx-auto px-4 py-16 relative">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center max-w-4xl mx-auto"
            >
              <Badge className="bg-primary/10 text-primary border-primary/30 mb-4">
                <Sparkles className="h-3 w-3 mr-1.5 animate-pulse" />
                Exclusive NFT Collections
              </Badge>

              <h1 className="text-5xl md:text-6xl font-orbitron font-bold mb-4 text-glow-red">
                Sentimentals NFT
              </h1>

              <p className="text-xl text-muted-foreground mb-8">
                Unlock premium features, governance rights, and revenue sharing
                by owning our exclusive NFT collection
              </p>

              {/* Quick Stats */}
              <div className="grid grid-cols-3 gap-4 max-w-2xl mx-auto">
                <Card className="glass-card border-border">
                  <CardContent className="pt-5 pb-5 text-center">
                    <div className="text-3xl font-bold font-mono text-primary mb-1">
                      {totalSupply.toLocaleString()}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Total Supply
                    </div>
                  </CardContent>
                </Card>

                <Card className="glass-card border-border">
                  <CardContent className="pt-5 pb-5 text-center">
                    <div className="text-3xl font-bold font-mono text-amber-500 mb-1">
                      {totalMinted.toLocaleString()}
                    </div>
                    <div className="text-xs text-muted-foreground">Minted</div>
                  </CardContent>
                </Card>

                <Card className="glass-card border-border">
                  <CardContent className="pt-5 pb-5 text-center">
                    <div className="text-3xl font-bold font-mono text-green-500 mb-1">
                      {liveCollections}
                    </div>
                    <div className="text-xs text-muted-foreground">Live</div>
                  </CardContent>
                </Card>
              </div>
            </motion.div>
          </div>
        </section>

        {/* NFT Collections Grid */}
        <section className="container mx-auto px-4 py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            {nftList.length === 0 ? (
              <Card className="glass-card border-border max-w-2xl mx-auto">
                <CardContent className="pt-16 pb-16">
                  <div className="text-center">
                    <Sparkles className="h-16 w-16 text-muted-foreground mx-auto mb-4 opacity-50" />
                    <h3 className="text-xl font-orbitron font-bold mb-2">
                      No NFT Collections Yet
                    </h3>
                    <p className="text-muted-foreground">
                      Stay tuned! New collections coming soon.
                    </p>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-7xl mx-auto">
                {nftList.map((nft, idx) => (
                  <motion.div
                    key={nft.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                  >
                    <NFTCard
                      id={nft.slug}
                      name={nft.name}
                      image={nft.image_url}
                      tier="Exclusive"
                      pointsBoost={0}
                      supply={nft.max_supply}
                      minted={nft.mintedCount}
                      price={`${nft.mint_price} ${nft.mint_currency}`}
                      onClick={() => setSelectedNFT(nft)}
                    />
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        </section>

        {/* Benefits Section */}
        {/* <section className="border-t border-border bg-muted/20">
          <div className="container mx-auto px-4 py-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="max-w-5xl mx-auto"
            >
              <div className="text-center mb-12">
                <h2 className="text-3xl font-orbitron font-bold mb-4">
                  Why Own Sentimentals NFT?
                </h2>
                <p className="text-muted-foreground">
                  Unlock exclusive benefits and become part of the ecosystem
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                {[
                  {
                    icon: TrendingUp,
                    title: "Revenue Share",
                    description:
                      "Earn 20% of platform revenue distributed to NFT holders",
                    color: "text-green-500",
                    bg: "bg-green-500/10",
                  },
                  {
                    icon: Shield,
                    title: "Governance Power",
                    description:
                      "1.5x voting power in DAO proposals and platform decisions",
                    color: "text-blue-500",
                    bg: "bg-blue-500/10",
                  },
                  {
                    icon: Award,
                    title: "Premium Access",
                    description:
                      "Exclusive features, analytics, and ad-free experience",
                    color: "text-purple-500",
                    bg: "bg-purple-500/10",
                  },
                ].map((benefit, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                  >
                    <Card className="glass-card border-border h-full text-center hover:border-primary/50 transition-all">
                      <CardContent className="pt-8 pb-8">
                        <div
                          className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl ${benefit.bg} mb-4`}
                        >
                          <benefit.icon
                            className={`h-8 w-8 ${benefit.color}`}
                          />
                        </div>
                        <h3 className="font-orbitron font-bold text-lg mb-3">
                          {benefit.title}
                        </h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {benefit.description}
                        </p>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section> */}
      </main>

      {/* NFT Detail Modal */}
      {selectedNFT && (
        <NFTDetailModal
          open={!!selectedNFT}
          onOpenChange={(open) => !open && setSelectedNFT(null)}
          nft={{
            id: selectedNFT.slug,
            name: selectedNFT.name,
            image: selectedNFT.image_url,
            description: selectedNFT.description,
            price: `${selectedNFT.mint_price} ${selectedNFT.mint_currency}`,
            totalSupply: selectedNFT.max_supply,
            minted: selectedNFT.mintedCount,
            utilities: selectedNFT.utilities,
            contractAddress: selectedNFT.candy_machine_address || undefined,
            revenueAllocation: selectedNFT.revenue_allocation,
            status: selectedNFT.status,
          }}
          onMintSuccess={() => {
            refetch(); // Refresh NFT list after successful mint
          }}
        />
      )}

      <Footer />
    </div>
  );
};

export default Mint;
