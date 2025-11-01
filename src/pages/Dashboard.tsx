import { SiteHeader } from "@/components/SiteHeader";
import { Footer } from "@/components/Footer";
import { PredictionCard } from "@/components/PredictionCard";
import { motion } from "framer-motion";
import { TippingPanel } from "@/components/TippingPanel";
import { MyOpenPositions } from "@/components/OpenPositions";
import { StakingMiniPanel } from "@/components/StakingPanel";
import { NftGateTile } from "@/components/NFTGate";
import { PointsWalletPanel } from "@/components/PointsWalletPanel";

const Dashboard = () => {
  // Mixed positions: Points and Real Money
  const positions = [
    {
      id: "1",
      tag: "#BitcoinHype",
      side: "Long" as const,
      entryScore: 75,
      currentScore: 82,
      etaSeconds: 3600,
      estPayout: 450,
      type: "points" as const,
    },
    {
      id: "2",
      tag: "#ETHMerge",
      side: "Short" as const,
      entryScore: 80,
      currentScore: 76,
      etaSeconds: 1800,
      estPayout: 250000,
      type: "money" as const,
      currency: "IDR",
    },
    {
      id: "3",
      tag: "#DeFiSummer",
      side: "Long" as const,
      entryScore: 65,
      currentScore: 68,
      etaSeconds: 5400,
      estPayout: 320,
      type: "points" as const,
    },
    {
      id: "4",
      tag: "#AIBoom",
      side: "Long" as const,
      entryScore: 85,
      currentScore: 91,
      etaSeconds: 2700,
      estPayout: 500000,
      type: "money" as const,
      currency: "IDR",
    },
  ];

  const topCreators = [
    {
      id: "1",
      handle: "@crypto_guru",
      totalTipsIdr: 250,
      tiktokUrl: "https://tiktok.com/@crypto_guru",
    },
    {
      id: "2",
      handle: "@nft_queen",
      totalTipsIdr: 180,
    },
    {
      id: "3",
      handle: "@defi_master",
      totalTipsIdr: 150,
      tiktokUrl: "https://tiktok.com/@defi_master",
    },
  ];

  // Staking data
  const stakingData = {
    aprPct: 8,
    totalStaked: 5000,
    earned: 320,
  };

  // NFT Gate data
  const nftGateData = {
    isHolder: true,
    count: 3,
  };

  // Points Wallet data with stats
  const pointsWalletData = {
    spendable: 8450,
    expiring: { amount: 1200, daysLeft: 7 },
    monthly: { allocated: 500, claimed: false },
    buckets: [
      { label: "0-30 days", amount: 3000 },
      { label: "31-60 days", amount: 2500 },
      { label: "61-90 days", amount: 1800 },
      { label: "90+ days", amount: 1150 },
    ],
    // Stats integrated
    totalPoints: 3450,
    streak: 7,
    activeBets: 12,
  };

  const mockTrends = [
    {
      tag: "#BitcoinHype",
      score: 82,
      change: 6,
      chain: "Solana",
      volume: "$2.4M",
    },
    {
      tag: "#ETHMerge",
      score: 76,
      change: -3,
      chain: "Ethereum",
      volume: "$1.8M",
    },
    {
      tag: "#AIBoom",
      score: 91,
      change: 12,
      chain: "Polygon",
      volume: "$3.2M",
    },
    {
      tag: "#DeFiSummer",
      score: 68,
      change: 8,
      chain: "Arbitrum",
      volume: "$1.2M",
    },
  ];

  const leaderboard = [
    { rank: 1, user: "0x7a4b...3f9c", points: 12450, streak: 21 },
    { rank: 2, user: "0x9c8d...4e2a", points: 11200, streak: 18 },
    { rank: 3, user: "0x5f1a...8b7c", points: 9870, streak: 15 },
    { rank: 4, user: "0x3e9f...1d6a", points: 8640, streak: 12 },
    { rank: 5, user: "You", points: 3450, streak: 7 },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-background via-background to-primary/5">
      <SiteHeader />

      <main className="flex-1 container mx-auto px-4 py-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {/* Header */}
          <div className="mb-6">
            <h1 className="text-3xl md:text-4xl font-orbitron font-bold text-glow-red mb-2">
              Dashboard
            </h1>
            <p className="text-muted-foreground text-sm">
              Track your predictions, manage points, and explore trends
            </p>
          </div>

          {/* Filters */}
          {/* <GlobalFiltersBar
            timeframe={timeframe}
            onTimeframeChange={setTimeframe}
            chain={chain}
            onChainChange={setChain}
            query={query}
            onQueryChange={setQuery}
          /> */}

          {/* NEW UNIQUE LAYOUT - Bento Box Style */}
          <div className="grid lg:grid-cols-12 gap-4 mb-4">
            {/* Points Wallet - Large Featured */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="lg:col-span-5"
            >
              <PointsWalletPanel {...pointsWalletData} />
            </motion.div>

            {/* NFT + Staking Stack */}
            <div className="lg:col-span-4 space-y-4">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
              >
                <NftGateTile
                  isHolder={nftGateData.isHolder}
                  count={nftGateData.count}
                  onMint={() => console.log("Minting NFT")}
                  onViewMyNfts={() => console.log("View my NFTs")}
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                <StakingMiniPanel
                  aprPct={stakingData.aprPct}
                  totalStaked={stakingData.totalStaked}
                  earned={stakingData.earned}
                />
              </motion.div>
            </div>

            {/* Leaderboard - Compact */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.15 }}
              className="lg:col-span-3"
            >
              <div className="glass-card rounded-xl border border-border h-full overflow-hidden">
                <div className="px-4 py-3 border-b border-border bg-muted/20">
                  <h3 className="font-orbitron text-sm font-bold">
                    🏆 Leaderboard
                  </h3>
                </div>
                <div className="p-3 space-y-2 max-h-[400px] overflow-y-auto">
                  {leaderboard.slice(0, 5).map((entry, idx) => (
                    <motion.div
                      key={entry.rank}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.05 }}
                      className={`flex items-center justify-between p-2 rounded-lg transition-colors ${
                        entry.user === "You"
                          ? "bg-primary/10 border border-primary/30"
                          : "bg-muted/5 hover:bg-muted/10"
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-xs w-6">
                          #{entry.rank}
                        </span>
                        <span className="font-mono text-xs truncate">
                          {entry.user}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-semibold">
                          {entry.points.toLocaleString()}
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Open Positions - Full Width Featured Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-4"
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-orbitron text-xl font-bold">
                My Open Positions
              </h2>
              <div className="flex gap-2">
                <span className="text-xs px-2 py-1 rounded-full bg-blue-500/20 text-blue-400 border border-blue-500/30 font-mono">
                  ⚡ Points:{" "}
                  {positions.filter((p) => p.type === "points").length}
                </span>
                <span className="text-xs px-2 py-1 rounded-full bg-green-500/20 text-green-400 border border-green-500/30 font-mono">
                  💰 Money: {positions.filter((p) => p.type === "money").length}
                </span>
              </div>
            </div>
            <MyOpenPositions items={positions} />
          </motion.div>

          {/* Bottom Grid - Trends & Creators */}
          <div className="grid lg:grid-cols-3 gap-4">
            {/* Hot Trends - 2 columns */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
              className="lg:col-span-2"
            >
              <div className="mb-4">
                <h2 className="font-orbitron text-xl font-bold">
                  🔥 Hot Trends
                </h2>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                {mockTrends.map((trend, idx) => (
                  <motion.div
                    key={trend.tag}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3 + idx * 0.05 }}
                  >
                    <PredictionCard {...trend} />
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Top Creators - 1 column */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="lg:col-span-1"
            >
              <TippingPanel
                creators={topCreators}
                onTip={(id) => console.log("Tipping creator:", id)}
              />
            </motion.div>
          </div>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
};

export default Dashboard;
