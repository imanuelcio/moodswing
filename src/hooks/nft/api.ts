import { api } from "@/lib/axios";

export interface IListNFTResponse {
  status: boolean;
  data: Daum[];
}

export interface Daum {
  id: number;
  chain_id: number;
  contract_address: any;
  symbol: string;
  name: string;
  royalties_bps: number;
  revenue_share_pct: number;
  created_at: string;
  slug: string;
  description: string;
  image_url: string;
  mint_currency: string;
  mint_price: number;
  max_supply: number;
  metadata_base_uri: any;
  utilities: string[];
  revenue_allocation: RevenueAllocation;
  status: string;
  candy_machine_address: any;
  mintedCount: number;
}

export interface RevenueAllocation {
  currency: string;
  treasury_pct: number;
  treasury_usd: number;
  liquidity_pct: number;
  liquidity_usd: number;
}

export async function getListNFT(): Promise<IListNFTResponse> {
  const response = await api.get<IListNFTResponse>(`/nft/public/collections`);
  return response.data;
}

export async function mintNFT(): Promise<any> {
  const response = await api.get<any>(`/nft/mint`);
  return response.data;
}

export async function getMyNFT(): Promise<any> {
  const response = await api.get<any>(`/nft/me`);
  return response.data;
}
