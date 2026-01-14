import { useState } from "react";
import { 
  Plus,
  ChevronDown,
  FolderKanban,
  Building2,
  ChevronRight
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import logoTiffany from "@/assets/logo-tiffany.svg";

// Mock data for engagements
const engagements = [
  { id: 1, name: "Nextera Holdings" },
  { id: 2, name: "Vertex Partners" },
  { id: 3, name: "Pinnacle Group" },
  { id: 4, name: "Atlas Industries" },
];

// Mock data for company research
const companyResearch = [
  { id: 1, name: "Orion Systems" },
  { id: 2, name: "Meridian Corp" },
];

export function AppSidebar() {
  const navigate = useNavigate();
  const [engagementsOpen, setEngagementsOpen] = useState(true);
  const [researchOpen, setResearchOpen] = useState(false);
  const [activeItem, setActiveItem] = useState<{ type: string; id: number } | null>({ type: 'engagement', id: 2 });

  return (
    <aside className="w-[252px] h-screen bg-white border-r border-gray-100 flex flex-col fixed left-0 top-0 z-20">
      {/* Header */}
      <div className="p-6 flex items-center">
        <img 
          src={logoTiffany} 
          alt="Intriq AI" 
          className="h-7 cursor-pointer hover:opacity-80 transition-opacity"
          onClick={() => navigate("/dashboard")}
        />
      </div>

      {/* New Engagement Button */}
      <div className="px-4 pb-6">
        <Button 
          onClick={() => navigate("/onboarding")}
          className="w-full h-11 bg-primary hover:bg-primary/90 text-white font-medium rounded-lg"
        >
          <Plus className="h-4 w-4 mr-2" />
          New Engagement
        </Button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 space-y-1 overflow-y-auto">
        {/* Engagements */}
        <Collapsible open={engagementsOpen} onOpenChange={setEngagementsOpen}>
          <CollapsibleTrigger className="flex items-center justify-between w-full px-3 py-2.5 rounded-lg hover:bg-gray-50 transition-colors group">
            <div className="flex items-center gap-3">
              <FolderKanban className="h-5 w-5 text-gray-500" />
              <span className="font-medium text-gray-700">Engagements</span>
            </div>
            <ChevronDown 
              className={`h-4 w-4 text-gray-400 transition-transform duration-200 ${
                engagementsOpen ? 'rotate-0' : '-rotate-90'
              }`} 
            />
          </CollapsibleTrigger>
          
          <CollapsibleContent className="mt-1 ml-5 border-l border-gray-100">
            {engagements.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveItem({ type: 'engagement', id: item.id })}
                className={`
                  w-full text-left px-4 py-2 text-sm transition-colors
                  ${activeItem?.type === 'engagement' && activeItem?.id === item.id
                    ? 'text-primary font-medium bg-primary/5 border-l-2 border-primary -ml-[1px]' 
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }
                `}
              >
                {item.name}
              </button>
            ))}
          </CollapsibleContent>
        </Collapsible>

        {/* Company Research */}
        <Collapsible open={researchOpen} onOpenChange={setResearchOpen}>
          <CollapsibleTrigger className="flex items-center justify-between w-full px-3 py-2.5 rounded-lg hover:bg-gray-50 transition-colors group">
            <div className="flex items-center gap-3">
              <Building2 className="h-5 w-5 text-gray-500" />
              <span className="font-medium text-gray-700">Companies</span>
            </div>
            <ChevronDown 
              className={`h-4 w-4 text-gray-400 transition-transform duration-200 ${
                researchOpen ? 'rotate-0' : '-rotate-90'
              }`} 
            />
          </CollapsibleTrigger>
          
          <CollapsibleContent className="mt-1 ml-5 border-l border-gray-100">
            {companyResearch.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveItem({ type: 'research', id: item.id })}
                className={`
                  w-full text-left px-4 py-2 text-sm transition-colors
                  ${activeItem?.type === 'research' && activeItem?.id === item.id
                    ? 'text-primary font-medium bg-primary/5 border-l-2 border-primary -ml-[1px]' 
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }
                `}
              >
                {item.name}
              </button>
            ))}
          </CollapsibleContent>
        </Collapsible>
      </nav>

      {/* User Profile */}
      <div className="p-4 border-t border-gray-100">
        <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary/20 to-primary/40 flex items-center justify-center">
            <span className="text-primary font-medium text-sm">MG</span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 truncate">Mia Gasker</p>
            <p className="text-xs text-gray-500 truncate">mia@intriq.ai</p>
          </div>
          <ChevronRight className="h-4 w-4 text-gray-400" />
        </div>
      </div>
    </aside>
  );
}
