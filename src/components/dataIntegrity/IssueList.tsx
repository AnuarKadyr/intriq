import { AlertTriangle, CheckCircle2, Clock, XCircle, FileText } from "lucide-react";
import { Card } from "@/components/ui/card";
import { DataIntegrityIssue } from "@/types/dataIntegrity";
import { issueCategoryLabels } from "@/data/dataIntegrityData";
import { cn } from "@/lib/utils";

interface IssueListProps {
  issues: DataIntegrityIssue[];
  selectedIssue: DataIntegrityIssue | null;
  onSelectIssue: (issue: DataIntegrityIssue) => void;
}

export function IssueList({ issues, selectedIssue, onSelectIssue }: IssueListProps) {
  const getStatusIcon = (status: DataIntegrityIssue["status"]) => {
    switch (status) {
      case "resolved":
        return <CheckCircle2 className="h-4 w-4 text-emerald-500" />;
      case "assumption-applied":
        return <Clock className="h-4 w-4 text-amber-500" />;
      case "ignored":
        return <XCircle className="h-4 w-4 text-gray-400" />;
      default:
        return <AlertTriangle className="h-4 w-4 text-red-500" />;
    }
  };

  const getSeverityColor = (severity: DataIntegrityIssue["severity"]) => {
    switch (severity) {
      case "critical":
        return "bg-red-500";
      case "high":
        return "bg-orange-500";
      case "medium":
        return "bg-amber-500";
      default:
        return "bg-gray-400";
    }
  };

  if (issues.length === 0) {
    return (
      <Card className="p-8 text-center">
        <CheckCircle2 className="h-12 w-12 text-emerald-500 mx-auto mb-3" />
        <h3 className="font-semibold text-gray-900 mb-1">No Issues Found</h3>
        <p className="text-sm text-gray-500">All data integrity checks passed for this filter.</p>
      </Card>
    );
  }

  return (
    <div className="space-y-2">
      {issues.map(issue => {
        const categoryInfo = issueCategoryLabels[issue.category];
        const isSelected = selectedIssue?.id === issue.id;
        
        return (
          <Card
            key={issue.id}
            onClick={() => onSelectIssue(issue)}
            className={cn(
              "p-3 cursor-pointer transition-all hover:shadow-md",
              isSelected ? "ring-2 ring-primary bg-primary/5" : "hover:bg-gray-50",
              issue.status === "resolved" && "opacity-60",
              issue.status === "ignored" && "opacity-40"
            )}
          >
            <div className="flex items-start gap-3">
              {/* Severity Indicator */}
              <div className={cn("w-1 h-full min-h-[60px] rounded-full flex-shrink-0", getSeverityColor(issue.severity))} />
              
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2 mb-1">
                  <div className="flex items-center gap-2">
                    {getStatusIcon(issue.status)}
                    <span className={cn(
                      "text-[10px] px-1.5 py-0.5 rounded-full font-medium",
                      categoryInfo.bgColor,
                      categoryInfo.color
                    )}>
                      {categoryInfo.label}
                    </span>
                  </div>
                  <span className="text-[10px] text-gray-400 uppercase font-medium">
                    {issue.severity}
                  </span>
                </div>
                
                <h4 className="text-sm font-medium text-gray-900 line-clamp-2 mb-1">
                  {issue.title}
                </h4>
                
                {issue.discrepancy && (
                  <p className="text-xs text-red-600 font-medium">
                    Δ {issue.discrepancy}
                  </p>
                )}
                
                <div className="flex items-center gap-2 mt-2">
                  <FileText className="h-3 w-3 text-gray-400" />
                  <span className="text-[10px] text-gray-500">
                    {issue.sources.length} source{issue.sources.length !== 1 ? 's' : ''}
                  </span>
                  {issue.aiSuggestions.length > 0 && (
                    <>
                      <span className="text-gray-300">•</span>
                      <span className="text-[10px] text-primary font-medium">
                        {issue.aiSuggestions.length} AI suggestion{issue.aiSuggestions.length !== 1 ? 's' : ''}
                      </span>
                    </>
                  )}
                </div>
              </div>
            </div>
          </Card>
        );
      })}
    </div>
  );
}
