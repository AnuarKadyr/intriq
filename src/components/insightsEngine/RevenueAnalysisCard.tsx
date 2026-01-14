import { TrendingUp, ArrowDownLeft, ArrowUpRight, Calendar } from "lucide-react";
import { InsightCard } from "@/types/insightsEngine";
import { InsightCardWrapper } from "./InsightCardWrapper";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface RevenueAnalysisCardProps {
  data: InsightCard;
}

export function RevenueAnalysisCard({ data }: RevenueAnalysisCardProps) {
  const maxValue = Math.max(
    ...(data.chartData?.map(d => d.income + d.expenses + d.scheduled) || [1])
  );

  return (
    <InsightCardWrapper
      title={data.title}
      icon={<TrendingUp className="h-4 w-4 text-primary" />}
      suggestedQuestions={data.suggestedQuestions}
      sources={data.sources}
    >
      {/* KPI Row - Enhanced */}
      {data.kpis && (
        <div className="flex items-center gap-6 mb-8">
          {data.kpis.map((kpi, idx) => (
            <div 
              key={idx} 
              className="flex items-center gap-4 p-4 bg-gradient-to-br from-gray-50 to-white rounded-xl border border-gray-100 hover:shadow-lg hover:border-gray-200 transition-all duration-300 group"
            >
              <div className={cn(
                "w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300",
                idx === 0 ? "bg-gradient-to-br from-emerald-100 to-emerald-50 group-hover:from-emerald-200 group-hover:to-emerald-100" : 
                idx === 1 ? "bg-gradient-to-br from-red-100 to-red-50 group-hover:from-red-200 group-hover:to-red-100" : 
                "bg-gradient-to-br from-primary/20 to-primary/10 group-hover:from-primary/30 group-hover:to-primary/20"
              )}>
                {idx === 0 && <ArrowDownLeft className="h-5 w-5 text-emerald-600" />}
                {idx === 1 && <ArrowUpRight className="h-5 w-5 text-red-500" />}
                {idx === 2 && <Calendar className="h-5 w-5 text-primary" />}
              </div>
              <div>
                <p className="text-[10px] uppercase text-muted-foreground tracking-wider font-medium">{kpi.label}</p>
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-bold text-foreground">{kpi.value}</span>
                  {kpi.change && (
                    <Badge className={cn(
                      "text-[10px] px-2 py-0.5 font-semibold",
                      kpi.trend === "up" ? "bg-emerald-100 text-emerald-700 border-emerald-200" : "bg-red-100 text-red-700 border-red-200"
                    )}>
                      {kpi.change}
                    </Badge>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Chart - Enhanced */}
      {data.chartData && (
        <div className="mt-4 p-6 bg-gradient-to-br from-gray-50/50 to-white rounded-xl border border-gray-100">
          {/* Legend */}
          <div className="flex items-center gap-6 mb-6">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-primary/70" />
              <span className="text-xs text-muted-foreground font-medium">Income</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-primary/30" />
              <span className="text-xs text-muted-foreground font-medium">Expenses</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-orange-300" />
              <span className="text-xs text-muted-foreground font-medium">Scheduled</span>
            </div>
          </div>
          
          {/* Y-axis labels and chart */}
          <div className="flex">
            <div className="w-12 flex flex-col justify-between text-[10px] text-muted-foreground pr-3 py-1">
              <span>25k</span>
              <span>20k</span>
              <span>15k</span>
              <span>10k</span>
              <span>5k</span>
              <span>0</span>
            </div>
            <div className="flex-1 flex items-end justify-between gap-2 h-52 border-l border-b border-gray-200/60 pl-3 pb-3 relative">
              {/* Grid lines */}
              <div className="absolute inset-0 flex flex-col justify-between pointer-events-none">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="w-full h-px bg-gray-100" />
                ))}
              </div>
              
              {data.chartData.map((month, idx) => {
                const incomeHeight = (month.income / maxValue) * 100;
                const expensesHeight = (month.expenses / maxValue) * 100;
                const scheduledHeight = (month.scheduled / maxValue) * 100;
                
                return (
                  <div key={idx} className="flex-1 flex flex-col items-center gap-1 group relative z-10">
                    <div className="w-full flex flex-col-reverse h-44">
                      <div 
                        className="w-full bg-gradient-to-t from-orange-300 to-orange-200 rounded-t-md transition-all duration-500 group-hover:from-orange-400 group-hover:to-orange-300"
                        style={{ height: `${scheduledHeight}%` }}
                      />
                      <div 
                        className="w-full bg-gradient-to-t from-primary/40 to-primary/30 transition-all duration-500 group-hover:from-primary/50 group-hover:to-primary/40"
                        style={{ height: `${expensesHeight}%` }}
                      />
                      <div 
                        className="w-full bg-gradient-to-t from-primary/80 to-primary/60 rounded-t-md transition-all duration-500 group-hover:from-primary group-hover:to-primary/80"
                        style={{ height: `${incomeHeight}%` }}
                      />
                    </div>
                    {/* Hover tooltip */}
                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-foreground text-white text-[10px] px-2 py-1 rounded whitespace-nowrap z-20">
                      £{(month.income / 1000).toFixed(1)}k
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          {/* X-axis labels */}
          <div className="flex ml-12 mt-3">
            <div className="flex-1 flex justify-between px-1">
              {data.chartData.map((month, idx) => (
                <span key={idx} className="text-[11px] text-muted-foreground text-center flex-1 font-medium">
                  {month.month.substring(0, 3)}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}
    </InsightCardWrapper>
  );
}
