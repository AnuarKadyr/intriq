import { 
  TrendingUp, 
  FolderKanban, 
  Bot, 
  FileText, 
  Clock,
  ArrowUpRight,
  MoreHorizontal
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";

const stats = [
  {
    title: "Active Engagements",
    value: "12",
    change: "+2 this month",
    icon: FolderKanban,
    trend: "up",
  },
  {
    title: "AI Agents Running",
    value: "8",
    change: "3 tasks in progress",
    icon: Bot,
    trend: "neutral",
  },
  {
    title: "Documents Processed",
    value: "1,247",
    change: "+156 this week",
    icon: FileText,
    trend: "up",
  },
  {
    title: "Avg. Processing Time",
    value: "2.4h",
    change: "-18% faster",
    icon: Clock,
    trend: "up",
  },
];

const recentEngagements = [
  {
    id: 1,
    name: "Project Alpha Acquisition",
    industry: "Technology",
    status: "In Progress",
    progress: 65,
    lastActivity: "2 hours ago",
  },
  {
    id: 2,
    name: "Beta Corp Due Diligence",
    industry: "Healthcare",
    status: "In Progress",
    progress: 42,
    lastActivity: "5 hours ago",
  },
  {
    id: 3,
    name: "Gamma Holdings Review",
    industry: "Financial Services",
    status: "Pending Review",
    progress: 89,
    lastActivity: "1 day ago",
  },
  {
    id: 4,
    name: "Delta Industries Analysis",
    industry: "Manufacturing",
    status: "In Progress",
    progress: 23,
    lastActivity: "3 days ago",
  },
];

const recentActivity = [
  {
    id: 1,
    action: "AI Agent completed financial analysis",
    engagement: "Project Alpha",
    time: "15 min ago",
  },
  {
    id: 2,
    action: "New documents uploaded",
    engagement: "Beta Corp",
    time: "1 hour ago",
  },
  {
    id: 3,
    action: "Risk assessment flagged for review",
    engagement: "Gamma Holdings",
    time: "2 hours ago",
  },
  {
    id: 4,
    action: "Compliance check passed",
    engagement: "Project Alpha",
    time: "4 hours ago",
  },
];

const Dashboard = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <AppSidebar />
        
        <main className="flex-1 flex flex-col">
          {/* Header */}
          <header className="h-16 border-b border-border bg-card/50 backdrop-blur-sm flex items-center px-6 sticky top-0 z-10">
            <div className="flex items-center gap-4">
              <SidebarTrigger />
              <div>
                <h1 className="text-xl font-semibold text-foreground">Dashboard</h1>
                <p className="text-sm text-muted-foreground">Welcome back! Here's an overview of your engagements.</p>
              </div>
            </div>
          </header>

          {/* Content */}
          <div className="flex-1 p-6 space-y-6">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {stats.map((stat) => (
                <Card key={stat.title} className="bg-card border-border/50 hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">{stat.title}</p>
                        <p className="text-3xl font-semibold text-foreground">{stat.value}</p>
                        <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                          {stat.trend === "up" && <TrendingUp className="h-3 w-3 text-primary" />}
                          {stat.change}
                        </p>
                      </div>
                      <div className="p-3 rounded-xl bg-primary/10">
                        <stat.icon className="h-5 w-5 text-primary" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Main Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Recent Engagements */}
              <Card className="lg:col-span-2 bg-card border-border/50">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-lg font-medium">Recent Engagements</CardTitle>
                  <Button variant="ghost" size="sm" className="text-primary hover:text-primary/80">
                    View All
                    <ArrowUpRight className="h-4 w-4 ml-1" />
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentEngagements.map((engagement) => (
                      <div 
                        key={engagement.id}
                        className="flex items-center justify-between p-4 rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors cursor-pointer"
                      >
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="font-medium text-foreground">{engagement.name}</h3>
                            <span className={`text-xs px-2 py-1 rounded-full ${
                              engagement.status === "In Progress" 
                                ? "bg-primary/10 text-primary" 
                                : "bg-yellow-500/10 text-yellow-600"
                            }`}>
                              {engagement.status}
                            </span>
                          </div>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <span>{engagement.industry}</span>
                            <span>•</span>
                            <span>{engagement.lastActivity}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="text-right">
                            <p className="text-sm font-medium text-foreground">{engagement.progress}%</p>
                            <div className="w-24 h-2 bg-muted rounded-full mt-1">
                              <div 
                                className="h-full bg-primary rounded-full transition-all"
                                style={{ width: `${engagement.progress}%` }}
                              />
                            </div>
                          </div>
                          <Button variant="ghost" size="icon" className="text-muted-foreground">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Recent Activity */}
              <Card className="bg-card border-border/50">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg font-medium">Recent Activity</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentActivity.map((activity) => (
                      <div key={activity.id} className="flex gap-3">
                        <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                        <div>
                          <p className="text-sm text-foreground">{activity.action}</p>
                          <p className="text-xs text-muted-foreground mt-0.5">
                            {activity.engagement} • {activity.time}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Dashboard;
