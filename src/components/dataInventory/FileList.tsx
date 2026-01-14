import { useState } from "react";
import { File, Download, Eye, ChevronDown, ChevronUp } from "lucide-react";
import { DataRoomFile } from "@/types/dataInventory";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { getFileTypeIcon } from "./FileTypeIcons";

interface FileListProps {
  files: DataRoomFile[];
  title: string;
}

export function FileList({ files, title }: FileListProps) {
  const [expandedFile, setExpandedFile] = useState<string | null>(null);

  const categoryColors: Record<string, string> = {
    Financial: "bg-red-50 text-red-600 border-red-200 hover:bg-red-100",
    Legal: "bg-amber-50 text-amber-600 border-amber-200 hover:bg-amber-100",
    Commercial: "bg-green-50 text-green-600 border-green-200 hover:bg-green-100",
    HR: "bg-blue-50 text-blue-600 border-blue-200 hover:bg-blue-100",
    Tax: "bg-purple-50 text-purple-600 border-purple-200 hover:bg-purple-100",
    Other: "bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100",
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
        {files.map((file) => {
          const isExpanded = expandedFile === file.id;
          
          return (
            <div 
              key={file.id} 
              className={cn(
                "bg-white rounded-xl border transition-all duration-200 overflow-hidden",
                isExpanded 
                  ? "border-primary/30 shadow-md ring-1 ring-primary/10" 
                  : "border-gray-200 hover:border-gray-300 hover:shadow-sm"
              )}
            >
              <div 
                className="p-4 cursor-pointer"
                onClick={() => setExpandedFile(isExpanded ? null : file.id)}
              >
                <div className="flex items-start gap-3">
                  <div className={cn(
                    "flex-shrink-0 mt-0.5 p-2 rounded-lg transition-colors",
                    isExpanded ? "bg-gray-100" : "bg-gray-50"
                  )}>
                    {getFileTypeIcon(file.type, "h-5 w-5")}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="text-sm font-medium truncate text-gray-900">
                        {file.name}
                      </h4>
                      <div className="flex items-center gap-1 flex-shrink-0">
                        {isExpanded ? (
                          <ChevronUp className="h-4 w-4 text-gray-400" />
                        ) : (
                          <ChevronDown className="h-4 w-4 text-gray-400" />
                        )}
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2 mt-2 flex-wrap">
                      <Badge 
                        variant="outline" 
                        className={cn(
                          "text-xs px-2 py-0.5 cursor-pointer transition-colors",
                          categoryColors[file.category]
                        )}
                      >
                        {file.category}
                      </Badge>
                      <span className="text-xs text-gray-400">{file.type}</span>
                      <span className="text-xs text-gray-400">•</span>
                      <span className="text-xs text-gray-400">{file.size}</span>
                      {file.pages && (
                        <>
                          <span className="text-xs text-gray-400">•</span>
                          <span className="text-xs text-gray-400">{file.pages} pages</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              
              {isExpanded && (
                <div className="px-4 pb-4 pt-0 border-t border-gray-100 bg-gray-50/50">
                  <div className="pt-3">
                    <h5 className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">AI Summary</h5>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {file.summary}
                    </p>
                    
                    <div className="flex items-center gap-2 mt-4">
                      <Button size="sm" variant="outline" className="gap-2">
                        <Eye className="h-3.5 w-3.5" />
                        Preview
                      </Button>
                      <Button size="sm" variant="outline" className="gap-2">
                        <Download className="h-3.5 w-3.5" />
                        Download
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
