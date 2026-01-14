import { Card } from "@/components/ui/card";
import { DataRoomFolder } from "@/types/dataInventory";
import { Folder, FileText, AlertCircle, Info } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface FolderDetailsProps {
  folder: DataRoomFolder;
}

export function FolderDetails({ folder }: FolderDetailsProps) {
  const priorityColors = {
    HIGH: "bg-red-100 text-red-700 border-red-200",
    MEDIUM: "bg-amber-100 text-amber-700 border-amber-200",
    LOW: "bg-green-100 text-green-700 border-green-200",
  };

  const priorityIcons = {
    HIGH: <AlertCircle className="h-4 w-4 text-red-500" />,
    MEDIUM: <Info className="h-4 w-4 text-amber-500" />,
    LOW: <Info className="h-4 w-4 text-green-500" />,
  };

  return (
    <Card className="p-5 bg-gradient-to-br from-gray-50 to-white border-gray-200">
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center flex-shrink-0">
          <Folder className="h-6 w-6 text-amber-600" />
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2">
            <h2 className="text-lg font-semibold text-gray-900 truncate">
              {folder.name}
            </h2>
            <Badge variant="outline" className={cn("text-xs", priorityColors[folder.priority])}>
              {folder.priority} Priority
            </Badge>
          </div>
          
          <p className="text-sm text-gray-500 mb-3 line-clamp-2">
            {folder.path}
          </p>
          
          <div className="bg-white rounded-lg border border-gray-100 p-3 mb-3">
            <div className="flex items-start gap-2">
              {priorityIcons[folder.priority]}
              <div>
                <h4 className="text-xs font-medium text-gray-700 mb-1">AI Analysis</h4>
                <p className="text-sm text-gray-600">{folder.description}</p>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-1.5 text-gray-500">
              <FileText className="h-4 w-4" />
              <span>{folder.fileCount} files</span>
            </div>
            <div className="flex items-center gap-1.5 text-gray-500">
              <Folder className="h-4 w-4" />
              <span>{folder.children.length} subfolders</span>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
