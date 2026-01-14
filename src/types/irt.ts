export interface IRTItem {
  id: string;
  number: string;
  subject: string;
  request: string;
  status: "Outstanding" | "Received" | "Uploaded" | "N/A";
  internalRef: string;
  dataroomRef: string;
  supportingNotes: string;
  comments: string;
  matchedFiles: MatchedFile[];
}

export interface MatchedFile {
  id: string;
  fileName: string;
  uploadedAt: Date;
  matchScore: "High" | "Medium" | "Low";
  matchRationale: string;
}

export interface IRTTemplate {
  id: string;
  name: string;
  description: string;
  icon: string;
  items: IRTItem[];
}

export interface UploadedFile {
  id: string;
  name: string;
  size: number;
  type: string;
  uploadedAt: Date;
}
