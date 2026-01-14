import { Sparkles } from "lucide-react";
import { InsightCard } from "@/types/insightsEngine";
import { InsightCardWrapper } from "./InsightCardWrapper";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface AIAnalysisCardProps {
  data: InsightCard;
}

const riskLevelConfig = {
  low: { label: "Low Risk", className: "bg-emerald-50 text-emerald-600 border-emerald-200" },
  medium: { label: "Medium Risk", className: "bg-amber-50 text-amber-600 border-amber-200" },
  high: { label: "High Risk", className: "bg-red-50 text-red-600 border-red-200" },
};

export function AIAnalysisCard({ data }: AIAnalysisCardProps) {
  const riskLevel = data.riskLevel || "medium";
  const riskConfig = riskLevelConfig[riskLevel];
  
  return (
    <InsightCardWrapper
      title={data.title}
      icon={<Sparkles className="h-4 w-4 text-primary" />}
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

      {/* Risk Score */}
      {data.riskScore !== undefined && (
        <div className="mb-6 py-4">
          <div className="flex items-center justify-between mb-3">
            <h4 className="font-semibold text-foreground">Risk Score</h4>
            <Badge variant="outline" className={riskConfig.className}>
              {riskConfig.label}
            </Badge>
          </div>
          
          {/* Risk Score Visualization */}
          <div className="flex items-center gap-4">
            <div className="flex-1 flex gap-0.5">
              {Array.from({ length: 50 }).map((_, idx) => {
                const isFilled = idx < Math.floor(data.riskScore! / 2);
                const fillColor = data.riskScore! >= 70 
                  ? "bg-red-400" 
                  : data.riskScore! >= 40 
                    ? "bg-amber-400" 
                    : "bg-emerald-400";
                return (
                  <div
                    key={idx}
                    className={cn(
                      "h-6 w-1 rounded-sm",
                      isFilled ? fillColor : "bg-gray-200"
                    )}
                  />
                );
              })}
            </div>
            <span className="text-xl font-bold text-foreground">{data.riskScore}/100</span>
          </div>
        </div>
      )}

      {/* Risk Factors */}
      {data.riskFactors && data.riskFactors.length > 0 && (
        <div>
          <h4 className="font-semibold text-foreground mb-3">Risk Factors</h4>
          <ul className="space-y-2">
            {data.riskFactors.map((factor) => (
              <li key={factor.id} className="flex items-start gap-2 text-sm text-muted-foreground">
                <span className={cn(
                  "w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0",
                  data.riskScore! >= 70 ? "bg-red-400" : data.riskScore! >= 40 ? "bg-amber-400" : "bg-emerald-400"
                )} />
                {factor.description}
              </li>
            ))}
          </ul>
        </div>
      )}
    </InsightCardWrapper>
  );
}
