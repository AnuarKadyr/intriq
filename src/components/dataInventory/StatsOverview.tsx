import { useState } from "react";
import { Card } from "@/components/ui/card";
import { CategoryStats, FileTypeStats, DataRoomFolder } from "@/types/dataInventory";
import { PieChart, Pie, Cell, ResponsiveContainer, Sector, Tooltip } from "recharts";
import { 
  Files, 
  FolderTree, 
  HardDrive, 
  AlertTriangle, 
  TrendingUp, 
  Scale, 
  ChevronRight,
  Sparkles
} from "lucide-react";
import { getFileTypeIcon } from "./FileTypeIcons";
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
  selectedFolder: DataRoomFolder | null;
}

const renderActiveShape = (props: any) => {
  const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill } = props;

  return (
    <g>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius - 2}
        outerRadius={outerRadius + 6}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
    </g>
  );
};

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-white px-3 py-2 rounded-lg shadow-lg border border-gray-100">
        <p className="text-sm font-medium text-gray-900">{data.category || data.type}</p>
        <p className="text-xs text-gray-500">{data.count} files</p>
      </div>
    );
  }
  return null;
};

export function StatsOverview({ 
  categoryStats, 
  fileTypeStats, 
  totalFiles, 
  totalSize, 
  totalFolders,
  selectedFolder
}: StatsOverviewProps) {
  const [activeCategoryIndex, setActiveCategoryIndex] = useState<number | undefined>(undefined);
  const [activeTypeIndex, setActiveTypeIndex] = useState<number | undefined>(undefined);

  return (
    <div className="space-y-6">
      {/* Folder Header with Stats */}
      {selectedFolder && (
        <div className="flex items-start gap-4 p-4 bg-white rounded-xl border border-gray-200">
          <div className="w-12 h-12 bg-gradient-to-br from-amber-100 to-amber-200 rounded-xl flex items-center justify-center flex-shrink-0">
            <FolderTree className="h-6 w-6 text-amber-600" />
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-lg font-semibold text-gray-900">{selectedFolder.name}</h2>
                <p className="text-xs text-gray-400 font-mono mt-0.5">{selectedFolder.path}</p>
              </div>
              
              {/* Compact Stats */}
              <div className="flex items-center gap-3 flex-shrink-0">
                <div className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 rounded-lg">
                  <Files className="h-4 w-4 text-blue-500" />
                  <span className="text-sm font-semibold text-blue-700">{totalFiles}</span>
                  <span className="text-xs text-blue-500">files</span>
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 rounded-lg">
                  <FolderTree className="h-4 w-4 text-emerald-500" />
                  <span className="text-sm font-semibold text-emerald-700">{totalFolders}</span>
                  <span className="text-xs text-emerald-500">folders</span>
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1.5 bg-purple-50 rounded-lg">
                  <HardDrive className="h-4 w-4 text-purple-500" />
                  <span className="text-sm font-semibold text-purple-700">{totalSize}</span>
                </div>
              </div>
            </div>
            
            {/* AI Analysis */}
            <div className="mt-3 flex items-start gap-2 p-3 bg-gradient-to-r from-primary/5 to-transparent rounded-lg">
              <Sparkles className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
              <p className="text-sm text-gray-600">{selectedFolder.description}</p>
            </div>
          </div>
        </div>
      )}

      {/* Main Content Grid */}
      <div className="grid grid-cols-12 gap-4">
        {/* Critical Documents - Takes 7 columns */}
        <div className="col-span-7">
          <Card className="p-4 h-full">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-amber-100 rounded-lg flex items-center justify-center">
                <AlertTriangle className="h-4 w-4 text-amber-600" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-gray-900">Critical Documents</h3>
                <p className="text-xs text-gray-500">Key files requiring attention</p>
              </div>
            </div>
            
            <div className="space-y-2">
              {criticalDocuments.map((doc) => (
                <div
                  key={doc.id}
                  className={cn(
                    "p-3 rounded-lg border cursor-pointer transition-all hover:shadow-sm group",
                    doc.impact === "deal-critical" && "bg-red-50/50 border-red-100 hover:border-red-200",
                    doc.impact === "high-value" && "bg-blue-50/50 border-blue-100 hover:border-blue-200",
                    doc.impact === "risk-flag" && "bg-amber-50/50 border-amber-100 hover:border-amber-200"
                  )}
                >
                  <div className="flex items-start gap-3">
                    <div className={cn(
                      "w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0",
                      doc.impact === "deal-critical" && "bg-red-100",
                      doc.impact === "high-value" && "bg-blue-100",
                      doc.impact === "risk-flag" && "bg-amber-100"
                    )}>
                      {doc.impact === "deal-critical" && <Scale className="h-4 w-4 text-red-600" />}
                      {doc.impact === "high-value" && <TrendingUp className="h-4 w-4 text-blue-600" />}
                      {doc.impact === "risk-flag" && <AlertTriangle className="h-4 w-4 text-amber-600" />}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className="text-sm font-medium text-gray-900 truncate">{doc.name}</span>
                        <span className={cn(
                          "text-[10px] px-1.5 py-0.5 rounded font-medium uppercase flex-shrink-0",
                          doc.impact === "deal-critical" && "bg-red-100 text-red-700",
                          doc.impact === "high-value" && "bg-blue-100 text-blue-700",
                          doc.impact === "risk-flag" && "bg-amber-100 text-amber-700"
                        )}>
                          {doc.impact.replace("-", " ")}
                        </span>
                      </div>
                      <p className="text-xs text-gray-500 line-clamp-2">{doc.insight}</p>
                    </div>
                    
                    <ChevronRight className="h-4 w-4 text-gray-300 group-hover:text-gray-500 transition-colors flex-shrink-0 mt-2" />
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Right Column - Charts & Breakdown - Takes 5 columns */}
        <div className="col-span-5 space-y-4">
          {/* Category Distribution */}
          <Card className="p-4">
            <h4 className="text-xs font-medium text-gray-500 mb-3">By Category</h4>
            <div className="flex items-start gap-3">
              <div className="w-36 h-36 flex-shrink-0">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      activeIndex={activeCategoryIndex}
                      activeShape={renderActiveShape}
                      data={categoryStats}
                      cx="50%"
                      cy="50%"
                      innerRadius={35}
                      outerRadius={60}
                      paddingAngle={2}
                      dataKey="count"
                      nameKey="category"
                      onMouseEnter={(_, index) => setActiveCategoryIndex(index)}
                      onMouseLeave={() => setActiveCategoryIndex(undefined)}
                      stroke="none"
                    >
                      {categoryStats.map((entry, index) => (
                        <Cell key={`cat-${index}`} fill={entry.color} style={{ cursor: 'pointer' }} />
                      ))}
                    </Pie>
                    <Tooltip content={<CustomTooltip />} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="flex-1 space-y-1 pt-1">
                {categoryStats.map((cat, index) => (
                  <div 
                    key={cat.category} 
                    className={cn(
                      "flex items-center gap-2 px-2 py-1 rounded transition-colors cursor-pointer",
                      activeCategoryIndex === index && "bg-gray-50"
                    )}
                    onMouseEnter={() => setActiveCategoryIndex(index)}
                    onMouseLeave={() => setActiveCategoryIndex(undefined)}
                  >
                    <div 
                      className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                      style={{ backgroundColor: cat.color }}
                    />
                    <span className="text-xs text-gray-600">{cat.category}</span>
                    <span className="text-xs font-semibold text-gray-900 ml-auto">{cat.count}</span>
                  </div>
                ))}
              </div>
            </div>
          </Card>

          {/* File Type Distribution */}
          <Card className="p-4">
            <h4 className="text-xs font-medium text-gray-500 mb-3">By File Type</h4>
            <div className="flex items-start gap-3">
              <div className="w-36 h-36 flex-shrink-0">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      activeIndex={activeTypeIndex}
                      activeShape={renderActiveShape}
                      data={fileTypeStats}
                      cx="50%"
                      cy="50%"
                      innerRadius={35}
                      outerRadius={60}
                      paddingAngle={2}
                      dataKey="count"
                      nameKey="type"
                      onMouseEnter={(_, index) => setActiveTypeIndex(index)}
                      onMouseLeave={() => setActiveTypeIndex(undefined)}
                      stroke="none"
                    >
                      {fileTypeStats.map((entry, index) => (
                        <Cell key={`type-${index}`} fill={entry.color} style={{ cursor: 'pointer' }} />
                      ))}
                    </Pie>
                    <Tooltip content={<CustomTooltip />} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="flex-1 space-y-1 pt-1">
                {fileTypeStats.map((type, index) => (
                  <div 
                    key={type.type} 
                    className={cn(
                      "flex items-center gap-2 px-2 py-1 rounded transition-colors cursor-pointer",
                      activeTypeIndex === index && "bg-gray-50"
                    )}
                    onMouseEnter={() => setActiveTypeIndex(index)}
                    onMouseLeave={() => setActiveTypeIndex(undefined)}
                  >
                    <div className="w-5 h-5 flex items-center justify-center flex-shrink-0">
                      {getFileTypeIcon(type.type, "h-4 w-4")}
                    </div>
                    <span className="text-xs text-gray-600">{type.type}</span>
                    <span className="text-xs font-semibold text-gray-900 ml-auto">{type.count}</span>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}