import { ReactNode, useState, createContext, useContext } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Globe, Sparkles, FileText, X, ChevronLeft } from "lucide-react";
import { cn } from "@/lib/utils";
import { SourceDocument } from "@/types/insightsEngine";

// Context for sharing highlight state
interface HighlightContextType {
  highlightText: string | null;
  setHighlightText: (text: string | null) => void;
}

const HighlightContext = createContext<HighlightContextType>({
  highlightText: null,
  setHighlightText: () => {},
});

export const useHighlight = () => useContext(HighlightContext);

// File type icons
const FileIcon = ({ type }: { type: "pdf" | "excel" | "word" }) => {
  const colors = {
    pdf: "text-red-500 bg-red-50",
    excel: "text-emerald-600 bg-emerald-50",
    word: "text-blue-500 bg-blue-50",
  };
  
  return (
    <div className={cn("w-8 h-8 rounded-lg flex items-center justify-center", colors[type])}>
      <FileText className="h-4 w-4" />
    </div>
  );
};

interface InsightCardWrapperProps {
  title: string;
  icon: ReactNode;
  children: ReactNode;
  suggestedQuestions: string[];
  sources?: SourceDocument[];
  className?: string;
}

export function InsightCardWrapper({
  title,
  icon,
  children,
  suggestedQuestions,
  sources = [],
  className,
}: InsightCardWrapperProps) {
  const [showSources, setShowSources] = useState(false);
  const [selectedSource, setSelectedSource] = useState<SourceDocument | null>(null);
  const [highlightText, setHighlightText] = useState<string | null>(null);

  const handleSourceClick = (source: SourceDocument) => {
    if (selectedSource?.id === source.id) {
      setSelectedSource(null);
      setHighlightText(null);
    } else {
      setSelectedSource(source);
      setHighlightText(source.highlightText || null);
    }
  };

  const handleCloseSources = () => {
    setShowSources(false);
    setSelectedSource(null);
    setHighlightText(null);
  };

  return (
    <HighlightContext.Provider value={{ highlightText, setHighlightText }}>
      <Card className={cn(
        "relative overflow-hidden animate-fade-in",
        "bg-white/80 backdrop-blur-sm",
        "border border-gray-100 shadow-lg shadow-gray-100/50",
        "hover:shadow-xl hover:shadow-primary/5 transition-all duration-500",
        className
      )}>
        {/* Subtle gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-white via-transparent to-primary/[0.02] pointer-events-none" />
        
        {/* Header */}
        <div className="relative flex items-center justify-between px-6 py-4 border-b border-gray-100/80">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center shadow-sm ring-1 ring-primary/10">
              {icon}
            </div>
            <h3 className="text-lg font-bold text-foreground tracking-tight">{title}</h3>
          </div>
          <Button 
            variant={showSources ? "default" : "outline"}
            size="sm" 
            onClick={() => showSources ? handleCloseSources() : setShowSources(true)}
            className={cn(
              "gap-2 transition-all duration-300",
              showSources 
                ? "bg-primary text-white hover:bg-primary/90" 
                : "text-muted-foreground hover:text-primary hover:border-primary/30 hover:bg-primary/5"
            )}
          >
            <Globe className="h-4 w-4" />
            {showSources ? "Hide Sources" : "Source"}
          </Button>
        </div>

        {/* Source Panel - Inline */}
        {showSources && sources.length > 0 && (
          <div className="relative border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white animate-fade-in">
            <div className="px-6 py-4">
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-sm font-semibold text-foreground flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                  Source Documents ({sources.length})
                </h4>
                {selectedSource && (
                  <button 
                    onClick={() => { setSelectedSource(null); setHighlightText(null); }}
                    className="text-xs text-muted-foreground hover:text-primary flex items-center gap-1 transition-colors"
                  >
                    <X className="h-3 w-3" />
                    Clear selection
                  </button>
                )}
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {sources.map((source) => (
                  <button
                    key={source.id}
                    onClick={() => handleSourceClick(source)}
                    className={cn(
                      "flex items-center gap-3 p-3 rounded-xl border transition-all duration-300 text-left",
                      selectedSource?.id === source.id
                        ? "bg-primary/5 border-primary/30 shadow-md ring-2 ring-primary/20"
                        : "bg-white border-gray-100 hover:border-gray-200 hover:shadow-md"
                    )}
                  >
                    <FileIcon type={source.type} />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium text-foreground truncate">{source.name}</p>
                      <p className="text-[10px] text-muted-foreground uppercase">{source.type}</p>
                    </div>
                  </button>
                ))}
              </div>
              
              {selectedSource && (
                <div className="mt-3 p-3 bg-primary/5 rounded-lg border border-primary/10 animate-fade-in">
                  <p className="text-xs text-primary font-medium flex items-center gap-1">
                    <ChevronLeft className="h-3 w-3" />
                    Highlighted content from: {selectedSource.name}
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Content */}
        <div className="relative px-6 py-6">
          {children}
        </div>

        {/* Suggested Questions Footer */}
        <div className="relative px-6 py-4 bg-gradient-to-r from-primary/[0.03] via-primary/[0.08] to-primary/[0.03] border-t border-primary/10">
          {/* Animated shimmer effect */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute -inset-full bg-gradient-to-r from-transparent via-white/20 to-transparent animate-[shimmer_3s_infinite] skew-x-12" />
          </div>
          
          <div className="relative flex items-center gap-2 flex-wrap">
            {suggestedQuestions.map((question, idx) => (
              <button
                key={idx}
                className={cn(
                  "px-3.5 py-2 text-xs font-medium rounded-full",
                  "bg-white/80 backdrop-blur-sm",
                  "text-primary border border-primary/20",
                  "hover:bg-primary hover:text-white hover:border-primary",
                  "hover:shadow-lg hover:shadow-primary/20",
                  "transform hover:-translate-y-0.5",
                  "transition-all duration-300"
                )}
                style={{ animationDelay: `${idx * 50}ms` }}
              >
                {question}
              </button>
            ))}
          </div>
          
          {/* Decorative sparkles with animation */}
          <div className="absolute right-4 bottom-3 flex items-center gap-1">
            <Sparkles className="h-4 w-4 text-primary/30 animate-pulse" style={{ animationDelay: '0s' }} />
            <Sparkles className="h-5 w-5 text-primary/50 animate-pulse" style={{ animationDelay: '0.5s' }} />
            <Sparkles className="h-3 w-3 text-primary/20 animate-pulse" style={{ animationDelay: '1s' }} />
          </div>
        </div>
      </Card>
    </HighlightContext.Provider>
  );
}
