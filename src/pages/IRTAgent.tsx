import { useState } from "react";
import { ArrowLeft, ClipboardList } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { AppSidebar } from "@/components/AppSidebar";
import { TemplateSelector } from "@/components/irt/TemplateSelector";
import { IRTTable } from "@/components/irt/IRTTable";
import { EmailDraftDialog } from "@/components/irt/EmailDraftDialog";
import { FileUploadDialog } from "@/components/irt/FileUploadDialog";
import { TemplateUploadDialog } from "@/components/irt/TemplateUploadDialog";
import { IRTItem, IRTTemplate, MatchedFile } from "@/types/irt";

type ViewState = "select-template" | "tracker";

const IRTAgent = () => {
  const navigate = useNavigate();
  const [view, setView] = useState<ViewState>("select-template");
  const [items, setItems] = useState<IRTItem[]>([]);
  const [templateName, setTemplateName] = useState("");
  
  // Dialog states
  const [emailDialogOpen, setEmailDialogOpen] = useState(false);
  const [emailItems, setEmailItems] = useState<IRTItem[]>([]);
  const [fileDialogOpen, setFileDialogOpen] = useState(false);
  const [uploadTargetItem, setUploadTargetItem] = useState<IRTItem | undefined>();
  const [templateUploadOpen, setTemplateUploadOpen] = useState(false);

  const handleSelectTemplate = (template: IRTTemplate) => {
    setItems(template.items);
    setTemplateName(template.name);
    setView("tracker");
  };

  const handleUploadTemplate = () => {
    setTemplateUploadOpen(true);
  };

  const handleTemplateProcessed = (parsedItems: IRTItem[]) => {
    setItems(parsedItems);
    setTemplateName("Custom Template");
    setView("tracker");
  };

  const handleUploadFiles = (itemId: string) => {
    const item = items.find(i => i.id === itemId);
    setUploadTargetItem(item);
    setFileDialogOpen(true);
  };

  const handleDraftEmail = (selectedItems: IRTItem[]) => {
    setEmailItems(selectedItems);
    setEmailDialogOpen(true);
  };

  const handleUpdateStatus = (itemId: string, status: IRTItem["status"]) => {
    setItems(prev => prev.map(item => 
      item.id === itemId ? { ...item, status } : item
    ));
  };

  const handleFilesProcessed = (matches: { itemId: string; file: MatchedFile }[]) => {
    setItems(prev => prev.map(item => {
      const itemMatches = matches.filter(m => m.itemId === item.id);
      if (itemMatches.length > 0) {
        return {
          ...item,
          matchedFiles: [...item.matchedFiles, ...itemMatches.map(m => m.file)],
          status: "Received" as const,
        };
      }
      return item;
    }));
  };

  return (
    <div className="min-h-screen flex w-full bg-gray-50">
      <AppSidebar />
      
      <main className="flex-1 flex flex-col overflow-hidden ml-72">
        {/* Header */}
        <header className="border-b border-gray-200 bg-white px-8 py-6">
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => view === "tracker" ? setView("select-template") : navigate("/dashboard")}
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
                <ClipboardList className="h-5 w-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">
                  Information Request Tracker
                </h1>
                <p className="text-sm text-gray-500">
                  {view === "select-template" 
                    ? "Select or upload a template to get started" 
                    : templateName}
                </p>
              </div>
            </div>
          </div>
        </header>

        {/* Content */}
        <div className="flex-1 p-8 overflow-y-auto">
          {view === "select-template" && (
            <TemplateSelector
              onSelectTemplate={handleSelectTemplate}
              onUploadTemplate={handleUploadTemplate}
            />
          )}
          
          {view === "tracker" && (
            <IRTTable
              items={items}
              onUploadFiles={handleUploadFiles}
              onDraftEmail={handleDraftEmail}
              onUpdateStatus={handleUpdateStatus}
            />
          )}
        </div>
      </main>

      {/* Dialogs */}
      <EmailDraftDialog
        open={emailDialogOpen}
        onOpenChange={setEmailDialogOpen}
        items={emailItems}
      />
      
      <FileUploadDialog
        open={fileDialogOpen}
        onOpenChange={setFileDialogOpen}
        targetItem={uploadTargetItem}
        allItems={items}
        onFilesProcessed={handleFilesProcessed}
      />
      
      <TemplateUploadDialog
        open={templateUploadOpen}
        onOpenChange={setTemplateUploadOpen}
        onTemplateProcessed={handleTemplateProcessed}
      />
    </div>
  );
};

export default IRTAgent;
