export interface ManagementQuestion {
  id: string;
  number: string;
  category: string;
  question: string;
  subQuestions?: string[];
  status: "Pending" | "Answered" | "Partially Answered" | "Follow-up Required";
  answer?: string;
  sourceTranscript?: string;
  relatedFiles?: RelatedFile[];
}

export interface RelatedFile {
  id: string;
  fileName: string;
  path: string;
  relevanceScore: number;
  matchReason: string;
}

export interface Theme {
  id: string;
  name: string;
  description: string;
  questionIds: string[];
  relatedFiles: RelatedFile[];
  sentiment: "positive" | "neutral" | "concern";
}

export interface TranscriptUpload {
  id: string;
  fileName: string;
  uploadedAt: Date;
  meetingDate?: string;
  participants?: string[];
  processed: boolean;
}

export interface GeneratedQuestion {
  id: string;
  question: string;
  category: string;
  source: "transcript" | "follow-up" | "theme-based";
  priority: "high" | "medium" | "low";
  relatedTheme?: string;
}
