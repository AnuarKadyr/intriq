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

const InsightsEngineAgent = () => {
  const navigate = useNavigate();

  const executiveSummary = insightCards.find(c => c.type === "executive-summary");
  const revenueAnalysis = insightCards.find(c => c.type === "revenue-analysis");
  const businessOverview = insightCards.find(c => c.type === "business-overview");
  const keyObservations = insightCards.find(c => c.type === "key-observations");
  const aiAnalysis = insightCards.find(c => c.type === "ai-analysis");

  return (
    <MainLayout>
      <div className="flex flex-col h-full min-h-0 overflow-hidden">
        {/* Header */}
        <header className="border-b border-gray-200 bg-white px-8 py-6 flex-shrink-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" onClick={() => navigate("/dashboard")}>
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center shadow-sm">
                  <Lightbulb className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-900">Insights Engine</h1>
                  <p className="text-sm text-gray-500">AI-powered analytics and business intelligence</p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 px-3 py-1.5 bg-emerald-50 rounded-lg border border-emerald-200">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-xs font-medium text-emerald-700">Analysis Complete</span>
              </div>
            </div>
          </div>
        </header>

        {/* Content */}
        <div className="flex-1 min-h-0 overflow-y-auto p-8">
          <div className="max-w-6xl mx-auto space-y-8">
            {/* AI Welcome Banner */}
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-indigo-500/5 via-purple-500/10 to-indigo-500/5 border border-indigo-200/50 p-6">
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-10 -right-10 w-40 h-40 bg-indigo-500/20 rounded-full blur-3xl animate-pulse-subtle" />
                <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-purple-500/20 rounded-full blur-3xl animate-pulse-subtle" style={{ animationDelay: '1s' }} />
              </div>
              
              <div className="relative flex items-start gap-5">
                <div className="relative flex-shrink-0">
                  <TonyFace size="medium" />
                  <div className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-br from-indigo-400 to-purple-500 rounded-full flex items-center justify-center shadow-md">
                    <Brain className="h-3 w-3 text-white" />
                  </div>
                </div>
                
                <div className="flex-1">
                  <h2 className="text-lg font-bold text-foreground mb-2">Data Analysis Complete</h2>
                  <p className="text-sm text-foreground/70 leading-relaxed">
                    I've analyzed your data room and generated <span className="text-foreground font-semibold">comprehensive insights</span> across 
                    financial performance, operational metrics, and risk indicators. Each card below represents a key analysis area with 
                    AI-powered summaries and actionable observations.
                  </p>
                  
                  <div className="flex items-center gap-3 mt-4">
                    {[
                      { icon: FileSearch, label: '847 Documents', color: 'text-indigo-500' },
                      { icon: TrendingUp, label: '5 Insight Areas', color: 'text-purple-500' },
                      { icon: Sparkles, label: 'AI Analyzed', color: 'text-emerald-500' },
                    ].map((stat, i) => (
                      <div key={i} className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-white/60 backdrop-blur-sm border border-white/50">
                        <stat.icon className={cn("h-3.5 w-3.5", stat.color)} />
                        <span className="text-xs font-medium text-foreground/80">{stat.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Insight Cards */}
            <div className="space-y-6">
              {executiveSummary && <ExecutiveSummaryCard data={executiveSummary} />}
              {revenueAnalysis && <RevenueAnalysisCard data={revenueAnalysis} />}
              {businessOverview && <BusinessOverviewCard data={businessOverview} />}
              {keyObservations && <KeyObservationsCard data={keyObservations} />}
              {aiAnalysis && <AIAnalysisCard data={aiAnalysis} />}
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default InsightsEngineAgent;
