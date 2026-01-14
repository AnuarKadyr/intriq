import { useState } from "react";
import { ArrowLeft, GitCompare, AlertTriangle, CheckCircle2, Clock, XCircle, Sparkles, TrendingUp } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { MainLayout } from "@/components/MainLayout";
import { DataIntegrityIssue, Assumption } from "@/types/dataIntegrity";
import { initialDataIntegrityIssues, calculateConfidenceScore, issueCategoryLabels } from "@/data/dataIntegrityData";
import { IssueList } from "@/components/dataIntegrity/IssueList";
import { IssueDetailPanel } from "@/components/dataIntegrity/IssueDetailPanel";
import { ConfidencePanel } from "@/components/dataIntegrity/ConfidencePanel";
import { cn } from "@/lib/utils";

const DataIntegrityAgent = () => {
  const navigate = useNavigate();
  const [issues, setIssues] = useState<DataIntegrityIssue[]>(initialDataIntegrityIssues);
  const [selectedIssue, setSelectedIssue] = useState<DataIntegrityIssue | null>(null);
  const [filterCategory, setFilterCategory] = useState<string | null>(null);
  const [filterStatus, setFilterStatus] = useState<string | null>(null);

  const confidenceScore = calculateConfidenceScore(issues);

  const handleApplyAssumption = (issueId: string, assumption: Assumption) => {
    setIssues(prev => prev.map(issue => 
      issue.id === issueId 
        ? { ...issue, status: "assumption-applied" as const, assumption }
        : issue
    ));
    setSelectedIssue(prev => prev?.id === issueId 
      ? { ...prev, status: "assumption-applied" as const, assumption }
      : prev
    );
  };

  const handleResolveIssue = (issueId: string) => {
    setIssues(prev => prev.map(issue => 
      issue.id === issueId 
        ? { ...issue, status: "resolved" as const, resolvedAt: new Date() }
        : issue
    ));
    setSelectedIssue(null);
  };

  const handleIgnoreIssue = (issueId: string) => {
    setIssues(prev => prev.map(issue => 
      issue.id === issueId 
        ? { ...issue, status: "ignored" as const }
        : issue
    ));
    setSelectedIssue(null);
  };

  const filteredIssues = issues.filter(issue => {
    if (filterCategory && issue.category !== filterCategory) return false;
    if (filterStatus && issue.status !== filterStatus) return false;
    return true;
  });

  const stats = {
    total: issues.length,
    open: issues.filter(i => i.status === "open").length,
    assumptionApplied: issues.filter(i => i.status === "assumption-applied").length,
    resolved: issues.filter(i => i.status === "resolved").length,
    critical: issues.filter(i => i.severity === "critical" && i.status === "open").length,
  };

  return (
    <MainLayout>
      <div className="flex flex-col h-full">
        {/* Header */}
        <header className="border-b border-gray-200 bg-white px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => navigate("/dashboard")}
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-purple-500 rounded-lg flex items-center justify-center">
                  <GitCompare className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-900">
                    Data Integrity
                  </h1>
                  <p className="text-sm text-gray-500">
                    {stats.open} open issues • {stats.critical} critical
                  </p>
                </div>
              </div>
            </div>
            
            {/* Confidence Score Badge */}
            <div className="flex items-center gap-3">
              <div className="text-right">
                <p className="text-xs text-gray-500">Data Confidence</p>
                <p className={cn(
                  "text-2xl font-bold",
                  confidenceScore.overall >= 80 ? "text-emerald-600" :
                  confidenceScore.overall >= 50 ? "text-amber-600" : "text-red-600"
                )}>
                  {confidenceScore.overall}%
                </p>
              </div>
              <div className={cn(
                "w-12 h-12 rounded-full flex items-center justify-center",
                confidenceScore.overall >= 80 ? "bg-emerald-100" :
                confidenceScore.overall >= 50 ? "bg-amber-100" : "bg-red-100"
              )}>
                <TrendingUp className={cn(
                  "h-6 w-6",
                  confidenceScore.overall >= 80 ? "text-emerald-600" :
                  confidenceScore.overall >= 50 ? "text-amber-600" : "text-red-600"
                )} />
              </div>
            </div>
          </div>
        </header>

        {/* Content */}
        <div className="flex-1 p-8 overflow-hidden">
          <div className="grid grid-cols-12 gap-6 h-full">
            {/* Left: Issue List */}
            <div className="col-span-4 flex flex-col h-full overflow-hidden">
              {/* Stats Cards */}
              <div className="grid grid-cols-4 gap-2 mb-4 flex-shrink-0">
                <Card 
                  className={cn(
                    "p-3 cursor-pointer transition-all",
                    filterStatus === null ? "ring-2 ring-primary" : "hover:bg-gray-50"
                  )}
                  onClick={() => setFilterStatus(null)}
                >
                  <p className="text-lg font-bold text-gray-900">{stats.total}</p>
                  <p className="text-[10px] text-gray-500">Total</p>
                </Card>
                <Card 
                  className={cn(
                    "p-3 cursor-pointer transition-all",
                    filterStatus === "open" ? "ring-2 ring-red-500" : "hover:bg-gray-50"
                  )}
                  onClick={() => setFilterStatus(filterStatus === "open" ? null : "open")}
                >
                  <p className="text-lg font-bold text-red-600">{stats.open}</p>
                  <p className="text-[10px] text-gray-500">Open</p>
                </Card>
                <Card 
                  className={cn(
                    "p-3 cursor-pointer transition-all",
                    filterStatus === "assumption-applied" ? "ring-2 ring-amber-500" : "hover:bg-gray-50"
                  )}
                  onClick={() => setFilterStatus(filterStatus === "assumption-applied" ? null : "assumption-applied")}
                >
                  <p className="text-lg font-bold text-amber-600">{stats.assumptionApplied}</p>
                  <p className="text-[10px] text-gray-500">Assumed</p>
                </Card>
                <Card 
                  className={cn(
                    "p-3 cursor-pointer transition-all",
                    filterStatus === "resolved" ? "ring-2 ring-emerald-500" : "hover:bg-gray-50"
                  )}
                  onClick={() => setFilterStatus(filterStatus === "resolved" ? null : "resolved")}
                >
                  <p className="text-lg font-bold text-emerald-600">{stats.resolved}</p>
                  <p className="text-[10px] text-gray-500">Resolved</p>
                </Card>
              </div>

              {/* Category Filter */}
              <div className="flex flex-wrap gap-1 mb-4 flex-shrink-0">
                <Button
                  variant={filterCategory === null ? "default" : "outline"}
                  size="sm"
                  onClick={() => setFilterCategory(null)}
                  className="h-7 text-xs"
                >
                  All
                </Button>
                {Object.entries(issueCategoryLabels).map(([key, { label }]) => (
                  <Button
                    key={key}
                    variant={filterCategory === key ? "default" : "outline"}
                    size="sm"
                    onClick={() => setFilterCategory(filterCategory === key ? null : key)}
                    className="h-7 text-xs"
                  >
                    {label}
                  </Button>
                ))}
              </div>

              {/* Issue List */}
              <div className="flex-1 overflow-y-auto">
                <IssueList 
                  issues={filteredIssues}
                  selectedIssue={selectedIssue}
                  onSelectIssue={setSelectedIssue}
                />
              </div>
            </div>

            {/* Middle: Issue Detail */}
            <div className="col-span-5 overflow-y-auto">
              {selectedIssue ? (
                <IssueDetailPanel 
                  issue={selectedIssue}
                  onApplyAssumption={handleApplyAssumption}
                  onResolve={handleResolveIssue}
                  onIgnore={handleIgnoreIssue}
                />
              ) : (
                <Card className="h-full flex items-center justify-center p-8">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <GitCompare className="h-8 w-8 text-gray-400" />
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-1">Select an Issue</h3>
                    <p className="text-sm text-gray-500">
                      Click on an issue from the list to view details and apply resolutions
                    </p>
                  </div>
                </Card>
              )}
            </div>

            {/* Right: Confidence Panel */}
            <div className="col-span-3 overflow-y-auto">
              <ConfidencePanel confidenceScore={confidenceScore} />
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default DataIntegrityAgent;
