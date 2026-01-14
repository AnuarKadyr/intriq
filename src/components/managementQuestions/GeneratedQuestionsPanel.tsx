import { Sparkles, AlertTriangle, Lightbulb, MessageSquare } from "lucide-react";
import { Card } from "@/components/ui/card";
import { GeneratedQuestion } from "@/types/managementQuestions";
import { cn } from "@/lib/utils";

interface GeneratedQuestionsPanelProps {
  questions: GeneratedQuestion[];
}

export function GeneratedQuestionsPanel({ questions }: GeneratedQuestionsPanelProps) {
  const getSourceIcon = (source: GeneratedQuestion["source"]) => {
    switch (source) {
      case "follow-up":
        return <MessageSquare className="h-3 w-3" />;
      case "theme-based":
        return <Lightbulb className="h-3 w-3" />;
      default:
        return <Sparkles className="h-3 w-3" />;
    }
  };

  const getPriorityColor = (priority: GeneratedQuestion["priority"]) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-700";
      case "medium":
        return "bg-amber-100 text-amber-700";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  return (
    <Card className="p-4">
      <div className="flex items-center gap-2 mb-3">
        <Sparkles className="h-4 w-4 text-primary" />
        <h3 className="text-sm font-semibold text-gray-900">AI-Generated Questions</h3>
      </div>
      
      <p className="text-xs text-gray-500 mb-3">
        New questions generated based on transcript analysis and identified themes
      </p>

      <div className="space-y-2">
        {questions.map(question => (
          <div 
            key={question.id}
            className="p-3 bg-gradient-to-br from-primary/5 to-primary/10 border border-primary/20 rounded-lg"
          >
            <div className="flex items-start gap-2 mb-2">
              <div className="w-5 h-5 bg-primary/20 rounded flex items-center justify-center flex-shrink-0 mt-0.5">
                {getSourceIcon(question.source)}
              </div>
              <p className="text-sm text-gray-800">{question.question}</p>
            </div>
            
            <div className="flex items-center gap-2 ml-7">
              <span className="text-[10px] bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded">
                {question.category}
              </span>
              <span className={cn("text-[10px] px-1.5 py-0.5 rounded", getPriorityColor(question.priority))}>
                {question.priority}
              </span>
              {question.relatedTheme && (
                <span className="text-[10px] text-gray-400">
                  Theme: {question.relatedTheme}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
