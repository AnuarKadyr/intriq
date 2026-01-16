import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Plus, 
  Calendar, 
  Users, 
  TrendingUp, 
  MoreHorizontal,
  LayoutGrid,
  List,
  Search,
  Filter,
  ChevronDown,
  ArrowUpDown
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { MainLayout } from "@/components/MainLayout";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuCheckboxItem,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

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
  {
    id: "blue-horizon",
    name: "Blue Horizon Capital",
    industry: "Financial Services",
    stage: "Due Diligence",
    lastUpdated: "5 hours ago",
    teamSize: 6,
    revenue: "$312.0M",
    status: "active",
  },
  {
    id: "meridian-logistics",
    name: "Meridian Logistics",
    industry: "Transportation",
    stage: "Initial Review",
    lastUpdated: "2 days ago",
    teamSize: 3,
    revenue: "$78.9M",
    status: "pending",
  },
];

const statusConfig = {
  active: { 
    bg: "bg-emerald-500/10", 
    text: "text-emerald-600", 
    border: "border-emerald-500/20",
    dot: "bg-emerald-500"
  },
  pending: { 
    bg: "bg-amber-500/10", 
    text: "text-amber-600", 
    border: "border-amber-500/20",
    dot: "bg-amber-500"
  },
  completed: { 
    bg: "bg-slate-500/10", 
    text: "text-slate-600", 
    border: "border-slate-500/20",
    dot: "bg-slate-500"
  },
};

const industries = [
  "All Industries",
  "Industrial Manufacturing",
  "Software & SaaS",
  "Renewable Energy",
  "Healthcare Services",
  "Financial Services",
  "Transportation",
];

const stages = [
  "All Stages",
  "Initial Review",
  "Due Diligence",
  "Pending Approval",
  "Completed",
];

const statuses = ["All Status", "Active", "Pending", "Completed"];

type SortField = "name" | "revenue" | "lastUpdated" | "teamSize";
type SortOrder = "asc" | "desc";

function getInitials(name: string): string {
  return name
    .split(" ")
    .map(word => word[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

function getInitialsBgColor(name: string): string {
  const colors = [
    "from-primary/80 to-primary",
    "from-blue-500/80 to-blue-600",
    "from-purple-500/80 to-purple-600",
    "from-amber-500/80 to-amber-600",
    "from-rose-500/80 to-rose-600",
    "from-emerald-500/80 to-emerald-600",
  ];
  const index = name.charCodeAt(0) % colors.length;
  return colors[index];
}

const Engagements = () => {
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState<"cards" | "list">("cards");
  const [searchQuery, setSearchQuery] = useState("");
  const [filterIndustry, setFilterIndustry] = useState("All Industries");
  const [filterStage, setFilterStage] = useState("All Stages");
  const [filterStatus, setFilterStatus] = useState("All Status");
  const [sortField, setSortField] = useState<SortField>("name");
  const [sortOrder, setSortOrder] = useState<SortOrder>("asc");

  const handleEngagementClick = (engagementId: string) => {
    navigate("/dashboard");
  };

  const filteredAndSortedEngagements = useMemo(() => {
    let result = [...engagements];

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (e) =>
          e.name.toLowerCase().includes(query) ||
          e.industry.toLowerCase().includes(query) ||
          e.stage.toLowerCase().includes(query)
      );
    }

    // Industry filter
    if (filterIndustry !== "All Industries") {
      result = result.filter((e) => e.industry === filterIndustry);
    }

    // Stage filter
    if (filterStage !== "All Stages") {
      result = result.filter((e) => e.stage === filterStage);
    }

    // Status filter
    if (filterStatus !== "All Status") {
      result = result.filter(
        (e) => e.status.toLowerCase() === filterStatus.toLowerCase()
      );
    }

    // Sorting
    result.sort((a, b) => {
      let comparison = 0;
      switch (sortField) {
        case "name":
          comparison = a.name.localeCompare(b.name);
          break;
        case "revenue":
          comparison =
            parseFloat(a.revenue.replace(/[$M,]/g, "")) -
            parseFloat(b.revenue.replace(/[$M,]/g, ""));
          break;
        case "teamSize":
          comparison = a.teamSize - b.teamSize;
          break;
        case "lastUpdated":
          // Simple sort for demo - in real app you'd parse dates
          comparison = a.lastUpdated.localeCompare(b.lastUpdated);
          break;
      }
      return sortOrder === "asc" ? comparison : -comparison;
    });

    return result;
  }, [searchQuery, filterIndustry, filterStage, filterStatus, sortField, sortOrder]);

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  };

  const activeFiltersCount = [
    filterIndustry !== "All Industries",
    filterStage !== "All Stages",
    filterStatus !== "All Status",
  ].filter(Boolean).length;

  return (
    <MainLayout showAgentBar={false}>
      <div className="h-full flex flex-col overflow-hidden">
        {/* Header */}
        <header className="border-b border-gray-200 bg-white px-8 py-6 flex-shrink-0">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Engagements</h1>
              <p className="text-sm text-gray-500 mt-1">
                {filteredAndSortedEngagements.length} engagement{filteredAndSortedEngagements.length !== 1 ? "s" : ""} • Select to view detailed insights
              </p>
            </div>
            <div className="flex items-center gap-3">
              {/* View Toggle */}
              <div className="flex items-center bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setViewMode("cards")}
                  className={`p-2 rounded-md transition-all ${
                    viewMode === "cards"
                      ? "bg-white shadow-sm text-gray-900"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  <LayoutGrid className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-2 rounded-md transition-all ${
                    viewMode === "list"
                      ? "bg-white shadow-sm text-gray-900"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  <List className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Search and Filters */}
          <div className="flex items-center gap-3 mt-5">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search engagements..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 bg-gray-50 border-gray-200 focus:bg-white"
              />
            </div>

            {/* Filter Dropdowns */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="gap-2">
                  <Filter className="h-4 w-4" />
                  Filters
                  {activeFiltersCount > 0 && (
                    <Badge className="ml-1 h-5 w-5 p-0 flex items-center justify-center bg-primary text-white text-xs">
                      {activeFiltersCount}
                    </Badge>
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-56 bg-white">
                <DropdownMenuLabel>Industry</DropdownMenuLabel>
                {industries.map((industry) => (
                  <DropdownMenuCheckboxItem
                    key={industry}
                    checked={filterIndustry === industry}
                    onCheckedChange={() => setFilterIndustry(industry)}
                  >
                    {industry}
                  </DropdownMenuCheckboxItem>
                ))}
                <DropdownMenuSeparator />
                <DropdownMenuLabel>Stage</DropdownMenuLabel>
                {stages.map((stage) => (
                  <DropdownMenuCheckboxItem
                    key={stage}
                    checked={filterStage === stage}
                    onCheckedChange={() => setFilterStage(stage)}
                  >
                    {stage}
                  </DropdownMenuCheckboxItem>
                ))}
                <DropdownMenuSeparator />
                <DropdownMenuLabel>Status</DropdownMenuLabel>
                {statuses.map((status) => (
                  <DropdownMenuCheckboxItem
                    key={status}
                    checked={filterStatus === status}
                    onCheckedChange={() => setFilterStatus(status)}
                  >
                    {status}
                  </DropdownMenuCheckboxItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Sort Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="gap-2">
                  <ArrowUpDown className="h-4 w-4" />
                  Sort
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="bg-white">
                <DropdownMenuItem onClick={() => handleSort("name")}>
                  Name {sortField === "name" && (sortOrder === "asc" ? "↑" : "↓")}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleSort("revenue")}>
                  Revenue {sortField === "revenue" && (sortOrder === "asc" ? "↑" : "↓")}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleSort("teamSize")}>
                  Team Size {sortField === "teamSize" && (sortOrder === "asc" ? "↑" : "↓")}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleSort("lastUpdated")}>
                  Last Updated {sortField === "lastUpdated" && (sortOrder === "asc" ? "↑" : "↓")}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Clear Filters */}
            {activeFiltersCount > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setFilterIndustry("All Industries");
                  setFilterStage("All Stages");
                  setFilterStatus("All Status");
                }}
                className="text-gray-500"
              >
                Clear filters
              </Button>
            )}
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 p-8 overflow-y-auto">
          {viewMode === "cards" ? (
            /* Card View */
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredAndSortedEngagements.map((engagement) => (
                <Card
                  key={engagement.id}
                  className="group cursor-pointer bg-white border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden rounded-xl"
                  onClick={() => handleEngagementClick(engagement.id)}
                >
                  <CardContent className="p-6">
                    {/* Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/80 to-primary flex items-center justify-center shadow-lg shadow-primary/20 group-hover:scale-110 transition-transform duration-300">
                          <span className="text-white font-bold text-sm">
                            {getInitials(engagement.name)}
                          </span>
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900 group-hover:text-primary transition-colors">
                            {engagement.name}
                          </h3>
                          <p className="text-sm text-gray-500">
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
                    <div className="flex items-center gap-2 mb-5">
                      <div className="flex items-center gap-1.5">
                        <div className={`w-2 h-2 rounded-full ${statusConfig[engagement.status].dot} animate-pulse`} />
                        <span className={`text-xs font-medium ${statusConfig[engagement.status].text}`}>
                          {engagement.status.charAt(0).toUpperCase() + engagement.status.slice(1)}
                        </span>
                      </div>
                      <span className="text-gray-300">•</span>
                      <span className="text-sm text-gray-600">
                        {engagement.stage}
                      </span>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-3 gap-3 pt-4 border-t border-gray-100">
                      <div className="text-center p-2 rounded-lg bg-gray-50 group-hover:bg-primary/5 transition-colors">
                        <TrendingUp className="w-4 h-4 text-gray-400 mx-auto mb-1" />
                        <span className="text-sm font-semibold text-gray-900 block">
                          {engagement.revenue}
                        </span>
                        <span className="text-xs text-gray-500">Revenue</span>
                      </div>
                      <div className="text-center p-2 rounded-lg bg-gray-50 group-hover:bg-primary/5 transition-colors">
                        <Users className="w-4 h-4 text-gray-400 mx-auto mb-1" />
                        <span className="text-sm font-semibold text-gray-900 block">
                          {engagement.teamSize}
                        </span>
                        <span className="text-xs text-gray-500">Members</span>
                      </div>
                      <div className="text-center p-2 rounded-lg bg-gray-50 group-hover:bg-primary/5 transition-colors">
                        <Calendar className="w-4 h-4 text-gray-400 mx-auto mb-1" />
                        <span className="text-sm font-semibold text-gray-900 block truncate">
                          {engagement.lastUpdated.replace(" ago", "")}
                        </span>
                        <span className="text-xs text-gray-500">Updated</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}

              {/* Add New Card */}
              <Card
                className="cursor-pointer border-2 border-dashed border-gray-200 hover:border-primary/50 hover:bg-primary/5 transition-all duration-300 flex items-center justify-center min-h-[280px] group"
                onClick={() => navigate("/onboarding")}
              >
                <CardContent className="p-6 text-center">
                  <div className="w-14 h-14 rounded-full bg-gray-100 group-hover:bg-primary/10 flex items-center justify-center mx-auto mb-4 transition-colors">
                    <Plus className="w-6 h-6 text-gray-400 group-hover:text-primary transition-colors" />
                  </div>
                  <p className="text-sm font-medium text-gray-500 group-hover:text-gray-700 transition-colors">
                    Create New Engagement
                  </p>
                </CardContent>
              </Card>
            </div>
          ) : (
            /* List View */
            <Card className="bg-white border-0 shadow-sm overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="bg-gray-50 hover:bg-gray-50">
                    <TableHead className="font-semibold">Engagement</TableHead>
                    <TableHead className="font-semibold">Industry</TableHead>
                    <TableHead className="font-semibold">Stage</TableHead>
                    <TableHead className="font-semibold">Status</TableHead>
                    <TableHead className="font-semibold text-right">Revenue</TableHead>
                    <TableHead className="font-semibold text-center">Team</TableHead>
                    <TableHead className="font-semibold">Last Updated</TableHead>
                    <TableHead className="w-10"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredAndSortedEngagements.map((engagement) => (
                    <TableRow
                      key={engagement.id}
                      className="cursor-pointer hover:bg-gray-50 transition-colors"
                      onClick={() => handleEngagementClick(engagement.id)}
                    >
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${getInitialsBgColor(engagement.name)} flex items-center justify-center`}>
                            <span className="text-white font-semibold text-xs">
                              {getInitials(engagement.name)}
                            </span>
                          </div>
                          <span className="font-medium text-gray-900">
                            {engagement.name}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell className="text-gray-600">
                        {engagement.industry}
                      </TableCell>
                      <TableCell className="text-gray-600">
                        {engagement.stage}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1.5">
                          <div className={`w-2 h-2 rounded-full ${statusConfig[engagement.status].dot}`} />
                          <span className={`text-sm font-medium ${statusConfig[engagement.status].text}`}>
                            {engagement.status.charAt(0).toUpperCase() + engagement.status.slice(1)}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell className="text-right font-medium text-gray-900">
                        {engagement.revenue}
                      </TableCell>
                      <TableCell className="text-center text-gray-600">
                        {engagement.teamSize}
                      </TableCell>
                      <TableCell className="text-gray-500">
                        {engagement.lastUpdated}
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Card>
          )}

          {filteredAndSortedEngagements.length === 0 && (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                <Search className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No engagements found</h3>
              <p className="text-gray-500 mb-4">Try adjusting your search or filters</p>
              <Button
                variant="outline"
                onClick={() => {
                  setSearchQuery("");
                  setFilterIndustry("All Industries");
                  setFilterStage("All Stages");
                  setFilterStatus("All Status");
                }}
              >
                Clear all filters
              </Button>
            </div>
          )}
        </main>
      </div>
    </MainLayout>
  );
};

export default Engagements;