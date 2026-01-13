import { useState } from "react";
import { 
  Plus,
  ChevronDown,
  ChevronRight,
  Clock,
  Building2,
  MoreVertical,
  LogOut,
  Settings
} from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import logoTiffany from "@/assets/logo-tiffany.svg";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  useSidebar,
} from "@/components/ui/sidebar";

// Mock data for engagements
const engagements = [
  { id: 1, name: "JPMorgan", url: "/dashboard/engagement/1" },
  { id: 2, name: "Greenwoods LLP", url: "/dashboard/engagement/2" },
  { id: 3, name: "Aurora LLC", url: "/dashboard/engagement/3" },
  { id: 4, name: "Michael & Brothers", url: "/dashboard/engagement/4" },
];

// Mock data for company research
const companyResearch = [
  { id: 1, name: "Tech Corp Analysis", url: "/dashboard/research/1" },
  { id: 2, name: "Market Leaders 2024", url: "/dashboard/research/2" },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const location = useLocation();
  const navigate = useNavigate();
  const currentPath = location.pathname;

  const [engagementsOpen, setEngagementsOpen] = useState(true);
  const [researchOpen, setResearchOpen] = useState(false);
  const [activeEngagement, setActiveEngagement] = useState(2); // Mock active state

  return (
    <Sidebar collapsible="icon" className="border-r border-border/40 bg-white">
      {/* Header with Logo */}
      <div className="px-6 py-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
            <img 
              src={logoTiffany} 
              alt="Intriq AI" 
              className="h-7 w-7 brightness-0 invert"
            />
          </div>
          {!collapsed && (
            <span className="font-bold text-xl text-foreground tracking-tight">Intriq AI</span>
          )}
        </div>
        {!collapsed && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground">
                <MoreVertical className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-white">
              <DropdownMenuItem>
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </DropdownMenuItem>
              <DropdownMenuItem className="text-destructive">
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>

      {/* New Engagement Button */}
      {!collapsed && (
        <div className="px-5 pb-6">
          <Button 
            onClick={() => navigate("/onboarding")}
            className="w-full h-12 bg-primary hover:bg-primary/90 text-primary-foreground text-base font-medium rounded-xl shadow-sm"
          >
            <Plus className="h-5 w-5 mr-2" strokeWidth={2.5} />
            Start New Engagement
          </Button>
        </div>
      )}

      {collapsed && (
        <div className="px-3 pb-4 flex justify-center">
          <Button 
            onClick={() => navigate("/onboarding")}
            size="icon"
            className="h-10 w-10 bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl shadow-sm"
          >
            <Plus className="h-5 w-5" strokeWidth={2.5} />
          </Button>
        </div>
      )}

      {/* Separator */}
      <div className="px-5 pb-4">
        <div className="border-t border-border/60" />
      </div>

      <SidebarContent className="px-3">
        {/* Engagements Section */}
        <Collapsible open={engagementsOpen} onOpenChange={setEngagementsOpen}>
          <CollapsibleTrigger className="flex items-center justify-between w-full px-3 py-3 rounded-xl hover:bg-muted/40 transition-colors">
            <div className="flex items-center gap-3">
              <Clock className="h-5 w-5 text-muted-foreground" />
              {!collapsed && (
                <span className="font-semibold text-base text-foreground">Engagements</span>
              )}
            </div>
            {!collapsed && (
              <ChevronDown className={`h-5 w-5 text-muted-foreground transition-transform duration-200 ${engagementsOpen ? '' : '-rotate-90'}`} />
            )}
          </CollapsibleTrigger>
          
          {!collapsed && (
            <CollapsibleContent className="mt-1 space-y-1">
              {engagements.map((engagement) => (
                <button
                  key={engagement.id}
                  onClick={() => setActiveEngagement(engagement.id)}
                  className={`
                    w-full text-left px-4 py-3 ml-6 mr-2 rounded-xl text-sm transition-all duration-150
                    ${activeEngagement === engagement.id
                      ? 'bg-muted/80 font-medium text-foreground shadow-sm' 
                      : 'text-muted-foreground hover:bg-muted/40 hover:text-foreground'
                    }
                  `}
                >
                  {engagement.name}
                </button>
              ))}
            </CollapsibleContent>
          )}
        </Collapsible>

        {/* Company Research Section */}
        <Collapsible open={researchOpen} onOpenChange={setResearchOpen} className="mt-2">
          <CollapsibleTrigger className="flex items-center justify-between w-full px-3 py-3 rounded-xl hover:bg-muted/40 transition-colors">
            <div className="flex items-center gap-3">
              <Building2 className="h-5 w-5 text-muted-foreground" />
              {!collapsed && (
                <span className="font-semibold text-base text-foreground">Company Research</span>
              )}
            </div>
            {!collapsed && (
              <ChevronDown className={`h-5 w-5 text-muted-foreground transition-transform duration-200 ${researchOpen ? '' : '-rotate-90'}`} />
            )}
          </CollapsibleTrigger>
          
          {!collapsed && (
            <CollapsibleContent className="mt-1 space-y-1">
              {companyResearch.map((research) => (
                <button
                  key={research.id}
                  className="w-full text-left px-4 py-3 ml-6 mr-2 rounded-xl text-sm text-muted-foreground hover:bg-muted/40 hover:text-foreground transition-all duration-150"
                >
                  {research.name}
                </button>
              ))}
            </CollapsibleContent>
          )}
        </Collapsible>
      </SidebarContent>

      {/* User Profile Footer */}
      <SidebarFooter className="p-5 border-t border-border/40 mt-auto">
        {!collapsed ? (
          <div className="flex items-center gap-3 p-3 rounded-xl hover:bg-muted/40 transition-colors cursor-pointer">
            <div className="w-11 h-11 rounded-full bg-gradient-to-br from-amber-200 to-orange-300 flex items-center justify-center flex-shrink-0 overflow-hidden">
              <span className="text-orange-700 font-semibold text-sm">MG</span>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-sm text-foreground">Mia Gasker</span>
                <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                  <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
              <span className="text-xs text-muted-foreground block mt-0.5">mia@intriq.ai</span>
            </div>
            <ChevronRight className="h-5 w-5 text-muted-foreground flex-shrink-0" />
          </div>
        ) : (
          <div className="flex justify-center">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-200 to-orange-300 flex items-center justify-center cursor-pointer">
              <span className="text-orange-700 font-semibold text-xs">MG</span>
            </div>
          </div>
        )}
      </SidebarFooter>
    </Sidebar>
  );
}
