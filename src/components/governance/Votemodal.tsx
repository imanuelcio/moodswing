import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";
import { motion, AnimatePresence } from "framer-motion";
import {
  ThumbsUp,
  ThumbsDown,
  Minus,
  Loader2,
  CheckCircle2,
  AlertCircle,
  Vote,
  Zap,
  TrendingUp,
} from "lucide-react";
import { toast } from "sonner";

interface Proposal {
  id: string;
  title: string;
  description: string;
  votes: {
    for: number;
    against: number;
    abstain: number;
  };
}

interface VoteModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  proposal: Proposal;
  votingPower: number;
  onSuccess?: () => void;
}

type VoteChoice = "for" | "against" | "abstain";

export const VoteModal = ({
  open,
  onOpenChange,
  proposal,
  votingPower,
  onSuccess,
}: VoteModalProps) => {
  const [voteChoice, setVoteChoice] = useState<VoteChoice>("for");
  const [reason, setReason] = useState("");
  const [isVoting, setIsVoting] = useState(false);
  const [voteSuccess, setVoteSuccess] = useState(false);
  const [voteError, setVoteError] = useState<string | null>(null);

  const voteOptions = [
    {
      id: "for" as VoteChoice,
      name: "Vote For",
      description: "Support this proposal",
      icon: ThumbsUp,
      color: "text-green-500",
      bg: "bg-green-500/10",
      border: "border-green-500/30",
    },
    {
      id: "against" as VoteChoice,
      name: "Vote Against",
      description: "Oppose this proposal",
      icon: ThumbsDown,
      color: "text-red-500",
      bg: "bg-red-500/10",
      border: "border-red-500/30",
    },
    {
      id: "abstain" as VoteChoice,
      name: "Abstain",
      description: "Count towards quorum only",
      icon: Minus,
      color: "text-gray-500",
      bg: "bg-gray-500/10",
      border: "border-gray-500/30",
    },
  ];

  const handleVote = async () => {
    if (votingPower <= 0) {
      setVoteError("You don't have any voting power");
      return;
    }

    setIsVoting(true);
    setVoteError(null);
    setVoteSuccess(false);

    try {
      // TODO: Replace with actual API call
      const response = await fetch(
        `/api/governance/proposals/${proposal.id}/vote`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            choice: voteChoice,
            votingPower,
            reason: reason.trim() || undefined,
          }),
        }
      );

      if (!response.ok) throw new Error("Failed to cast vote");

      //   const data = await response.json();

      setVoteSuccess(true);
      toast.success("Vote cast successfully!", {
        description: `You voted ${voteChoice.toUpperCase()} with ${votingPower.toLocaleString()} voting power.`,
      });

      if (onSuccess) {
        onSuccess();
      }

      // Reset form after delay
      setTimeout(() => {
        handleClose();
      }, 2000);
    } catch (err) {
      console.error("Vote error:", err);
      setVoteError(err instanceof Error ? err.message : "Failed to cast vote");
    } finally {
      setIsVoting(false);
    }
  };

  const handleClose = () => {
    setVoteChoice("for");
    setReason("");
    setVoteSuccess(false);
    setVoteError(null);
    onOpenChange(false);
  };

  // Calculate new percentages after vote
  const calculateNewPercentages = () => {
    const currentTotal =
      proposal.votes.for + proposal.votes.against + proposal.votes.abstain;
    const newTotal = currentTotal + votingPower;

    let newFor = proposal.votes.for;
    let newAgainst = proposal.votes.against;
    let newAbstain = proposal.votes.abstain;

    if (voteChoice === "for") newFor += votingPower;
    else if (voteChoice === "against") newAgainst += votingPower;
    else newAbstain += votingPower;

    return {
      for: (newFor / newTotal) * 100,
      against: (newAgainst / newTotal) * 100,
      abstain: (newAbstain / newTotal) * 100,
      current: {
        for: (proposal.votes.for / currentTotal) * 100,
        against: (proposal.votes.against / currentTotal) * 100,
      },
    };
  };

  const newPercentages = calculateNewPercentages();
  const selectedOption = voteOptions.find((o) => o.id === voteChoice)!;

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="glass-card border-border max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-orbitron text-2xl flex items-center gap-2">
            <Vote className="h-6 w-6 text-primary" />
            Cast Your Vote
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 mt-4">
          {/* Proposal Info */}
          <div className="glass-card rounded-lg p-4 border border-border bg-muted/30">
            <h3 className="font-semibold text-lg mb-2 line-clamp-2">
              {proposal.title}
            </h3>
            <p className="text-sm text-muted-foreground line-clamp-3">
              {proposal.description}
            </p>
          </div>

          {/* Voting Power Display */}
          <Alert>
            <Zap className="h-4 w-4" />
            <AlertDescription>
              Your voting power:{" "}
              <strong className="text-primary">
                {votingPower.toLocaleString()} votes
              </strong>
              <span className="text-muted-foreground text-xs ml-2">
                (based on your SFI holdings)
              </span>
            </AlertDescription>
          </Alert>

          {/* Vote Choice Selection */}
          <div>
            <Label className="text-sm text-muted-foreground mb-3 block">
              Select Your Vote
            </Label>
            <RadioGroup
              value={voteChoice}
              onValueChange={(v: VoteChoice) => setVoteChoice(v)}
            >
              <div className="space-y-3">
                {voteOptions.map((option) => {
                  const Icon = option.icon;
                  const isSelected = voteChoice === option.id;

                  return (
                    <div
                      key={option.id}
                      className={`
                        relative flex items-center space-x-4 p-4 rounded-xl border-2 cursor-pointer transition-all
                        ${
                          isSelected
                            ? `${option.border} ${option.bg}`
                            : "border-border hover:border-primary/30"
                        }
                      `}
                      onClick={() => setVoteChoice(option.id)}
                    >
                      <RadioGroupItem value={option.id} id={option.id} />
                      <div className={`p-3 rounded-xl ${option.bg}`}>
                        <Icon className={`h-6 w-6 ${option.color}`} />
                      </div>
                      <div className="flex-1">
                        <Label
                          htmlFor={option.id}
                          className={`cursor-pointer font-semibold text-base ${
                            isSelected ? option.color : ""
                          }`}
                        >
                          {option.name}
                        </Label>
                        <p className="text-sm text-muted-foreground">
                          {option.description}
                        </p>
                      </div>
                      {isSelected && (
                        <CheckCircle2 className={`h-5 w-5 ${option.color}`} />
                      )}
                    </div>
                  );
                })}
              </div>
            </RadioGroup>
          </div>

          {/* Reason (Optional) */}
          <div>
            <Label
              htmlFor="reason"
              className="text-sm text-muted-foreground mb-2 block"
            >
              Reasoning (Optional)
            </Label>
            <Textarea
              id="reason"
              placeholder="Explain why you're voting this way..."
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="border-border min-h-[80px]"
              maxLength={500}
            />
            <p className="text-xs text-muted-foreground mt-1">
              {reason.length}/500 characters
            </p>
          </div>

          {/* Impact Preview */}
          <div
            className={`glass-card rounded-lg p-4 border-2 ${selectedOption.border} ${selectedOption.bg}`}
          >
            <div className="flex items-center gap-2 mb-3">
              <TrendingUp className={`h-4 w-4 ${selectedOption.color}`} />
              <span className="font-semibold text-sm">Vote Impact Preview</span>
            </div>

            <div className="space-y-3">
              {/* For Votes */}
              <div>
                <div className="flex items-center justify-between text-sm mb-2">
                  <span className="text-muted-foreground">For</span>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs text-muted-foreground">
                      {newPercentages.current.for.toFixed(1)}%
                    </span>
                    <span className="text-muted-foreground">→</span>
                    <span
                      className={`font-mono font-semibold ${
                        voteChoice === "for" ? "text-green-500" : ""
                      }`}
                    >
                      {newPercentages.for.toFixed(1)}%
                    </span>
                  </div>
                </div>
                <Progress
                  value={newPercentages.for}
                  className="h-2 bg-green-500/20"
                >
                  <div className="h-full bg-green-500 transition-all" />
                </Progress>
              </div>

              {/* Against Votes */}
              <div>
                <div className="flex items-center justify-between text-sm mb-2">
                  <span className="text-muted-foreground">Against</span>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs text-muted-foreground">
                      {newPercentages.current.against.toFixed(1)}%
                    </span>
                    <span className="text-muted-foreground">→</span>
                    <span
                      className={`font-mono font-semibold ${
                        voteChoice === "against" ? "text-red-500" : ""
                      }`}
                    >
                      {newPercentages.against.toFixed(1)}%
                    </span>
                  </div>
                </div>
                <Progress
                  value={newPercentages.against}
                  className="h-2 bg-red-500/20"
                >
                  <div className="h-full bg-red-500 transition-all" />
                </Progress>
              </div>
            </div>

            <p className="text-xs text-muted-foreground mt-3">
              Your {votingPower.toLocaleString()} votes will shift the balance
            </p>
          </div>

          {/* Success Message */}
          <AnimatePresence>
            {voteSuccess && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="glass-card rounded-lg p-4 border border-green-500/50 bg-green-500/5"
              >
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="h-5 w-5 text-green-500 shrink-0" />
                  <div className="flex-1">
                    <h4 className="font-semibold text-green-500 mb-1">
                      Vote Cast Successfully!
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      Your vote has been recorded on-chain.
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Error Message */}
          <AnimatePresence>
            {voteError && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="glass-card rounded-lg p-4 border border-destructive/50 bg-destructive/5"
              >
                <div className="flex items-center gap-3">
                  <AlertCircle className="h-5 w-5 text-destructive shrink-0" />
                  <div className="flex-1">
                    <h4 className="font-semibold text-destructive mb-1">
                      Vote Failed
                    </h4>
                    <p className="text-sm text-muted-foreground">{voteError}</p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-2">
            <Button
              variant="outline"
              onClick={handleClose}
              disabled={isVoting}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              onClick={handleVote}
              disabled={isVoting || voteSuccess || votingPower <= 0}
              className={`flex-1 font-semibold ${
                voteChoice === "for"
                  ? "bg-green-500 hover:bg-green-600"
                  : voteChoice === "against"
                  ? "bg-red-500 hover:bg-red-600"
                  : "bg-gray-500 hover:bg-gray-600"
              }`}
            >
              {isVoting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Casting Vote...
                </>
              ) : voteSuccess ? (
                <>
                  <CheckCircle2 className="mr-2 h-4 w-4" />
                  Vote Cast!
                </>
              ) : (
                <>
                  <Vote className="mr-2 h-4 w-4" />
                  Confirm Vote {voteChoice.toUpperCase()}
                </>
              )}
            </Button>
          </div>

          {/* Info */}
          <p className="text-xs text-muted-foreground text-center">
            Your vote is final and cannot be changed. Vote wisely!
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};
