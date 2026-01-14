import { Sparkles } from "lucide-react";
import { InsightCard } from "@/types/insightsEngine";
import { InsightCardWrapper } from "./InsightCardWrapper";
import { cn } from "@/lib/utils";

interface ExecutiveSummaryCardProps {
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
