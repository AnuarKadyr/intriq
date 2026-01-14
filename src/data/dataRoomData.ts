import { DataRoomFolder, DataRoomFile, CategoryStats, FileTypeStats } from "@/types/dataInventory";

// Simulated complex folder structure with coded folder names
export const dataRoomFolders: DataRoomFolder[] = [
  {
    id: "root",
    name: "Project Aurora",
    path: "Project Aurora copy",
    priority: "HIGH",
    description: "Root data room containing all due diligence materials for the acquisition of Greenwoods Legal LLP",
    fileCount: 154,
    children: [
      {
        id: "aurora-data",
        name: "Aurora_Data",
        path: "Project Aurora copy/Aurora_Data",
        priority: "HIGH",
        description: "Core deal documentation including financial models, background materials, and VDR downloads",
        fileCount: 142,
        children: [
          {
            id: "model-update",
            name: "Model update 13.05",
            path: "Project Aurora copy/Aurora_Data/Model update 13.05",
            priority: "HIGH",
            description: "Latest financial model updates dated May 13th including trading forecasts and reforecast documents",
            fileCount: 1,
            children: [],
            files: [
              {
                id: "f1",
                name: "1.2.5 Trading Update (March'25 + Reforecast).pdf",
                path: "Project Aurora copy/Aurora_Data/Model update 13.05/1.2.5 Trading Update (March'25 + Reforecast).pdf",
                type: "PDF Document",
                size: "784.6 KB",
                category: "Financial",
                priority: "HIGH",
                summary: "March 2025 trading update and reforecast document for Project Aurora showing revised revenue projections and operational metrics."
              }
            ]
          },
          {
            id: "background-docs",
            name: "Background docs",
            path: "Project Aurora copy/Aurora_Data/Background docs",
            priority: "HIGH",
            description: "Key background documentation including investment memorandum, people analysis, and core financial models",
            fileCount: 5,
            children: [],
            files: [
              {
                id: "f2",
                name: "Project Aurora IM (FINAL).pdf",
                path: "Project Aurora copy/Aurora_Data/Background docs/Project Aurora IM (FINAL).pdf",
                type: "PDF Document",
                size: "2.9 MB",
                category: "Financial",
                priority: "HIGH",
                summary: "Final investment memorandum for Project Aurora acquisition of Greenwoods Legal LLP containing deal thesis, valuation, and investment highlights."
              },
              {
                id: "f3",
                name: "Greenwoods - GH HoT vSHARED CLARITAS.docx",
                path: "Project Aurora copy/Aurora_Data/Background docs/Greenwoods - GH HoT vSHARED CLARITAS.docx",
                type: "Word Document",
                size: "135.8 KB",
                pages: 127,
                category: "Legal",
                priority: "MEDIUM",
                summary: "Confidential investment committee document for Greenwoods Legal LLP acquisition containing Heads of Terms and transaction structure details."
              },
              {
                id: "f4",
                name: "People analysis 21.03.xlsx",
                path: "Project Aurora copy/Aurora_Data/Background docs/People analysis 21.03.xlsx",
                type: "Excel Workbook",
                size: "1.9 MB",
                pages: 18,
                category: "HR",
                priority: "MEDIUM",
                summary: "Comprehensive headcount analysis including leavers summary, tenure distribution, top billers ranking, and organizational charts as of March 21, 2025."
              },
              {
                id: "f5",
                name: "Financial Model v86 (to Feb'25) (TO SHARE).xlsx",
                path: "Project Aurora copy/Aurora_Data/Background docs/Financial Model v86 (to Feb'25) (TO SHARE).xlsx",
                type: "Excel Workbook",
                size: "6.4 MB",
                pages: 48,
                category: "Financial",
                priority: "HIGH",
                summary: "Master financial model version 86 with full P&L, balance sheet, cash flow projections, debt schedules, and deal structure through February 2025."
              },
              {
                id: "f6",
                name: "Greenwoods - Q&A 12.03.xlsx",
                path: "Project Aurora copy/Aurora_Data/Background docs/Greenwoods - Q&A 12.03.xlsx",
                type: "Excel Workbook",
                size: "176.7 KB",
                pages: 6,
                category: "Commercial",
                priority: "LOW",
                summary: "Q&A tracker containing billing data, board composition, staff roster, and key operational metrics compiled March 12, 2025."
              }
            ]
          },
          {
            id: "vdr-downloads",
            name: "VDR downloads",
            path: "Project Aurora copy/Aurora_Data/VDR downloads",
            priority: "MEDIUM",
            description: "Virtual data room downloads organized by date and category including key files, P&L, balance sheet, and statutory accounts",
            fileCount: 89,
            children: [
              {
                id: "new-info-140525",
                name: "New info 140525",
                path: "Project Aurora copy/Aurora_Data/VDR downloads/New info 140525",
                priority: "MEDIUM",
                description: "Latest VDR additions dated May 14, 2025 including updated financial models, VAT returns, and insurance documentation",
                fileCount: 11,
                children: [],
                files: [
                  {
                    id: "f7",
                    name: "1.8.1.2 OSE25090159A First excess Invoice.pdf",
                    path: "Project Aurora copy/Aurora_Data/VDR downloads/New info 140525/1.8.1.2 OSE25090159A First excess Invoice.pdf",
                    type: "PDF Document",
                    size: "66.7 KB",
                    category: "Legal",
                    priority: "LOW",
                    summary: "Insurance invoice for first excess layer claim reference OSE25090159A related to professional indemnity coverage."
                  },
                  {
                    id: "f8",
                    name: "1.2.4 Financial Model v95 (to Mar'25) (TO SHARE).xlsx",
                    path: "Project Aurora copy/Aurora_Data/VDR downloads/New info 140525/1.2.4 Financial Model v95 (to Mar'25) (TO SHARE).xlsx",
                    type: "Excel Workbook",
                    size: "7.2 MB",
                    pages: 54,
                    category: "Financial",
                    priority: "HIGH",
                    summary: "Latest financial model version 95 with updated March 2025 actuals, revised projections, and enhanced variance analysis."
                  },
                  {
                    id: "f9",
                    name: "1.7.1 January 2025 VAT Return.pdf",
                    path: "Project Aurora copy/Aurora_Data/VDR downloads/New info 140525/1.7.1 January 2025 VAT Return.pdf",
                    type: "PDF Document",
                    size: "508.0 KB",
                    category: "Tax",
                    priority: "MEDIUM",
                    summary: "UK VAT return filing for January 2025 period showing input/output VAT calculations and net position."
                  }
                ]
              },
              {
                id: "new-info-080525",
                name: "New info 080525",
                path: "Project Aurora copy/Aurora_Data/VDR downloads/New info 080525",
                priority: "MEDIUM",
                description: "VDR additions from May 8, 2025 including payroll reports and model extracts",
                fileCount: 5,
                children: [],
                files: [
                  {
                    id: "f10",
                    name: "1.2.3 Model Extract (v94) - Trading Update.xlsx",
                    path: "Project Aurora copy/Aurora_Data/VDR downloads/New info 080525/1.2.3 Model Extract (v94) - Trading Update.xlsx",
                    type: "Excel Workbook",
                    size: "1.0 MB",
                    pages: 7,
                    category: "Financial",
                    priority: "HIGH",
                    summary: "Financial model extract v94 with trading update, normalization adjustments, and variance analysis for management reporting."
                  },
                  {
                    id: "f11",
                    name: "1.6.1.2 Password for Payroll files.pdf",
                    path: "Project Aurora copy/Aurora_Data/VDR downloads/New info 080525/1.6.1.2 Password for Payroll files.pdf",
                    type: "PDF Document",
                    size: "85.0 KB",
                    category: "HR",
                    priority: "LOW",
                    summary: "Secure document containing password credentials for accessing confidential payroll-related files in the data room."
                  }
                ]
              },
              {
                id: "key-files-140425",
                name: "140425/2. Key Files",
                path: "Project Aurora copy/Aurora_Data/VDR downloads/140425/2. Key Files",
                priority: "HIGH",
                description: "Priority key files from April 14, 2025 including detailed staff analysis and core financial models",
                fileCount: 3,
                children: [],
                files: [
                  {
                    id: "f12",
                    name: "Detailed Staff Analysis v3 (to Feb'25).xlsx",
                    path: "Project Aurora copy/Aurora_Data/VDR downloads/140425/2. Key Files/Detailed Staff Analysis v3 (to Feb'25).xlsx",
                    type: "Excel Workbook",
                    size: "4.1 MB",
                    pages: 22,
                    category: "HR",
                    priority: "HIGH",
                    summary: "Comprehensive staff analysis with partner-level billing data, WIP by employee, tenure analysis, and productivity metrics across 22 worksheets."
                  }
                ]
              },
              {
                id: "pnl-other",
                name: "140425/3. P&L other",
                path: "Project Aurora copy/Aurora_Data/VDR downloads/140425/3. P&L other",
                priority: "HIGH",
                description: "Profit & loss supporting documentation including billing analysis by team and IT cost normalizations",
                fileCount: 2,
                children: [],
                files: [
                  {
                    id: "f13",
                    name: "Real Estate Billing by Team.xlsx",
                    path: "Project Aurora copy/Aurora_Data/VDR downloads/140425/3. P&L other/Real Estate Billing by Team.xlsx",
                    type: "Excel Workbook",
                    size: "3.1 MB",
                    pages: 6,
                    category: "Financial",
                    priority: "MEDIUM",
                    summary: "Real estate practice billing breakdown by team showing revenue allocation, utilization rates, and cost center analysis."
                  },
                  {
                    id: "f14",
                    name: "Normalisations - IT Costs Detail.xlsx",
                    path: "Project Aurora copy/Aurora_Data/VDR downloads/140425/3. P&L other/Normalisations - IT Costs Detail.xlsx",
                    type: "Excel Workbook",
                    size: "346.4 KB",
                    pages: 5,
                    category: "Financial",
                    priority: "MEDIUM",
                    summary: "IT cost normalization workbook detailing adjustments for one-off expenses, run-rate analysis, and pro forma cost base."
                  }
                ]
              },
              {
                id: "balance-sheet",
                name: "140425/4. Balance sheet other",
                path: "Project Aurora copy/Aurora_Data/VDR downloads/140425/4. Balance sheet other",
                priority: "HIGH",
                description: "Balance sheet supporting schedules including aged debt, accruals, prepayments, and claims provisions",
                fileCount: 4,
                children: [],
                files: [
                  {
                    id: "f15",
                    name: "Accruals & Prepayments - breakdown by month.xlsx",
                    path: "Project Aurora copy/Aurora_Data/VDR downloads/140425/4. Balance sheet other/Accruals & Prepayments - breakdown by month.xlsx",
                    type: "Excel Workbook",
                    size: "524.0 KB",
                    pages: 5,
                    category: "Financial",
                    priority: "MEDIUM",
                    summary: "Monthly breakdown of accruals and prepayments including rent, insurance, and other cost centers with roll-forward schedules."
                  },
                  {
                    id: "f16",
                    name: "2025-02-28 Aged Debt.xlsm",
                    path: "Project Aurora copy/Aurora_Data/VDR downloads/140425/4. Balance sheet other/2025-02-28 Aged Debt.xlsm",
                    type: "Excel Macro-Enabled",
                    size: "4.0 MB",
                    pages: 17,
                    category: "Financial",
                    priority: "HIGH",
                    summary: "Aged debt analysis as of February 28, 2025 with lead schedules, aging buckets, fee-earner breakdowns, and collection commentary."
                  }
                ]
              },
              {
                id: "stat-accounts",
                name: "140425/5. Stat accounts",
                path: "Project Aurora copy/Aurora_Data/VDR downloads/140425/5. Stat accounts",
                priority: "HIGH",
                description: "Statutory accounts and audited financial statements for fiscal years 2022-2024",
                fileCount: 2,
                children: [],
                files: [
                  {
                    id: "f17",
                    name: "Accounts 2022.pdf",
                    path: "Project Aurora copy/Aurora_Data/VDR downloads/140425/5. Stat accounts/Accounts 2022.pdf",
                    type: "PDF Document",
                    size: "885.3 KB",
                    category: "Financial",
                    priority: "HIGH",
                    summary: "Audited statutory accounts for FY2022 including directors' report, independent auditor's report, and full financial statements."
                  },
                  {
                    id: "f18",
                    name: "Accounts 2024.pdf",
                    path: "Project Aurora copy/Aurora_Data/VDR downloads/140425/5. Stat accounts/Accounts 2024.pdf",
                    type: "PDF Document",
                    size: "984.4 KB",
                    category: "Financial",
                    priority: "HIGH",
                    summary: "Audited statutory accounts for FY2024 showing year-over-year performance, key accounting policies, and going concern assessment."
                  }
                ]
              }
            ],
            files: []
          },
          {
            id: "bank-recs",
            name: "Bank recs 140425",
            path: "Project Aurora copy/Aurora_Data/VDR downloads/Bank recs 140425",
            priority: "MEDIUM",
            description: "Bank reconciliation files organized by month with supporting statements and IP documentation",
            fileCount: 47,
            children: [
              {
                id: "feb-2025",
                name: "1.4.3.2 February 2025",
                path: "Project Aurora copy/Aurora_Data/VDR downloads/Bank recs 140425/1.4.3.2 February 2025",
                priority: "MEDIUM",
                description: "February 2025 bank reconciliations with client statements, office accounts, and reserve summaries",
                fileCount: 35,
                children: [
                  {
                    id: "supporting-docs",
                    name: "1.4.3.2.1 Supporting Documents",
                    path: "Project Aurora copy/Aurora_Data/VDR downloads/Bank recs 140425/1.4.3.2 February 2025/1.4.3.2.1 Supporting Documents",
                    priority: "LOW",
                    description: "Bank statements, trial balances, and account reconciliations for February 2025",
                    fileCount: 21,
                    children: [],
                    files: [
                      {
                        id: "f19",
                        name: "1.4.3.2.1.7 1 - Trial Balance.pdf",
                        path: "Project Aurora copy/Aurora_Data/VDR downloads/Bank recs 140425/1.4.3.2 February 2025/1.4.3.2.1 Supporting Documents/1.4.3.2.1.7 1 - Trial Balance.pdf",
                        type: "PDF Document",
                        size: "146.6 KB",
                        category: "Financial",
                        priority: "MEDIUM",
                        summary: "General ledger trial balance as of February 2025 showing all account balances for reconciliation purposes."
                      }
                    ]
                  },
                  {
                    id: "ip-docs",
                    name: "1.4.3.2.2 IP Supporting Documents",
                    path: "Project Aurora copy/Aurora_Data/VDR downloads/Bank recs 140425/1.4.3.2 February 2025/1.4.3.2.2 IP Supporting Documents",
                    priority: "MEDIUM",
                    description: "Intellectual property office documentation including EPO, WIPO, UKIPO, and EUIPO statements",
                    fileCount: 14,
                    children: [],
                    files: [
                      {
                        id: "f20",
                        name: "1.4.3.2.2.3 EPO February 2025.pdf",
                        path: "Project Aurora copy/Aurora_Data/VDR downloads/Bank recs 140425/1.4.3.2 February 2025/1.4.3.2.2 IP Supporting Documents/1.4.3.2.2.3 EPO February 2025.pdf",
                        type: "PDF Document",
                        size: "472.7 KB",
                        category: "Legal",
                        priority: "MEDIUM",
                        summary: "European Patent Office transactions and fee payments for February 2025 showing patent filings and renewals."
                      },
                      {
                        id: "f21",
                        name: "1.4.3.2.2.4 WIPO February 2025.pdf",
                        path: "Project Aurora copy/Aurora_Data/VDR downloads/Bank recs 140425/1.4.3.2 February 2025/1.4.3.2.2 IP Supporting Documents/1.4.3.2.2.4 WIPO February 2025.pdf",
                        type: "PDF Document",
                        size: "402.8 KB",
                        category: "Legal",
                        priority: "MEDIUM",
                        summary: "World Intellectual Property Organization transactions for February 2025 including international trademark registrations."
                      }
                    ]
                  }
                ],
                files: []
              }
            ],
            files: []
          }
        ],
        files: []
      }
    ],
    files: []
  }
];

export const categoryStats: CategoryStats[] = [
  { category: "Financial", count: 36, priority: "HIGH", color: "#ef4444" },
  { category: "Legal", count: 16, priority: "MEDIUM", color: "#f59e0b" },
  { category: "Commercial", count: 11, priority: "LOW", color: "#22c55e" },
  { category: "HR", count: 10, priority: "LOW", color: "#3b82f6" },
  { category: "Tax", count: 4, priority: "MEDIUM", color: "#8b5cf6" },
  { category: "Other", count: 77, priority: "LOW", color: "#6b7280" },
];

export const fileTypeStats: FileTypeStats[] = [
  { type: "PDF Document", count: 81, color: "#ef4444" },
  { type: "Excel Workbook", count: 56, color: "#22c55e" },
  { type: "Word Document", count: 7, color: "#3b82f6" },
  { type: "Excel Spreadsheet (Legacy)", count: 4, color: "#f59e0b" },
  { type: "Excel Macro-Enabled", count: 4, color: "#8b5cf6" },
  { type: "Unknown", count: 2, color: "#6b7280" },
];

// Helper function to get all files from folders recursively
export function getAllFiles(folder: DataRoomFolder): DataRoomFile[] {
  let files = [...folder.files];
  for (const child of folder.children) {
    files = [...files, ...getAllFiles(child)];
  }
  return files;
}

// Summary statistics
export const dataRoomStats = {
  totalFiles: 154,
  totalSize: "197.6 MB",
  totalFolders: 32,
};
