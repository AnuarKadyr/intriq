import { DataIntegrityIssue, ConfidenceScore, IssueCategory } from "@/types/dataIntegrity";

export const issueCategoryLabels: Record<IssueCategory, { label: string; color: string; bgColor: string }> = {
  incomplete: { label: "Incomplete Data", color: "text-amber-700", bgColor: "bg-amber-100" },
  "formula-error": { label: "Formula Error", color: "text-red-700", bgColor: "bg-red-100" },
  mismatch: { label: "Data Mismatch", color: "text-purple-700", bgColor: "bg-purple-100" },
  reconciliation: { label: "Reconciliation Gap", color: "text-blue-700", bgColor: "bg-blue-100" },
  "data-error": { label: "Data Error", color: "text-orange-700", bgColor: "bg-orange-100" },
};

export const initialDataIntegrityIssues: DataIntegrityIssue[] = [
  {
    id: "di-1",
    category: "mismatch",
    severity: "critical",
    status: "open",
    title: "Revenue mismatch between Financial Model and Management Accounts",
    description: "FY24 total revenue in the financial model does not match the figure reported in management accounts. Discrepancy of £247,000.",
    sources: [
      { id: "s1", fileName: "Financial Model v86.xlsx", path: "Background docs", value: "£28,450,000", reference: "Sheet 'P&L', Cell D15" },
      { id: "s2", fileName: "Management Accounts FY24.xlsx", path: "VDR downloads", value: "£28,203,000", reference: "Sheet 'Summary', Cell C8" },
    ],
    discrepancy: "£247,000 (0.87%)",
    aiSuggestions: [
      { id: "ai1", suggestion: "Use Financial Model figure (£28,450,000) as it includes Q4 adjustments", confidence: 78, rationale: "The Financial Model was updated more recently (v86) and typically includes late adjustments that may not appear in periodic management accounts." },
      { id: "ai2", suggestion: "Investigate timing differences in revenue recognition", confidence: 65, rationale: "The discrepancy may be due to cut-off differences between the two reporting periods." },
    ],
    impactedAreas: ["Valuation", "EBITDA calculation", "Revenue multiples"],
    createdAt: new Date("2025-01-10"),
  },
  {
    id: "di-2",
    category: "formula-error",
    severity: "high",
    status: "open",
    title: "EBITDA calculation excludes depreciation add-back",
    description: "The EBITDA formula in the trading update appears to exclude depreciation from the add-back calculation, understating EBITDA.",
    sources: [
      { id: "s3", fileName: "Trading Update (March'25).pdf", path: "Model update", value: "£4,100,000", reference: "Page 3, EBITDA line" },
      { id: "s4", fileName: "Financial Model v86.xlsx", path: "Background docs", value: "£4,350,000", reference: "Sheet 'P&L', Cell D42" },
    ],
    discrepancy: "£250,000 depreciation not added back",
    aiSuggestions: [
      { id: "ai3", suggestion: "Correct EBITDA to £4,350,000 by including depreciation", confidence: 92, rationale: "Standard EBITDA calculation requires adding back depreciation. The Financial Model correctly includes this." },
    ],
    impactedAreas: ["EBITDA multiples", "Debt covenants", "Deal pricing"],
    createdAt: new Date("2025-01-11"),
  },
  {
    id: "di-3",
    category: "incomplete",
    severity: "medium",
    status: "open",
    title: "Missing payroll data for Q3 FY24",
    description: "Payroll breakdown by department is missing for Q3 FY24, preventing full headcount cost analysis.",
    sources: [
      { id: "s5", fileName: "People analysis 21.03.xlsx", path: "Background docs", value: "Q3 data missing", reference: "Sheet 'Payroll by Dept'" },
    ],
    aiSuggestions: [
      { id: "ai4", suggestion: "Request Q3 payroll data from management", confidence: 85, rationale: "Direct request is the most reliable way to obtain missing data." },
      { id: "ai5", suggestion: "Interpolate from Q2 and Q4 data with 3% growth assumption", confidence: 55, rationale: "If data cannot be obtained, linear interpolation can provide an estimate, though with reduced confidence." },
    ],
    impactedAreas: ["Headcount analysis", "Cost base assessment", "Synergy calculations"],
    createdAt: new Date("2025-01-12"),
  },
  {
    id: "di-4",
    category: "reconciliation",
    severity: "high",
    status: "open",
    title: "Aged debt reconciliation gap",
    description: "Total aged debt does not reconcile to trade debtors in the balance sheet. Unreconciled difference of £312,000.",
    sources: [
      { id: "s6", fileName: "2025-02-28 Aged Debt.xlsm", path: "Balance sheet other", value: "£2,145,000", reference: "Sheet 'Summary', Total" },
      { id: "s7", fileName: "Financial Model v86.xlsx", path: "Background docs", value: "£2,457,000", reference: "Sheet 'BS', Cell C18" },
    ],
    discrepancy: "£312,000 unreconciled",
    aiSuggestions: [
      { id: "ai6", suggestion: "Check for timing differences at month-end cut-off", confidence: 72, rationale: "Balance sheet date may differ from aged debt report date." },
      { id: "ai7", suggestion: "Review provision for doubtful debts treatment", confidence: 68, rationale: "The difference may relate to how provisions are netted off in each report." },
    ],
    impactedAreas: ["Working capital adjustment", "Cash conversion", "Collection risk"],
    createdAt: new Date("2025-01-13"),
  },
  {
    id: "di-5",
    category: "data-error",
    severity: "medium",
    status: "open",
    title: "Duplicate invoice entries in revenue breakdown",
    description: "Several invoice numbers appear twice in the revenue detail, potentially overstating Q4 revenue by £89,000.",
    sources: [
      { id: "s8", fileName: "Real Estate Billing by Team.xlsx", path: "P&L other", value: "12 duplicate entries", reference: "Sheet 'Invoice Detail'" },
    ],
    discrepancy: "£89,000 potential overstatement",
    aiSuggestions: [
      { id: "ai8", suggestion: "Remove duplicate entries and adjust Q4 revenue down by £89,000", confidence: 88, rationale: "Invoice numbers should be unique. The duplicates are likely data entry errors." },
    ],
    impactedAreas: ["Q4 revenue", "Annual revenue total", "Revenue growth rate"],
    createdAt: new Date("2025-01-14"),
  },
  {
    id: "di-6",
    category: "mismatch",
    severity: "low",
    status: "open",
    title: "Employee count discrepancy between HR and payroll systems",
    description: "Headcount in HR system shows 127 employees, while payroll lists 124 active employees.",
    sources: [
      { id: "s9", fileName: "People analysis 21.03.xlsx", path: "Background docs", value: "127", reference: "Sheet 'Headcount'" },
      { id: "s10", fileName: "Detailed Staff Analysis v3.xlsx", path: "Key Files", value: "124", reference: "Sheet 'Active Staff'" },
    ],
    discrepancy: "3 employees",
    aiSuggestions: [
      { id: "ai9", suggestion: "Verify if 3 employees are contractors or on unpaid leave", confidence: 75, rationale: "HR systems often include contractors and employees on leave that payroll may exclude." },
    ],
    impactedAreas: ["Cost per head calculations", "Staffing ratios"],
    createdAt: new Date("2025-01-14"),
  },
  {
    id: "di-7",
    category: "incomplete",
    severity: "high",
    status: "open",
    title: "Bank reconciliation statements missing for January 2025",
    description: "January 2025 bank reconciliation is not available in the data room, creating a gap in cash audit trail.",
    sources: [
      { id: "s11", fileName: "Bank recs folder", path: "VDR downloads", value: "January 2025 missing", reference: "Folder structure" },
    ],
    aiSuggestions: [
      { id: "ai10", suggestion: "Request January 2025 bank reconciliation from management", confidence: 95, rationale: "This is critical for cash verification and should be requested immediately." },
    ],
    impactedAreas: ["Cash verification", "Working capital", "Audit trail"],
    createdAt: new Date("2025-01-14"),
  },
  {
    id: "di-8",
    category: "formula-error",
    severity: "medium",
    status: "open",
    title: "Accruals calculation uses incorrect period",
    description: "Accruals rollforward formula references FY23 closing balance instead of FY24 opening balance.",
    sources: [
      { id: "s12", fileName: "Accruals & Prepayments.xlsx", path: "Balance sheet other", value: "Formula error", reference: "Sheet 'Rollforward', Cell E5" },
    ],
    aiSuggestions: [
      { id: "ai11", suggestion: "Correct formula to reference FY24 opening balance", confidence: 90, rationale: "The rollforward should start with the correct opening balance for continuity." },
    ],
    impactedAreas: ["Balance sheet accuracy", "Working capital analysis"],
    createdAt: new Date("2025-01-15"),
  },
];

export const calculateConfidenceScore = (issues: DataIntegrityIssue[]): ConfidenceScore => {
  const categories: IssueCategory[] = ["incomplete", "formula-error", "mismatch", "reconciliation", "data-error"];
  
  const categoryScores = categories.map(category => {
    const categoryIssues = issues.filter(i => i.category === category);
    const resolvedCount = categoryIssues.filter(i => i.status === "resolved" || i.status === "assumption-applied").length;
    const totalCount = categoryIssues.length;
    
    // Weight by severity
    const severityWeights = { critical: 4, high: 3, medium: 2, low: 1 };
    const totalWeight = categoryIssues.reduce((sum, i) => sum + severityWeights[i.severity], 0);
    const resolvedWeight = categoryIssues
      .filter(i => i.status === "resolved" || i.status === "assumption-applied")
      .reduce((sum, i) => sum + severityWeights[i.severity], 0);
    
    const score = totalWeight === 0 ? 100 : Math.round((resolvedWeight / totalWeight) * 100);
    
    return {
      category,
      score,
      issueCount: totalCount,
      resolvedCount,
    };
  });

  // Overall score weighted by issue count and severity
  const totalIssues = issues.length;
  const severityWeights = { critical: 4, high: 3, medium: 2, low: 1 };
  const totalWeight = issues.reduce((sum, i) => sum + severityWeights[i.severity], 0);
  const resolvedWeight = issues
    .filter(i => i.status === "resolved" || i.status === "assumption-applied")
    .reduce((sum, i) => sum + severityWeights[i.severity], 0);
  
  const overall = totalWeight === 0 ? 100 : Math.round((resolvedWeight / totalWeight) * 100);

  return {
    overall,
    categories: categoryScores,
  };
};
