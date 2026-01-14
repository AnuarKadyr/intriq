import { ReportSlide } from "@/types/reportGenerator";
import { cn } from "@/lib/utils";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import logoTiffany from "@/assets/logo-tiffany.svg";

interface SlidePreviewProps {
  slide: ReportSlide;
  isSelected: boolean;
  onClick: () => void;
  isThumbnail?: boolean;
  slideNumber?: number;
  totalSlides?: number;
}

// Section navigation items for the top bar
const sectionNavItems = [
  "Executive Summary",
  "Headlines", 
  "Quality of earnings",
  "Quality of net debt",
  "Normalised NWC",
  "Supporting analysis",
  "Appendices"
];

export function SlidePreview({ 
  slide, 
  isSelected, 
  onClick, 
  isThumbnail = false,
  slideNumber = 1,
  totalSlides = 10
}: SlidePreviewProps) {
  const baseClasses = cn(
    "bg-white rounded-lg shadow-md border overflow-hidden transition-all duration-200",
    isSelected && "ring-2 ring-inset ring-primary border-transparent shadow-lg",
    isThumbnail && "cursor-pointer hover:shadow-lg hover:scale-[1.02]"
  );

  const aspectRatio = "aspect-[16/9]";

  return (
    <div className={cn(baseClasses, aspectRatio)} onClick={onClick}>
      <div className="w-full h-full flex flex-col">
        {slide.type === "title" && (
          <TitleSlideContent slide={slide} isThumbnail={isThumbnail} />
        )}
        {slide.type === "content" && (
          <ContentSlideContent slide={slide} isThumbnail={isThumbnail} slideNumber={slideNumber} />
        )}
        {slide.type === "kpi" && (
          <KPISlideContent slide={slide} isThumbnail={isThumbnail} slideNumber={slideNumber} />
        )}
        {slide.type === "table" && (
          <TableSlideContent slide={slide} isThumbnail={isThumbnail} slideNumber={slideNumber} />
        )}
      </div>
    </div>
  );
}

// Navigation bar component for content slides
function SlideNavBar({ currentSection, isThumbnail }: { currentSection: string; isThumbnail: boolean }) {
  if (isThumbnail) return null;
  
  return (
    <div className="flex items-center justify-center gap-2 px-4 py-1.5 bg-muted/30 border-b text-[9px] text-muted-foreground">
      {sectionNavItems.map((item, idx) => (
        <span key={idx} className={cn(
          "whitespace-nowrap",
          currentSection.toLowerCase().includes(item.toLowerCase().split(" ")[0]) && "text-amber-600 font-semibold"
        )}>
          {item}
          {idx < sectionNavItems.length - 1 && <span className="ml-2 text-muted-foreground/50">|</span>}
        </span>
      ))}
    </div>
  );
}

// Footer component
function SlideFooter({ slideNumber, isThumbnail }: { slideNumber: number; isThumbnail: boolean }) {
  return (
    <div className={cn(
      "flex items-center justify-between border-t border-muted bg-white mt-auto",
      isThumbnail ? "px-2 py-0.5" : "px-4 py-2"
    )}>
      <div className="flex items-center gap-1.5">
        <img 
          src={logoTiffany} 
          alt="Logo" 
          className={cn(isThumbnail ? "h-2" : "h-4")}
        />
        <span className={cn(
          "font-medium text-primary uppercase tracking-widest",
          isThumbnail ? "text-[4px]" : "text-[8px]"
        )}>
          INTRIQ
        </span>
      </div>
      <span className={cn(
        "text-muted-foreground font-medium",
        isThumbnail ? "text-[5px]" : "text-xs"
      )}>
        {slideNumber}
      </span>
    </div>
  );
}

function TitleSlideContent({ slide, isThumbnail }: { slide: ReportSlide; isThumbnail: boolean }) {
  return (
    <div className="flex-1 flex flex-col bg-gradient-to-br from-[hsl(var(--primary))] via-[hsl(var(--primary)/0.95)] to-[hsl(var(--primary)/0.85)] relative overflow-hidden">
      {/* Background pattern overlay */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-white/20 to-transparent" />
        <div className="absolute bottom-0 left-0 w-1/3 h-1/2 bg-gradient-to-tr from-white/10 to-transparent" />
      </div>
      
      {/* Content area */}
      <div className="flex-1 flex relative z-10">
        {/* Left side - decorative image area */}
        <div className={cn(
          "flex-shrink-0 bg-gradient-to-br from-amber-500/20 via-orange-500/30 to-amber-600/20 relative overflow-hidden",
          isThumbnail ? "w-1/3" : "w-2/5"
        )}>
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className={cn(
              "rounded-full bg-gradient-to-br from-amber-400/30 to-orange-500/30 backdrop-blur-sm",
              isThumbnail ? "w-10 h-10" : "w-24 h-24"
            )} />
          </div>
        </div>
        
        {/* Right side - text content */}
        <div className="flex-1 flex flex-col justify-center px-6">
          {/* Logo */}
          <div className="flex items-center gap-2 mb-4">
            <img 
              src={logoTiffany}
              alt="Logo"
              className={cn(
                "brightness-0 invert",
                isThumbnail ? "h-4" : "h-8"
              )}
            />
            <span className={cn(
              "text-white/90 font-light uppercase tracking-[0.3em]",
              isThumbnail ? "text-[6px]" : "text-xs"
            )}>
              CONSULTING
            </span>
          </div>
          
          {/* Title */}
          <h1 className={cn(
            "font-bold text-white leading-tight",
            isThumbnail ? "text-lg" : "text-4xl"
          )}>
            {slide.title}
          </h1>
          
          {/* Subtitle / Report type */}
          <div className={cn(
            "text-amber-400 font-semibold uppercase tracking-wider mt-3",
            isThumbnail ? "text-[6px]" : "text-sm"
          )}>
            {slide.subtitle || "DRAFT FINANCIAL DUE DILIGENCE REPORT"}
          </div>
          
          {/* Date */}
          {slide.content.footnote && (
            <div className={cn(
              "text-white/70 mt-2",
              isThumbnail ? "text-[5px]" : "text-sm"
            )}>
              {slide.content.footnote}
            </div>
          )}
        </div>
      </div>
      
      {/* Bottom bar with logo */}
      <div className={cn(
        "bg-primary/50 border-t border-white/10 flex items-center",
        isThumbnail ? "px-2 py-0.5" : "px-4 py-2"
      )}>
        <div className="flex items-center gap-1.5">
          <img 
            src={logoTiffany}
            alt="Logo"
            className={cn(
              "brightness-0 invert opacity-80",
              isThumbnail ? "h-2" : "h-4"
            )}
          />
          <span className={cn(
            "text-white/60 font-light uppercase tracking-widest",
            isThumbnail ? "text-[3px]" : "text-[7px]"
          )}>
            CONSULTING
          </span>
        </div>
      </div>
    </div>
  );
}

function ContentSlideContent({ slide, isThumbnail, slideNumber = 1 }: { slide: ReportSlide; isThumbnail: boolean; slideNumber?: number }) {
  // Determine current section from slide
  const getSectionName = () => {
    if (slide.sectionId.includes("executive")) return "Executive Summary";
    if (slide.sectionId.includes("headline")) return "Headlines";
    if (slide.sectionId.includes("quality")) return "Quality of earnings";
    if (slide.sectionId.includes("net-debt")) return "Quality of net debt";
    if (slide.sectionId.includes("working")) return "Normalised NWC";
    return "Supporting analysis";
  };

  return (
    <div className="flex-1 flex flex-col">
      {/* Navigation bar */}
      <SlideNavBar currentSection={getSectionName()} isThumbnail={isThumbnail} />
      
      {/* Title with accent underline */}
      <div className={cn("border-b-2 border-muted", isThumbnail ? "mx-2 mt-1 pb-0.5" : "mx-6 mt-3 pb-2")}>
        <h2 className={cn(
          "font-bold text-primary",
          isThumbnail ? "text-[9px]" : "text-xl"
        )}>
          {slide.title}
        </h2>
        <div className={cn(
          "bg-amber-500 -mb-0.5 mt-1",
          isThumbnail ? "w-16 h-[2px]" : "w-48 h-1"
        )} />
      </div>

      {/* Subtitle headline */}
      {slide.content.headline && (
        <p className={cn(
          "font-semibold text-primary/90",
          isThumbnail ? "text-[6px] mx-2 mt-1" : "text-sm mx-6 mt-3"
        )}>
          {slide.content.headline}
        </p>
      )}

      {/* Main content area with left sidebar */}
      <div className={cn("flex-1 flex", isThumbnail ? "mx-2 mt-1 gap-1" : "mx-6 mt-3 gap-4")}>
        {/* Left colored sidebar with section indicator */}
        <div className={cn(
          "flex-shrink-0 bg-gradient-to-b from-primary to-primary/90 text-white flex flex-col justify-center rounded",
          isThumbnail ? "w-8 p-1" : "w-32 p-4"
        )}>
          <span className={cn(
            "font-bold leading-none",
            isThumbnail ? "text-[6px]" : "text-2xl"
          )}>
            {slideNumber}
          </span>
          <span className={cn(
            "font-semibold leading-tight mt-1",
            isThumbnail ? "text-[4px]" : "text-xs"
          )}>
            {slide.title.split(" ").slice(0, 2).join(" ")}
          </span>
        </div>

        {/* Right content area with bullets */}
        <div className="flex-1 flex flex-col gap-2">
          {slide.content.bullets && (
            <div className="space-y-1.5 flex-1">
              {slide.content.bullets.slice(0, isThumbnail ? 3 : undefined).map((bullet, idx) => (
                <div key={idx} className="flex items-start gap-2">
                  <span className={cn(
                    "text-primary font-bold flex-shrink-0",
                    isThumbnail ? "text-[5px] mt-0" : "text-sm mt-0.5"
                  )}>
                    ➤
                  </span>
                  <span className={cn(
                    "text-muted-foreground leading-relaxed",
                    isThumbnail ? "text-[5px] line-clamp-1" : "text-sm"
                  )}>
                    {bullet}
                  </span>
                </div>
              ))}
              {isThumbnail && slide.content.bullets.length > 3 && (
                <span className="text-muted-foreground text-[4px] pl-4">
                  +{slide.content.bullets.length - 3} more...
                </span>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Source footnote */}
      {slide.content.footnote && (
        <div className={cn(
          "text-muted-foreground italic border-t border-muted",
          isThumbnail ? "text-[4px] mx-2 pt-0.5 mb-0.5" : "text-xs mx-6 pt-2 mb-2"
        )}>
          {slide.content.footnote}
        </div>
      )}

      {/* Footer */}
      <SlideFooter slideNumber={slideNumber} isThumbnail={isThumbnail} />
    </div>
  );
}

function KPISlideContent({ slide, isThumbnail, slideNumber = 1 }: { slide: ReportSlide; isThumbnail: boolean; slideNumber?: number }) {
  const TrendIcon = {
    up: TrendingUp,
    down: TrendingDown,
    neutral: Minus,
  };

  const trendColor = {
    up: "text-emerald-600",
    down: "text-red-600",
    neutral: "text-muted-foreground",
  };

  const getSectionName = () => {
    if (slide.sectionId.includes("executive")) return "Executive Summary";
    if (slide.sectionId.includes("headline")) return "Headlines";
    return "Key Performance Indicators";
  };

  return (
    <div className="flex-1 flex flex-col">
      {/* Navigation bar */}
      <SlideNavBar currentSection={getSectionName()} isThumbnail={isThumbnail} />
      
      {/* Title with accent underline */}
      <div className={cn("border-b-2 border-muted", isThumbnail ? "mx-2 mt-1 pb-0.5" : "mx-6 mt-3 pb-2")}>
        <h2 className={cn(
          "font-bold text-primary",
          isThumbnail ? "text-[9px]" : "text-xl"
        )}>
          {slide.title}
        </h2>
        <div className={cn(
          "bg-amber-500 -mb-0.5 mt-1",
          isThumbnail ? "w-16 h-[2px]" : "w-48 h-1"
        )} />
      </div>

      {/* KPI Table styled like the PDF */}
      <div className={cn("flex-1", isThumbnail ? "mx-2 mt-1" : "mx-6 mt-4")}>
        <div className="border rounded overflow-hidden">
          {/* Table Header */}
          <div className={cn(
            "grid bg-primary text-white font-semibold",
            isThumbnail ? "text-[4px] gap-0.5 p-0.5" : "text-xs gap-2 p-2",
            slide.content.kpiCards && slide.content.kpiCards.length <= 4 
              ? "grid-cols-5" 
              : "grid-cols-5"
          )}>
            <div className="bg-primary/80 px-1">Metric</div>
            <div className="text-right">FY22</div>
            <div className="text-right">FY23</div>
            <div className="text-right">FY24</div>
            <div className="text-right bg-primary/80 px-1">LTM</div>
          </div>
          
          {/* KPI Rows */}
          {slide.content.kpiCards?.map((kpi, idx) => {
            const Icon = TrendIcon[kpi.trend || "neutral"];
            const trend = kpi.trend || "neutral";
            return (
              <div 
                key={idx}
                className={cn(
                  "grid items-center border-t border-muted",
                  isThumbnail ? "text-[4px] gap-0.5 p-0.5" : "text-xs gap-2 p-2",
                  idx % 2 === 0 ? "bg-white" : "bg-muted/30",
                  "grid-cols-5"
                )}
              >
                <div className={cn(
                  "font-medium text-foreground truncate",
                  isThumbnail ? "text-[4px]" : "text-xs"
                )}>
                  {kpi.label}
                </div>
                <div className="text-right text-muted-foreground">-</div>
                <div className="text-right text-muted-foreground">-</div>
                <div className="text-right text-muted-foreground">-</div>
                <div className={cn(
                  "text-right font-semibold flex items-center justify-end gap-0.5",
                  trendColor[trend]
                )}>
                  {kpi.value}
                  {kpi.change && (
                    <Icon className={isThumbnail ? "h-1.5 w-1.5" : "h-3 w-3"} />
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Source footnote */}
      {slide.content.footnote && (
        <div className={cn(
          "text-muted-foreground italic",
          isThumbnail ? "text-[4px] mx-2 mt-0.5" : "text-xs mx-6 mt-2"
        )}>
          Source: {slide.content.footnote}
        </div>
      )}

      {/* Footer */}
      <SlideFooter slideNumber={slideNumber} isThumbnail={isThumbnail} />
    </div>
  );
}

function TableSlideContent({ slide, isThumbnail, slideNumber = 1 }: { slide: ReportSlide; isThumbnail: boolean; slideNumber?: number }) {
  const tableData = slide.content.tableData;
  
  const getSectionName = () => {
    if (slide.sectionId.includes("executive")) return "Executive Summary";
    if (slide.sectionId.includes("quality")) return "Quality of earnings";
    if (slide.sectionId.includes("net-debt")) return "Quality of net debt";
    if (slide.sectionId.includes("working")) return "Normalised NWC";
    return "Supporting analysis";
  };

  return (
    <div className="flex-1 flex flex-col">
      {/* Navigation bar */}
      <SlideNavBar currentSection={getSectionName()} isThumbnail={isThumbnail} />
      
      {/* Title with accent underline */}
      <div className={cn("border-b-2 border-muted", isThumbnail ? "mx-2 mt-1 pb-0.5" : "mx-6 mt-3 pb-2")}>
        <h2 className={cn(
          "font-bold text-primary",
          isThumbnail ? "text-[9px]" : "text-xl"
        )}>
          {slide.title}
        </h2>
        <div className={cn(
          "bg-amber-500 -mb-0.5 mt-1",
          isThumbnail ? "w-16 h-[2px]" : "w-48 h-1"
        )} />
      </div>

      {/* Headline */}
      {slide.content.headline && (
        <p className={cn(
          "font-semibold text-primary/90",
          isThumbnail ? "text-[5px] mx-2 mt-0.5" : "text-sm mx-6 mt-2"
        )}>
          {slide.content.headline}
        </p>
      )}

      {/* Professional Table */}
      {tableData && (
        <div className={cn("flex-1 overflow-hidden", isThumbnail ? "mx-2 mt-1" : "mx-6 mt-3")}>
          <div className="border rounded overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="bg-primary text-white">
                  {tableData.headers.map((header, idx) => (
                    <th 
                      key={idx}
                      className={cn(
                        "font-semibold",
                        isThumbnail ? "text-[4px] px-0.5 py-0.5" : "text-xs px-3 py-2",
                        idx === 0 ? "text-left bg-primary/80" : "text-right"
                      )}
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {tableData.rows.slice(0, isThumbnail ? 5 : undefined).map((row, rowIdx) => {
                  // Check if this is a total/summary row
                  const isHighlightRow = row[0].toLowerCase().includes("adjusted") || 
                                         row[0].toLowerCase().includes("total") ||
                                         row[0].toLowerCase().includes("net");
                  return (
                    <tr 
                      key={rowIdx} 
                      className={cn(
                        "border-t border-muted",
                        isHighlightRow ? "bg-primary/5 font-semibold" : rowIdx % 2 === 0 ? "bg-white" : "bg-muted/20"
                      )}
                    >
                      {row.map((cell, cellIdx) => (
                        <td 
                          key={cellIdx}
                          className={cn(
                            isThumbnail ? "text-[4px] px-0.5 py-0.5" : "text-xs px-3 py-1.5",
                            cellIdx === 0 
                              ? "text-left font-medium text-foreground" 
                              : "text-right text-muted-foreground",
                            isHighlightRow && "text-foreground"
                          )}
                        >
                          {cell}
                        </td>
                      ))}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Source footnote */}
      {slide.content.footnote && (
        <div className={cn(
          "text-muted-foreground italic",
          isThumbnail ? "text-[3px] mx-2 mt-0.5" : "text-xs mx-6 mt-2"
        )}>
          Source: {slide.content.footnote}
        </div>
      )}

      {/* Footer */}
      <SlideFooter slideNumber={slideNumber} isThumbnail={isThumbnail} />
    </div>
  );
}