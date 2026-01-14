import { FileText, FileSpreadsheet, File, FileWarning, Download, Eye } from "lucide-react";
import { DataRoomFile } from "@/types/dataInventory";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface FileListProps {
  files: DataRoomFile[];
  title: string;
}

export function FileList({ files, title }: FileListProps) {
  const getFileIcon = (type: string) => {
    switch (type) {
      case "PDF Document":
        return <FileText className="h-5 w-5 text-red-500" />;
      case "Excel Workbook":
      case "Excel Spreadsheet (Legacy)":
      case "Excel Macro-Enabled":
        return <FileSpreadsheet className="h-5 w-5 text-green-600" />;
      case "Word Document":
        return <FileText className="h-5 w-5 text-blue-600" />;
      default:
        return <FileWarning className="h-5 w-5 text-gray-400" />;
    }
  };

  const priorityColors = {
    HIGH: "bg-red-100 text-red-700 border-red-200",
    MEDIUM: "bg-amber-100 text-amber-700 border-amber-200",
    LOW: "bg-green-100 text-green-700 border-green-200",
  };

  const categoryColors: Record<string, string> = {
    Financial: "bg-red-50 text-red-600 border-red-100",
    Legal: "bg-amber-50 text-amber-600 border-amber-100",
    Commercial: "bg-green-50 text-green-600 border-green-100",
    HR: "bg-blue-50 text-blue-600 border-blue-100",
    Tax: "bg-purple-50 text-purple-600 border-purple-100",
    Other: "bg-gray-50 text-gray-600 border-gray-100",
  };

  if (files.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500">
        <File className="h-12 w-12 mx-auto mb-3 text-gray-300" />
        <p className="text-sm">No files in this folder</p>
        <p className="text-xs text-gray-400 mt-1">Select a subfolder to view files</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium text-gray-700">{title}</h3>
        <span className="text-xs text-gray-500">{files.length} files</span>
      </div>
      
      <div className="space-y-2">
        {files.map((file) => (
          <Card key={file.id} className="p-4 hover:shadow-md transition-shadow">
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 mt-0.5">
                {getFileIcon(file.type)}
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <h4 className="text-sm font-medium text-gray-900 truncate">
                    {file.name}
                  </h4>
                  <div className="flex items-center gap-1 flex-shrink-0">
                    <Button variant="ghost" size="icon" className="h-7 w-7">
                      <Eye className="h-3.5 w-3.5" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-7 w-7">
                      <Download className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                </div>
                
                <div className="flex items-center gap-2 mt-1.5">
                  <Badge variant="outline" className={cn("text-xs px-1.5 py-0 h-5", categoryColors[file.category])}>
                    {file.category}
                  </Badge>
                  <Badge variant="outline" className={cn("text-xs px-1.5 py-0 h-5", priorityColors[file.priority])}>
                    {file.priority}
                  </Badge>
                  <span className="text-xs text-gray-400">{file.size}</span>
                  {file.pages && (
                    <span className="text-xs text-gray-400">{file.pages} pages</span>
                  )}
                </div>
                
                <p className="text-xs text-gray-500 mt-2 line-clamp-2">
                  {file.summary}
                </p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
