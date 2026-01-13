import { Search, FileText, ClipboardList, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAiChat } from "@/contexts/AiChatContext";

const agents = [
  { id: "analysis", label: "Run Analysis", icon: Search },
  { id: "report", label: "Generate Report", icon: FileText },
  { id: "track", label: "Track Request", icon: ClipboardList },
  { id: "forecast", label: "Financial Forecast", icon: TrendingUp },
];

export function AgentQuickBar() {
  const { openAiChat } = useAiChat();

  const handleAgentClick = (agentId: string) => {
    openAiChat();
    // TODO: Auto-start the selected agent in chat
    console.log(`Starting agent: ${agentId}`);
  };

  return (
    <div className="bg-white border-b border-gray-200 px-8 py-3 fixed top-[88px] left-72 right-0 z-10">
      <div className="flex items-center gap-3">
        <span className="text-sm text-gray-500 mr-2">Quick actions:</span>
        {agents.map((agent) => (
          <Button
            key={agent.id}
            variant="outline"
            size="sm"
            onClick={() => handleAgentClick(agent.id)}
            className="bg-gray-50 border-gray-200 hover:bg-primary/5 hover:border-primary/30 hover:text-primary transition-all duration-200"
          >
            <agent.icon className="h-4 w-4 mr-2" />
            {agent.label}
          </Button>
        ))}
      </div>
    </div>
  );
}
