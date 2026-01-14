import { Card } from "@/components/ui/card";
import { DataRoomFolder } from "@/types/dataInventory";
import { Folder, FileText, Sparkles } from "lucide-react";

interface FolderDetailsProps {
  folder: DataRoomFolder;
}

export function FolderDetails({ folder }: FolderDetailsProps) {
  return (
    <Card className="p-5 bg-gradient-to-br from-white to-gray-50/50 border-gray-200 hover:shadow-md transition-shadow">
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 bg-gradient-to-br from-amber-100 to-amber-200 rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm">
          <Folder className="h-6 w-6 text-amber-600" />
        </div>
        
        <div className="flex-1 min-w-0">
          <h2 className="text-lg font-semibold text-gray-900 truncate mb-1">
            {folder.name}
          </h2>
          
          <p className="text-sm text-gray-400 mb-3 font-mono text-xs">
            {folder.path}
          </p>
          
          <div className="bg-gradient-to-r from-primary/5 to-primary/10 rounded-lg border border-primary/10 p-3 mb-4">
            <div className="flex items-start gap-2">
              <Sparkles className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="text-xs font-medium text-primary mb-1">AI Analysis</h4>
                <p className="text-sm text-gray-700">{folder.description}</p>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-6 text-sm">
            <div className="flex items-center gap-2 px-3 py-1.5 bg-blue-50 rounded-full">
              <FileText className="h-4 w-4 text-blue-500" />
              <span className="text-blue-700 font-medium">{folder.fileCount} files</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 bg-amber-50 rounded-full">
              <Folder className="h-4 w-4 text-amber-500" />
              <span className="text-amber-700 font-medium">{folder.children.length} subfolders</span>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
