import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, X, ClipboardList, BarChart2, GitCompare, HelpCircle, Lightbulb, FileText } from "lucide-react";
import "./AgentSpotlightTour.css";

const tourSteps = [
  {
    id: "intro",
    title: "Meet Your AI Agents",
    description: "These specialized agents help you with different aspects of due diligence. Let me show you what each one does.",
    icon: null,
    color: null,
  },
  {
    id: "irt",
    title: "Information Request Tracker",
    description: "Manages engagement scope, deliverables, and coordinates your workflow. Think of it as your project manager.",
    icon: ClipboardList,
    color: "bg-blue-500",
  },
  {
    id: "data-inventory",
    title: "Data Inventory",
    description: "Automatically processes and classifies all your uploaded documents, making them searchable and organized.",
    icon: BarChart2,
    color: "bg-emerald-500",
  },
  {
    id: "data-integrity",
    title: "Data Integrity",
    description: "Maps accounts, reconciles data across sources, and detects anomalies that need attention.",
    icon: GitCompare,
    color: "bg-purple-500",
  },
  {
    id: "mgmt-questions",
    title: "Management Questions",
    description: "Generates smart questions for management interviews based on your data analysis.",
    icon: HelpCircle,
    color: "bg-amber-500",
  },
  {
    id: "insights",
    title: "Insights Engine",
    description: "Surfaces patterns, trends, and actionable recommendations from your engagement data.",
    icon: Lightbulb,
    color: "bg-yellow-500",
  },
  {
    id: "report",
    title: "Report Generator",
    description: "Produces polished final reports and deliverables ready for client presentation.",
    icon: FileText,
    color: "bg-orange-500",
  },
];

interface AgentSpotlightTourProps {
  onComplete: () => void;
}

export function AgentSpotlightTour({ onComplete }: AgentSpotlightTourProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Animate in after a short delay
    const timer = setTimeout(() => setIsVisible(true), 300);
    return () => clearTimeout(timer);
  }, []);

  const handleNext = () => {
    if (currentStep < tourSteps.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      handleComplete();
    }
  };

  const handleComplete = () => {
    setIsVisible(false);
    setTimeout(onComplete, 300);
  };

  const step = tourSteps[currentStep];
  const IconComponent = step.icon;
  const isIntro = currentStep === 0;
  const isLast = currentStep === tourSteps.length - 1;

  return (
    <div className={`spotlight-overlay ${isVisible ? 'visible' : ''}`}>
      {/* Backdrop */}
      <div className="spotlight-backdrop" />
      
      {/* Spotlight on agent bar area */}
      <div className="spotlight-highlight" />
      
      {/* Tour Card */}
      <div className={`spotlight-card ${isVisible ? 'visible' : ''}`}>
        <button 
          onClick={handleComplete}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="flex flex-col items-center text-center">
          {/* Icon */}
          {isIntro ? (
            <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-4">
              <div className="grid grid-cols-3 gap-1">
                {[ClipboardList, BarChart2, GitCompare, HelpCircle, Lightbulb, FileText].map((Icon, i) => (
                  <div key={i} className="w-4 h-4 bg-primary/20 rounded flex items-center justify-center">
                    <Icon className="h-2.5 w-2.5 text-primary" />
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className={`w-14 h-14 ${step.color} rounded-2xl flex items-center justify-center mb-4 shadow-lg`}>
              {IconComponent && <IconComponent className="h-7 w-7 text-white" />}
            </div>
          )}

          {/* Content */}
          <h3 className="text-xl font-bold text-gray-900 mb-2">{step.title}</h3>
          <p className="text-gray-600 text-sm leading-relaxed max-w-[280px] mb-6">
            {step.description}
          </p>

          {/* Progress dots */}
          <div className="flex gap-1.5 mb-6">
            {tourSteps.map((_, index) => (
              <div 
                key={index}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  index === currentStep 
                    ? 'w-6 bg-primary' 
                    : index < currentStep 
                      ? 'w-1.5 bg-primary/50' 
                      : 'w-1.5 bg-gray-200'
                }`}
              />
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              onClick={handleComplete}
              className="text-gray-500 hover:text-gray-700"
            >
              Skip tour
            </Button>
            <Button
              onClick={handleNext}
              className="bg-primary hover:bg-primary/90 rounded-full px-6 gap-2"
            >
              {isLast ? "Get started" : "Next"}
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
