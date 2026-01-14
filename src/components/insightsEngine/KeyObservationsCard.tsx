import { Eye, AlertTriangle, CheckCircle, Lightbulb, AlertCircle, Calendar } from "lucide-react";
import { InsightCard } from "@/types/insightsEngine";
import { InsightCardWrapper, useHighlight } from "./InsightCardWrapper";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface KeyObservationsCardProps {
  data: InsightCard;
}

const statusConfig = {
  critical: { 
    label: "Critical", 
    className: "bg-red-50 text-red-600 border-red-200",
    icon: AlertTriangle,
    iconColor: "text-red-500",
    bgColor: "bg-red-50",
    borderColor: "border-l-red-400"
  },
  positive: { 
    label: "Positive", 
    className: "bg-emerald-50 text-emerald-600 border-emerald-200",
    icon: CheckCircle,
    iconColor: "text-emerald-500",
    bgColor: "bg-emerald-50",
    borderColor: "border-l-emerald-400"
  },
  opportunity: { 
    label: "Opportunity", 
    className: "bg-primary/10 text-primary border-primary/20",
    icon: Lightbulb,
    iconColor: "text-primary",
    bgColor: "bg-primary/5",
    borderColor: "border-l-primary"
  },
  warning: { 
    label: "Warning", 
    className: "bg-amber-50 text-amber-600 border-amber-200",
    icon: AlertCircle,
    iconColor: "text-amber-500",
    bgColor: "bg-amber-50",
    borderColor: "border-l-amber-400"
  },
};

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

export function KeyObservationsCard({ data }: KeyObservationsCardProps) {
  return (
    <InsightCardWrapper
      title={data.title}
      icon={<Eye className="h-4 w-4 text-primary" />}
      suggestedQuestions={data.suggestedQuestions}
      sources={data.sources}
    >
      <KeyObservationsContent data={data} />
    </InsightCardWrapper>
  );
}

function KeyObservationsContent({ data }: KeyObservationsCardProps) {
  return (
    <>
      {/* Summary - Enhanced */}
      {data.summary && (
        <div className="mb-8 p-5 bg-gradient-to-r from-gray-50 to-transparent rounded-xl border border-gray-100">
          <h4 className="font-bold text-foreground mb-3 flex items-center gap-2">
            <div className="w-1 h-5 bg-primary rounded-full" />
            Summary
          </h4>
          <p className="text-sm text-muted-foreground leading-relaxed">
            <HighlightedText text={data.summary} />
          </p>
        </div>
      )}

      {/* Observations List - Enhanced */}
      {data.observations && (
        <div className="space-y-4">
          {data.observations.map((obs, idx) => {
            const status = statusConfig[obs.status];
            const IconComponent = status.icon;
            return (
              <div 
                key={obs.id} 
                className={cn(
                  "relative flex items-start gap-4 p-5 rounded-xl border-l-4 transition-all duration-300",
                  "bg-white hover:shadow-lg hover:-translate-y-0.5",
                  "border border-gray-100",
                  status.borderColor
                )}
                style={{ animationDelay: `${idx * 100}ms` }}
              >
                <div className={cn(
                  "w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0",
                  status.bgColor
                )}>
                  <IconComponent className={cn("h-5 w-5", status.iconColor)} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h5 className="font-bold text-foreground">{obs.title}</h5>
                    <Badge variant="outline" className={cn("flex-shrink-0 font-semibold", status.className)}>
                      {status.label}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    <HighlightedText text={obs.description} />
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Report Date - Enhanced */}
      {(data.reportDate || data.dataCurrency) && (
        <div className="mt-8 pt-5 border-t border-gray-100">
          <div className="flex items-center gap-6">
            {data.reportDate && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Calendar className="h-4 w-4" />
                <span><strong className="text-foreground">Report Date:</strong> {data.reportDate}</span>
              </div>
            )}
            {data.dataCurrency && (
              <div className="text-sm text-muted-foreground">
                <strong className="text-foreground">Data Currency:</strong> {data.dataCurrency}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
