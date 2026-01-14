import { ManagementQuestion, Theme, GeneratedQuestion } from "@/types/managementQuestions";

export const managementQuestionCategories = [
  { id: "revenue", name: "Revenue Recognition & Quality", color: "#3B82F6" },
  { id: "direct-costs", name: "Direct Costs & Gross Margin", color: "#10B981" },
  { id: "opex", name: "Operating Expenses & Normalisation", color: "#8B5CF6" },
  { id: "qoe", name: "QoE Adjustments", color: "#F59E0B" },
  { id: "carve-out", name: "Carve-Out Considerations", color: "#EF4444" },
  { id: "working-capital", name: "Working Capital & Cash Flow", color: "#06B6D4" },
  { id: "data-quality", name: "Data Quality & Limitations", color: "#EC4899" },
  { id: "forward-looking", name: "Forward-Looking Questions", color: "#6366F1" },
];

export const initialManagementQuestions: ManagementQuestion[] = [
  // Revenue Recognition & Quality
  {
    id: "mq-1",
    number: "1",
    category: "Revenue Recognition & Quality",
    question: "Please provide detailed revenue recognition policies for each stream (Tuition/Residence/Homestay/Services) with examples of actual bookings showing how revenue is deferred and recognized.",
    subQuestions: [
      "Are there any instances where policy application changed over the historical period (e.g., around COVID, new systems, acquisition)?",
    ],
    status: "Pending",
  },
  {
    id: "mq-2",
    number: "2",
    category: "Revenue Recognition & Quality",
    question: "Please break down agent vs partner-school commission revenue and explain drivers of changes in commission rates year-on-year.",
    subQuestions: [
      "How do you validate completeness of partner reporting for commissionable activity?",
    ],
    status: "Pending",
  },
  {
    id: "mq-3",
    number: "3",
    category: "Revenue Recognition & Quality",
    question: "Please reconcile deferred revenue balances to forward bookings at each period-end.",
    subQuestions: [
      "What is the historical conversion rate of deferred revenue into delivered weeks?",
      "Any meaningful expiry or cancellation trends?",
    ],
    status: "Pending",
  },
  {
    id: "mq-4",
    number: "4",
    category: "Revenue Recognition & Quality",
    question: "Discounts reached 20–22% of tuition revenue in several periods. What commercial policies govern discounting?",
    subQuestions: [
      "Who approves discounts above standard thresholds?",
      "How much of discounting was tactical to fill under-utilised schools vs structural pricing pressure?",
      "Provide analysis of discounting by product, school, and channel (B2C/B2B).",
    ],
    status: "Pending",
  },
  {
    id: "mq-5",
    number: "5",
    category: "Revenue Recognition & Quality",
    question: "How are annual price increases determined, and were these fully passed through in FY23–FY24 despite wage inflation?",
    subQuestions: [
      "Provide variance analysis explaining why gross tuition per week increased but GM% decreased.",
    ],
    status: "Pending",
  },
  {
    id: "mq-6",
    number: "6",
    category: "Revenue Recognition & Quality",
    question: "Please reconcile 'produced weeks' to 'student weeks' and actual attendance.",
    subQuestions: [
      "What operational factors caused the significant decline in FY24–LTM24?",
      "What evidence supports the assumption that these weeks will return to historical norms?",
    ],
    status: "Pending",
  },
  // Direct Costs & Gross Margin
  {
    id: "mq-7",
    number: "7",
    category: "Direct Costs & Gross Margin",
    question: "Provide location-level analysis of contracted beds vs utilised beds for FY22 onward.",
    subQuestions: [
      "What contractual commitments remain in place today?",
    ],
    status: "Pending",
  },
  {
    id: "mq-8",
    number: "8",
    category: "Direct Costs & Gross Margin",
    question: "What is the homestay payment structure, and how frequently are prices reviewed?",
    subQuestions: [
      "Provide a breakdown of homestay supply availability by location and occupancy constraints.",
    ],
    status: "Pending",
  },
  {
    id: "mq-9",
    number: "9",
    category: "Direct Costs & Gross Margin",
    question: "Provide a reconciliation of teaching headcount and cost per teaching hour over the historical periods.",
    subQuestions: [
      "What portion of teaching staff are permanent vs temp?",
      "How do scheduling inefficiencies impact cost per student week?",
    ],
    status: "Pending",
  },
  {
    id: "mq-10",
    number: "10",
    category: "Direct Costs & Gross Margin",
    question: "Provide contracts for major partner schools explaining typical commission percentages, minimum guarantees, and seasonal variation.",
    subQuestions: [
      "Why did ESL revenue decline despite overall recovery in other business lines?",
    ],
    status: "Pending",
  },
  // Operating Expenses & Normalisation
  {
    id: "mq-11",
    number: "11",
    category: "Operating Expenses & Normalisation",
    question: "Which redundancies are linked to one-off restructuring vs normal business turnover?",
    subQuestions: [
      "Provide severance logs with employee role, cost, location, reason.",
    ],
    status: "Pending",
  },
  {
    id: "mq-12",
    number: "12",
    category: "Operating Expenses & Normalisation",
    question: "What annual salary inflation has been applied in forecasts?",
    subQuestions: [
      "How have London, Canada, and US wage pressures been reflected?",
    ],
    status: "Pending",
  },
  {
    id: "mq-13",
    number: "13",
    category: "Operating Expenses & Normalisation",
    question: "Was the exit from the London WeWork space truly non-recurring?",
    subQuestions: [
      "Are there remaining long leases or onerous property contracts not reflected in EBITDA adjustments?",
    ],
    status: "Pending",
  },
  {
    id: "mq-14",
    number: "14",
    category: "Operating Expenses & Normalisation",
    question: "Provide ROI analysis on digital marketing and agent commission promotions.",
    subQuestions: [
      "Are discount-driven campaigns expected to continue?",
    ],
    status: "Pending",
  },
  {
    id: "mq-15",
    number: "15",
    category: "Operating Expenses & Normalisation",
    question: "Please itemise 'Other operating expenses' by major category for each period.",
    subQuestions: [
      "Several 'one-off' legal & HR items recur in multiple periods—what makes them genuinely non-recurring?",
    ],
    status: "Pending",
  },
  // QoE Adjustments
  {
    id: "mq-16",
    number: "16",
    category: "QoE Adjustments",
    question: "Provide evidence that underlying cost structure is now stable post-restructure.",
    subQuestions: [
      "What efficiency KPIs demonstrate that benefits have been realised?",
    ],
    status: "Pending",
  },
  {
    id: "mq-17",
    number: "17",
    category: "QoE Adjustments",
    question: "Provide a schedule of each closed school with closure date, remaining lease exposure, associated wind-down costs.",
    subQuestions: [
      "Are any similar closures anticipated?",
    ],
    status: "Pending",
  },
  {
    id: "mq-18",
    number: "18",
    category: "QoE Adjustments",
    question: "Provide detailed monthly occupancy for residence beds over the last 36 months.",
    subQuestions: [
      "How is demand volatility accounted for in future procurement strategy?",
    ],
    status: "Pending",
  },
  {
    id: "mq-19",
    number: "19",
    category: "QoE Adjustments",
    question: "Break down COVID-related provisions vs structural bad debt.",
    subQuestions: [
      "Provide ageing analysis for the current AR book.",
    ],
    status: "Pending",
  },
  {
    id: "mq-20",
    number: "20",
    category: "QoE Adjustments",
    question: "Explain which accrual errors were corrected and why these were not recurring issues.",
    subQuestions: [
      "Has finance function capability been strengthened to avoid repeats?",
    ],
    status: "Pending",
  },
  // Carve-Out Considerations
  {
    id: "mq-21",
    number: "21",
    category: "Carve-Out Considerations",
    question: "Provide mapping of all intercompany revenue and cost flows removed at consolidation.",
    subQuestions: [
      "Are there any shared services currently charged by parent company that will not continue post-transaction?",
    ],
    status: "Pending",
  },
  {
    id: "mq-22",
    number: "22",
    category: "Carve-Out Considerations",
    question: "What overheads or shared services need to be rebuilt by the buyer?",
    subQuestions: [
      "Provide cost estimates and FTE requirements.",
    ],
    status: "Pending",
  },
  {
    id: "mq-23",
    number: "23",
    category: "Carve-Out Considerations",
    question: "Please provide school-level P&Ls for the last 3 years.",
    subQuestions: [
      "Are any sites chronically loss-making even before adjustments?",
    ],
    status: "Pending",
  },
  {
    id: "mq-24",
    number: "24",
    category: "Carve-Out Considerations",
    question: "Provide rationale for excluding assets/liabilities of certain carve-out entities.",
    subQuestions: [
      "What WC leakage risks exist due to timing of deferred revenue and payable deferrals?",
    ],
    status: "Pending",
  },
  // Working Capital & Cash Flow
  {
    id: "mq-25",
    number: "25",
    category: "Working Capital & Cash Flow",
    question: "Provide monthly WC bridge showing AR, AP, deferred revenue, accruals, and timing differences.",
    subQuestions: [
      "What proportion of working capital movements are structural vs execution-related?",
    ],
    status: "Pending",
  },
  {
    id: "mq-26",
    number: "26",
    category: "Working Capital & Cash Flow",
    question: "Provide full AR ageing at each year-end, including agents.",
    subQuestions: [
      "What collection issues exist in Middle East / Latin America markets?",
    ],
    status: "Pending",
  },
  {
    id: "mq-27",
    number: "27",
    category: "Working Capital & Cash Flow",
    question: "Provide complete schedule and reconciliation for unknown deposits & student refunds.",
    status: "Pending",
  },
  {
    id: "mq-28",
    number: "28",
    category: "Working Capital & Cash Flow",
    question: "What is normalised maintenance capex?",
    subQuestions: [
      "For residence arrangements, which capex items fall on the provider vs the Group?",
    ],
    status: "Pending",
  },
  // Data Quality & Limitations
  {
    id: "mq-29",
    number: "29",
    category: "Data Quality & Limitations",
    question: "Provide payroll listings reconciled to GL for FY22–LTM24.",
    subQuestions: [
      "Without this, how can teaching efficiency KPIs be validated?",
    ],
    status: "Pending",
  },
  {
    id: "mq-30",
    number: "30",
    category: "Data Quality & Limitations",
    question: "Provide reconstructed historical occupancy for accommodation data gaps.",
    subQuestions: [
      "Why is this data not readily available in the operating system?",
    ],
    status: "Pending",
  },
  {
    id: "mq-31",
    number: "31",
    category: "Data Quality & Limitations",
    question: "Provide internal cash tracking or 6-month cash forecast reconciliations.",
    status: "Pending",
  },
  {
    id: "mq-32",
    number: "32",
    category: "Data Quality & Limitations",
    question: "Please describe data systems used and reliability controls for non-English data and mixed records.",
    status: "Pending",
  },
  // Forward-Looking Questions
  {
    id: "mq-33",
    number: "33",
    category: "Forward-Looking Questions",
    question: "What forward bookings have been lost due to UK ETA rules & US visa delays?",
    subQuestions: [
      "Provide evidence that volumes will recover.",
    ],
    status: "Pending",
  },
  {
    id: "mq-34",
    number: "34",
    category: "Forward-Looking Questions",
    question: "Provide expected inflation for teachers, homestay families, and residence contracts.",
    status: "Pending",
  },
  {
    id: "mq-35",
    number: "35",
    category: "Forward-Looking Questions",
    question: "Are junior summer camps expected to continue growing as a share of revenue?",
    subQuestions: [
      "What margin differences exist vs core language courses?",
    ],
    status: "Pending",
  },
  {
    id: "mq-36",
    number: "36",
    category: "Forward-Looking Questions",
    question: "Provide synergy tracking vs acquisition case for recent acquisitions.",
    subQuestions: [
      "How stable is its standalone margin profile?",
    ],
    status: "Pending",
  },
];

export const sampleThemes: Theme[] = [
  {
    id: "theme-1",
    name: "Revenue Quality Concerns",
    description: "Questions around discounting practices, revenue recognition timing, and commission structures",
    questionIds: ["mq-1", "mq-2", "mq-3", "mq-4"],
    relatedFiles: [
      { id: "rf-1", fileName: "Financial Model v86.xlsx", path: "Background docs", relevanceScore: 95, matchReason: "Contains revenue projections and assumptions" },
      { id: "rf-2", fileName: "Trading Update (March'25).pdf", path: "Model update", relevanceScore: 88, matchReason: "Recent revenue performance data" },
    ],
    sentiment: "concern",
  },
  {
    id: "theme-2",
    name: "Cost Structure Stability",
    description: "Focus on post-restructuring cost base and ongoing wage inflation pressures",
    questionIds: ["mq-11", "mq-12", "mq-16"],
    relatedFiles: [
      { id: "rf-3", fileName: "People analysis 21.03.xlsx", path: "Background docs", relevanceScore: 92, matchReason: "Headcount and staffing analysis" },
    ],
    sentiment: "neutral",
  },
  {
    id: "theme-3",
    name: "Carve-Out Complexity",
    description: "Separation costs and standalone operating requirements",
    questionIds: ["mq-21", "mq-22", "mq-23", "mq-24"],
    relatedFiles: [],
    sentiment: "concern",
  },
];

export const sampleGeneratedQuestions: GeneratedQuestion[] = [
  {
    id: "gq-1",
    question: "Can you clarify the treatment of multi-year contracts in revenue recognition?",
    category: "Revenue Recognition & Quality",
    source: "follow-up",
    priority: "high",
    relatedTheme: "Revenue Quality Concerns",
  },
  {
    id: "gq-2",
    question: "What is the expected timeline for completing the IT systems migration post-separation?",
    category: "Carve-Out Considerations",
    source: "theme-based",
    priority: "medium",
    relatedTheme: "Carve-Out Complexity",
  },
];
