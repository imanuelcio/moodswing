import { useState, useEffect, useCallback, useRef } from "react";
import { useWallet, useConnection } from "@solana/wallet-adapter-react";
import { useGenerateNonce, useVerifySignature } from "./useConnectWallet";
import { getMe, logout } from "@/hooks/auth/api";

export function useWalletAuth() {
  const { publicKey, connected, disconnect, signMessage, wallet } = useWallet();
  const { connection } = useConnection();

  // States
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const [isCheckingSession, setIsCheckingSession] = useState(true);

  // User data state
  const [userData, setUserData] = useState<{
    id: string;
    handle: string;
    wallet: {
      address: string;
      chainKind: string;
    };
  } | null>(null);

  // Refs to prevent multiple attempts
  const hasCheckedSession = useRef(false);
  const authAttemptedRef = useRef(false);

  // Mutations
  const generateNonce = useGenerateNonce();
  const verifySignature = useVerifySignature();

  // Constants
  const CHAIN_KIND: "solana" = "solana";
  const AUTH_STORAGE_KEY = "wallet_auth_session";
  const SESSION_DURATION_HOURS = 24 * 30; // 30 days

  // Computed values
  const address = publicKey?.toString() ?? null;
  const chainId =
    (connection && (connection.rpcEndpoint || (connection as any).endpoint)) ||
    "solana";

  /**
   * Validate stored session data
   */
  const isValidSession = useCallback(
    (sessionData: any): boolean => {
      if (!sessionData || !address) return false;

      try {
        const timestamp = new Date(sessionData.timestamp);
        const now = new Date();
        const hoursSinceAuth =
          (now.getTime() - timestamp.getTime()) / (1000 * 60 * 60);

        return (
          sessionData.address === address &&
          sessionData.authenticated === true &&
          hoursSinceAuth < SESSION_DURATION_HOURS
        );
      } catch {
        return false;
      }
    },
    [address]
  );

  /**
   * Store authentication session
   */
  const storeSession = useCallback(() => {
    if (!address || !chainId) return;

    const sessionData = {
      address,
      chainId,
      authenticated: true,
      timestamp: new Date().toISOString(),
    };

    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(sessionData));
    console.log("✅ Session stored");
  }, [address, chainId]);

  /**
   * Clear authentication session
   */
  const clearSession = useCallback(() => {
    localStorage.removeItem(AUTH_STORAGE_KEY);
    setIsAuthenticated(false);
    setUserData(null);
    setAuthError(null);
    authAttemptedRef.current = false;
    console.log("🗑️ Session cleared");
  }, []);

  /**
   * Fetch user data from getMe API
   */
  const fetchUserData = useCallback(async (): Promise<boolean> => {
    try {
      const profile = await getMe();
      if (profile && profile.wallet?.address === address?.toLowerCase()) {
        setUserData(profile);
        setIsAuthenticated(true);
        storeSession();
        return true;
      }
      return false;
    } catch (error: any) {
      if (error?.response?.status === 401) {
        console.log("⚠️ getMe returned 401 - session expired");
      }
      return false;
    }
  }, [address, storeSession]);

  /**
   * Check for existing session ONLY on mount
   */
  useEffect(() => {
    const checkExistingSession = async () => {
      // Prevent multiple executions
      if (hasCheckedSession.current) return;
      hasCheckedSession.current = true;

      // No wallet connected
      if (!connected || !address) {
        clearSession();
        setIsCheckingSession(false);
        return;
      }

      // Try to fetch user data first
      const userDataFetched = await fetchUserData();
      if (userDataFetched) {
        setIsCheckingSession(false);
        return;
      }

      // If getMe failed, check localStorage session
      const stored = localStorage.getItem(AUTH_STORAGE_KEY);
      if (stored) {
        try {
          const sessionData = JSON.parse(stored);
          if (isValidSession(sessionData)) {
            console.log("✅ Local session valid, will fetch user data");
            // Try to fetch user data again (in case session is still valid but token was lost)
            const userDataFetchedAfterLocal = await fetchUserData();
            if (!userDataFetchedAfterLocal) {
              // If getMe fails but local session is valid, set as authenticated but try to refresh
              setIsAuthenticated(true);
            }
            setIsCheckingSession(false);
            return;
          }
        } catch {}
      }

      // No valid session
      console.log("ℹ️ No valid session");
      clearSession();
      setIsCheckingSession(false);
    };

    checkExistingSession();
  }, [connected, address, isValidSession, fetchUserData, clearSession]);
  // useEffect(() => {
  //   const fetchData = async () => {
  //     await fetchUserData();
  //   };

  //   fetchData();
  // }, []);

  /**
   * Convert Uint8Array to base64
   */
  const uint8ArrayToBase64 = (bytes: Uint8Array): string => {
    try {
      return btoa(String.fromCharCode(...bytes));
    } catch {
      return Buffer.from(bytes).toString("base64");
    }
  };

  /**
   * Extract signature bytes from wallet response
   */
  const extractSignatureBytes = (signed: any): Uint8Array => {
    if (signed instanceof Uint8Array) return signed;

    if (signed?.signature instanceof Uint8Array) return signed.signature;

    if (typeof signed?.signature === "string") {
      const binary = atob(signed.signature);
      const arr = new Uint8Array(binary.length);
      for (let i = 0; i < binary.length; i++) {
        arr[i] = binary.charCodeAt(i);
      }
      return arr;
    }

    if (signed instanceof ArrayBuffer) return new Uint8Array(signed);

    throw new Error("Unsupported signature format");
  };

  /**
   * Main authentication function - called manually
   */
  const authenticate = async (): Promise<boolean> => {
    if (!connected || !address || !publicKey) {
      setAuthError("Wallet not connected");
      return false;
    }

    if (isAuthenticating || authAttemptedRef.current) {
      console.log("⚠️ Already authenticating or already attempted...");
      return false;
    }

    setIsAuthenticating(true);
    setAuthError(null);
    authAttemptedRef.current = true;

    try {
      // Check wallet supports signing
      const signerFn = signMessage;
      if (!signerFn) {
        throw new Error("This wallet does not support message signing");
      }

      const domain = window.location.hostname;

      // Step 1: Generate nonce
      console.log("🔐 Generating nonce...");
      const nonceResult = await generateNonce.mutateAsync({
        address,
        chainKind: CHAIN_KIND,
        domain,
      });

      if (!nonceResult?.message) {
        throw new Error("Failed to generate nonce");
      }

      const { nonce, message } = nonceResult;

      // Step 2: Request signature
      console.log("📝 Requesting signature...");
      const encoder = new TextEncoder();
      const messageBytes = encoder.encode(message);

      let signed: any;
      try {
        signed = await signerFn(messageBytes);
      } catch (error: any) {
        if (
          error?.message?.includes("rejected") ||
          error?.message?.includes("declined") ||
          error?.message?.includes("cancelled") ||
          error?.message?.includes("User rejected")
        ) {
          throw new Error("Signature request was rejected");
        }
        throw error;
      }

      // Step 3: Extract and encode signature
      const signatureBytes = extractSignatureBytes(signed);
      const signatureBase64 = uint8ArrayToBase64(signatureBytes);

      // Step 4: Verify signature
      console.log("✅ Verifying signature...");
      const verifyResult = await verifySignature.mutateAsync({
        address,
        chainKind: CHAIN_KIND,
        nonce,
        signature: signatureBase64,
        domain,
      });

      if (!verifyResult?.success) {
        throw new Error(
          verifyResult?.error?.message || "Signature verification failed"
        );
      }

      // After successful verification, fetch user data from getMe
      console.log("Fetching user data after successful auth...");
      const userDataFetched = await fetchUserData();

      if (!userDataFetched) {
        throw new Error("Failed to fetch user data after authentication");
      }

      console.log("✅ Authentication successful with user data:", userData);
      return true;
    } catch (error: any) {
      console.error("❌ Authentication failed:", error);

      let errorMessage = "Authentication failed";

      if (error?.message?.includes("rejected")) {
        errorMessage = "You rejected the signature request";
      } else if (error?.message?.includes("not support")) {
        errorMessage = "This wallet does not support message signing";
      } else if (error?.message?.includes("nonce")) {
        errorMessage = "Failed to generate authentication nonce";
      } else if (error?.message) {
        errorMessage = error.message;
      }

      setAuthError(errorMessage);
      // Don't clear session here, let user retry
      return false;
    } finally {
      setIsAuthenticating(false);
    }
  };

  /**
   * Handle wallet disconnection
   */
  const handleDisconnect = async () => {
    console.log("🔌 Disconnecting wallet...");
    clearSession();

    try {
      await logout();
      console.log("✅ Backend logout successful");
    } catch (error) {
      console.warn("⚠️ Backend logout failed:", error);
    }

    try {
      if (disconnect) await disconnect();
      console.log("✅ Wallet disconnected");
    } catch (error) {
      console.warn("⚠️ Wallet disconnect failed:", error);
    }
  };

  // Reset auth attempt flag when wallet changes
  useEffect(() => {
    if (!connected) {
      authAttemptedRef.current = false;
    }
  }, [connected]);

  // Effect to update authentication status based on connection and user data
  useEffect(() => {
    if (
      connected &&
      address &&
      userData &&
      userData.wallet.address === address.toLowerCase()
    ) {
      setIsAuthenticated(true);
    } else if (!connected) {
      setIsAuthenticated(false);
      setUserData(null);
    }
  }, [connected, address, userData]);

  return {
    // Wallet info
    publicKey,
    wallet,
    address,
    chainId,
    isConnected: connected,

    // User data
    user: userData,

    // Auth state
    isAuthenticated,
    isAuthenticating,
    isCheckingSession,
    authError,

    // Actions
    authenticate,
    disconnect: handleDisconnect,
    clearError: () => {
      setAuthError(null);
      authAttemptedRef.current = false;
    },
  };
}
