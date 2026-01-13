import { ClipboardList, BarChart2, GitCompare, HelpCircle, Lightbulb, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAiChat } from "@/contexts/AiChatContext";

const agents = [
  {
    id: "irt",
    shortName: "IRT",
    icon: ClipboardList,
    color: "bg-blue-500",
  },
  {
    id: "data-inventory",
    shortName: "Inventory",
    icon: BarChart2,
    color: "bg-emerald-500",
  },
  {
    id: "data-integrity",
    shortName: "Integrity",
    icon: GitCompare,
    color: "bg-purple-500",
  },
  {
    id: "mgmt-questions",
    shortName: "Questions",
    icon: HelpCircle,
    color: "bg-amber-500",
  },
  {
    id: "insights",
    shortName: "Insights",
    icon: Lightbulb,
    color: "bg-yellow-500",
  },
  {
    id: "report",
    shortName: "Reports",
    icon: FileText,
    color: "bg-orange-500",
  },
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
        <span className="text-sm text-gray-500 mr-2">AI Agents:</span>
        {agents.map((agent) => {
          const IconComponent = agent.icon;
          return (
            <Button
              key={agent.id}
              variant="outline"
              size="sm"
              onClick={() => handleAgentClick(agent.id)}
              className="bg-gray-50 border-gray-200 hover:bg-gray-100 transition-all duration-200 gap-2"
            >
              <div className={`w-5 h-5 ${agent.color} rounded flex items-center justify-center`}>
                <IconComponent className="h-3 w-3 text-white" />
              </div>
              {agent.shortName}
            </Button>
          );
        })}
      </div>
    </div>
  );
}
