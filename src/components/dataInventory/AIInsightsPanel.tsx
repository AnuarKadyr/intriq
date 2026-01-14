import { useState, useEffect } from "react";
import { 
  Sparkles, 
  Brain, 
  AlertTriangle, 
  CheckCircle2, 
  FileWarning,
  TrendingUp,
  Zap,
  Eye,
  FileSearch,
  ArrowRight,
  Lightbulb
} from "lucide-react";
import { DataRoomFolder } from "@/types/dataInventory";
import { cn } from "@/lib/utils";
import { TonyFace } from "@/components/TonyFace";

interface AIInsightsPanelProps {
  selectedFolder: DataRoomFolder | null;
}

interface InsightItem {
  id: string;
  type: 'critical' | 'warning' | 'success' | 'info';
  title: string;
  description: string;
  confidence: number;
}

const insights: InsightItem[] = [
  {
    id: '1',
    type: 'critical',
    title: '36 Financial Documents Need Priority Review',
    description: 'P&L statements, balance sheets, and statutory accounts require immediate attention for due diligence compliance.',
    confidence: 94
  },
  {
    id: '2',
    type: 'warning',
    title: '16 Legal Documents Identified',
    description: 'Heads of Terms, SLAs, and IP registrations detected. Cross-referencing with regulatory requirements.',
    confidence: 89
  },
  {
    id: '3',
    type: 'success',
    title: 'Financial Models Up-to-Date',
    description: 'Version 95 models verified through March 2025. All reconciliations complete.',
    confidence: 98
  },
  {
    id: '4',
    type: 'info',
    title: 'HR Documentation Complete',
    description: '10 documents covering staff analysis and payroll. Ready for organizational review.',
    confidence: 92
  }
];

const dataQualityItems = [
  { status: 'error', text: '3 files flagged with integrity issues', action: 'Re-upload required' },
  { status: 'warning', text: 'Password-protected payroll files', action: 'Credentials needed' },
  { status: 'success', text: 'Financial models verified', action: 'v95 validated' },
  { status: 'success', text: 'Bank reconciliations complete', action: 'Through Feb 2025' }
];

export function AIInsightsPanel({ selectedFolder }: AIInsightsPanelProps) {
  const [isAnalyzing, setIsAnalyzing] = useState(true);
  const [visibleInsights, setVisibleInsights] = useState<string[]>([]);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_tonyExpression, setTonyExpression] = useState<'thinking' | 'happy' | 'excited'>('thinking');

  useEffect(() => {
    // Simulate AI analysis
    const timer = setTimeout(() => {
      setIsAnalyzing(false);
      setTonyExpression('excited');
    }, 1500);

    return () => clearTimeout(timer);
  }, [selectedFolder]);

  useEffect(() => {
    if (!isAnalyzing) {
      // Stagger reveal of insights
      insights.forEach((insight, index) => {
        setTimeout(() => {
          setVisibleInsights(prev => [...prev, insight.id]);
        }, index * 200);
      });

      setTimeout(() => setTonyExpression('happy'), 800);
    }
  }, [isAnalyzing]);

  const getTypeStyles = (type: InsightItem['type']) => {
    switch (type) {
      case 'critical':
        return 'from-red-500/10 to-red-500/5 border-red-200 hover:border-red-300';
      case 'warning':
        return 'from-amber-500/10 to-amber-500/5 border-amber-200 hover:border-amber-300';
      case 'success':
        return 'from-emerald-500/10 to-emerald-500/5 border-emerald-200 hover:border-emerald-300';
      case 'info':
        return 'from-blue-500/10 to-blue-500/5 border-blue-200 hover:border-blue-300';
    }
  };

  const getTypeIcon = (type: InsightItem['type']) => {
    switch (type) {
      case 'critical':
        return <AlertTriangle className="h-5 w-5 text-red-500" />;
      case 'warning':
        return <FileWarning className="h-5 w-5 text-amber-500" />;
      case 'success':
        return <CheckCircle2 className="h-5 w-5 text-emerald-500" />;
      case 'info':
        return <TrendingUp className="h-5 w-5 text-blue-500" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* AI Header with Magic Effect + Summary Combined */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary/5 via-primary/10 to-purple-500/10 border border-primary/20 p-6">
        {/* Animated background orbs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary/20 rounded-full blur-3xl animate-pulse-subtle" />
          <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-purple-500/20 rounded-full blur-3xl animate-pulse-subtle" style={{ animationDelay: '1s' }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-primary/5 rounded-full blur-3xl animate-float" />
        </div>

        <div className="relative flex items-start justify-between">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center shadow-lg shadow-primary/25">
                <Brain className="h-7 w-7 text-white" />
              </div>
              <div className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center shadow-md">
                <Sparkles className="h-3 w-3 text-white" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold text-foreground">AI Analysis</h2>
                {isAnalyzing ? (
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary animate-pulse">
                    <Zap className="h-3 w-3" />
                    Analyzing...
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-600">
                    <CheckCircle2 className="h-3 w-3" />
                    Complete
                  </span>
                )}
              </div>
              {/* Compact Stats Row */}
              <div className="flex items-center gap-3 mt-2">
                {[
                  { icon: FileSearch, label: 'Files', value: '154', color: 'text-primary' },
                  { icon: Eye, label: 'Issues', value: '4', color: 'text-amber-500' },
                  { icon: Lightbulb, label: 'Insights', value: '12', color: 'text-purple-500' },
                  { icon: CheckCircle2, label: 'Confidence', value: '94%', color: 'text-emerald-500' }
                ].map((stat, i) => (
                  <div key={i} className="flex items-center gap-1.5 px-2 py-1 rounded-lg bg-white/50 backdrop-blur-sm border border-white/30">
                    <stat.icon className={cn("h-3.5 w-3.5", stat.color)} />
                    <span className="text-xs text-muted-foreground">{stat.label}:</span>
                    <span className={cn("text-xs font-bold", stat.color)}>{stat.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Tony Face */}
          <div className="flex-shrink-0">
            <div className="relative">
              <TonyFace size="medium" />
              {isAnalyzing && (
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-primary rounded-full animate-ping" />
              )}
            </div>
          </div>
        </div>

        {/* Summary Text */}
        <div className="relative mt-5 pt-5 border-t border-primary/10">
          <p className="text-sm text-foreground/80 leading-relaxed">
            The <span className="text-primary font-semibold">Project Aurora</span> data room contains comprehensive 
            due diligence materials for the acquisition of Target Co. My analysis shows a well-structured 
            repository with <span className="text-primary font-medium">154 files</span> organized across 
            hierarchical categories including background documentation, VDR snapshots, and specialized 
            financial folders.
          </p>

          <div className="flex items-center gap-2 mt-3">
            <div className="flex items-center gap-1">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" style={{ animationDelay: '0.2s' }} />
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" style={{ animationDelay: '0.4s' }} />
            </div>
            <span className="text-xs text-muted-foreground">Generated by Intriq AI • Updated just now</span>
          </div>
        </div>
      </div>

      {/* Insights Grid */}
      <div className="grid grid-cols-2 gap-4">
        {insights.map((insight) => (
          <div
            key={insight.id}
            className={cn(
              "group relative overflow-hidden rounded-xl bg-gradient-to-br border p-5 transition-all duration-300 cursor-pointer",
              getTypeStyles(insight.type),
              visibleInsights.includes(insight.id) 
                ? "opacity-100 translate-y-0" 
                : "opacity-0 translate-y-4"
            )}
            style={{ transitionDelay: `${insights.findIndex(i => i.id === insight.id) * 100}ms` }}
          >
            {/* Subtle glow effect on hover */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-transparent" />
            </div>

            <div className="relative">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2">
                  {getTypeIcon(insight.type)}
                  <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                    {insight.type === 'critical' ? 'Critical' : 
                     insight.type === 'warning' ? 'Attention' :
                     insight.type === 'success' ? 'Verified' : 'Insight'}
                  </span>
                </div>
                <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-white/50 backdrop-blur-sm">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                  <span className="text-xs font-medium text-foreground">{insight.confidence}%</span>
                </div>
              </div>

              <h3 className="font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                {insight.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {insight.description}
              </p>

              <div className="mt-4 flex items-center text-xs font-medium text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                View Details <ArrowRight className="h-3 w-3 ml-1" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Data Quality Section */}
      <div className="bg-white rounded-xl border border-border p-5 shadow-sm">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center">
            <Sparkles className="h-4 w-4 text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground">Data Quality Assessment</h3>
            <p className="text-xs text-muted-foreground">AI-powered integrity verification</p>
          </div>
        </div>

        <div className="space-y-3">
          {dataQualityItems.map((item, i) => (
            <div 
              key={i}
              className={cn(
                "flex items-center justify-between p-3 rounded-lg transition-colors",
                item.status === 'error' ? 'bg-red-50 hover:bg-red-100/80' :
                item.status === 'warning' ? 'bg-amber-50 hover:bg-amber-100/80' :
                'bg-emerald-50 hover:bg-emerald-100/80'
              )}
            >
              <div className="flex items-center gap-3">
                <div className={cn(
                  "w-2 h-2 rounded-full",
                  item.status === 'error' ? 'bg-red-500' :
                  item.status === 'warning' ? 'bg-amber-500' :
                  'bg-emerald-500'
                )} />
                <span className="text-sm text-foreground">{item.text}</span>
              </div>
              <span className={cn(
                "text-xs font-medium px-2 py-1 rounded-md",
                item.status === 'error' ? 'bg-red-100 text-red-700' :
                item.status === 'warning' ? 'bg-amber-100 text-amber-700' :
                'bg-emerald-100 text-emerald-700'
              )}>
                {item.action}
              </span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}