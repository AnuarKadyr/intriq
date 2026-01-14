import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Globe, TrendingUp, TrendingDown, ChevronRight } from "lucide-react";
import { GeographyBreakdown as GeographyBreakdownType } from "@/types/priceVolume";
import { useState } from "react";

interface GeographyBreakdownProps {
  geographies: GeographyBreakdownType[];
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

function GeographyRow({ geography, isExpanded, onToggle }: { 
  geography: GeographyBreakdownType; 
  isExpanded: boolean; 
  onToggle: () => void;
}) {
  const changePercent = ((geography.currentRevenue - geography.previousRevenue) / geography.previousRevenue) * 100;
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
            <span className="font-medium">{geography.name}</span>
            <Badge variant="outline" className="text-xs">
              {geography.skuCount} SKUs
            </Badge>
          </div>
        </div>
        <div className="text-right">
          <p className="font-medium">{formatCurrency(geography.currentRevenue)}</p>
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
            priceChange={geography.priceVolumeMix.priceChange} 
            volumeChange={geography.priceVolumeMix.volumeChange} 
          />
          <span className="text-xs text-muted-foreground">
            P: {geography.priceVolumeMix.priceChange > 0 ? '+' : ''}{geography.priceVolumeMix.priceChange.toFixed(1)}% | 
            V: {geography.priceVolumeMix.volumeChange > 0 ? '+' : ''}{geography.priceVolumeMix.volumeChange.toFixed(1)}%
          </span>
        </div>
        <Badge 
          className={`text-xs ${
            geography.topDriver === 'price' 
              ? 'bg-blue-100 text-blue-700 hover:bg-blue-100' 
              : geography.topDriver === 'volume'
              ? 'bg-emerald-100 text-emerald-700 hover:bg-emerald-100'
              : 'bg-amber-100 text-amber-700 hover:bg-amber-100'
          }`}
        >
          {geography.topDriver === 'price' ? 'Price-led' : geography.topDriver === 'volume' ? 'Volume-led' : 'Mix-led'}
        </Badge>
      </div>
      {isExpanded && (
        <div className="px-4 pb-4 pl-12 bg-muted/30">
          <div className="p-3 rounded-lg bg-background border">
            <p className="text-sm text-muted-foreground leading-relaxed">{geography.insight}</p>
            <div className="mt-3 grid grid-cols-3 gap-4 text-sm">
              <div>
                <span className="text-muted-foreground">Price Impact:</span>
                <span className="ml-2 font-medium text-blue-600">
                  {geography.priceVolumeMix.priceChange > 0 ? '+' : ''}{geography.priceVolumeMix.priceChange.toFixed(1)}%
                </span>
              </div>
              <div>
                <span className="text-muted-foreground">Volume Impact:</span>
                <span className="ml-2 font-medium text-emerald-600">
                  {geography.priceVolumeMix.volumeChange > 0 ? '+' : ''}{geography.priceVolumeMix.volumeChange.toFixed(1)}%
                </span>
              </div>
              <div>
                <span className="text-muted-foreground">Mix Impact:</span>
                <span className="ml-2 font-medium text-amber-600">
                  {geography.priceVolumeMix.mixChange > 0 ? '+' : ''}{geography.priceVolumeMix.mixChange.toFixed(1)}%
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export function GeographyBreakdown({ geographies }: GeographyBreakdownProps) {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <Globe className="h-5 w-5 text-primary" />
          Revenue by Geography
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        {geographies.map((geo) => (
          <GeographyRow
            key={geo.name}
            geography={geo}
            isExpanded={expandedId === geo.name}
            onToggle={() => setExpandedId(expandedId === geo.name ? null : geo.name)}
          />
        ))}
      </CardContent>
    </Card>
  );
}
