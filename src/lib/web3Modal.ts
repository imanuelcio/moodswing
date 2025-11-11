// appkit-solana.ts
import { createAppKit } from "@reown/appkit/react";
import { SolanaAdapter } from "@reown/appkit-adapter-solana/react";
import {
  solana /*, solanaDevnet, solanaTestnet */,
} from "@reown/appkit/networks";

const projectId = "90588251cd499167509b5c9d3ac1fc84";

const metadata = {
  name: "Moodz.fun",
  description: "Decentralized Prediction Markets",
  url: "https://moodz.fun",
  icons: ["https://moodz.fun/logo.png"],
};

// buat adapter Solana
const solanaAdapter = new SolanaAdapter(/* optional adapter options */);

// buat modal / appkit
export const modal = createAppKit({
  projectId,
  metadata,
  networks: [solana /*, solanaDevnet */], // "chains" sekarang bernama "networks"
  adapters: [solanaAdapter],
  // enableAnalytics: false,
  // enableOnramp: false,
});
