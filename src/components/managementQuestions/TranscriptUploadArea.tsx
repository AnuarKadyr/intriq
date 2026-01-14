import { useState, useRef } from "react";
import { Upload, FileText, CheckCircle2, Loader2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TranscriptUpload } from "@/types/managementQuestions";
import { cn } from "@/lib/utils";

interface TranscriptUploadAreaProps {
  transcripts: TranscriptUpload[];
  onUpload: (files: File[]) => void;
  isProcessing: boolean;
}

export function TranscriptUploadArea({ transcripts, onUpload, isProcessing }: TranscriptUploadAreaProps) {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      onUpload(files);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 0) {
      onUpload(files);
    }
  };

  return (
    <Card className="p-4">
      <h3 className="text-sm font-semibold text-gray-900 mb-3">Management Transcripts</h3>
      
      {/* Upload Area */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={cn(
          "border-2 border-dashed rounded-lg p-6 text-center transition-colors cursor-pointer",
          isDragging ? "border-primary bg-primary/5" : "border-gray-200 hover:border-gray-300",
          isProcessing && "pointer-events-none opacity-50"
        )}
        onClick={() => fileInputRef.current?.click()}
      >
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept=".pdf,.docx,.txt,.doc"
          onChange={handleFileSelect}
          className="hidden"
        />
        
        {isProcessing ? (
          <div className="flex flex-col items-center gap-2">
            <Loader2 className="h-8 w-8 text-primary animate-spin" />
            <p className="text-sm font-medium text-gray-900">Processing transcripts...</p>
            <p className="text-xs text-gray-500">Extracting answers and generating insights</p>
          </div>
        ) : (
          <>
            <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Upload className="h-6 w-6 text-gray-400" />
            </div>
            <p className="text-sm font-medium text-gray-900 mb-1">Upload Transcripts</p>
            <p className="text-xs text-gray-500">
              Drag & drop or click to upload management meeting transcripts
            </p>
            <p className="text-xs text-gray-400 mt-2">PDF, DOCX, TXT supported</p>
          </>
        )}
      </div>

      {/* Uploaded Transcripts */}
      {transcripts.length > 0 && (
        <div className="mt-4 space-y-2">
          <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Uploaded Files</p>
          {transcripts.map(transcript => (
            <div 
              key={transcript.id}
              className="flex items-center gap-3 p-2 bg-gray-50 rounded-lg"
            >
              <div className={cn(
                "w-8 h-8 rounded-lg flex items-center justify-center",
                transcript.processed ? "bg-emerald-100" : "bg-gray-200"
              )}>
                {transcript.processed ? (
                  <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                ) : (
                  <FileText className="h-4 w-4 text-gray-500" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">{transcript.fileName}</p>
                <p className="text-xs text-gray-500">
                  {transcript.processed ? "Processed" : "Processing..."}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
}
