// hooks/bet/api.ts

import { api } from "@/lib/axios";

export interface PlaceBetRequest {
  market_id: number;
  outcome_id: number;
  amount: number;
  odds?: number;
}

export interface PlaceBetResponse {
  bet_id: number;
  market_id: number;
  outcome_id: number;
  amount: number;
  potential_return: number;
  created_at: string;
}

export interface Bet {
  id: number;
  user_id: number;
  market_id: number;
  outcome_id: number;
  amount: number;
  odds: number;
  status: "PENDING" | "WON" | "LOST" | "CANCELLED";
  created_at: string;
  settled_at?: string;
}

export interface BetsResponse {
  bets: Bet[];
  pagination?: {
    page: number;
    limit: number;
    total: number;
  };
}

export async function getAllBets(): Promise<BetsResponse> {
  const response = await api.get<BetsResponse>("/bet");
  return response.data;
}

export async function placeBet(
  data: PlaceBetRequest
): Promise<PlaceBetResponse> {
  const response = await api.post<PlaceBetResponse>("/bet", data);
  return response.data;
}

export async function getBetByPublicMarketId(
  marketId: number
): Promise<BetsResponse> {
  const response = await api.get<BetsResponse>(`/bet/market/${marketId}`);
  return response.data;
}

export async function getMyBets(): Promise<BetsResponse> {
  const response = await api.get<BetsResponse>("/bet/me");
  return response.data;
}

export async function getBetStats(): Promise<BetsResponse> {
  const response = await api.get<BetsResponse>("/bet/stats");
  return response.data;
}

export async function cancelBet(betId: number): Promise<void> {
  await api.post(`/bet/${betId}/cancel`);
}
