import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import {
  AlertTriangle,
  TrendingUp,
  Scale,
  FileSpreadsheet,
  Sparkles,
  CheckCircle2,
  XCircle,
  AlertCircle,
  ChevronRight,
  Users,
  Building2,
  DollarSign,
  BarChart3,
  Shield,
  FileWarning,
  Target,
  Clock,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface CriticalDocumentModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  document: {
    id: string;
    name: string;
    category: string;
    insight: string;
    impact: "deal-critical" | "high-value" | "risk-flag";
  } | null;
}

// Sample detailed analysis data - this would come from backend in real implementation
const detailedAnalysis = {
  executiveSummary: `This Excel file contains comprehensive transactional and analytical data for Greenwoods Legal LLP, a UK law firm, spanning May 2023 through February 2025. The file comprises five interconnected sheets that capture 82,512 individual time-and-billing transactions, revenue attribution across 24 fee earners, departmental performance across seven practice areas, and origination source analysis.`,
  criticalFinding: `The critical finding is significant revenue concentration risk: the top two partners (Huw Wallis and John Macaulay) generate approximately 40% of total firm revenue, with Huw Wallis alone contributing £2.85M in the most recent period.`,
  
  fileOverview: {
    description: "Core operational and financial dataset for Greenwoods Legal LLP",
    purpose: "Financial due diligence for 'Project Aurora' - likely an acquisition or investment transaction",
    sheets: [
      { name: "Revenue by originator", description: "Tracks revenue generation by 24 individual fee earners across 113 time periods" },
      { name: "Rev by dept by orig", description: "Cross-tabulates revenue by originator and department across three fiscal periods" },
      { name: "Origination growth by year", description: "Segments origination sources into existing vs. new relationships" },
      { name: "FY 24 - Data Retrieve", description: "Contains 40,892 granular transaction records for FY23-FY24" },
      { name: "FY 25 - Data Retrieve", description: "Contains 41,620 transaction records extending through FY25" },
    ],
    timePeriod: "May 2023 through February 2025 (22 months)",
    totalRecords: "82,512 transactions",
  },
  
  financialPerformance: [
    { category: "Existing Equity Partners", fy23: "£4,345.78", fy24: "£4,387.57", ltm25: "£4,709.96", growth1: "+1.0%", growth2: "+7.3%" },
    { category: "Existing Partners", fy23: "£4,839.00", fy24: "£5,350.38", ltm25: "£5,607.39", growth1: "+10.6%", growth2: "+4.8%" },
    { category: "Existing Other Fee Earners", fy23: "£2,535.28", fy24: "£2,123.12", ltm25: "£3,762.34", growth1: "-16.3%", growth2: "+77.2%" },
    { category: "New Partners", fy23: "-", fy24: "£466.40", ltm25: "£829.49", growth1: "N/A", growth2: "+77.8%" },
    { category: "TOTAL REVENUE", fy23: "£12,116.69", fy24: "£13,307.45", ltm25: "£15,702.74", growth1: "+9.8%", growth2: "+18.0%" },
  ],

  topFeeEarners: [
    { name: "Huw Wallis", role: "Equity Partner", p1: "£1,769.68k", p2: "£2,755.76k", p3: "£2,852.34k", growth1: "+55.7%", growth2: "+3.5%" },
    { name: "John Macaulay", role: "Partner", p1: "£1,470.27k", p2: "£1,546.82k", p3: "£5,630.60k*", growth1: "+5.2%", growth2: "+264.1%*" },
    { name: "Simon Malcolm", role: "Partner", p1: "£780.88k", p2: "£1,225.89k", p3: "£973.33k", growth1: "+57.0%", growth2: "-20.6%" },
    { name: "Robert Dillarstone", role: "Equity Partner", p1: "£985.18k", p2: "£1,003.61k", p3: "£3,060.13k*", growth1: "+1.9%", growth2: "+205.0%*" },
    { name: "William Thomas", role: "Partner", p1: "£184.50k", p2: "£647.77k", p3: "£668.69k", growth1: "+251.2%", growth2: "+3.2%" },
  ],

  departmentalRevenue: [
    { department: "Disputes", contributors: "Huw Wallis (£2,583.10k), Howard Crossman (£333.98k)", revenue: "~£3,000+", percentage: "~19%" },
    { department: "Employment", contributors: "John Macaulay (£529.89k), Simon Malcolm (£884.47k)", revenue: "~£1,800+", percentage: "~11%" },
    { department: "Wealth Preservation", contributors: "Matthew Biles (£775.87k), multiple contributors", revenue: "~£1,500+", percentage: "~10%" },
    { department: "Real Estate", contributors: "William Thomas (£668.69k), distributed", revenue: "~£900+", percentage: "~6%" },
  ],

  risks: [
    { category: "Key Person Concentration", finding: "Huw Wallis generates £2.85M (18% of firm revenue); top 2 partners represent ~54% of total revenue", severity: "high" },
    { category: "Departmental Concentration", finding: "Huw Wallis derives 90.6% of revenue from Disputes; Simon Malcolm derives 90.9% from Employment", severity: "high" },
    { category: "Billing Realization", finding: "Sample transactions show 0-73% realization rates with systematic write-offs in Employment practice", severity: "high" },
    { category: "Revenue Volatility", finding: "Referrer revenue swings from -54.8% to +236.5% year-over-year; unexplained 235% spikes in Period 10", severity: "medium" },
    { category: "Junior Fee Earner Productivity", finding: "'Existing Other' category declined 16.3% in FY24 before recovering, suggesting capacity or BD issues", severity: "medium" },
    { category: "Employment Practice Profitability", finding: "Disproportionate write-off concentration in Employment department suggests pricing or scope issues", severity: "medium" },
  ],

  dataQuality: [
    { check: "Transaction Record Completeness", status: "pass", notes: "82,512 total records with consistent field structure" },
    { check: "Period Coding Consistency", status: "pass", notes: "Fiscal period codes align with POST-DATE values" },
    { check: "Originator Totals Reconciliation", status: "partial", notes: "Cannot fully reconcile due to period definition ambiguity" },
    { check: "Departmental Sum Validation", status: "partial", notes: "Individual figures visible but total not explicitly stated" },
    { check: "Origination Source Totals", status: "pass", notes: "FY23 + FY24 new origination reconciles to FY24 total" },
    { check: "Rolling 12 Flag Accuracy", status: "pass", notes: "Correctly identifies LTM transactions" },
    { check: "Matter-Level Aggregation", status: "fail", notes: "Cannot validate matter profitability" },
    { check: "Client-Level Revenue", status: "fail", notes: "Cannot assess client concentration" },
  ],

  positiveFindings: [
    "Strong Revenue Growth Trajectory: 18.0% growth in LTM25 following 9.8% growth in FY24",
    "Comprehensive Data Granularity: 82,512 transaction records enable sophisticated analysis",
    "Effective Partner Business Development: New partner origination nearly doubling to £829.49k",
    "Practice Area Diversification: Seven distinct departments with multiple revenue contributors",
    "Cross-Selling Evidence: Identified cross-sell revenue demonstrates client relationship depth",
    "Junior Fee Earner Recovery: 'Existing Other' category rebounded 77.2% in LTM25",
  ],

  criticalIssues: [
    { title: "Extreme Key Person Concentration", detail: "Huw Wallis (18% of revenue) and John Macaulay (combined ~54%) create unacceptable dependency; requires retention agreements with substantial earnout/clawback provisions" },
    { title: "Material Billing Realization Issues", detail: "Systematic write-offs ranging from 26.7% to 100% on sampled matters; requires full-dataset quantification of total write-off impact" },
    { title: "Unexplained Revenue Volatility", detail: "235% spikes in Period 10 without clear explanation creates analytical uncertainty; requires immediate clarification" },
  ],

  nextSteps: {
    immediate: [
      { action: "Clarify Period Definitions", detail: "Obtain explicit period labels to resolve the Period 10 spike ambiguity" },
      { action: "Quantify Total Write-Offs", detail: "Run full-dataset analysis on all 82,512 transactions" },
      { action: "Client Concentration Analysis", detail: "Aggregate transactional data by client to identify top 10 clients" },
      { action: "Partner Retention Assessment", detail: "Obtain employment agreements for top 5 revenue generators" },
    ],
    shortTerm: [
      { action: "Complete Realization Rate Analysis", detail: "Calculate firm-wide, department-specific rates" },
      { action: "Matter Profitability Deep-Dive", detail: "Aggregate transactions by matter to analyze profitability" },
      { action: "WIP and Unbilled Aging", detail: "Analyze ORIG-VALUE vs. CURR-VALUE differences" },
      { action: "Reconcile to Audited Financials", detail: "Obtain FY23, FY24, and interim FY25 statements" },
    ],
  },
};

export function CriticalDocumentModal({ open, onOpenChange, document }: CriticalDocumentModalProps) {
  const [activeTab, setActiveTab] = useState("summary");

  if (!document) return null;

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case "deal-critical": return "bg-red-100 text-red-700 border-red-200";
      case "high-value": return "bg-blue-100 text-blue-700 border-blue-200";
      case "risk-flag": return "bg-amber-100 text-amber-700 border-amber-200";
      default: return "bg-gray-100 text-gray-700";
    }
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case "high": return <XCircle className="h-4 w-4 text-red-500" />;
      case "medium": return <AlertCircle className="h-4 w-4 text-amber-500" />;
      case "low": return <CheckCircle2 className="h-4 w-4 text-green-500" />;
      default: return <AlertCircle className="h-4 w-4 text-gray-500" />;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pass": return <CheckCircle2 className="h-4 w-4 text-emerald-500" />;
      case "partial": return <AlertCircle className="h-4 w-4 text-amber-500" />;
      case "fail": return <XCircle className="h-4 w-4 text-red-500" />;
      default: return <AlertCircle className="h-4 w-4 text-gray-500" />;
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-5xl h-[85vh] flex flex-col p-0 gap-0">
        {/* Header */}
        <DialogHeader className="p-6 pb-4 border-b bg-gradient-to-r from-slate-50 to-slate-100/50">
          <div className="flex items-start gap-4">
            <div className={cn(
              "w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0",
              document.impact === "deal-critical" && "bg-red-100",
              document.impact === "high-value" && "bg-blue-100",
              document.impact === "risk-flag" && "bg-amber-100"
            )}>
              <FileSpreadsheet className={cn(
                "h-6 w-6",
                document.impact === "deal-critical" && "text-red-600",
                document.impact === "high-value" && "text-blue-600",
                document.impact === "risk-flag" && "text-amber-600"
              )} />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <DialogTitle className="text-lg font-semibold text-gray-900">
                  {document.name}
                </DialogTitle>
                <Badge className={cn("text-xs", getImpactColor(document.impact))}>
                  {document.impact.replace("-", " ").toUpperCase()}
                </Badge>
              </div>
              <p className="text-sm text-gray-500">{document.category} • Project Aurora</p>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 bg-primary/10 rounded-lg">
              <Sparkles className="h-4 w-4 text-primary" />
              <span className="text-xs font-medium text-primary">AI Analysis</span>
            </div>
          </div>
        </DialogHeader>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col min-h-0">
          <TabsList className="w-full justify-start rounded-none border-b bg-transparent px-6 h-11">
            <TabsTrigger value="summary" className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary">
              Executive Summary
            </TabsTrigger>
            <TabsTrigger value="financial" className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary">
              Financial Analysis
            </TabsTrigger>
            <TabsTrigger value="risks" className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary">
              Risk Assessment
            </TabsTrigger>
            <TabsTrigger value="quality" className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary">
              Data Quality
            </TabsTrigger>
            <TabsTrigger value="actions" className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary">
              Next Steps
            </TabsTrigger>
          </TabsList>

          <ScrollArea className="flex-1">
            <div className="p-6">
              {/* Summary Tab */}
              <TabsContent value="summary" className="mt-0 space-y-6">
                {/* Critical Finding Alert */}
                <Card className="p-4 bg-red-50 border-red-200">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="h-5 w-5 text-red-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="text-sm font-semibold text-red-800 mb-1">Critical Finding</h4>
                      <p className="text-sm text-red-700">{detailedAnalysis.criticalFinding}</p>
                    </div>
                  </div>
                </Card>

                {/* Executive Summary */}
                <div>
                  <h4 className="text-sm font-semibold text-gray-900 mb-2">Executive Summary</h4>
                  <p className="text-sm text-gray-600 leading-relaxed">{detailedAnalysis.executiveSummary}</p>
                </div>

                {/* File Overview */}
                <Card className="p-4">
                  <h4 className="text-sm font-semibold text-gray-900 mb-3">File Overview</h4>
                  <div className="grid grid-cols-3 gap-4 mb-4">
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <p className="text-xs text-gray-500 mb-0.5">Time Period</p>
                      <p className="text-sm font-medium text-gray-900">{detailedAnalysis.fileOverview.timePeriod}</p>
                    </div>
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <p className="text-xs text-gray-500 mb-0.5">Total Records</p>
                      <p className="text-sm font-medium text-gray-900">{detailedAnalysis.fileOverview.totalRecords}</p>
                    </div>
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <p className="text-xs text-gray-500 mb-0.5">Purpose</p>
                      <p className="text-sm font-medium text-gray-900">M&A Due Diligence</p>
                    </div>
                  </div>
                  
                  <h5 className="text-xs font-medium text-gray-500 uppercase mb-2">Sheet Structure</h5>
                  <div className="space-y-2">
                    {detailedAnalysis.fileOverview.sheets.map((sheet, index) => (
                      <div key={index} className="flex items-start gap-2 p-2 rounded-lg hover:bg-gray-50">
                        <FileSpreadsheet className="h-4 w-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="text-sm font-medium text-gray-900">{sheet.name}</p>
                          <p className="text-xs text-gray-500">{sheet.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>

                {/* Key Positive Findings */}
                <Card className="p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                    <h4 className="text-sm font-semibold text-gray-900">Key Positive Findings</h4>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {detailedAnalysis.positiveFindings.map((finding, index) => (
                      <div key={index} className="flex items-start gap-2 p-2 bg-emerald-50 rounded-lg">
                        <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 mt-0.5 flex-shrink-0" />
                        <p className="text-xs text-emerald-800">{finding}</p>
                      </div>
                    ))}
                  </div>
                </Card>
              </TabsContent>

              {/* Financial Tab */}
              <TabsContent value="financial" className="mt-0 space-y-6">
                {/* Revenue Performance */}
                <Card className="p-4">
                  <div className="flex items-center gap-2 mb-4">
                    <DollarSign className="h-4 w-4 text-primary" />
                    <h4 className="text-sm font-semibold text-gray-900">Revenue Performance by Fiscal Period (£'000)</h4>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left py-2 px-2 text-xs font-medium text-gray-500">Category</th>
                          <th className="text-right py-2 px-2 text-xs font-medium text-gray-500">FY23</th>
                          <th className="text-right py-2 px-2 text-xs font-medium text-gray-500">FY24</th>
                          <th className="text-right py-2 px-2 text-xs font-medium text-gray-500">LTM25</th>
                          <th className="text-right py-2 px-2 text-xs font-medium text-gray-500">FY23-24</th>
                          <th className="text-right py-2 px-2 text-xs font-medium text-gray-500">FY24-LTM25</th>
                        </tr>
                      </thead>
                      <tbody>
                        {detailedAnalysis.financialPerformance.map((row, index) => (
                          <tr key={index} className={cn("border-b last:border-0", row.category === "TOTAL REVENUE" && "bg-primary/5 font-semibold")}>
                            <td className="py-2 px-2 text-gray-900">{row.category}</td>
                            <td className="text-right py-2 px-2 text-gray-700">{row.fy23}</td>
                            <td className="text-right py-2 px-2 text-gray-700">{row.fy24}</td>
                            <td className="text-right py-2 px-2 text-gray-700">{row.ltm25}</td>
                            <td className={cn("text-right py-2 px-2", row.growth1.startsWith("+") ? "text-emerald-600" : row.growth1.startsWith("-") ? "text-red-600" : "text-gray-500")}>{row.growth1}</td>
                            <td className={cn("text-right py-2 px-2", row.growth2.startsWith("+") ? "text-emerald-600" : row.growth2.startsWith("-") ? "text-red-600" : "text-gray-500")}>{row.growth2}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </Card>

                {/* Top Fee Earners */}
                <Card className="p-4">
                  <div className="flex items-center gap-2 mb-4">
                    <Users className="h-4 w-4 text-primary" />
                    <h4 className="text-sm font-semibold text-gray-900">Top Individual Fee Earner Performance</h4>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left py-2 px-2 text-xs font-medium text-gray-500">Fee Earner</th>
                          <th className="text-left py-2 px-2 text-xs font-medium text-gray-500">Role</th>
                          <th className="text-right py-2 px-2 text-xs font-medium text-gray-500">Period 1</th>
                          <th className="text-right py-2 px-2 text-xs font-medium text-gray-500">Period 2</th>
                          <th className="text-right py-2 px-2 text-xs font-medium text-gray-500">Period 3</th>
                          <th className="text-right py-2 px-2 text-xs font-medium text-gray-500">P1-P2</th>
                          <th className="text-right py-2 px-2 text-xs font-medium text-gray-500">P2-P3</th>
                        </tr>
                      </thead>
                      <tbody>
                        {detailedAnalysis.topFeeEarners.map((earner, index) => (
                          <tr key={index} className="border-b last:border-0">
                            <td className="py-2 px-2 font-medium text-gray-900">{earner.name}</td>
                            <td className="py-2 px-2 text-gray-500 text-xs">{earner.role}</td>
                            <td className="text-right py-2 px-2 text-gray-700">{earner.p1}</td>
                            <td className="text-right py-2 px-2 text-gray-700">{earner.p2}</td>
                            <td className="text-right py-2 px-2 text-gray-700">{earner.p3}</td>
                            <td className={cn("text-right py-2 px-2", earner.growth1.startsWith("+") ? "text-emerald-600" : "text-red-600")}>{earner.growth1}</td>
                            <td className={cn("text-right py-2 px-2", earner.growth2.startsWith("+") ? "text-emerald-600" : "text-red-600")}>{earner.growth2}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <p className="text-xs text-gray-400 mt-2 italic">* Asterisked figures show anomalous spikes suggesting different period lengths or large matter completions</p>
                </Card>

                {/* Departmental Revenue */}
                <Card className="p-4">
                  <div className="flex items-center gap-2 mb-4">
                    <Building2 className="h-4 w-4 text-primary" />
                    <h4 className="text-sm font-semibold text-gray-900">Departmental Revenue Distribution (Most Recent Period)</h4>
                  </div>
                  <div className="space-y-3">
                    {detailedAnalysis.departmentalRevenue.map((dept, index) => (
                      <div key={index} className="p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm font-medium text-gray-900">{dept.department}</span>
                          <div className="flex items-center gap-3">
                            <span className="text-sm font-semibold text-gray-900">{dept.revenue}</span>
                            <Badge variant="outline" className="text-xs">{dept.percentage}</Badge>
                          </div>
                        </div>
                        <p className="text-xs text-gray-500">{dept.contributors}</p>
                      </div>
                    ))}
                  </div>
                </Card>
              </TabsContent>

              {/* Risks Tab */}
              <TabsContent value="risks" className="mt-0 space-y-6">
                {/* Critical Issues */}
                <Card className="p-4 border-red-200 bg-red-50/30">
                  <div className="flex items-center gap-2 mb-4">
                    <Shield className="h-4 w-4 text-red-600" />
                    <h4 className="text-sm font-semibold text-red-800">Critical Issues (Deal-Breakers or Major Valuation Adjustments)</h4>
                  </div>
                  <div className="space-y-3">
                    {detailedAnalysis.criticalIssues.map((issue, index) => (
                      <div key={index} className="p-3 bg-white rounded-lg border border-red-100">
                        <div className="flex items-start gap-2">
                          <XCircle className="h-4 w-4 text-red-500 mt-0.5 flex-shrink-0" />
                          <div>
                            <h5 className="text-sm font-medium text-red-800">{issue.title}</h5>
                            <p className="text-xs text-red-600 mt-1">{issue.detail}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>

                {/* All Risks */}
                <Card className="p-4">
                  <div className="flex items-center gap-2 mb-4">
                    <FileWarning className="h-4 w-4 text-primary" />
                    <h4 className="text-sm font-semibold text-gray-900">Risk Assessment Matrix</h4>
                  </div>
                  <div className="space-y-2">
                    {detailedAnalysis.risks.map((risk, index) => (
                      <div key={index} className={cn(
                        "p-3 rounded-lg border",
                        risk.severity === "high" && "bg-red-50/50 border-red-100",
                        risk.severity === "medium" && "bg-amber-50/50 border-amber-100",
                        risk.severity === "low" && "bg-green-50/50 border-green-100"
                      )}>
                        <div className="flex items-start gap-3">
                          {getSeverityIcon(risk.severity)}
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-0.5">
                              <span className="text-sm font-medium text-gray-900">{risk.category}</span>
                              <Badge className={cn(
                                "text-[10px]",
                                risk.severity === "high" && "bg-red-100 text-red-700",
                                risk.severity === "medium" && "bg-amber-100 text-amber-700",
                                risk.severity === "low" && "bg-green-100 text-green-700"
                              )}>
                                {risk.severity.toUpperCase()}
                              </Badge>
                            </div>
                            <p className="text-xs text-gray-600">{risk.finding}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              </TabsContent>

              {/* Data Quality Tab */}
              <TabsContent value="quality" className="mt-0 space-y-6">
                <Card className="p-4">
                  <div className="flex items-center gap-2 mb-4">
                    <BarChart3 className="h-4 w-4 text-primary" />
                    <h4 className="text-sm font-semibold text-gray-900">Data Quality & Reconciliation Checks</h4>
                  </div>
                  <div className="space-y-2">
                    {detailedAnalysis.dataQuality.map((check, index) => (
                      <div key={index} className={cn(
                        "flex items-start gap-3 p-3 rounded-lg",
                        check.status === "pass" && "bg-emerald-50/50",
                        check.status === "partial" && "bg-amber-50/50",
                        check.status === "fail" && "bg-red-50/50"
                      )}>
                        {getStatusIcon(check.status)}
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-medium text-gray-900">{check.check}</span>
                            <Badge className={cn(
                              "text-[10px]",
                              check.status === "pass" && "bg-emerald-100 text-emerald-700",
                              check.status === "partial" && "bg-amber-100 text-amber-700",
                              check.status === "fail" && "bg-red-100 text-red-700"
                            )}>
                              {check.status === "pass" ? "PASS" : check.status === "partial" ? "PARTIAL" : "REQUIRES REVIEW"}
                            </Badge>
                          </div>
                          <p className="text-xs text-gray-500 mt-0.5">{check.notes}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>

                {/* Summary Stats */}
                <div className="grid grid-cols-3 gap-4">
                  <Card className="p-4 bg-emerald-50 border-emerald-100">
                    <div className="flex items-center gap-2 mb-2">
                      <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                      <span className="text-2xl font-bold text-emerald-700">
                        {detailedAnalysis.dataQuality.filter(c => c.status === "pass").length}
                      </span>
                    </div>
                    <p className="text-xs text-emerald-600 font-medium">Checks Passed</p>
                  </Card>
                  <Card className="p-4 bg-amber-50 border-amber-100">
                    <div className="flex items-center gap-2 mb-2">
                      <AlertCircle className="h-5 w-5 text-amber-500" />
                      <span className="text-2xl font-bold text-amber-700">
                        {detailedAnalysis.dataQuality.filter(c => c.status === "partial").length}
                      </span>
                    </div>
                    <p className="text-xs text-amber-600 font-medium">Partial / Needs Review</p>
                  </Card>
                  <Card className="p-4 bg-red-50 border-red-100">
                    <div className="flex items-center gap-2 mb-2">
                      <XCircle className="h-5 w-5 text-red-500" />
                      <span className="text-2xl font-bold text-red-700">
                        {detailedAnalysis.dataQuality.filter(c => c.status === "fail").length}
                      </span>
                    </div>
                    <p className="text-xs text-red-600 font-medium">Cannot Verify</p>
                  </Card>
                </div>
              </TabsContent>

              {/* Next Steps Tab */}
              <TabsContent value="actions" className="mt-0 space-y-6">
                {/* Immediate Actions */}
                <Card className="p-4 border-red-200">
                  <div className="flex items-center gap-2 mb-4">
                    <Clock className="h-4 w-4 text-red-600" />
                    <h4 className="text-sm font-semibold text-gray-900">Immediate Actions (Within 48 Hours)</h4>
                  </div>
                  <div className="space-y-3">
                    {detailedAnalysis.nextSteps.immediate.map((step, index) => (
                      <div key={index} className="flex items-start gap-3 p-3 bg-red-50/50 rounded-lg">
                        <div className="w-6 h-6 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
                          <span className="text-xs font-bold text-red-700">{index + 1}</span>
                        </div>
                        <div>
                          <h5 className="text-sm font-medium text-gray-900">{step.action}</h5>
                          <p className="text-xs text-gray-500 mt-0.5">{step.detail}</p>
                        </div>
                        <ChevronRight className="h-4 w-4 text-gray-300 flex-shrink-0 ml-auto" />
                      </div>
                    ))}
                  </div>
                </Card>

                {/* Short-term Actions */}
                <Card className="p-4 border-amber-200">
                  <div className="flex items-center gap-2 mb-4">
                    <Target className="h-4 w-4 text-amber-600" />
                    <h4 className="text-sm font-semibold text-gray-900">Short-Term Actions (Within 1 Week)</h4>
                  </div>
                  <div className="space-y-3">
                    {detailedAnalysis.nextSteps.shortTerm.map((step, index) => (
                      <div key={index} className="flex items-start gap-3 p-3 bg-amber-50/50 rounded-lg">
                        <div className="w-6 h-6 rounded-full bg-amber-100 flex items-center justify-center flex-shrink-0">
                          <span className="text-xs font-bold text-amber-700">{index + 5}</span>
                        </div>
                        <div>
                          <h5 className="text-sm font-medium text-gray-900">{step.action}</h5>
                          <p className="text-xs text-gray-500 mt-0.5">{step.detail}</p>
                        </div>
                        <ChevronRight className="h-4 w-4 text-gray-300 flex-shrink-0 ml-auto" />
                      </div>
                    ))}
                  </div>
                </Card>
              </TabsContent>
            </div>
          </ScrollArea>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
