import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Globe, TrendingUp, TrendingDown, ChevronRight, MapPin } from "lucide-react";
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
    <div className="flex h-2.5 rounded-full overflow-hidden w-28 shadow-inner bg-muted/50">
      <div className="bg-gradient-to-r from-blue-500 to-blue-400 transition-all duration-500" style={{ width: `${priceWidth}%` }} />
      <div className="bg-gradient-to-r from-emerald-500 to-emerald-400 transition-all duration-500" style={{ width: `${volumeWidth}%` }} />
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
    <div className={`border-b border-border/50 last:border-0 transition-all duration-300 ${isExpanded ? 'bg-primary/5' : ''}`}>
      <div 
        className="flex items-center gap-4 p-5 cursor-pointer hover:bg-muted/50 transition-all duration-300"
        onClick={onToggle}
      >
        <ChevronRight className={`h-4 w-4 text-muted-foreground transition-transform duration-300 ${isExpanded ? 'rotate-90 text-primary' : ''}`} />
        <div className="flex-1">
          <div className="flex items-center gap-3">
            <div className="p-1.5 rounded-lg bg-primary/10">
              <MapPin className="h-4 w-4 text-primary" />
            </div>
            <span className="font-semibold">{geography.name}</span>
            <Badge variant="outline" className="text-xs font-medium">
              {geography.skuCount} SKUs
            </Badge>
          </div>
        </div>
        <div className="text-right">
          <p className="font-bold text-lg">{formatCurrency(geography.currentRevenue)}</p>
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
            priceChange={geography.priceVolumeMix.priceChange} 
            volumeChange={geography.priceVolumeMix.volumeChange} 
          />
          <span className="text-xs text-muted-foreground font-medium">
            P: {geography.priceVolumeMix.priceChange > 0 ? '+' : ''}{geography.priceVolumeMix.priceChange.toFixed(1)}% | 
            V: {geography.priceVolumeMix.volumeChange > 0 ? '+' : ''}{geography.priceVolumeMix.volumeChange.toFixed(1)}%
          </span>
        </div>
        <Badge 
          className={`text-xs font-medium shadow-sm ${
            geography.topDriver === 'price' 
              ? 'bg-gradient-to-r from-blue-100 to-blue-50 text-blue-700 border-blue-200 hover:from-blue-100 hover:to-blue-50' 
              : geography.topDriver === 'volume'
              ? 'bg-gradient-to-r from-emerald-100 to-emerald-50 text-emerald-700 border-emerald-200 hover:from-emerald-100 hover:to-emerald-50'
              : 'bg-gradient-to-r from-amber-100 to-amber-50 text-amber-700 border-amber-200 hover:from-amber-100 hover:to-amber-50'
          }`}
        >
          {geography.topDriver === 'price' ? 'Price-led' : geography.topDriver === 'volume' ? 'Volume-led' : 'Mix-led'}
        </Badge>
      </div>
      {isExpanded && (
        <div className="px-5 pb-5 pl-14 animate-fade-in">
          <div className="p-5 rounded-xl bg-card border border-border/50 shadow-sm">
            <p className="text-sm text-muted-foreground leading-relaxed">{geography.insight}</p>
            <div className="mt-4 grid grid-cols-3 gap-4">
              <div className="p-3 rounded-lg bg-blue-50/50 border border-blue-100">
                <span className="text-xs text-muted-foreground block mb-1">Price Impact</span>
                <span className="font-bold text-blue-600 text-lg">
                  {geography.priceVolumeMix.priceChange > 0 ? '+' : ''}{geography.priceVolumeMix.priceChange.toFixed(1)}%
                </span>
              </div>
              <div className="p-3 rounded-lg bg-emerald-50/50 border border-emerald-100">
                <span className="text-xs text-muted-foreground block mb-1">Volume Impact</span>
                <span className="font-bold text-emerald-600 text-lg">
                  {geography.priceVolumeMix.volumeChange > 0 ? '+' : ''}{geography.priceVolumeMix.volumeChange.toFixed(1)}%
                </span>
              </div>
              <div className="p-3 rounded-lg bg-amber-50/50 border border-amber-100">
                <span className="text-xs text-muted-foreground block mb-1">Mix Impact</span>
                <span className="font-bold text-amber-600 text-lg">
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
    <Card className="shadow-lg border-border/50 overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-muted/30 to-transparent border-b border-border/50">
        <CardTitle className="flex items-center gap-3 text-lg">
          <div className="p-2 rounded-lg bg-primary/10">
            <Globe className="h-5 w-5 text-primary" />
          </div>
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
