import { useState } from "react";
import { ChevronDown, ChevronRight, TrendingUp, TrendingDown, Minus, FileText, FolderOpen } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Theme } from "@/types/managementQuestions";
import { cn } from "@/lib/utils";

interface ThemeAnalysisProps {
  themes: Theme[];
}

export function ThemeAnalysis({ themes }: ThemeAnalysisProps) {
  const [expandedThemes, setExpandedThemes] = useState<string[]>([]);

  const toggleTheme = (themeId: string) => {
    setExpandedThemes(prev =>
      prev.includes(themeId) ? prev.filter(t => t !== themeId) : [...prev, themeId]
    );
  };

  const getSentimentIcon = (sentiment: Theme["sentiment"]) => {
    switch (sentiment) {
      case "positive":
        return <TrendingUp className="h-4 w-4 text-emerald-500" />;
      case "concern":
        return <TrendingDown className="h-4 w-4 text-red-500" />;
      default:
        return <Minus className="h-4 w-4 text-gray-400" />;
    }
  };

  const getSentimentColor = (sentiment: Theme["sentiment"]) => {
    switch (sentiment) {
      case "positive":
        return "border-emerald-200 bg-emerald-50";
      case "concern":
        return "border-red-200 bg-red-50";
      default:
        return "border-gray-200 bg-gray-50";
    }
  };

  return (
    <Card className="p-4">
      <div className="flex items-center gap-2 mb-3">
        <h3 className="text-sm font-semibold text-gray-900">Identified Themes</h3>
        <span className="text-xs bg-purple-100 text-purple-700 px-2 py-0.5 rounded-full">
          {themes.length} themes
        </span>
      </div>
      
      <div className="space-y-2">
        {themes.map(theme => (
          <div 
            key={theme.id}
            className={cn("border rounded-lg overflow-hidden transition-colors", getSentimentColor(theme.sentiment))}
          >
            <button
              onClick={() => toggleTheme(theme.id)}
              className="w-full flex items-center gap-3 p-3 text-left hover:bg-white/50 transition-colors"
            >
              {getSentimentIcon(theme.sentiment)}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900">{theme.name}</p>
                <p className="text-xs text-gray-500 truncate">{theme.description}</p>
              </div>
              {expandedThemes.includes(theme.id) ? (
                <ChevronDown className="h-4 w-4 text-gray-400 flex-shrink-0" />
              ) : (
                <ChevronRight className="h-4 w-4 text-gray-400 flex-shrink-0" />
              )}
            </button>

            {expandedThemes.includes(theme.id) && (
              <div className="px-3 pb-3 space-y-3">
                <div>
                  <p className="text-xs font-medium text-gray-500 mb-1">Related Questions</p>
                  <p className="text-xs text-gray-600">
                    {theme.questionIds.length} questions linked to this theme
                  </p>
                </div>

                {theme.relatedFiles.length > 0 && (
                  <div>
                    <p className="text-xs font-medium text-gray-500 mb-2 flex items-center gap-1">
                      <FolderOpen className="h-3 w-3" />
                      Related Data Room Files
                    </p>
                    <div className="space-y-1">
                      {theme.relatedFiles.map(file => (
                        <div 
                          key={file.id}
                          className="flex items-center gap-2 p-2 bg-white rounded border border-gray-100"
                        >
                          <FileText className="h-3 w-3 text-gray-400" />
                          <div className="flex-1 min-w-0">
                            <p className="text-xs font-medium text-gray-700 truncate">{file.fileName}</p>
                            <p className="text-[10px] text-gray-400">{file.matchReason}</p>
                          </div>
                          <span className="text-[10px] bg-blue-100 text-blue-700 px-1.5 py-0.5 rounded">
                            {file.relevanceScore}%
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </Card>
  );
}
