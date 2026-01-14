import { ReactNode } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Globe, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

interface InsightCardWrapperProps {
  title: string;
  icon: ReactNode;
  children: ReactNode;
  suggestedQuestions: string[];
  className?: string;
}

export function InsightCardWrapper({
  title,
  icon,
  children,
  suggestedQuestions,
  className,
}: InsightCardWrapperProps) {
  return (
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
          variant="outline" 
          size="sm" 
          className="gap-2 text-muted-foreground hover:text-primary hover:border-primary/30 hover:bg-primary/5 transition-all duration-300"
        >
          <Globe className="h-4 w-4" />
          Source
        </Button>
      </div>

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
  );
}
