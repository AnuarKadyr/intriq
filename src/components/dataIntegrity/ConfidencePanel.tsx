import { TrendingUp, CheckCircle2, AlertTriangle, Clock, FileWarning } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ConfidenceScore, IssueCategory } from "@/types/dataIntegrity";
import { issueCategoryLabels } from "@/data/dataIntegrityData";
import { cn } from "@/lib/utils";

interface ConfidencePanelProps {
  confidenceScore: ConfidenceScore;
}

export function ConfidencePanel({ confidenceScore }: ConfidencePanelProps) {
  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-emerald-600";
    if (score >= 50) return "text-amber-600";
    return "text-red-600";
  };

  const getProgressColor = (score: number) => {
    if (score >= 80) return "bg-emerald-500";
    if (score >= 50) return "bg-amber-500";
    return "bg-red-500";
  };

  const getScoreIcon = (score: number) => {
    if (score >= 80) return <CheckCircle2 className="h-4 w-4 text-emerald-500" />;
    if (score >= 50) return <Clock className="h-4 w-4 text-amber-500" />;
    return <AlertTriangle className="h-4 w-4 text-red-500" />;
  };

  return (
    <div className="space-y-4">
      {/* Overall Confidence */}
      <Card className="p-5 bg-gradient-to-br from-gray-50 to-gray-100 border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-gray-600" />
            <h3 className="text-sm font-semibold text-gray-900">Data Confidence Score</h3>
          </div>
        </div>
        
        <div className="flex items-end gap-3 mb-4">
          <span className={cn("text-5xl font-bold", getScoreColor(confidenceScore.overall))}>
            {confidenceScore.overall}
          </span>
          <span className="text-xl text-gray-400 mb-1">/ 100</span>
        </div>
        
        <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
          <div 
            className={cn("h-full rounded-full transition-all duration-500", getProgressColor(confidenceScore.overall))}
            style={{ width: `${confidenceScore.overall}%` }}
          />
        </div>
        
        <p className="text-xs text-gray-500 mt-3">
          {confidenceScore.overall >= 80 
            ? "High confidence - Data is well verified"
            : confidenceScore.overall >= 50 
            ? "Moderate confidence - Some issues need attention"
            : "Low confidence - Critical issues require resolution"}
        </p>
      </Card>

      {/* Category Breakdown */}
      <Card className="p-4">
        <h3 className="text-sm font-semibold text-gray-900 mb-4">Confidence by Category</h3>
        
        <div className="space-y-4">
          {confidenceScore.categories.map(cat => {
            const categoryInfo = issueCategoryLabels[cat.category];
            
            return (
              <div key={cat.category}>
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-2">
                    {getScoreIcon(cat.score)}
                    <span className="text-xs font-medium text-gray-700">
                      {categoryInfo.label}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-500">
                      {cat.resolvedCount}/{cat.issueCount}
                    </span>
                    <span className={cn("text-sm font-bold", getScoreColor(cat.score))}>
                      {cat.score}%
                    </span>
                  </div>
                </div>
                
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div 
                    className={cn("h-full rounded-full transition-all duration-500", getProgressColor(cat.score))}
                    style={{ width: `${cat.score}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </Card>

      {/* Tips */}
      <Card className="p-4 bg-primary/5 border-primary/20">
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 bg-primary/20 rounded-lg flex items-center justify-center flex-shrink-0">
            <FileWarning className="h-4 w-4 text-primary" />
          </div>
          <div>
            <h4 className="text-sm font-semibold text-gray-900 mb-1">Improve Confidence</h4>
            <p className="text-xs text-gray-600 leading-relaxed">
              Resolve critical and high severity issues first. Apply assumptions with clear rationale 
              when exact data is unavailable. AI suggestions can help identify the best approach.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}
