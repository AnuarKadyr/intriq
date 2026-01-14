export interface InsightKPI {
  label: string;
  value: string;
  subLabel?: string;
  change?: string;
  trend?: "up" | "down" | "neutral";
}

export interface InsightObservation {
  id: string;
  title: string;
  description: string;
  status: "critical" | "positive" | "opportunity" | "warning";
}

export interface RiskFactor {
  id: string;
  description: string;
}

export interface InsightCard {
  id: string;
  type: "executive-summary" | "revenue-analysis" | "business-overview" | "key-observations" | "ai-analysis";
  title: string;
  icon: string;
  kpis?: InsightKPI[];
  summary?: string;
  summaryParagraphs?: string[];
  observations?: InsightObservation[];
  riskScore?: number;
  riskLevel?: "low" | "medium" | "high";
  riskFactors?: RiskFactor[];
  recommendedActions?: string[];
  suggestedQuestions: string[];
  chartData?: MonthlyData[];
  reportDate?: string;
  dataCurrency?: string;
}

export interface MonthlyData {
  month: string;
  income: number;
  expenses: number;
  scheduled: number;
}
