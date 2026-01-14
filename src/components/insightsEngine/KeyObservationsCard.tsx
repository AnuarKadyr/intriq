import { Eye } from "lucide-react";
import { InsightCard } from "@/types/insightsEngine";
import { InsightCardWrapper } from "./InsightCardWrapper";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface KeyObservationsCardProps {
  data: InsightCard;
}

const statusConfig = {
  critical: { label: "Critical", className: "bg-red-50 text-red-600 border-red-200" },
  positive: { label: "Positive", className: "bg-emerald-50 text-emerald-600 border-emerald-200" },
  opportunity: { label: "Opportunity", className: "bg-primary/10 text-primary border-primary/20" },
  warning: { label: "Warning", className: "bg-amber-50 text-amber-600 border-amber-200" },
};

export function KeyObservationsCard({ data }: KeyObservationsCardProps) {
  return (
    <InsightCardWrapper
      title={data.title}
      icon={<Eye className="h-4 w-4 text-primary" />}
      suggestedQuestions={data.suggestedQuestions}
    >
      {/* Summary */}
      {data.summary && (
        <div className="mb-6">
          <h4 className="font-semibold text-foreground mb-2">Summary</h4>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {data.summary}
          </p>
        </div>
      )}

      {/* Observations List */}
      {data.observations && (
        <div className="space-y-4">
          {data.observations.map((obs) => {
            const status = statusConfig[obs.status];
            return (
              <div key={obs.id} className="flex items-start justify-between gap-4 py-3 border-t border-gray-100">
                <div className="flex-1">
                  <h5 className="font-semibold text-foreground mb-1">{obs.title}</h5>
                  <p className="text-sm text-muted-foreground">{obs.description}</p>
                </div>
                <Badge variant="outline" className={cn("flex-shrink-0", status.className)}>
                  {status.label}
                </Badge>
              </div>
            );
          })}
        </div>
      )}

      {/* Report Date */}
      {(data.reportDate || data.dataCurrency) && (
        <div className="mt-6 pt-4 border-t border-gray-100">
          <p className="text-sm text-muted-foreground italic">
            {data.reportDate && <><strong>Report Date:</strong> {data.reportDate}</>}
            {data.reportDate && data.dataCurrency && " | "}
            {data.dataCurrency && <><strong>Data Currency:</strong> {data.dataCurrency}</>}
          </p>
        </div>
      )}
    </InsightCardWrapper>
  );
}
