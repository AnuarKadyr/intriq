import { Sparkles, AlertCircle } from "lucide-react";
import { InsightCard } from "@/types/insightsEngine";
import { InsightCardWrapper } from "./InsightCardWrapper";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface AIAnalysisCardProps {
  data: InsightCard;
}

const riskLevelConfig = {
  low: { label: "Low Risk", className: "bg-emerald-50 text-emerald-600 border-emerald-200", color: "emerald" },
  medium: { label: "Medium Risk", className: "bg-amber-50 text-amber-600 border-amber-200", color: "amber" },
  high: { label: "High Risk", className: "bg-red-50 text-red-600 border-red-200", color: "red" },
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
      {/* Summary - Enhanced */}
      {data.summary && (
        <div className="mb-8 p-5 bg-gradient-to-r from-gray-50 to-transparent rounded-xl border border-gray-100">
          <h4 className="font-bold text-foreground mb-3 flex items-center gap-2">
            <div className="w-1 h-5 bg-primary rounded-full" />
            Summary
          </h4>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {data.summary}
          </p>
        </div>
      )}

      {/* Risk Score - Enhanced */}
      {data.riskScore !== undefined && (
        <div className="mb-8 p-6 bg-gradient-to-br from-gray-50 to-white rounded-2xl border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h4 className="font-bold text-foreground text-lg">Risk Assessment</h4>
            <Badge variant="outline" className={cn("font-semibold px-3 py-1", riskConfig.className)}>
              {riskConfig.label}
            </Badge>
          </div>
          
          {/* Risk Score Visualization - Enhanced */}
          <div className="flex items-center gap-6">
            <div className="flex-1">
              <div className="flex gap-[2px] mb-2">
                {Array.from({ length: 50 }).map((_, idx) => {
                  const isFilled = idx < Math.floor(data.riskScore! / 2);
                  const segmentRisk = (idx / 50) * 100;
                  const getColor = () => {
                    if (!isFilled) return "bg-gray-200";
                    if (segmentRisk < 33) return "bg-emerald-400";
                    if (segmentRisk < 66) return "bg-amber-400";
                    return "bg-red-400";
                  };
                  return (
                    <div
                      key={idx}
                      className={cn(
                        "h-8 flex-1 rounded-sm transition-all duration-300",
                        getColor(),
                        isFilled && "shadow-sm"
                      )}
                      style={{ 
                        animationDelay: `${idx * 20}ms`,
                        opacity: isFilled ? 1 : 0.4
                      }}
                    />
                  );
                })}
              </div>
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Low</span>
                <span>Medium</span>
                <span>High</span>
              </div>
            </div>
            <div className="text-center">
              <span className="text-4xl font-bold text-foreground">{data.riskScore}</span>
              <span className="text-lg text-muted-foreground">/100</span>
            </div>
          </div>
        </div>
      )}

      {/* Risk Factors - Enhanced */}
      {data.riskFactors && data.riskFactors.length > 0 && (
        <div>
          <h4 className="font-bold text-foreground mb-4 flex items-center gap-2">
            <AlertCircle className="h-4 w-4 text-primary" />
            Risk Factors Identified
          </h4>
          <div className="space-y-3">
            {data.riskFactors.map((factor, idx) => (
              <div 
                key={factor.id} 
                className="flex items-start gap-3 p-4 bg-gradient-to-r from-gray-50 to-transparent rounded-xl border border-gray-100 hover:shadow-md hover:border-gray-200 transition-all duration-300"
              >
                <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 text-xs font-bold text-primary">
                  {idx + 1}
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed pt-0.5">
                  {factor.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </InsightCardWrapper>
  );
}
