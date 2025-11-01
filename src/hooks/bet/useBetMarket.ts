import { useMutation, useQuery } from "@tanstack/react-query";
import {
  placeBet,
  cancelBet,
  getAllBets,
  getBetByPublicMarketId,
  getBetStats,
  getMyBets,
  type PlaceBetRequest,
} from "./api";

export function usePlaceBet() {
  return useMutation({
    mutationFn: async (data: PlaceBetRequest) => {
      const response = await placeBet(data);
      return response;
    },
  });
}

export function useCancelBet() {
  return useMutation({
    mutationFn: async (betId: number) => {
      await cancelBet(betId);
    },
  });
}

export function useGetAllBets() {
  return useQuery({
    queryKey: ["bets"],
    queryFn: async () => {
      const response = await getAllBets();
      return response;
    },
  });
}

export function useGetBetByPublicMarketId(marketId: number) {
  return useQuery({
    queryKey: ["bet", marketId],
    queryFn: async () => {
      const response = await getBetByPublicMarketId(marketId);
      return response;
    },
  });
}

export function useGetMyBets() {
  return useQuery({
    queryKey: ["my-bets"],
    queryFn: async () => {
      const response = await getMyBets();
      return response;
    },
  });
}

export function useGetBetStats() {
  return useQuery({
    queryKey: ["bet-stats"],
    queryFn: async () => {
      const response = await getBetStats();
      return response;
    },
  });
}
