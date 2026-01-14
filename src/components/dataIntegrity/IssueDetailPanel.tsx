import { useState } from "react";
import { AlertTriangle, CheckCircle2, FileText, Sparkles, ChevronDown, ChevronRight, Lightbulb, Check, X } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DataIntegrityIssue, Assumption, AISuggestion } from "@/types/dataIntegrity";
import { issueCategoryLabels } from "@/data/dataIntegrityData";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

interface IssueDetailPanelProps {
  issue: DataIntegrityIssue;
  onApplyAssumption: (issueId: string, assumption: Assumption) => void;
  onResolve: (issueId: string) => void;
  onIgnore: (issueId: string) => void;
}

export function IssueDetailPanel({ issue, onApplyAssumption, onResolve, onIgnore }: IssueDetailPanelProps) {
  const [showAssumptionForm, setShowAssumptionForm] = useState(false);
  const [assumptionValue, setAssumptionValue] = useState("");
  const [assumptionRationale, setAssumptionRationale] = useState("");
  const [expandedSuggestion, setExpandedSuggestion] = useState<string | null>(null);

  const categoryInfo = issueCategoryLabels[issue.category];

  const handleApplyAssumption = () => {
    if (!assumptionValue.trim()) {
      toast.error("Please enter an assumed value");
      return;
    }
    
    const assumption: Assumption = {
      id: `assumption-${Date.now()}`,
      description: `Assumed value: ${assumptionValue}`,
      appliedValue: assumptionValue,
      appliedBy: "Current User",
      appliedAt: new Date(),
      rationale: assumptionRationale || "No rationale provided",
    };
    
    onApplyAssumption(issue.id, assumption);
    setShowAssumptionForm(false);
    setAssumptionValue("");
    setAssumptionRationale("");
    toast.success("Assumption applied successfully");
  };

  const handleApplySuggestion = (suggestion: AISuggestion) => {
    const assumption: Assumption = {
      id: `assumption-${Date.now()}`,
      description: suggestion.suggestion,
      appliedValue: suggestion.suggestion,
      appliedBy: "AI Suggestion",
      appliedAt: new Date(),
      rationale: suggestion.rationale,
    };
    
    onApplyAssumption(issue.id, assumption);
    toast.success("AI suggestion applied");
  };

  const getSeverityBadge = (severity: DataIntegrityIssue["severity"]) => {
    const styles = {
      critical: "bg-red-100 text-red-700 border-red-200",
      high: "bg-orange-100 text-orange-700 border-orange-200",
      medium: "bg-amber-100 text-amber-700 border-amber-200",
      low: "bg-gray-100 text-gray-600 border-gray-200",
    };
    return styles[severity];
  };

  const getStatusBadge = (status: DataIntegrityIssue["status"]) => {
    const styles = {
      open: "bg-red-50 text-red-700 border-red-200",
      "assumption-applied": "bg-amber-50 text-amber-700 border-amber-200",
      resolved: "bg-emerald-50 text-emerald-700 border-emerald-200",
      ignored: "bg-gray-50 text-gray-500 border-gray-200",
    };
    return styles[status];
  };

  return (
    <Card className="p-6">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-start justify-between gap-4 mb-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className={cn(
              "text-xs px-2 py-1 rounded-full font-medium",
              categoryInfo.bgColor,
              categoryInfo.color
            )}>
              {categoryInfo.label}
            </span>
            <span className={cn(
              "text-xs px-2 py-1 rounded-full font-medium border",
              getSeverityBadge(issue.severity)
            )}>
              {issue.severity.toUpperCase()}
            </span>
            <span className={cn(
              "text-xs px-2 py-1 rounded-full font-medium border",
              getStatusBadge(issue.status)
            )}>
              {issue.status.replace("-", " ").toUpperCase()}
            </span>
          </div>
        </div>
        
        <h2 className="text-lg font-semibold text-gray-900 mb-2">{issue.title}</h2>
        <p className="text-sm text-gray-600">{issue.description}</p>
      </div>

      {/* Data Sources */}
      <div className="mb-6">
        <h3 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
          <FileText className="h-4 w-4 text-gray-500" />
          Data Sources
        </h3>
        <div className="space-y-2">
          {issue.sources.map((source, idx) => (
            <div 
              key={source.id}
              className={cn(
                "p-3 rounded-lg border",
                idx === 0 ? "bg-blue-50 border-blue-200" : "bg-gray-50 border-gray-200"
              )}
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-sm font-medium text-gray-900">{source.fileName}</p>
                  <p className="text-xs text-gray-500">{source.reference}</p>
                </div>
                <p className={cn(
                  "text-sm font-bold",
                  idx === 0 ? "text-blue-700" : "text-gray-700"
                )}>
                  {source.value}
                </p>
              </div>
            </div>
          ))}
        </div>
        
        {issue.discrepancy && (
          <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-sm font-medium text-red-700">
              Discrepancy: {issue.discrepancy}
            </p>
          </div>
        )}
      </div>

      {/* Applied Assumption */}
      {issue.assumption && (
        <div className="mb-6 p-4 bg-amber-50 border border-amber-200 rounded-lg">
          <div className="flex items-start gap-3">
            <CheckCircle2 className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-semibold text-amber-900 mb-1">Assumption Applied</p>
              <p className="text-sm text-amber-800">{issue.assumption.description}</p>
              <p className="text-xs text-amber-600 mt-2">
                {issue.assumption.rationale}
              </p>
              <p className="text-xs text-amber-500 mt-1">
                Applied by {issue.assumption.appliedBy} on {issue.assumption.appliedAt.toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* AI Suggestions */}
      {issue.aiSuggestions.length > 0 && issue.status === "open" && (
        <div className="mb-6">
          <h3 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-primary" />
            AI Suggestions
          </h3>
          <div className="space-y-2">
            {issue.aiSuggestions.map(suggestion => (
              <div 
                key={suggestion.id}
                className="p-3 bg-gradient-to-br from-primary/5 to-primary/10 border border-primary/20 rounded-lg"
              >
                <button
                  onClick={() => setExpandedSuggestion(
                    expandedSuggestion === suggestion.id ? null : suggestion.id
                  )}
                  className="w-full text-left"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-start gap-2">
                      <Lightbulb className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                      <p className="text-sm text-gray-800">{suggestion.suggestion}</p>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <span className={cn(
                        "text-xs px-2 py-0.5 rounded-full font-medium",
                        suggestion.confidence >= 80 ? "bg-emerald-100 text-emerald-700" :
                        suggestion.confidence >= 60 ? "bg-amber-100 text-amber-700" :
                        "bg-gray-100 text-gray-600"
                      )}>
                        {suggestion.confidence}% confidence
                      </span>
                      {expandedSuggestion === suggestion.id ? (
                        <ChevronDown className="h-4 w-4 text-gray-400" />
                      ) : (
                        <ChevronRight className="h-4 w-4 text-gray-400" />
                      )}
                    </div>
                  </div>
                </button>
                
                {expandedSuggestion === suggestion.id && (
                  <div className="mt-3 pt-3 border-t border-primary/20">
                    <p className="text-xs text-gray-600 mb-3">{suggestion.rationale}</p>
                    <Button 
                      size="sm" 
                      onClick={() => handleApplySuggestion(suggestion)}
                      className="gap-1.5"
                    >
                      <Check className="h-3 w-3" />
                      Apply This Suggestion
                    </Button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Impacted Areas */}
      <div className="mb-6">
        <h3 className="text-sm font-semibold text-gray-900 mb-2">Impacted Areas</h3>
        <div className="flex flex-wrap gap-1">
          {issue.impactedAreas.map(area => (
            <span 
              key={area}
              className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded"
            >
              {area}
            </span>
          ))}
        </div>
      </div>

      {/* Actions */}
      {issue.status === "open" && (
        <div className="border-t border-gray-100 pt-4">
          {showAssumptionForm ? (
            <div className="space-y-4">
              <div>
                <Label htmlFor="assumptionValue">Assumed Value</Label>
                <Input
                  id="assumptionValue"
                  value={assumptionValue}
                  onChange={(e) => setAssumptionValue(e.target.value)}
                  placeholder="Enter the value to use..."
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="rationale">Rationale (optional)</Label>
                <Textarea
                  id="rationale"
                  value={assumptionRationale}
                  onChange={(e) => setAssumptionRationale(e.target.value)}
                  placeholder="Explain why this assumption is being made..."
                  className="mt-1"
                  rows={2}
                />
              </div>
              <div className="flex gap-2">
                <Button onClick={handleApplyAssumption} className="gap-1.5">
                  <Check className="h-4 w-4" />
                  Apply Assumption
                </Button>
                <Button variant="outline" onClick={() => setShowAssumptionForm(false)}>
                  Cancel
                </Button>
              </div>
            </div>
          ) : (
            <div className="flex gap-2">
              <Button 
                onClick={() => setShowAssumptionForm(true)}
                variant="outline"
                className="gap-1.5"
              >
                <AlertTriangle className="h-4 w-4" />
                Add Assumption
              </Button>
              <Button 
                onClick={() => onResolve(issue.id)}
                className="gap-1.5 bg-emerald-600 hover:bg-emerald-700"
              >
                <CheckCircle2 className="h-4 w-4" />
                Mark Resolved
              </Button>
              <Button 
                onClick={() => onIgnore(issue.id)}
                variant="ghost"
                className="gap-1.5 text-gray-500"
              >
                <X className="h-4 w-4" />
                Ignore
              </Button>
            </div>
          )}
        </div>
      )}

      {issue.status === "assumption-applied" && (
        <div className="border-t border-gray-100 pt-4">
          <Button 
            onClick={() => onResolve(issue.id)}
            className="gap-1.5 bg-emerald-600 hover:bg-emerald-700"
          >
            <CheckCircle2 className="h-4 w-4" />
            Confirm & Mark Resolved
          </Button>
        </div>
      )}
    </Card>
  );
}
