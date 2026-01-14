import { useState } from "react";
import { ArrowLeft, Lightbulb, Sparkles, Brain, TrendingUp, FileSearch } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { MainLayout } from "@/components/MainLayout";
import { TonyFace } from "@/components/TonyFace";
import { insightCards } from "@/data/insightsEngineData";
import { ExecutiveSummaryCard } from "@/components/insightsEngine/ExecutiveSummaryCard";
import { RevenueAnalysisCard } from "@/components/insightsEngine/RevenueAnalysisCard";
import { BusinessOverviewCard } from "@/components/insightsEngine/BusinessOverviewCard";
import { KeyObservationsCard } from "@/components/insightsEngine/KeyObservationsCard";
import { AIAnalysisCard } from "@/components/insightsEngine/AIAnalysisCard";
import { cn } from "@/lib/utils";

const tabs = [
  { id: "executive-summary", label: "Executive Summary" },
  { id: "revenue-analysis", label: "Revenue Growth Analysis" },
  { id: "business-overview", label: "Business Overview" },
  { id: "key-observations", label: "Key Observation" },
  { id: "ai-analysis", label: "AI Analysis Summary" },
];

const InsightsEngineAgent = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("executive-summary");

  const executiveSummary = insightCards.find(c => c.type === "executive-summary");
  const revenueAnalysis = insightCards.find(c => c.type === "revenue-analysis");
  const businessOverview = insightCards.find(c => c.type === "business-overview");
  const keyObservations = insightCards.find(c => c.type === "key-observations");
  const aiAnalysis = insightCards.find(c => c.type === "ai-analysis");

  const renderActiveCard = () => {
    switch (activeTab) {
      case "executive-summary":
        return executiveSummary && <ExecutiveSummaryCard data={executiveSummary} />;
      case "revenue-analysis":
        return revenueAnalysis && <RevenueAnalysisCard data={revenueAnalysis} />;
      case "business-overview":
        return businessOverview && <BusinessOverviewCard data={businessOverview} />;
      case "key-observations":
        return keyObservations && <KeyObservationsCard data={keyObservations} />;
      case "ai-analysis":
        return aiAnalysis && <AIAnalysisCard data={aiAnalysis} />;
      default:
        return null;
    }
  };

  return (
    <MainLayout>
      <div className="flex flex-col h-full min-h-0 overflow-hidden bg-gradient-to-br from-gray-50 via-white to-gray-50/50">
        {/* Header with glassmorphism */}
        <header className="border-b border-gray-200/60 bg-white/70 backdrop-blur-md px-8 py-6 flex-shrink-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => navigate("/dashboard")}
                className="hover:bg-gray-100/80 transition-colors"
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-xl flex items-center justify-center shadow-lg shadow-yellow-500/25 ring-2 ring-yellow-400/20">
                  <Lightbulb className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-900 tracking-tight">Insights Engine</h1>
                  <p className="text-sm text-gray-500">AI-powered analytics and business intelligence</p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 px-4 py-2 bg-emerald-50/80 backdrop-blur-sm rounded-full border border-emerald-200/60 shadow-sm">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-lg shadow-emerald-500/50" />
                <span className="text-xs font-semibold text-emerald-700">Analysis Complete</span>
              </div>
            </div>
          </div>
        </header>

        {/* Content */}
        <div className="flex-1 min-h-0 overflow-y-auto p-8">
          <div className="max-w-6xl mx-auto space-y-8">
            {/* AI Welcome Banner - Enhanced */}
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary/5 via-primary/10 to-primary/5 border border-primary/20 p-8 shadow-xl shadow-primary/5">
              {/* Animated background orbs */}
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-20 -right-20 w-60 h-60 bg-primary/15 rounded-full blur-3xl animate-pulse" />
                <div className="absolute -bottom-20 -left-20 w-48 h-48 bg-primary/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-primary/10 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '2s' }} />
              </div>
              
              <div className="relative flex items-start gap-6">
                <div className="relative flex-shrink-0">
                  <div className="relative">
                    <TonyFace size="medium" />
                    <div className="absolute -top-1 -right-1 w-6 h-6 bg-gradient-to-br from-primary to-primary/80 rounded-full flex items-center justify-center shadow-lg shadow-primary/30 ring-2 ring-white">
                      <Brain className="h-3.5 w-3.5 text-white" />
                    </div>
                  </div>
                </div>
                
                <div className="flex-1">
                  <h2 className="text-xl font-bold text-foreground mb-2 tracking-tight">Data Analysis Complete</h2>
                  <p className="text-sm text-foreground/70 leading-relaxed max-w-2xl">
                    I've analyzed your data room and generated <span className="text-primary font-semibold">comprehensive insights</span> across 
                    financial performance, operational metrics, and risk indicators. Each card below represents a key analysis area with 
                    AI-powered summaries and actionable observations.
                  </p>
                  
                  <div className="flex items-center gap-3 mt-5">
                    {[
                      { icon: FileSearch, label: '847 Documents', color: 'text-primary', bg: 'bg-primary/10' },
                      { icon: TrendingUp, label: '5 Insight Areas', color: 'text-primary', bg: 'bg-primary/10' },
                      { icon: Sparkles, label: 'AI Analyzed', color: 'text-emerald-600', bg: 'bg-emerald-50' },
                    ].map((stat, i) => (
                      <div 
                        key={i} 
                        className={cn(
                          "flex items-center gap-2 px-4 py-2.5 rounded-xl",
                          "bg-white/70 backdrop-blur-sm border border-white/60 shadow-sm",
                          "hover:shadow-md hover:bg-white/90 transition-all duration-300"
                        )}
                      >
                        <div className={cn("w-7 h-7 rounded-lg flex items-center justify-center", stat.bg)}>
                          <stat.icon className={cn("h-4 w-4", stat.color)} />
                        </div>
                        <span className="text-sm font-medium text-foreground/80">{stat.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Tabs - Enhanced */}
            <div className="relative">
              <div className="flex gap-1 p-1 bg-gray-100/80 rounded-xl backdrop-blur-sm">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={cn(
                      "relative px-5 py-2.5 text-sm font-medium rounded-lg transition-all duration-300",
                      activeTab === tab.id
                        ? "bg-white text-primary shadow-md"
                        : "text-gray-500 hover:text-gray-700 hover:bg-white/50"
                    )}
                  >
                    {tab.label}
                    {activeTab === tab.id && (
                      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-primary rounded-full" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Active Card with animation */}
            <div className="animate-fade-in" key={activeTab}>
              {renderActiveCard()}
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default InsightsEngineAgent;
