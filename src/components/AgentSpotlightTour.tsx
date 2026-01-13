import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, ClipboardList, BarChart2, GitCompare, HelpCircle, Lightbulb, FileText } from "lucide-react";
import "./AgentSpotlightTour.css";

const tourSteps = [
  {
    id: "intro",
    title: "Your AI Agents",
    description: "These agents help you with different aspects of due diligence. Click through to learn what each one does.",
    agentIndex: 0,
  },
  {
    id: "irt",
    title: "Information Request Tracker",
    description: "Manages deliverables and coordinates your workflow.",
    icon: ClipboardList,
    color: "bg-blue-500",
    agentIndex: 0,
  },
  {
    id: "data-inventory",
    title: "Data Inventory",
    description: "Processes and classifies all uploaded documents.",
    icon: BarChart2,
    color: "bg-emerald-500",
    agentIndex: 1,
  },
  {
    id: "data-integrity",
    title: "Data Integrity",
    description: "Reconciles data and detects anomalies.",
    icon: GitCompare,
    color: "bg-purple-500",
    agentIndex: 2,
  },
  {
    id: "mgmt-questions",
    title: "Management Questions",
    description: "Generates questions for management interviews.",
    icon: HelpCircle,
    color: "bg-amber-500",
    agentIndex: 3,
  },
  {
    id: "insights",
    title: "Insights Engine",
    description: "Surfaces patterns and actionable recommendations.",
    icon: Lightbulb,
    color: "bg-yellow-500",
    agentIndex: 4,
  },
  {
    id: "report",
    title: "Report Generator",
    description: "Produces final reports and deliverables.",
    icon: FileText,
    color: "bg-orange-500",
    agentIndex: 5,
  },
];

interface AgentSpotlightTourProps {
  onComplete: () => void;
  buttonPositions: { left: number; width: number }[];
}

export function AgentSpotlightTour({ onComplete, buttonPositions }: AgentSpotlightTourProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
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
  const isLast = currentStep === tourSteps.length - 1;
  
  // Get position from actual button measurements
  const buttonPos = buttonPositions[step.agentIndex];
  const modalWidth = 320;
  // Center the modal under the button, but account for the arrow being on the left
  const leftPosition = buttonPos ? buttonPos.left + (buttonPos.width / 2) - 48 : 312;

  return (
    <div className={`spotlight-overlay ${isVisible ? 'visible' : ''}`}>
      <div className="spotlight-backdrop" />
      <div className="spotlight-sidebar-cover" />
      <div className="spotlight-glow" />
      
      <div 
        className={`spotlight-card ${isVisible ? 'visible' : ''}`}
        style={{ left: `${leftPosition}px` }}
      >
        <div className="flex items-start gap-4">
          {IconComponent && (
            <div className={`w-10 h-10 ${step.color} rounded-lg flex items-center justify-center flex-shrink-0`}>
              <IconComponent className="h-5 w-5 text-white" />
            </div>
          )}
          <div className="flex-1 min-w-0">
            <h3 className="text-base font-semibold text-gray-900 mb-1">{step.title}</h3>
            <p className="text-sm text-gray-500 leading-relaxed">{step.description}</p>
          </div>
        </div>

        <div className="flex items-center justify-between mt-5 pt-4 border-t border-gray-100">
          <div className="flex gap-1">
            {tourSteps.map((_, index) => (
              <div 
                key={index}
                className={`w-1.5 h-1.5 rounded-full transition-colors ${
                  index <= currentStep ? 'bg-primary' : 'bg-gray-200'
                }`}
              />
            ))}
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleComplete}
              className="text-gray-400 hover:text-gray-600 h-8 px-3"
            >
              Skip
            </Button>
            <Button
              size="sm"
              onClick={handleNext}
              className="bg-primary hover:bg-primary/90 h-8 px-4 gap-1.5"
            >
              {isLast ? "Done" : "Next"}
              <ArrowRight className="h-3.5 w-3.5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
