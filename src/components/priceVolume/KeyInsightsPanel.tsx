import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Lightbulb, Sparkles, Zap } from "lucide-react";

interface KeyInsightsPanelProps {
  insights: string[];
}

export function KeyInsightsPanel({ insights }: KeyInsightsPanelProps) {
  return (
    <Card className="bg-gradient-to-br from-primary/5 via-background to-primary/10 border-primary/20 shadow-lg shadow-primary/5 overflow-hidden relative">
      {/* Decorative glow */}
      <div className="absolute top-0 right-0 w-48 h-48 bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
      
      <CardHeader className="relative z-10">
        <CardTitle className="flex items-center gap-3 text-lg">
          <div className="p-2 rounded-lg bg-gradient-to-br from-primary/20 to-primary/10 shadow-sm">
            <Sparkles className="h-5 w-5 text-primary" />
          </div>
          <span>AI-Generated Key Insights</span>
          <div className="ml-auto flex items-center gap-1.5 text-xs bg-primary/10 text-primary px-3 py-1.5 rounded-full font-medium">
            <Zap className="h-3 w-3" />
            Powered by AI
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="relative z-10">
        <ul className="space-y-4">
          {insights.map((insight, index) => (
            <li 
              key={index} 
              className="flex gap-4 p-4 rounded-xl bg-card/50 border border-border/50 hover:bg-card hover:border-primary/20 hover:shadow-md transition-all duration-300"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex-shrink-0">
                <div className="p-2 rounded-lg bg-amber-500/10">
                  <Lightbulb className="h-5 w-5 text-amber-500" />
                </div>
              </div>
              <p className="text-muted-foreground leading-relaxed">{insight}</p>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
