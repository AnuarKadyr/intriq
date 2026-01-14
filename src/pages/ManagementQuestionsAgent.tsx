import { useState } from "react";
import { ArrowLeft, HelpCircle, Upload, FileText, ChevronRight, ChevronDown, CheckCircle2, Clock, AlertCircle, Sparkles, Zap, Eye, Lightbulb } from "lucide-react";
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
import { TonyFace } from "@/components/TonyFace";

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
              {/* AI-Powered Welcome Card */}
              <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary/5 via-primary/10 to-purple-500/10 border border-primary/20 p-8">
                {/* Animated background orbs */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                  <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary/20 rounded-full blur-3xl animate-pulse-subtle" />
                  <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-purple-500/20 rounded-full blur-3xl animate-pulse-subtle" style={{ animationDelay: '1s' }} />
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-primary/5 rounded-full blur-3xl animate-float" />
                </div>

                <div className="relative flex items-start gap-6">
                  <div className="relative flex-shrink-0">
                    <TonyFace size="large" />
                    <div className="absolute -top-1 -right-1 w-6 h-6 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center shadow-md">
                      <Sparkles className="h-3.5 w-3.5 text-white" />
                    </div>
                  </div>
                  
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold text-foreground mb-3">Management Questions Tracker</h2>
                    
                    <p className="text-foreground/70 mb-5 leading-relaxed">
                      Track <span className="text-foreground font-semibold">{initialManagementQuestions.length} pre-loaded</span> due diligence questions across <span className="text-foreground font-semibold">{managementQuestionCategories.length} categories</span>. 
                      Upload management meeting transcripts to automatically extract answers and generate follow-up questions.
                    </p>

                    {/* Compact Stats Row */}
                    <div className="flex items-center gap-3 mb-5">
                      {[
                        { icon: FileText, label: 'Questions', value: String(initialManagementQuestions.length), color: 'text-primary' },
                        { icon: Eye, label: 'Categories', value: String(managementQuestionCategories.length), color: 'text-amber-500' },
                        { icon: Lightbulb, label: 'AI Insights', value: 'Ready', color: 'text-purple-500' },
                        { icon: CheckCircle2, label: 'Accuracy', value: '94%', color: 'text-emerald-500' }
                      ].map((stat, i) => (
                        <div key={i} className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-white/50 backdrop-blur-sm border border-white/30">
                          <stat.icon className={cn("h-3.5 w-3.5", stat.color)} />
                          <span className="text-xs text-muted-foreground">{stat.label}:</span>
                          <span className={cn("text-xs font-bold", stat.color)}>{stat.value}</span>
                        </div>
                      ))}
                    </div>
                    
                    {/* Categories Section - Subtle style */}
                    <div className="mb-6">
                      <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2 block">Question Categories</span>
                      <div className="flex flex-wrap gap-2">
                        {managementQuestionCategories.map(cat => (
                          <span 
                            key={cat.id}
                            className="px-3 py-1.5 rounded-lg text-xs font-medium text-foreground/80 bg-white/60 backdrop-blur-sm border border-gray-200/50 hover:bg-white/80 transition-colors"
                          >
                            {cat.name}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <Button onClick={handleStartTracker} size="lg" className="gap-2 shadow-lg hover:shadow-xl transition-shadow">
                      <Sparkles className="h-4 w-4" />
                      Start Question Tracker
                    </Button>
                  </div>
                </div>

                {/* AI Attribution */}
                <div className="relative mt-6 pt-5 border-t border-primary/10">
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" style={{ animationDelay: '0.2s' }} />
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" style={{ animationDelay: '0.4s' }} />
                    </div>
                    <span className="text-xs text-muted-foreground">Powered by Intriq AI • Ready to analyze your transcripts</span>
                  </div>
                </div>
              </div>

              {/* Features Preview */}
              <div className="grid grid-cols-3 gap-4">
                <Card className="p-5 hover:shadow-md transition-shadow border-primary/10 hover:border-primary/20">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center mb-3 shadow-sm">
                    <FileText className="h-5 w-5 text-white" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-1">Track Questions</h3>
                  <p className="text-sm text-gray-500">Monitor status of all management questions across categories</p>
                </Card>
                
                <Card className="p-5 hover:shadow-md transition-shadow border-primary/10 hover:border-primary/20">
                  <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-lg flex items-center justify-center mb-3 shadow-sm">
                    <Upload className="h-5 w-5 text-white" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-1">Upload Transcripts</h3>
                  <p className="text-sm text-gray-500">AI extracts answers from management meeting transcripts</p>
                </Card>
                
                <Card className="p-5 hover:shadow-md transition-shadow border-primary/10 hover:border-primary/20">
                  <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg flex items-center justify-center mb-3 shadow-sm">
                    <Sparkles className="h-5 w-5 text-white" />
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
