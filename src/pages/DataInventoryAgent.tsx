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
                    <div className="space-y-6">
                      {selectedFolder && <FolderDetails folder={selectedFolder} />}
                      <StatsOverview
                        categoryStats={categoryStats}
                        fileTypeStats={fileTypeStats}
                        totalFiles={dataRoomStats.totalFiles}
                        totalSize={dataRoomStats.totalSize}
                        totalFolders={dataRoomStats.totalFolders}
                      />
                    </div>
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
                    <div className="space-y-4">
                      {selectedFolder && <FolderDetails folder={selectedFolder} />}
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-white rounded-xl border border-gray-200 p-5">
                          <h3 className="text-sm font-semibold text-gray-900 mb-3">Key Observations</h3>
                          <ul className="space-y-2 text-sm text-gray-600">
                            <li className="flex items-start gap-2">
                              <span className="w-1.5 h-1.5 rounded-full bg-red-500 mt-1.5 flex-shrink-0" />
                              <span>36 financial documents require priority review including P&L, balance sheet, and statutory accounts</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 flex-shrink-0" />
                              <span>16 legal documents identified covering Heads of Terms, SLAs, and IP registrations</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 flex-shrink-0" />
                              <span>10 HR documents include detailed staff analysis and payroll information</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <span className="w-1.5 h-1.5 rounded-full bg-purple-500 mt-1.5 flex-shrink-0" />
                              <span>4 tax documents covering VAT returns for 2022-2025</span>
                            </li>
                          </ul>
                        </div>
                        
                        <div className="bg-white rounded-xl border border-gray-200 p-5">
                          <h3 className="text-sm font-semibold text-gray-900 mb-3">Data Quality Notes</h3>
                          <ul className="space-y-2 text-sm text-gray-600">
                            <li className="flex items-start gap-2">
                              <span className="w-1.5 h-1.5 rounded-full bg-red-500 mt-1.5 flex-shrink-0" />
                              <span>3 files flagged with integrity issues requiring re-upload</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 flex-shrink-0" />
                              <span>Password-protected payroll files may need credentials for analysis</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <span className="w-1.5 h-1.5 rounded-full bg-green-500 mt-1.5 flex-shrink-0" />
                              <span>Financial models are up-to-date (v95 through March 2025)</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <span className="w-1.5 h-1.5 rounded-full bg-green-500 mt-1.5 flex-shrink-0" />
                              <span>Bank reconciliations complete through February 2025</span>
                            </li>
                          </ul>
                        </div>
                      </div>

                      <div className="bg-white rounded-xl border border-gray-200 p-5">
                        <h3 className="text-sm font-semibold text-gray-900 mb-3">Folder Contents Summary</h3>
                        <p className="text-sm text-gray-600 leading-relaxed">
                          The <strong>Project Aurora</strong> data room contains comprehensive due diligence 
                          materials for the acquisition of Target Co. The structure follows 
                          a hierarchical organization with primary categories including background 
                          documentation, VDR downloads organized by date, and specialized folders for 
                          P&L analysis, balance sheet items, and statutory accounts. Notable coded 
                          folder names like "140425" represent dates (April 14, 2025) for VDR 
                          snapshot downloads. The IP Supporting Documents folder contains European 
                          and international patent/trademark office correspondence essential for 
                          the legal IP due diligence workstream.
                        </p>
                      </div>
                    </div>
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
