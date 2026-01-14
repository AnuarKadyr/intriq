export type IssueCategory = 
  | "incomplete" 
  | "formula-error" 
  | "mismatch" 
  | "reconciliation" 
  | "data-error";

export type IssueSeverity = "critical" | "high" | "medium" | "low";

export type IssueStatus = "open" | "assumption-applied" | "resolved" | "ignored";

export interface DataSource {
  id: string;
  fileName: string;
  path: string;
  value: string | number;
  reference: string;
}

export interface AISuggestion {
  id: string;
  suggestion: string;
  confidence: number;
  rationale: string;
}

export interface Assumption {
  id: string;
  description: string;
  appliedValue: string | number;
  appliedBy: string;
  appliedAt: Date;
  rationale: string;
}

export interface DataIntegrityIssue {
  id: string;
  category: IssueCategory;
  severity: IssueSeverity;
  status: IssueStatus;
  title: string;
  description: string;
  sources: DataSource[];
  discrepancy?: string;
  aiSuggestions: AISuggestion[];
  assumption?: Assumption;
  impactedAreas: string[];
  createdAt: Date;
  resolvedAt?: Date;
}

export interface ConfidenceScore {
  overall: number;
  categories: {
    category: IssueCategory;
    score: number;
    issueCount: number;
    resolvedCount: number;
  }[];
}
