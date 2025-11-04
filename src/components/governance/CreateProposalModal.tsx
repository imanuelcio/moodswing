import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { motion, AnimatePresence } from "framer-motion";
import {
  Shield,
  Coins,
  Target,
  Users,
  Loader2,
  CheckCircle2,
  AlertCircle,
  Calendar,
  FileText,
} from "lucide-react";
import { toast } from "sonner";

interface CreateProposalModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
}

type ProposalCategory = "protocol" | "treasury" | "parameter" | "community";

export const CreateProposalModal = ({
  open,
  onOpenChange,
  onSuccess,
}: CreateProposalModalProps) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState<ProposalCategory>("protocol");
  const [discussionUrl, setDiscussionUrl] = useState("");
  const [votingPeriod, setVotingPeriod] = useState("7");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const minProposalPower = 10000; // Minimum SFI needed to create proposal
  const userSFI = 15000; // User's current SFI (get from wallet)

  const categories = [
    {
      id: "protocol" as ProposalCategory,
      name: "Protocol Update",
      description: "Changes to core protocol logic",
      icon: Shield,
      color: "text-purple-500",
    },
    {
      id: "treasury" as ProposalCategory,
      name: "Treasury Allocation",
      description: "Fund allocation requests",
      icon: Coins,
      color: "text-amber-500",
    },
    {
      id: "parameter" as ProposalCategory,
      name: "Parameter Change",
      description: "Adjust platform parameters",
      icon: Target,
      color: "text-blue-500",
    },
    {
      id: "community" as ProposalCategory,
      name: "Community Initiative",
      description: "Community-driven proposals",
      icon: Users,
      color: "text-green-500",
    },
  ];

  const handleSubmit = async () => {
    // Validation
    if (!title.trim()) {
      setSubmitError("Title is required");
      return;
    }

    if (!description.trim()) {
      setSubmitError("Description is required");
      return;
    }

    if (title.length < 10) {
      setSubmitError("Title must be at least 10 characters");
      return;
    }

    if (description.length < 50) {
      setSubmitError("Description must be at least 50 characters");
      return;
    }

    if (userSFI < minProposalPower) {
      setSubmitError(
        `You need at least ${minProposalPower.toLocaleString()} SFI to create a proposal`
      );
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);
    setSubmitSuccess(false);

    try {
      // TODO: Replace with actual API call
      const response = await fetch("/api/governance/proposals", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          description,
          category,
          discussionUrl,
          votingPeriodDays: parseInt(votingPeriod),
        }),
      });

      if (!response.ok) throw new Error("Failed to create proposal");

      //   const data = await response.json();

      setSubmitSuccess(true);
      toast.success("Proposal created!", {
        description: `Your proposal has been submitted and will start voting soon.`,
      });

      if (onSuccess) {
        onSuccess();
      }

      // Reset form after delay
      setTimeout(() => {
        handleClose();
      }, 2000);
    } catch (err) {
      console.error("Proposal creation error:", err);
      setSubmitError(
        err instanceof Error ? err.message : "Failed to create proposal"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setTitle("");
    setDescription("");
    setCategory("protocol");
    setDiscussionUrl("");
    setVotingPeriod("7");
    setSubmitSuccess(false);
    setSubmitError(null);
    onOpenChange(false);
  };

  const isValid = () => {
    return (
      title.length >= 10 &&
      description.length >= 50 &&
      userSFI >= minProposalPower
    );
  };

  const selectedCategory = categories.find((c) => c.id === category);

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="glass-card border-border max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-orbitron text-2xl flex items-center gap-2">
            <FileText className="h-6 w-6 text-primary" />
            Create Proposal
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 mt-4">
          {/* Requirements Banner */}
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              You need at least{" "}
              <strong>{minProposalPower.toLocaleString()} SFI</strong> to create
              a proposal.
              {userSFI >= minProposalPower ? (
                <span className="text-green-500 ml-2">✓ You qualify!</span>
              ) : (
                <span className="text-red-500 ml-2">
                  You have {userSFI.toLocaleString()} SFI
                </span>
              )}
            </AlertDescription>
          </Alert>

          {/* Category Selection */}
          <div>
            <Label className="text-sm text-muted-foreground mb-3 block">
              Proposal Category
            </Label>
            <RadioGroup
              value={category}
              onValueChange={(v: ProposalCategory) => setCategory(v)}
            >
              <div className="grid grid-cols-2 gap-3">
                {categories.map((cat) => {
                  const Icon = cat.icon;
                  const isSelected = category === cat.id;

                  return (
                    <div
                      key={cat.id}
                      className={`
                        relative flex items-start space-x-3 p-4 rounded-xl border-2 cursor-pointer transition-all
                        ${
                          isSelected
                            ? "border-primary bg-primary/5"
                            : "border-border hover:border-primary/50"
                        }
                      `}
                      onClick={() => setCategory(cat.id)}
                    >
                      <RadioGroupItem
                        value={cat.id}
                        id={cat.id}
                        className="mt-1"
                      />
                      <div className="flex-1">
                        <Label
                          htmlFor={cat.id}
                          className="cursor-pointer flex items-center gap-2 mb-1"
                        >
                          <Icon className={`h-4 w-4 ${cat.color}`} />
                          <span className="font-semibold">{cat.name}</span>
                        </Label>
                        <p className="text-xs text-muted-foreground">
                          {cat.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </RadioGroup>
          </div>

          {/* Title */}
          <div>
            <Label
              htmlFor="title"
              className="text-sm text-muted-foreground mb-2 block"
            >
              Proposal Title
            </Label>
            <Input
              id="title"
              placeholder="e.g., Increase Staking Rewards APR to 12%"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="border-border"
              maxLength={100}
            />
            <div className="flex justify-between mt-1">
              <p className="text-xs text-muted-foreground">
                Minimum 10 characters
              </p>
              <p className="text-xs text-muted-foreground">
                {title.length}/100
              </p>
            </div>
          </div>

          {/* Description */}
          <div>
            <Label
              htmlFor="description"
              className="text-sm text-muted-foreground mb-2 block"
            >
              Proposal Description
            </Label>
            <Textarea
              id="description"
              placeholder="Provide detailed explanation of your proposal, including rationale, implementation plan, and expected impact..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="border-border min-h-[150px]"
              maxLength={2000}
            />
            <div className="flex justify-between mt-1">
              <p className="text-xs text-muted-foreground">
                Minimum 50 characters
              </p>
              <p className="text-xs text-muted-foreground">
                {description.length}/2000
              </p>
            </div>
          </div>

          {/* Discussion URL */}
          <div>
            <Label
              htmlFor="discussionUrl"
              className="text-sm text-muted-foreground mb-2 block"
            >
              Discussion Link (Optional)
            </Label>
            <Input
              id="discussionUrl"
              type="url"
              placeholder="https://forum.sentimentalfi.com/proposal/..."
              value={discussionUrl}
              onChange={(e) => setDiscussionUrl(e.target.value)}
              className="border-border"
            />
            <p className="text-xs text-muted-foreground mt-1">
              Link to forum discussion or additional details
            </p>
          </div>

          {/* Voting Period */}
          <div>
            <Label
              htmlFor="votingPeriod"
              className="text-sm text-muted-foreground mb-2 block"
            >
              Voting Period
            </Label>
            <div className="grid grid-cols-3 gap-3">
              {["7", "14", "30"].map((days) => (
                <Button
                  key={days}
                  variant={votingPeriod === days ? "default" : "outline"}
                  onClick={() => setVotingPeriod(days)}
                  className="flex items-center gap-2"
                >
                  <Calendar className="h-4 w-4" />
                  {days} days
                </Button>
              ))}
            </div>
          </div>

          {/* Preview Box */}
          {selectedCategory && title && (
            <div className="glass-card rounded-lg p-4 border border-border bg-muted/30">
              <div className="flex items-center gap-2 mb-2">
                <selectedCategory.icon
                  className={`h-4 w-4 ${selectedCategory.color}`}
                />
                <span className="text-xs font-semibold text-muted-foreground">
                  Preview
                </span>
              </div>
              <h4 className="font-semibold text-lg mb-2 line-clamp-2">
                {title}
              </h4>
              {description && (
                <p className="text-sm text-muted-foreground line-clamp-3">
                  {description}
                </p>
              )}
            </div>
          )}

          {/* Success Message */}
          <AnimatePresence>
            {submitSuccess && (
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
                      Proposal Submitted!
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      Your proposal will enter voting period shortly.
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Error Message */}
          <AnimatePresence>
            {submitError && (
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
                      Submission Failed
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      {submitError}
                    </p>
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
              disabled={isSubmitting}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSubmit}
              disabled={!isValid() || isSubmitting || submitSuccess}
              className="flex-1 bg-primary hover:bg-primary/90"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Submitting...
                </>
              ) : submitSuccess ? (
                <>
                  <CheckCircle2 className="mr-2 h-4 w-4" />
                  Submitted!
                </>
              ) : (
                <>
                  <FileText className="mr-2 h-4 w-4" />
                  Submit Proposal
                </>
              )}
            </Button>
          </div>

          {/* Info */}
          <p className="text-xs text-muted-foreground text-center">
            Proposals require {minProposalPower.toLocaleString()} SFI and will
            be reviewed by the community.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};
