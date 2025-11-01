import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Wallet,
  Menu,
  X,
  User,
  LogOut,
  Bell,
  Loader2,
  AlertCircle,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useWeb3Modal } from "@web3modal/ethers/react";
import { useWalletAuth } from "@/hooks/auth/useWalletAuth";
import { formatAddress, getChainName } from "@/utils/format";
import { navLinks } from "@/constants";

export const SiteHeader = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [unreadNotifications] = useState(3);

  const {
    address,
    chainId,
    isConnected,
    isAuthenticated,
    isAuthenticating,
    authError,
    disconnect,
  } = useWalletAuth();
  console.log(chainId);
  const { open } = useWeb3Modal();

  return (
    <header className="sticky top-0 z-50 w-full glass-card border-b border-border">
      <nav className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <svg
            width="32"
            height="32"
            viewBox="0 0 32 32"
            fill="none"
            className="transition-transform group-hover:scale-110 duration-normal"
          >
            <path
              d="M16 2L4 8v8c0 7.5 5.2 14.5 12 16 6.8-1.5 12-8.5 12-16V8l-12-6z"
              fill="url(#logo-gradient)"
            />
            <defs>
              <linearGradient id="logo-gradient" x1="4" y1="2" x2="28" y2="26">
                <stop stopColor="hsl(var(--primary))" />
                <stop offset="1" stopColor="hsl(var(--secondary))" />
              </linearGradient>
            </defs>
          </svg>
          <span className="font-orbitron text-xl font-bold text-glow-red">
            moodz.fun
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors hover:text-glow-red"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Wallet Section */}
        <div className="flex items-center gap-3">
          {isAuthenticated && isConnected ? (
            <>
              {/* Notifications */}
              <Button
                asChild
                variant="ghost"
                size="sm"
                className="hidden sm:flex relative hover:bg-primary/10"
              >
                <Link to="/notifications">
                  <Bell className="h-4 w-4" />
                  {unreadNotifications > 0 && (
                    <Badge
                      variant="destructive"
                      className="absolute -top-1 -right-1 h-4 w-4 rounded-full p-0 flex items-center justify-center text-[10px]"
                    >
                      {unreadNotifications}
                    </Badge>
                  )}
                </Link>
              </Button>

              {/* Wallet Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    className="hidden sm:flex items-center gap-2 border-primary/50 hover:border-primary hover-neon-glow"
                  >
                    <Wallet className="h-4 w-4" />
                    {formatAddress(address!)}
                    <Badge
                      variant="secondary"
                      className="ml-1 text-[10px] px-1.5"
                    >
                      {getChainName(chainId!)}
                    </Badge>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="end"
                  className="glass-card border-border w-56"
                >
                  <div className="px-2 py-1.5">
                    <p className="text-xs text-muted-foreground">
                      Connected with
                    </p>
                    <p className="text-sm font-mono font-semibold">
                      {formatAddress(address!)}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {getChainName(chainId!)}
                    </p>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link
                      to="/me"
                      className="flex items-center gap-2 cursor-pointer"
                    >
                      <User className="h-4 w-4" />
                      Profile
                    </Link>
                  </DropdownMenuItem>
                  {/* <DropdownMenuItem asChild>
                    <Link
                      to="/b2b/console"
                      className="flex items-center gap-2 cursor-pointer"
                    >
                      <Settings className="h-4 w-4" />
                      Manage API Keys
                    </Link>
                  </DropdownMenuItem> */}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={disconnect}
                    className="text-destructive cursor-pointer"
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Disconnect
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <Button
              variant="outline"
              size="sm"
              className="hidden sm:flex items-center gap-2 border-primary/50 hover:border-primary hover-neon-glow"
              onClick={() => open()}
              disabled={isAuthenticating}
            >
              {isAuthenticating ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Authenticating...
                </>
              ) : (
                <>
                  <Wallet className="h-4 w-4" />
                  Connect Wallet
                </>
              )}
            </Button>
          )}

          {/* Mobile menu toggle */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X /> : <Menu />}
          </Button>
        </div>
      </nav>

      {/* Auth Error Banner */}
      {authError && (
        <div className="border-t border-border bg-destructive/10 px-4 py-2">
          <div className="container mx-auto flex items-center gap-2 text-sm text-destructive">
            <AlertCircle className="h-4 w-4" />
            <span>{authError}</span>
          </div>
        </div>
      )}

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-border glass-card"
          >
            <div className="container mx-auto px-4 py-4 flex flex-col gap-3">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className="text-sm font-medium text-foreground/80 hover:text-foreground py-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <Button
                variant="outline"
                size="sm"
                className="w-full border-primary/50 hover:border-primary"
                onClick={() => {
                  if (isAuthenticated) {
                    disconnect();
                  } else {
                    open();
                  }
                  setMobileMenuOpen(false);
                }}
                disabled={isAuthenticating}
              >
                {isAuthenticating ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Authenticating...
                  </>
                ) : isAuthenticated && address ? (
                  <>
                    <Wallet className="h-4 w-4 mr-2" />
                    {formatAddress(address)}
                  </>
                ) : (
                  <>
                    <Wallet className="h-4 w-4 mr-2" />
                    Connect Wallet
                  </>
                )}
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default SiteHeader;
