import { useState, useCallback } from "react";
import { 
  Upload, 
  FileText, 
  X, 
  Loader2, 
  CheckCircle2,
  AlertCircle,
  Sparkles
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { IRTItem, MatchedFile, UploadedFile } from "@/types/irt";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface FileUploadDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  targetItem?: IRTItem;
  allItems: IRTItem[];
  onFilesProcessed: (matches: { itemId: string; file: MatchedFile }[]) => void;
}

type ProcessingStatus = "idle" | "uploading" | "analyzing" | "matching" | "complete";

export function FileUploadDialog({ 
  open, 
  onOpenChange,
  targetItem,
  allItems,
  onFilesProcessed
}: FileUploadDialogProps) {
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [status, setStatus] = useState<ProcessingStatus>("idle");
  const [progress, setProgress] = useState(0);
  const [matches, setMatches] = useState<{ itemId: string; file: MatchedFile }[]>([]);
  const [isDragOver, setIsDragOver] = useState(false);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const droppedFiles = Array.from(e.dataTransfer.files);
    const newFiles: UploadedFile[] = droppedFiles.map((file, idx) => ({
      id: `file-${Date.now()}-${idx}`,
      name: file.name,
      size: file.size,
      type: file.type,
      uploadedAt: new Date(),
    }));
    
    setFiles(prev => [...prev, ...newFiles]);
  }, []);

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files);
      const newFiles: UploadedFile[] = selectedFiles.map((file, idx) => ({
        id: `file-${Date.now()}-${idx}`,
        name: file.name,
        size: file.size,
        type: file.type,
        uploadedAt: new Date(),
      }));
      setFiles(prev => [...prev, ...newFiles]);
    }
  };

  const removeFile = (fileId: string) => {
    setFiles(prev => prev.filter(f => f.id !== fileId));
  };

  const simulateMatching = async () => {
    setStatus("uploading");
    setProgress(0);

    // Simulate upload
    for (let i = 0; i <= 30; i += 10) {
      await new Promise(r => setTimeout(r, 200));
      setProgress(i);
    }

    setStatus("analyzing");
    // Simulate analysis
    for (let i = 30; i <= 60; i += 10) {
      await new Promise(r => setTimeout(r, 300));
      setProgress(i);
    }

    setStatus("matching");
    // Simulate matching
    for (let i = 60; i <= 100; i += 10) {
      await new Promise(r => setTimeout(r, 200));
      setProgress(i);
    }

    // Generate mock matches
    const mockMatches: { itemId: string; file: MatchedFile }[] = [];
    const itemsToMatch = targetItem ? [targetItem] : allItems.filter(i => i.status === "Outstanding").slice(0, 5);
    
    files.forEach(file => {
      // Randomly match to 1-3 items
      const numMatches = Math.min(Math.floor(Math.random() * 3) + 1, itemsToMatch.length);
      const shuffled = [...itemsToMatch].sort(() => Math.random() - 0.5);
      
      for (let i = 0; i < numMatches; i++) {
        const item = shuffled[i];
        const scores: MatchedFile["matchScore"][] = ["High", "Medium", "Low"];
        const score = scores[Math.floor(Math.random() * scores.length)];
        
        const rationales = {
          High: `Strong keyword match: "${file.name}" directly relates to "${item.subject}" requirements`,
          Medium: `Partial match: File appears to contain relevant ${item.subject} data`,
          Low: `Possible match: Some overlap with ${item.subject} category detected`,
        };
        
        mockMatches.push({
          itemId: item.id,
          file: {
            id: `match-${file.id}-${item.id}`,
            fileName: file.name,
            uploadedAt: new Date(),
            matchScore: score,
            matchRationale: rationales[score],
          }
        });
      }
    });

    setMatches(mockMatches);
    setStatus("complete");
  };

  const handleProcess = async () => {
    if (files.length === 0) {
      toast.error("Please upload at least one file");
      return;
    }
    
    await simulateMatching();
    toast.success(`Processed ${files.length} files with ${matches.length} matches found`);
  };

  const handleConfirm = () => {
    onFilesProcessed(matches);
    onOpenChange(false);
    resetState();
    toast.success("Files matched successfully");
  };

  const resetState = () => {
    setFiles([]);
    setStatus("idle");
    setProgress(0);
    setMatches([]);
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  return (
    <Dialog open={open} onOpenChange={(o) => { if (!o) resetState(); onOpenChange(o); }}>
      <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Upload className="h-5 w-5 text-primary" />
            Upload Files
            {targetItem && (
              <Badge variant="secondary" className="ml-2 font-normal">
                Item #{targetItem.number}: {targetItem.subject}
              </Badge>
            )}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {status === "idle" && (
            <>
              {/* Drop Zone */}
              <div
                onDragOver={(e) => { e.preventDefault(); setIsDragOver(true); }}
                onDragLeave={() => setIsDragOver(false)}
                onDrop={handleDrop}
                className={cn(
                  "border-2 border-dashed rounded-lg p-8 text-center transition-colors",
                  isDragOver 
                    ? "border-primary bg-primary/5" 
                    : "border-gray-300 hover:border-gray-400"
                )}
              >
                <Upload className="h-10 w-10 text-gray-400 mx-auto mb-3" />
                <p className="text-gray-600 mb-2">
                  Drag and drop files here, or{" "}
                  <label className="text-primary hover:underline cursor-pointer">
                    browse
                    <input
                      type="file"
                      multiple
                      className="hidden"
                      onChange={handleFileInput}
                      accept=".pdf,.xlsx,.xls,.doc,.docx,.csv,.txt"
                    />
                  </label>
                </p>
                <p className="text-xs text-gray-400">
                  Supported: PDF, Excel, Word, CSV, TXT
                </p>
              </div>

              {/* File List */}
              {files.length > 0 && (
                <div className="space-y-2">
                  <p className="text-sm font-medium text-gray-700">
                    {files.length} file(s) selected
                  </p>
                  <div className="max-h-48 overflow-y-auto space-y-2">
                    {files.map(file => (
                      <div 
                        key={file.id}
                        className="flex items-center justify-between bg-gray-50 rounded-lg p-3"
                      >
                        <div className="flex items-center gap-3">
                          <FileText className="h-5 w-5 text-gray-400" />
                          <div>
                            <p className="text-sm font-medium text-gray-900">{file.name}</p>
                            <p className="text-xs text-gray-500">{formatFileSize(file.size)}</p>
                          </div>
                        </div>
                        <button 
                          onClick={() => removeFile(file.id)}
                          className="p-1 hover:bg-gray-200 rounded"
                        >
                          <X className="h-4 w-4 text-gray-400" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}

          {/* Processing State */}
          {(status === "uploading" || status === "analyzing" || status === "matching") && (
            <div className="space-y-4 py-8">
              <div className="flex items-center justify-center gap-3">
                <Loader2 className="h-6 w-6 text-primary animate-spin" />
                <p className="text-gray-600">
                  {status === "uploading" && "Uploading files..."}
                  {status === "analyzing" && "Analyzing content with AI..."}
                  {status === "matching" && "Matching to requests..."}
                </p>
              </div>
              <Progress value={progress} className="h-2" />
              <p className="text-center text-sm text-gray-500">{progress}% complete</p>
            </div>
          )}

          {/* Complete State */}
          {status === "complete" && (
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-emerald-600 bg-emerald-50 rounded-lg p-3">
                <CheckCircle2 className="h-5 w-5" />
                <p className="font-medium">Analysis Complete</p>
              </div>
              
              <div className="space-y-3">
                <p className="text-sm font-medium text-gray-700">
                  <Sparkles className="h-4 w-4 inline mr-1 text-primary" />
                  {matches.length} matches found across {files.length} files
                </p>
                
                <div className="max-h-64 overflow-y-auto space-y-2">
                  {matches.map((match, idx) => {
                    const item = allItems.find(i => i.id === match.itemId);
                    const scoreColors = {
                      High: "bg-emerald-100 text-emerald-700",
                      Medium: "bg-amber-100 text-amber-700",
                      Low: "bg-rose-100 text-rose-700",
                    };
                    
                    return (
                      <div 
                        key={idx}
                        className="bg-gray-50 rounded-lg p-3 space-y-2"
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex items-center gap-2">
                            <FileText className="h-4 w-4 text-gray-400" />
                            <span className="text-sm font-medium text-gray-900">
                              {match.file.fileName}
                            </span>
                          </div>
                          <Badge className={cn("gap-1", scoreColors[match.file.matchScore])}>
                            {match.file.matchScore}
                          </Badge>
                        </div>
                        <div className="pl-6">
                          <p className="text-xs text-gray-500">
                            Matched to: <strong>#{item?.number}</strong> - {item?.subject}
                          </p>
                          <p className="text-xs text-gray-400 mt-1">
                            {match.file.matchRationale}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </div>

        <DialogFooter>
          {status === "idle" && (
            <>
              <Button variant="outline" onClick={() => onOpenChange(false)}>
                Cancel
              </Button>
              <Button onClick={handleProcess} disabled={files.length === 0} className="gap-2">
                <Sparkles className="h-4 w-4" />
                Analyze & Match
              </Button>
            </>
          )}
          {status === "complete" && (
            <>
              <Button variant="outline" onClick={resetState}>
                Upload More
              </Button>
              <Button onClick={handleConfirm} className="gap-2">
                <CheckCircle2 className="h-4 w-4" />
                Confirm Matches
              </Button>
            </>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
