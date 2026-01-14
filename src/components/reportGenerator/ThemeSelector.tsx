import { ReportTheme, ReportSection } from "@/types/reportGenerator";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  CheckCircle2, 
  XCircle, 
  AlertTriangle, 
  TrendingUp, 
  TrendingDown,
  Minus,
  CheckCheck,
  X,
  Sparkles
} from "lucide-react";
import { cn } from "@/lib/utils";

interface ThemeSelectorProps {
  themes: ReportTheme[];
  sections: ReportSection[];
  onThemeToggle: (themeId: string) => void;
  onAcceptAll: () => void;
  onRejectAll: () => void;
}

const sentimentConfig = {
  positive: {
    icon: TrendingUp,
    color: "text-emerald-600",
    bg: "bg-emerald-50",
    bgSelected: "bg-gradient-to-br from-emerald-50 to-emerald-100/50",
    border: "border-emerald-200",
    badge: "bg-emerald-100 text-emerald-700",
    ring: "ring-emerald-500/30",
  },
  negative: {
    icon: TrendingDown,
    color: "text-red-600",
    bg: "bg-red-50",
    bgSelected: "bg-gradient-to-br from-red-50 to-red-100/50",
    border: "border-red-200",
    badge: "bg-red-100 text-red-700",
    ring: "ring-red-500/30",
  },
  warning: {
    icon: AlertTriangle,
    color: "text-amber-600",
    bg: "bg-amber-50",
    bgSelected: "bg-gradient-to-br from-amber-50 to-amber-100/50",
    border: "border-amber-200",
    badge: "bg-amber-100 text-amber-700",
    ring: "ring-amber-500/30",
  },
  neutral: {
    icon: Minus,
    color: "text-gray-600",
    bg: "bg-gray-50",
    bgSelected: "bg-gradient-to-br from-gray-50 to-gray-100/50",
    border: "border-gray-200",
    badge: "bg-gray-100 text-gray-700",
    ring: "ring-gray-500/30",
  },
};

const impactConfig = {
  high: { bg: "bg-red-100", text: "text-red-700", dot: "bg-red-500" },
  medium: { bg: "bg-amber-100", text: "text-amber-700", dot: "bg-amber-500" },
  low: { bg: "bg-gray-100", text: "text-gray-600", dot: "bg-gray-400" },
};

export function ThemeSelector({ 
  themes, 
  sections,
  onThemeToggle, 
  onAcceptAll, 
  onRejectAll 
}: ThemeSelectorProps) {
  const acceptedCount = themes.filter(t => t.isAccepted).length;
  
  // Group themes by section
  const themesBySection = sections
    .filter(s => s.isSelected)
    .map(section => ({
      section,
      themes: themes.filter(t => t.sectionId === section.id),
    }))
    .filter(group => group.themes.length > 0);

  return (
    <div className="space-y-6">
      {/* Header with actions */}
      <div className="flex items-center justify-between bg-white sticky top-0 z-10 py-2 -mt-2">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
            <Sparkles className="h-4 w-4 text-primary" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground">Key Themes</h3>
            <p className="text-xs text-muted-foreground">
              {acceptedCount} of {themes.length} themes included in report
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={onAcceptAll}
            className="gap-1.5 text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50"
          >
            <CheckCheck className="h-3.5 w-3.5" />
            Accept All
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={onRejectAll}
            className="gap-1.5 text-gray-600 hover:text-gray-700"
          >
            <X className="h-3.5 w-3.5" />
            Clear All
          </Button>
        </div>
      </div>

      {/* Themes grouped by section */}
      <div className="space-y-8">
        {themesBySection.map(({ section, themes: sectionThemes }) => (
          <div key={section.id}>
            {/* Section Header */}
            <div className="flex items-center gap-3 mb-4">
              <div className="w-2 h-2 rounded-full bg-primary" />
              <h4 className="text-sm font-semibold text-foreground">{section.name}</h4>
              <div className="flex-1 h-px bg-gray-200" />
              <Badge variant="secondary" className="text-[10px]">
                {sectionThemes.filter(t => t.isAccepted).length}/{sectionThemes.length}
              </Badge>
            </div>
            
            {/* Theme Cards */}
            <div className="space-y-3">
              {sectionThemes.map((theme) => {
                const config = sentimentConfig[theme.sentiment];
                const impact = impactConfig[theme.impactLevel];
                const SentimentIcon = config.icon;

                return (
                  <Card 
                    key={theme.id}
                    className={cn(
                      "transition-all duration-200 cursor-pointer overflow-hidden",
                      theme.isAccepted 
                        ? `${config.bgSelected} ${config.border} border-2 ring-1 ${config.ring}` 
                        : "bg-gray-50/50 border-gray-200 opacity-60 hover:opacity-80 hover:bg-gray-100/50"
                    )}
                    onClick={() => onThemeToggle(theme.id)}
                  >
                    <div className="p-4">
                      <div className="flex items-start gap-4">
                        {/* Sentiment Icon */}
                        <div className={cn(
                          "w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-all",
                          theme.isAccepted 
                            ? `${config.bg} shadow-sm` 
                            : "bg-gray-200"
                        )}>
                          {theme.isAccepted ? (
                            <SentimentIcon className={cn("h-5 w-5", config.color)} />
                          ) : (
                            <XCircle className="h-5 w-5 text-gray-400" />
                          )}
                        </div>

                        {/* Content */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap mb-1.5">
                            <h5 className={cn(
                              "font-semibold text-sm",
                              theme.isAccepted ? "text-foreground" : "text-muted-foreground line-through"
                            )}>
                              {theme.title}
                            </h5>
                            <div className="flex items-center gap-1.5">
                              <div className={cn("w-1.5 h-1.5 rounded-full", impact.dot)} />
                              <span className={cn("text-[10px] font-medium uppercase", impact.text)}>
                                {theme.impactLevel}
                              </span>
                            </div>
                          </div>
                          
                          <p className="text-xs text-muted-foreground leading-relaxed">
                            {theme.description}
                          </p>

                          {/* Data Points */}
                          {theme.dataPoints && theme.dataPoints.length > 0 && theme.isAccepted && (
                            <div className="flex flex-wrap gap-1.5 mt-3">
                              {theme.dataPoints.map((point, idx) => (
                                <Badge 
                                  key={idx}
                                  variant="outline"
                                  className="text-[10px] font-mono bg-white/80 border-gray-200"
                                >
                                  {point}
                                </Badge>
                              ))}
                            </div>
                          )}
                        </div>

                        {/* Accept/Reject Indicator */}
                        <div className={cn(
                          "w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-all",
                          theme.isAccepted 
                            ? "bg-emerald-100 shadow-sm" 
                            : "bg-gray-200"
                        )}>
                          {theme.isAccepted ? (
                            <CheckCircle2 className="h-5 w-5 text-emerald-600" />
                          ) : (
                            <X className="h-4 w-4 text-gray-400" />
                          )}
                        </div>
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
