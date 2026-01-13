import { X, Send, Paperclip, Mic, Sparkles, ArrowRight, ClipboardList, BarChart2, GitCompare, HelpCircle, Lightbulb, FileText, Lock } from "lucide-react";
import { useAiChat } from "@/contexts/AiChatContext";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { TonyFace } from "./TonyFace";
import "./AiChatPanel.css";

// Agent data
const agents = [
  {
    id: "irt",
    name: "Information Request Tracker",
    shortName: "IRT",
    description: "Engagement scope deliverables and workflow coordination",
    icon: ClipboardList,
    status: "active",
    color: "bg-blue-500",
  },
  {
    id: "data-inventory",
    name: "Data Inventory",
    shortName: "Inventory",
    description: "Processes and classifies all uploaded documents",
    icon: BarChart2,
    status: "active",
    color: "bg-emerald-500",
  },
  {
    id: "data-integrity",
    name: "Data Integrity",
    shortName: "Integrity",
    description: "Maps accounts, reconciles data, detects anomalies",
    icon: GitCompare,
    status: "active",
    color: "bg-purple-500",
  },
  {
    id: "mgmt-questions",
    name: "Management Questions",
    shortName: "Questions",
    description: "Coming soon",
    icon: HelpCircle,
    status: "coming-soon",
    color: "bg-gray-400",
  },
  {
    id: "insights",
    name: "Insights Engine",
    shortName: "Insights",
    description: "Coming soon",
    icon: Lightbulb,
    status: "coming-soon",
    color: "bg-gray-400",
  },
  {
    id: "report",
    name: "Report Generator",
    shortName: "Reports",
    description: "Produces final reports and deliverables",
    icon: FileText,
    status: "active",
    color: "bg-orange-500",
  },
];

// Onboarding Step 1 - Tony Introduction (Waving/Excited)
function OnboardingStep1() {
  const { nextOnboardingStep, skipOnboarding } = useAiChat();
  const [showText, setShowText] = useState(false);
  const [showSubtext, setShowSubtext] = useState(false);
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const textTimer = setTimeout(() => setShowText(true), 600);
    const subtextTimer = setTimeout(() => setShowSubtext(true), 1200);
    const buttonTimer = setTimeout(() => setShowButton(true), 1800);
    
    return () => {
      clearTimeout(textTimer);
      clearTimeout(subtextTimer);
      clearTimeout(buttonTimer);
    };
  }, []);

  return (
    <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
      <TonyFace size="large" className="tony-bounce-in mb-8" />

      <div className={`transition-all duration-500 ${showText ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Hey! I'm Tony 👋
        </h2>
      </div>
      
      <div className={`transition-all duration-500 delay-100 ${showSubtext ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
        <p className="text-gray-600 mb-2 max-w-[280px]">
          Your AI partner for due diligence.
        </p>
        <p className="text-gray-500 text-sm max-w-[280px]">
          I'm here to help you analyze data, spot risks, and make better decisions — faster.
        </p>
      </div>

      <div className={`mt-8 transition-all duration-500 ${showButton ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
        <Button 
          onClick={nextOnboardingStep}
          className="bg-primary hover:bg-primary/90 rounded-full px-6 py-5 text-base gap-2"
        >
          Nice to meet you!
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>

      <div className="flex gap-2 mt-8">
        <div className="w-2 h-2 rounded-full bg-primary" />
        <div className="w-2 h-2 rounded-full bg-gray-200" />
        <div className="w-2 h-2 rounded-full bg-gray-200" />
        <div className="w-2 h-2 rounded-full bg-gray-200" />
      </div>
    </div>
  );
}

// Onboarding Step 2 - Meet the Team (Happy)
function OnboardingStep2() {
  const { nextOnboardingStep, skipOnboarding } = useAiChat();
  const [currentAgent, setCurrentAgent] = useState(0);

  const handleNext = () => {
    if (currentAgent < agents.length - 1) {
      setCurrentAgent(prev => prev + 1);
    } else {
      nextOnboardingStep();
    }
  };

  const agent = agents[currentAgent];
  const IconComponent = agent.icon;

  return (
    <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
      <TonyFace size="medium" className="mb-4" />
      
      <p className="text-gray-500 text-sm mb-6">I work with a team of specialists...</p>

      {/* Agent Card */}
      <div className="w-full max-w-[300px] bg-gray-50 rounded-2xl p-6 mb-6 transition-all duration-300">
        <div className={`w-14 h-14 ${agent.color} rounded-xl flex items-center justify-center mx-auto mb-4 ${agent.status === 'coming-soon' ? 'opacity-50' : ''}`}>
          {agent.status === 'coming-soon' ? (
            <Lock className="h-6 w-6 text-white" />
          ) : (
            <IconComponent className="h-6 w-6 text-white" />
          )}
        </div>
        <h3 className="font-semibold text-gray-900 mb-1">{agent.name}</h3>
        <p className="text-sm text-gray-500">{agent.description}</p>
        {agent.status === 'coming-soon' && (
          <span className="inline-block mt-2 text-xs bg-gray-200 text-gray-600 px-2 py-1 rounded-full">
            Coming Soon
          </span>
        )}
      </div>

      {/* Agent dots */}
      <div className="flex gap-2 mb-6">
        {agents.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentAgent(index)}
            className={`w-2 h-2 rounded-full transition-all ${
              index === currentAgent ? 'bg-primary w-4' : 'bg-gray-300'
            }`}
          />
        ))}
      </div>

      <Button 
        onClick={handleNext}
        className="bg-primary hover:bg-primary/90 rounded-full px-6 py-5 text-base gap-2"
      >
        {currentAgent < agents.length - 1 ? 'Next' : 'Got it!'}
        <ArrowRight className="h-4 w-4" />
      </Button>

      <div className="flex gap-2 mt-6">
        <div className="w-2 h-2 rounded-full bg-primary" />
        <div className="w-2 h-2 rounded-full bg-primary" />
        <div className="w-2 h-2 rounded-full bg-gray-200" />
        <div className="w-2 h-2 rounded-full bg-gray-200" />
      </div>
    </div>
  );
}

// Onboarding Step 3 - How to use (Thinking)
function OnboardingStep3() {
  const { nextOnboardingStep, skipOnboarding } = useAiChat();

  return (
    <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
      <TonyFace size="large" className="mb-6" />
      
      <h2 className="text-xl font-bold text-gray-900 mb-2">
        How we'll work together
      </h2>
      <p className="text-gray-500 text-sm mb-8 max-w-[280px]">
        You can use me in two ways:
      </p>

      <div className="w-full max-w-[300px] space-y-4 mb-8">
        <div className="bg-gray-50 rounded-xl p-4 text-left">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
              <Sparkles className="h-4 w-4 text-primary" />
            </div>
            <span className="font-medium text-gray-900">Ask me anything</span>
          </div>
          <p className="text-sm text-gray-500 pl-11">
            I'll route your question to the right specialist automatically
          </p>
        </div>

        <div className="bg-gray-50 rounded-xl p-4 text-left">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
              <ClipboardList className="h-4 w-4 text-purple-600" />
            </div>
            <span className="font-medium text-gray-900">Pick an agent</span>
          </div>
          <p className="text-sm text-gray-500 pl-11">
            Select a specialist directly when you know what you need
          </p>
        </div>
      </div>

      <Button 
        onClick={nextOnboardingStep}
        className="bg-primary hover:bg-primary/90 rounded-full px-6 py-5 text-base gap-2"
      >
        Makes sense!
        <ArrowRight className="h-4 w-4" />
      </Button>

      <div className="flex gap-2 mt-6">
        <div className="w-2 h-2 rounded-full bg-primary" />
        <div className="w-2 h-2 rounded-full bg-primary" />
        <div className="w-2 h-2 rounded-full bg-primary" />
        <div className="w-2 h-2 rounded-full bg-gray-200" />
      </div>
    </div>
  );
}

// Onboarding Step 4 - Ready! (Excited)
function OnboardingStep4() {
  const { skipOnboarding } = useAiChat();
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowConfetti(true), 300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
      <TonyFace size="large" className="tony-bounce-in mb-6" />
      
      <h2 className="text-2xl font-bold text-gray-900 mb-2">
        We're all set! 🚀
      </h2>
      <p className="text-gray-500 text-sm mb-8 max-w-[280px]">
        I'm ready to help you with your due diligence. Let's dive in!
      </p>

      <Button 
        onClick={skipOnboarding}
        className="bg-primary hover:bg-primary/90 rounded-full px-8 py-5 text-base gap-2"
      >
        Let's get started!
        <ArrowRight className="h-4 w-4" />
      </Button>

      <div className="flex gap-2 mt-8">
        <div className="w-2 h-2 rounded-full bg-primary" />
        <div className="w-2 h-2 rounded-full bg-primary" />
        <div className="w-2 h-2 rounded-full bg-primary" />
        <div className="w-2 h-2 rounded-full bg-primary" />
      </div>
    </div>
  );
}

// Main Chat Interface (shown after onboarding)
function ChatInterface() {
  const [message, setMessage] = useState("");
  const [selectedAgent, setSelectedAgent] = useState<string | null>(null);

  const activeAgents = agents.filter(a => a.status === "active");

  return (
    <>
      {/* Agent selector */}
      <div className="px-4 py-3 border-b border-gray-100 overflow-x-auto">
        <div className="flex gap-2">
          <button
            onClick={() => setSelectedAgent(null)}
            className={`flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
              selectedAgent === null 
                ? 'bg-primary text-white' 
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            Tony
          </button>
          {agents.map((agent) => {
            const IconComponent = agent.icon;
            const isDisabled = agent.status === 'coming-soon';
            return (
              <button
                key={agent.id}
                onClick={() => !isDisabled && setSelectedAgent(agent.id)}
                disabled={isDisabled}
                className={`flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                  isDisabled 
                    ? 'bg-gray-50 text-gray-300 cursor-not-allowed'
                    : selectedAgent === agent.id 
                      ? 'bg-primary text-white' 
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {isDisabled && <Lock className="h-3 w-3" />}
                {agent.shortName}
              </button>
            );
          })}
        </div>
      </div>

      {/* Greeting Section */}
      <div className="flex-1 overflow-y-auto p-6">
        <div className="flex flex-col items-center text-center mb-8 pt-4">
          <TonyFace size="medium" className="mb-4" />
          <h2 className="text-xl font-bold text-gray-900 mb-1">
            How can I help you today?
          </h2>
          <p className="text-sm text-gray-500">
            {selectedAgent 
              ? `Using ${agents.find(a => a.id === selectedAgent)?.name}`
              : "Ask me anything or pick an agent above"
            }
          </p>
        </div>

        {/* Suggested prompts */}
        <div className="space-y-2">
          <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-3">
            Suggested Questions
          </p>
          {[
            "What are the key financial risks?",
            "Summarize customer concentration",
            "Show me the EBITDA trend",
          ].map((prompt) => (
            <button
              key={prompt}
              onClick={() => setMessage(prompt)}
              className="w-full text-left px-4 py-3 rounded-xl bg-gray-50 hover:bg-gray-100 text-sm text-gray-700 transition-colors"
            >
              {prompt}
            </button>
          ))}
        </div>
      </div>

      {/* Input Section */}
      <div className="p-4 border-t border-gray-100">
        <div className="flex items-center gap-2 bg-gray-50 rounded-xl p-2">
          <button className="p-2 hover:bg-gray-200 rounded-lg transition-colors">
            <Paperclip className="h-5 w-5 text-gray-400" />
          </button>
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Ask Tony anything..."
            className="flex-1 bg-transparent outline-none text-sm text-gray-700 placeholder:text-gray-400"
          />
          <button className="p-2 hover:bg-gray-200 rounded-lg transition-colors">
            <Mic className="h-5 w-5 text-gray-400" />
          </button>
          <Button
            size="sm"
            className="bg-primary hover:bg-primary/90 rounded-lg"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </>
  );
}

export function AiChatPanel() {
  const { isAiChatOpen, closeAiChat, onboardingStep, hasCompletedOnboarding } = useAiChat();

  if (!isAiChatOpen) return null;

  const renderContent = () => {
    if (hasCompletedOnboarding) {
      return <ChatInterface />;
    }
    
    switch (onboardingStep) {
      case 1:
        return <OnboardingStep1 />;
      case 2:
        return <OnboardingStep2 />;
      case 3:
        return <OnboardingStep3 />;
      case 4:
        return <OnboardingStep4 />;
      default:
        return <ChatInterface />;
    }
  };

  return (
    <div className="w-[380px] h-full bg-white border-l border-gray-200 flex flex-col shadow-lg animate-slide-in-right">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/20 to-purple-500/20 flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">Tony</h3>
            <p className="text-xs text-gray-500">Your AI Partner</p>
          </div>
        </div>
        <button
          onClick={closeAiChat}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <X className="h-5 w-5 text-gray-500" />
        </button>
      </div>

      {renderContent()}
    </div>
  );
}
