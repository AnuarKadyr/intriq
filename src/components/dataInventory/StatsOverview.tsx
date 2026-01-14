import { useState } from "react";
import { Card } from "@/components/ui/card";
import { CategoryStats, FileTypeStats } from "@/types/dataInventory";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Sector } from "recharts";
import { Files, FolderTree, HardDrive } from "lucide-react";
import { cn } from "@/lib/utils";

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
