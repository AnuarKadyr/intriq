import { ReportSection, ReportTheme, ReportSlide } from "@/types/reportGenerator";

export const fddReportSections: ReportSection[] = [
  {
    id: "executive-summary",
    name: "Executive Summary",
    description: "High-level overview of key findings, transaction details, and critical issues",
    icon: "FileText",
    isSelected: true,
    order: 1,
    subsections: [
      { id: "exec-overview", name: "Transaction Overview", isSelected: true },
      { id: "exec-kpis", name: "Key Performance Indicators", isSelected: true },
      { id: "exec-key-issues", name: "Key Financial Issues", isSelected: true },
    ],
  },
  {
    id: "headlines",
    name: "Headlines",
    description: "Key financial issues and trading performance highlights",
    icon: "Newspaper",
    isSelected: true,
    order: 2,
    subsections: [
      { id: "headlines-trading", name: "Historical Trading Performance", isSelected: true },
      { id: "headlines-issues", name: "Key Financial Issues", isSelected: true },
      { id: "headlines-outlook", name: "Outlook & Forecasts", isSelected: true },
    ],
  },
  {
    id: "quality-of-earnings",
    name: "Quality of Earnings",
    description: "Analysis of EBITDA adjustments, revenue sustainability, and margin analysis",
    icon: "TrendingUp",
    isSelected: true,
    order: 3,
    subsections: [
      { id: "qoe-adjustments", name: "EBITDA Adjustments Bridge", isSelected: true },
      { id: "qoe-revenue", name: "Revenue Analysis", isSelected: true },
      { id: "qoe-margins", name: "Margin Analysis", isSelected: true },
      { id: "qoe-costs", name: "Cost Structure", isSelected: true },
    ],
  },
  {
    id: "net-debt",
    name: "Net Debt Assessment",
    description: "Analysis of debt, cash, and debt-like items",
    icon: "Wallet",
    isSelected: true,
    order: 4,
    subsections: [
      { id: "nd-overview", name: "Net Debt Overview", isSelected: true },
      { id: "nd-adjustments", name: "Debt-like Items", isSelected: true },
      { id: "nd-cash", name: "Cash & Cash Equivalents", isSelected: true },
    ],
  },
  {
    id: "working-capital",
    name: "Working Capital",
    description: "Normalised working capital analysis and seasonality",
    icon: "RefreshCw",
    isSelected: true,
    order: 5,
    subsections: [
      { id: "wc-analysis", name: "NWC Analysis", isSelected: true },
      { id: "wc-trends", name: "Historical Trends", isSelected: true },
      { id: "wc-target", name: "Target NWC", isSelected: true },
    ],
  },
  {
    id: "supporting-analysis",
    name: "Supporting Analysis",
    description: "Detailed breakdowns of revenue, costs, and operational metrics",
    icon: "BarChart2",
    isSelected: false,
    order: 6,
    subsections: [
      { id: "sa-revenue", name: "Revenue Deep Dive", isSelected: true },
      { id: "sa-cost", name: "Cost Analysis", isSelected: true },
      { id: "sa-capex", name: "Capital Expenditure", isSelected: true },
      { id: "sa-employees", name: "Employee Analysis", isSelected: true },
    ],
  },
  {
    id: "appendices",
    name: "Appendices",
    description: "Supporting schedules, data tables, and methodology notes",
    icon: "Paperclip",
    isSelected: false,
    order: 7,
    subsections: [
      { id: "app-sources", name: "Sources & Limitations", isSelected: true },
      { id: "app-glossary", name: "Glossary", isSelected: true },
      { id: "app-schedules", name: "Supporting Schedules", isSelected: true },
    ],
  },
];

export const initialThemes: ReportTheme[] = [
  // Executive Summary Themes
  {
    id: "theme-1",
    sectionId: "executive-summary",
    title: "Strong margin recovery despite market headwinds",
    description: "Material margin improved from 34.4% (FY22) to 41.7% (LTM May-25), driven by operational efficiencies and pricing strategy optimization.",
    sentiment: "positive",
    isAccepted: true,
    impactLevel: "high",
    dataPoints: ["Material margin: 34.4% → 41.7%", "Gross margin: 7.6% → 11.6%"],
  },
  {
    id: "theme-2",
    sectionId: "executive-summary",
    title: "Record production volumes achieved",
    description: "Production volumes increased from 66k to 77k tonnes, representing strategic operational improvements.",
    sentiment: "positive",
    isAccepted: true,
    impactLevel: "high",
    dataPoints: ["Production: 66k → 77k tonnes", "+17% volume growth"],
  },
  {
    id: "theme-3",
    sectionId: "executive-summary",
    title: "LME price decline creating revenue pressure",
    description: "London Metal Exchange lead prices declined from £2,260/tonne to £1,980/tonne, impacting top-line growth despite volume increases.",
    sentiment: "warning",
    isAccepted: true,
    impactLevel: "medium",
    dataPoints: ["LME: £2,260 → £1,980/tonne", "-12.4% price decline"],
  },
  // Headlines Themes
  {
    id: "theme-4",
    sectionId: "headlines",
    title: "Management EBITDA adjustments require scrutiny",
    description: "Significant management adjustments (£6.3m in LTM May-25) include items that may warrant further due diligence review.",
    sentiment: "warning",
    isAccepted: true,
    impactLevel: "high",
    dataPoints: ["FY22: £2.6m", "FY23: £8.7m", "FY24: £6.2m", "LTM May-25: £6.3m"],
  },
  {
    id: "theme-5",
    sectionId: "headlines",
    title: "Diligence-adjusted EBITDA shows consistent growth",
    description: "Diligence-adjusted EBITDA increased from £10.0m (FY22) to £14.9m (LTM May-25), demonstrating underlying earnings capacity.",
    sentiment: "positive",
    isAccepted: true,
    impactLevel: "high",
    dataPoints: ["FY22: £10.0m", "LTM May-25: £14.9m", "+49% growth"],
  },
  // Quality of Earnings Themes
  {
    id: "theme-6",
    sectionId: "quality-of-earnings",
    title: "Revenue sustainability supported by diversified customer base",
    description: "No single customer exceeds 15% of revenue, reducing concentration risk.",
    sentiment: "positive",
    isAccepted: true,
    impactLevel: "medium",
    dataPoints: ["Top customer: <15% of revenue", "Diversified across UK/EU markets"],
  },
  {
    id: "theme-7",
    sectionId: "quality-of-earnings",
    title: "Mark-to-market adjustments create earnings volatility",
    description: "Hedging and MTM adjustments have varied significantly year-on-year, creating P&L volatility that should be considered.",
    sentiment: "neutral",
    isAccepted: true,
    impactLevel: "medium",
    dataPoints: ["FY22: -£2.1m", "FY23: +£5.5m", "FY24: +£1.6m"],
  },
  // Net Debt Themes
  {
    id: "theme-8",
    sectionId: "net-debt",
    title: "Intragroup loans require transaction consideration",
    description: "Intragroup loans of ~£14m may need to be settled or restructured as part of transaction mechanics.",
    sentiment: "warning",
    isAccepted: true,
    impactLevel: "high",
    dataPoints: ["Intragroup loans: £14.2m", "Intragroup interest payable: £0.2m"],
  },
  {
    id: "theme-9",
    sectionId: "net-debt",
    title: "Cash position shows improvement",
    description: "Cash increased from £0.2m (FY22) to £12.0m (May-25), indicating strong cash generation.",
    sentiment: "positive",
    isAccepted: true,
    impactLevel: "medium",
    dataPoints: ["FY22: £0.2m", "May-25: £12.0m"],
  },
  // Working Capital Themes
  {
    id: "theme-10",
    sectionId: "working-capital",
    title: "Working capital displays seasonality patterns",
    description: "NWC varies between 18% and 25% of revenue, with year-end typically showing higher working capital requirements.",
    sentiment: "neutral",
    isAccepted: true,
    impactLevel: "medium",
    dataPoints: ["Range: 18-25% of revenue", "72-92 days NWC"],
  },
];

export const generateInitialSlides = (
  selectedSections: ReportSection[],
  acceptedThemes: ReportTheme[]
): ReportSlide[] => {
  const slides: ReportSlide[] = [];
  let order = 0;

  // Title slide
  slides.push({
    id: "slide-title",
    sectionId: "title",
    title: "Project Reforge",
    subtitle: "Financial Due Diligence Report",
    type: "title",
    content: {
      headline: "Draft FDD Report",
      footnote: "Prepared by Hillpine Consulting",
    },
    themes: [],
    order: order++,
  });

  // Generate slides for each selected section
  selectedSections.forEach((section) => {
    const sectionThemes = acceptedThemes.filter(
      (t) => t.sectionId === section.id
    );

    // Section title slide
    slides.push({
      id: `slide-${section.id}-title`,
      sectionId: section.id,
      title: section.name,
      type: "title",
      content: {
        headline: section.name,
      },
      themes: [],
      order: order++,
    });

    // Content slides based on section type
    if (section.id === "executive-summary") {
      // KPI Overview slide
      slides.push({
        id: `slide-${section.id}-kpis`,
        sectionId: section.id,
        title: "Key Performance Indicators",
        type: "kpi",
        content: {
          kpiCards: [
            { label: "LTM Revenue", value: "£190.7m", change: "+1.5%", trend: "up" },
            { label: "Adj. EBITDA", value: "£14.9m", change: "+49%", trend: "up" },
            { label: "EBITDA Margin", value: "7.8%", change: "+2.5pp", trend: "up" },
            { label: "Net Debt", value: "£2.4m", change: "-82%", trend: "down" },
          ],
          footnote: "Source: Management information, Hillpine analysis",
        },
        themes: sectionThemes.slice(0, 2).map((t) => t.id),
        order: order++,
      });

      // Key issues summary
      slides.push({
        id: `slide-${section.id}-issues`,
        sectionId: section.id,
        title: "Key Financial Issues",
        type: "content",
        content: {
          headline: "Critical Findings Summary",
          bullets: [
            "Strong margin recovery driven by operational improvements (+7.3pp material margin)",
            "Record production volumes of 77k tonnes achieved in LTM period",
            "LME price decline of 12% offset by volume and efficiency gains",
            "Management adjustments of £6.3m require detailed review",
            "Intragroup arrangements need transaction consideration",
          ],
          footnote: "See detailed analysis in subsequent sections",
        },
        themes: sectionThemes.map((t) => t.id),
        order: order++,
      });
    }

    if (section.id === "quality-of-earnings") {
      // EBITDA Bridge
      slides.push({
        id: `slide-${section.id}-bridge`,
        sectionId: section.id,
        title: "EBITDA Adjustments Bridge",
        type: "table",
        content: {
          headline: "LTM May-25 EBITDA Reconciliation",
          tableData: {
            headers: ["£'000s", "FY22", "FY23", "FY24", "LTM May-25"],
            rows: [
              ["Reported EBITDA", "5,478", "679", "7,283", "9,510"],
              ["Management Adjustments", "2,571", "8,662", "6,206", "6,282"],
              ["Management Adj. EBITDA", "8,049", "9,341", "13,488", "15,792"],
              ["Diligence Adjustments", "1,942", "2,353", "(408)", "(930)"],
              ["Diligence Adj. EBITDA", "9,991", "11,694", "13,080", "14,862"],
            ],
          },
          footnote: "Source: Management accounts, Hillpine adjustments",
        },
        themes: sectionThemes.filter((t) => t.id === "theme-4" || t.id === "theme-5").map((t) => t.id),
        order: order++,
      });

      // Margin Analysis
      slides.push({
        id: `slide-${section.id}-margins`,
        sectionId: section.id,
        title: "Margin Analysis",
        type: "content",
        content: {
          headline: "Material & Gross Margin Trends",
          bullets: [
            "Material margin improved from 34.4% (FY22) to 41.7% (LTM May-25)",
            "Gross margin expanded from 7.6% to 11.6% over the same period",
            "Improvement driven by operational efficiencies and procurement optimization",
            "Volume growth (66k to 77k tonnes) offsetting LME price decline",
          ],
          footnote: "Excludes hedging gains/losses",
        },
        themes: sectionThemes.filter((t) => t.sentiment === "positive").map((t) => t.id),
        order: order++,
      });
    }

    if (section.id === "net-debt") {
      slides.push({
        id: `slide-${section.id}-analysis`,
        sectionId: section.id,
        title: "Net Debt Overview",
        type: "table",
        content: {
          headline: "Adjusted Net Debt Position",
          tableData: {
            headers: ["£'000s", "FY23", "FY24", "May-25"],
            rows: [
              ["Cash & Cash Equivalents", "10,817", "2,436", "11,968"],
              ["Intragroup Loans", "(14,132)", "(14,314)", "(14,170)"],
              ["Intragroup Interest", "(301)", "(289)", "(188)"],
              ["Net Debt", "(3,617)", "(12,167)", "(2,391)"],
            ],
          },
          footnote: "Negative values indicate net debt position",
        },
        themes: sectionThemes.map((t) => t.id),
        order: order++,
      });
    }

    if (section.id === "working-capital") {
      slides.push({
        id: `slide-${section.id}-analysis`,
        sectionId: section.id,
        title: "Normalised Working Capital",
        type: "content",
        content: {
          headline: "NWC Analysis & Target Setting",
          bullets: [
            "Trade working capital ranges from £38-48m (19-25% of revenue)",
            "Inventory represents largest component at £30-35m",
            "Receivables/Payables show stable collection/payment patterns",
            "Recommended target NWC: 20-22% of revenue (£38-42m)",
          ],
          kpiCards: [
            { label: "Avg NWC %", value: "21.5%", trend: "neutral" },
            { label: "NWC Days", value: "78", trend: "neutral" },
            { label: "Target NWC", value: "£40m", trend: "neutral" },
          ],
          footnote: "Based on LTM average, adjusted for seasonality",
        },
        themes: sectionThemes.map((t) => t.id),
        order: order++,
      });
    }
  });

  return slides;
};

export const sectionIcons: Record<string, string> = {
  "FileText": "FileText",
  "Newspaper": "Newspaper",
  "TrendingUp": "TrendingUp",
  "Wallet": "Wallet",
  "RefreshCw": "RefreshCw",
  "BarChart2": "BarChart2",
  "Paperclip": "Paperclip",
};
