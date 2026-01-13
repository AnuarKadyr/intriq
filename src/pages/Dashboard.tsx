import { 
  TrendingUp, 
  FileText, 
  Clock,
  ArrowUpRight,
  MoreHorizontal,
  CheckCircle2,
  AlertCircle,
  Users,
  MessageSquare
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AppSidebar } from "@/components/AppSidebar";

const engagementData = {
  name: "Vertex Partners",
  industry: "Technology",
  status: "In Progress",
  progress: 68,
  startDate: "Dec 15, 2025",
  projectLead: "Sarah Chen",
};

const stats = [
  {
    title: "Documents Analyzed",
    value: "247",
    change: "+12 today",
    icon: FileText,
    trend: "up",
  },
  {
    title: "Tasks Completed",
    value: "34/52",
    change: "65% complete",
    icon: CheckCircle2,
    trend: "up",
  },
  {
    title: "Open Issues",
    value: "8",
    change: "3 high priority",
    icon: AlertCircle,
    trend: "neutral",
  },
  {
    title: "Team Members",
    value: "6",
    change: "2 active now",
    icon: Users,
    trend: "neutral",
  },
];

const recentTasks = [
  {
    id: 1,
    title: "Review Q3 Financial Statements",
    status: "completed",
    assignee: "John D.",
    dueDate: "Today",
  },
  {
    id: 2,
    title: "Verify customer contracts",
    status: "in_progress",
    assignee: "Sarah C.",
    dueDate: "Tomorrow",
  },
  {
    id: 3,
    title: "Analyze revenue recognition policies",
    status: "in_progress",
    assignee: "Mike R.",
    dueDate: "Jan 15",
  },
  {
    id: 4,
    title: "Due diligence report draft",
    status: "pending",
    assignee: "Emily W.",
    dueDate: "Jan 18",
  },
];

const recentActivity = [
  {
    id: 1,
    action: "AI completed contract analysis",
    detail: "Found 3 items requiring attention",
    time: "10 min ago",
  },
  {
    id: 2,
    action: "New documents uploaded",
    detail: "15 files added to Data Room",
    time: "1 hour ago",
  },
  {
    id: 3,
    action: "Task completed by Sarah C.",
    detail: "Vendor agreement review",
    time: "2 hours ago",
  },
  {
    id: 4,
    action: "Comment added",
    detail: "Mike R. on Financial Analysis",
    time: "3 hours ago",
  },
];

const Dashboard = () => {
  return (
    <div className="min-h-screen flex w-full bg-gray-50">
      <AppSidebar />
      
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="h-auto border-b border-gray-200 bg-white px-8 py-5 sticky top-0 z-10">
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-3 mb-1">
                <h1 className="text-2xl font-semibold text-gray-900">{engagementData.name}</h1>
                <span className="px-2.5 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary">
                  {engagementData.status}
                </span>
              </div>
              <p className="text-sm text-gray-500">
                {engagementData.industry} • Started {engagementData.startDate} • Lead: {engagementData.projectLead}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" size="sm">
                <MessageSquare className="h-4 w-4 mr-2" />
                Team Chat
              </Button>
              <Button size="sm" className="bg-primary hover:bg-primary/90">
                View Full Report
              </Button>
            </div>
          </div>
          
          {/* Progress Bar */}
          <div className="mt-4">
            <div className="flex items-center justify-between text-sm mb-2">
              <span className="text-gray-600">Overall Progress</span>
              <span className="font-medium text-gray-900">{engagementData.progress}%</span>
            </div>
            <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
              <div 
                className="h-full bg-primary rounded-full transition-all duration-500"
                style={{ width: `${engagementData.progress}%` }}
              />
            </div>
          </div>
        </header>

        {/* Content */}
        <div className="flex-1 p-6 space-y-6 overflow-y-auto">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((stat) => (
              <Card key={stat.title} className="bg-white border-gray-200 hover:shadow-md transition-shadow">
                <CardContent className="p-5">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-sm text-gray-500 mb-1">{stat.title}</p>
                      <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
                      <p className="text-xs text-gray-500 mt-1 flex items-center gap-1">
                        {stat.trend === "up" && <TrendingUp className="h-3 w-3 text-primary" />}
                        {stat.change}
                      </p>
                    </div>
                    <div className="p-2.5 rounded-lg bg-gray-50">
                      <stat.icon className="h-5 w-5 text-gray-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Main Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Tasks */}
            <Card className="lg:col-span-2 bg-white border-gray-200">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-base font-semibold text-gray-900">Active Tasks</CardTitle>
                <Button variant="ghost" size="sm" className="text-primary hover:text-primary/80">
                  View All
                  <ArrowUpRight className="h-4 w-4 ml-1" />
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {recentTasks.map((task) => (
                    <div 
                      key={task.id}
                      className="flex items-center justify-between p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-2 h-2 rounded-full ${
                          task.status === 'completed' ? 'bg-green-500' :
                          task.status === 'in_progress' ? 'bg-primary' : 'bg-gray-300'
                        }`} />
                        <div>
                          <p className={`text-sm font-medium ${
                            task.status === 'completed' ? 'text-gray-400 line-through' : 'text-gray-900'
                          }`}>
                            {task.title}
                          </p>
                          <p className="text-xs text-gray-500">{task.assignee}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-xs text-gray-500">{task.dueDate}</span>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card className="bg-white border-gray-200">
              <CardHeader className="pb-2">
                <CardTitle className="text-base font-semibold text-gray-900">Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivity.map((activity) => (
                    <div key={activity.id} className="flex gap-3">
                      <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                      <div>
                        <p className="text-sm text-gray-900">{activity.action}</p>
                        <p className="text-xs text-gray-500">{activity.detail}</p>
                        <p className="text-xs text-gray-400 mt-0.5">{activity.time}</p>
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
  );
};

export default Dashboard;
