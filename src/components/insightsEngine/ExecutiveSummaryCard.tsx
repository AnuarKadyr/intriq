import { Sparkles, TrendingUp, TrendingDown } from "lucide-react";
import { InsightCard } from "@/types/insightsEngine";
import { InsightCardWrapper } from "./InsightCardWrapper";
import { cn } from "@/lib/utils";

interface ExecutiveSummaryCardProps {
  data: InsightCard;
}

// Mini sparkline component for trend visualization
function MiniTrendChart({ trend, change }: { trend?: "up" | "down" | "neutral"; change?: string }) {
  const isUp = trend === "up";
  const points = isUp 
    ? "0,16 4,14 8,12 12,10 16,6 20,8 24,4 28,2 32,0"
    : "0,0 4,2 8,4 12,8 16,6 20,10 24,14 28,12 32,16";
  
  return (
    <div className="flex items-center gap-1.5">
      <svg width="32" height="16" viewBox="0 0 32 16" className="flex-shrink-0">
        <polyline
          points={points}
          fill="none"
          stroke={isUp ? "#10b981" : "#ef4444"}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      {change && (
        <div className={cn(
          "flex items-center gap-0.5 text-xs font-medium",
          isUp ? "text-emerald-600" : "text-red-500"
        )}>
          {isUp ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
          {change}
        </div>
      )}
    </div>
  );
}

export function ExecutiveSummaryCard({ data }: ExecutiveSummaryCardProps) {
  return (
    <InsightCardWrapper
      title={data.title}
      icon={<Sparkles className="h-4 w-4 text-primary" />}
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
              <p className="text-xs text-primary font-medium mb-1">{kpi.label}</p>
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

      {/* Summary Section */}
      <div className="space-y-4">
        <h4 className="font-semibold text-foreground">Summary</h4>
        {data.summaryParagraphs?.map((paragraph, idx) => (
          <p key={idx} className="text-sm text-muted-foreground leading-relaxed">
            {paragraph}
          </p>
        ))}
      </div>

      {/* Recommended Actions */}
      {data.recommendedActions && data.recommendedActions.length > 0 && (
        <div className="mt-6">
          <h4 className="font-semibold text-foreground mb-3">Recommended Actions</h4>
          <ul className="space-y-2">
            {data.recommendedActions.map((action, idx) => (
              <li key={idx} className="flex items-start gap-2 text-sm text-muted-foreground">
                <span className="text-primary mt-0.5">•</span>
                {action}
              </li>
            ))}
          </ul>
        </div>
      )}
    </InsightCardWrapper>
  );
}
