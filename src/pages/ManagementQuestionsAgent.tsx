import { useState } from "react";
import { ArrowLeft, HelpCircle, Upload, FileText, ChevronRight, ChevronDown, CheckCircle2, Clock, AlertCircle, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { MainLayout } from "@/components/MainLayout";
import { cn } from "@/lib/utils";
import { ManagementQuestion, TranscriptUpload, Theme, GeneratedQuestion } from "@/types/managementQuestions";
import { initialManagementQuestions, managementQuestionCategories, sampleThemes, sampleGeneratedQuestions } from "@/data/managementQuestionsData";
import { QuestionTracker } from "@/components/managementQuestions/QuestionTracker";
import { TranscriptUploadArea } from "@/components/managementQuestions/TranscriptUploadArea";
import { ThemeAnalysis } from "@/components/managementQuestions/ThemeAnalysis";
import { GeneratedQuestionsPanel } from "@/components/managementQuestions/GeneratedQuestionsPanel";

type ViewState = "initial" | "tracker";

const ManagementQuestionsAgent = () => {
  const navigate = useNavigate();
  const [view, setView] = useState<ViewState>("initial");
  const [questions, setQuestions] = useState<ManagementQuestion[]>(initialManagementQuestions);
  const [transcripts, setTranscripts] = useState<TranscriptUpload[]>([]);
  const [themes, setThemes] = useState<Theme[]>([]);
  const [generatedQuestions, setGeneratedQuestions] = useState<GeneratedQuestion[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleStartTracker = () => {
    setView("tracker");
  };

  const handleTranscriptUpload = async (files: File[]) => {
    setIsProcessing(true);
    
    // Simulate processing
    const newTranscripts: TranscriptUpload[] = files.map((file, idx) => ({
      id: `transcript-${Date.now()}-${idx}`,
      fileName: file.name,
      uploadedAt: new Date(),
      processed: false,
    }));
    
    setTranscripts(prev => [...prev, ...newTranscripts]);
    
    // Simulate AI processing delay
    await new Promise(resolve => setTimeout(resolve, 2500));
    
    // Mark as processed and generate themes/answers
    setTranscripts(prev => prev.map(t => ({ ...t, processed: true })));
    
    // Simulate answering some questions
    setQuestions(prev => prev.map((q, idx) => {
      if (idx < 5) {
        return {
          ...q,
          status: "Answered" as const,
          answer: `Based on management discussion in ${files[0]?.name || 'transcript'}: The team confirmed that ${q.question.slice(0, 50).toLowerCase()}... [Full response extracted from transcript]`,
          sourceTranscript: files[0]?.name,
        };
      }
      if (idx >= 5 && idx < 10) {
        return {
          ...q,
          status: "Partially Answered" as const,
          answer: "Management provided initial response but additional documentation required.",
          sourceTranscript: files[0]?.name,
        };
      }
      return q;
    }));
    
    // Add themes
    setThemes(sampleThemes);
    
    // Add generated follow-up questions
    setGeneratedQuestions(sampleGeneratedQuestions);
    
    setIsProcessing(false);
  };

  const handleUpdateQuestionStatus = (questionId: string, status: ManagementQuestion["status"]) => {
    setQuestions(prev => prev.map(q => 
      q.id === questionId ? { ...q, status } : q
    ));
  };

  const stats = {
    total: questions.length,
    answered: questions.filter(q => q.status === "Answered").length,
    partial: questions.filter(q => q.status === "Partially Answered").length,
    pending: questions.filter(q => q.status === "Pending").length,
    followUp: questions.filter(q => q.status === "Follow-up Required").length,
  };

  return (
    <MainLayout>
      <div className="flex flex-col h-full">
        {/* Header */}
        <header className="border-b border-gray-200 bg-white px-8 py-6">
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => view === "tracker" ? setView("initial") : navigate("/dashboard")}
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-amber-500 rounded-lg flex items-center justify-center">
                <HelpCircle className="h-5 w-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">
                  Management Questions
                </h1>
                <p className="text-sm text-gray-500">
                  {view === "initial" 
                    ? "Track and manage due diligence questions" 
                    : `${stats.answered} of ${stats.total} questions answered`}
                </p>
              </div>
            </div>
          </div>
        </header>

        {/* Content */}
        <div className="flex-1 p-8 overflow-y-auto">
          {view === "initial" && (
            <div className="max-w-4xl mx-auto space-y-8">
              {/* Welcome Card */}
              <Card className="p-8 bg-gradient-to-br from-amber-50 to-orange-50 border-amber-200">
                <div className="flex items-start gap-6">
                  <div className="w-16 h-16 bg-amber-500 rounded-2xl flex items-center justify-center flex-shrink-0">
                    <HelpCircle className="h-8 w-8 text-white" />
                  </div>
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Management Questions Tracker</h2>
                    <p className="text-gray-600 mb-4">
                      Track {initialManagementQuestions.length} pre-loaded due diligence questions across {managementQuestionCategories.length} categories. 
                      Upload management meeting transcripts to automatically extract answers and generate follow-up questions.
                    </p>
                    <div className="flex flex-wrap gap-2 mb-6">
                      {managementQuestionCategories.map(cat => (
                        <span 
                          key={cat.id}
                          className="px-3 py-1 rounded-full text-xs font-medium text-white"
                          style={{ backgroundColor: cat.color }}
                        >
                          {cat.name}
                        </span>
                      ))}
                    </div>
                    <Button onClick={handleStartTracker} className="gap-2">
                      <Sparkles className="h-4 w-4" />
                      Start Question Tracker
                    </Button>
                  </div>
                </div>
              </Card>

              {/* Features Preview */}
              <div className="grid grid-cols-3 gap-4">
                <Card className="p-5 hover:shadow-md transition-shadow">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mb-3">
                    <FileText className="h-5 w-5 text-blue-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-1">Track Questions</h3>
                  <p className="text-sm text-gray-500">Monitor status of all management questions across categories</p>
                </Card>
                
                <Card className="p-5 hover:shadow-md transition-shadow">
                  <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center mb-3">
                    <Upload className="h-5 w-5 text-emerald-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-1">Upload Transcripts</h3>
                  <p className="text-sm text-gray-500">AI extracts answers from management meeting transcripts</p>
                </Card>
                
                <Card className="p-5 hover:shadow-md transition-shadow">
                  <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mb-3">
                    <Sparkles className="h-5 w-5 text-purple-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-1">Generate Insights</h3>
                  <p className="text-sm text-gray-500">Identify themes and generate follow-up questions</p>
                </Card>
              </div>
            </div>
          )}
          
          {view === "tracker" && (
            <div className="space-y-6">
              {/* Stats Bar */}
              <div className="grid grid-cols-5 gap-4">
                <Card className="p-4 bg-gray-50">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gray-200 rounded-lg flex items-center justify-center">
                      <FileText className="h-5 w-5 text-gray-600" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
                      <p className="text-xs text-gray-500">Total Questions</p>
                    </div>
                  </div>
                </Card>
                
                <Card className="p-4 bg-emerald-50 border-emerald-200">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
                      <CheckCircle2 className="h-5 w-5 text-emerald-600" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-emerald-900">{stats.answered}</p>
                      <p className="text-xs text-emerald-600">Answered</p>
                    </div>
                  </div>
                </Card>
                
                <Card className="p-4 bg-amber-50 border-amber-200">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
                      <Clock className="h-5 w-5 text-amber-600" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-amber-900">{stats.partial}</p>
                      <p className="text-xs text-amber-600">Partial</p>
                    </div>
                  </div>
                </Card>
                
                <Card className="p-4 bg-gray-50">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gray-200 rounded-lg flex items-center justify-center">
                      <Clock className="h-5 w-5 text-gray-500" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-gray-900">{stats.pending}</p>
                      <p className="text-xs text-gray-500">Pending</p>
                    </div>
                  </div>
                </Card>
                
                <Card className="p-4 bg-red-50 border-red-200">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                      <AlertCircle className="h-5 w-5 text-red-600" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-red-900">{stats.followUp}</p>
                      <p className="text-xs text-red-600">Follow-up</p>
                    </div>
                  </div>
                </Card>
              </div>

              {/* Main Content Grid */}
              <div className="grid grid-cols-3 gap-6">
                {/* Left: Question Tracker */}
                <div className="col-span-2">
                  <QuestionTracker 
                    questions={questions}
                    categories={managementQuestionCategories}
                    onUpdateStatus={handleUpdateQuestionStatus}
                  />
                </div>
                
                {/* Right: Upload & Insights */}
                <div className="space-y-6">
                  <TranscriptUploadArea 
                    transcripts={transcripts}
                    onUpload={handleTranscriptUpload}
                    isProcessing={isProcessing}
                  />
                  
                  {themes.length > 0 && (
                    <ThemeAnalysis themes={themes} />
                  )}
                  
                  {generatedQuestions.length > 0 && (
                    <GeneratedQuestionsPanel questions={generatedQuestions} />
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
};

export default ManagementQuestionsAgent;
