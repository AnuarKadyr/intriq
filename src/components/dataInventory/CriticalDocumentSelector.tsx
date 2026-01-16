import { useState, useMemo, useEffect } from "react";
import { DataRoomFile } from "@/types/dataInventory";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { 
  Search, 
  FileText, 
  X, 
  Sparkles,
  AlertCircle,
  Check,
  ListChecks
} from "lucide-react";
import { getFileTypeIcon } from "./FileTypeIcons";
import { cn } from "@/lib/utils";

interface CriticalDocumentSelectorProps {
  allFiles: DataRoomFile[];
  onAnalyze: (files: DataRoomFile[]) => void;
  onViewInsights?: () => void;
  hasGeneratedInsights?: boolean;
  maxSelections?: number;
  initialSelectedFiles?: DataRoomFile[];
}

export function CriticalDocumentSelector({ 
  allFiles, 
  onAnalyze, 
  onViewInsights,
  hasGeneratedInsights = false,
  maxSelections = 10,
  initialSelectedFiles = []
}: CriticalDocumentSelectorProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFiles, setSelectedFiles] = useState<DataRoomFile[]>(initialSelectedFiles);

  // Sync with initialSelectedFiles when new files are added via Go Deep
  useEffect(() => {
    setSelectedFiles(prev => {
      const newFiles = initialSelectedFiles.filter(
        newFile => !prev.some(existing => existing.id === newFile.id)
      );
      if (newFiles.length > 0) {
        return [...prev, ...newFiles].slice(0, maxSelections);
      }
      return prev;
    });
  }, [initialSelectedFiles, maxSelections]);

  const filteredFiles = useMemo(() => {
    if (!searchQuery.trim()) return allFiles;
    const query = searchQuery.toLowerCase();
    return allFiles.filter(file => 
      file.name.toLowerCase().includes(query) ||
      file.category.toLowerCase().includes(query) ||
      file.type.toLowerCase().includes(query)
    );
  }, [allFiles, searchQuery]);

  const handleToggleFile = (file: DataRoomFile) => {
    setSelectedFiles(prev => {
      const isSelected = prev.some(f => f.id === file.id);
      if (isSelected) {
        return prev.filter(f => f.id !== file.id);
      }
      if (prev.length >= maxSelections) {
        return prev;
      }
      return [...prev, file];
    });
  };

  const handleRemoveFile = (file: DataRoomFile) => {
    setSelectedFiles(prev => prev.filter(f => f.id !== file.id));
  };

  const handleAnalyze = () => {
    if (selectedFiles.length > 0) {
      onAnalyze(selectedFiles);
    }
  };

  const isMaxSelected = selectedFiles.length >= maxSelections;

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Financial": return "bg-emerald-100 text-emerald-700";
      case "Legal": return "bg-blue-100 text-blue-700";
      case "Commercial": return "bg-purple-100 text-purple-700";
      case "HR": return "bg-orange-100 text-orange-700";
      case "Tax": return "bg-red-100 text-red-700";
      default: return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <Card className="p-4 h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center gap-2 mb-4">
        <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
          <Sparkles className="h-4 w-4 text-primary" />
        </div>
        <div className="flex-1">
          <h3 className="text-sm font-semibold text-gray-900">Critical Document Analysis</h3>
          <p className="text-xs text-gray-500">Select up to {maxSelections} documents to analyze</p>
        </div>
        <Badge variant="outline" className={cn(
          "text-xs",
          isMaxSelected ? "border-amber-300 text-amber-700 bg-amber-50" : ""
        )}>
          {selectedFiles.length}/{maxSelections} selected
        </Badge>
      </div>

      {/* Search */}
      <div className="relative mb-3">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
        <Input
          placeholder="Search documents by name, category, or type..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-9 h-9 text-sm"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery("")}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* Selected Files Pills */}
      {selectedFiles.length > 0 && (
        <div className="mb-3 flex flex-wrap gap-1.5">
          {selectedFiles.map(file => (
            <Badge 
              key={file.id} 
              variant="secondary" 
              className="pl-2 pr-1 py-1 text-xs flex items-center gap-1 bg-primary/10 text-primary hover:bg-primary/20"
            >
              <span className="truncate max-w-[150px]">{file.name}</span>
              <button
                onClick={() => handleRemoveFile(file)}
                className="ml-1 p-0.5 rounded-full hover:bg-primary/20"
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          ))}
        </div>
      )}

      {/* File List */}
      <ScrollArea className="flex-1 -mx-1 px-1" style={{ maxHeight: "280px" }}>
        <div className="space-y-1">
          {filteredFiles.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-8 text-gray-400">
              <FileText className="h-8 w-8 mb-2" />
              <p className="text-sm">No documents found</p>
            </div>
          ) : (
            filteredFiles.map(file => {
              const isSelected = selectedFiles.some(f => f.id === file.id);
              const isDisabled = !isSelected && isMaxSelected;
              
              return (
                <div
                  key={file.id}
                  onClick={() => !isDisabled && handleToggleFile(file)}
                  className={cn(
                    "flex items-center gap-3 p-2.5 rounded-lg border transition-all",
                    isSelected 
                      ? "bg-primary/5 border-primary/30" 
                      : "bg-white border-gray-100 hover:border-gray-200",
                    isDisabled 
                      ? "opacity-50 cursor-not-allowed" 
                      : "cursor-pointer hover:shadow-sm"
                  )}
                >
                  <div className={cn(
                    "w-5 h-5 rounded flex items-center justify-center border-2 flex-shrink-0 transition-all",
                    isSelected 
                      ? "bg-primary border-primary" 
                      : "border-gray-300"
                  )}>
                    {isSelected && <Check className="h-3 w-3 text-white" />}
                  </div>
                  
                  <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center flex-shrink-0">
                    {getFileTypeIcon(file.type, "h-4 w-4")}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">{file.name}</p>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className={cn(
                        "text-[10px] px-1.5 py-0.5 rounded font-medium",
                        getCategoryColor(file.category)
                      )}>
                        {file.category}
                      </span>
                      <span className="text-[10px] text-gray-400">{file.size}</span>
                      {file.pages && (
                        <span className="text-[10px] text-gray-400">{file.pages} pages</span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </ScrollArea>

      {/* Max Selection Warning */}
      {isMaxSelected && (
        <div className="flex items-center gap-2 mt-3 p-2 bg-amber-50 rounded-lg border border-amber-200">
          <AlertCircle className="h-4 w-4 text-amber-600 flex-shrink-0" />
          <p className="text-xs text-amber-700">Maximum {maxSelections} documents can be selected</p>
        </div>
      )}

      {/* Action Buttons */}
      <div className="mt-4 flex gap-2">
        {hasGeneratedInsights && onViewInsights && (
          <Button
            onClick={onViewInsights}
            variant="outline"
            className="gap-2 flex-1"
          >
            <ListChecks className="h-4 w-4" />
            View Insights
          </Button>
        )}
        <Button
          onClick={handleAnalyze}
          disabled={selectedFiles.length === 0}
          className={cn("gap-2", hasGeneratedInsights ? "flex-1" : "w-full")}
        >
          <Sparkles className="h-4 w-4" />
          {hasGeneratedInsights ? "Re-analyze" : "Analyze"} {selectedFiles.length > 0 ? `${selectedFiles.length} Doc${selectedFiles.length > 1 ? 's' : ''}` : 'Documents'}
        </Button>
      </div>
    </Card>
  );
}
