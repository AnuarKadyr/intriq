import { useState, useMemo } from "react";
import { ArrowLeft, FileText, CheckCircle2, ArrowRight, Sparkles, Presentation, Palette, Layout, TrendingUp, Zap, Download } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { MainLayout } from "@/components/MainLayout";
import { ReportSection, ReportTheme, ReportSlide, SlideAmendment } from "@/types/reportGenerator";
import { fddReportSections, initialThemes, generateInitialSlides } from "@/data/reportGeneratorData";
import { SectionSelector } from "@/components/reportGenerator/SectionSelector";
import { ThemeSelector } from "@/components/reportGenerator/ThemeSelector";
import { SlideEditor } from "@/components/reportGenerator/SlideEditor";
import { TonyFace } from "@/components/TonyFace";
import { cn } from "@/lib/utils";

type Step = "sections" | "themes" | "slides";

const steps: { id: Step; label: string; description: string; icon: React.ComponentType<{ className?: string }> }[] = [
  { id: "sections", label: "Select Sections", description: "Choose report structure", icon: Layout },
  { id: "themes", label: "Review Themes", description: "AI-identified insights", icon: Sparkles },
  { id: "slides", label: "Edit Slides", description: "Refine & customize", icon: Presentation },
];

const ReportGeneratorAgent = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState<Step>("sections");
  const [sections, setSections] = useState<ReportSection[]>(fddReportSections);
  const [themes, setThemes] = useState<ReportTheme[]>(initialThemes);
  const [amendments, setAmendments] = useState<SlideAmendment[]>([]);
  const [selectedSlideId, setSelectedSlideId] = useState<string | null>(null);

  const selectedSections = sections.filter(s => s.isSelected);
  const acceptedThemes = themes.filter(t => t.isAccepted);

  const slides = useMemo(() => {
    if (currentStep === "slides") {
      return generateInitialSlides(selectedSections, acceptedThemes);
    }
    return [];
  }, [currentStep, selectedSections, acceptedThemes]);

  const handleSectionToggle = (sectionId: string) => {
    setSections(prev => prev.map(s => 
      s.id === sectionId ? { ...s, isSelected: !s.isSelected } : s
    ));
  };

  const handleSubsectionToggle = (sectionId: string, subsectionId: string) => {
    setSections(prev => prev.map(s => 
      s.id === sectionId ? {
        ...s,
        subsections: s.subsections?.map(sub => 
          sub.id === subsectionId ? { ...sub, isSelected: !sub.isSelected } : sub
        ),
      } : s
    ));
  };

  const handleThemeToggle = (themeId: string) => {
    setThemes(prev => prev.map(t => 
      t.id === themeId ? { ...t, isAccepted: !t.isAccepted } : t
    ));
  };

  const handleNext = () => {
    if (currentStep === "sections") setCurrentStep("themes");
    else if (currentStep === "themes") {
      setCurrentStep("slides");
      setTimeout(() => {
        const generatedSlides = generateInitialSlides(selectedSections, acceptedThemes);
        if (generatedSlides.length > 0) setSelectedSlideId(generatedSlides[0].id);
      }, 100);
    }
  };

  const handleBack = () => {
    if (currentStep === "themes") setCurrentStep("sections");
    else if (currentStep === "slides") setCurrentStep("themes");
  };

  const currentStepIndex = steps.findIndex(s => s.id === currentStep);

  return (
    <MainLayout>
      <div className="flex flex-col h-full min-h-0 overflow-hidden">
        {/* Header */}
        <header className="border-b border-gray-200 bg-white px-8 py-4 flex-shrink-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" onClick={() => navigate("/dashboard")}>
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-amber-600 rounded-lg flex items-center justify-center shadow-sm">
                  <FileText className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-900">Report Generator</h1>
                  <p className="text-sm text-gray-500">
                    {currentStep === "sections" && "Select sections to include in your report"}
                    {currentStep === "themes" && "Review AI-identified themes and insights"}
                    {currentStep === "slides" && "Edit and customize your slides"}
                  </p>
                </div>
              </div>
            </div>

            {/* Enhanced Step Indicator */}
            <div className="flex items-center gap-1 bg-gray-100 p-1 rounded-xl">
              {steps.map((step, idx) => {
                const isActive = currentStep === step.id;
                const isCompleted = idx < currentStepIndex;
                
                return (
                  <div key={step.id} className="flex items-center">
                    <button
                      onClick={() => {
                        if (isCompleted) {
                          setCurrentStep(step.id);
                        }
                      }}
                      disabled={!isCompleted && !isActive}
                      className={cn(
                        "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all",
                        isActive 
                          ? "bg-white text-foreground shadow-sm" 
                          : isCompleted 
                            ? "text-emerald-600 hover:bg-white/50 cursor-pointer"
                            : "text-muted-foreground cursor-not-allowed"
                      )}
                    >
                      <div className={cn(
                        "w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold",
                        isActive ? "bg-primary text-primary-foreground" :
                        isCompleted ? "bg-emerald-100 text-emerald-600" : "bg-gray-200 text-gray-500"
                      )}>
                        {isCompleted ? <CheckCircle2 className="h-4 w-4" /> : idx + 1}
                      </div>
                      <span className="hidden lg:inline">{step.label}</span>
                    </button>
                    {idx < steps.length - 1 && (
                      <div className={cn(
                        "w-8 h-0.5 mx-1",
                        idx < currentStepIndex ? "bg-emerald-300" : "bg-gray-300"
                      )} />
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </header>

        {/* Content */}
        <div className="flex-1 min-h-0 overflow-hidden">
          {currentStep === "sections" && (
            <div className="h-full p-6 overflow-y-auto">
              <div className="max-w-3xl mx-auto space-y-6">
                {/* AI Welcome Card */}
                <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-orange-500/5 via-amber-500/10 to-orange-500/5 border border-orange-200/50 p-6">
                  <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute -top-10 -right-10 w-40 h-40 bg-orange-500/20 rounded-full blur-3xl animate-pulse-subtle" />
                    <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-amber-500/20 rounded-full blur-3xl animate-pulse-subtle" style={{ animationDelay: '1s' }} />
                  </div>
                  
                  <div className="relative flex items-start gap-5">
                    <div className="relative flex-shrink-0">
                      <TonyFace size="medium" />
                      <div className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center shadow-md">
                        <Sparkles className="h-3 w-3 text-white" />
                      </div>
                    </div>
                    
                    <div className="flex-1">
                      <h2 className="text-lg font-bold text-foreground mb-2">Let's Build Your Report</h2>
                      <p className="text-sm text-foreground/70 leading-relaxed">
                        Select the sections you want to include in your FDD report. I'll analyze your data room 
                        and generate <span className="text-foreground font-semibold">AI-powered insights and themed content</span> for each section.
                      </p>
                      
                      <div className="flex items-center gap-3 mt-4">
                        {[
                          { icon: Layout, label: '7 Sections', color: 'text-orange-500' },
                          { icon: Sparkles, label: '10+ Themes', color: 'text-amber-500' },
                          { icon: Presentation, label: 'Auto-Generate', color: 'text-emerald-500' },
                        ].map((stat, i) => (
                          <div key={i} className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-white/60 backdrop-blur-sm border border-white/50">
                            <stat.icon className={cn("h-3.5 w-3.5", stat.color)} />
                            <span className="text-xs font-medium text-foreground/80">{stat.label}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Section Selector */}
                <SectionSelector
                  sections={sections}
                  onSectionToggle={handleSectionToggle}
                  onSubsectionToggle={handleSubsectionToggle}
                />
              </div>
            </div>
          )}

          {currentStep === "themes" && (
            <div className="h-full p-6 overflow-y-auto">
              <div className="max-w-4xl mx-auto space-y-6">
                {/* AI Themes Intro */}
                <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-purple-500/5 via-primary/10 to-purple-500/5 border border-primary/20 p-6">
                  <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary/20 rounded-full blur-3xl animate-pulse-subtle" />
                  </div>
                  
                  <div className="relative flex items-start gap-5">
                    <div className="relative flex-shrink-0">
                      <TonyFace size="medium" />
                      <div className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-br from-primary to-purple-600 rounded-full flex items-center justify-center shadow-md">
                        <Zap className="h-3 w-3 text-white" />
                      </div>
                    </div>
                    
                    <div className="flex-1">
                      <h2 className="text-lg font-bold text-foreground mb-2">AI-Identified Themes</h2>
                      <p className="text-sm text-foreground/70 leading-relaxed">
                        I've analyzed your data room and identified <span className="text-foreground font-semibold">{themes.filter(t => selectedSections.some(s => s.id === t.sectionId)).length} key themes</span> across your selected sections.
                        Accept or reject themes to control what appears in your final report.
                      </p>
                      
                      <div className="flex items-center gap-2 mt-3">
                        <span className="text-xs text-emerald-600 font-medium px-2 py-0.5 bg-emerald-50 rounded-full">
                          {themes.filter(t => t.sentiment === 'positive' && selectedSections.some(s => s.id === t.sectionId)).length} Positive
                        </span>
                        <span className="text-xs text-amber-600 font-medium px-2 py-0.5 bg-amber-50 rounded-full">
                          {themes.filter(t => t.sentiment === 'warning' && selectedSections.some(s => s.id === t.sectionId)).length} Warnings
                        </span>
                        <span className="text-xs text-gray-600 font-medium px-2 py-0.5 bg-gray-100 rounded-full">
                          {themes.filter(t => t.sentiment === 'neutral' && selectedSections.some(s => s.id === t.sectionId)).length} Neutral
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Theme Selector */}
                <ThemeSelector
                  themes={themes.filter(t => selectedSections.some(s => s.id === t.sectionId))}
                  sections={selectedSections}
                  onThemeToggle={handleThemeToggle}
                  onAcceptAll={() => setThemes(prev => prev.map(t => ({ ...t, isAccepted: true })))}
                  onRejectAll={() => setThemes(prev => prev.map(t => ({ ...t, isAccepted: false })))}
                />
              </div>
            </div>
          )}

          {currentStep === "slides" && (
            <div className="h-full min-h-0 p-6 overflow-hidden">
              <SlideEditor
                slides={slides}
                selectedSlideId={selectedSlideId}
                amendments={amendments}
                onSelectSlide={setSelectedSlideId}
                onApplyAmendment={(a) => setAmendments(prev => [...prev, a])}
                onUpdateSlide={() => {}}
              />
            </div>
          )}
        </div>

        {/* Footer */}
        <footer className="border-t border-gray-200 bg-white px-8 py-4 flex-shrink-0">
          <div className="flex items-center justify-between">
            <Button 
              variant="outline" 
              onClick={handleBack} 
              disabled={currentStep === "sections"}
              className="gap-2"
            >
              <ArrowLeft className="h-4 w-4" /> Back
            </Button>
            
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 px-3 py-1.5 bg-gray-100 rounded-lg">
                {currentStep === "sections" && (
                  <>
                    <Layout className="h-4 w-4 text-orange-500" />
                    <span className="text-sm font-medium">{selectedSections.length} sections selected</span>
                  </>
                )}
                {currentStep === "themes" && (
                  <>
                    <Sparkles className="h-4 w-4 text-primary" />
                    <span className="text-sm font-medium">{acceptedThemes.length} themes included</span>
                  </>
                )}
                {currentStep === "slides" && (
                  <>
                    <Presentation className="h-4 w-4 text-emerald-500" />
                    <span className="text-sm font-medium">{slides.length} slides generated</span>
                  </>
                )}
              </div>
            </div>

            {currentStep !== "slides" ? (
              <Button onClick={handleNext} disabled={selectedSections.length === 0} className="gap-2">
                Next <ArrowRight className="h-4 w-4" />
              </Button>
            ) : (
              <Button className="gap-2 bg-emerald-600 hover:bg-emerald-700">
                <Download className="h-4 w-4" /> Export Report
              </Button>
            )}
          </div>
        </footer>
      </div>
    </MainLayout>
  );
};

export default ReportGeneratorAgent;
