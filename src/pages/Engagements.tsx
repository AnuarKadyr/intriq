import { useNavigate } from "react-router-dom";
import { Plus, Building2, Calendar, Users, TrendingUp, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import logoBlack from "@/assets/logo-black.svg";

interface Engagement {
  id: string;
  name: string;
  industry: string;
  stage: string;
  lastUpdated: string;
  teamSize: number;
  revenue: string;
  status: "active" | "pending" | "completed";
}

const engagements: Engagement[] = [
  {
    id: "vertex-partners",
    name: "Vertex Partners",
    industry: "Industrial Manufacturing",
    stage: "Due Diligence",
    lastUpdated: "2 hours ago",
    teamSize: 4,
    revenue: "$142.5M",
    status: "active",
  },
  {
    id: "aurora-tech",
    name: "Aurora Technologies",
    industry: "Software & SaaS",
    stage: "Initial Review",
    lastUpdated: "1 day ago",
    teamSize: 3,
    revenue: "$89.2M",
    status: "active",
  },
  {
    id: "greenfield-energy",
    name: "Greenfield Energy",
    industry: "Renewable Energy",
    stage: "Completed",
    lastUpdated: "1 week ago",
    teamSize: 5,
    revenue: "$215.8M",
    status: "completed",
  },
  {
    id: "nexus-health",
    name: "Nexus Healthcare",
    industry: "Healthcare Services",
    stage: "Pending Approval",
    lastUpdated: "3 days ago",
    teamSize: 2,
    revenue: "$67.4M",
    status: "pending",
  },
];

const statusColors = {
  active: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20",
  pending: "bg-amber-500/10 text-amber-600 border-amber-500/20",
  completed: "bg-slate-500/10 text-slate-600 border-slate-500/20",
};

const Engagements = () => {
  const navigate = useNavigate();

  const handleEngagementClick = (engagementId: string) => {
    // For now, all engagements go to the same dashboard
    // In a real app, you'd pass the engagement ID
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <img src={logoBlack} alt="Intriq AI" className="h-8" />
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate("/onboarding")}
            className="gap-2"
          >
            <Plus className="w-4 h-4" />
            New Engagement
          </Button>
        </div>
      </header>

      {/* Content */}
      <main className="container mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-foreground mb-2">
            Engagements
          </h1>
          <p className="text-muted-foreground">
            Select an engagement to view detailed insights and analysis
          </p>
        </div>

        {/* Engagement Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {engagements.map((engagement) => (
            <Card
              key={engagement.id}
              className="group cursor-pointer transition-all duration-200 hover:shadow-lg hover:border-primary/30 hover:-translate-y-0.5"
              onClick={() => handleEngagementClick(engagement.id)}
            >
              <CardContent className="p-6">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Building2 className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                        {engagement.name}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {engagement.industry}
                      </p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="opacity-0 group-hover:opacity-100 transition-opacity h-8 w-8"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <MoreHorizontal className="w-4 h-4" />
                  </Button>
                </div>

                {/* Status & Stage */}
                <div className="flex items-center gap-2 mb-4">
                  <Badge
                    variant="outline"
                    className={statusColors[engagement.status]}
                  >
                    {engagement.status.charAt(0).toUpperCase() +
                      engagement.status.slice(1)}
                  </Badge>
                  <span className="text-sm text-muted-foreground">
                    {engagement.stage}
                  </span>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-4 pt-4 border-t border-border">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm font-medium">
                      {engagement.revenue}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">
                      {engagement.teamSize} members
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">
                      {engagement.lastUpdated}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}

          {/* Add New Card */}
          <Card
            className="cursor-pointer border-dashed border-2 hover:border-primary/50 hover:bg-primary/5 transition-all duration-200 flex items-center justify-center min-h-[220px]"
            onClick={() => navigate("/onboarding")}
          >
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center mx-auto mb-3">
                <Plus className="w-6 h-6 text-muted-foreground" />
              </div>
              <p className="text-sm font-medium text-muted-foreground">
                Create New Engagement
              </p>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Engagements;
