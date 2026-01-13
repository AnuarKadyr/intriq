import { createContext, useContext, useState, ReactNode } from "react";

interface AiChatContextType {
  isAiChatOpen: boolean;
  openAiChat: () => void;
  closeAiChat: () => void;
  toggleAiChat: () => void;
}

const AiChatContext = createContext<AiChatContextType | undefined>(undefined);

export function AiChatProvider({ children }: { children: ReactNode }) {
  const [isAiChatOpen, setIsAiChatOpen] = useState(false);

  const openAiChat = () => setIsAiChatOpen(true);
  const closeAiChat = () => setIsAiChatOpen(false);
  const toggleAiChat = () => setIsAiChatOpen((prev) => !prev);

  return (
    <AiChatContext.Provider value={{ isAiChatOpen, openAiChat, closeAiChat, toggleAiChat }}>
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
