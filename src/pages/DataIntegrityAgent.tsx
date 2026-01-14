import { useState } from "react";
import { ArrowLeft, GitCompare, AlertTriangle, CheckCircle2, Clock, XCircle, Sparkles, TrendingUp, FileSearch, Eye, Lightbulb, Shield, Upload, Zap, FileText } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { MainLayout } from "@/components/MainLayout";
import { DataIntegrityIssue, Assumption } from "@/types/dataIntegrity";
import { initialDataIntegrityIssues, calculateConfidenceScore, issueCategoryLabels } from "@/data/dataIntegrityData";
import { IssueList } from "@/components/dataIntegrity/IssueList";
import { IssueDetailPanel } from "@/components/dataIntegrity/IssueDetailPanel";
import { cn } from "@/lib/utils";
import { TonyFace } from "@/components/TonyFace";

type ViewState = "initial" | "tracker";

const DataIntegrityAgent = () => {
  const navigate = useNavigate();
  const [view, setView] = useState<ViewState>("initial");
  const [issues, setIssues] = useState<DataIntegrityIssue[]>(initialDataIntegrityIssues);
  const [selectedIssue, setSelectedIssue] = useState<DataIntegrityIssue | null>(null);
  const [filterCategory, setFilterCategory] = useState<string | null>(null);
  const [filterStatus, setFilterStatus] = useState<string | null>(null);

  const confidenceScore = calculateConfidenceScore(issues);

  const handleStartAnalysis = () => {
    setView("tracker");
    // Auto-select first issue when entering tracker view
    if (issues.length > 0) {
      setSelectedIssue(issues[0]);
    }
  };

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
    setIssues(prev => {
      const updatedIssues = prev.map(issue => 
        issue.id === issueId 
          ? { ...issue, status: "resolved" as const, resolvedAt: new Date() }
          : issue
      );
      
      // Auto-advance to next open issue
      const currentIndex = updatedIssues.findIndex(i => i.id === issueId);
      const nextOpenIssue = updatedIssues.slice(currentIndex + 1).find(i => i.status === "open") 
        || updatedIssues.slice(0, currentIndex).find(i => i.status === "open");
      
      setSelectedIssue(nextOpenIssue || updatedIssues[0] || null);
      
      return updatedIssues;
    });
  };

  const handleIgnoreIssue = (issueId: string) => {
    setIssues(prev => {
      const updatedIssues = prev.map(issue => 
        issue.id === issueId 
          ? { ...issue, status: "ignored" as const }
          : issue
      );
      
      // Auto-advance to next open issue
      const currentIndex = updatedIssues.findIndex(i => i.id === issueId);
      const nextOpenIssue = updatedIssues.slice(currentIndex + 1).find(i => i.status === "open") 
        || updatedIssues.slice(0, currentIndex).find(i => i.status === "open");
      
      setSelectedIssue(nextOpenIssue || updatedIssues[0] || null);
      
      return updatedIssues;
    });
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
                onClick={() => view === "tracker" ? setView("initial") : navigate("/dashboard")}
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-purple-500 rounded-lg flex items-center justify-center">
                  <GitCompare className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-900">Data Integrity</h1>
                  <p className="text-sm text-gray-500">
                    {view === "initial" 
                      ? "AI-powered data validation and cross-referencing" 
                      : `${stats.open} open issues • ${stats.critical} critical`}
                  </p>
                </div>
              </div>
            </div>
            
            {view === "tracker" && (
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
            )}
          </div>
        </header>

        {/* Content */}
        <div className="flex-1 p-8 overflow-y-auto">
          {view === "initial" && (
            <div className="max-w-4xl mx-auto space-y-8">
              {/* AI-Powered Welcome Card */}
              <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary/5 via-primary/10 to-purple-500/10 border border-primary/20 p-8">
                {/* Animated background orbs */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                  <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary/20 rounded-full blur-3xl animate-pulse-subtle" />
                  <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-purple-500/20 rounded-full blur-3xl animate-pulse-subtle" style={{ animationDelay: '1s' }} />
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-primary/5 rounded-full blur-3xl animate-float" />
                </div>

                <div className="relative flex items-start gap-6">
                  <div className="relative flex-shrink-0">
                    <TonyFace size="large" />
                    <div className="absolute -top-1 -right-1 w-6 h-6 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center shadow-md">
                      <Sparkles className="h-3.5 w-3.5 text-white" />
                    </div>
                  </div>
                  
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold text-foreground mb-3">Data Integrity Analysis</h2>
                    
                    <p className="text-foreground/70 mb-5 leading-relaxed">
                      I'll scan your data room for <span className="text-foreground font-semibold">discrepancies, formula errors, and reconciliation gaps</span>. 
                      My AI will cross-reference documents, identify mismatches, and suggest resolutions with confidence scores.
                    </p>

                    {/* Compact Stats Row */}
                    <div className="flex items-center gap-3 mb-5">
                      {[
                        { icon: AlertTriangle, label: 'Issues Found', value: String(stats.total), color: 'text-red-500' },
                        { icon: Shield, label: 'Categories', value: '5', color: 'text-purple-500' },
                        { icon: Lightbulb, label: 'AI Suggestions', value: String(issues.reduce((sum, i) => sum + i.aiSuggestions.length, 0)), color: 'text-amber-500' },
                        { icon: CheckCircle2, label: 'Auto-Resolve', value: 'Ready', color: 'text-emerald-500' }
                      ].map((stat, i) => (
                        <div key={i} className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-white/50 backdrop-blur-sm border border-white/30">
                          <stat.icon className={cn("h-3.5 w-3.5", stat.color)} />
                          <span className="text-xs text-muted-foreground">{stat.label}:</span>
                          <span className={cn("text-xs font-bold", stat.color)}>{stat.value}</span>
                        </div>
                      ))}
                    </div>
                    
                    {/* Issue Categories - Subtle style */}
                    <div className="mb-6">
                      <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2 block">Issue Categories</span>
                      <div className="flex flex-wrap gap-2">
                        {Object.entries(issueCategoryLabels).map(([key, { label }]) => (
                          <span 
                            key={key}
                            className="px-3 py-1.5 rounded-lg text-xs font-medium text-foreground/80 bg-white/60 backdrop-blur-sm border border-gray-200/50"
                          >
                            {label}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <Button onClick={handleStartAnalysis} size="lg" className="gap-2 shadow-lg hover:shadow-xl transition-shadow">
                      <Sparkles className="h-4 w-4" />
                      Start Integrity Analysis
                    </Button>
                  </div>
                </div>

                {/* AI Attribution */}
                <div className="relative mt-6 pt-5 border-t border-primary/10">
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" style={{ animationDelay: '0.2s' }} />
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" style={{ animationDelay: '0.4s' }} />
                    </div>
                    <span className="text-xs text-muted-foreground">Powered by Intriq AI • Ready to validate your data</span>
                  </div>
                </div>
              </div>

              {/* Features Preview */}
              <div className="grid grid-cols-3 gap-4">
                <Card className="p-5 hover:shadow-md transition-shadow border-primary/10 hover:border-primary/20">
                  <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-red-600 rounded-lg flex items-center justify-center mb-3 shadow-sm">
                    <AlertTriangle className="h-5 w-5 text-white" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-1">Detect Discrepancies</h3>
                  <p className="text-sm text-gray-500">Find mismatches between financial models and source documents</p>
                </Card>
                
                <Card className="p-5 hover:shadow-md transition-shadow border-primary/10 hover:border-primary/20">
                  <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg flex items-center justify-center mb-3 shadow-sm">
                    <GitCompare className="h-5 w-5 text-white" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-1">Cross-Reference</h3>
                  <p className="text-sm text-gray-500">Automatically compare data across multiple sources</p>
                </Card>
                
                <Card className="p-5 hover:shadow-md transition-shadow border-primary/10 hover:border-primary/20">
                  <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-lg flex items-center justify-center mb-3 shadow-sm">
                    <Sparkles className="h-5 w-5 text-white" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-1">AI Suggestions</h3>
                  <p className="text-sm text-gray-500">Get intelligent recommendations for resolving issues</p>
                </Card>
              </div>
            </div>
          )}

          {view === "tracker" && (
            <div className="h-full flex gap-6">
              {/* Left: Issue List */}
              <div className="w-[400px] flex-shrink-0 flex flex-col h-full overflow-hidden">
                {/* Compact Stats + Filter Bar */}
                <div className="mb-4 flex-shrink-0 space-y-2">
                  {/* Status filter row */}
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-medium text-muted-foreground whitespace-nowrap">Status:</span>
                    <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-hide">
                      <button 
                        onClick={() => setFilterStatus(null)}
                        className={cn(
                          "px-3 py-1.5 rounded-md text-xs font-medium transition-all border whitespace-nowrap flex-shrink-0",
                          filterStatus === null 
                            ? "bg-foreground text-background border-foreground" 
                            : "bg-transparent text-muted-foreground border-gray-200 hover:border-gray-300 hover:text-foreground"
                        )}
                      >
                        All ({stats.total})
                      </button>
                      <button 
                        onClick={() => setFilterStatus(filterStatus === 'open' ? null : 'open')}
                        className={cn(
                          "px-3 py-1.5 rounded-md text-xs font-medium transition-all border whitespace-nowrap flex-shrink-0",
                          filterStatus === 'open' 
                            ? "bg-red-600 text-white border-red-600" 
                            : "bg-transparent text-muted-foreground border-gray-200 hover:border-red-300 hover:text-red-600"
                        )}
                      >
                        Open ({stats.open})
                      </button>
                      <button 
                        onClick={() => setFilterStatus(filterStatus === 'assumption-applied' ? null : 'assumption-applied')}
                        className={cn(
                          "px-3 py-1.5 rounded-md text-xs font-medium transition-all border whitespace-nowrap flex-shrink-0",
                          filterStatus === 'assumption-applied' 
                            ? "bg-amber-600 text-white border-amber-600" 
                            : "bg-transparent text-muted-foreground border-gray-200 hover:border-amber-300 hover:text-amber-600"
                        )}
                      >
                        Assumed ({stats.assumptionApplied})
                      </button>
                      <button 
                        onClick={() => setFilterStatus(filterStatus === 'resolved' ? null : 'resolved')}
                        className={cn(
                          "px-3 py-1.5 rounded-md text-xs font-medium transition-all border whitespace-nowrap flex-shrink-0",
                          filterStatus === 'resolved' 
                            ? "bg-emerald-600 text-white border-emerald-600" 
                            : "bg-transparent text-muted-foreground border-gray-200 hover:border-emerald-300 hover:text-emerald-600"
                        )}
                      >
                        Resolved ({stats.resolved})
                      </button>
                    </div>
                  </div>

                  {/* Category filter row */}
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-medium text-muted-foreground whitespace-nowrap">Category:</span>
                    <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-hide">
                      <button
                        onClick={() => setFilterCategory(null)}
                        className={cn(
                          "px-2.5 py-1 rounded-md text-xs font-medium transition-all border whitespace-nowrap flex-shrink-0",
                          filterCategory === null 
                            ? "bg-foreground text-background border-foreground" 
                            : "bg-transparent text-muted-foreground border-gray-200 hover:border-gray-300 hover:text-foreground"
                        )}
                      >
                        All
                      </button>
                      {Object.entries(issueCategoryLabels).map(([key, { label }]) => (
                        <button
                          key={key}
                          onClick={() => setFilterCategory(filterCategory === key ? null : key)}
                          className={cn(
                            "px-2.5 py-1 rounded-md text-xs font-medium transition-all border whitespace-nowrap flex-shrink-0",
                            filterCategory === key 
                              ? "bg-foreground text-background border-foreground" 
                              : "bg-transparent text-muted-foreground border-gray-200 hover:border-gray-300 hover:text-foreground"
                          )}
                        >
                          {label}
                        </button>
                      ))}
                    </div>
                  </div>
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

              {/* Right: Issue Detail - Always show selected issue */}
              <div className="flex-1 overflow-y-auto">
                {selectedIssue && (
                  <IssueDetailPanel 
                    issue={selectedIssue}
                    onApplyAssumption={handleApplyAssumption}
                    onResolve={handleResolveIssue}
                    onIgnore={handleIgnoreIssue}
                  />
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
};

export default DataIntegrityAgent;
