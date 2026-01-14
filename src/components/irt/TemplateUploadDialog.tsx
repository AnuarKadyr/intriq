import { useState, useCallback } from "react";
import { Upload, FileSpreadsheet, X, Loader2, CheckCircle2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { IRTItem } from "@/types/irt";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface TemplateUploadDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onTemplateProcessed: (items: IRTItem[]) => void;
}

export function TemplateUploadDialog({ 
  open, 
  onOpenChange,
  onTemplateProcessed
}: TemplateUploadDialogProps) {
  const [file, setFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isDragOver, setIsDragOver] = useState(false);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile && (
      droppedFile.name.endsWith('.xlsx') || 
      droppedFile.name.endsWith('.xls') || 
      droppedFile.name.endsWith('.pdf')
    )) {
      setFile(droppedFile);
    } else {
      toast.error("Please upload an Excel or PDF file");
    }
  }, []);

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const processTemplate = async () => {
    if (!file) return;
    
    setIsProcessing(true);
    setProgress(0);

    // Simulate processing
    for (let i = 0; i <= 100; i += 10) {
      await new Promise(r => setTimeout(r, 300));
      setProgress(i);
    }

    // Generate mock parsed items
    const mockItems: IRTItem[] = [
      {
        id: "custom-1",
        number: "1",
        subject: "General",
        request: "Organizational chart and corporate structure",
        status: "Outstanding",
        internalRef: "C-1",
        dataroomRef: "",
        supportingNotes: "",
        comments: "",
        matchedFiles: [],
      },
      {
        id: "custom-2",
        number: "2",
        subject: "Finance",
        request: "Audited financial statements for past 3 years",
        status: "Outstanding",
        internalRef: "C-2",
        dataroomRef: "",
        supportingNotes: "",
        comments: "",
        matchedFiles: [],
      },
      {
        id: "custom-3",
        number: "3",
        subject: "Legal",
        request: "All material contracts and agreements",
        status: "Outstanding",
        internalRef: "C-3",
        dataroomRef: "",
        supportingNotes: "",
        comments: "",
        matchedFiles: [],
      },
      {
        id: "custom-4",
        number: "4",
        subject: "Operations",
        request: "Key customer and supplier agreements",
        status: "Outstanding",
        internalRef: "C-4",
        dataroomRef: "",
        supportingNotes: "",
        comments: "",
        matchedFiles: [],
      },
      {
        id: "custom-5",
        number: "5",
        subject: "HR",
        request: "Employee roster with compensation details",
        status: "Outstanding",
        internalRef: "C-5",
        dataroomRef: "",
        supportingNotes: "",
        comments: "",
        matchedFiles: [],
      },
    ];

    setIsProcessing(false);
    onTemplateProcessed(mockItems);
    onOpenChange(false);
    toast.success(`Template processed: ${mockItems.length} items extracted`);
    resetState();
  };

  const resetState = () => {
    setFile(null);
    setIsProcessing(false);
    setProgress(0);
  };

  return (
    <Dialog open={open} onOpenChange={(o) => { if (!o) resetState(); onOpenChange(o); }}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileSpreadsheet className="h-5 w-5 text-primary" />
            Upload Custom Template
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {!isProcessing && (
            <div
              onDragOver={(e) => { e.preventDefault(); setIsDragOver(true); }}
              onDragLeave={() => setIsDragOver(false)}
              onDrop={handleDrop}
              className={cn(
                "border-2 border-dashed rounded-lg p-8 text-center transition-colors",
                isDragOver 
                  ? "border-primary bg-primary/5" 
                  : file 
                    ? "border-emerald-300 bg-emerald-50" 
                    : "border-gray-300 hover:border-gray-400"
              )}
            >
              {file ? (
                <div className="flex items-center justify-center gap-3">
                  <CheckCircle2 className="h-8 w-8 text-emerald-500" />
                  <div className="text-left">
                    <p className="font-medium text-gray-900">{file.name}</p>
                    <p className="text-sm text-gray-500">
                      {(file.size / 1024).toFixed(1)} KB
                    </p>
                  </div>
                  <button 
                    onClick={() => setFile(null)}
                    className="p-1 hover:bg-emerald-100 rounded ml-2"
                  >
                    <X className="h-4 w-4 text-gray-400" />
                  </button>
                </div>
              ) : (
                <>
                  <Upload className="h-10 w-10 text-gray-400 mx-auto mb-3" />
                  <p className="text-gray-600 mb-2">
                    Drag and drop your template, or{" "}
                    <label className="text-primary hover:underline cursor-pointer">
                      browse
                      <input
                        type="file"
                        className="hidden"
                        onChange={handleFileInput}
                        accept=".xlsx,.xls,.pdf"
                      />
                    </label>
                  </p>
                  <p className="text-xs text-gray-400">
                    Supported: Excel (.xlsx, .xls) or PDF
                  </p>
                </>
              )}
            </div>
          )}

          {isProcessing && (
            <div className="space-y-4 py-4">
              <div className="flex items-center justify-center gap-3">
                <Loader2 className="h-6 w-6 text-primary animate-spin" />
                <p className="text-gray-600">
                  Processing and extracting items from template...
                </p>
              </div>
              <Progress value={progress} className="h-2" />
              <p className="text-center text-sm text-gray-500">{progress}% complete</p>
            </div>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button 
            onClick={processTemplate} 
            disabled={!file || isProcessing}
            className="gap-2"
          >
            {isProcessing ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <FileSpreadsheet className="h-4 w-4" />
            )}
            Process Template
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
