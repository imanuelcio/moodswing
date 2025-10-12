import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Wallet, Menu, X, User, Settings, LogOut, Bell } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { ChainSelector } from "./ChainSelector";
import { WalletConnectModal } from "./WalletConnectModal";

export const SiteHeader = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [walletConnected, setWalletConnected] = useState(true);
  const [walletModalOpen, setWalletModalOpen] = useState(false);
  const [unreadNotifications] = useState(3);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/markets", label: "Markets" },
    { href: "/leaderboards", label: "Leaderboards" },
    { href: "/mint", label: "List NFT" },
    { href: "/dashboard", label: "Dashboard" },
    { href: "/api-keys", label: "API Keys" },
    { href: "/docs", label: "Docs" },
  ];

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
            MOOD SWING
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

        {/* Chain + Wallet + Notifications + Profile */}
        <div className="flex items-center gap-3">
          <ChainSelector />

          {walletConnected ? (
            <>
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
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    className="hidden sm:flex items-center gap-2 border-primary/50 hover:border-primary hover-neon-glow"
                  >
                    <Wallet className="h-4 w-4" />
                    0x7a4b...3f9c
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="end"
                  className="glass-card border-border"
                >
                  <DropdownMenuItem asChild>
                    <Link
                      to="/me"
                      className="flex items-center gap-2 cursor-pointer"
                    >
                      <User className="h-4 w-4" />
                      Profile
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link
                      to="/b2b/console"
                      className="flex items-center gap-2 cursor-pointer"
                    >
                      <Settings className="h-4 w-4" />
                      Manage API Keys
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={() => setWalletConnected(false)}
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
              onClick={() => setWalletModalOpen(true)}
            >
              <Wallet className="h-4 w-4" />
              Connect
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
                  if (walletConnected) {
                    setWalletConnected(false);
                  } else {
                    setWalletModalOpen(true);
                  }
                  setMobileMenuOpen(false);
                }}
              >
                <Wallet className="h-4 w-4 mr-2" />
                {walletConnected ? "0x7a4b...3f9c" : "Connect Wallet"}
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <WalletConnectModal
        open={walletModalOpen}
        onOpenChange={setWalletModalOpen}
      />
    </header>
  );
};
