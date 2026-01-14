import { useState } from "react";
import { ChevronDown, ChevronRight, CheckCircle2, Clock, AlertCircle, HelpCircle } from "lucide-react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { ManagementQuestion } from "@/types/managementQuestions";

interface QuestionTrackerProps {
  questions: ManagementQuestion[];
  categories: { id: string; name: string; color: string }[];
  onUpdateStatus: (questionId: string, status: ManagementQuestion["status"]) => void;
}

export function QuestionTracker({ questions, categories, onUpdateStatus }: QuestionTrackerProps) {
  const [expandedCategories, setExpandedCategories] = useState<string[]>(categories.map(c => c.name));
  const [expandedQuestions, setExpandedQuestions] = useState<string[]>([]);

  const toggleCategory = (category: string) => {
    setExpandedCategories(prev => 
      prev.includes(category) ? prev.filter(c => c !== category) : [...prev, category]
    );
  };

  const toggleQuestion = (questionId: string) => {
    setExpandedQuestions(prev =>
      prev.includes(questionId) ? prev.filter(q => q !== questionId) : [...prev, questionId]
    );
  };

  const getStatusIcon = (status: ManagementQuestion["status"]) => {
    switch (status) {
      case "Answered":
        return <CheckCircle2 className="h-4 w-4 text-emerald-500" />;
      case "Partially Answered":
        return <Clock className="h-4 w-4 text-amber-500" />;
      case "Follow-up Required":
        return <AlertCircle className="h-4 w-4 text-red-500" />;
      default:
        return <HelpCircle className="h-4 w-4 text-gray-400" />;
    }
  };

  const getStatusBadge = (status: ManagementQuestion["status"]) => {
    const styles = {
      "Answered": "bg-emerald-100 text-emerald-700",
      "Partially Answered": "bg-amber-100 text-amber-700",
      "Follow-up Required": "bg-red-100 text-red-700",
      "Pending": "bg-gray-100 text-gray-600",
    };
    return (
      <span className={cn("text-[10px] px-2 py-0.5 rounded-full font-medium", styles[status])}>
        {status}
      </span>
    );
  };

  const groupedQuestions = categories.map(cat => ({
    ...cat,
    questions: questions.filter(q => q.category === cat.name),
  }));

  return (
    <Card className="p-4">
      <h3 className="text-sm font-semibold text-gray-900 mb-4">Question Tracker</h3>
      <div className="space-y-2">
        {groupedQuestions.map(category => (
          <div key={category.id} className="border border-gray-200 rounded-lg overflow-hidden">
            {/* Category Header */}
            <button
              onClick={() => toggleCategory(category.name)}
              className="w-full flex items-center justify-between p-3 bg-gray-50 hover:bg-gray-100 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div 
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: category.color }}
                />
                <span className="text-sm font-medium text-gray-900">{category.name}</span>
                <span className="text-xs text-gray-500">
                  ({category.questions.filter(q => q.status === "Answered").length}/{category.questions.length})
                </span>
              </div>
              {expandedCategories.includes(category.name) ? (
                <ChevronDown className="h-4 w-4 text-gray-400" />
              ) : (
                <ChevronRight className="h-4 w-4 text-gray-400" />
              )}
            </button>

            {/* Questions */}
            {expandedCategories.includes(category.name) && (
              <div className="divide-y divide-gray-100">
                {category.questions.map(question => (
                  <div key={question.id} className="bg-white">
                    {/* Question Row */}
                    <button
                      onClick={() => toggleQuestion(question.id)}
                      className="w-full flex items-start gap-3 p-3 hover:bg-gray-50 transition-colors text-left"
                    >
                      <span className="text-xs font-mono text-gray-400 mt-0.5 w-6 flex-shrink-0">
                        {question.number}
                      </span>
                      {getStatusIcon(question.status)}
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-gray-700 line-clamp-2">{question.question}</p>
                        {question.subQuestions && question.subQuestions.length > 0 && (
                          <p className="text-xs text-gray-400 mt-1">
                            +{question.subQuestions.length} sub-question{question.subQuestions.length > 1 ? 's' : ''}
                          </p>
                        )}
                      </div>
                      {getStatusBadge(question.status)}
                      {expandedQuestions.includes(question.id) ? (
                        <ChevronDown className="h-4 w-4 text-gray-400 flex-shrink-0" />
                      ) : (
                        <ChevronRight className="h-4 w-4 text-gray-400 flex-shrink-0" />
                      )}
                    </button>

                    {/* Expanded Details */}
                    {expandedQuestions.includes(question.id) && (
                      <div className="px-3 pb-3 ml-9 space-y-3">
                        {question.subQuestions && question.subQuestions.length > 0 && (
                          <div className="pl-4 border-l-2 border-gray-200 space-y-1">
                            {question.subQuestions.map((sq, idx) => (
                              <p key={idx} className="text-xs text-gray-500">{sq}</p>
                            ))}
                          </div>
                        )}
                        
                        {question.answer && (
                          <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-3">
                            <p className="text-xs font-medium text-emerald-700 mb-1">Answer:</p>
                            <p className="text-sm text-emerald-900">{question.answer}</p>
                            {question.sourceTranscript && (
                              <p className="text-xs text-emerald-600 mt-2">
                                Source: {question.sourceTranscript}
                              </p>
                            )}
                          </div>
                        )}

                        {/* Status Buttons */}
                        <div className="flex gap-2">
                          {(["Pending", "Answered", "Partially Answered", "Follow-up Required"] as const).map(status => (
                            <button
                              key={status}
                              onClick={(e) => {
                                e.stopPropagation();
                                onUpdateStatus(question.id, status);
                              }}
                              className={cn(
                                "text-xs px-2 py-1 rounded border transition-colors",
                                question.status === status
                                  ? "bg-primary text-white border-primary"
                                  : "bg-white text-gray-600 border-gray-200 hover:border-gray-300"
                              )}
                            >
                              {status}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </Card>
  );
}
