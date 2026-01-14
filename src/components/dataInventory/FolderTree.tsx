import { useState } from "react";
import { ChevronRight, ChevronDown, Folder, FolderOpen } from "lucide-react";
import { DataRoomFolder } from "@/types/dataInventory";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

interface FolderTreeProps {
  folders: DataRoomFolder[];
  selectedFolder: DataRoomFolder | null;
  onSelectFolder: (folder: DataRoomFolder) => void;
  level?: number;
}

export function FolderTree({ folders, selectedFolder, onSelectFolder, level = 0 }: FolderTreeProps) {
  return (
    <div className="space-y-0.5">
      {folders.map((folder) => (
        <FolderNode
          key={folder.id}
          folder={folder}
          selectedFolder={selectedFolder}
          onSelectFolder={onSelectFolder}
          level={level}
        />
      ))}
    </div>
  );
}

interface FolderNodeProps {
  folder: DataRoomFolder;
  selectedFolder: DataRoomFolder | null;
  onSelectFolder: (folder: DataRoomFolder) => void;
  level: number;
}

function FolderNode({ folder, selectedFolder, onSelectFolder, level }: FolderNodeProps) {
  const [isExpanded, setIsExpanded] = useState(level < 2);
  const hasChildren = folder.children.length > 0;
  const isSelected = selectedFolder?.id === folder.id;

  const priorityColors = {
    HIGH: "bg-red-100 text-red-700 border-red-200",
    MEDIUM: "bg-amber-100 text-amber-700 border-amber-200",
    LOW: "bg-green-100 text-green-700 border-green-200",
  };

  return (
    <div>
      <div
        className={cn(
          "flex items-center gap-2 py-2 px-3 rounded-lg cursor-pointer transition-colors group",
          isSelected ? "bg-primary/10 border border-primary/20" : "hover:bg-gray-100"
        )}
        style={{ paddingLeft: `${level * 16 + 12}px` }}
        onClick={() => onSelectFolder(folder)}
      >
        {hasChildren ? (
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsExpanded(!isExpanded);
            }}
            className="p-0.5 hover:bg-gray-200 rounded"
          >
            {isExpanded ? (
              <ChevronDown className="h-4 w-4 text-gray-500" />
            ) : (
              <ChevronRight className="h-4 w-4 text-gray-500" />
            )}
          </button>
        ) : (
          <span className="w-5" />
        )}

        {isExpanded && hasChildren ? (
          <FolderOpen className="h-4 w-4 text-amber-500 flex-shrink-0" />
        ) : (
          <Folder className="h-4 w-4 text-amber-500 flex-shrink-0" />
        )}

        <span className={cn(
          "text-sm truncate flex-1",
          isSelected ? "font-medium text-gray-900" : "text-gray-700"
        )}>
          {folder.name}
        </span>

        <Badge variant="outline" className={cn("text-xs px-1.5 py-0 h-5", priorityColors[folder.priority])}>
          {folder.priority}
        </Badge>

        <span className="text-xs text-gray-400">
          {folder.fileCount}
        </span>
      </div>

      {isExpanded && hasChildren && (
        <FolderTree
          folders={folder.children}
          selectedFolder={selectedFolder}
          onSelectFolder={onSelectFolder}
          level={level + 1}
        />
      )}
    </div>
  );
}
