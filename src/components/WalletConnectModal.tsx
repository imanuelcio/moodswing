import { useEffect, useRef } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Loader2,
  AlertCircle,
  Wallet,
  CheckCircle2,
  ExternalLink,
} from "lucide-react";
import { useWalletAuth } from "@/hooks/auth/useWalletAuth";

interface WalletConnectModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function WalletConnectModal({
  open,
  onOpenChange,
}: WalletConnectModalProps) {
  const { wallets, select, connected } = useWallet();
  const {
    isAuthenticated,
    publicKey,
    isAuthenticating,
    authError,
    authenticate,
    clearError,
  } = useWalletAuth();
  // const hasUserInitiatedConnection = useRef(false);
  useEffect(() => {
    // Only trigger auth once when conditions are met
    if (
      open &&
      connected &&
      publicKey &&
      !isAuthenticated &&
      !isAuthenticating &&
      !authError // Don't auto-authenticate if there's an error
    ) {
      console.log("✅ Starting auth...");
      authenticate();
    }
  }, [
    open,
    connected,
    publicKey?.toString(),
    isAuthenticated,
    isAuthenticating,
    authError,
    authenticate,
  ]);

  useEffect(() => {
    if (isAuthenticated && open) {
      console.log("✅ Authenticated, closing modal in 500ms...");
      const timer = setTimeout(() => {
        onOpenChange(false);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [isAuthenticated, open, onOpenChange]);

  const handleOpenChange = (newOpen: boolean) => {
    if (!newOpen) {
      clearError();
    }
    onOpenChange(newOpen);
  };

  const handleWalletSelect = async (walletName: any) => {
    try {
      console.log("📱 Selecting wallet:", walletName);
      select(walletName);

      const walletInstance = wallets.find((w) => w.adapter.name === walletName);
      if (!walletInstance) throw new Error("Wallet not found");

      if (!connected) {
        console.log("🔌 Connecting wallet adapter...");
        await walletInstance.adapter.connect();
      }

      // Tunggu sebentar agar publicKey tersedia
      setTimeout(() => {
        if (connected && publicKey && !isAuthenticated) {
          console.log("🔄 Starting authentication after connection...");
          authenticate();
        }
      }, 100);
    } catch (error: any) {
      console.error("Failed to connect wallet:", error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="glass-card border-border sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Wallet className="h-5 w-5 text-primary" />
            Connect Your Wallet
          </DialogTitle>
          <DialogDescription>
            {isAuthenticating
              ? "Please approve the signature request in your wallet..."
              : isAuthenticated
              ? "Successfully authenticated!"
              : "Choose a wallet to connect to moodz.fun"}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {/* Loading State - Authenticating */}
          {isAuthenticating && (
            <Alert className="border-primary/50 bg-primary/5">
              <Loader2 className="h-4 w-4 animate-spin text-primary" />
              <AlertDescription className="ml-2">
                Waiting for signature approval...
              </AlertDescription>
            </Alert>
          )}

          {/* Error State */}
          {authError && !isAuthenticating && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription className="ml-2">{authError}</AlertDescription>
            </Alert>
          )}

          {/* Success State */}
          {isAuthenticated && (
            <Alert className="border-green-500/50 bg-green-500/5">
              <CheckCircle2 className="h-4 w-4 text-green-500" />
              <AlertDescription className="ml-2 text-green-500">
                Successfully authenticated! Closing...
              </AlertDescription>
            </Alert>
          )}

          {!isAuthenticated && (
            <div className="flex flex-col gap-3">
              {/* Available Wallets List */}
              {wallets.length > 0 ? (
                <div className="space-y-2">
                  {wallets
                    .filter((wallet) => wallet.readyState === "Installed")
                    .map((wallet) => (
                      <Button
                        key={wallet.adapter.name}
                        onClick={() => handleWalletSelect(wallet.adapter.name)}
                        disabled={isAuthenticating || connected}
                        variant="outline"
                        className="w-full justify-start h-12 text-base font-medium hover:bg-primary/10 hover:border-primary transition-colors"
                      >
                        {wallet.adapter.icon && (
                          <img
                            src={wallet.adapter.icon}
                            alt={wallet.adapter.name}
                            className="h-6 w-6 mr-3"
                          />
                        )}
                        <span className="flex-1 text-left">
                          {wallet.adapter.name}
                        </span>
                        {connected && (
                          <CheckCircle2 className="h-4 w-4 text-green-500" />
                        )}
                      </Button>
                    ))}

                  {/* Not Installed Wallets */}
                  {wallets
                    .filter((wallet) => wallet.readyState !== "Installed")
                    .map((wallet) => (
                      <Button
                        key={wallet.adapter.name}
                        onClick={() =>
                          window.open(wallet.adapter.url, "_blank")
                        }
                        variant="outline"
                        className="w-full justify-start h-12 text-base font-medium opacity-60 hover:opacity-100 transition-opacity"
                      >
                        {wallet.adapter.icon && (
                          <img
                            src={wallet.adapter.icon}
                            alt={wallet.adapter.name}
                            className="h-6 w-6 mr-3"
                          />
                        )}
                        <span className="flex-1 text-left">
                          {wallet.adapter.name}
                        </span>
                        <ExternalLink className="h-4 w-4 text-muted-foreground" />
                      </Button>
                    ))}
                </div>
              ) : (
                <div className="text-center py-6 text-muted-foreground">
                  <p className="text-sm">No wallets detected</p>
                  <p className="text-xs mt-2">
                    Please install a Solana wallet extension
                  </p>
                </div>
              )}

              {/* Retry button if error and wallet connected */}
              {authError && connected && !isAuthenticating && (
                <Button
                  onClick={() => {
                    clearError();
                    authenticate();
                  }}
                  variant="default"
                  className="w-full bg-primary hover:bg-primary/90"
                >
                  Try Again
                </Button>
              )}
            </div>
          )}

          {/* Info */}
          <div className="text-xs text-muted-foreground space-y-2 pt-2 border-t border-border">
            <p>
              By connecting your wallet, you agree to sign a message to verify
              wallet ownership.
            </p>
            <p className="flex items-start gap-2">
              <span className="text-primary">•</span>
              <span>
                This signature is free and does not involve any transaction.
              </span>
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
