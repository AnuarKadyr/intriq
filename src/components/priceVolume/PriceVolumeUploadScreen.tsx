import { Upload, FileSpreadsheet, TrendingUp, Sparkles, ArrowRight, BarChart3, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface PriceVolumeUploadScreenProps {
  onUpload: () => void;
}

export function PriceVolumeUploadScreen({ onUpload }: PriceVolumeUploadScreenProps) {
  return (
    <div className="flex-1 overflow-y-auto bg-gradient-to-br from-background via-background to-primary/5 relative">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-primary/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/3 pointer-events-none" />
      <div className="absolute top-1/3 left-1/4 w-[200px] h-[200px] bg-primary/3 rounded-full blur-2xl pointer-events-none animate-pulse-subtle" />
      
      <div className="flex items-center justify-center min-h-full p-8 relative z-10">
        <div className="max-w-2xl w-full">
          {/* Hero Section */}
          <div className="text-center mb-10 animate-fade-in">
            <div className="inline-flex items-center justify-center p-5 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 mb-6 shadow-lg shadow-primary/10">
              <div className="relative">
                <TrendingUp className="h-16 w-16 text-primary" strokeWidth={1.5} />
                <div className="absolute -bottom-1 -right-1 p-1.5 rounded-lg bg-background shadow-md">
                  <FileSpreadsheet className="h-5 w-5 text-primary" />
                </div>
              </div>
            </div>
            
            <h1 className="text-4xl font-bold text-foreground mb-3">
              Price Volume Analysis
            </h1>
            <p className="text-lg text-muted-foreground max-w-md mx-auto">
              Uncover the true drivers of revenue change with AI-powered decomposition
            </p>
          </div>

          {/* Upload Card */}
          <Card className="border-2 border-dashed border-primary/20 bg-card/80 backdrop-blur-sm p-8 rounded-2xl shadow-xl shadow-primary/5 hover:border-primary/40 hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500 animate-scale-in">
            <div className="text-center">
              <div className="inline-flex p-4 rounded-full bg-primary/10 mb-6">
                <Upload className="h-8 w-8 text-primary" />
              </div>
              
              <h2 className="text-2xl font-semibold mb-2">Upload Your Sales Data</h2>
              <p className="text-muted-foreground mb-8">
                Drop your file here or click to browse
              </p>

              <Button 
                size="lg" 
                className="w-full max-w-sm mx-auto gap-3 bg-primary hover:bg-primary/90 text-primary-foreground h-14 text-base rounded-xl shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 hover:scale-[1.02] transition-all duration-300"
                onClick={onUpload}
              >
                <Upload className="h-5 w-5" />
                Upload Sales Data
                <ArrowRight className="h-4 w-4 ml-1" />
              </Button>
              
              <p className="text-xs text-muted-foreground mt-4">
                Supported formats: .xlsx, .csv, .xls
              </p>
            </div>
          </Card>

          {/* Features Grid */}
          <div className="grid grid-cols-3 gap-4 mt-8 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            <div className="p-5 rounded-xl bg-card/60 backdrop-blur-sm border border-border/50 hover:bg-card hover:border-primary/20 transition-all duration-300">
              <div className="p-2.5 rounded-lg bg-primary/10 inline-flex mb-3">
                <BarChart3 className="h-5 w-5 text-primary" />
              </div>
              <h3 className="font-medium text-sm mb-1">Price Impact</h3>
              <p className="text-xs text-muted-foreground">Isolate revenue changes from pricing decisions</p>
            </div>
            
            <div className="p-5 rounded-xl bg-card/60 backdrop-blur-sm border border-border/50 hover:bg-card hover:border-primary/20 transition-all duration-300">
              <div className="p-2.5 rounded-lg bg-primary/10 inline-flex mb-3">
                <Globe className="h-5 w-5 text-primary" />
              </div>
              <h3 className="font-medium text-sm mb-1">Volume Analysis</h3>
              <p className="text-xs text-muted-foreground">Understand quantity-driven growth patterns</p>
            </div>
            
            <div className="p-5 rounded-xl bg-card/60 backdrop-blur-sm border border-border/50 hover:bg-card hover:border-primary/20 transition-all duration-300">
              <div className="p-2.5 rounded-lg bg-primary/10 inline-flex mb-3">
                <Sparkles className="h-5 w-5 text-primary" />
              </div>
              <h3 className="font-medium text-sm mb-1">Mix Effects</h3>
              <p className="text-xs text-muted-foreground">Discover product mix contribution</p>
            </div>
          </div>

          {/* Data Format Card */}
          <Card className="mt-6 p-6 bg-muted/30 border-0 rounded-xl animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
            <div className="flex items-start gap-4">
              <div className="p-2 rounded-lg bg-primary/10">
                <FileSpreadsheet className="h-5 w-5 text-primary" />
              </div>
              <div className="flex-1">
                <h3 className="font-medium mb-2">Required Data Format</h3>
                <div className="grid grid-cols-2 gap-x-8 gap-y-1.5 text-sm text-muted-foreground">
                  <span className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary/60" />
                    SKU identifiers and names
                  </span>
                  <span className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary/60" />
                    Current and previous period revenue
                  </span>
                  <span className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary/60" />
                    Price per unit (current & previous)
                  </span>
                  <span className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary/60" />
                    Volume/units sold (current & previous)
                  </span>
                  <span className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary/60" />
                    Product category and geography
                  </span>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
