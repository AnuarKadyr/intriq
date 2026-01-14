import { Upload, FileSpreadsheet, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface PriceVolumeUploadScreenProps {
  onUpload: () => void;
}

export function PriceVolumeUploadScreen({ onUpload }: PriceVolumeUploadScreenProps) {
  return (
    <div className="flex-1 overflow-y-auto flex items-center justify-center p-8">
      <Card className="max-w-lg w-full p-8 text-center border-2 border-dashed border-muted-foreground/25 bg-card/50">
        <div className="flex justify-center mb-6">
          <div className="relative">
            <div className="p-4 rounded-2xl bg-pink-500/10">
              <TrendingUp className="h-12 w-12 text-pink-500" />
            </div>
            <div className="absolute -bottom-2 -right-2 p-2 rounded-lg bg-emerald-500/10">
              <FileSpreadsheet className="h-5 w-5 text-emerald-500" />
            </div>
          </div>
        </div>
        
        <h2 className="text-2xl font-bold mb-2">Price Volume Analysis</h2>
        <p className="text-muted-foreground mb-6">
          Upload your sales data to analyze revenue changes by price, volume, and mix attribution across SKUs, products, and geographies.
        </p>

        <div className="bg-muted/50 rounded-lg p-4 mb-6 text-left">
          <p className="text-sm font-medium mb-2">Required data format:</p>
          <ul className="text-sm text-muted-foreground space-y-1">
            <li>• SKU identifiers and names</li>
            <li>• Current and previous period revenue</li>
            <li>• Price per unit (current & previous)</li>
            <li>• Volume/units sold (current & previous)</li>
            <li>• Product category and geography</li>
          </ul>
        </div>

        <div className="space-y-3">
          <Button 
            size="lg" 
            className="w-full gap-2 bg-pink-500 hover:bg-pink-600"
            onClick={onUpload}
          >
            <Upload className="h-5 w-5" />
            Upload Sales Data
          </Button>
          <p className="text-xs text-muted-foreground">
            Supported formats: .xlsx, .csv, .xls
          </p>
        </div>
      </Card>
    </div>
  );
}
