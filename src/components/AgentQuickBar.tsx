import { ClipboardList, BarChart2, GitCompare, HelpCircle, Lightbulb, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAiChat } from "@/contexts/AiChatContext";
import { useRef, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";

export const agents = [
  {
    id: "irt",
    name: "Information Request Tracker",
    icon: ClipboardList,
    color: "bg-blue-500",
  },
  {
    id: "data-inventory",
    name: "Data Inventory",
    icon: BarChart2,
    color: "bg-emerald-500",
  },
  {
    id: "data-integrity",
    name: "Data Integrity",
    icon: GitCompare,
    color: "bg-purple-500",
  },
  {
    id: "mgmt-questions",
    name: "Management Questions",
    icon: HelpCircle,
    color: "bg-amber-500",
  },
  {
    id: "insights",
    name: "Insights Engine",
    icon: Lightbulb,
    color: "bg-yellow-500",
  },
  {
    id: "report",
    name: "Report Generator",
    icon: FileText,
    color: "bg-orange-500",
  },
];

interface AgentQuickBarProps {
  onButtonPositionsChange?: (positions: { left: number; width: number }[]) => void;
}

export function AgentQuickBar({ onButtonPositionsChange }: AgentQuickBarProps) {
  const { openAiChat } = useAiChat();
  const navigate = useNavigate();
  const buttonRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const updatePositions = useCallback(() => {
    if (onButtonPositionsChange) {
      const positions = buttonRefs.current.map(btn => {
        if (btn) {
          const rect = btn.getBoundingClientRect();
          return { left: rect.left, width: rect.width };
        }
        return { left: 0, width: 0 };
      });
      onButtonPositionsChange(positions);
    }
  }, [onButtonPositionsChange]);

  useEffect(() => {
    updatePositions();
    window.addEventListener('resize', updatePositions);
    return () => window.removeEventListener('resize', updatePositions);
  }, [updatePositions]);

  const handleAgentClick = (agentId: string) => {
    if (agentId === "irt") {
      navigate("/agent/irt");
    } else if (agentId === "data-inventory") {
      navigate("/agent/data-inventory");
    } else {
      openAiChat();
      console.log(`Starting agent: ${agentId}`);
    }
  };

  return (
    <div className="bg-white border-b border-gray-200 px-8 py-3 fixed top-0 left-72 right-0 z-30">
      <div className="flex items-center gap-4">
        <span className="text-xs font-medium text-gray-500 uppercase tracking-wide whitespace-nowrap flex-shrink-0">Your AI Team</span>
        <div className="w-px h-6 bg-gray-200 flex-shrink-0" />
        <div className="flex items-center gap-3 overflow-x-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent pb-1 -mb-1">
          {agents.map((agent, index) => {
            const IconComponent = agent.icon;
            return (
              <Button
                key={agent.id}
                ref={el => buttonRefs.current[index] = el}
                variant="outline"
                size="sm"
                onClick={() => handleAgentClick(agent.id)}
                className="bg-gray-50 border-gray-200 hover:bg-gray-100 transition-all duration-200 gap-2 flex-shrink-0 whitespace-nowrap"
              >
                <div className={`w-5 h-5 ${agent.color} rounded flex items-center justify-center`}>
                  <IconComponent className="h-3 w-3 text-white" />
                </div>
                {agent.name}
              </Button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
