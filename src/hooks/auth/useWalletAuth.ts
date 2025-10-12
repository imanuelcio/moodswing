import { useState, useEffect } from "react";
import {
  useWeb3ModalAccount,
  useWeb3ModalProvider,
  useDisconnect,
} from "@web3modal/ethers/react";
import { BrowserProvider } from "ethers";
import { useGenerateNonce, useVerifySignature } from "./useConnectWallet";

export function useWalletAuth() {
  const { address, chainId, isConnected } = useWeb3ModalAccount();
  const { walletProvider } = useWeb3ModalProvider();
  const { disconnect } = useDisconnect();

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);

  const generateNonce = useGenerateNonce();
  const verifySignature = useVerifySignature();

  // Check for existing auth on mount
  useEffect(() => {
    const stored = localStorage.getItem("wallet_auth");
    if (stored) {
      try {
        const data = JSON.parse(stored);
        if (data.address === address && data.authenticated) {
          setIsAuthenticated(true);
        }
      } catch (e) {
        localStorage.removeItem("wallet_auth");
      }
    }
  }, [address]);

  // Authenticate when wallet connects
  useEffect(() => {
    if (isConnected && address && !isAuthenticated && !isAuthenticating) {
      authenticateWallet();
    }
  }, [isConnected, address, isAuthenticated]);

  const authenticateWallet = async () => {
    if (!address || !walletProvider) return;

    setIsAuthenticating(true);
    setAuthError(null);

    try {
      const provider = new BrowserProvider(walletProvider);
      const domain = window.location.hostname;

      // Step 1: Generate nonce
      const nonceResult = await generateNonce.mutateAsync({
        address,
        chainKind: "evm",
        domain,
      });

      if (!nonceResult || !nonceResult.message) {
        throw new Error("Failed to generate nonce");
      }

      const { nonce, message } = nonceResult;

      // Step 2: Sign message
      const signer = await provider.getSigner();
      const signature = await signer.signMessage(message);

      // Step 3: Verify signature
      const verifyResult = await verifySignature.mutateAsync({
        address,
        chainKind: "evm",
        nonce,
        signature,
        domain,
      });

      if (!verifyResult.success) {
        throw new Error("Failed to verify signature");
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
