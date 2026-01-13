import { createContext, useContext, useState, ReactNode } from "react";

interface AiChatContextType {
  isAiChatOpen: boolean;
  onboardingStep: number;
  hasCompletedOnboarding: boolean;
  openAiChat: () => void;
  closeAiChat: () => void;
  toggleAiChat: () => void;
  nextOnboardingStep: () => void;
  skipOnboarding: () => void;
}

const AiChatContext = createContext<AiChatContextType | undefined>(undefined);

export function AiChatProvider({ children }: { children: ReactNode }) {
  const [isAiChatOpen, setIsAiChatOpen] = useState(false);
  const [onboardingStep, setOnboardingStep] = useState(1);
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState(false);

  const openAiChat = () => setIsAiChatOpen(true);
  const closeAiChat = () => setIsAiChatOpen(false);
  const toggleAiChat = () => setIsAiChatOpen((prev) => !prev);
  
  const nextOnboardingStep = () => {
    if (onboardingStep >= 4) {
      setHasCompletedOnboarding(true);
    } else {
      setOnboardingStep((prev) => prev + 1);
    }
  };
  
  const skipOnboarding = () => {
    setHasCompletedOnboarding(true);
  };

  return (
    <AiChatContext.Provider value={{ 
      isAiChatOpen, 
      onboardingStep,
      hasCompletedOnboarding,
      openAiChat, 
      closeAiChat, 
      toggleAiChat,
      nextOnboardingStep,
      skipOnboarding
    }}>
      {children}
    </AiChatContext.Provider>
  );
}

export function useAiChat() {
  const context = useContext(AiChatContext);
  if (context === undefined) {
    throw new Error("useAiChat must be used within an AiChatProvider");
  }
  return context;
}
