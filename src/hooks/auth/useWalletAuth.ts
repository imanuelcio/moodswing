import { useState, useEffect } from "react";
import {
  useWeb3ModalAccount,
  useWeb3ModalProvider,
  useDisconnect,
} from "@web3modal/ethers/react";
import { BrowserProvider } from "ethers";
import { useGenerateNonce, useVerifySignature } from "./useConnectWallet";
import { getMe } from "@/hooks/auth/api";

export function useWalletAuth() {
  const { address, chainId, isConnected } = useWeb3ModalAccount();
  const { walletProvider } = useWeb3ModalProvider();
  const { disconnect } = useDisconnect();

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const [hasCheckedSession, setHasCheckedSession] = useState(false);

  const generateNonce = useGenerateNonce();
  const verifySignature = useVerifySignature();
  const CHAIN_KIND: "ethereum" | "solana" = "ethereum";

  // Check backend session on mount
  useEffect(() => {
    const checkSession = async () => {
      try {
        const profile = await getMe(); // API call dengan credentials: 'include'

        if (profile && profile.wallet?.address) {
          // Session valid di backend
          const authData = {
            address: profile.wallet.address,
            authenticated: true,
            timestamp: new Date().toISOString(),
          };
          localStorage.setItem("wallet_auth", JSON.stringify(authData));
          setIsAuthenticated(true);
          setHasCheckedSession(true);
          return;
        }
      } catch (e) {
        console.log("No valid session found");
      }

      // Jika tidak ada session, cek localStorage
      const stored = localStorage.getItem("wallet_auth");
      if (stored) {
        try {
          const data = JSON.parse(stored);
          // Validate timestamp (optional: tambah expiry check)
          const timestamp = new Date(data.timestamp);
          const now = new Date();
          const hoursSinceAuth =
            (now.getTime() - timestamp.getTime()) / (1000 * 60 * 60);

          if (
            data.address === address &&
            data.authenticated &&
            hoursSinceAuth < 24 * 30
          ) {
            setIsAuthenticated(true);
          } else {
            localStorage.removeItem("wallet_auth");
          }
        } catch (e) {
          localStorage.removeItem("wallet_auth");
        }
      }

      setHasCheckedSession(true);
    };

    checkSession();
  }, []); // Hanya run sekali saat mount

  // Authenticate hanya jika belum authenticated dan sudah check session
  useEffect(() => {
    if (
      isConnected &&
      address &&
      !isAuthenticated &&
      !isAuthenticating &&
      hasCheckedSession // Pastikan sudah check session dulu
    ) {
      authenticateWallet();
    }
  }, [isConnected, address, isAuthenticated, hasCheckedSession]);

  const authenticateWallet = async () => {
    if (!address || !walletProvider) return;

    setIsAuthenticating(true);
    setAuthError(null);

    try {
      const provider = new BrowserProvider(walletProvider);
      const domain = window.location.hostname;

      const nonceResult = await generateNonce.mutateAsync({
        address,
        chainKind: CHAIN_KIND,
        domain,
      });

      if (!nonceResult || !nonceResult.message) {
        throw new Error("Failed to generate nonce");
      }

      const { nonce, message } = nonceResult;

      const signer = await provider.getSigner();
      const signature = await signer.signMessage(message);

      const verifyResult = await verifySignature.mutateAsync({
        address,
        chainKind: CHAIN_KIND,
        nonce,
        signature,
        domain,
      });

      if (verifyResult?.success !== true) {
        const serverMsg =
          verifyResult?.error?.message ||
          verifyResult?.message ||
          "Failed to verify signature";
        throw new Error(serverMsg);
      }

      // Success - store auth
      const authData = {
        address,
        chainId,
        authenticated: true,
        timestamp: new Date().toISOString(),
      };
      localStorage.setItem("wallet_auth", JSON.stringify(authData));
      setIsAuthenticated(true);
    } catch (error: any) {
      console.error("Authentication error:", error);
      setAuthError(error.message || "Failed to authenticate");
      // Disconnect on auth failure
      await disconnect();
    } finally {
      setIsAuthenticating(false);
    }
  };

  const handleDisconnect = async () => {
    localStorage.removeItem("wallet_auth");
    setIsAuthenticated(false);
    await disconnect();
  };

  return {
    address,
    chainId,
    isConnected,
    isAuthenticated,
    isAuthenticating,
    authError,
    disconnect: handleDisconnect,
  };
}
