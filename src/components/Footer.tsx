import { Link } from "react-router-dom";
import { Twitter, Github, MessageCircle } from "lucide-react";

export const Footer = () => {
  const footerLinks = {
    Product: [
      { label: "Dashboard", href: "/dashboard" },
      { label: "Moodz NFT", href: "/mint" },
      { label: "Leaderboard", href: "/dashboard" },
    ],
    // Business: [
    //   { label: "B2B Portal", href: "/b2b" },
    //   { label: "API Access", href: "/b2b/console" },
    //   { label: "Documentation", href: "/docs" },
    // ],
    Legal: [
      { label: "Privacy Policy", href: "/legal/privacy" },
      { label: "Terms of Service", href: "/legal/terms" },
      { label: "Risk Disclosure", href: "/legal/risk" },
    ],
  };

  return (
    <footer className="border-t border-border glass-card mt-24">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <h3 className="font-orbitron text-lg font-bold mb-3 text-glow-red">
              MOOD SWING
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              Decentralized InfoFi for multi-chain sentiment prediction.
            </p>
            <div className="flex gap-3">
              <a
                href="https://twitter.com/MoodSwingFi"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg border border-border hover:border-primary transition-colors hover-neon-glow"
              >
                <Twitter className="h-4 w-4" />
              </a>
              <a
                href="https://github.com/moodswing"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg border border-border hover:border-primary transition-colors hover-neon-glow"
              >
                <Github className="h-4 w-4" />
              </a>
              <a
                href="https://discord.gg/moodswing"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg border border-border hover:border-primary transition-colors hover-neon-glow"
              >
                <MessageCircle className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="font-orbitron text-sm font-semibold mb-3">
                {category}
              </h4>
              <ul className="space-y-2">
                {links.map((link, index) => (
                  <li key={index}>
                    <Link
                      to={link.href}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="pt-8 border-t border-border text-center text-sm text-muted-foreground">
          <p>© 2025 Mood Swing. All rights reserved.</p>
          <p className="mt-2 text-xs">
            Trading involves risk. Past performance is not indicative of future
            results.
          </p>
        </div>
      </div>
    </footer>
  );
};
