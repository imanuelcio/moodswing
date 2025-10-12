import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import { ChevronDown } from "lucide-react";

type Chain = "Solana" | "Ethereum" | "Base" | "Polygon";

export const ChainSelector = () => {
  const [selectedChain, setSelectedChain] = useState<Chain>("Solana");

  const chains: Chain[] = ["Solana", "Ethereum", "Base", "Polygon"];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2 border-border">
          <span className="text-xs font-medium">{selectedChain}</span>
          <ChevronDown className="h-3 w-3" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="glass-card border-border">
        {chains.map((chain) => (
          <DropdownMenuItem
            key={chain}
            onClick={() => setSelectedChain(chain)}
            className={selectedChain === chain ? "text-primary" : ""}
          >
            {chain}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
