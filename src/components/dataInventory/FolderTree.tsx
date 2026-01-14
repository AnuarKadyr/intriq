import { useState } from "react";
import { ChevronRight, ChevronDown, Folder, FolderOpen } from "lucide-react";
import { DataRoomFolder } from "@/types/dataInventory";
import { cn } from "@/lib/utils";

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
  const [isHovered, setIsHovered] = useState(false);
  const hasChildren = folder.children.length > 0;
  const isSelected = selectedFolder?.id === folder.id;

  return (
    <div>
      <div
        className={cn(
          "flex items-center gap-2 py-2.5 px-3 rounded-lg cursor-pointer transition-all duration-200 group",
          isSelected 
            ? "bg-primary/10 border border-primary/30 shadow-sm" 
            : "hover:bg-gray-100/80 hover:shadow-sm border border-transparent"
        )}
        style={{ paddingLeft: `${level * 16 + 12}px` }}
        onClick={() => onSelectFolder(folder)}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {hasChildren ? (
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsExpanded(!isExpanded);
            }}
            className={cn(
              "p-0.5 rounded transition-colors",
              isHovered || isSelected ? "bg-gray-200/80" : "hover:bg-gray-200"
            )}
          >
            {isExpanded ? (
              <ChevronDown className={cn(
                "h-4 w-4 transition-colors",
                isSelected ? "text-primary" : "text-gray-500"
              )} />
            ) : (
              <ChevronRight className={cn(
                "h-4 w-4 transition-colors",
                isSelected ? "text-primary" : "text-gray-500"
              )} />
            )}
          </button>
        ) : (
          <span className="w-5" />
        )}

        <div className={cn(
          "p-1 rounded transition-colors",
          isSelected ? "bg-amber-100" : isHovered ? "bg-amber-50" : ""
        )}>
          {isExpanded && hasChildren ? (
            <FolderOpen className={cn(
              "h-4 w-4 flex-shrink-0 transition-colors",
              isSelected ? "text-amber-600" : "text-amber-500"
            )} />
          ) : (
            <Folder className={cn(
              "h-4 w-4 flex-shrink-0 transition-colors",
              isSelected ? "text-amber-600" : "text-amber-500"
            )} />
          )}
        </div>

        <span className={cn(
          "text-sm truncate flex-1 transition-colors",
          isSelected ? "font-semibold text-gray-900" : "text-gray-700 group-hover:text-gray-900"
        )}>
          {folder.name}
        </span>

        <span className={cn(
          "text-xs px-2 py-0.5 rounded-full transition-all",
          isSelected 
            ? "bg-primary/20 text-primary font-medium" 
            : isHovered 
              ? "bg-gray-200 text-gray-700" 
              : "text-gray-400"
        )}>
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
