import { ReactNode, useState, useEffect } from "react";
import { AppSidebar } from "@/components/AppSidebar";
import { AgentQuickBar } from "@/components/AgentQuickBar";
import { AgentSpotlightTour } from "@/components/AgentSpotlightTour";
import { AiChatInput } from "@/components/AiChatInput";
import { AiChatPanel } from "@/components/AiChatPanel";

interface MainLayoutProps {
  children: ReactNode;
  showTour?: boolean;
  onTourComplete?: () => void;
}

export function MainLayout({ children, showTour = false, onTourComplete }: MainLayoutProps) {
  const [buttonPositions, setButtonPositions] = useState<{ left: number; width: number }[]>([]);

  return (
    <div className="h-screen overflow-hidden flex w-full bg-gray-50">
      {showTour && onTourComplete && (
        <AgentSpotlightTour onComplete={onTourComplete} buttonPositions={buttonPositions} />
      )}
      <AppSidebar />
      
      <main className="flex-1 flex flex-col overflow-hidden min-h-0 ml-[252px]">
        {/* Agent Quick Bar - Always visible */}
        <AgentQuickBar onButtonPositionsChange={setButtonPositions} />
        
        {/* Page Content */}
        <div className="flex-1 pt-[52px] overflow-hidden min-h-0">
          {children}
        </div>
      </main>

      {/* AI Chat - Always available across all pages */}
      <AiChatInput />
      <AiChatPanel />
    </div>
  );
}
