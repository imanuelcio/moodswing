import { useState, useEffect } from "react";
import { SiteHeader } from "@/components/SiteHeader";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { motion } from "framer-motion";
import {
  Vote,
  Shield,
  Users,
  Loader2,
  CheckCircle2,
  XCircle,
  Clock,
  Trophy,
  ArrowUpRight,
  Eye,
  MessageCircle,
  ThumbsUp,
  ThumbsDown,
  Coins,
  Target,
  Zap,
  AlertCircle,
} from "lucide-react";
import { CreateProposalModal } from "@/components/governance/CreateProposalModal";
import { GovernanceVoteModal } from "@/components/governance/GovernanceVoteModal";

// Types
interface Proposal {
  id: string;
  title: string;
  description: string;
  proposer: {
    address: string;
    name: string;
    avatar?: string;
  };
  category: "protocol" | "treasury" | "parameter" | "community";
  status: "active" | "passed" | "rejected" | "executed" | "pending";
  votes: {
    for: number;
    against: number;
    abstain: number;
  };
  quorum: number; // Percentage needed
  threshold: number; // Percentage for/against needed
  startTime: string;
  endTime: string;
  executionTime?: string;
  votersCount: number;
  discussionUrl?: string;
}

interface GovernanceStats {
  totalProposals: number;
  activeProposals: number;
  totalVotes: number;
  participationRate: number;
  treasuryBalance: number;
  yourVotingPower: number;
  yourDelegatedPower: number;
}

// Dummy data
const dummyProposals: Proposal[] = [
  {
    id: "prop-1",
    title: "Increase Staking Rewards APR to 12%",
    description:
      "Proposal to increase staking rewards from current 10% to 12% APR to incentivize more long-term holders and increase platform liquidity. This will be funded from the platform rewards allocation.",
    proposer: {
      address: "0x742d...89Ab",
      name: "CryptoWhale",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=whale",
    },
    category: "parameter",
    status: "active",
    votes: {
      for: 1250000,
      against: 350000,
      abstain: 50000,
    },
    quorum: 10,
    threshold: 60,
    startTime: "2025-11-01T00:00:00Z",
    endTime: "2025-11-08T00:00:00Z",
    votersCount: 1523,
    discussionUrl: "https://forum.sentimentalfi.com/proposal-1",
  },
  {
    id: "prop-2",
    title: "Allocate 50,000 SFI for Marketing Campaign",
    description:
      "Request to allocate 50,000 SFI tokens from DAO treasury for Q1 2026 marketing campaign focused on social media growth, influencer partnerships, and community events.",
    proposer: {
      address: "0x123a...45Bc",
      name: "MarketingPro",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=marketing",
    },
    category: "treasury",
    status: "active",
    votes: {
      for: 890000,
      against: 720000,
      abstain: 35000,
    },
    quorum: 10,
    threshold: 60,
    startTime: "2025-11-02T00:00:00Z",
    endTime: "2025-11-09T00:00:00Z",
    votersCount: 982,
  },
  {
    id: "prop-3",
    title: "Implement AI Quality Score Threshold at 75",
    description:
      "Set minimum AI quality score threshold at 75/100 for creator posts to be eligible for tipping bonuses. This ensures only high-quality content receives platform incentives.",
    proposer: {
      address: "0x456c...78De",
      name: "QualityFirst",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=quality",
    },
    category: "protocol",
    status: "passed",
    votes: {
      for: 2100000,
      against: 450000,
      abstain: 80000,
    },
    quorum: 10,
    threshold: 60,
    startTime: "2025-10-20T00:00:00Z",
    endTime: "2025-10-27T00:00:00Z",
    executionTime: "2025-10-28T12:00:00Z",
    votersCount: 2156,
  },
  {
    id: "prop-4",
    title: "Partner with DeFi Protocol for Liquidity",
    description:
      "Establish partnership with leading DeFi protocol to provide additional liquidity pools and yield farming opportunities for SFI token holders.",
    proposer: {
      address: "0x789e...12Fg",
      name: "DeFiBuilder",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=defi",
    },
    category: "community",
    status: "rejected",
    votes: {
      for: 450000,
      against: 1200000,
      abstain: 100000,
    },
    quorum: 10,
    threshold: 60,
    startTime: "2025-10-15T00:00:00Z",
    endTime: "2025-10-22T00:00:00Z",
    votersCount: 1087,
  },
];

const Governance = () => {
  const [proposals, setProposals] = useState<Proposal[]>(dummyProposals);
  const [governanceStats, setGovernanceStats] = useState<GovernanceStats>({
    totalProposals: 24,
    activeProposals: 2,
    totalVotes: 15847,
    participationRate: 42.5,
    treasuryBalance: 2500000,
    yourVotingPower: 15000,
    yourDelegatedPower: 0,
  });
  const [activeTab, setActiveTab] = useState<
    "active" | "all" | "passed" | "rejected"
  >("active");
  const [selectedProposal, setSelectedProposal] = useState<Proposal | null>(
    null
  );
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [voteModalOpen, setVoteModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Fetch governance data
  const fetchGovernanceData = async () => {
    setIsLoading(true);

    try {
      const response = await fetch("/api/governance", {
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) throw new Error("Failed to fetch governance data");

      const data = await response.json();
      setProposals(data.proposals);
      setGovernanceStats(data.stats);
    } catch (err) {
      console.error("Governance fetch error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchGovernanceData();
  }, []);

  // Filter proposals by status
  const filteredProposals = proposals.filter((p) => {
    if (activeTab === "active") return p.status === "active";
    if (activeTab === "passed")
      return p.status === "passed" || p.status === "executed";
    if (activeTab === "rejected") return p.status === "rejected";
    return true; // "all"
  });

  // Calculate time remaining
  const getTimeRemaining = (endTime: string) => {
    const now = new Date();
    const end = new Date(endTime);
    const diff = end.getTime() - now.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

    if (days > 0) return `${days}d ${hours}h`;
    if (hours > 0) return `${hours}h`;
    return "Ended";
  };

  // Calculate vote percentages
  const getVotePercentages = (proposal: Proposal) => {
    const total =
      proposal.votes.for + proposal.votes.against + proposal.votes.abstain;
    if (total === 0) return { for: 0, against: 0, abstain: 0 };

    return {
      for: (proposal.votes.for / total) * 100,
      against: (proposal.votes.against / total) * 100,
      abstain: (proposal.votes.abstain / total) * 100,
    };
  };

  // Get status config
  const getStatusConfig = (status: string) => {
    switch (status) {
      case "active":
        return {
          color: "text-blue-500",
          bg: "bg-blue-500/10",
          border: "border-blue-500/30",
          icon: Vote,
        };
      case "passed":
        return {
          color: "text-green-500",
          bg: "bg-green-500/10",
          border: "border-green-500/30",
          icon: CheckCircle2,
        };
      case "rejected":
        return {
          color: "text-red-500",
          bg: "bg-red-500/10",
          border: "border-red-500/30",
          icon: XCircle,
        };
      case "executed":
        return {
          color: "text-purple-500",
          bg: "bg-purple-500/10",
          border: "border-purple-500/30",
          icon: Zap,
        };
      default:
        return {
          color: "text-gray-500",
          bg: "bg-gray-500/10",
          border: "border-gray-500/30",
          icon: Clock,
        };
    }
  };

  // Get category config
  const getCategoryConfig = (category: string) => {
    switch (category) {
      case "protocol":
        return { color: "text-purple-500", icon: Shield };
      case "treasury":
        return { color: "text-amber-500", icon: Coins };
      case "parameter":
        return { color: "text-blue-500", icon: Target };
      default:
        return { color: "text-green-500", icon: Users };
    }
  };

  const handleVote = (proposal: Proposal) => {
    setSelectedProposal(proposal);
    setVoteModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative border-b border-border bg-gradient-to-b from-primary/5 to-transparent">
          <div className="absolute inset-0 bg-grid-white/[0.02] pointer-events-none" />
          <div className="container mx-auto px-4 py-12 relative">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-4xl mx-auto text-center space-y-6"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
                <Vote className="h-4 w-4 text-primary animate-pulse" />
                <span className="text-sm font-medium text-primary">
                  DAO Governance
                </span>
              </div>

              <h1 className="text-5xl md:text-6xl font-orbitron font-bold leading-tight">
                Shape the Future
                <br />
                <span className="text-glow-red">Vote on Proposals</span>
              </h1>

              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Hold SFI tokens to participate in governance. Vote on proposals,
                delegate voting power, and help guide the platform's direction.
              </p>

              <Button
                onClick={() => setCreateModalOpen(true)}
                size="lg"
                className="bg-primary hover:bg-primary/90 hover-neon-glow"
              >
                <Vote className="mr-2 h-5 w-5" />
                Create Proposal
              </Button>
            </motion.div>
          </div>
        </section>

        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* LEFT SIDEBAR - STICKY */}
            <div className="lg:col-span-4">
              <div className="sticky top-24 space-y-6">
                {/* Your Governance Power */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                >
                  <Card className="glass-card border-border">
                    <CardHeader className="pb-3">
                      <CardTitle className="font-orbitron flex items-center gap-2 text-lg">
                        <Trophy className="h-5 w-5 text-primary" />
                        Your Power
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <div className="text-sm text-muted-foreground mb-2">
                          Voting Power
                        </div>
                        <div className="text-3xl font-bold font-mono text-primary">
                          {governanceStats.yourVotingPower.toLocaleString()}
                        </div>
                        <div className="text-xs text-muted-foreground mt-1">
                          SFI tokens
                        </div>
                      </div>

                      {governanceStats.yourDelegatedPower > 0 && (
                        <div className="pt-3 border-t border-border">
                          <div className="text-sm text-muted-foreground mb-1">
                            Delegated to You
                          </div>
                          <div className="text-lg font-bold font-mono text-green-500">
                            +
                            {governanceStats.yourDelegatedPower.toLocaleString()}
                          </div>
                        </div>
                      )}

                      <Button variant="outline" className="w-full" size="sm">
                        <Users className="mr-2 h-4 w-4" />
                        Delegate Power
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>

                {/* DAO Stats */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <Card className="glass-card border-border">
                    <CardHeader className="pb-3">
                      <CardTitle className="font-orbitron flex items-center gap-2 text-sm">
                        <Shield className="h-4 w-4 text-secondary" />
                        DAO Statistics
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3 text-sm">
                      <div className="flex justify-between items-center">
                        <span className="text-muted-foreground">
                          Total Proposals
                        </span>
                        <span className="font-semibold font-mono">
                          {governanceStats.totalProposals}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-muted-foreground">
                          Active Now
                        </span>
                        <Badge className="bg-blue-500/20 text-blue-500 border-blue-500/30">
                          {governanceStats.activeProposals}
                        </Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-muted-foreground">
                          Total Votes
                        </span>
                        <span className="font-semibold font-mono">
                          {governanceStats.totalVotes.toLocaleString()}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-muted-foreground">
                          Participation
                        </span>
                        <span className="font-semibold text-green-500">
                          {governanceStats.participationRate.toFixed(1)}%
                        </span>
                      </div>
                      <div className="pt-3 border-t border-border">
                        <div className="flex justify-between items-center">
                          <span className="text-muted-foreground">
                            Treasury
                          </span>
                          <span className="font-semibold font-mono text-amber-500">
                            {(
                              governanceStats.treasuryBalance / 1000000
                            ).toFixed(2)}
                            M SFI
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>

                {/* How Voting Works */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <Card className="glass-card border-border">
                    <CardHeader className="pb-3">
                      <CardTitle className="font-orbitron flex items-center gap-2 text-sm">
                        <AlertCircle className="h-4 w-4 text-primary" />
                        How It Works
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex items-start gap-3">
                        <div className="p-2 rounded-lg bg-blue-500/10 shrink-0">
                          <Vote className="h-4 w-4 text-blue-500" />
                        </div>
                        <div>
                          <div className="font-semibold text-sm mb-1">
                            1 SFI = 1 Vote
                          </div>
                          <p className="text-xs text-muted-foreground">
                            Your voting power equals your SFI holdings
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <div className="p-2 rounded-lg bg-green-500/10 shrink-0">
                          <Target className="h-4 w-4 text-green-500" />
                        </div>
                        <div>
                          <div className="font-semibold text-sm mb-1">
                            Quorum Required
                          </div>
                          <p className="text-xs text-muted-foreground">
                            10% of supply must vote
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <div className="p-2 rounded-lg bg-amber-500/10 shrink-0">
                          <Zap className="h-4 w-4 text-amber-500" />
                        </div>
                        <div>
                          <div className="font-semibold text-sm mb-1">
                            Execution Delay
                          </div>
                          <p className="text-xs text-muted-foreground">
                            24h after vote ends
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </div>
            </div>

            {/* RIGHT CONTENT - SCROLLABLE */}
            <div className="lg:col-span-8">
              {/* Tabs */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6"
              >
                <Tabs
                  value={activeTab}
                  onValueChange={(v: any) => setActiveTab(v)}
                >
                  <TabsList className="glass-card grid grid-cols-4">
                    <TabsTrigger value="active">
                      <Vote className="h-4 w-4 mr-2" />
                      Active
                    </TabsTrigger>
                    <TabsTrigger value="all">All</TabsTrigger>
                    <TabsTrigger value="passed">
                      <CheckCircle2 className="h-4 w-4 mr-2" />
                      Passed
                    </TabsTrigger>
                    <TabsTrigger value="rejected">
                      <XCircle className="h-4 w-4 mr-2" />
                      Rejected
                    </TabsTrigger>
                  </TabsList>
                </Tabs>
              </motion.div>

              {/* Loading State */}
              {isLoading && filteredProposals.length === 0 && (
                <div className="flex items-center justify-center py-20">
                  <div className="text-center">
                    <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto mb-4" />
                    <p className="text-muted-foreground">
                      Loading proposals...
                    </p>
                  </div>
                </div>
              )}

              {/* Proposals List */}
              <div className="space-y-6">
                {filteredProposals.map((proposal, idx) => {
                  const statusConfig = getStatusConfig(proposal.status);
                  const categoryConfig = getCategoryConfig(proposal.category);
                  const StatusIcon = statusConfig.icon;
                  const CategoryIcon = categoryConfig.icon;
                  const percentages = getVotePercentages(proposal);
                  const totalVotes =
                    proposal.votes.for +
                    proposal.votes.against +
                    proposal.votes.abstain;
                  const quorumReached =
                    (totalVotes / governanceStats.treasuryBalance) * 100 >=
                    proposal.quorum;

                  return (
                    <motion.div
                      key={proposal.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.05 }}
                    >
                      <Card className="glass-card border-border hover:border-primary/30 transition-all">
                        <CardHeader className="pb-4">
                          {/* Header Row */}
                          <div className="flex items-start justify-between gap-4 mb-3">
                            <div className="flex items-center gap-2 flex-wrap">
                              <Badge
                                className={`${statusConfig.bg} ${statusConfig.color} ${statusConfig.border} border`}
                              >
                                <StatusIcon className="h-3 w-3 mr-1" />
                                {proposal.status}
                              </Badge>
                              <Badge
                                variant="outline"
                                className={categoryConfig.color}
                              >
                                <CategoryIcon className="h-3 w-3 mr-1" />
                                {proposal.category}
                              </Badge>
                              {proposal.status === "active" && (
                                <Badge variant="outline" className="text-xs">
                                  <Clock className="h-3 w-3 mr-1" />
                                  {getTimeRemaining(proposal.endTime)}
                                </Badge>
                              )}
                            </div>
                            <span className="text-xs text-muted-foreground font-mono">
                              #{proposal.id}
                            </span>
                          </div>

                          {/* Title */}
                          <h3 className="text-xl font-bold mb-2 leading-tight">
                            {proposal.title}
                          </h3>

                          {/* Description */}
                          <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">
                            {proposal.description}
                          </p>

                          {/* Proposer */}
                          <div className="flex items-center gap-2 mt-3 pt-3 border-t border-border">
                            <Avatar className="h-6 w-6">
                              <AvatarImage src={proposal.proposer.avatar} />
                              <AvatarFallback>
                                {proposal.proposer.name[0]}
                              </AvatarFallback>
                            </Avatar>
                            <span className="text-xs text-muted-foreground">
                              by <strong>{proposal.proposer.name}</strong>
                            </span>
                            <span className="text-xs text-muted-foreground">
                              • {proposal.votersCount.toLocaleString()} voters
                            </span>
                          </div>
                        </CardHeader>

                        <CardContent className="space-y-4">
                          {/* Vote Bars */}
                          <div className="space-y-3">
                            {/* For */}
                            <div>
                              <div className="flex items-center justify-between text-sm mb-2">
                                <div className="flex items-center gap-2">
                                  <ThumbsUp className="h-4 w-4 text-green-500" />
                                  <span className="text-muted-foreground">
                                    For
                                  </span>
                                </div>
                                <span className="font-semibold font-mono">
                                  {percentages.for.toFixed(1)}%
                                  <span className="text-xs text-muted-foreground ml-2">
                                    ({(proposal.votes.for / 1000).toFixed(0)}K)
                                  </span>
                                </span>
                              </div>
                              <Progress
                                value={percentages.for}
                                className="h-2 bg-green-500/20"
                              >
                                <div className="h-full bg-green-500 transition-all" />
                              </Progress>
                            </div>

                            {/* Against */}
                            <div>
                              <div className="flex items-center justify-between text-sm mb-2">
                                <div className="flex items-center gap-2">
                                  <ThumbsDown className="h-4 w-4 text-red-500" />
                                  <span className="text-muted-foreground">
                                    Against
                                  </span>
                                </div>
                                <span className="font-semibold font-mono">
                                  {percentages.against.toFixed(1)}%
                                  <span className="text-xs text-muted-foreground ml-2">
                                    (
                                    {(proposal.votes.against / 1000).toFixed(0)}
                                    K)
                                  </span>
                                </span>
                              </div>
                              <Progress
                                value={percentages.against}
                                className="h-2 bg-red-500/20"
                              >
                                <div className="h-full bg-red-500 transition-all" />
                              </Progress>
                            </div>

                            {/* Abstain */}
                            {percentages.abstain > 0 && (
                              <div>
                                <div className="flex items-center justify-between text-sm mb-2">
                                  <span className="text-muted-foreground">
                                    Abstain
                                  </span>
                                  <span className="font-semibold font-mono text-xs">
                                    {percentages.abstain.toFixed(1)}%
                                  </span>
                                </div>
                              </div>
                            )}
                          </div>

                          {/* Quorum Indicator */}
                          <div className="flex items-center justify-between text-xs text-muted-foreground pt-2 border-t border-border">
                            <span>Quorum: {proposal.quorum}%</span>
                            {quorumReached ? (
                              <Badge className="bg-green-500/20 text-green-500 border-green-500/30 text-xs">
                                <CheckCircle2 className="h-3 w-3 mr-1" />
                                Reached
                              </Badge>
                            ) : (
                              <Badge variant="outline" className="text-xs">
                                Not reached
                              </Badge>
                            )}
                          </div>

                          {/* Actions */}
                          <div className="flex gap-3 pt-2">
                            {proposal.status === "active" && (
                              <Button
                                onClick={() => handleVote(proposal)}
                                className="flex-1 bg-primary hover:bg-primary/90"
                              >
                                <Vote className="mr-2 h-4 w-4" />
                                Vote Now
                              </Button>
                            )}
                            {proposal.discussionUrl && (
                              <Button variant="outline" size="sm" asChild>
                                <a
                                  href={proposal.discussionUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="flex items-center gap-2"
                                >
                                  <MessageCircle className="h-4 w-4" />
                                  Discuss
                                  <ArrowUpRight className="h-3 w-3" />
                                </a>
                              </Button>
                            )}
                            <Button variant="outline" size="sm">
                              <Eye className="h-4 w-4" />
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  );
                })}
              </div>

              {/* Empty State */}
              {filteredProposals.length === 0 && !isLoading && (
                <Card className="glass-card border-border">
                  <CardContent className="py-12 text-center">
                    <Vote className="h-12 w-12 text-muted-foreground mx-auto mb-4 opacity-50" />
                    <p className="text-muted-foreground mb-4">
                      No {activeTab !== "all" && activeTab} proposals found
                    </p>
                    <Button
                      onClick={() => setActiveTab("all")}
                      variant="outline"
                    >
                      View All Proposals
                    </Button>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Modals */}
      <CreateProposalModal
        open={createModalOpen}
        onOpenChange={setCreateModalOpen}
        onSuccess={() => {
          fetchGovernanceData();
          setCreateModalOpen(false);
        }}
      />

      {selectedProposal && (
        <GovernanceVoteModal
          open={voteModalOpen}
          onOpenChange={setVoteModalOpen}
          proposal={selectedProposal}
          votingPower={governanceStats.yourVotingPower}
          onSuccess={() => {
            fetchGovernanceData();
            setVoteModalOpen(false);
          }}
        />
      )}

      <Footer />
    </div>
  );
};

export default Governance;
