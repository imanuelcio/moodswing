import { api } from "../../lib/axios";

export interface IProfileResponse {
  profile: Profile;
}

export interface Profile {
  id: number;
  handle: string;
  username: string;
  email: string;
  created_at: string;
  wallets: Wallet[];
  primaryWallet: PrimaryWallet;
}

export interface Wallet {
  id: number;
  user_id: number;
  chain_id: number;
  address: string;
  is_primary: boolean;
  created_at: string;
  chains: Chains;
}

export interface Chains {
  id: number;
  key: string;
  kind: string;
  name: string;
}

export interface PrimaryWallet {
  id: number;
  user_id: number;
  chain_id: number;
  address: string;
  is_primary: boolean;
  created_at: string;
  chains: Chains2;
}

export interface Chains2 {
  id: number;
  key: string;
  kind: string;
  name: string;
}

export async function getProfile(): Promise<IProfileResponse> {
  try {
    const { data } = await api.get("/user/profile");
    return data;
  } catch (error) {
    throw new Error("Failed to fetch profile");
  }
}
