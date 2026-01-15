import { useState } from "react";
import { ArrowLeft, BarChart2, Search, Upload, RefreshCw } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MainLayout } from "@/components/MainLayout";
import { FolderSidebar } from "@/components/dataInventory/FolderSidebar";
import { FileList } from "@/components/dataInventory/FileList";
import { StatsOverview } from "@/components/dataInventory/StatsOverview";
import { FolderDetails } from "@/components/dataInventory/FolderDetails";
import { AIInsightsPanel } from "@/components/dataInventory/AIInsightsPanel";
import { 
  dataRoomFolders, 
  categoryStats, 
  fileTypeStats, 
  dataRoomStats,
  getAllFiles 
} from "@/data/dataRoomData";
import { DataRoomFolder } from "@/types/dataInventory";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const DataInventoryAgent = () => {
  const navigate = useNavigate();
  const [selectedFolder, setSelectedFolder] = useState<DataRoomFolder | null>(dataRoomFolders[0]);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("overview");
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const currentFiles = selectedFolder ? getAllFiles(selectedFolder) : [];
  const directFiles = selectedFolder?.files || [];
  
  // Get all files from all folders for the critical document selector
  const allDataRoomFiles = dataRoomFolders.flatMap(folder => getAllFiles(folder));

  return (
    <MainLayout>
      <div className="flex flex-col h-full">
        {/* Header */}
        <header className="border-b border-gray-200 bg-white px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => navigate("/dashboard")}
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-emerald-500 rounded-lg flex items-center justify-center">
                  <BarChart2 className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-900">
                    Data Inventory
                  </h1>
                  <p className="text-sm text-gray-500">
                    Project Aurora Data Room • {dataRoomStats.totalFiles} files • {dataRoomStats.totalSize}
                  </p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search files..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 w-64"
                />
              </div>
              <Button variant="outline" size="sm">
                <RefreshCw className="h-4 w-4 mr-2" />
                Refresh
              </Button>
              <Button size="sm">
                <Upload className="h-4 w-4 mr-2" />
                Upload Files
              </Button>
            </div>
          </div>
        </header>

        {/* Content */}
        <div className="flex-1 flex overflow-hidden">
          {/* Left Sidebar - Folder Tree */}
          <FolderSidebar
            folders={dataRoomFolders}
            selectedFolder={selectedFolder}
            onSelectFolder={setSelectedFolder}
            totalFolders={dataRoomStats.totalFolders}
            isCollapsed={isSidebarCollapsed}
            onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
          />

          {/* Main Content Area */}
          <div className="flex-1 overflow-hidden bg-gray-50">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full flex flex-col">
              <div className="px-6 pt-4 bg-white border-b border-gray-200">
                <TabsList>
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="files">Files</TabsTrigger>
                  <TabsTrigger value="insights">AI Insights</TabsTrigger>
                </TabsList>
              </div>

              <ScrollArea className="flex-1">
                <div className="p-6">
                  <TabsContent value="overview" className="m-0">
                    <StatsOverview
                      categoryStats={categoryStats}
                      fileTypeStats={fileTypeStats}
                      totalFiles={dataRoomStats.totalFiles}
                      totalSize={dataRoomStats.totalSize}
                      totalFolders={dataRoomStats.totalFolders}
                      selectedFolder={selectedFolder}
                      allFiles={allDataRoomFiles}
                    />
                  </TabsContent>

                  <TabsContent value="files" className="m-0">
                    {selectedFolder && (
                      <div className="space-y-6">
                        <FolderDetails folder={selectedFolder} />
                        {directFiles.length > 0 && (
                          <FileList 
                            files={directFiles} 
                            title={`Files in ${selectedFolder.name}`} 
                          />
                        )}
                        {directFiles.length === 0 && currentFiles.length > 0 && (
                          <FileList 
                            files={currentFiles.slice(0, 20)} 
                            title={`All files in ${selectedFolder.name} (showing first 20)`} 
                          />
                        )}
                        {directFiles.length === 0 && currentFiles.length === 0 && (
                          <FileList files={[]} title="" />
                        )}
                      </div>
                    )}
                  </TabsContent>

                  <TabsContent value="insights" className="m-0">
                    <AIInsightsPanel selectedFolder={selectedFolder} />
                  </TabsContent>
                </div>
              </ScrollArea>
            </Tabs>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default DataInventoryAgent;
