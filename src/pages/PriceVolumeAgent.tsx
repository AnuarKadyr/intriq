import { useState } from "react";
import { MainLayout } from "@/components/MainLayout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, RefreshCw, TrendingUp, FileSpreadsheet, Calendar, MessageCircle, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { priceVolumeData } from "@/data/priceVolumeData";
import { RevenueSummaryCard } from "@/components/priceVolume/RevenueSummaryCard";
import { GeographyBreakdown } from "@/components/priceVolume/GeographyBreakdown";
import { ProductGroupBreakdown } from "@/components/priceVolume/ProductGroupBreakdown";
import { SKUAnalysis } from "@/components/priceVolume/SKUAnalysis";
import { KeyInsightsPanel } from "@/components/priceVolume/KeyInsightsPanel";
import { PriceVolumeUploadScreen } from "@/components/priceVolume/PriceVolumeUploadScreen";
import PriceVolumeLoadingAnimation from "@/components/priceVolume/PriceVolumeLoadingAnimation";
import { PriceVolumeChatPanel } from "@/components/priceVolume/PriceVolumeChatPanel";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

type AgentState = "upload" | "processing" | "results";

export default function PriceVolumeAgent() {
  const navigate = useNavigate();
  const [agentState, setAgentState] = useState<AgentState>("upload");
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [initialQuestion, setInitialQuestion] = useState<string | undefined>();

  const handleUpload = () => {
    setAgentState("processing");
  };

  const handleProcessingComplete = () => {
    setAgentState("results");
    // Automatically open chat with the initial question
    setTimeout(() => {
      setInitialQuestion("update data for 2025 - how did the numbers change from 2024");
      setIsChatOpen(true);
    }, 500);
  };

  const handleReset = () => {
    setAgentState("upload");
    setIsChatOpen(false);
    setInitialQuestion(undefined);
  };

  // Upload screen
  if (agentState === "upload") {
    return (
      <MainLayout>
        <div className="h-full overflow-y-auto flex flex-col bg-background">
          {/* Header */}
          <div className="border-b bg-card/50 backdrop-blur-sm">
            <div className="px-6 py-4">
              <div className="flex items-center gap-4">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => navigate("/dashboard")}
                  className="hover:bg-muted"
                >
                  <ArrowLeft className="h-5 w-5" />
                </Button>
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-pink-500/10">
                    <TrendingUp className="h-5 w-5 text-pink-500" />
                  </div>
                  <div>
                    <h1 className="text-xl font-semibold">Price Volume Agent</h1>
                    <p className="text-sm text-muted-foreground">
                      Analyze revenue changes by price, volume, and mix attribution
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <PriceVolumeUploadScreen onUpload={handleUpload} />
        </div>
      </MainLayout>
    );
  }

  // Processing screen - use onboarding-style loader
  if (agentState === "processing") {
    return <PriceVolumeLoadingAnimation onComplete={handleProcessingComplete} />;
  }

  // Results screen
  return (
    <MainLayout>
      <div className="h-full overflow-y-auto bg-gradient-to-br from-background via-background to-primary/5 relative">
        {/* Decorative background */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none" />
        
        {/* Header */}
        <div className="border-b bg-card/80 backdrop-blur-md sticky top-0 z-20 shadow-sm">
          <div className="px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => navigate("/dashboard")}
                  className="hover:bg-muted"
                >
                  <ArrowLeft className="h-5 w-5" />
                </Button>
                <div>
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 shadow-sm">
                      <TrendingUp className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h1 className="text-xl font-bold">Price Volume Agent</h1>
                      <p className="text-sm text-muted-foreground">
                        Analyze revenue changes by price, volume, and mix attribution
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Badge variant="outline" className="gap-1.5 py-1.5 px-3 font-medium">
                  <Calendar className="h-3.5 w-3.5" />
                  {priceVolumeData.summary.period}
                </Badge>
                <Badge variant="outline" className="gap-1.5 py-1.5 px-3 bg-emerald-50 text-emerald-700 border-emerald-200 font-medium">
                  <FileSpreadsheet className="h-3.5 w-3.5" />
                  {priceVolumeData.skus.length} SKUs Analyzed
                </Badge>
                <Button variant="outline" size="sm" className="gap-2 hover:bg-muted" onClick={handleReset}>
                  <RefreshCw className="h-4 w-4" />
                  New Analysis
                </Button>
                <Button 
                  size="sm" 
                  className="gap-2 bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-primary/25"
                  onClick={() => setIsChatOpen(true)}
                >
                  <Sparkles className="h-4 w-4" />
                  Ask Questions
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className={`p-6 space-y-6 transition-all duration-300 ${isChatOpen ? 'mr-[400px]' : ''}`}>
          {/* Summary Card */}
          <RevenueSummaryCard summary={priceVolumeData.summary} />

          {/* Key Insights */}
          <KeyInsightsPanel insights={priceVolumeData.keyInsights} />

          {/* Tabbed Breakdowns */}
          <Tabs defaultValue="geography" className="space-y-4">
            <TabsList className="bg-muted/50">
              <TabsTrigger value="geography">By Geography</TabsTrigger>
              <TabsTrigger value="product">By Product Group</TabsTrigger>
              <TabsTrigger value="sku">SKU Analysis</TabsTrigger>
            </TabsList>

            <TabsContent value="geography" className="mt-4">
              <GeographyBreakdown geographies={priceVolumeData.geographies} />
            </TabsContent>

            <TabsContent value="product" className="mt-4">
              <ProductGroupBreakdown productGroups={priceVolumeData.productGroups} />
            </TabsContent>

            <TabsContent value="sku" className="mt-4">
              <SKUAnalysis skus={priceVolumeData.skus} />
            </TabsContent>
          </Tabs>
        </div>

        {/* Chat Panel */}
        <PriceVolumeChatPanel 
          isOpen={isChatOpen} 
          onClose={() => setIsChatOpen(false)}
          initialQuestion={initialQuestion}
        />
      </div>
    </MainLayout>
  );
}
