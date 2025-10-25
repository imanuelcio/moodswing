export const formatAddress = (addr: string) => {
  return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
};

export const getChainName = (id: number) => {
  const chains: Record<number, string> = {
    1: "Ethereum",
    137: "Polygon",
    8453: "Base",
    42161: "Arbitrum",
  };
  return chains[id] || "Unknown";
};
