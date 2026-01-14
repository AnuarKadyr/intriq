import { Zap, TrendingUp, TrendingDown, Shuffle, Globe, Package } from "lucide-react";

interface QuickInsightChipsProps {
  onChipClick: (question: string) => void;
}

const quickInsights = [
  {
    label: "Top performer?",
    question: "Which SKU or product had the best performance this period?",
    icon: TrendingUp,
  },
  {
    label: "Biggest decline?",
    question: "What product or region showed the biggest decline?",
    icon: TrendingDown,
  },
  {
    label: "Mix impact?",
    question: "How did product mix changes affect overall revenue?",
    icon: Shuffle,
  },
  {
    label: "Best region?",
    question: "Which geography performed best and why?",
    icon: Globe,
  },
  {
    label: "Price leaders?",
    question: "Which products drove the most price-based growth?",
    icon: Package,
  },
];

export function QuickInsightChips({ onChipClick }: QuickInsightChipsProps) {
  return (
    <div className="space-y-2">
      <div className="flex items-center gap-1.5 text-xs text-muted-foreground px-1">
        <Zap className="h-3 w-3" />
        <span>Quick insights</span>
      </div>
      <div className="flex flex-wrap gap-2">
        {quickInsights.map((insight) => {
          const Icon = insight.icon;
          return (
            <button
              key={insight.label}
              onClick={() => onChipClick(insight.question)}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-muted hover:bg-muted/80 rounded-full transition-all duration-200 hover:scale-105 hover:shadow-md border border-border/50"
            >
              <Icon className="h-3 w-3 text-primary" />
              {insight.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
