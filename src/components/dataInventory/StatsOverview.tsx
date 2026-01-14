import { Card } from "@/components/ui/card";
import { CategoryStats, FileTypeStats, DataRoomFolder } from "@/types/dataInventory";
import { PieChart, Pie, Cell, ResponsiveContainer, Sector } from "recharts";
import { 
  Files, 
  FolderTree, 
  HardDrive, 
  AlertTriangle, 
  TrendingUp, 
  Scale, 
  ChevronRight,
  Sparkles,
  FileText,
  FileSpreadsheet,
  File
} from "lucide-react";
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
        innerRadius={innerRadius}
        outerRadius={outerRadius + 4}
        startAngle={startAngle}
        endAngle={endAngle}
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
  totalFolders,
  selectedFolder
}: StatsOverviewProps) {

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
          {/* Compact Stats Row */}
          <Card className="p-4">
            <div className="flex items-center justify-between gap-6">
              {/* Category Mini Chart */}
              <div className="flex items-center gap-3">
                <div className="w-16 h-16">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={categoryStats}
                        cx="50%"
                        cy="50%"
                        innerRadius={18}
                        outerRadius={28}
                        paddingAngle={2}
                        dataKey="count"
                        stroke="none"
                      >
                        {categoryStats.map((entry, index) => (
                          <Cell key={`cat-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Categories</p>
                  <p className="text-lg font-semibold text-gray-900">{categoryStats.length}</p>
                </div>
              </div>

              <div className="w-px h-10 bg-gray-100" />

              {/* File Types Mini Chart */}
              <div className="flex items-center gap-3">
                <div className="w-16 h-16">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={fileTypeStats}
                        cx="50%"
                        cy="50%"
                        innerRadius={18}
                        outerRadius={28}
                        paddingAngle={2}
                        dataKey="count"
                        stroke="none"
                      >
                        {fileTypeStats.map((entry, index) => (
                          <Cell key={`type-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">File Types</p>
                  <p className="text-lg font-semibold text-gray-900">{fileTypeStats.length}</p>
                </div>
              </div>

              <div className="w-px h-10 bg-gray-100" />

              {/* Total Files */}
              <div className="text-center">
                <p className="text-xs text-gray-500 mb-1">Total Files</p>
                <p className="text-lg font-semibold text-gray-900">{totalFiles}</p>
              </div>
            </div>
          </Card>

          {/* Category Breakdown */}
          <Card className="p-3">
            <h4 className="text-xs font-medium text-gray-500 mb-3">Category Breakdown</h4>
            <div className="space-y-2">
              {categoryStats.map((cat) => (
                <div key={cat.category} className="flex items-center gap-2">
                  <div 
                    className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                    style={{ backgroundColor: cat.color }}
                  />
                  <span className="text-xs text-gray-600 flex-1">{cat.category}</span>
                  <div className="w-16 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                    <div 
                      className="h-full rounded-full"
                      style={{ 
                        backgroundColor: cat.color,
                        width: `${(cat.count / totalFiles) * 100}%`
                      }}
                    />
                  </div>
                  <span className="text-xs font-medium text-gray-500 w-8 text-right">{cat.count}</span>
                </div>
              ))}
            </div>
          </Card>

          {/* File Types */}
          <Card className="p-3">
            <h4 className="text-xs font-medium text-gray-500 mb-3">File Types</h4>
            <div className="grid grid-cols-2 gap-2">
              {fileTypeStats.map((type) => (
                <div key={type.type} className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg">
                  <div className="w-6 h-6 rounded flex items-center justify-center" style={{ backgroundColor: `${type.color}20` }}>
                    {type.type === "PDF" ? (
                      <FileText className="h-3.5 w-3.5" style={{ color: type.color }} />
                    ) : type.type === "Excel" ? (
                      <FileSpreadsheet className="h-3.5 w-3.5" style={{ color: type.color }} />
                    ) : (
                      <File className="h-3.5 w-3.5" style={{ color: type.color }} />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium text-gray-700">{type.type}</p>
                    <p className="text-[10px] text-gray-400">{type.count} files</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}