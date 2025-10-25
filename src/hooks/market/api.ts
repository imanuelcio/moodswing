// hooks/market/api.ts

import { api } from "@/lib/axios";

export interface Market {
  id: number;
  slug: string;
  title: string;
  description: string;
  category: string;
  source: string;
  settlement_type: string;
  status: "OPEN" | "CLOSED" | "RESOLVED";
  open_at: string;
  close_at: string;
  resolve_by: string;
  creator_user_id: number | null;
  metadata: {
    reward_points: number;
  };
  created_at: string;
  symbol: string;
  pyth_price_id: string;
  resolution_rule: {
    method: string;
    grace_sec: number;
    threshold: number;
    comparator: string;
  };
  visibility: string;
  tags: string[] | null;
  market_outcomes: any[];
}

export interface IMarketsResponse {
  markets: Market[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

export interface IMarketDetailResponse {
  market: Market;
}

// Fetch all markets
export async function getMarkets(): Promise<IMarketsResponse> {
  try {
    const { data } = await api.get("/market/public");
    return data;
  } catch (error) {
    throw new Error("Failed to fetch markets");
  }
}

// Fetch single market by ID (NOT SSE - just regular HTTP GET)
export async function getMarketById(
  marketId: string
): Promise<IMarketDetailResponse> {
  try {
    const { data } = await api.get(`/market/public/${marketId}`);
    return data;
  } catch (error) {
    throw new Error("Failed to fetch market by ID");
  }
}
