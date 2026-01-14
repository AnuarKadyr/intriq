import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Lightbulb, Sparkles } from "lucide-react";

interface KeyInsightsPanelProps {
  insights: string[];
}

export function KeyInsightsPanel({ insights }: KeyInsightsPanelProps) {
  return (
    <Card className="bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <div className="p-1.5 rounded-lg bg-primary/10">
            <Sparkles className="h-5 w-5 text-primary" />
          </div>
          AI-Generated Key Insights
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-3">
          {insights.map((insight, index) => (
            <li key={index} className="flex gap-3 text-sm">
              <div className="flex-shrink-0 mt-1">
                <Lightbulb className="h-4 w-4 text-amber-500" />
              </div>
              <p className="text-muted-foreground leading-relaxed">{insight}</p>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
