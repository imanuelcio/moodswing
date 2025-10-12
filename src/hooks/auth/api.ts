import { api } from "@/lib/axios";
import type { INonceResponse } from "@/types/auth";

export async function generateNonce(
  address: string,
  chainKind: "evm" | "solana",
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
  chainKind: "evm" | "solana";
  nonce: string;
  domain: string;
  signature: string;
}) {
  const { data } = await api.post("/auth/verify", params);
  return data;
}
