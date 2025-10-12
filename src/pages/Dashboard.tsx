import { SiteHeader } from "@/components/SiteHeader";
import { Footer } from "@/components/Footer";
import { PredictionCard } from "@/components/PredictionCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion } from "framer-motion";
import { Trophy, Flame, TrendingUp } from "lucide-react";

const Dashboard = () => {
  // const [streak, setStreak] = useState(7);
  // const [points, setPoints] = useState(3450);
  let streak = 7;
  let points = 3450;
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
    {
      tag: "#NFTRevival",
      score: 74,
      change: -5,
      chain: "Solana",
      volume: "$980K",
    },
    {
      tag: "#LayerZero",
      score: 85,
      change: 15,
      chain: "Ethereum",
      volume: "$2.9M",
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
    <div className="min-h-screen flex flex-col">
      <SiteHeader />

      <main className="flex-1 container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-4xl md:text-5xl font-orbitron font-bold mb-8 text-glow-red">
            Dashboard
          </h1>

          {/* Stats */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="glass-card rounded-xl p-6 border border-border hover:border-primary/50 transition-all"
            >
              <div className="flex items-center gap-3 mb-2">
                <Trophy className="h-6 w-6 text-primary" />
                <span className="text-sm text-muted-foreground">
                  Total Points
                </span>
              </div>
              <div className="font-mono text-3xl font-bold">
                {points.toLocaleString()}
              </div>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.02 }}
              className="glass-card rounded-xl p-6 border border-border hover:border-accent/50 transition-all"
            >
              <div className="flex items-center gap-3 mb-2">
                <Flame className="h-6 w-6 text-accent" />
                <span className="text-sm text-muted-foreground">
                  Win Streak
                </span>
              </div>
              <div className="font-mono text-3xl font-bold text-accent">
                {streak} days
              </div>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.02 }}
              className="glass-card rounded-xl p-6 border border-border hover:border-secondary/50 transition-all"
            >
              <div className="flex items-center gap-3 mb-2">
                <TrendingUp className="h-6 w-6 text-secondary" />
                <span className="text-sm text-muted-foreground">
                  Active Bets
                </span>
              </div>
              <div className="font-mono text-3xl font-bold">12</div>
            </motion.div>
          </div>

          {/* Tabs */}
          <Tabs defaultValue="trends" className="space-y-6">
            <TabsList className="glass-card border border-border">
              <TabsTrigger value="trends">Trends</TabsTrigger>
              <TabsTrigger value="leaderboard">Leaderboard</TabsTrigger>
              <TabsTrigger value="points">My Points</TabsTrigger>
            </TabsList>

            <TabsContent value="trends" className="space-y-6">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {mockTrends.map((trend, idx) => (
                  <motion.div
                    key={trend.tag}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.05 }}
                  >
                    <PredictionCard {...trend} />
                  </motion.div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="leaderboard" className="space-y-6">
              <div className="glass-card rounded-xl border border-border overflow-hidden">
                <table className="w-full">
                  <thead className="bg-muted/20">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-orbitron">
                        Rank
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-orbitron">
                        User
                      </th>
                      <th className="px-6 py-4 text-right text-sm font-orbitron">
                        Points
                      </th>
                      <th className="px-6 py-4 text-right text-sm font-orbitron">
                        Streak
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {leaderboard.map((entry, idx) => (
                      <motion.tr
                        key={entry.rank}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.05 }}
                        className={`border-t border-border hover:bg-muted/10 transition-colors ${
                          entry.user === "You" ? "bg-primary/5" : ""
                        }`}
                      >
                        <td className="px-6 py-4 font-mono font-semibold">
                          #{entry.rank}
                        </td>
                        <td className="px-6 py-4 font-mono">{entry.user}</td>
                        <td className="px-6 py-4 text-right font-mono font-semibold">
                          {entry.points.toLocaleString()}
                        </td>
                        <td className="px-6 py-4 text-right font-mono text-accent">
                          {entry.streak} 🔥
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </TabsContent>

            <TabsContent value="points" className="space-y-6">
              <div className="glass-card rounded-xl p-8 border border-border">
                <h3 className="font-orbitron text-2xl font-bold mb-6">
                  Points History
                </h3>
                <div className="space-y-4">
                  {[
                    {
                      action: "Correct prediction on #BitcoinHype",
                      points: 150,
                      time: "2 hours ago",
                    },
                    {
                      action: "Streak bonus (7 days)",
                      points: 70,
                      time: "1 day ago",
                    },
                    {
                      action: "Correct prediction on #AIBoom",
                      points: 200,
                      time: "1 day ago",
                    },
                    {
                      action: "Daily login bonus",
                      points: 10,
                      time: "1 day ago",
                    },
                  ].map((item, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.05 }}
                      className="flex items-center justify-between p-4 rounded-lg bg-muted/10"
                    >
                      <div>
                        <div className="font-medium">{item.action}</div>
                        <div className="text-sm text-muted-foreground">
                          {item.time}
                        </div>
                      </div>
                      <div className="font-mono text-lg font-bold text-accent">
                        +{item.points}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
};

export default Dashboard;
