import { useState, useMemo } from "react";
import { ChevronRight, ChevronDown, Folder, FolderOpen, Search, PanelLeftClose, PanelLeft } from "lucide-react";
import { DataRoomFolder } from "@/types/dataInventory";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

interface FolderSidebarProps {
  folders: DataRoomFolder[];
  selectedFolder: DataRoomFolder | null;
  onSelectFolder: (folder: DataRoomFolder) => void;
  totalFolders: number;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
}

// Flatten folders for search
function flattenFolders(folders: DataRoomFolder[], parent?: DataRoomFolder): { folder: DataRoomFolder; parent?: DataRoomFolder }[] {
  let result: { folder: DataRoomFolder; parent?: DataRoomFolder }[] = [];
  for (const folder of folders) {
    result.push({ folder, parent });
    if (folder.children.length > 0) {
      result = result.concat(flattenFolders(folder.children, folder));
    }
  }
  return result;
}

export function FolderSidebar({ 
  folders, 
  selectedFolder, 
  onSelectFolder, 
  totalFolders,
  isCollapsed,
  onToggleCollapse
}: FolderSidebarProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedFolders, setExpandedFolders] = useState<Set<string>>(new Set(["root", "aurora-data"]));

  const allFolders = useMemo(() => flattenFolders(folders), [folders]);
  
  const filteredFolders = useMemo(() => {
    if (!searchQuery.trim()) return null;
    const query = searchQuery.toLowerCase();
    return allFolders.filter(({ folder }) => 
      folder.name.toLowerCase().includes(query)
    );
  }, [searchQuery, allFolders]);

  const toggleExpand = (folderId: string) => {
    setExpandedFolders(prev => {
      const next = new Set(prev);
      if (next.has(folderId)) {
        next.delete(folderId);
      } else {
        next.add(folderId);
      }
      return next;
    });
  };

  if (isCollapsed) {
    return (
      <div className="w-14 border-r border-gray-200 bg-white flex-shrink-0 flex flex-col items-center py-4">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              onClick={onToggleCollapse}
              className="mb-4 hover:bg-gray-100"
            >
              <PanelLeft className="h-5 w-5 text-gray-500" />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="right">
            <p>Expand sidebar</p>
          </TooltipContent>
        </Tooltip>
        
        <div className="w-8 h-8 bg-amber-100 rounded-lg flex items-center justify-center">
          <Folder className="h-4 w-4 text-amber-600" />
        </div>
        <span className="text-xs text-gray-500 mt-2">{totalFolders}</span>
      </div>
    );
  }

  return (
    <div className="w-80 border-r border-gray-200 bg-white flex-shrink-0 flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-gray-100">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h3 className="text-sm font-semibold text-gray-900">Folder Structure</h3>
            <p className="text-xs text-gray-500 mt-0.5">{totalFolders} folders mapped</p>
          </div>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                onClick={onToggleCollapse}
                className="h-8 w-8 hover:bg-gray-100"
              >
                <PanelLeftClose className="h-4 w-4 text-gray-500" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right">
              <p>Collapse sidebar</p>
            </TooltipContent>
          </Tooltip>
        </div>
        
        {/* Search Input */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search folders..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 h-9 bg-gray-50 border-gray-200 focus:bg-white transition-colors"
          />
        </div>
      </div>

      {/* Folder Tree or Search Results */}
      <ScrollArea className="flex-1">
        <div className="p-2">
          {filteredFolders ? (
            // Search Results
            <div className="space-y-1">
              {filteredFolders.length === 0 ? (
                <div className="px-3 py-8 text-center">
                  <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Search className="h-5 w-5 text-gray-400" />
                  </div>
                  <p className="text-sm text-gray-500">No folders found</p>
                  <p className="text-xs text-gray-400 mt-1">Try a different search term</p>
                </div>
              ) : (
                <>
                  <p className="px-3 py-2 text-xs text-gray-500 font-medium">
                    {filteredFolders.length} result{filteredFolders.length !== 1 ? 's' : ''} found
                  </p>
                  {filteredFolders.map(({ folder }) => (
                    <SearchResultItem
                      key={folder.id}
                      folder={folder}
                      isSelected={selectedFolder?.id === folder.id}
                      onSelect={() => {
                        onSelectFolder(folder);
                        setSearchQuery("");
                      }}
                      searchQuery={searchQuery}
                    />
                  ))}
                </>
              )}
            </div>
          ) : (
            // Normal Tree View
            <FolderTreeView
              folders={folders}
              selectedFolder={selectedFolder}
              onSelectFolder={onSelectFolder}
              expandedFolders={expandedFolders}
              onToggleExpand={toggleExpand}
              level={0}
            />
          )}
        </div>
      </ScrollArea>
    </div>
  );
}

// Search Result Item
interface SearchResultItemProps {
  folder: DataRoomFolder;
  isSelected: boolean;
  onSelect: () => void;
  searchQuery: string;
}

function SearchResultItem({ folder, isSelected, onSelect, searchQuery }: SearchResultItemProps) {
  // Highlight matching text
  const highlightMatch = (text: string) => {
    const index = text.toLowerCase().indexOf(searchQuery.toLowerCase());
    if (index === -1) return text;
    
    return (
      <>
        {text.slice(0, index)}
        <span className="bg-amber-200 text-amber-900 rounded px-0.5">
          {text.slice(index, index + searchQuery.length)}
        </span>
        {text.slice(index + searchQuery.length)}
      </>
    );
  };

  return (
    <button
      onClick={onSelect}
      className={cn(
        "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-all",
        isSelected 
          ? "bg-primary/10 border border-primary/30" 
          : "hover:bg-gray-50 border border-transparent"
      )}
    >
      <div className={cn(
        "p-1.5 rounded-lg",
        isSelected ? "bg-amber-100" : "bg-amber-50"
      )}>
        <Folder className="h-4 w-4 text-amber-500" />
      </div>
      <div className="flex-1 min-w-0">
        <p className={cn(
          "text-sm truncate",
          isSelected ? "font-semibold text-gray-900" : "text-gray-700"
        )}>
          {highlightMatch(folder.name)}
        </p>
        <p className="text-xs text-gray-400 truncate">{folder.path}</p>
      </div>
      <span className={cn(
        "text-xs px-2 py-0.5 rounded-full flex-shrink-0",
        isSelected ? "bg-primary/20 text-primary" : "bg-gray-100 text-gray-500"
      )}>
        {folder.fileCount}
      </span>
    </button>
  );
}

// Tree View Components
interface FolderTreeViewProps {
  folders: DataRoomFolder[];
  selectedFolder: DataRoomFolder | null;
  onSelectFolder: (folder: DataRoomFolder) => void;
  expandedFolders: Set<string>;
  onToggleExpand: (folderId: string) => void;
  level: number;
}

function FolderTreeView({ 
  folders, 
  selectedFolder, 
  onSelectFolder, 
  expandedFolders,
  onToggleExpand,
  level 
}: FolderTreeViewProps) {
  return (
    <div className="space-y-0.5">
      {folders.map((folder) => (
        <FolderTreeNode
          key={folder.id}
          folder={folder}
          selectedFolder={selectedFolder}
          onSelectFolder={onSelectFolder}
          expandedFolders={expandedFolders}
          onToggleExpand={onToggleExpand}
          level={level}
        />
      ))}
    </div>
  );
}

interface FolderTreeNodeProps {
  folder: DataRoomFolder;
  selectedFolder: DataRoomFolder | null;
  onSelectFolder: (folder: DataRoomFolder) => void;
  expandedFolders: Set<string>;
  onToggleExpand: (folderId: string) => void;
  level: number;
}

function FolderTreeNode({ 
  folder, 
  selectedFolder, 
  onSelectFolder, 
  expandedFolders,
  onToggleExpand,
  level 
}: FolderTreeNodeProps) {
  const hasChildren = folder.children.length > 0;
  const isSelected = selectedFolder?.id === folder.id;
  const isExpanded = expandedFolders.has(folder.id);

  return (
    <div>
      <div
        className={cn(
          "flex items-center gap-2 py-2 px-2 rounded-lg cursor-pointer transition-all duration-200 group",
          isSelected 
            ? "bg-primary/10 border border-primary/30 shadow-sm" 
            : "hover:bg-gray-50 border border-transparent"
        )}
        style={{ paddingLeft: `${level * 12 + 8}px` }}
        onClick={() => onSelectFolder(folder)}
      >
        {hasChildren ? (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleExpand(folder.id);
            }}
            className={cn(
              "p-1 rounded-md transition-colors hover:bg-gray-200/80",
              isExpanded ? "rotate-0" : ""
            )}
          >
            {isExpanded ? (
              <ChevronDown className={cn(
                "h-3.5 w-3.5 transition-colors",
                isSelected ? "text-primary" : "text-gray-400"
              )} />
            ) : (
              <ChevronRight className={cn(
                "h-3.5 w-3.5 transition-colors",
                isSelected ? "text-primary" : "text-gray-400"
              )} />
            )}
          </button>
        ) : (
          <span className="w-[22px]" />
        )}

        <div className={cn(
          "p-1 rounded-md transition-colors",
          isSelected ? "bg-amber-100" : "bg-amber-50 group-hover:bg-amber-100/80"
        )}>
          {isExpanded && hasChildren ? (
            <FolderOpen className="h-4 w-4 text-amber-500" />
          ) : (
            <Folder className="h-4 w-4 text-amber-500" />
          )}
        </div>

        <span className={cn(
          "text-sm truncate flex-1 transition-colors",
          isSelected ? "font-semibold text-gray-900" : "text-gray-700 group-hover:text-gray-900"
        )}>
          {folder.name}
        </span>

        <span className={cn(
          "text-xs px-1.5 py-0.5 rounded-full transition-all min-w-[24px] text-center",
          isSelected 
            ? "bg-primary/20 text-primary font-medium" 
            : "text-gray-400 group-hover:bg-gray-100 group-hover:text-gray-600"
        )}>
          {folder.fileCount}
        </span>
      </div>

      {isExpanded && hasChildren && (
        <div className="relative">
          <div 
            className="absolute left-0 top-0 bottom-0 w-px bg-gray-200"
            style={{ marginLeft: `${level * 12 + 18}px` }}
          />
          <FolderTreeView
            folders={folder.children}
            selectedFolder={selectedFolder}
            onSelectFolder={onSelectFolder}
            expandedFolders={expandedFolders}
            onToggleExpand={onToggleExpand}
            level={level + 1}
          />
        </div>
      )}
    </div>
  );
}
