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
import { NavLink } from "@/components/NavLink";
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

  const isActive = (path: string) => currentPath === path;

  return (
    <Sidebar collapsible="icon" className="border-r border-border bg-card">
      {/* Header with Logo */}
      <div className="p-5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img 
            src={logoTiffany} 
            alt="Intriq AI" 
            className="h-10 w-10"
          />
          {!collapsed && (
            <span className="font-semibold text-lg text-foreground">Intriq AI</span>
          )}
        </div>
        {!collapsed && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
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
        <div className="px-4 pb-4">
          <Button 
            onClick={() => navigate("/onboarding")}
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground shadow-md shadow-primary/20"
          >
            <Plus className="h-4 w-4 mr-2" />
            Start New Engagement
          </Button>
        </div>
      )}

      {collapsed && (
        <div className="px-2 pb-4 flex justify-center">
          <Button 
            onClick={() => navigate("/onboarding")}
            size="icon"
            className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-md shadow-primary/20"
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      )}

      <div className="px-4">
        <div className="border-t border-border" />
      </div>

      <SidebarContent className="px-2 py-4">
        {/* Engagements Section */}
        <Collapsible open={engagementsOpen} onOpenChange={setEngagementsOpen}>
          <CollapsibleTrigger className="flex items-center justify-between w-full px-3 py-2.5 rounded-lg hover:bg-muted/50 transition-colors group">
            <div className="flex items-center gap-3">
              <Clock className="h-5 w-5 text-muted-foreground" />
              {!collapsed && (
                <span className="font-medium text-foreground">Engagements</span>
              )}
            </div>
            {!collapsed && (
              <ChevronDown className={`h-4 w-4 text-muted-foreground transition-transform duration-200 ${engagementsOpen ? '' : '-rotate-90'}`} />
            )}
          </CollapsibleTrigger>
          
          {!collapsed && (
            <CollapsibleContent className="mt-1 ml-4 space-y-0.5">
              {engagements.map((engagement) => (
                <NavLink
                  key={engagement.id}
                  to={engagement.url}
                  className={`
                    block px-4 py-2.5 rounded-lg text-sm transition-colors
                    ${isActive(engagement.url) 
                      ? 'bg-muted font-medium text-foreground' 
                      : 'text-muted-foreground hover:bg-muted/50 hover:text-foreground'
                    }
                  `}
                >
                  {engagement.name}
                </NavLink>
              ))}
            </CollapsibleContent>
          )}
        </Collapsible>

        {/* Company Research Section */}
        <Collapsible open={researchOpen} onOpenChange={setResearchOpen}>
          <CollapsibleTrigger className="flex items-center justify-between w-full px-3 py-2.5 rounded-lg hover:bg-muted/50 transition-colors group mt-1">
            <div className="flex items-center gap-3">
              <Building2 className="h-5 w-5 text-muted-foreground" />
              {!collapsed && (
                <span className="font-medium text-foreground">Company Research</span>
              )}
            </div>
            {!collapsed && (
              <ChevronDown className={`h-4 w-4 text-muted-foreground transition-transform duration-200 ${researchOpen ? '' : '-rotate-90'}`} />
            )}
          </CollapsibleTrigger>
          
          {!collapsed && (
            <CollapsibleContent className="mt-1 ml-4 space-y-0.5">
              {companyResearch.map((research) => (
                <NavLink
                  key={research.id}
                  to={research.url}
                  className={`
                    block px-4 py-2.5 rounded-lg text-sm transition-colors
                    ${isActive(research.url) 
                      ? 'bg-muted font-medium text-foreground' 
                      : 'text-muted-foreground hover:bg-muted/50 hover:text-foreground'
                    }
                  `}
                >
                  {research.name}
                </NavLink>
              ))}
            </CollapsibleContent>
          )}
        </Collapsible>
      </SidebarContent>

      {/* User Profile Footer */}
      <SidebarFooter className="p-4 border-t border-border mt-auto">
        {!collapsed ? (
          <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/20 to-primary/40 flex items-center justify-center text-primary font-medium">
              MG
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="font-medium text-sm text-foreground truncate">Mia Gasker</span>
                <div className="w-4 h-4 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                  <svg className="w-2.5 h-2.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
              <span className="text-xs text-muted-foreground truncate block">mia@intriq.ai</span>
            </div>
            <ChevronRight className="h-4 w-4 text-muted-foreground flex-shrink-0" />
          </div>
        ) : (
          <div className="flex justify-center">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/20 to-primary/40 flex items-center justify-center text-primary font-medium cursor-pointer">
              MG
            </div>
          </div>
        )}
      </SidebarFooter>
    </Sidebar>
  );
}
