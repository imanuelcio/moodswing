import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Trophy,
  Brain,
  FireExtinguisher,
  Gem,
  Vote,
  Zap,
  Star,
  Target,
  Lock,
} from "lucide-react";
import { motion } from "framer-motion";

interface ViewBadgesDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const ViewBadgesDialog = ({
  open,
  onOpenChange,
}: ViewBadgesDialogProps) => {
  const badges = [
    {
      id: "1",
      icon: Brain,
      title: "AI Whisperer",
      description: "90% sentiment accuracy",
      progress: 100,
      unlocked: true,
      color: "text-purple-400",
      bgColor: "bg-purple-500/20",
      category: "Accuracy",
    },
    {
      id: "2",
      icon: FireExtinguisher,
      title: "Hype Hunter",
      description: "20 correct bullish calls",
      progress: 100,
      unlocked: true,
      color: "text-orange-400",
      bgColor: "bg-orange-500/20",
      category: "Trading",
    },
    {
      id: "3",
      icon: Gem,
      title: "Diamond Hands",
      description: "3-month staking streak",
      progress: 100,
      unlocked: true,
      color: "text-blue-400",
      bgColor: "bg-blue-500/20",
      category: "Staking",
    },
    {
      id: "4",
      icon: Vote,
      title: "Governance Voter",
      description: "Participated in DAO 5x",
      progress: 100,
      unlocked: true,
      color: "text-green-400",
      bgColor: "bg-green-500/20",
      category: "Governance",
    },
    {
      id: "5",
      icon: Zap,
      title: "Speed Trader",
      description: "100 predictions in 24h",
      progress: 65,
      unlocked: false,
      color: "text-yellow-400",
      bgColor: "bg-yellow-500/20",
      category: "Trading",
      current: 65,
      required: 100,
    },
    {
      id: "6",
      icon: Trophy,
      title: "Top 10 Trader",
      description: "Ranked in top 10 leaderboard",
      progress: 42,
      unlocked: false,
      color: "text-amber-400",
      bgColor: "bg-amber-500/20",
      category: "Achievement",
      current: 42,
      required: 10,
    },
    {
      id: "7",
      icon: Star,
      title: "Oracle Master",
      description: "Reach Oracle level",
      progress: 78,
      unlocked: false,
      color: "text-pink-400",
      bgColor: "bg-pink-500/20",
      category: "Level",
      current: 7840,
      required: 10000,
    },
    {
      id: "8",
      icon: Target,
      title: "Perfect Streak",
      description: "10 consecutive wins",
      progress: 30,
      unlocked: false,
      color: "text-cyan-400",
      bgColor: "bg-cyan-500/20",
      category: "Achievement",
      current: 3,
      required: 10,
    },
  ];

  const unlockedCount = badges.filter((b) => b.unlocked).length;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[700px] max-h-[80vh]">
        <DialogHeader>
          <DialogTitle className="font-orbitron flex items-center gap-2">
            <Trophy className="h-5 w-5 text-amber-400" />
            Achievements & Badges
          </DialogTitle>
          <DialogDescription>
            Unlock badges by completing challenges and milestones
          </DialogDescription>
        </DialogHeader>

        <div className="py-4">
          {/* Stats Summary */}
          <div className="grid grid-cols-3 gap-3 mb-6">
            <div className="p-3 rounded-lg bg-gradient-to-br from-amber-500/10 to-amber-500/5 border border-amber-500/30 text-center">
              <Trophy className="h-5 w-5 mx-auto mb-1 text-amber-400" />
              <p className="text-2xl font-bold">{unlockedCount}</p>
              <p className="text-xs text-muted-foreground">Unlocked</p>
            </div>
            <div className="p-3 rounded-lg bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/30 text-center">
              <Lock className="h-5 w-5 mx-auto mb-1 text-primary" />
              <p className="text-2xl font-bold">
                {badges.length - unlockedCount}
              </p>
              <p className="text-xs text-muted-foreground">Locked</p>
            </div>
            <div className="p-3 rounded-lg bg-gradient-to-br from-accent/10 to-accent/5 border border-accent/30 text-center">
              <Star className="h-5 w-5 mx-auto mb-1 text-accent" />
              <p className="text-2xl font-bold">
                {Math.round((unlockedCount / badges.length) * 100)}%
              </p>
              <p className="text-xs text-muted-foreground">Completion</p>
            </div>
          </div>

          {/* Badges Grid */}
          <div className="grid md:grid-cols-2 gap-3 max-h-[400px] overflow-y-auto pr-2">
            {badges.map((badge, idx) => {
              const Icon = badge.icon;
              return (
                <motion.div
                  key={badge.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: idx * 0.05 }}
                  className={`p-4 rounded-xl border transition-all ${
                    badge.unlocked
                      ? `${badge.bgColor} border-primary/30 hover:border-primary/50`
                      : "bg-muted/5 border-muted opacity-60"
                  }`}
                >
                  <div className="flex items-start gap-3 mb-3">
                    <div
                      className={`p-2 rounded-lg ${badge.bgColor} ${
                        !badge.unlocked && "grayscale"
                      }`}
                    >
                      <Icon className={`h-5 w-5 ${badge.color}`} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-semibold text-sm">{badge.title}</h4>
                        {badge.unlocked && (
                          <Badge variant="default" className="text-xs">
                            ✓
                          </Badge>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground mb-1">
                        {badge.description}
                      </p>
                      <Badge variant="outline" className="text-xs">
                        {badge.category}
                      </Badge>
                    </div>
                  </div>

                  {!badge.unlocked && (
                    <div className="space-y-1">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-muted-foreground">Progress</span>
                        <span className="font-mono font-semibold">
                          {badge.current} / {badge.required}
                        </span>
                      </div>
                      <Progress value={badge.progress} className="h-1.5" />
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
