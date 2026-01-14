export interface ReportSection {
  id: string;
  name: string;
  description: string;
  icon: string;
  subsections?: ReportSubsection[];
  isSelected: boolean;
  order: number;
}

export interface ReportSubsection {
  id: string;
  name: string;
  isSelected: boolean;
}

export interface ReportTheme {
  id: string;
  sectionId: string;
  title: string;
  description: string;
  sentiment: "positive" | "negative" | "neutral" | "warning";
  isAccepted: boolean;
  dataPoints?: string[];
  impactLevel: "high" | "medium" | "low";
}

export interface ReportSlide {
  id: string;
  sectionId: string;
  title: string;
  subtitle?: string;
  type: "title" | "content" | "chart" | "table" | "summary" | "kpi";
  content: SlideContent;
  themes: string[]; // theme IDs applied to this slide
  order: number;
}

export interface SlideContent {
  headline?: string;
  bullets?: string[];
  tableData?: TableData;
  kpiCards?: KPICard[];
  chartType?: "bar" | "line" | "pie";
  chartData?: any;
  footnote?: string;
}

export interface TableData {
  headers: string[];
  rows: string[][];
}

export interface KPICard {
  label: string;
  value: string;
  change?: string;
  trend?: "up" | "down" | "neutral";
}

export interface SlideAmendment {
  id: string;
  slideId: string;
  type: "text" | "data" | "style" | "add" | "remove";
  description: string;
  originalValue?: string;
  newValue: string;
  appliedAt?: Date;
  status: "pending" | "applied" | "rejected";
}

export interface ReportGeneratorState {
  sections: ReportSection[];
  themes: ReportTheme[];
  slides: ReportSlide[];
  amendments: SlideAmendment[];
  currentStep: "sections" | "themes" | "slides";
  selectedSlideId: string | null;
}
