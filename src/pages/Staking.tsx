import { useState, useEffect } from "react";
import { SiteHeader } from "@/components/SiteHeader";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Progress } from "@/components/ui/progress";
import { motion } from "framer-motion";
import {
  Coins,
  TrendingUp,
  Lock,
  Clock,
  Zap,
  Trophy,
  Sparkles,
  Loader2,
  AlertCircle,
  CheckCircle2,
  Calendar,
  DollarSign,
  ArrowUpRight,
  Info,
  Unlock,
} from "lucide-react";

// Types
interface StakingPlan {
  id: string;
  name: string;
  duration: number; // in days
  durationLabel: string;
  apr: number;
  popular?: boolean;
  color: string;
}

interface ActiveStake {
  id: string;
  amount: number;
  plan: StakingPlan;
  startDate: string;
  endDate: string;
  earnedRewards: number;
  status: "active" | "unlocking" | "completed";
}

interface StakingStats {
  totalStaked: number;
  totalEarned: number;
  activeStakes: number;
  availableBalance: number;
}

// Staking plans from PoC
const stakingPlans: StakingPlan[] = [
  {
    id: "plan-14d",
    name: "Flexible",
    duration: 14,
    durationLabel: "14 days",
    apr: 5,
    color: "blue",
  },
  {
    id: "plan-1m",
    name: "Standard",
    duration: 30,
    durationLabel: "1 month",
    apr: 7,
    popular: true,
    color: "purple",
  },
  {
    id: "plan-3m",
    name: "Premium",
    duration: 90,
    durationLabel: "3 months",
    apr: 10,
    color: "amber",
  },
];

// Dummy active stakes
const dummyActiveStakes: ActiveStake[] = [
  {
    id: "stake-1",
    amount: 5000,
    plan: stakingPlans[1],
    startDate: "2025-10-20T00:00:00Z",
    endDate: "2025-11-19T00:00:00Z",
    earnedRewards: 28.77,
    status: "active",
  },
  {
    id: "stake-2",
    amount: 10000,
    plan: stakingPlans[2],
    startDate: "2025-10-01T00:00:00Z",
    endDate: "2025-12-30T00:00:00Z",
    earnedRewards: 89.04,
    status: "active",
  },
];

const Staking = () => {
  const [selectedPlan, setSelectedPlan] = useState<StakingPlan>(
    stakingPlans[1]
  );
  const [stakeAmount, setStakeAmount] = useState<number>(1000);
  const [customAmount, setCustomAmount] = useState<string>("");
  const [activeStakes, setActiveStakes] =
    useState<ActiveStake[]>(dummyActiveStakes);
  const [stakingStats, setStakingStats] = useState<StakingStats>({
    totalStaked: 15000,
    totalEarned: 117.81,
    activeStakes: 2,
    availableBalance: 25000,
  });
  const [isStaking, setIsStaking] = useState(false);
  const [stakeSuccess, setStakeSuccess] = useState(false);
  const [stakeError, setStakeError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Fetch staking data
  const fetchStakingData = async () => {
    setIsLoading(true);

    try {
      const response = await fetch("/api/staking", {
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) throw new Error("Failed to fetch staking data");

      const data = await response.json();
      setActiveStakes(data.activeStakes);
      setStakingStats(data.stats);
    } catch (err) {
      console.error("Staking fetch error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchStakingData();
  }, []);

  // Calculate estimated rewards
  const calculateRewards = () => {
    const daily = (stakeAmount * selectedPlan.apr) / 100 / 365;
    const total = daily * selectedPlan.duration;
    return {
      daily: daily.toFixed(2),
      total: total.toFixed(2),
    };
  };

  const rewards = calculateRewards();

  // Handle stake
  const handleStake = async () => {
    if (stakeAmount <= 0) {
      setStakeError("Stake amount must be greater than 0");
      return;
    }

    if (stakeAmount > stakingStats.availableBalance) {
      setStakeError("Insufficient balance");
      return;
    }

    setIsStaking(true);
    setStakeError(null);
    setStakeSuccess(false);

    try {
      const response = await fetch("/api/staking/stake", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          planId: selectedPlan.id,
          amount: stakeAmount,
          walletAddress: "user_wallet_address",
        }),
      });

      if (!response.ok) throw new Error("Staking transaction failed");

      const data = await response.json();
      setStakeSuccess(true);

      // Refresh data
      fetchStakingData();

      // Reset form
      setTimeout(() => {
        setStakeAmount(1000);
        setCustomAmount("");
        setStakeSuccess(false);
      }, 3000);
    } catch (err) {
      console.error("Stake error:", err);
      setStakeError(err instanceof Error ? err.message : "Failed to stake");
    } finally {
      setIsStaking(false);
    }
  };

  // Handle unstake
  const handleUnstake = async (stakeId: string) => {
    try {
      const response = await fetch(`/api/staking/unstake/${stakeId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) throw new Error("Unstake failed");

      fetchStakingData();
    } catch (err) {
      console.error("Unstake error:", err);
    }
  };

  // Calculate days remaining
  const getDaysRemaining = (endDate: string) => {
    const now = new Date();
    const end = new Date(endDate);
    const diff = end.getTime() - now.getTime();
    const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
    return days > 0 ? days : 0;
  };

  // Calculate progress
  const getProgress = (startDate: string, endDate: string) => {
    const now = new Date();
    const start = new Date(startDate);
    const end = new Date(endDate);
    const total = end.getTime() - start.getTime();
    const elapsed = now.getTime() - start.getTime();
    const progress = (elapsed / total) * 100;
    return Math.min(Math.max(progress, 0), 100);
  };

  const getPlanColor = (color: string) => {
    switch (color) {
      case "blue":
        return "text-blue-500 bg-blue-500/10 border-blue-500/30";
      case "purple":
        return "text-purple-500 bg-purple-500/10 border-purple-500/30";
      case "amber":
        return "text-amber-500 bg-amber-500/10 border-amber-500/30";
      default:
        return "text-primary bg-primary/10 border-primary/30";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative border-b border-border bg-gradient-to-b from-secondary/5 to-transparent">
          <div className="absolute inset-0 bg-grid-white/[0.02] pointer-events-none" />
          <div className="container mx-auto px-4 py-12 relative">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-4xl mx-auto text-center space-y-6"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/10 border border-secondary/20">
                <Coins className="h-4 w-4 text-secondary animate-pulse" />
                <span className="text-sm font-medium text-secondary">
                  Fixed APR Staking
                </span>
              </div>

              <h1 className="text-5xl md:text-6xl font-orbitron font-bold leading-tight">
                Stake SFI Tokens
                <br />
                <span className="text-glow-red">Earn Passive Income</span>
              </h1>

              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Lock your SFI tokens and earn up to{" "}
                <strong className="text-secondary">10% APR</strong>. Choose from
                flexible lock periods that fit your strategy.
              </p>
            </motion.div>
          </div>
        </section>

        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* LEFT SIDEBAR - STICKY */}
            <div className="lg:col-span-4">
              <div className="sticky top-24 space-y-6">
                {/* Your Stats */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                >
                  <Card className="glass-card border-border">
                    <CardHeader className="pb-3">
                      <CardTitle className="font-orbitron flex items-center gap-2 text-lg">
                        <Trophy className="h-5 w-5 text-secondary" />
                        Your Staking
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">
                            Total Staked
                          </span>
                          <span className="font-semibold font-mono text-secondary">
                            {stakingStats.totalStaked.toLocaleString()} SFI
                          </span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">
                            Total Earned
                          </span>
                          <span className="font-semibold font-mono text-green-500">
                            +{stakingStats.totalEarned.toFixed(2)} SFI
                          </span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">
                            Active Stakes
                          </span>
                          <span className="font-semibold font-mono">
                            {stakingStats.activeStakes}
                          </span>
                        </div>
                        <div className="flex items-center justify-between text-sm pt-2 border-t border-border">
                          <span className="text-muted-foreground">
                            Available
                          </span>
                          <span className="font-semibold font-mono">
                            {stakingStats.availableBalance.toLocaleString()} SFI
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>

                {/* Info Card */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <Card className="glass-card border-border">
                    <CardHeader className="pb-3">
                      <CardTitle className="font-orbitron flex items-center gap-2 text-sm">
                        <Info className="h-4 w-4 text-primary" />
                        How Staking Works
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex items-start gap-3">
                        <div className="p-2 rounded-lg bg-blue-500/10 shrink-0">
                          <Lock className="h-4 w-4 text-blue-500" />
                        </div>
                        <div>
                          <div className="font-semibold text-sm mb-1">
                            Lock Tokens
                          </div>
                          <p className="text-xs text-muted-foreground">
                            Choose lock period and stake amount
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <div className="p-2 rounded-lg bg-green-500/10 shrink-0">
                          <TrendingUp className="h-4 w-4 text-green-500" />
                        </div>
                        <div>
                          <div className="font-semibold text-sm mb-1">
                            Earn Rewards
                          </div>
                          <p className="text-xs text-muted-foreground">
                            Accrue daily rewards based on APR
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <div className="p-2 rounded-lg bg-amber-500/10 shrink-0">
                          <Unlock className="h-4 w-4 text-amber-500" />
                        </div>
                        <div>
                          <div className="font-semibold text-sm mb-1">
                            Claim Rewards
                          </div>
                          <p className="text-xs text-muted-foreground">
                            Unstake after lock period ends
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </div>
            </div>

            {/* RIGHT CONTENT */}
            <div className="lg:col-span-8">
              <div className="space-y-8">
                {/* Staking Plans */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-4"
                >
                  <h2 className="text-2xl font-orbitron font-bold">
                    Choose Staking Plan
                  </h2>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {stakingPlans.map((plan, idx) => (
                      <motion.div
                        key={plan.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.1 }}
                      >
                        <Card
                          className={`glass-card cursor-pointer transition-all ${
                            selectedPlan.id === plan.id
                              ? "border-secondary shadow-[0_0_20px_rgba(139,92,246,0.3)]"
                              : "border-border hover:border-secondary/50"
                          }`}
                          onClick={() => setSelectedPlan(plan)}
                        >
                          <CardContent className="pt-6 text-center relative">
                            {plan.popular && (
                              <Badge className="absolute top-2 right-2 bg-secondary/20 text-secondary border-secondary/30 text-xs">
                                Popular
                              </Badge>
                            )}

                            <div
                              className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl ${getPlanColor(
                                plan.color
                              )} mb-4`}
                            >
                              <Clock className="h-8 w-8" />
                            </div>

                            <h3 className="font-orbitron font-bold text-xl mb-2">
                              {plan.name}
                            </h3>

                            <div className="text-3xl font-bold font-mono text-secondary mb-2">
                              {plan.apr}%
                            </div>

                            <p className="text-sm text-muted-foreground mb-4">
                              APR
                            </p>

                            <Badge variant="outline" className="text-xs">
                              <Calendar className="h-3 w-3 mr-1" />
                              {plan.durationLabel}
                            </Badge>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>

                {/* Staking Form */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <Card className="glass-card border-border">
                    <CardHeader>
                      <CardTitle className="font-orbitron flex items-center gap-2">
                        <Coins className="h-5 w-5 text-secondary" />
                        Stake Tokens
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      {/* Amount Input */}
                      <div className="space-y-3">
                        <label className="text-sm font-medium">
                          Stake Amount
                        </label>
                        <div className="relative">
                          <Input
                            type="number"
                            placeholder="Enter amount..."
                            value={customAmount}
                            onChange={(e) => {
                              setCustomAmount(e.target.value);
                              const val = parseInt(e.target.value) || 0;
                              if (val > 0) setStakeAmount(val);
                            }}
                            className="border-border pr-16 text-lg"
                            min="1"
                          />
                          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground font-semibold">
                            SFI
                          </span>
                        </div>
                      </div>

                      {/* Slider */}
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Amount</span>
                          <span className="font-semibold">
                            {stakeAmount.toLocaleString()} SFI
                          </span>
                        </div>
                        <Slider
                          value={[stakeAmount]}
                          onValueChange={([value]) => {
                            setStakeAmount(value);
                            setCustomAmount("");
                          }}
                          min={100}
                          max={stakingStats.availableBalance}
                          step={100}
                          className="cursor-pointer"
                        />
                        <div className="flex justify-between text-xs text-muted-foreground">
                          <span>100 SFI</span>
                          <span>
                            {stakingStats.availableBalance.toLocaleString()} SFI
                          </span>
                        </div>
                      </div>

                      {/* Quick Amounts */}
                      <div className="grid grid-cols-4 gap-2">
                        {[1000, 5000, 10000, stakingStats.availableBalance].map(
                          (amount) => (
                            <Button
                              key={amount}
                              variant="outline"
                              size="sm"
                              onClick={() => {
                                setStakeAmount(amount);
                                setCustomAmount("");
                              }}
                              className="text-xs"
                            >
                              {amount >= stakingStats.availableBalance
                                ? "MAX"
                                : `${(amount / 1000).toFixed(0)}K`}
                            </Button>
                          )
                        )}
                      </div>

                      {/* Rewards Estimate */}
                      <div className="glass-card rounded-lg p-4 border border-border space-y-2 bg-secondary/5">
                        <div className="flex items-center gap-2 mb-3">
                          <TrendingUp className="h-4 w-4 text-secondary" />
                          <span className="font-semibold text-sm">
                            Estimated Rewards
                          </span>
                        </div>

                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <div className="text-muted-foreground mb-1">
                              Daily
                            </div>
                            <div className="font-bold font-mono text-green-500">
                              +{rewards.daily} SFI
                            </div>
                          </div>
                          <div>
                            <div className="text-muted-foreground mb-1">
                              Total ({selectedPlan.durationLabel})
                            </div>
                            <div className="font-bold font-mono text-green-500">
                              +{rewards.total} SFI
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center justify-between pt-2 border-t border-border text-xs text-muted-foreground">
                          <span>APR</span>
                          <span className="font-semibold text-secondary">
                            {selectedPlan.apr}%
                          </span>
                        </div>
                      </div>

                      {/* Success Message */}
                      {stakeSuccess && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="glass-card rounded-lg p-4 border border-green-500/50 bg-green-500/5"
                        >
                          <div className="flex items-center gap-3">
                            <CheckCircle2 className="h-5 w-5 text-green-500 shrink-0" />
                            <div className="flex-1">
                              <h4 className="font-semibold text-green-500 mb-1">
                                Staking Successful!
                              </h4>
                              <p className="text-sm text-muted-foreground">
                                Your {stakeAmount.toLocaleString()} SFI has been
                                staked for {selectedPlan.durationLabel}
                              </p>
                            </div>
                          </div>
                        </motion.div>
                      )}

                      {/* Error Message */}
                      {stakeError && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="glass-card rounded-lg p-4 border border-destructive/50 bg-destructive/5"
                        >
                          <div className="flex items-center gap-3">
                            <AlertCircle className="h-5 w-5 text-destructive shrink-0" />
                            <div className="flex-1">
                              <h4 className="font-semibold text-destructive mb-1">
                                Staking Failed
                              </h4>
                              <p className="text-sm text-muted-foreground">
                                {stakeError}
                              </p>
                            </div>
                          </div>
                        </motion.div>
                      )}

                      {/* Stake Button */}
                      <Button
                        onClick={handleStake}
                        disabled={isStaking || stakeSuccess || stakeAmount <= 0}
                        className="w-full bg-secondary hover:bg-secondary/90 hover-neon-glow"
                        size="lg"
                      >
                        {isStaking ? (
                          <>
                            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                            Staking...
                          </>
                        ) : stakeSuccess ? (
                          <>
                            <CheckCircle2 className="mr-2 h-5 w-5" />
                            Staked!
                          </>
                        ) : (
                          <>
                            <Lock className="mr-2 h-5 w-5" />
                            Stake {stakeAmount.toLocaleString()} SFI
                          </>
                        )}
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>

                {/* Active Stakes */}
                {activeStakes.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="space-y-4"
                  >
                    <h2 className="text-2xl font-orbitron font-bold">
                      Your Active Stakes
                    </h2>

                    <div className="space-y-4">
                      {activeStakes.map((stake, idx) => {
                        const daysRemaining = getDaysRemaining(stake.endDate);
                        const progress = getProgress(
                          stake.startDate,
                          stake.endDate
                        );
                        const isCompleted = daysRemaining === 0;

                        return (
                          <motion.div
                            key={stake.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.1 }}
                          >
                            <Card className="glass-card border-border">
                              <CardContent className="pt-6">
                                <div className="flex items-start justify-between mb-4">
                                  <div>
                                    <Badge
                                      className={
                                        getPlanColor(stake.plan.color) + " mb-2"
                                      }
                                    >
                                      {stake.plan.name} - {stake.plan.apr}% APR
                                    </Badge>
                                    <div className="font-bold text-2xl font-mono">
                                      {stake.amount.toLocaleString()} SFI
                                    </div>
                                    <div className="text-sm text-muted-foreground">
                                      Staked Amount
                                    </div>
                                  </div>

                                  <div className="text-right">
                                    <div className="font-bold text-xl font-mono text-green-500">
                                      +{stake.earnedRewards.toFixed(2)} SFI
                                    </div>
                                    <div className="text-sm text-muted-foreground">
                                      Earned Rewards
                                    </div>
                                  </div>
                                </div>

                                {/* Progress */}
                                <div className="space-y-2 mb-4">
                                  <div className="flex items-center justify-between text-sm">
                                    <span className="text-muted-foreground">
                                      Progress
                                    </span>
                                    <span className="font-semibold">
                                      {isCompleted
                                        ? "Completed"
                                        : `${daysRemaining} days remaining`}
                                    </span>
                                  </div>
                                  <Progress value={progress} className="h-2" />
                                </div>

                                {/* Dates */}
                                <div className="flex items-center justify-between text-xs text-muted-foreground mb-4">
                                  <span>
                                    Started:{" "}
                                    {new Date(
                                      stake.startDate
                                    ).toLocaleDateString()}
                                  </span>
                                  <span>
                                    Ends:{" "}
                                    {new Date(
                                      stake.endDate
                                    ).toLocaleDateString()}
                                  </span>
                                </div>

                                {/* Unstake Button */}
                                <Button
                                  onClick={() => handleUnstake(stake.id)}
                                  disabled={!isCompleted}
                                  variant={isCompleted ? "default" : "outline"}
                                  className="w-full"
                                  size="sm"
                                >
                                  {isCompleted ? (
                                    <>
                                      <Unlock className="mr-2 h-4 w-4" />
                                      Unstake & Claim Rewards
                                    </>
                                  ) : (
                                    <>
                                      <Lock className="mr-2 h-4 w-4" />
                                      Locked ({daysRemaining}d remaining)
                                    </>
                                  )}
                                </Button>
                              </CardContent>
                            </Card>
                          </motion.div>
                        );
                      })}
                    </div>
                  </motion.div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Staking;
