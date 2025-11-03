import { motion } from "framer-motion";
import { Activity } from "lucide-react";

interface ActivityItem {
  id: string;
  type: "earned" | "lost" | "expired" | "claimed";
  description: string;
  amount: number;
  timestamp: string;
  token?: "SFI" | "pts";
}

interface RecentActivityProps {
  activities: ActivityItem[];
}

export const RecentActivity = ({ activities }: RecentActivityProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.6 }}
      className="glass-card rounded-xl border border-border"
    >
      <div className="px-4 py-3 border-b border-border bg-muted/20">
        <h3 className="font-orbitron text-lg font-bold flex items-center gap-2">
          <Activity className="h-5 w-5 text-primary" />
          Recent Activity
        </h3>
      </div>

      <div className="p-4 space-y-2 max-h-[400px] overflow-y-auto">
        {activities.map((activity, idx) => (
          <motion.div
            key={activity.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 + idx * 0.1 }}
            className="p-3 rounded-lg border border-border bg-muted/5"
          >
            <div className="flex items-start justify-between mb-1">
              <p className="text-sm flex-1">{activity.description}</p>
              <span
                className={`font-bold text-sm ml-2 ${
                  activity.amount > 0 ? "text-green-500" : "text-red-500"
                }`}
              >
                {activity.amount > 0 ? "+" : ""}
                {activity.amount}
                {activity.token === "SFI" ? " SFI" : " pts"}
              </span>
            </div>
            <p className="text-xs text-muted-foreground">
              {activity.timestamp}
            </p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};
