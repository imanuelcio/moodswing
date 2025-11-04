// import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/index";
import Markets from "./pages/Markets";
import MarketDetail from "./pages/MarketDetail";
import Create from "./pages/Create";
import Leaderboards from "./pages/Leaderboards";
import Profile from "./pages/Profile";
import Notifications from "./pages/Notifications";
import Mint from "./pages/Mint";
import Dashboard from "./pages/Dashboard";
import APIKeys from "./pages/APIKeys";
import B2BConsole from "./pages/B2BConsole";
import Docs from "./pages/Docs";
import LegalPrivacy from "./pages/LegalPrivacy";
import LegalTerms from "./pages/LegalTerms";
import LegalRisk from "./pages/LegalRisk";
import NotFound from "./pages/NotFound";
import { queryClient } from "./lib/queryclient";
import "./lib/web3Modal"; // Initialize web3modal
import CreatorTips from "./pages/Creators";
import Staking from "./pages/Staking";
import Governance from "./pages/Governance";
import Analytics from "./pages/Analytics";
const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      {/* <Toaster /> */}
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/markets" element={<Markets />} />
          <Route path="/markets/:id" element={<MarketDetail />} />
          <Route path="/me/create" element={<Create />} />
          <Route path="/leaderboards" element={<Leaderboards />} />
          <Route path="/me" element={<Profile />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/governance" element={<Governance />} />
          <Route path="/mint" element={<Mint />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/api-keys" element={<APIKeys />} />
          <Route path="/staking" element={<Staking />} />
          <Route path="/creators" element={<CreatorTips />} />
          <Route path="/b2b/console" element={<B2BConsole />} />
          <Route path="/docs" element={<Docs />} />
          <Route path="/legal/privacy" element={<LegalPrivacy />} />
          <Route path="/legal/terms" element={<LegalTerms />} />
          <Route path="/legal/risk" element={<LegalRisk />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
