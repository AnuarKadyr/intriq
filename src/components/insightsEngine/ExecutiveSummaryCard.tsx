import { Sparkles, CheckCircle2 } from "lucide-react";
import { InsightCard } from "@/types/insightsEngine";
import { InsightCardWrapper, useHighlight } from "./InsightCardWrapper";
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
          "text-xs font-semibold",
          isUp ? "text-emerald-600" : "text-red-500"
        )}>
          {change}
        </span>
      )}
    </div>
  );
}

// Helper to highlight text
function HighlightedText({ text, className }: { text: string; className?: string }) {
  const { highlightText } = useHighlight();
  
  if (!highlightText || !text.includes(highlightText)) {
    return <span className={className}>{text}</span>;
  }
  
  const parts = text.split(highlightText);
  return (
    <span className={className}>
      {parts.map((part, idx) => (
        <span key={idx}>
          {part}
          {idx < parts.length - 1 && (
            <mark className="bg-primary/20 text-foreground px-0.5 rounded transition-all duration-300 ring-2 ring-primary/30">
              {highlightText}
            </mark>
          )}
        </span>
      ))}
    </span>
  );
}

export function ExecutiveSummaryCard({ data }: ExecutiveSummaryCardProps) {
  return (
    <InsightCardWrapper
      title={data.title}
      icon={<Sparkles className="h-4 w-4 text-primary" />}
      suggestedQuestions={data.suggestedQuestions}
      sources={data.sources}
    >
      <ExecutiveSummaryContent data={data} />
    </InsightCardWrapper>
  );
}

function ExecutiveSummaryContent({ data }: ExecutiveSummaryCardProps) {
  return (
    <>
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

      {/* Summary Section - Enhanced */}
      <div className="space-y-4 mb-8">
        <h4 className="font-bold text-foreground flex items-center gap-2">
          <div className="w-1 h-5 bg-primary rounded-full" />
          Summary
        </h4>
        {data.summaryParagraphs?.map((paragraph, idx) => (
          <p key={idx} className="text-sm text-muted-foreground leading-relaxed pl-3">
            <HighlightedText text={paragraph} />
          </p>
        ))}
      </div>

      {/* Recommended Actions - Enhanced */}
      {data.recommendedActions && data.recommendedActions.length > 0 && (
        <div className="p-5 bg-gradient-to-br from-primary/[0.03] to-primary/[0.08] rounded-xl border border-primary/10">
          <h4 className="font-bold text-foreground mb-4 flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-primary" />
            Recommended Actions
          </h4>
          <ul className="space-y-3">
            {data.recommendedActions.map((action, idx) => (
              <li 
                key={idx} 
                className="flex items-start gap-3 text-sm text-muted-foreground group"
              >
                <span className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 text-xs font-bold text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                  {idx + 1}
                </span>
                <span className="pt-0.5">{action}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}
