import { useState, useMemo } from "react";
import { ArrowLeft, FileText, CheckCircle2, ArrowRight, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { MainLayout } from "@/components/MainLayout";
import { ReportSection, ReportTheme, ReportSlide, SlideAmendment } from "@/types/reportGenerator";
import { fddReportSections, initialThemes, generateInitialSlides } from "@/data/reportGeneratorData";
import { SectionSelector } from "@/components/reportGenerator/SectionSelector";
import { ThemeSelector } from "@/components/reportGenerator/ThemeSelector";
import { SlideEditor } from "@/components/reportGenerator/SlideEditor";
import { cn } from "@/lib/utils";

type Step = "sections" | "themes" | "slides";

const steps: { id: Step; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
  { id: "sections", label: "Select Sections", icon: FileText },
  { id: "themes", label: "Review Themes", icon: Sparkles },
  { id: "slides", label: "Edit Slides", icon: CheckCircle2 },
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
      <div className="flex flex-col h-full">
        {/* Header */}
        <header className="border-b border-gray-200 bg-white px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" onClick={() => navigate("/dashboard")}>
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center">
                  <FileText className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-900">Report Generator</h1>
                  <p className="text-sm text-gray-500">Create FDD reports from your data</p>
                </div>
              </div>
            </div>

            {/* Step Indicator */}
            <div className="flex items-center gap-2">
              {steps.map((step, idx) => (
                <div key={step.id} className="flex items-center">
                  <div className={cn(
                    "flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium transition-all",
                    currentStep === step.id 
                      ? "bg-primary text-primary-foreground" 
                      : idx < currentStepIndex 
                        ? "bg-emerald-100 text-emerald-700"
                        : "bg-muted text-muted-foreground"
                  )}>
                    <step.icon className="h-4 w-4" />
                    {step.label}
                  </div>
                  {idx < steps.length - 1 && (
                    <ArrowRight className="h-4 w-4 mx-2 text-muted-foreground" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </header>

        {/* Content */}
        <div className="flex-1 p-6 overflow-hidden">
          {currentStep === "sections" && (
            <div className="max-w-2xl mx-auto h-full overflow-y-auto">
              <SectionSelector
                sections={sections}
                onSectionToggle={handleSectionToggle}
                onSubsectionToggle={handleSubsectionToggle}
              />
            </div>
          )}

          {currentStep === "themes" && (
            <div className="max-w-3xl mx-auto h-full overflow-y-auto">
              <ThemeSelector
                themes={themes.filter(t => selectedSections.some(s => s.id === t.sectionId))}
                sections={selectedSections}
                onThemeToggle={handleThemeToggle}
                onAcceptAll={() => setThemes(prev => prev.map(t => ({ ...t, isAccepted: true })))}
                onRejectAll={() => setThemes(prev => prev.map(t => ({ ...t, isAccepted: false })))}
              />
            </div>
          )}

          {currentStep === "slides" && (
            <SlideEditor
              slides={slides}
              selectedSlideId={selectedSlideId}
              amendments={amendments}
              onSelectSlide={setSelectedSlideId}
              onApplyAmendment={(a) => setAmendments(prev => [...prev, a])}
              onUpdateSlide={() => {}}
            />
          )}
        </div>

        {/* Footer */}
        <footer className="border-t border-gray-200 bg-white px-8 py-4">
          <div className="flex items-center justify-between">
            <Button variant="outline" onClick={handleBack} disabled={currentStep === "sections"}>
              <ArrowLeft className="h-4 w-4 mr-2" /> Back
            </Button>
            <div className="text-sm text-muted-foreground">
              {currentStep === "sections" && `${selectedSections.length} sections selected`}
              {currentStep === "themes" && `${acceptedThemes.length} themes included`}
              {currentStep === "slides" && `${slides.length} slides generated`}
            </div>
            {currentStep !== "slides" ? (
              <Button onClick={handleNext} disabled={selectedSections.length === 0}>
                Next <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            ) : (
              <Button className="bg-emerald-600 hover:bg-emerald-700">
                <CheckCircle2 className="h-4 w-4 mr-2" /> Export Report
              </Button>
            )}
          </div>
        </footer>
      </div>
    </MainLayout>
  );
};

export default ReportGeneratorAgent;
