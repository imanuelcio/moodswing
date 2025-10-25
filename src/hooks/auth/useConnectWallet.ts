import { useMutation } from "@tanstack/react-query";
import { generateNonce, verifySignature } from "./api";

export function useGenerateNonce() {
  return useMutation({
    mutationFn: async (params: {
      address: string;
      chainKind: "ethereum" | "solana";
      domain: string;
    }) => {
      const { address, chainKind, domain } = params;
      const result = await generateNonce(address, chainKind, domain);
      return result;
    },
  });
}

export function useVerifySignature() {
  return useMutation({
    mutationFn: (params: {
      address: string;
      chainKind: "ethereum" | "solana";
      nonce: string;
      domain: string;
      signature: string;
    }) => {
      return verifySignature(params);
    },
  });
}
