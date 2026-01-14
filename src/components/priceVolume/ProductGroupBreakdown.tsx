import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Package, TrendingUp, TrendingDown, ChevronRight, Layers } from "lucide-react";
import { ProductGroupBreakdown as ProductGroupBreakdownType } from "@/types/priceVolume";
import { useState } from "react";

interface ProductGroupBreakdownProps {
  productGroups: ProductGroupBreakdownType[];
}

function formatCurrency(value: number): string {
  if (value >= 1000000) {
    return `£${(value / 1000000).toFixed(1)}M`;
  }
  return `£${(value / 1000).toFixed(0)}K`;
}

function MiniPriceVolumeBar({ priceChange, volumeChange }: { priceChange: number; volumeChange: number }) {
  const total = Math.abs(priceChange) + Math.abs(volumeChange);
  const priceWidth = (Math.abs(priceChange) / total) * 100;
  const volumeWidth = (Math.abs(volumeChange) / total) * 100;

  return (
    <div className="flex h-2.5 rounded-full overflow-hidden w-28 shadow-inner bg-muted/50">
      <div className="bg-gradient-to-r from-blue-500 to-blue-400 transition-all duration-500" style={{ width: `${priceWidth}%` }} />
      <div className="bg-gradient-to-r from-emerald-500 to-emerald-400 transition-all duration-500" style={{ width: `${volumeWidth}%` }} />
    </div>
  );
}

function ProductRow({ product, isExpanded, onToggle }: { 
  product: ProductGroupBreakdownType; 
  isExpanded: boolean; 
  onToggle: () => void;
}) {
  const changePercent = ((product.currentRevenue - product.previousRevenue) / product.previousRevenue) * 100;
  const isPositive = changePercent >= 0;

  return (
    <div className={`border-b border-border/50 last:border-0 transition-all duration-300 ${isExpanded ? 'bg-primary/5' : ''}`}>
      <div 
        className="flex items-center gap-4 p-5 cursor-pointer hover:bg-muted/50 transition-all duration-300"
        onClick={onToggle}
      >
        <ChevronRight className={`h-4 w-4 text-muted-foreground transition-transform duration-300 ${isExpanded ? 'rotate-90 text-primary' : ''}`} />
        <div className="flex-1">
          <div className="flex items-center gap-3">
            <div className="p-1.5 rounded-lg bg-primary/10">
              <Layers className="h-4 w-4 text-primary" />
            </div>
            <div>
              <span className="font-semibold">{product.name}</span>
              <span className="text-xs text-muted-foreground ml-2">{product.productLine}</span>
            </div>
            <Badge variant="outline" className="text-xs font-medium">
              {product.skuCount} SKUs
            </Badge>
          </div>
        </div>
        <div className="text-right">
          <p className="font-bold text-lg">{formatCurrency(product.currentRevenue)}</p>
          <div className="flex items-center justify-end gap-1.5 text-sm">
            <div className={`p-0.5 rounded ${isPositive ? 'bg-emerald-500/10' : 'bg-red-500/10'}`}>
              {isPositive ? (
                <TrendingUp className="h-3.5 w-3.5 text-emerald-500" />
              ) : (
                <TrendingDown className="h-3.5 w-3.5 text-red-500" />
              )}
            </div>
            <span className={`font-medium ${isPositive ? 'text-emerald-600' : 'text-red-600'}`}>
              {isPositive ? '+' : ''}{changePercent.toFixed(1)}%
            </span>
          </div>
        </div>
        <div className="flex flex-col items-end gap-1.5">
          <MiniPriceVolumeBar 
            priceChange={product.priceVolumeMix.priceChange} 
            volumeChange={product.priceVolumeMix.volumeChange} 
          />
          <span className="text-xs text-muted-foreground font-medium">
            P: {product.priceVolumeMix.priceChange > 0 ? '+' : ''}{product.priceVolumeMix.priceChange.toFixed(1)}% | 
            V: {product.priceVolumeMix.volumeChange > 0 ? '+' : ''}{product.priceVolumeMix.volumeChange.toFixed(1)}%
          </span>
        </div>
        <Badge 
          className={`text-xs font-medium shadow-sm ${
            product.topDriver === 'price' 
              ? 'bg-gradient-to-r from-blue-100 to-blue-50 text-blue-700 border-blue-200 hover:from-blue-100 hover:to-blue-50' 
              : product.topDriver === 'volume'
              ? 'bg-gradient-to-r from-emerald-100 to-emerald-50 text-emerald-700 border-emerald-200 hover:from-emerald-100 hover:to-emerald-50'
              : 'bg-gradient-to-r from-amber-100 to-amber-50 text-amber-700 border-amber-200 hover:from-amber-100 hover:to-amber-50'
          }`}
        >
          {product.topDriver === 'price' ? 'Price-led' : product.topDriver === 'volume' ? 'Volume-led' : 'Mix-led'}
        </Badge>
      </div>
      {isExpanded && (
        <div className="px-5 pb-5 pl-14 animate-fade-in">
          <div className="p-5 rounded-xl bg-card border border-border/50 shadow-sm">
            <p className="text-sm text-muted-foreground leading-relaxed">{product.insight}</p>
            <div className="mt-4 grid grid-cols-3 gap-4">
              <div className="p-3 rounded-lg bg-blue-50/50 border border-blue-100">
                <span className="text-xs text-muted-foreground block mb-1">Price Impact</span>
                <span className="font-bold text-blue-600 text-lg">
                  {product.priceVolumeMix.priceChange > 0 ? '+' : ''}{product.priceVolumeMix.priceChange.toFixed(1)}%
                </span>
              </div>
              <div className="p-3 rounded-lg bg-emerald-50/50 border border-emerald-100">
                <span className="text-xs text-muted-foreground block mb-1">Volume Impact</span>
                <span className="font-bold text-emerald-600 text-lg">
                  {product.priceVolumeMix.volumeChange > 0 ? '+' : ''}{product.priceVolumeMix.volumeChange.toFixed(1)}%
                </span>
              </div>
              <div className="p-3 rounded-lg bg-amber-50/50 border border-amber-100">
                <span className="text-xs text-muted-foreground block mb-1">Mix Impact</span>
                <span className="font-bold text-amber-600 text-lg">
                  {product.priceVolumeMix.mixChange > 0 ? '+' : ''}{product.priceVolumeMix.mixChange.toFixed(1)}%
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export function ProductGroupBreakdown({ productGroups }: ProductGroupBreakdownProps) {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  return (
    <Card className="shadow-lg border-border/50 overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-muted/30 to-transparent border-b border-border/50">
        <CardTitle className="flex items-center gap-3 text-lg">
          <div className="p-2 rounded-lg bg-primary/10">
            <Package className="h-5 w-5 text-primary" />
          </div>
          Revenue by Product Group
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        {productGroups.map((product) => (
          <ProductRow
            key={product.name}
            product={product}
            isExpanded={expandedId === product.name}
            onToggle={() => setExpandedId(expandedId === product.name ? null : product.name)}
          />
        ))}
      </CardContent>
    </Card>
  );
}
