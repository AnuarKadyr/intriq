import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Package, TrendingUp, TrendingDown, ChevronRight } from "lucide-react";
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
    <div className="flex h-2 rounded-full overflow-hidden w-24">
      <div className="bg-blue-500" style={{ width: `${priceWidth}%` }} />
      <div className="bg-emerald-500" style={{ width: `${volumeWidth}%` }} />
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
    <div className="border-b border-border last:border-0">
      <div 
        className="flex items-center gap-4 p-4 cursor-pointer hover:bg-muted/50 transition-colors"
        onClick={onToggle}
      >
        <ChevronRight className={`h-4 w-4 text-muted-foreground transition-transform ${isExpanded ? 'rotate-90' : ''}`} />
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <span className="font-medium">{product.name}</span>
            <Badge variant="outline" className="text-xs">
              {product.skuCount} SKUs
            </Badge>
          </div>
          <span className="text-xs text-muted-foreground">{product.productLine}</span>
        </div>
        <div className="text-right">
          <p className="font-medium">{formatCurrency(product.currentRevenue)}</p>
          <div className="flex items-center justify-end gap-1 text-sm">
            {isPositive ? (
              <TrendingUp className="h-3 w-3 text-emerald-500" />
            ) : (
              <TrendingDown className="h-3 w-3 text-red-500" />
            )}
            <span className={isPositive ? 'text-emerald-600' : 'text-red-600'}>
              {isPositive ? '+' : ''}{changePercent.toFixed(1)}%
            </span>
          </div>
        </div>
        <div className="flex flex-col items-end gap-1">
          <MiniPriceVolumeBar 
            priceChange={product.priceVolumeMix.priceChange} 
            volumeChange={product.priceVolumeMix.volumeChange} 
          />
          <span className="text-xs text-muted-foreground">
            P: {product.priceVolumeMix.priceChange > 0 ? '+' : ''}{product.priceVolumeMix.priceChange.toFixed(1)}% | 
            V: {product.priceVolumeMix.volumeChange > 0 ? '+' : ''}{product.priceVolumeMix.volumeChange.toFixed(1)}%
          </span>
        </div>
        <Badge 
          className={`text-xs ${
            product.topDriver === 'price' 
              ? 'bg-blue-100 text-blue-700 hover:bg-blue-100' 
              : product.topDriver === 'volume'
              ? 'bg-emerald-100 text-emerald-700 hover:bg-emerald-100'
              : 'bg-amber-100 text-amber-700 hover:bg-amber-100'
          }`}
        >
          {product.topDriver === 'price' ? 'Price-led' : product.topDriver === 'volume' ? 'Volume-led' : 'Mix-led'}
        </Badge>
      </div>
      {isExpanded && (
        <div className="px-4 pb-4 pl-12 bg-muted/30">
          <div className="p-3 rounded-lg bg-background border">
            <p className="text-sm text-muted-foreground leading-relaxed">{product.insight}</p>
            <div className="mt-3 grid grid-cols-3 gap-4 text-sm">
              <div>
                <span className="text-muted-foreground">Price Impact:</span>
                <span className="ml-2 font-medium text-blue-600">
                  {product.priceVolumeMix.priceChange > 0 ? '+' : ''}{product.priceVolumeMix.priceChange.toFixed(1)}%
                </span>
              </div>
              <div>
                <span className="text-muted-foreground">Volume Impact:</span>
                <span className="ml-2 font-medium text-emerald-600">
                  {product.priceVolumeMix.volumeChange > 0 ? '+' : ''}{product.priceVolumeMix.volumeChange.toFixed(1)}%
                </span>
              </div>
              <div>
                <span className="text-muted-foreground">Mix Impact:</span>
                <span className="ml-2 font-medium text-amber-600">
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
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <Package className="h-5 w-5 text-primary" />
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
