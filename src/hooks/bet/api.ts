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

// Place a bet
export async function placeBet(data: PlaceBetRequest): Promise<PlaceBetResponse> {
  console.log("🎲 [API] Placing bet:", data);

  // FOR HACKATHON DEMO: Mock the response since backend endpoint isn't ready
  // TODO: Remove this mock and use real API once backend is implemented
  const DEMO_MODE = true;

  if (DEMO_MODE) {
    console.log("🎭 [DEMO] Using mock bet response (backend endpoint not ready)");

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));

    const mockResponse: PlaceBetResponse = {
      bet_id: Math.floor(Math.random() * 10000),
      market_id: data.market_id,
      outcome_id: data.outcome_id,
      amount: data.amount,
      potential_return: data.amount * 1.85, // Mock 85% return
      created_at: new Date().toISOString(),
    };

    console.log("✅ [DEMO] Mock bet placed successfully:", mockResponse);
    return mockResponse;
  }

  try {
    const response = await api.post("/bet/", data);
    console.log("✅ [API] Bet placed successfully:", response.data);
    return response.data;
  } catch (error: any) {
    console.error("❌ [API] Failed to place bet:", error.response?.data || error.message);
    throw new Error(error.response?.data?.message || "Failed to place bet");
  }
}

// Get user's bets
export async function getMyBets(): Promise<BetsResponse> {
  console.log("📊 [API] Fetching user bets...");

  try {
    const response = await api.get("/bet/me");
    console.log("✅ [API] User bets fetched:", response.data);
    return response.data;
  } catch (error: any) {
    console.error("❌ [API] Failed to fetch user bets:", error.response?.data || error.message);
    throw new Error("Failed to fetch user bets");
  }
}

// Get public bets for a market
export async function getMarketBets(marketId: string): Promise<BetsResponse> {
  console.log(`📊 [API] Fetching bets for market ${marketId}...`);

  try {
    const response = await api.get(`/bet/public/market/${marketId}`);
    console.log("✅ [API] Market bets fetched:", response.data);
    return response.data;
  } catch (error: any) {
    console.error("❌ [API] Failed to fetch market bets:", error.response?.data || error.message);
    throw new Error("Failed to fetch market bets");
  }
}

// Cancel a bet
export async function cancelBet(betId: number): Promise<void> {
  console.log(`🚫 [API] Cancelling bet ${betId}...`);

  try {
    await api.post(`/bet/${betId}/cancel`);
    console.log("✅ [API] Bet cancelled successfully");
  } catch (error: any) {
    console.error("❌ [API] Failed to cancel bet:", error.response?.data || error.message);
    throw new Error("Failed to cancel bet");
  }
}
