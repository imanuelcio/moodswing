import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuLabel,
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
  ChevronDown,
  Sparkles,
  TrendingUp,
  Trophy,
  Coins,
  Gift,
  Vote,
  BookOpen,
  BarChart3,
  Settings,
  Home,
  Rocket,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useWeb3Modal } from "@web3modal/ethers/react";
import { useWalletAuth } from "@/hooks/auth/useWalletAuth";
import { formatAddress, getChainName } from "@/utils/format";

// Navigation structure - organized by categories
const navigationConfig = {
  main: [
    {
      label: "Home",
      href: "/",
      icon: Home,
      available: true,
    },
    {
      label: "Markets",
      href: "/markets",
      icon: TrendingUp,
      available: true,
      badge: "Live",
    },
    {
      label: "Leaderboard",
      href: "/leaderboards",
      icon: Trophy,
      available: true,
    },
  ],

  nft: {
    label: "NFT & Points",
    icon: Sparkles,
    items: [
      {
        label: "Mint NFT",
        href: "/mint",
        icon: Sparkles,
        available: true,
        description: "Get Sentimentals NFT",
      },
      {
        label: "Dashboard",
        href: "/dashboard",
        icon: BarChart3,
        available: false,
        description: "Points & rewards",
      },
      {
        label: "Staking",
        href: "/staking",
        icon: Coins,
        available: false,
        badge: "Coming Soon",
        description: "Stake SFI for APR",
      },
    ],
  },

  earn: {
    label: "Earn",
    icon: Gift,
    items: [
      {
        label: "Creator Tips",
        href: "/creators",
        icon: Gift,
        available: false,
        description: "Support creators, earn bonus",
      },
      {
        label: "Governance",
        href: "/governance",
        icon: Vote,
        available: false,
        description: "Vote on proposals",
      },
    ],
  },

  account: [
    {
      label: "Profile",
      href: "/me",
      icon: User,
      available: true,
    },
    {
      label: "Settings",
      href: "/settings",
      icon: Settings,
      available: false,
    },
  ],

  resources: [
    {
      label: "Docs",
      href: "/docs",
      icon: BookOpen,
      available: false,
    },
    {
      label: "API",
      href: "/api-keys",
      icon: BarChart3,
      available: false,
    },
  ],
};

export const SiteHeader = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [unreadNotifications] = useState(3);
  const location = useLocation();

  const {
    address,
    chainId,
    isConnected,
    isAuthenticated,
    isAuthenticating,
    authError,
    disconnect,
  } = useWalletAuth();
  const { open } = useWeb3Modal();

  const isActiveLink = (href: string) => {
    if (href === "/") return location.pathname === "/";
    return location.pathname.startsWith(href);
  };

  return (
    <header className="sticky top-0 z-50 w-full glass-card border-b border-border backdrop-blur-xl">
      <nav className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <img
            src="/logo.jpg"
            alt="Moodz Logo"
            className="h-8 w-8 rounded-sm"
          />
          <span className="font-orbitron text-xl font-bold text-glow-red">
            moodz.fun
          </span>
        </Link>

        {/* Desktop Nav - Horizontal with Dropdowns */}
        <div className="hidden lg:flex items-center gap-1">
          {/* Main Navigation Links */}
          {navigationConfig.main.map((link) => {
            const Icon = link.icon;
            const isActive = isActiveLink(link.href);

            if (!link.available) {
              return (
                <div
                  key={link.href}
                  className="relative px-3 py-2 text-sm font-medium text-muted-foreground/50 cursor-not-allowed flex items-center gap-2"
                >
                  <Icon className="h-4 w-4" />
                  {link.label}
                  <Badge variant="outline" className="text-[10px] px-1.5 ml-1">
                    Soon
                  </Badge>
                </div>
              );
            }

            return (
              <Link
                key={link.href}
                to={link.href}
                className={`relative px-3 py-2 text-sm font-medium transition-colors hover:text-foreground flex items-center gap-2 rounded-md ${
                  isActive
                    ? "text-primary bg-primary/10"
                    : "text-foreground/80 hover:bg-accent"
                }`}
              >
                <Icon className="h-4 w-4" />
                {link.label}
                {link.badge && (
                  <Badge
                    variant="secondary"
                    className="text-[10px] px-1.5 ml-1"
                  >
                    {link.badge}
                  </Badge>
                )}
              </Link>
            );
          })}

          {/* NFT & Points Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="h-9 px-3 text-sm font-medium text-foreground/80 hover:text-foreground hover:bg-accent"
              >
                <navigationConfig.nft.icon className="h-4 w-4 mr-2" />
                {navigationConfig.nft.label}
                <ChevronDown className="h-3 w-3 ml-1 opacity-50" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="start"
              className="glass-card border-border w-64"
            >
              <DropdownMenuLabel className="text-xs text-muted-foreground">
                NFT & Points
              </DropdownMenuLabel>
              {navigationConfig.nft.items.map((item) => {
                const ItemIcon = item.icon;

                if (!item.available) {
                  return (
                    <DropdownMenuItem
                      key={item.href}
                      disabled
                      className="cursor-not-allowed opacity-50"
                    >
                      <div className="flex items-start gap-3 py-1">
                        <ItemIcon className="h-4 w-4 mt-0.5 text-muted-foreground" />
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-medium">
                              {item.label}
                            </span>
                            {item.badge && (
                              <Badge
                                variant="outline"
                                className="text-[10px] px-1.5"
                              >
                                {item.badge}
                              </Badge>
                            )}
                          </div>
                          {item.description && (
                            <p className="text-xs text-muted-foreground mt-0.5">
                              {item.description}
                            </p>
                          )}
                        </div>
                      </div>
                    </DropdownMenuItem>
                  );
                }

                return (
                  <DropdownMenuItem key={item.href} asChild>
                    <Link to={item.href} className="cursor-pointer">
                      <div className="flex items-start gap-3 py-1">
                        <ItemIcon className="h-4 w-4 mt-0.5" />
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-medium">
                              {item.label}
                            </span>
                            {item.badge && (
                              <Badge
                                variant="secondary"
                                className="text-[10px] px-1.5"
                              >
                                {item.badge}
                              </Badge>
                            )}
                          </div>
                          {item.description && (
                            <p className="text-xs text-muted-foreground mt-0.5">
                              {item.description}
                            </p>
                          )}
                        </div>
                      </div>
                    </Link>
                  </DropdownMenuItem>
                );
              })}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Earn Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="h-9 px-3 text-sm font-medium text-foreground/80 hover:text-foreground hover:bg-accent"
              >
                <navigationConfig.earn.icon className="h-4 w-4 mr-2" />
                {navigationConfig.earn.label}
                <ChevronDown className="h-3 w-3 ml-1 opacity-50" />
                <Badge variant="outline" className="text-[10px] px-1.5 ml-2">
                  Soon
                </Badge>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="start"
              className="glass-card border-border w-64"
            >
              <DropdownMenuLabel className="text-xs text-muted-foreground">
                Earn More
              </DropdownMenuLabel>
              {navigationConfig.earn.items.map((item) => {
                const ItemIcon = item.icon;

                return (
                  <DropdownMenuItem
                    key={item.href}
                    disabled
                    className="cursor-not-allowed opacity-50"
                  >
                    <div className="flex items-start gap-3 py-1">
                      <ItemIcon className="h-4 w-4 mt-0.5 text-muted-foreground" />
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium">
                            {item.label}
                          </span>
                          {/* {item.badge && (
                            <Badge
                              variant="outline"
                              className="text-[10px] px-1.5"
                            >
                              {item.badge}
                            </Badge>
                          )} */}
                        </div>
                        {item.description && (
                          <p className="text-xs text-muted-foreground mt-0.5">
                            {item.description}
                          </p>
                        )}
                      </div>
                    </div>
                  </DropdownMenuItem>
                );
              })}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Right Section - Wallet & Actions */}
        <div className="flex items-center gap-2">
          {isAuthenticated && isConnected ? (
            <>
              {/* Notifications */}
              <Button
                variant="ghost"
                size="icon"
                className="hidden sm:flex relative hover:bg-primary/10 h-9 w-9"
                asChild
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
                    className="hidden sm:flex items-center gap-2 border-primary/50 hover:border-primary hover-neon-glow h-9"
                  >
                    <Wallet className="h-4 w-4" />
                    <span className="hidden md:inline">
                      {formatAddress(address!)}
                    </span>
                    <Badge
                      variant="secondary"
                      className="text-[10px] px-1.5 hidden lg:inline-flex"
                    >
                      {getChainName(chainId!)}
                    </Badge>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="end"
                  className="glass-card border-border w-56"
                >
                  <div className="px-2 py-2">
                    <p className="text-xs text-muted-foreground">
                      Connected wallet
                    </p>
                    <p className="text-sm font-mono font-semibold mt-1">
                      {formatAddress(address!)}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {getChainName(chainId!)}
                    </p>
                  </div>
                  <DropdownMenuSeparator />

                  <DropdownMenuLabel className="text-xs text-muted-foreground">
                    Account
                  </DropdownMenuLabel>
                  {navigationConfig.account.map((item) => {
                    const ItemIcon = item.icon;

                    if (!item.available) {
                      return (
                        <DropdownMenuItem
                          key={item.href}
                          disabled
                          className="cursor-not-allowed opacity-50"
                        >
                          <ItemIcon className="h-4 w-4 mr-2" />
                          {item.label}
                          <Badge
                            variant="outline"
                            className="text-[10px] px-1.5 ml-auto"
                          >
                            Soon
                          </Badge>
                        </DropdownMenuItem>
                      );
                    }

                    return (
                      <DropdownMenuItem key={item.href} asChild>
                        <Link
                          to={item.href}
                          className="flex items-center gap-2 cursor-pointer"
                        >
                          <ItemIcon className="h-4 w-4" />
                          {item.label}
                        </Link>
                      </DropdownMenuItem>
                    );
                  })}

                  <DropdownMenuSeparator />

                  <DropdownMenuLabel className="text-xs text-muted-foreground">
                    Resources
                  </DropdownMenuLabel>
                  {navigationConfig.resources.map((item) => {
                    const ItemIcon = item.icon;

                    return (
                      <DropdownMenuItem
                        key={item.href}
                        disabled
                        className="cursor-not-allowed opacity-50"
                      >
                        <ItemIcon className="h-4 w-4 mr-2" />
                        {item.label}
                        <Badge
                          variant="outline"
                          className="text-[10px] px-1.5 ml-auto"
                        >
                          Soon
                        </Badge>
                      </DropdownMenuItem>
                    );
                  })}

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
              className="hidden sm:flex items-center gap-2 border-primary/50 hover:border-primary hover-neon-glow h-9"
              onClick={() => open()}
              disabled={isAuthenticating}
            >
              {isAuthenticating ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span className="hidden md:inline">Authenticating...</span>
                </>
              ) : (
                <>
                  <Wallet className="h-4 w-4" />
                  <span className="hidden md:inline">Connect Wallet</span>
                </>
              )}
            </Button>
          )}

          {/* Mobile menu toggle */}
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden h-9 w-9"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
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
            className="lg:hidden border-t border-border glass-card overflow-hidden"
          >
            <div className="container mx-auto px-4 py-4 flex flex-col gap-1 max-h-[80vh] overflow-y-auto">
              {/* Main Links */}
              <div className="space-y-1 pb-3 border-b border-border">
                {navigationConfig.main.map((link) => {
                  const Icon = link.icon;
                  const isActive = isActiveLink(link.href);

                  if (!link.available) {
                    return (
                      <div
                        key={link.href}
                        className="flex items-center gap-3 px-3 py-2.5 text-sm text-muted-foreground/50 rounded-md"
                      >
                        <Icon className="h-4 w-4" />
                        <span className="flex-1">{link.label}</span>
                        <Badge variant="outline" className="text-[10px] px-1.5">
                          Soon
                        </Badge>
                      </div>
                    );
                  }

                  return (
                    <Link
                      key={link.href}
                      to={link.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`flex items-center gap-3 px-3 py-2.5 text-sm rounded-md transition-colors ${
                        isActive
                          ? "text-primary bg-primary/10 font-medium"
                          : "text-foreground/80 hover:bg-accent"
                      }`}
                    >
                      <Icon className="h-4 w-4" />
                      <span className="flex-1">{link.label}</span>
                      {link.badge && (
                        <Badge
                          variant="secondary"
                          className="text-[10px] px-1.5"
                        >
                          {link.badge}
                        </Badge>
                      )}
                    </Link>
                  );
                })}
              </div>

              {/* NFT & Points Section */}
              <div className="space-y-1 py-3 border-b border-border">
                <div className="flex items-center gap-2 px-3 py-1 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  <navigationConfig.nft.icon className="h-3 w-3" />
                  {navigationConfig.nft.label}
                </div>
                {navigationConfig.nft.items.map((item) => {
                  const ItemIcon = item.icon;

                  if (!item.available) {
                    return (
                      <div
                        key={item.href}
                        className="flex items-start gap-3 px-3 py-2.5 text-sm text-muted-foreground/50 rounded-md"
                      >
                        <ItemIcon className="h-4 w-4 mt-0.5" />
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <span>{item.label}</span>
                            {item.badge && (
                              <Badge
                                variant="outline"
                                className="text-[10px] px-1.5"
                              >
                                {item.badge}
                              </Badge>
                            )}
                          </div>
                          {item.description && (
                            <p className="text-xs text-muted-foreground/70 mt-0.5">
                              {item.description}
                            </p>
                          )}
                        </div>
                      </div>
                    );
                  }

                  return (
                    <Link
                      key={item.href}
                      to={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-start gap-3 px-3 py-2.5 text-sm text-foreground/80 hover:bg-accent rounded-md transition-colors"
                    >
                      <ItemIcon className="h-4 w-4 mt-0.5" />
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span>{item.label}</span>
                          {item.badge && (
                            <Badge
                              variant="secondary"
                              className="text-[10px] px-1.5"
                            >
                              {item.badge}
                            </Badge>
                          )}
                        </div>
                        {item.description && (
                          <p className="text-xs text-muted-foreground mt-0.5">
                            {item.description}
                          </p>
                        )}
                      </div>
                    </Link>
                  );
                })}
              </div>

              {/* Earn Section */}
              <div className="space-y-1 py-3 border-b border-border">
                <div className="flex items-center gap-2 px-3 py-1 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  <navigationConfig.earn.icon className="h-3 w-3" />
                  {navigationConfig.earn.label}
                  <Badge
                    variant="outline"
                    className="text-[10px] px-1.5 ml-auto"
                  >
                    Soon
                  </Badge>
                </div>
                {navigationConfig.earn.items.map((item) => {
                  const ItemIcon = item.icon;

                  return (
                    <div
                      key={item.href}
                      className="flex items-start gap-3 px-3 py-2.5 text-sm text-muted-foreground/50 rounded-md"
                    >
                      <ItemIcon className="h-4 w-4 mt-0.5" />
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span>{item.label}</span>
                          {/* {item.badge && (
                            <Badge
                              variant="outline"
                              className="text-[10px] px-1.5"
                            >
                              {item.badge}
                            </Badge>
                          )} */}
                        </div>
                        {item.description && (
                          <p className="text-xs text-muted-foreground/70 mt-0.5">
                            {item.description}
                          </p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Wallet Button - Mobile */}
              <div className="pt-3">
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full border-primary/50 hover:border-primary justify-start"
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
                      <Badge
                        variant="secondary"
                        className="text-[10px] px-1.5 ml-auto"
                      >
                        {getChainName(chainId!)}
                      </Badge>
                    </>
                  ) : (
                    <>
                      <Wallet className="h-4 w-4 mr-2" />
                      Connect Wallet
                      <Rocket className="h-4 w-4 ml-auto" />
                    </>
                  )}
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default SiteHeader;
