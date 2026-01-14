import { MainLayout } from "@/components/MainLayout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Upload, RefreshCw, TrendingUp, FileSpreadsheet, Calendar } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { priceVolumeData } from "@/data/priceVolumeData";
import { RevenueSummaryCard } from "@/components/priceVolume/RevenueSummaryCard";
import { GeographyBreakdown } from "@/components/priceVolume/GeographyBreakdown";
import { ProductGroupBreakdown } from "@/components/priceVolume/ProductGroupBreakdown";
import { SKUAnalysis } from "@/components/priceVolume/SKUAnalysis";
import { KeyInsightsPanel } from "@/components/priceVolume/KeyInsightsPanel";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function PriceVolumeAgent() {
  const navigate = useNavigate();

  return (
    <MainLayout>
      <div className="min-h-screen bg-background">
        {/* Header */}
        <div className="border-b bg-card/50 backdrop-blur-sm sticky top-[57px] z-20">
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
              <div className="flex items-center gap-3">
                <Badge variant="outline" className="gap-1.5 py-1">
                  <Calendar className="h-3 w-3" />
                  {priceVolumeData.summary.period}
                </Badge>
                <Badge variant="outline" className="gap-1.5 py-1 bg-emerald-50 text-emerald-700 border-emerald-200">
                  <FileSpreadsheet className="h-3 w-3" />
                  {priceVolumeData.skus.length} SKUs Analyzed
                </Badge>
                <Button variant="outline" size="sm" className="gap-2">
                  <RefreshCw className="h-4 w-4" />
                  Refresh
                </Button>
                <Button size="sm" className="gap-2">
                  <Upload className="h-4 w-4" />
                  Upload Data
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
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
      </div>
    </MainLayout>
  );
}
