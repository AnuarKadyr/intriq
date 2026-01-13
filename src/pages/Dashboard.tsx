import { 
  TrendingUp,
  TrendingDown,
  DollarSign,
  BarChart3,
  PieChart as PieChartIcon,
  AlertTriangle,
  CheckCircle2,
  Clock,
  Building2,
  Users,
  FileText,
  ArrowUpRight,
  Download
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AppSidebar } from "@/components/AppSidebar";
import { AiChatInput } from "@/components/AiChatInput";
import { AiChatPanel } from "@/components/AiChatPanel";
import { useAiChat } from "@/contexts/AiChatContext";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from "recharts";

// Company Data
const companyData = {
  name: "Vertex Partners",
  industry: "B2B Industrial Components",
  description: "Vertex Partners is a B2B industrial components manufacturer serving automotive and aerospace sectors. The company generates $28M in annual revenue through long-term supply contracts with 15 OEM customers, operating two manufacturing facilities in the Midwest. Revenue is driven by unit volume (70%) and contractual price escalators (30%), with 62% concentration in top 3 customers.",
};

// KPI Data
const kpiData = [
  {
    title: "YTD Revenue",
    value: "$28.4M",
    change: "+3.2%",
    trend: "up",
    insight: "Slowing growth trajectory",
    icon: DollarSign,
  },
  {
    title: "YTD EBITDA",
    value: "$4.3M",
    change: "-8.5%",
    trend: "down",
    insight: "Margin compression",
    icon: BarChart3,
  },
  {
    title: "LTM Revenue Growth",
    value: "3.1%",
    change: "-8.9pp",
    trend: "down",
    insight: "Significant deceleration",
    icon: TrendingDown,
  },
  {
    title: "EBITDA Margin",
    value: "15.0%",
    change: "-350bps",
    trend: "down",
    insight: "Cost inflation pressure",
    icon: PieChartIcon,
  },
  {
    title: "Cash Conversion",
    value: "$28.4M",
    change: "-12pp",
    trend: "down",
    insight: "Working capital buildup",
    icon: TrendingUp,
  },
];

// Revenue Trend Data (Monthly)
const revenueData = [
  { month: "Jan", revenue: 2.1, ebitda: 0.32 },
  { month: "Feb", revenue: 2.3, ebitda: 0.35 },
  { month: "Mar", revenue: 2.4, ebitda: 0.38 },
  { month: "Apr", revenue: 2.2, ebitda: 0.33 },
  { month: "May", revenue: 2.5, ebitda: 0.40 },
  { month: "Jun", revenue: 2.6, ebitda: 0.42 },
  { month: "Jul", revenue: 2.4, ebitda: 0.36 },
  { month: "Aug", revenue: 2.3, ebitda: 0.34 },
  { month: "Sep", revenue: 2.5, ebitda: 0.38 },
  { month: "Oct", revenue: 2.4, ebitda: 0.35 },
  { month: "Nov", revenue: 2.3, ebitda: 0.32 },
  { month: "Dec", revenue: 2.4, ebitda: 0.35 },
];

// Quarterly EBITDA Data
const quarterlyData = [
  { quarter: "Q1 2024", ebitda: 1.05, margin: 16.2 },
  { quarter: "Q2 2024", ebitda: 1.15, margin: 15.8 },
  { quarter: "Q3 2024", ebitda: 1.08, margin: 15.1 },
  { quarter: "Q4 2024", ebitda: 1.02, margin: 14.2 },
];

// Customer Concentration Data
const customerData = [
  { name: "Top Customer", value: 32, color: "#05D3D3" },
  { name: "2nd Customer", value: 18, color: "#06B6B6" },
  { name: "3rd Customer", value: 12, color: "#089999" },
  { name: "Others (12)", value: 38, color: "#E5E7EB" },
];

// Key Findings/Risks
const keyFindings = [
  {
    id: 1,
    category: "Revenue Risk",
    finding: "High customer concentration with 62% revenue from top 3 customers",
    severity: "high",
    impact: "Material",
  },
  {
    id: 2,
    category: "Margin Pressure",
    finding: "EBITDA margin declined 350bps YoY due to raw material cost inflation",
    severity: "high",
    impact: "Material",
  },
  {
    id: 3,
    category: "Working Capital",
    finding: "Cash conversion cycle extended by 12 days vs prior year",
    severity: "medium",
    impact: "Moderate",
  },
  {
    id: 4,
    category: "Contract Terms",
    finding: "Price escalation clauses lag actual cost increases by 6-9 months",
    severity: "medium",
    impact: "Moderate",
  },
  {
    id: 5,
    category: "Operations",
    finding: "Capacity utilization at 78% with room for efficiency gains",
    severity: "low",
    impact: "Opportunity",
  },
];

// Activity Timeline
const activityData = [
  { id: 1, action: "Financial model updated", detail: "Q4 actuals incorporated", time: "2 hours ago", icon: FileText, color: "bg-primary" },
  { id: 2, action: "Risk assessment completed", detail: "3 high-priority items flagged", time: "5 hours ago", icon: AlertTriangle, color: "bg-amber-500" },
  { id: 3, action: "Customer analysis done", detail: "Top 15 customers reviewed", time: "1 day ago", icon: Users, color: "bg-blue-500" },
  { id: 4, action: "Site visit scheduled", detail: "Midwest facility tour", time: "2 days ago", icon: Building2, color: "bg-purple-500" },
];

// Mini Stats
const miniStats = [
  { label: "Customers", value: "15", color: "bg-primary" },
  { label: "Contracts", value: "23", color: "bg-blue-500" },
  { label: "Facilities", value: "2", color: "bg-purple-500" },
  { label: "Employees", value: "180", color: "bg-amber-500" },
];

const Dashboard = () => {
  const { isAiChatOpen } = useAiChat();
  
  return (
    <div className="min-h-screen flex w-full bg-gray-50">
      <AppSidebar />
      
      <main className={`flex-1 flex flex-col overflow-hidden ml-72 transition-all duration-300 ${isAiChatOpen ? 'mr-[380px]' : ''}`}>
        <header className={`border-b border-gray-200 bg-white px-8 py-6 fixed top-0 left-72 z-10 transition-all duration-300 ${isAiChatOpen ? 'right-[380px]' : 'right-0'}`}>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{companyData.name}</h1>
              <p className="text-sm text-gray-500 mt-1">{companyData.industry} • Due Diligence Report</p>
            </div>
            <div className="flex items-center gap-3">
              <Button 
                variant="outline" 
                className="text-gray-600 border-gray-200 hover:bg-gray-50"
              >
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            </div>
          </div>
        </header>

        {/* Content */}
        <div className="flex-1 p-8 space-y-6 overflow-y-auto mt-[88px]">
          
          {/* KPI Cards Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {kpiData.map((kpi) => (
              <Card key={kpi.title} className="bg-white border-0 shadow-sm hover:shadow-md transition-all duration-200">
                <CardContent className="p-5">
                  <div className="flex items-start justify-between mb-3">
                    <p className="text-sm text-gray-500">{kpi.title}</p>
                    <div className={`p-2 rounded-xl ${kpi.trend === 'up' ? 'bg-emerald-50' : 'bg-rose-50'}`}>
                      <kpi.icon className={`h-4 w-4 ${kpi.trend === 'up' ? 'text-emerald-600' : 'text-rose-600'}`} />
                    </div>
                  </div>
                  <p className="text-2xl font-bold text-gray-900 mb-2">{kpi.value}</p>
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${
                      kpi.trend === 'up' 
                        ? 'bg-emerald-100 text-emerald-700' 
                        : 'bg-rose-100 text-rose-700'
                    }`}>
                      {kpi.change}
                    </span>
                  </div>
                  <p className="text-xs text-gray-400 mt-2">{kpi.insight}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Executive Summary */}
          <Card className="bg-white border-0 shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg font-semibold text-gray-900">Executive Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 leading-relaxed">{companyData.description}</p>
              <div className="flex items-center gap-6 mt-5 pt-5 border-t border-gray-100">
                {miniStats.map((stat) => (
                  <div key={stat.label} className="flex items-center gap-3">
                    <div className={`w-1 h-8 rounded-full ${stat.color}`} />
                    <div>
                      <p className="text-xs text-gray-500">{stat.label}</p>
                      <p className="text-lg font-semibold text-gray-900">{stat.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Charts Row */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Revenue Trend - Area Chart */}
            <Card className="lg:col-span-2 bg-white border-0 shadow-sm">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-lg font-semibold text-gray-900">Revenue Trend</CardTitle>
                    <p className="text-sm text-gray-500 mt-1">Monthly revenue in millions</p>
                  </div>
                  <span className="text-sm text-primary font-medium">+3.2% YTD</span>
                </div>
              </CardHeader>
              <CardContent>
                <div className="h-72">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={revenueData}>
                      <defs>
                        <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#05D3D3" stopOpacity={0.3} />
                          <stop offset="100%" stopColor="#05D3D3" stopOpacity={0.05} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" vertical={false} />
                      <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#9CA3AF', fontSize: 12 }} />
                      <YAxis axisLine={false} tickLine={false} tick={{ fill: '#9CA3AF', fontSize: 12 }} tickFormatter={(v) => `$${v}M`} />
                      <Tooltip 
                        contentStyle={{ backgroundColor: 'white', border: 'none', borderRadius: '12px', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}
                        formatter={(value: number) => [`$${value}M`, 'Revenue']}
                      />
                      <Area 
                        type="monotone" 
                        dataKey="revenue" 
                        stroke="#05D3D3" 
                        strokeWidth={3}
                        fill="url(#revenueGradient)" 
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Customer Concentration - Pie Chart */}
            <Card className="bg-white border-0 shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-semibold text-gray-900">Customer Concentration</CardTitle>
                <p className="text-sm text-gray-500">Revenue by customer</p>
              </CardHeader>
              <CardContent>
                <div className="h-56">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={customerData}
                        cx="50%"
                        cy="50%"
                        innerRadius={50}
                        outerRadius={80}
                        paddingAngle={3}
                        dataKey="value"
                      >
                        {customerData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip 
                        contentStyle={{ backgroundColor: 'white', border: 'none', borderRadius: '12px', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}
                        formatter={(value: number) => [`${value}%`, 'Share']}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="space-y-2 mt-2">
                  {customerData.map((item) => (
                    <div key={item.name} className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                        <span className="text-gray-600">{item.name}</span>
                      </div>
                      <span className="font-medium text-gray-900">{item.value}%</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* EBITDA Chart + Findings Row */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Quarterly EBITDA - Bar Chart */}
            <Card className="bg-white border-0 shadow-sm">
              <CardHeader className="pb-2">
                <div>
                  <CardTitle className="text-lg font-semibold text-gray-900">Quarterly EBITDA</CardTitle>
                  <p className="text-sm text-gray-500">In millions with margin %</p>
                </div>
              </CardHeader>
              <CardContent>
                <div className="h-56">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={quarterlyData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" vertical={false} />
                      <XAxis dataKey="quarter" axisLine={false} tickLine={false} tick={{ fill: '#9CA3AF', fontSize: 11 }} />
                      <YAxis axisLine={false} tickLine={false} tick={{ fill: '#9CA3AF', fontSize: 12 }} tickFormatter={(v) => `$${v}M`} />
                      <Tooltip 
                        contentStyle={{ backgroundColor: 'white', border: 'none', borderRadius: '12px', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}
                        formatter={(value: number, name: string) => [name === 'ebitda' ? `$${value}M` : `${value}%`, name === 'ebitda' ? 'EBITDA' : 'Margin']}
                      />
                      <Bar dataKey="ebitda" fill="#05D3D3" radius={[8, 8, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
                  <span className="text-sm text-gray-500">Margin Trend</span>
                  <span className="text-sm font-medium text-rose-600">-200bps YoY</span>
                </div>
              </CardContent>
            </Card>

            {/* Key Findings Table */}
            <Card className="lg:col-span-2 bg-white border-0 shadow-sm">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-lg font-semibold text-gray-900">Key Findings</CardTitle>
                    <p className="text-sm text-gray-500">Risk assessment summary</p>
                  </div>
                  <span className="flex items-center gap-1.5 text-sm text-amber-600 font-medium">
                    <AlertTriangle className="h-4 w-4" />
                    2 High Priority
                  </span>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {keyFindings.map((finding) => (
                    <div 
                      key={finding.id}
                      className="flex items-start gap-4 p-3 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors"
                    >
                      <div className={`w-1.5 h-12 rounded-full flex-shrink-0 ${
                        finding.severity === 'high' ? 'bg-rose-500' :
                        finding.severity === 'medium' ? 'bg-amber-500' : 'bg-emerald-500'
                      }`} />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">{finding.category}</span>
                          <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${
                            finding.severity === 'high' ? 'bg-rose-100 text-rose-700' :
                            finding.severity === 'medium' ? 'bg-amber-100 text-amber-700' : 'bg-emerald-100 text-emerald-700'
                          }`}>
                            {finding.impact}
                          </span>
                        </div>
                        <p className="text-sm text-gray-700">{finding.finding}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Activity Timeline */}
          <Card className="bg-white border-0 shadow-sm">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg font-semibold text-gray-900">Recent Activity</CardTitle>
                <button className="text-sm text-primary font-medium flex items-center gap-1 hover:underline">
                  View All <ArrowUpRight className="h-4 w-4" />
                </button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex gap-8">
                {activityData.map((activity, index) => (
                  <div key={activity.id} className="flex items-start gap-3 flex-1">
                    <div className={`p-2 rounded-lg ${activity.color}`}>
                      <activity.icon className="h-4 w-4 text-white" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                      <p className="text-xs text-gray-500">{activity.detail}</p>
                      <p className="text-xs text-gray-400 mt-1">{activity.time}</p>
                    </div>
                    {index < activityData.length - 1 && (
                      <div className="flex-1 border-t border-dashed border-gray-200 mt-4 ml-4" />
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

        </div>
        <AiChatInput />
      </main>
      
      {/* AI Chat Panel - Fixed on the right side */}
      <div className="fixed top-0 right-0 h-full z-20">
        <AiChatPanel />
      </div>
    </div>
  );
};

export default Dashboard;
