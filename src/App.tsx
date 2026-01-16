import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AiChatProvider } from "@/contexts/AiChatContext";
import Index from "./pages/Index";
import Engagements from "./pages/Engagements";
import Dashboard from "./pages/Dashboard";
import Onboarding from "./pages/Onboarding";
import OnboardingComplete from "./pages/OnboardingComplete";
import IRTAgent from "./pages/IRTAgent";
import DataInventoryAgent from "./pages/DataInventoryAgent";
import ManagementQuestionsAgent from "./pages/ManagementQuestionsAgent";
import DataIntegrityAgent from "./pages/DataIntegrityAgent";
import ReportGeneratorAgent from "./pages/ReportGeneratorAgent";
import InsightsEngineAgent from "./pages/InsightsEngineAgent";
import PriceVolumeAgent from "./pages/PriceVolumeAgent";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AiChatProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/engagements" element={<Engagements />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/onboarding" element={<Onboarding />} />
            <Route path="/onboarding-complete" element={<OnboardingComplete />} />
            <Route path="/agent/irt" element={<IRTAgent />} />
            <Route path="/agent/data-inventory" element={<DataInventoryAgent />} />
            <Route path="/agent/mgmt-questions" element={<ManagementQuestionsAgent />} />
            <Route path="/agent/data-integrity" element={<DataIntegrityAgent />} />
            <Route path="/agent/report" element={<ReportGeneratorAgent />} />
            <Route path="/agent/insights" element={<InsightsEngineAgent />} />
            <Route path="/agent/price-volume" element={<PriceVolumeAgent />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AiChatProvider>
  </QueryClientProvider>
);

export default App;