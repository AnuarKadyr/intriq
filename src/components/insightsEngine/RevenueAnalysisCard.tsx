import { TrendingUp, TrendingDown, ArrowDownLeft, ArrowUpRight, Calendar } from "lucide-react";
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
    >
      {/* KPI Row */}
      {data.kpis && (
        <div className="flex items-center gap-8 mb-6">
          {data.kpis.map((kpi, idx) => (
            <div key={idx} className="flex items-center gap-3">
              <div className={cn(
                "w-10 h-10 rounded-full flex items-center justify-center",
                idx === 0 ? "bg-gray-100" : idx === 1 ? "bg-gray-100" : "bg-gray-100"
              )}>
                {idx === 0 && <ArrowDownLeft className="h-5 w-5 text-gray-600" />}
                {idx === 1 && <ArrowUpRight className="h-5 w-5 text-gray-600" />}
                {idx === 2 && <Calendar className="h-5 w-5 text-gray-600" />}
              </div>
              <div>
                <p className="text-[10px] uppercase text-muted-foreground tracking-wide">{kpi.label}</p>
                <div className="flex items-center gap-2">
                  <span className="text-xl font-bold text-foreground">{kpi.value}</span>
                  {kpi.change && (
                    <Badge className={cn(
                      "text-[10px] px-1.5 py-0",
                      kpi.trend === "up" ? "bg-emerald-100 text-emerald-700" : "bg-red-100 text-red-700"
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

      {/* Chart */}
      {data.chartData && (
        <div className="mt-4">
          {/* Y-axis labels and chart */}
          <div className="flex">
            <div className="w-10 flex flex-col justify-between text-[10px] text-muted-foreground pr-2">
              <span>25k</span>
              <span>20k</span>
              <span>15k</span>
              <span>10k</span>
              <span>5k</span>
              <span>0</span>
            </div>
            <div className="flex-1 flex items-end justify-between gap-2 h-48 border-l border-b border-gray-200 pl-2 pb-2">
              {data.chartData.map((month, idx) => {
                const total = month.income + month.expenses + month.scheduled;
                const incomeHeight = (month.income / maxValue) * 100;
                const expensesHeight = (month.expenses / maxValue) * 100;
                const scheduledHeight = (month.scheduled / maxValue) * 100;
                
                return (
                  <div key={idx} className="flex-1 flex flex-col items-center gap-1">
                    <div className="w-full flex flex-col-reverse h-40">
                      <div 
                        className="w-full bg-orange-200 rounded-t-sm"
                        style={{ height: `${scheduledHeight}%` }}
                      />
                      <div 
                        className="w-full bg-primary/30"
                        style={{ height: `${expensesHeight}%` }}
                      />
                      <div 
                        className="w-full bg-primary/60"
                        style={{ height: `${incomeHeight}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          {/* X-axis labels */}
          <div className="flex ml-10 mt-2">
            <div className="flex-1 flex justify-between px-1">
              {data.chartData.map((month, idx) => (
                <span key={idx} className="text-[10px] text-muted-foreground text-center flex-1">
                  {month.month.charAt(0)}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}
    </InsightCardWrapper>
  );
}
