import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Wallet } from "lucide-react";

interface WalletConnectModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const wallets = [
  {
    name: "MetaMask",
    icon: "🦊",
    description: "Connect using MetaMask browser extension",
  },
  {
    name: "Phantom",
    icon: "👻",
    description: "Connect using Phantom wallet",
  },
  {
    name: "WalletConnect",
    icon: "🔗",
    description: "Scan QR code with mobile wallet",
  },
  {
    name: "Coinbase Wallet",
    icon: "🔵",
    description: "Connect using Coinbase Wallet",
  },
];

export const WalletConnectModal = ({
  open,
  onOpenChange,
}: WalletConnectModalProps) => {
  const handleConnect = (walletName: string) => {
    console.log(`Connecting to ${walletName}...`);
    // Simulate connection
    setTimeout(() => {
      onOpenChange(false);
    }, 500);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="glass-card border-primary/30 max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl font-orbitron flex items-center gap-2">
            <Wallet className="h-6 w-6 text-primary" />
            Connect Wallet
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-3 mt-4">
          {wallets.map((wallet, idx) => (
            <motion.div
              key={wallet.name}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.1 }}
            >
              <Button
                variant="outline"
                className="w-full justify-start h-auto p-4 border-border hover:border-primary/50 hover-neon-glow transition-all"
                onClick={() => handleConnect(wallet.name)}
              >
                <span className="text-3xl mr-3">{wallet.icon}</span>
                <div className="text-left">
                  <div className="font-semibold">{wallet.name}</div>
                  <div className="text-xs text-muted-foreground">
                    {wallet.description}
                  </div>
                </div>
              </Button>
            </motion.div>
          ))}
        </div>
        <p className="text-xs text-muted-foreground text-center mt-4">
          By connecting a wallet, you agree to our Terms of Service
        </p>
      </DialogContent>
    </Dialog>
  );
};
