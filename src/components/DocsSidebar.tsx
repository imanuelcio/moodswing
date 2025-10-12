import { useState } from "react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import {
  ChevronDown,
  ChevronRight,
  BookOpen,
  Lock,
  TrendingUp,
  BarChart3,
  Activity,
  AlertCircle,
  Zap,
  Webhook,
  Shield,
  DollarSign,
  Trophy,
  Users,
  Target,
  Menu,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface DocsSidebarProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
}

const DocsSidebar = ({ activeSection, setActiveSection }: DocsSidebarProps) => {
  const [openSections, setOpenSections] = useState([
    "Getting Started",
    "API Endpoints",
  ]);
  const [mobileOpen, setMobileOpen] = useState(false);

  const docSections = [
    {
      title: "Getting Started",
      items: [
        { label: "Introduction", id: "introduction", icon: BookOpen },
        { label: "Quick Start", id: "quick-start", icon: Zap },
        { label: "Authentication", id: "authentication", icon: Lock },
      ],
    },
    {
      title: "API Endpoints",
      items: [
        { label: "Markets", id: "api-markets", icon: TrendingUp },
        { label: "Market Details", id: "api-market-details", icon: Activity },
        { label: "Sentiment", id: "api-sentiment", icon: BarChart3 },
        { label: "Place Bet", id: "api-bets", icon: DollarSign },
        { label: "Leaderboards", id: "api-leaderboards", icon: Trophy },
        { label: "User Stats", id: "api-user-stats", icon: Users },
      ],
    },
    {
      title: "Real-time",
      items: [
        { label: "WebSocket API", id: "websocket", icon: Activity },
        { label: "Subscriptions", id: "subscriptions", icon: Target },
      ],
    },
    {
      title: "Advanced",
      items: [
        { label: "Webhooks", id: "webhooks", icon: Webhook },
        { label: "Rate Limits", id: "rate-limits", icon: Shield },
        { label: "Error Handling", id: "error-handling", icon: AlertCircle },
      ],
    },
  ];

  const toggleSection = (title: string) => {
    setOpenSections((prev) =>
      prev.includes(title) ? prev.filter((t) => t !== title) : [...prev, title]
    );
  };

  const handleItemClick = (id: string) => {
    setActiveSection(id);
    setMobileOpen(false); // Close mobile menu when item is selected
  };

  // Sidebar Content Component (reusable for both desktop and mobile)
  const SidebarContent = () => (
    <div className="h-full flex flex-col">
      <div className="mb-6">
        <h2 className="font-orbitron font-bold text-lg mb-2">API Docs</h2>
        <Badge variant="outline" className="border-primary/50">
          v1.0.0
        </Badge>
      </div>
      <div className="space-y-2 flex-1 overflow-y-auto">
        {docSections.map((section) => {
          const isOpen = openSections.includes(section.title);
          return (
            <div key={section.title}>
              <button
                onClick={() => toggleSection(section.title)}
                className="flex items-center justify-between w-full px-3 py-2 rounded-lg hover:bg-primary/5 transition-all"
              >
                <span className="font-orbitron font-semibold text-sm">
                  {section.title}
                </span>
                {isOpen ? (
                  <ChevronDown className="h-4 w-4 text-muted-foreground" />
                ) : (
                  <ChevronRight className="h-4 w-4 text-muted-foreground" />
                )}
              </button>
              {isOpen && (
                <div className="ml-3 mt-1 space-y-1">
                  {section.items.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => handleItemClick(item.id)}
                      className={cn(
                        "flex items-center gap-2 w-full px-3 py-2 text-sm rounded-lg transition-all",
                        activeSection === item.id
                          ? "bg-primary/10 text-primary font-medium"
                          : "text-muted-foreground hover:text-foreground hover:bg-primary/5"
                      )}
                    >
                      <item.icon className="h-4 w-4" />
                      {item.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile Menu Button */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="glass-card border-primary/20 hover:bg-primary/10"
            >
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-72 p-4 glass-card">
            <SheetHeader className="mb-6">
              <SheetTitle className="font-orbitron text-left">
                Documentation
              </SheetTitle>
            </SheetHeader>
            <SidebarContent />
          </SheetContent>
        </Sheet>
      </div>

      {/* Desktop Sidebar */}
      <nav className="hidden lg:block w-64 p-4 border-r border-border glass-card min-h-screen sticky top-0 h-screen overflow-y-auto">
        <SidebarContent />
      </nav>
    </>
  );
};

export default DocsSidebar;
