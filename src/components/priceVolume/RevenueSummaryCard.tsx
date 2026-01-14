import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, TrendingDown, DollarSign, BarChart3 } from "lucide-react";
import { RevenueSummary } from "@/types/priceVolume";

interface RevenueSummaryCardProps {
  summary: RevenueSummary;
}

function formatCurrency(value: number): string {
  if (value >= 1000000) {
    return `£${(value / 1000000).toFixed(1)}M`;
  }
  return `£${(value / 1000).toFixed(0)}K`;
}

function PriceVolumeMixBar({ priceChange, volumeChange, mixChange }: { priceChange: number; volumeChange: number; mixChange: number }) {
  const total = Math.abs(priceChange) + Math.abs(volumeChange) + Math.abs(mixChange);
  const priceWidth = (Math.abs(priceChange) / total) * 100;
  const volumeWidth = (Math.abs(volumeChange) / total) * 100;
  const mixWidth = (Math.abs(mixChange) / total) * 100;

  return (
    <div className="space-y-2">
      <div className="flex h-4 rounded-full overflow-hidden">
        <div 
          className="bg-blue-500 transition-all duration-500" 
          style={{ width: `${priceWidth}%` }}
          title={`Price: ${priceChange > 0 ? '+' : ''}${priceChange.toFixed(1)}%`}
        />
        <div 
          className="bg-emerald-500 transition-all duration-500" 
          style={{ width: `${volumeWidth}%` }}
          title={`Volume: ${volumeChange > 0 ? '+' : ''}${volumeChange.toFixed(1)}%`}
        />
        <div 
          className="bg-amber-500 transition-all duration-500" 
          style={{ width: `${mixWidth}%` }}
          title={`Mix: ${mixChange > 0 ? '+' : ''}${mixChange.toFixed(1)}%`}
        />
      </div>
      <div className="flex justify-between text-xs">
        <div className="flex items-center gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-blue-500" />
          <span className="text-muted-foreground">Price</span>
          <span className="font-medium">{priceChange > 0 ? '+' : ''}{priceChange.toFixed(1)}%</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
          <span className="text-muted-foreground">Volume</span>
          <span className="font-medium">{volumeChange > 0 ? '+' : ''}{volumeChange.toFixed(1)}%</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-amber-500" />
          <span className="text-muted-foreground">Mix</span>
          <span className="font-medium">{mixChange > 0 ? '+' : ''}{mixChange.toFixed(1)}%</span>
        </div>
      </div>
    </div>
  );
}

export function RevenueSummaryCard({ summary }: RevenueSummaryCardProps) {
  const isPositive = summary.totalChangePercent >= 0;

  return (
    <Card className="bg-gradient-to-br from-slate-900 to-slate-800 text-white border-0">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2 text-lg font-medium text-slate-300">
          <DollarSign className="h-5 w-5" />
          Total Revenue Overview
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-3 gap-6">
          <div>
            <p className="text-sm text-slate-400 mb-1">{summary.period}</p>
            <p className="text-3xl font-bold">{formatCurrency(summary.totalCurrentRevenue)}</p>
          </div>
          <div>
            <p className="text-sm text-slate-400 mb-1">{summary.previousPeriod}</p>
            <p className="text-2xl font-semibold text-slate-300">{formatCurrency(summary.totalPreviousRevenue)}</p>
          </div>
          <div>
            <p className="text-sm text-slate-400 mb-1">Change</p>
            <div className="flex items-center gap-2">
              {isPositive ? (
                <TrendingUp className="h-5 w-5 text-emerald-400" />
              ) : (
                <TrendingDown className="h-5 w-5 text-red-400" />
              )}
              <span className={`text-2xl font-bold ${isPositive ? 'text-emerald-400' : 'text-red-400'}`}>
                {isPositive ? '+' : ''}{summary.totalChangePercent.toFixed(1)}%
              </span>
            </div>
            <p className="text-sm text-slate-400">
              {formatCurrency(summary.totalChange)}
            </p>
          </div>
        </div>

        <div className="pt-4 border-t border-slate-700">
          <div className="flex items-center gap-2 mb-3">
            <BarChart3 className="h-4 w-4 text-slate-400" />
            <span className="text-sm font-medium text-slate-300">Price / Volume / Mix Breakdown</span>
          </div>
          <PriceVolumeMixBar 
            priceChange={summary.priceVolumeMix.priceChange}
            volumeChange={summary.priceVolumeMix.volumeChange}
            mixChange={summary.priceVolumeMix.mixChange}
          />
        </div>
      </CardContent>
    </Card>
  );
}
