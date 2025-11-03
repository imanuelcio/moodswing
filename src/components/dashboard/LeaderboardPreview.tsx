import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Trophy, ArrowRight } from "lucide-react";

interface LeaderboardUser {
  rank: number;
  handle: string;
  points: number;
}

interface LeaderboardPreviewProps {
  leaderboard: {
    position: number;
    totalUsers: number;
    xp: number;
    winRate: number;
    nearbyUsers: LeaderboardUser[];
  };
}

export const LeaderboardPreview = ({
  leaderboard,
}: LeaderboardPreviewProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.8 }}
      className="glass-card rounded-xl border border-border"
    >
      <div className="px-4 py-3 border-b border-border bg-muted/20">
        <div className="flex items-center justify-between">
          <h3 className="font-orbitron text-lg font-bold flex items-center gap-2">
            <Trophy className="h-5 w-5 text-amber-400" />
            Leaderboard
          </h3>
          <Button variant="ghost" size="sm">
            View All
            <ArrowRight className="h-4 w-4 ml-1" />
          </Button>
        </div>
      </div>

      <div className="p-4">
        {/* Your Stats */}
        <div className="p-4 rounded-lg bg-gradient-to-br from-primary/10 to-accent/10 border border-primary/30 mb-4">
          <div className="grid grid-cols-3 gap-3 text-center">
            <div>
              <p className="text-xs text-muted-foreground mb-1">Position</p>
              <p className="text-xl font-bold text-amber-400">
                #{leaderboard.position}
              </p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-1">XP</p>
              <p className="text-xl font-bold">
                {leaderboard.xp.toLocaleString()}
              </p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-1">Win Rate</p>
              <p className="text-xl font-bold text-green-500">
                {leaderboard.winRate}%
              </p>
            </div>
          </div>
        </div>

        {/* Nearby Users */}
        <div className="space-y-2">
          {leaderboard.nearbyUsers.map((user) => (
            <div
              key={user.rank}
              className={`flex items-center justify-between p-2 rounded-lg transition-colors ${
                user.handle === "You"
                  ? "bg-primary/10 border border-primary/30"
                  : "bg-muted/5 hover:bg-muted/10"
              }`}
            >
              <div className="flex items-center gap-2">
                <span className="font-mono font-bold text-xs w-8">
                  #{user.rank}
                </span>
                <span className="font-mono text-sm">{user.handle}</span>
              </div>
              <span className="font-mono text-sm font-semibold">
                {user.points.toLocaleString()}
              </span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};
