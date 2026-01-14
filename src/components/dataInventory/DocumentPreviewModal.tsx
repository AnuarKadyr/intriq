import { useState } from "react";
import { X, ChevronLeft, ChevronRight, ZoomIn, ZoomOut, Download } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

interface DocumentPreviewModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  fileName: string;
}

// Sample document content for preview
const sampleDocumentPages = [
  {
    pageNumber: 1,
    title: "Project Aurora - Financial Summary Report",
    content: `
CONFIDENTIAL - FOR INTERNAL USE ONLY

EXECUTIVE SUMMARY

This document provides a comprehensive financial analysis of Project Aurora for the fiscal year 2024. The analysis covers key financial metrics, revenue streams, and strategic recommendations.

KEY HIGHLIGHTS:
• Total Revenue: $48.2M (↑12% YoY)
• EBITDA: $12.4M (25.7% margin)
• Customer Retention: 94.2%
• New Customer Acquisition: 847 accounts

The company has demonstrated strong growth across all major product lines, with particularly notable performance in the Enterprise segment which grew 28% year-over-year.
    `,
  },
  {
    pageNumber: 2,
    title: "Revenue Breakdown by Segment",
    content: `
REVENUE ANALYSIS - FY2024

1. ENTERPRISE SEGMENT
   Revenue: $22.4M
   Growth: +28% YoY
   Key Drivers: New enterprise contracts, upselling existing accounts
   
2. MID-MARKET SEGMENT  
   Revenue: $15.8M
   Growth: +8% YoY
   Key Drivers: Product improvements, competitive pricing
   
3. SMB SEGMENT
   Revenue: $10.0M
   Growth: +4% YoY
   Key Drivers: Self-service adoption, partnership channels

GEOGRAPHIC DISTRIBUTION:
• North America: 62%
• Europe: 24%  
• Asia Pacific: 14%
    `,
  },
  {
    pageNumber: 3,
    title: "Cost Structure & Margins",
    content: `
COST ANALYSIS

OPERATING EXPENSES BREAKDOWN:

Cost of Goods Sold (COGS)
├── Direct Labor: $8.2M
├── Infrastructure: $4.1M
├── Third-party Services: $2.3M
└── Total COGS: $14.6M (30.3% of revenue)

Operating Expenses
├── Sales & Marketing: $9.8M
├── Research & Development: $7.2M
├── General & Administrative: $4.2M
└── Total OpEx: $21.2M

MARGIN ANALYSIS:
• Gross Margin: 69.7%
• Operating Margin: 25.7%
• Net Margin: 21.3%

Note: Margins have improved 2.4 percentage points compared to prior year due to operational efficiencies and scale benefits.
    `,
  },
  {
    pageNumber: 4,
    title: "Strategic Recommendations",
    content: `
STRATEGIC RECOMMENDATIONS

PRIORITY 1: ENTERPRISE EXPANSION
Continue investing in enterprise sales capabilities. The enterprise segment shows the highest growth potential and margins.

Recommended Actions:
□ Hire 5 additional enterprise account executives
□ Develop industry-specific solutions for healthcare and finance
□ Implement dedicated customer success for accounts >$500K ARR

PRIORITY 2: PRODUCT INNOVATION
Maintain competitive advantage through continuous product development.

Recommended Actions:
□ Launch AI-powered analytics module Q2 2025
□ Expand API capabilities for enterprise integrations
□ Develop mobile-first experience for SMB segment

PRIORITY 3: OPERATIONAL EFFICIENCY
Continue driving operational improvements to maintain margin expansion.

Recommended Actions:
□ Automate 40% of customer support queries
□ Consolidate infrastructure providers
□ Implement predictive analytics for resource planning
    `,
  },
];

export function DocumentPreviewModal({ 
  open, 
  onOpenChange, 
  fileName 
}: DocumentPreviewModalProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [zoom, setZoom] = useState(100);
  
  const totalPages = sampleDocumentPages.length;
  const currentContent = sampleDocumentPages[currentPage - 1];

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handleZoomIn = () => {
    if (zoom < 150) setZoom(zoom + 25);
  };

  const handleZoomOut = () => {
    if (zoom > 75) setZoom(zoom - 25);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl h-[85vh] flex flex-col p-0 gap-0">
        <DialogHeader className="px-6 py-4 border-b bg-gray-50 flex-shrink-0">
          <div className="flex items-center justify-between">
            <DialogTitle className="text-lg font-semibold truncate pr-4">
              {fileName}
            </DialogTitle>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1 bg-white border rounded-lg px-2 py-1">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-7 w-7"
                  onClick={handleZoomOut}
                  disabled={zoom <= 75}
                >
                  <ZoomOut className="h-4 w-4" />
                </Button>
                <span className="text-sm font-medium w-12 text-center">{zoom}%</span>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-7 w-7"
                  onClick={handleZoomIn}
                  disabled={zoom >= 150}
                >
                  <ZoomIn className="h-4 w-4" />
                </Button>
              </div>
              <Button variant="outline" size="sm" className="gap-2">
                <Download className="h-4 w-4" />
                Download
              </Button>
            </div>
          </div>
        </DialogHeader>

        {/* Document Content */}
        <ScrollArea className="flex-1 bg-gray-100">
          <div className="p-8 flex justify-center">
            <div 
              className="bg-white shadow-lg rounded-sm border max-w-2xl w-full"
              style={{ 
                transform: `scale(${zoom / 100})`,
                transformOrigin: 'top center',
                minHeight: '800px'
              }}
            >
              {/* Page Header */}
              <div className="border-b px-8 py-4 bg-gray-50">
                <p className="text-xs text-gray-500 uppercase tracking-wide">
                  Page {currentContent.pageNumber} of {totalPages}
                </p>
                <h2 className="text-lg font-semibold text-gray-900 mt-1">
                  {currentContent.title}
                </h2>
              </div>
              
              {/* Page Content */}
              <div className="px-8 py-6">
                <pre className="whitespace-pre-wrap font-sans text-sm text-gray-700 leading-relaxed">
                  {currentContent.content}
                </pre>
              </div>
            </div>
          </div>
        </ScrollArea>

        {/* Page Navigation Footer */}
        <div className="px-6 py-4 border-t bg-white flex items-center justify-between flex-shrink-0">
          <Button
            variant="outline"
            size="sm"
            onClick={handlePrevPage}
            disabled={currentPage === 1}
            className="gap-2"
          >
            <ChevronLeft className="h-4 w-4" />
            Previous
          </Button>
          
          <div className="flex items-center gap-2">
            {sampleDocumentPages.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentPage(index + 1)}
                className={`w-8 h-8 rounded-md text-sm font-medium transition-colors ${
                  currentPage === index + 1
                    ? "bg-primary text-primary-foreground"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {index + 1}
              </button>
            ))}
          </div>
          
          <Button
            variant="outline"
            size="sm"
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className="gap-2"
          >
            Next
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
