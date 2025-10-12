import { useState } from "react";
import { SiteHeader } from "@/components/SiteHeader";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Copy, Eye, EyeOff, Download } from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { toast } from "sonner";

const B2BConsole = () => {
  const [showApiKey, setShowApiKey] = useState(false);
  const apiKey = "msw_live_7a4b3f9c2e8d1a6f5b9c4e7a3d2f8b1c";

  const mockChartData = [
    { time: "00:00", sentiment: 65, price: 42000 },
    { time: "04:00", sentiment: 72, price: 43200 },
    { time: "08:00", sentiment: 68, price: 42800 },
    { time: "12:00", sentiment: 82, price: 44500 },
    { time: "16:00", sentiment: 78, price: 44100 },
    { time: "20:00", sentiment: 85, price: 45200 },
  ];

  const usageStats = [
    { label: "API Calls (24h)", value: "12,450", limit: "50,000" },
    { label: "Data Downloaded", value: "2.4 GB", limit: "10 GB" },
    { label: "Active Webhooks", value: "5", limit: "20" },
  ];

  const copyApiKey = () => {
    navigator.clipboard.writeText(apiKey);
    toast.success("API key copied to clipboard");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />

      <main className="flex-1 container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-4xl md:text-5xl font-orbitron font-bold mb-8 text-glow-red">
            Enterprise Console
          </h1>

          {/* API Key */}
          <div className="glass-card rounded-xl p-6 border border-secondary/50 mb-8">
            <h2 className="font-orbitron text-xl font-semibold mb-4">
              API Key
            </h2>
            <div className="flex items-center gap-3">
              <div className="flex-1 bg-background/50 rounded-lg px-4 py-3 font-mono text-sm border border-border">
                {showApiKey ? apiKey : "●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●"}
              </div>
              <Button
                variant="outline"
                size="icon"
                onClick={() => setShowApiKey(!showApiKey)}
                className="border-border hover:border-secondary/50"
              >
                {showApiKey ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={copyApiKey}
                className="border-border hover:border-secondary/50"
              >
                <Copy className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Usage Stats */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {usageStats.map((stat, idx) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="glass-card rounded-xl p-6 border border-border"
              >
                <div className="text-sm text-muted-foreground mb-2">
                  {stat.label}
                </div>
                <div className="font-mono text-2xl font-bold mb-1">
                  {stat.value}
                </div>
                <div className="text-xs text-muted-foreground">
                  of {stat.limit}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Sentiment vs Price Chart */}
          <div className="glass-card rounded-xl p-6 border border-border mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-orbitron text-xl font-semibold">
                Sentiment vs Price (Bitcoin)
              </h2>
              <Button
                variant="outline"
                size="sm"
                className="border-border hover:border-primary/50"
              >
                <Download className="h-4 w-4 mr-2" />
                Export CSV
              </Button>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={mockChartData}>
                <XAxis
                  dataKey="time"
                  stroke="hsl(var(--muted-foreground))"
                  style={{ fontSize: "12px" }}
                />
                <YAxis
                  stroke="hsl(var(--muted-foreground))"
                  style={{ fontSize: "12px" }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="sentiment"
                  stroke="hsl(var(--primary))"
                  strokeWidth={2}
                  dot={false}
                />
                <Line
                  type="monotone"
                  dataKey="price"
                  stroke="hsl(var(--secondary))"
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
            <div className="flex items-center justify-center gap-6 mt-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-primary" />
                <span className="text-sm text-muted-foreground">
                  Sentiment Score
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-secondary" />
                <span className="text-sm text-muted-foreground">BTC Price</span>
              </div>
            </div>
          </div>

          {/* Recent API Calls */}
          <div className="glass-card rounded-xl border border-border overflow-hidden">
            <div className="p-6 border-b border-border">
              <h2 className="font-orbitron text-xl font-semibold">
                Recent API Calls
              </h2>
            </div>
            <table className="w-full">
              <thead className="bg-muted/20">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-orbitron uppercase">
                    Endpoint
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-orbitron uppercase">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-orbitron uppercase">
                    Latency
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-orbitron uppercase">
                    Time
                  </th>
                </tr>
              </thead>
              <tbody>
                {[
                  {
                    endpoint: "/v1/sentiment/bitcoin",
                    status: 200,
                    latency: "8ms",
                    time: "2m ago",
                  },
                  {
                    endpoint: "/v1/trends/solana",
                    status: 200,
                    latency: "12ms",
                    time: "5m ago",
                  },
                  {
                    endpoint: "/v1/sentiment/ethereum",
                    status: 200,
                    latency: "7ms",
                    time: "8m ago",
                  },
                  {
                    endpoint: "/v1/analytics/polygon",
                    status: 200,
                    latency: "15ms",
                    time: "12m ago",
                  },
                ].map((call, idx) => (
                  <tr
                    key={idx}
                    className="border-t border-border hover:bg-muted/10"
                  >
                    <td className="px-6 py-4 font-mono text-sm">
                      {call.endpoint}
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center px-2 py-1 rounded text-xs font-mono bg-accent/20 text-accent">
                        {call.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 font-mono text-sm">
                      {call.latency}
                    </td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">
                      {call.time}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
};

export default B2BConsole;
