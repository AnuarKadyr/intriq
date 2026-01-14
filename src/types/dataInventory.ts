export interface DataRoomFile {
  id: string;
  name: string;
  path: string;
  type: "PDF Document" | "Excel Workbook" | "Word Document" | "Excel Spreadsheet (Legacy)" | "Excel Macro-Enabled" | "Unknown";
  size: string;
  pages?: number;
  category: "Financial" | "Legal" | "Commercial" | "HR" | "Tax" | "Other";
  priority: "HIGH" | "MEDIUM" | "LOW";
  summary: string;
}

export interface DataRoomFolder {
  id: string;
  name: string;
  path: string;
  priority: "HIGH" | "MEDIUM" | "LOW";
  description: string;
  fileCount: number;
  children: DataRoomFolder[];
  files: DataRoomFile[];
}

export interface CategoryStats {
  category: string;
  count: number;
  priority: "HIGH" | "MEDIUM" | "LOW";
  color: string;
}

export interface FileTypeStats {
  type: string;
  count: number;
  color: string;
}
