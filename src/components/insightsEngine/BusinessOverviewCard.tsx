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
          "text-xs font-semibold",
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
      {/* KPI Row - Enhanced */}
      {data.kpis && (
        <div className="grid grid-cols-5 gap-1 p-1.5 bg-gradient-to-br from-gray-50 to-gray-100/50 rounded-2xl border border-gray-100 mb-8 shadow-sm">
          {data.kpis.map((kpi, idx) => (
            <div 
              key={idx} 
              className={cn(
                "relative text-center py-5 px-3 rounded-xl transition-all duration-300",
                "hover:bg-white hover:shadow-lg hover:shadow-gray-100/80 hover:-translate-y-0.5",
                "group cursor-default"
              )}
            >
              <p className="text-xs text-muted-foreground font-medium mb-2 uppercase tracking-wide">{kpi.label}</p>
              <div className="flex items-center justify-center gap-2">
                <p className="text-2xl font-bold text-foreground tracking-tight group-hover:text-primary transition-colors">{kpi.value}</p>
                {kpi.trend && kpi.change && (
                  <MiniTrendChart trend={kpi.trend} change={kpi.change} />
                )}
              </div>
              {kpi.subLabel && (
                <p className="text-[11px] text-muted-foreground mt-1.5">{kpi.subLabel}</p>
              )}
              {/* Subtle separator */}
              {idx !== data.kpis!.length - 1 && (
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-px h-12 bg-gray-200/60" />
              )}
            </div>
          ))}
        </div>
      )}

      {/* Summary - Enhanced */}
      {data.summary && (
        <div className="p-5 bg-gradient-to-r from-gray-50 to-transparent rounded-xl border border-gray-100">
          <h4 className="font-bold text-foreground mb-3 flex items-center gap-2">
            <div className="w-1 h-5 bg-primary rounded-full" />
            Summary
          </h4>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {data.summary}
          </p>
        </div>
      )}
    </InsightCardWrapper>
  );
}
