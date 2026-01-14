import { Card } from "@/components/ui/card";
import { CategoryStats, FileTypeStats } from "@/types/dataInventory";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";
import { FileText, FileSpreadsheet, File, Files, FolderTree, HardDrive } from "lucide-react";

interface StatsOverviewProps {
  categoryStats: CategoryStats[];
  fileTypeStats: FileTypeStats[];
  totalFiles: number;
  totalSize: string;
  totalFolders: number;
}

export function StatsOverview({ 
  categoryStats, 
  fileTypeStats, 
  totalFiles, 
  totalSize, 
  totalFolders 
}: StatsOverviewProps) {
  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-3 gap-4">
        <Card className="p-4 bg-gradient-to-br from-blue-50 to-blue-100/50 border-blue-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
              <Files className="h-5 w-5 text-white" />
            </div>
            <div>
              <p className="text-2xl font-bold text-blue-900">{totalFiles}</p>
              <p className="text-xs text-blue-600">Total Files</p>
            </div>
          </div>
        </Card>
        
        <Card className="p-4 bg-gradient-to-br from-emerald-50 to-emerald-100/50 border-emerald-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-emerald-500 rounded-lg flex items-center justify-center">
              <FolderTree className="h-5 w-5 text-white" />
            </div>
            <div>
              <p className="text-2xl font-bold text-emerald-900">{totalFolders}</p>
              <p className="text-xs text-emerald-600">Folders</p>
            </div>
          </div>
        </Card>
        
        <Card className="p-4 bg-gradient-to-br from-purple-50 to-purple-100/50 border-purple-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-purple-500 rounded-lg flex items-center justify-center">
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
        <Card className="p-4">
          <h3 className="text-sm font-semibold text-gray-900 mb-3">By Category</h3>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryStats}
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={70}
                  paddingAngle={2}
                  dataKey="count"
                  nameKey="category"
                >
                  {categoryStats.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value: number, name: string) => [`${value} files`, name]}
                  contentStyle={{ fontSize: '12px', borderRadius: '8px' }}
                />
                <Legend 
                  iconSize={8} 
                  wrapperStyle={{ fontSize: '11px' }}
                  formatter={(value) => <span className="text-gray-600">{value}</span>}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* File Type Distribution */}
        <Card className="p-4">
          <h3 className="text-sm font-semibold text-gray-900 mb-3">By File Type</h3>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={fileTypeStats}
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={70}
                  paddingAngle={2}
                  dataKey="count"
                  nameKey="type"
                >
                  {fileTypeStats.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value: number, name: string) => [`${value} files`, name]}
                  contentStyle={{ fontSize: '12px', borderRadius: '8px' }}
                />
                <Legend 
                  iconSize={8} 
                  wrapperStyle={{ fontSize: '11px' }}
                  formatter={(value) => <span className="text-gray-600">{value}</span>}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      {/* Category Breakdown List */}
      <Card className="p-4">
        <h3 className="text-sm font-semibold text-gray-900 mb-3">Category Breakdown</h3>
        <div className="space-y-2">
          {categoryStats.map((cat) => (
            <div key={cat.category} className="flex items-center gap-3">
              <div 
                className="w-3 h-3 rounded-full flex-shrink-0" 
                style={{ backgroundColor: cat.color }}
              />
              <span className="text-sm text-gray-700 flex-1">{cat.category}</span>
              <span className="text-sm font-medium text-gray-900">{cat.count} files</span>
              <span className={`text-xs px-2 py-0.5 rounded-full ${
                cat.priority === "HIGH" ? "bg-red-100 text-red-700" :
                cat.priority === "MEDIUM" ? "bg-amber-100 text-amber-700" :
                "bg-green-100 text-green-700"
              }`}>
                {cat.priority}
              </span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
