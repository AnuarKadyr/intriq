import { Building2 } from "lucide-react";
import { InsightCard } from "@/types/insightsEngine";
import { InsightCardWrapper } from "./InsightCardWrapper";
import { cn } from "@/lib/utils";

interface BusinessOverviewCardProps {
  data: InsightCard;
}

// Mini sparkline component for trend visualization
function MiniTrendChart({ trend, change }: { trend?: "up" | "down" | "neutral"; change?: string }) {
  const isUp = trend === "up";
  
  return (
    <div className="flex items-center gap-1">
      <svg width="24" height="12" viewBox="0 0 24 12" className="flex-shrink-0">
        <path
          d={isUp 
            ? "M2 10 Q6 8 8 6 T14 4 T22 2" 
            : "M2 2 Q6 4 8 6 T14 8 T22 10"
          }
          fill="none"
          stroke={isUp ? "#10b981" : "#ef4444"}
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
      {change && (
        <span className={cn(
          "text-xs font-medium",
          isUp ? "text-emerald-600" : "text-red-500"
        )}>
          {change}
        </span>
      )}
    </div>
  );
}

export function BusinessOverviewCard({ data }: BusinessOverviewCardProps) {
  return (
    <InsightCardWrapper
      title={data.title}
      icon={<Building2 className="h-4 w-4 text-primary" />}
      suggestedQuestions={data.suggestedQuestions}
    >
      {/* KPI Row */}
      {data.kpis && (
        <div className="grid grid-cols-5 gap-4 p-4 bg-gray-50 rounded-xl border border-gray-100 mb-6">
          {data.kpis.map((kpi, idx) => (
            <div key={idx} className={cn(
              "text-center",
              idx !== data.kpis!.length - 1 && "border-r border-gray-200"
            )}>
              <p className="text-xs text-muted-foreground font-medium mb-1">{kpi.label}</p>
              <div className="flex items-center justify-center gap-2">
                <p className="text-2xl font-bold text-foreground">{kpi.value}</p>
                {kpi.trend && kpi.change && (
                  <MiniTrendChart trend={kpi.trend} change={kpi.change} />
                )}
              </div>
              {kpi.subLabel && (
                <p className="text-xs text-muted-foreground mt-0.5">{kpi.subLabel}</p>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Summary */}
      {data.summary && (
        <div>
          <h4 className="font-semibold text-foreground mb-2">Summary</h4>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {data.summary}
          </p>
        </div>
      )}
    </InsightCardWrapper>
  );
}
