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
    <Card className={cn("relative overflow-hidden", className)}>
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
            {icon}
          </div>
          <h3 className="text-lg font-semibold text-foreground">{title}</h3>
        </div>
        <Button variant="outline" size="sm" className="gap-2 text-muted-foreground">
          <Globe className="h-4 w-4" />
          Source
        </Button>
      </div>

      {/* Content */}
      <div className="px-6 py-5">
        {children}
      </div>

      {/* Suggested Questions Footer */}
      <div className="relative px-6 py-4 bg-gradient-to-r from-primary/5 via-primary/10 to-transparent border-t border-gray-100">
        <div className="flex items-center gap-2 flex-wrap">
          {suggestedQuestions.map((question, idx) => (
            <button
              key={idx}
              className="px-3 py-1.5 text-xs font-medium text-primary border border-primary/30 rounded-full hover:bg-primary/10 transition-colors"
            >
              {question}
            </button>
          ))}
        </div>
        
        {/* Decorative sparkles */}
        <div className="absolute right-4 bottom-3 flex items-center gap-1 opacity-60">
          <Sparkles className="h-4 w-4 text-primary/40" />
          <Sparkles className="h-5 w-5 text-primary/60" />
          <Sparkles className="h-3 w-3 text-primary/30" />
        </div>
      </div>
    </Card>
  );
}
