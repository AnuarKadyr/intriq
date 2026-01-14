import { Building2 } from "lucide-react";
import { InsightCard } from "@/types/insightsEngine";
import { InsightCardWrapper } from "./InsightCardWrapper";
import { cn } from "@/lib/utils";

interface BusinessOverviewCardProps {
  data: InsightCard;
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
              <p className="text-xs text-primary font-medium mb-1">{kpi.label}</p>
              <p className="text-2xl font-bold text-foreground">{kpi.value}</p>
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
