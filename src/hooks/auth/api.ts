import { api } from "@/lib/axios";
import type { INonceResponse } from "@/types/auth";

export async function generateNonce(
  address: string,
  chainKind: "ethereum" | "solana",
  domain: string
): Promise<INonceResponse> {
  const { data } = await api.post("/auth/nonce", {
    address,
    chainKind,
    domain,
  });
  return data;
}

export async function verifySignature(params: {
  address: string;
  chainKind: "ethereum" | "solana";
  nonce: string;
  domain: string;
  signature: string;
}) {
  try {
    const { data } = await api.post("/auth/verify", params);
    return data;
  } catch (error: any) {
    if (error.response?.data) {
      const errorMsg =
        error.response.data.message ||
        error.response.data.error?.message ||
        "Verification failed";
      throw new Error(errorMsg);
    }

    throw new Error(error.message || "Network error");
  }
}

export async function getMe(): Promise<any> {
  try {
    const { data } = await api.get("/auth/profile");
    return data;
  } catch (error) {
    throw error;
  }
}
