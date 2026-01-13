import { X, Send, Paperclip, Mic, Sparkles, ArrowRight } from "lucide-react";
import { useAiChat } from "@/contexts/AiChatContext";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import "./AiChatPanel.css";

// Onboarding Step 1 - Tony Introduction
function OnboardingStep1() {
  const { nextOnboardingStep, skipOnboarding } = useAiChat();
  const [showText, setShowText] = useState(false);
  const [showSubtext, setShowSubtext] = useState(false);
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    // Staggered animations
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
      {/* Tony's Animated Face - Larger for intro */}
      <div className="ai-face-avatar-large mb-8 animate-bounce-in">
        <div className="ai-face-outer-large">
          <div className="ai-face-inner-large">
            <div className="ai-face-background-large">
              <span className="ai-ball-large rosa"></span>
              <span className="ai-ball-large violet"></span>
              <span className="ai-ball-large green"></span>
              <span className="ai-ball-large cyan"></span>
            </div>
            <div className="ai-face-content-large">
              <div className="ai-eyes-large">
                <span className="ai-eye-large"></span>
                <span className="ai-eye-large"></span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Greeting Text */}
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

      {/* Continue Button */}
      <div className={`mt-8 transition-all duration-500 ${showButton ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
        <Button 
          onClick={nextOnboardingStep}
          className="bg-primary hover:bg-primary/90 rounded-full px-6 py-5 text-base gap-2"
        >
          Nice to meet you!
          <ArrowRight className="h-4 w-4" />
        </Button>
        <button 
          onClick={skipOnboarding}
          className="block mx-auto mt-4 text-sm text-gray-400 hover:text-gray-600 transition-colors"
        >
          Skip intro
        </button>
      </div>

      {/* Progress dots */}
      <div className="flex gap-2 mt-8">
        <div className="w-2 h-2 rounded-full bg-primary" />
        <div className="w-2 h-2 rounded-full bg-gray-200" />
        <div className="w-2 h-2 rounded-full bg-gray-200" />
        <div className="w-2 h-2 rounded-full bg-gray-200" />
      </div>
    </div>
  );
}

// Main Chat Interface (shown after onboarding)
function ChatInterface() {
  const [message, setMessage] = useState("");

  return (
    <>
      {/* Greeting Section */}
      <div className="flex-1 overflow-y-auto p-6">
        <div className="flex flex-col items-center text-center mb-8 pt-8">
          {/* AI Face Avatar */}
          <div className="ai-face-avatar mb-4 relative">
            <div className="ai-face-outer">
              <div className="ai-face-inner">
                <div className="ai-face-background">
                  <span className="ai-ball rosa"></span>
                  <span className="ai-ball violet"></span>
                  <span className="ai-ball green"></span>
                  <span className="ai-ball cyan"></span>
                </div>
                <div className="ai-face-content">
                  <div className="ai-eyes">
                    <span className="ai-eye"></span>
                    <span className="ai-eye"></span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-1">
            How can I help you today?
          </h2>
          <p className="text-sm text-gray-500">
            Ask me anything or pick an agent below
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

      {/* Content - Show onboarding or chat based on state */}
      {!hasCompletedOnboarding && onboardingStep === 1 ? (
        <OnboardingStep1 />
      ) : (
        <ChatInterface />
      )}
    </div>
  );
}
