import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Cell, ReferenceLine, LabelList } from "recharts";
import { TrendingUp, ArrowRight } from "lucide-react";
import { RevenueSummary } from "@/types/priceVolume";

interface WaterfallChartProps {
  summary: RevenueSummary;
}

function formatCurrency(value: number): string {
  if (Math.abs(value) >= 1000000) {
    return `£${(value / 1000000).toFixed(1)}M`;
  }
  return `£${(value / 1000).toFixed(0)}K`;
}

export function WaterfallChart({ summary }: WaterfallChartProps) {
  // Calculate the actual monetary contributions
  const priceContribution = (summary.priceVolumeMix.priceChange / summary.totalChangePercent) * summary.totalChange;
  const volumeContribution = (summary.priceVolumeMix.volumeChange / summary.totalChangePercent) * summary.totalChange;
  const mixContribution = (summary.priceVolumeMix.mixChange / summary.totalChangePercent) * summary.totalChange;

  // Waterfall data - each bar shows cumulative value with invisible base
  const data = [
    {
      name: summary.previousPeriod,
      value: summary.totalPreviousRevenue,
      base: 0,
      fill: "hsl(var(--muted-foreground))",
      label: formatCurrency(summary.totalPreviousRevenue),
      type: "total"
    },
    {
      name: "Price",
      value: priceContribution,
      base: summary.totalPreviousRevenue,
      fill: "#3b82f6", // blue-500
      label: `+${formatCurrency(priceContribution)}`,
      type: "delta"
    },
    {
      name: "Volume",
      value: volumeContribution,
      base: summary.totalPreviousRevenue + priceContribution,
      fill: "#10b981", // emerald-500
      label: `+${formatCurrency(volumeContribution)}`,
      type: "delta"
    },
    {
      name: "Mix",
      value: mixContribution,
      base: summary.totalPreviousRevenue + priceContribution + volumeContribution,
      fill: "#f59e0b", // amber-500
      label: `+${formatCurrency(mixContribution)}`,
      type: "delta"
    },
    {
      name: summary.period,
      value: summary.totalCurrentRevenue,
      base: 0,
      fill: "hsl(var(--primary))",
      label: formatCurrency(summary.totalCurrentRevenue),
      type: "total"
    },
  ];

  const maxValue = Math.max(summary.totalCurrentRevenue, summary.totalPreviousRevenue) * 1.1;

  return (
    <Card className="shadow-lg border-border/50 overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-muted/30 to-transparent border-b border-border/50">
        <CardTitle className="flex items-center gap-3 text-lg">
          <div className="p-2 rounded-lg bg-primary/10">
            <TrendingUp className="h-5 w-5 text-primary" />
          </div>
          Revenue Bridge
          <div className="ml-auto flex items-center gap-2 text-sm font-normal text-muted-foreground">
            <span>{summary.previousPeriod}</span>
            <ArrowRight className="h-4 w-4" />
            <span>{summary.period}</span>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        {/* Chart */}
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              margin={{ top: 40, right: 30, left: 30, bottom: 20 }}
              barGap={0}
            >
              <XAxis 
                dataKey="name" 
                axisLine={false}
                tickLine={false}
                tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12, fontWeight: 500 }}
              />
              <YAxis 
                domain={[0, maxValue]}
                axisLine={false}
                tickLine={false}
                tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 11 }}
                tickFormatter={(value) => formatCurrency(value)}
              />
              <ReferenceLine y={summary.totalPreviousRevenue} stroke="hsl(var(--border))" strokeDasharray="3 3" />
              
              {/* Invisible base bar */}
              <Bar dataKey="base" stackId="stack" fill="transparent" />
              
              {/* Actual value bar */}
              <Bar 
                dataKey="value" 
                stackId="stack" 
                radius={[4, 4, 0, 0]}
                maxBarSize={80}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
                <LabelList 
                  dataKey="label" 
                  position="top" 
                  fill="hsl(var(--foreground))"
                  fontSize={12}
                  fontWeight={600}
                  offset={8}
                />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Legend */}
        <div className="flex items-center justify-center gap-6 mt-4 pt-4 border-t border-border/50">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded bg-[#3b82f6]" />
            <span className="text-sm text-muted-foreground">Price Impact</span>
            <span className="text-sm font-semibold">+{summary.priceVolumeMix.priceChange.toFixed(1)}%</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded bg-[#10b981]" />
            <span className="text-sm text-muted-foreground">Volume Impact</span>
            <span className="text-sm font-semibold">+{summary.priceVolumeMix.volumeChange.toFixed(1)}%</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded bg-[#f59e0b]" />
            <span className="text-sm text-muted-foreground">Mix Impact</span>
            <span className="text-sm font-semibold">+{summary.priceVolumeMix.mixChange.toFixed(1)}%</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
