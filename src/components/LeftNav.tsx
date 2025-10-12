import { Link, useLocation } from "react-router-dom";
import { TrendingUp, Trophy, PlusCircle, Briefcase, Bell } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/markets", label: "Markets", icon: TrendingUp },
  { href: "/leaderboards", label: "Leaderboards", icon: Trophy },
  { href: "/create", label: "Create", icon: PlusCircle },
  { href: "/b2b", label: "B2B", icon: Briefcase },
  { href: "/notifications", label: "Notifications", icon: Bell },
];

export const LeftNav = () => {
  const location = useLocation();

  return (
    <nav className="hidden md:flex flex-col gap-1 w-64 p-4 border-r border-border glass-card min-h-screen">
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = location.pathname === item.href;

        return (
          <Link
            key={item.href}
            to={item.href}
            className={cn(
              "flex items-center gap-3 px-4 py-3 rounded-lg transition-all",
              isActive
                ? "bg-primary/10 text-primary border border-primary/50 text-glow-red"
                : "hover:bg-primary/5 hover:border-primary/30 border border-transparent text-foreground/80"
            )}
          >
            <Icon className="h-5 w-5" />
            <span className="font-medium">{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
};
