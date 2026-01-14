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
  X
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
    border: "border-emerald-200",
    badge: "bg-emerald-100 text-emerald-700",
  },
  negative: {
    icon: TrendingDown,
    color: "text-red-600",
    bg: "bg-red-50",
    border: "border-red-200",
    badge: "bg-red-100 text-red-700",
  },
  warning: {
    icon: AlertTriangle,
    color: "text-amber-600",
    bg: "bg-amber-50",
    border: "border-amber-200",
    badge: "bg-amber-100 text-amber-700",
  },
  neutral: {
    icon: Minus,
    color: "text-gray-600",
    bg: "bg-gray-50",
    border: "border-gray-200",
    badge: "bg-gray-100 text-gray-700",
  },
};

const impactConfig = {
  high: "bg-red-100 text-red-700",
  medium: "bg-amber-100 text-amber-700",
  low: "bg-gray-100 text-gray-700",
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
    <div className="space-y-4">
      {/* Header with actions */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-semibold text-foreground">Key Themes</h3>
          <p className="text-xs text-muted-foreground mt-0.5">
            {acceptedCount} of {themes.length} themes included
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={onAcceptAll}
            className="gap-1.5"
          >
            <CheckCheck className="h-3.5 w-3.5" />
            Accept All
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={onRejectAll}
            className="gap-1.5"
          >
            <X className="h-3.5 w-3.5" />
            Clear All
          </Button>
        </div>
      </div>

      {/* Themes grouped by section */}
      <div className="space-y-6">
        {themesBySection.map(({ section, themes: sectionThemes }) => (
          <div key={section.id}>
            <h4 className="text-sm font-medium text-muted-foreground mb-2 flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-primary" />
              {section.name}
            </h4>
            
            <div className="space-y-2">
              {sectionThemes.map((theme) => {
                const config = sentimentConfig[theme.sentiment];
                const SentimentIcon = config.icon;

                return (
                  <Card 
                    key={theme.id}
                    className={cn(
                      "transition-all duration-200 cursor-pointer",
                      theme.isAccepted 
                        ? `${config.bg} ${config.border} border` 
                        : "opacity-60 hover:opacity-80"
                    )}
                    onClick={() => onThemeToggle(theme.id)}
                  >
                    <div className="p-3">
                      <div className="flex items-start gap-3">
                        <div className={cn(
                          "w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0",
                          theme.isAccepted ? config.bg : "bg-muted"
                        )}>
                          {theme.isAccepted ? (
                            <SentimentIcon className={cn("h-4 w-4", config.color)} />
                          ) : (
                            <XCircle className="h-4 w-4 text-muted-foreground" />
                          )}
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <h5 className={cn(
                              "font-medium text-sm",
                              theme.isAccepted ? "text-foreground" : "text-muted-foreground line-through"
                            )}>
                              {theme.title}
                            </h5>
                            <Badge className={cn("text-[10px]", impactConfig[theme.impactLevel])}>
                              {theme.impactLevel}
                            </Badge>
                          </div>
                          
                          <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                            {theme.description}
                          </p>

                          {theme.dataPoints && theme.dataPoints.length > 0 && theme.isAccepted && (
                            <div className="flex flex-wrap gap-1.5 mt-2">
                              {theme.dataPoints.map((point, idx) => (
                                <Badge 
                                  key={idx}
                                  variant="outline"
                                  className="text-[10px] font-mono"
                                >
                                  {point}
                                </Badge>
                              ))}
                            </div>
                          )}
                        </div>

                        <div className={cn(
                          "w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0",
                          theme.isAccepted ? "bg-emerald-100" : "bg-muted"
                        )}>
                          {theme.isAccepted ? (
                            <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                          ) : (
                            <X className="h-3 w-3 text-muted-foreground" />
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
