// hooks/points/api.ts

import { api } from "@/lib/axios";

export interface LeaderboardEntry {
  user_id: number;
  username: string;
  avatar?: string;
  total_points: number;
  rank: number;
  streak?: number;
  total_bets?: number;
}

export interface LeaderboardResponse {
  leaderboard: LeaderboardEntry[];
  pagination?: {
    page: number;
    limit: number;
    total: number;
  };
}

export interface PointsStats {
  total_points: number;
  rank: number;
  percentile: number;
}

// Fetch leaderboard
export async function getLeaderboard(params?: {
  limit?: number;
  period?: string;
}): Promise<LeaderboardResponse> {
  try {
    const { data } = await api.get("/points/public/leaderboard", { params });
    return data;
  } catch (error) {
    console.error("Failed to fetch leaderboard:", error);
    throw new Error("Failed to fetch leaderboard");
  }
}

// Fetch leaderboard stats
export async function getLeaderboardStats(): Promise<PointsStats> {
  try {
    const { data } = await api.get("/points/public/stats");
    return data;
  } catch (error) {
    console.error("Failed to fetch points stats:", error);
    throw new Error("Failed to fetch points stats");
  }
}

// Get user points balance (requires auth)
export async function getMyPoints(): Promise<{ balance: number }> {
  try {
    const { data } = await api.get("/points/me/balance");
    return data;
  } catch (error) {
    console.error("Failed to fetch user points:", error);
    throw new Error("Failed to fetch user points");
  }
}
