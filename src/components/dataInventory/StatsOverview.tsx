import { useState } from "react";
import { Card } from "@/components/ui/card";
import { CategoryStats, FileTypeStats } from "@/types/dataInventory";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Sector } from "recharts";
import { Files, FolderTree, HardDrive, AlertTriangle, FileText, TrendingUp, Scale, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface CriticalDocument {
  id: string;
  name: string;
  category: string;
  insight: string;
  impact: "deal-critical" | "high-value" | "risk-flag";
}

const criticalDocuments: CriticalDocument[] = [
  {
    id: "f5",
    name: "Financial Model v86 (to Feb'25)",
    category: "Financial",
    insight: "Master valuation model - forms basis of £47M deal price. Contains 48 worksheets with full P&L projections through 2028.",
    impact: "deal-critical"
  },
  {
    id: "f2",
    name: "Project Aurora IM (FINAL)",
    category: "Financial", 
    insight: "Final investment memorandum with deal thesis. Key for understanding valuation rationale and synergy assumptions.",
    impact: "deal-critical"
  },
  {
    id: "f16",
    name: "2025-02-28 Aged Debt.xlsm",
    category: "Financial",
    insight: "Shows £2.3M aged >90 days. Potential working capital adjustment of £400K flagged. Requires attention.",
    impact: "risk-flag"
  },
  {
    id: "f12",
    name: "Detailed Staff Analysis v3",
    category: "HR",
    insight: "22 worksheets covering all 127 staff. Identifies 8 key fee-earners generating 43% of revenue.",
    impact: "high-value"
  },
  {
    id: "f3",
    name: "Target Co - GH HoT vSHARED",
    category: "Legal",
    insight: "Heads of Terms document. Contains exclusivity period ending June 30, 2025 and break fee provisions.",
    impact: "deal-critical"
  }
];

interface StatsOverviewProps {
  categoryStats: CategoryStats[];
  fileTypeStats: FileTypeStats[];
  totalFiles: number;
  totalSize: string;
  totalFolders: number;
}

const renderActiveShape = (props: any) => {
  const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill, payload, value } = props;

  return (
    <g>
      <text x={cx} y={cy - 8} textAnchor="middle" fill="#374151" className="text-sm font-semibold">
        {payload.category || payload.type}
      </text>
      <text x={cx} y={cy + 12} textAnchor="middle" fill="#6b7280" className="text-xs">
        {value} files
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius + 8}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 12}
        outerRadius={outerRadius + 16}
        fill={fill}
      />
    </g>
  );
};

export function StatsOverview({ 
  categoryStats, 
  fileTypeStats, 
  totalFiles, 
  totalSize, 
  totalFolders 
}: StatsOverviewProps) {
  const [activeCategoryIndex, setActiveCategoryIndex] = useState<number | undefined>(undefined);
  const [activeTypeIndex, setActiveTypeIndex] = useState<number | undefined>(undefined);
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-3 gap-4">
        <Card className="p-4 bg-gradient-to-br from-blue-50 to-blue-100/50 border-blue-200 hover:shadow-md transition-all cursor-pointer hover:scale-[1.02]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center shadow-sm">
              <Files className="h-5 w-5 text-white" />
      </div>

      {/* Critical Documents */}
      <Card className="p-4 border-amber-200 bg-gradient-to-br from-amber-50/50 to-orange-50/30">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-8 h-8 bg-amber-500 rounded-lg flex items-center justify-center">
            <AlertTriangle className="h-4 w-4 text-white" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-900">Critical Documents</h3>
            <p className="text-xs text-gray-500">Key files requiring attention for this transaction</p>
          </div>
        </div>
        <div className="space-y-3">
          {criticalDocuments.map((doc) => (
            <div
              key={doc.id}
              className={cn(
                "p-3 rounded-lg border cursor-pointer transition-all hover:shadow-md group",
                doc.impact === "deal-critical" && "bg-red-50/50 border-red-200 hover:border-red-300",
                doc.impact === "high-value" && "bg-blue-50/50 border-blue-200 hover:border-blue-300",
                doc.impact === "risk-flag" && "bg-amber-50/50 border-amber-200 hover:border-amber-300"
              )}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3 flex-1">
                  <div className={cn(
                    "w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5",
                    doc.impact === "deal-critical" && "bg-red-100",
                    doc.impact === "high-value" && "bg-blue-100",
                    doc.impact === "risk-flag" && "bg-amber-100"
                  )}>
                    {doc.impact === "deal-critical" && <Scale className="h-4 w-4 text-red-600" />}
                    {doc.impact === "high-value" && <TrendingUp className="h-4 w-4 text-blue-600" />}
                    {doc.impact === "risk-flag" && <AlertTriangle className="h-4 w-4 text-amber-600" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-sm font-medium text-gray-900 truncate">{doc.name}</span>
                      <span className={cn(
                        "text-[10px] px-1.5 py-0.5 rounded-full font-medium uppercase tracking-wide",
                        doc.impact === "deal-critical" && "bg-red-100 text-red-700",
                        doc.impact === "high-value" && "bg-blue-100 text-blue-700",
                        doc.impact === "risk-flag" && "bg-amber-100 text-amber-700"
                      )}>
                        {doc.impact.replace("-", " ")}
                      </span>
                    </div>
                    <p className="text-xs text-gray-600 leading-relaxed">{doc.insight}</p>
                  </div>
                </div>
                <ChevronRight className="h-4 w-4 text-gray-400 group-hover:text-gray-600 transition-colors flex-shrink-0 mt-2" />
              </div>
            </div>
          ))}
        </div>
      </Card>
            <div>
              <p className="text-2xl font-bold text-blue-900">{totalFiles}</p>
              <p className="text-xs text-blue-600">Total Files</p>
            </div>
          </div>
        </Card>
        
        <Card className="p-4 bg-gradient-to-br from-emerald-50 to-emerald-100/50 border-emerald-200 hover:shadow-md transition-all cursor-pointer hover:scale-[1.02]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-emerald-500 rounded-lg flex items-center justify-center shadow-sm">
              <FolderTree className="h-5 w-5 text-white" />
            </div>
            <div>
              <p className="text-2xl font-bold text-emerald-900">{totalFolders}</p>
              <p className="text-xs text-emerald-600">Folders</p>
            </div>
          </div>
        </Card>
        
        <Card className="p-4 bg-gradient-to-br from-purple-50 to-purple-100/50 border-purple-200 hover:shadow-md transition-all cursor-pointer hover:scale-[1.02]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-purple-500 rounded-lg flex items-center justify-center shadow-sm">
              <HardDrive className="h-5 w-5 text-white" />
            </div>
            <div>
              <p className="text-2xl font-bold text-purple-900">{totalSize}</p>
              <p className="text-xs text-purple-600">Total Size</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-2 gap-4">
        {/* Category Distribution */}
        <Card className="p-4 hover:shadow-md transition-shadow">
          <h3 className="text-sm font-semibold text-gray-900 mb-3">By Category</h3>
          <div className="h-52">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  activeIndex={activeCategoryIndex}
                  activeShape={renderActiveShape}
                  data={categoryStats}
                  cx="50%"
                  cy="50%"
                  innerRadius={45}
                  outerRadius={70}
                  paddingAngle={2}
                  dataKey="count"
                  nameKey="category"
                  onMouseEnter={(_, index) => setActiveCategoryIndex(index)}
                  onMouseLeave={() => setActiveCategoryIndex(undefined)}
                >
                  {categoryStats.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={entry.color} 
                      style={{ cursor: 'pointer' }}
                    />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* File Type Distribution */}
        <Card className="p-4 hover:shadow-md transition-shadow">
          <h3 className="text-sm font-semibold text-gray-900 mb-3">By File Type</h3>
          <div className="h-52">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  activeIndex={activeTypeIndex}
                  activeShape={renderActiveShape}
                  data={fileTypeStats}
                  cx="50%"
                  cy="50%"
                  innerRadius={45}
                  outerRadius={70}
                  paddingAngle={2}
                  dataKey="count"
                  nameKey="type"
                  onMouseEnter={(_, index) => setActiveTypeIndex(index)}
                  onMouseLeave={() => setActiveTypeIndex(undefined)}
                >
                  {fileTypeStats.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={entry.color}
                      style={{ cursor: 'pointer' }}
                    />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      {/* Category Breakdown List */}
      <Card className="p-4 hover:shadow-md transition-shadow">
        <h3 className="text-sm font-semibold text-gray-900 mb-3">Category Breakdown</h3>
        <div className="space-y-2">
          {categoryStats.map((cat) => (
            <div 
              key={cat.category} 
              className={cn(
                "flex items-center gap-3 p-2 rounded-lg cursor-pointer transition-all",
                hoveredCategory === cat.category 
                  ? "bg-gray-100 shadow-sm" 
                  : "hover:bg-gray-50"
              )}
              onMouseEnter={() => setHoveredCategory(cat.category)}
              onMouseLeave={() => setHoveredCategory(null)}
            >
              <div 
                className={cn(
                  "w-4 h-4 rounded-full flex-shrink-0 transition-transform",
                  hoveredCategory === cat.category && "scale-125"
                )}
                style={{ backgroundColor: cat.color }}
              />
              <span className="text-sm text-gray-700 flex-1">{cat.category}</span>
              <div className="flex items-center gap-2">
                <div 
                  className="h-2 rounded-full bg-gray-200 w-24 overflow-hidden"
                >
                  <div 
                    className="h-full rounded-full transition-all duration-500"
                    style={{ 
                      backgroundColor: cat.color,
                      width: `${(cat.count / 154) * 100}%`
                    }}
                  />
                </div>
                <span className={cn(
                  "text-sm font-medium min-w-[60px] text-right transition-colors",
                  hoveredCategory === cat.category ? "text-gray-900" : "text-gray-600"
                )}>
                  {cat.count} files
                </span>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
