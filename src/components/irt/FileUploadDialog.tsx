import { useState, useCallback } from "react";
import { 
  Upload, 
  FileText, 
  X, 
  Loader2, 
  CheckCircle2,
  Sparkles,
  ChevronDown,
  ChevronRight,
  AlertCircle,
  Clock
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
  allItems: IRTItem[];
  onFilesProcessed: (matches: { itemId: string; file: MatchedFile }[]) => void;
}

type ProcessingStatus = "idle" | "uploading" | "analyzing" | "matching" | "complete";

interface MatchGroup {
  score: "High" | "Medium" | "Low";
  matches: { itemId: string; file: MatchedFile; item?: IRTItem }[];
}

export function FileUploadDialog({ 
  open, 
  onOpenChange,
  allItems,
  onFilesProcessed
}: FileUploadDialogProps) {
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [status, setStatus] = useState<ProcessingStatus>("idle");
  const [progress, setProgress] = useState(0);
  const [matches, setMatches] = useState<{ itemId: string; file: MatchedFile }[]>([]);
  const [isDragOver, setIsDragOver] = useState(false);
  const [expandedScores, setExpandedScores] = useState<string[]>(["High", "Medium", "Low"]);

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

  const generateRationale = (file: UploadedFile, item: IRTItem, score: "High" | "Medium" | "Low"): string => {
    const fileName = file.name.toLowerCase();
    const request = item.request.toLowerCase();
    const subject = item.subject.toLowerCase();
    
    const rationales = {
      High: [
        `Document "${file.name}" contains direct references to ${item.subject} with matching data structures and terminology aligned with the request.`,
        `Strong correlation detected: File naming convention and content metadata closely align with "${item.subject}" - ${item.request.slice(0, 50)}...`,
        `High confidence match: "${file.name}" appears to be a primary source document specifically addressing this information request.`,
      ],
      Medium: [
        `Partial match: "${file.name}" contains related information for ${item.subject} but may require additional documentation for complete coverage.`,
        `Moderate relevance detected: File appears to contain supporting data for "${item.subject}" request, recommend manual verification.`,
        `Some overlap identified: Document covers related topics to ${item.subject}, but scope may not fully satisfy the request.`,
      ],
      Low: [
        `Possible tangential relevance: "${file.name}" may contain supplementary information related to ${item.subject} category.`,
        `Weak correlation: File appears to be in related domain but limited direct alignment with the specific request.`,
        `Suggested for review: "${file.name}" flagged due to category proximity to ${item.subject}, but confidence is limited.`,
      ],
    };
    
    const options = rationales[score];
    return options[Math.floor(Math.random() * options.length)];
  };

  const simulateMatching = async () => {
    setStatus("uploading");
    setProgress(0);

    // Simulate upload
    for (let i = 0; i <= 30; i += 5) {
      await new Promise(r => setTimeout(r, 100));
      setProgress(i);
    }

    setStatus("analyzing");
    // Simulate analysis
    for (let i = 30; i <= 60; i += 5) {
      await new Promise(r => setTimeout(r, 150));
      setProgress(i);
    }

    setStatus("matching");
    // Simulate matching
    for (let i = 60; i <= 100; i += 5) {
      await new Promise(r => setTimeout(r, 100));
      setProgress(i);
    }

    // Generate mock matches - each file matches to 1-4 items
    const mockMatches: { itemId: string; file: MatchedFile }[] = [];
    const outstandingItems = allItems.filter(i => i.status === "Outstanding");
    
    files.forEach(file => {
      // Randomly match to 1-4 items per file
      const numMatches = Math.min(Math.floor(Math.random() * 4) + 1, outstandingItems.length);
      const shuffled = [...outstandingItems].sort(() => Math.random() - 0.5);
      
      for (let i = 0; i < numMatches; i++) {
        const item = shuffled[i];
        // Weighted random: High (40%), Medium (35%), Low (25%)
        const rand = Math.random();
        const score: MatchedFile["matchScore"] = rand < 0.4 ? "High" : rand < 0.75 ? "Medium" : "Low";
        
        mockMatches.push({
          itemId: item.id,
          file: {
            id: `match-${file.id}-${item.id}`,
            fileName: file.name,
            uploadedAt: new Date(),
            matchScore: score,
            matchRationale: generateRationale(file, item, score),
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
  };

  const handleConfirm = () => {
    onFilesProcessed(matches);
    onOpenChange(false);
    resetState();
    toast.success(`${matches.length} matches confirmed and applied`);
  };

  const resetState = () => {
    setFiles([]);
    setStatus("idle");
    setProgress(0);
    setMatches([]);
    setExpandedScores(["High", "Medium", "Low"]);
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  const toggleScoreExpand = (score: string) => {
    setExpandedScores(prev => 
      prev.includes(score) ? prev.filter(s => s !== score) : [...prev, score]
    );
  };

  // Group matches by score
  const groupedMatches: Record<string, MatchGroup> = {
    High: { score: "High", matches: [] },
    Medium: { score: "Medium", matches: [] },
    Low: { score: "Low", matches: [] },
  };

  matches.forEach(match => {
    const item = allItems.find(i => i.id === match.itemId);
    groupedMatches[match.file.matchScore].matches.push({ ...match, item });
  });

  const scoreConfig = {
    High: { 
      bg: "bg-emerald-50", 
      border: "border-emerald-200",
      badge: "bg-emerald-100 text-emerald-700 border-emerald-200",
      dot: "bg-emerald-500",
      icon: CheckCircle2,
      label: "High Confidence"
    },
    Medium: { 
      bg: "bg-amber-50", 
      border: "border-amber-200",
      badge: "bg-amber-100 text-amber-700 border-amber-200",
      dot: "bg-amber-500",
      icon: Clock,
      label: "Medium Confidence"
    },
    Low: { 
      bg: "bg-rose-50", 
      border: "border-rose-200",
      badge: "bg-rose-100 text-rose-700 border-rose-200",
      dot: "bg-rose-500",
      icon: AlertCircle,
      label: "Low Confidence"
    },
  };

  return (
    <Dialog open={open} onOpenChange={(o) => { if (!o) resetState(); onOpenChange(o); }}>
      <DialogContent className="max-w-3xl max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Upload className="h-5 w-5 text-primary" />
            Bulk Upload & Auto-Match
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
                  "border-2 border-dashed rounded-xl p-8 text-center transition-all duration-200",
                  isDragOver 
                    ? "border-primary bg-primary/5 scale-[1.02]" 
                    : "border-gray-300 hover:border-gray-400"
                )}
              >
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Upload className="h-8 w-8 text-gray-400" />
                </div>
                <p className="text-gray-600 mb-2 font-medium">
                  Drop files here for bulk upload
                </p>
                <p className="text-gray-500 text-sm mb-4">or</p>
                <label className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg cursor-pointer hover:bg-primary/90 transition-colors">
                  <FileText className="h-4 w-4" />
                  Browse Files
                  <input
                    type="file"
                    multiple
                    className="hidden"
                    onChange={handleFileInput}
                    accept=".pdf,.xlsx,.xls,.doc,.docx,.csv,.txt"
                  />
                </label>
                <p className="text-xs text-gray-400 mt-4">
                  Supported: PDF, Excel, Word, CSV, TXT • Multiple files allowed
                </p>
              </div>

              {/* File List */}
              {files.length > 0 && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-gray-700">
                      {files.length} file(s) ready to process
                    </p>
                    <Button variant="ghost" size="sm" onClick={() => setFiles([])}>
                      Clear all
                    </Button>
                  </div>
                  <div className="max-h-48 overflow-y-auto space-y-2 bg-gray-50 rounded-lg p-3">
                    {files.map(file => (
                      <div 
                        key={file.id}
                        className="flex items-center justify-between bg-white rounded-lg p-3 border border-gray-200"
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
                          className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
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
            <div className="space-y-6 py-12">
              <div className="flex flex-col items-center gap-4">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                  <Loader2 className="h-8 w-8 text-primary animate-spin" />
                </div>
                <div className="text-center">
                  <p className="font-medium text-gray-900">
                    {status === "uploading" && "Uploading files..."}
                    {status === "analyzing" && "Analyzing document content..."}
                    {status === "matching" && "Matching to information requests..."}
                  </p>
                  <p className="text-sm text-gray-500 mt-1">
                    {status === "uploading" && "Securely uploading your documents"}
                    {status === "analyzing" && "AI is extracting key information from each file"}
                    {status === "matching" && "Finding the best matches for each request item"}
                  </p>
                </div>
              </div>
              <Progress value={progress} className="h-2 max-w-md mx-auto" />
              <p className="text-center text-sm text-gray-500">{progress}% complete</p>
            </div>
          )}

          {/* Complete State with Grouped Results */}
          {status === "complete" && (
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-emerald-600 bg-emerald-50 rounded-lg p-4">
                <CheckCircle2 className="h-5 w-5" />
                <div>
                  <p className="font-medium">Analysis Complete</p>
                  <p className="text-sm text-emerald-600/80">
                    Processed {files.length} files • Found {matches.length} matches across {new Set(matches.map(m => m.itemId)).size} items
                  </p>
                </div>
              </div>
              
              {/* Grouped by Score */}
              <div className="space-y-3">
                {(["High", "Medium", "Low"] as const).map(score => {
                  const group = groupedMatches[score];
                  const config = scoreConfig[score];
                  const isExpanded = expandedScores.includes(score);
                  const Icon = config.icon;
                  
                  if (group.matches.length === 0) return null;
                  
                  return (
                    <div key={score} className={cn("rounded-xl border", config.border, config.bg)}>
                      <button
                        onClick={() => toggleScoreExpand(score)}
                        className="w-full flex items-center justify-between p-4"
                      >
                        <div className="flex items-center gap-3">
                          <div className={cn("w-8 h-8 rounded-lg flex items-center justify-center", config.badge)}>
                            <Icon className="h-4 w-4" />
                          </div>
                          <div className="text-left">
                            <p className="font-medium text-gray-900">{config.label}</p>
                            <p className="text-sm text-gray-500">{group.matches.length} matches</p>
                          </div>
                        </div>
                        {isExpanded ? (
                          <ChevronDown className="h-5 w-5 text-gray-400" />
                        ) : (
                          <ChevronRight className="h-5 w-5 text-gray-400" />
                        )}
                      </button>
                      
                      {isExpanded && (
                        <div className="px-4 pb-4 space-y-2">
                          {group.matches.map((match, idx) => (
                            <div 
                              key={idx}
                              className="bg-white rounded-lg border border-gray-200 p-4 space-y-2"
                            >
                              <div className="flex items-start justify-between gap-4">
                                <div className="flex items-start gap-3 flex-1 min-w-0">
                                  <FileText className="h-4 w-4 text-gray-400 mt-0.5 flex-shrink-0" />
                                  <div className="min-w-0">
                                    <p className="text-sm font-medium text-gray-900 truncate">
                                      {match.file.fileName}
                                    </p>
                                    <p className="text-xs text-gray-500 mt-0.5">
                                      → Item #{match.item?.number}: {match.item?.subject}
                                    </p>
                                  </div>
                                </div>
                                <Badge className={cn("flex-shrink-0", config.badge)}>
                                  <div className={cn("w-1.5 h-1.5 rounded-full mr-1.5", config.dot)} />
                                  {score}
                                </Badge>
                              </div>
                              <div className="pl-7">
                                <p className="text-xs text-gray-600 leading-relaxed">
                                  <span className="font-medium">Rationale:</span> {match.file.matchRationale}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
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
                Analyze & Match ({files.length} files)
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
                Confirm All Matches
              </Button>
            </>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}