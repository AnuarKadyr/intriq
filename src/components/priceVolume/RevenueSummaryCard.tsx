import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, TrendingDown, DollarSign, BarChart3, Sparkles } from "lucide-react";
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
    <div className="space-y-3">
      <div className="flex h-5 rounded-full overflow-hidden shadow-inner bg-white/5">
        <div 
          className="bg-gradient-to-r from-blue-500 to-blue-400 transition-all duration-700 ease-out" 
          style={{ width: `${priceWidth}%` }}
          title={`Price: ${priceChange > 0 ? '+' : ''}${priceChange.toFixed(1)}%`}
        />
        <div 
          className="bg-gradient-to-r from-emerald-500 to-emerald-400 transition-all duration-700 ease-out" 
          style={{ width: `${volumeWidth}%` }}
          title={`Volume: ${volumeChange > 0 ? '+' : ''}${volumeChange.toFixed(1)}%`}
        />
        <div 
          className="bg-gradient-to-r from-amber-500 to-amber-400 transition-all duration-700 ease-out" 
          style={{ width: `${mixWidth}%` }}
          title={`Mix: ${mixChange > 0 ? '+' : ''}${mixChange.toFixed(1)}%`}
        />
      </div>
      <div className="flex justify-between text-sm">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-gradient-to-br from-blue-500 to-blue-400 shadow-sm" />
          <span className="text-white/70">Price</span>
          <span className="font-semibold text-white">{priceChange > 0 ? '+' : ''}{priceChange.toFixed(1)}%</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-gradient-to-br from-emerald-500 to-emerald-400 shadow-sm" />
          <span className="text-white/70">Volume</span>
          <span className="font-semibold text-white">{volumeChange > 0 ? '+' : ''}{volumeChange.toFixed(1)}%</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-gradient-to-br from-amber-500 to-amber-400 shadow-sm" />
          <span className="text-white/70">Mix</span>
          <span className="font-semibold text-white">{mixChange > 0 ? '+' : ''}{mixChange.toFixed(1)}%</span>
        </div>
      </div>
    </div>
  );
}

export function RevenueSummaryCard({ summary }: RevenueSummaryCardProps) {
  const isPositive = summary.totalChangePercent >= 0;

  return (
    <Card className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white border-0 shadow-2xl shadow-slate-900/50 overflow-hidden relative">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-primary/5 rounded-full blur-2xl translate-y-1/2 -translate-x-1/2 pointer-events-none" />
      
      <CardHeader className="pb-3 relative z-10">
        <CardTitle className="flex items-center gap-3 text-lg font-medium text-slate-300">
          <div className="p-2 rounded-lg bg-white/10 backdrop-blur-sm">
            <DollarSign className="h-5 w-5 text-primary" />
          </div>
          Total Revenue Overview
          <div className="ml-auto flex items-center gap-1.5 text-sm bg-white/5 px-3 py-1 rounded-full">
            <Sparkles className="h-3.5 w-3.5 text-primary" />
            <span className="text-white/80">AI Analysis</span>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-8 relative z-10">
        <div className="grid grid-cols-3 gap-8">
          <div className="p-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10">
            <p className="text-sm text-slate-400 mb-2">{summary.period}</p>
            <p className="text-4xl font-bold tracking-tight">{formatCurrency(summary.totalCurrentRevenue)}</p>
            <p className="text-xs text-slate-500 mt-1">Current Period</p>
          </div>
          <div className="p-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10">
            <p className="text-sm text-slate-400 mb-2">{summary.previousPeriod}</p>
            <p className="text-3xl font-semibold text-slate-300">{formatCurrency(summary.totalPreviousRevenue)}</p>
            <p className="text-xs text-slate-500 mt-1">Previous Period</p>
          </div>
          <div className="p-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10">
            <p className="text-sm text-slate-400 mb-2">Change</p>
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-lg ${isPositive ? 'bg-emerald-500/20' : 'bg-red-500/20'}`}>
                {isPositive ? (
                  <TrendingUp className="h-6 w-6 text-emerald-400" />
                ) : (
                  <TrendingDown className="h-6 w-6 text-red-400" />
                )}
              </div>
              <div>
                <span className={`text-3xl font-bold ${isPositive ? 'text-emerald-400' : 'text-red-400'}`}>
                  {isPositive ? '+' : ''}{summary.totalChangePercent.toFixed(1)}%
                </span>
                <p className="text-sm text-slate-400">
                  {formatCurrency(summary.totalChange)}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-6 border-t border-white/10">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-1.5 rounded-lg bg-white/10">
              <BarChart3 className="h-4 w-4 text-primary" />
            </div>
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
