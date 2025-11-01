import { SiteHeader } from "@/components/SiteHeader";
import { Footer } from "@/components/Footer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { motion } from "framer-motion";
import {
  Trophy,
  Twitter,
  ExternalLink,
  Wallet,
  Shield,
  Star,
  Edit2,
  Trash2,
  Loader2,
} from "lucide-react";
import { useDetailProfile } from "@/hooks/profile/useDetailProfile";
import { useState } from "react";
import { toast } from "sonner";

const Profile = () => {
  const { data, isLoading, refetch } = useDetailProfile();
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [newUsername, setNewUsername] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);
  const [deletingWalletId, setDeletingWalletId] = useState<number | null>(null);

  // Mock data untuk stats yang belum ada di API
  const statsData = {
    totalPoints: 12450,
    winStreak: 7,
    ownedNFTs: 3,
    totalPredictions: 48,
    winRate: 68.5,
    totalEarnings: 8240,
    rank: 42,
    level: 12,
    xp: 7840,
    nextLevelXp: 10000,
  };

  const handleUpdateUsername = async () => {
    if (!newUsername.trim()) {
      toast.error("Username cannot be empty");
      return;
    }

    setIsUpdating(true);
    try {
      // TODO: Implement actual API call
      // await updateProfile({ username: newUsername });

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      toast.success("Profile updated successfully");

      setIsEditDialogOpen(false);
      setNewUsername("");
      refetch();
    } catch (error) {
      toast.error("Failed to update profile");
    } finally {
      setIsUpdating(false);
    }
  };

  const handleDeleteWallet = async (walletId: number, isPrimary: boolean) => {
    if (isPrimary) {
      toast.error("You cannot delete your primary wallet");
      return;
    }

    setDeletingWalletId(walletId);
    try {
      // TODO: Implement actual API call
      // await deleteWallet(walletId);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      toast.success("Wallet deleted successfully");

      refetch();
    } catch (error) {
      toast.error("Failed to delete wallet");
    } finally {
      setDeletingWalletId(null);
    }
  };

  const truncateAddress = (address: string) => {
    if (!address) return "";
    return `${address.substring(0, 6)}...${address.substring(
      address.length - 4
    )}`;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  const profile = data?.profile;
  if (!profile) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 flex items-center justify-center">
        <p className="text-muted-foreground">Profile not found</p>
      </div>
    );
  }

  const xpPercentage = (statsData.xp / statsData.nextLevelXp) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <SiteHeader />

      <main className="flex-1">
        <div className="container mx-auto px-4 py-6">
          {/* Hero Section - Split Design */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid lg:grid-cols-12 gap-6 mb-6"
          >
            {/* Left - Profile Card */}
            <div className="lg:col-span-4">
              <div className="glass-card rounded-2xl border border-border p-6 h-full bg-gradient-to-br from-primary/10 to-transparent">
                {/* Avatar & Username */}
                <div className="flex flex-col items-center mb-6">
                  <div className="relative mb-4">
                    <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-4xl font-bold">
                      {profile.username?.charAt(0).toUpperCase() || "U"}
                    </div>
                    <div className="absolute -bottom-2 -right-2 w-10 h-10 rounded-full bg-accent border-4 border-background flex items-center justify-center">
                      <Shield className="h-5 w-5 text-background" />
                    </div>
                  </div>

                  <div className="flex items-center gap-2 mb-1">
                    <h2 className="font-orbitron text-2xl font-bold text-glow-red">
                      {profile.username || profile.handle}
                    </h2>
                    <Dialog
                      open={isEditDialogOpen}
                      onOpenChange={setIsEditDialogOpen}
                    >
                      <DialogTrigger asChild>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0"
                          onClick={() => setNewUsername(profile.username || "")}
                        >
                          <Edit2 className="h-4 w-4" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Edit Profile Name</DialogTitle>
                          <DialogDescription>
                            Update your display name. This will be visible to
                            other users.
                          </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4 py-4">
                          <div className="space-y-2">
                            <label className="text-sm font-medium">
                              Username
                            </label>
                            <Input
                              value={newUsername}
                              onChange={(e) => setNewUsername(e.target.value)}
                              placeholder="Enter new username"
                              disabled={isUpdating}
                            />
                          </div>
                        </div>
                        <DialogFooter>
                          <Button
                            variant="outline"
                            onClick={() => setIsEditDialogOpen(false)}
                            disabled={isUpdating}
                          >
                            Cancel
                          </Button>
                          <Button
                            onClick={handleUpdateUsername}
                            disabled={isUpdating}
                          >
                            {isUpdating ? (
                              <>
                                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                                Updating...
                              </>
                            ) : (
                              "Save Changes"
                            )}
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </div>

                  <Badge variant="secondary" className="mb-2">
                    @{profile.handle}
                  </Badge>

                  <p className="font-mono text-sm text-muted-foreground">
                    {truncateAddress(profile.primaryWallet?.address || "")}
                  </p>
                </div>

                {/* Level Progress */}
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Star className="h-4 w-4 text-accent" />
                      <span className="font-orbitron text-sm font-semibold">
                        Level {statsData.level}
                      </span>
                    </div>
                    <span className="text-xs text-muted-foreground">
                      {statsData.xp} / {statsData.nextLevelXp} XP
                    </span>
                  </div>
                  <div className="w-full bg-muted/20 rounded-full h-2 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${xpPercentage}%` }}
                      transition={{ duration: 1, delay: 0.2 }}
                      className="h-full bg-gradient-to-r from-accent to-primary rounded-full"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-3 rounded-lg border border-border bg-muted/5">
                    <div className="flex items-center gap-2">
                      <Twitter className="h-4 w-4 text-blue-400" />
                      <span className="text-sm font-medium">Twitter</span>
                    </div>
                    <Button variant="ghost" size="sm" className="text-xs">
                      Connect
                    </Button>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-lg border border-border bg-muted/5">
                    <div className="flex items-center gap-2">
                      <Trophy className="h-4 w-4 text-accent" />
                      <span className="text-sm font-medium">Oracle</span>
                    </div>
                    <Button variant="ghost" size="sm" className="text-xs">
                      Connect
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-8 space-y-4">
              <div className="glass-card rounded-xl border border-border p-5">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-orbitron text-lg font-bold flex items-center gap-2">
                    <Wallet className="h-5 w-5 text-primary" />
                    Connected Wallets
                  </h3>
                  <Button variant="outline" size="sm">
                    <Wallet className="h-4 w-4 mr-2" />
                    Add Wallet
                  </Button>
                </div>

                <div className="space-y-2">
                  {profile.wallets?.map((wallet, idx) => (
                    <motion.div
                      key={wallet.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      className="flex items-center justify-between p-3 rounded-lg bg-muted/10 border border-border hover:border-primary/30 transition-all"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 border border-primary/30 flex items-center justify-center">
                          <span className="text-xs font-bold">
                            {wallet.chains.name.substring(0, 2).toUpperCase()}
                          </span>
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <p className="font-mono text-sm font-semibold">
                              {truncateAddress(wallet.address)}
                            </p>
                            <Shield className="h-3 w-3 text-green-400" />
                          </div>
                          <p className="text-xs text-muted-foreground">
                            {wallet.chains.name}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {wallet.is_primary && (
                          <Badge variant="default" className="text-xs">
                            Primary
                          </Badge>
                        )}
                        <Button variant="ghost" size="sm">
                          <ExternalLink className="h-4 w-4" />
                        </Button>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button
                              variant="ghost"
                              size="sm"
                              disabled={
                                wallet.is_primary ||
                                deletingWalletId === wallet.id
                              }
                            >
                              {deletingWalletId === wallet.id ? (
                                <Loader2 className="h-4 w-4 animate-spin" />
                              ) : (
                                <Trash2 className="h-4 w-4 text-destructive" />
                              )}
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Delete Wallet</AlertDialogTitle>
                              <AlertDialogDescription>
                                Are you sure you want to delete this wallet?
                                This action cannot be undone.
                                <div className="mt-4 p-3 bg-muted rounded-lg">
                                  <p className="font-mono text-sm">
                                    {wallet.address}
                                  </p>
                                  <p className="text-xs text-muted-foreground mt-1">
                                    {wallet.chains.name}
                                  </p>
                                </div>
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() =>
                                  handleDeleteWallet(
                                    wallet.id,
                                    wallet.is_primary
                                  )
                                }
                                className="bg-destructive hover:bg-destructive/90"
                              >
                                Delete
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Profile;
