export const navLinks = [
  { href: "/", label: "Home" },
  { href: "/markets", label: "Markets" },
  // { href: "/leaderboards", label: "Leaderboards" },
  // { href: "/mint", label: "List NFT" },
  { href: "/dashboard", label: "Dashboard" },
  // { href: "/api-keys", label: "API Keys" },
  // { href: "/docs", label: "Docs" },
];
// const pointsHistory = [
//     {
//       id: "1",
//       type: "bet_win",
//       amount: +120,
//       timestamp: "2h ago",
//       description: "Won bet on BTC market",
//       category: "win",
//     },
//     {
//       id: "2",
//       type: "decay",
//       amount: -15,
//       timestamp: "1d ago",
//       description: "15% monthly decay",
//       category: "decay",
//     },
//     {
//       id: "3",
//       type: "streak_bonus",
//       amount: +50,
//       timestamp: "3d ago",
//       description: "7-day streak bonus",
//       category: "bonus",
//     },
//     {
//       id: "4",
//       type: "bet_win",
//       amount: +200,
//       timestamp: "5d ago",
//       description: "Won bet on ETH market",
//       category: "win",
//     },
//     {
//       id: "5",
//       type: "tip_received",
//       amount: +25,
//       timestamp: "1w ago",
//       description: "Tip from @crypto_fan",
//       category: "bonus",
//     },
//   ];

//   const nfts = [
//     {
//       id: "1",
//       name: "Mood Swing Genesis #042",
//       rarity: "Rare",
//       tier: "Gold",
//       image: "🎭",
//       benefits: "+5% points boost",
//     },
//     {
//       id: "2",
//       name: "Sentiment Oracle #127",
//       rarity: "Epic",
//       tier: "Platinum",
//       image: "🔮",
//       benefits: "Early access to markets",
//     },
//     {
//       id: "3",
//       name: "Hype Beast #891",
//       rarity: "Common",
//       tier: "Silver",
//       image: "🚀",
//       benefits: "Community badge",
//     },
//   ];

//   const badges = [
//     {
//       id: "1",
//       name: "Hot Streak",
//       description: "5 wins in a row",
//       icon: "🔥",
//       progress: 100,
//     },
//     {
//       id: "2",
//       name: "Early Adopter",
//       description: "Joined in beta",
//       icon: "⭐",
//       progress: 100,
//     },
//     {
//       id: "3",
//       name: "Whale Watcher",
//       description: "Track 100 whales",
//       icon: "🐋",
//       progress: 75,
//     },
//     {
//       id: "4",
//       name: "Diamond Hands",
//       description: "Hold position 30d",
//       icon: "💎",
//       progress: 60,
//     },
//   ];

//   const stats = [
//     {
//       label: "Win Rate",
//       value: `${userData.winRate}%`,
//       icon: Target,
//       color: "text-green-400",
//     },
//     {
//       label: "Total Bets",
//       value: userData.totalPredictions,
//       icon: Activity,
//       color: "text-blue-400",
//     },
//     {
//       label: "Earnings",
//       value: `${userData.totalEarnings.toLocaleString()} pts`,
//       icon: TrendingUp,
//       color: "text-accent",
//     },
//     {
//       label: "Global Rank",
//       value: `#${userData.rank}`,
//       icon: Trophy,
//       color: "text-primary",
//     },
//   ];

{
  /* <div className="grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <div className="glass-card rounded-xl border border-border p-5">
                <div className="flex items-center justify-between mb-5">
                  <h3 className="font-orbitron text-lg font-bold flex items-center gap-2">
                    <Activity className="h-5 w-5 text-primary" />
                    Activity Timeline
                  </h3>
                  <div className="text-right">
                    <p className="text-xs text-muted-foreground">Balance</p>
                    <p className="text-lg font-mono font-bold text-primary">
                      {userData.totalPoints.toLocaleString()} pts
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  {pointsHistory.map((entry, idx) => (
                    <motion.div
                      key={entry.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.05 }}
                      className="relative flex gap-4"
                    >
                      {idx !== pointsHistory.length - 1 && (
                        <div className="absolute left-[15px] top-8 w-0.5 h-full bg-border" />
                      )}

                      <div
                        className={`relative z-10 w-8 h-8 rounded-full flex items-center justify-center ${
                          entry.category === "win"
                            ? "bg-green-500/20 border-2 border-green-500"
                            : entry.category === "bonus"
                            ? "bg-accent/20 border-2 border-accent"
                            : "bg-red-500/20 border-2 border-red-500"
                        }`}
                      >
                        {entry.category === "win" ? (
                          <TrendingUp className="h-4 w-4 text-green-400" />
                        ) : entry.category === "bonus" ? (
                          <Sparkles className="h-4 w-4 text-accent" />
                        ) : (
                          <TrendingDown className="h-4 w-4 text-red-400" />
                        )}
                      </div>

                      <div className="flex-1 pb-4">
                        <div className="flex items-start justify-between">
                          <div>
                            <p className="font-medium text-sm">
                              {entry.description}
                            </p>
                            <p className="text-xs text-muted-foreground mt-0.5">
                              {entry.timestamp}
                            </p>
                          </div>
                          <span
                            className={`font-mono font-bold text-lg ${
                              entry.amount > 0
                                ? "text-green-400"
                                : "text-red-400"
                            }`}
                          >
                            {entry.amount > 0 ? "+" : ""}
                            {entry.amount}
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="glass-card rounded-xl border border-border p-5">
                <h3 className="font-orbitron text-lg font-bold mb-4 flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-accent" />
                  NFT Collection
                </h3>
                <div className="space-y-3">
                  {nfts.map((nft, idx) => (
                    <motion.div
                      key={nft.id}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: idx * 0.1 }}
                      className="group p-3 rounded-lg border border-border hover:border-primary/50 transition-all bg-gradient-to-br from-muted/5 to-transparent cursor-pointer"
                    >
                      <div className="flex items-center gap-3 mb-2">
                        <div className="text-3xl">{nft.image}</div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-sm truncate">
                            {nft.name}
                          </p>
                          <div className="flex gap-1.5 mt-1">
                            <Badge variant="outline" className="text-xs">
                              {nft.rarity}
                            </Badge>
                            <Badge variant="secondary" className="text-xs">
                              {nft.tier}
                            </Badge>
                          </div>
                        </div>
                      </div>
                      <p className="text-xs text-muted-foreground pl-12">
                        {nft.benefits}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div> */
}

{
  /* <div className="grid sm:grid-cols-4 gap-4">
                {stats.map((stat, idx) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: idx * 0.1 }}
                    className="glass-card rounded-xl border border-border p-4 hover:border-primary/50 transition-all"
                  >
                    <stat.icon className={`h-5 w-5 ${stat.color} mb-2`} />
                    <p className="text-xs text-muted-foreground mb-1">
                      {stat.label}
                    </p>
                    <p className="text-xl font-bold font-mono">{stat.value}</p>
                  </motion.div>
                ))}
              </div> */
}
