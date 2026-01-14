import { ReportSlide } from "@/types/reportGenerator";
import { cn } from "@/lib/utils";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";

interface SlidePreviewProps {
  slide: ReportSlide;
  isSelected: boolean;
  onClick: () => void;
  isThumbnail?: boolean;
}

export function SlidePreview({ 
  slide, 
  isSelected, 
  onClick, 
  isThumbnail = false 
}: SlidePreviewProps) {
  const baseClasses = cn(
    "bg-white rounded-lg shadow-md border overflow-hidden transition-all duration-200",
    isSelected && "ring-2 ring-primary border-transparent shadow-lg",
    isThumbnail && "cursor-pointer hover:shadow-lg hover:scale-[1.02]"
  );

  const aspectRatio = "aspect-[16/9]";

  return (
    <div className={cn(baseClasses, aspectRatio)} onClick={onClick}>
      <div className="w-full h-full p-4 flex flex-col">
        {slide.type === "title" && (
          <TitleSlideContent slide={slide} isThumbnail={isThumbnail} />
        )}
        {slide.type === "content" && (
          <ContentSlideContent slide={slide} isThumbnail={isThumbnail} />
        )}
        {slide.type === "kpi" && (
          <KPISlideContent slide={slide} isThumbnail={isThumbnail} />
        )}
        {slide.type === "table" && (
          <TableSlideContent slide={slide} isThumbnail={isThumbnail} />
        )}
      </div>
    </div>
  );
}

function TitleSlideContent({ slide, isThumbnail }: { slide: ReportSlide; isThumbnail: boolean }) {
  return (
    <div className="flex-1 flex flex-col items-center justify-center text-center">
      <div className={cn(
        "bg-gradient-to-r from-primary to-primary/70 mb-4 rounded-full",
        isThumbnail ? "w-8 h-1" : "w-16 h-1.5"
      )} />
      <h2 className={cn(
        "font-bold text-foreground",
        isThumbnail ? "text-sm" : "text-3xl"
      )}>
        {slide.title}
      </h2>
      {slide.subtitle && (
        <p className={cn(
          "text-muted-foreground mt-2",
          isThumbnail ? "text-[8px]" : "text-lg"
        )}>
          {slide.subtitle}
        </p>
      )}
      {slide.content.footnote && (
        <p className={cn(
          "text-muted-foreground mt-auto",
          isThumbnail ? "text-[6px]" : "text-sm"
        )}>
          {slide.content.footnote}
        </p>
      )}
    </div>
  );
}

function ContentSlideContent({ slide, isThumbnail }: { slide: ReportSlide; isThumbnail: boolean }) {
  return (
    <div className="flex-1 flex flex-col">
      {/* Header bar */}
      <div className="flex items-center gap-2 pb-2 border-b border-muted mb-3">
        <div className={cn(
          "bg-gradient-to-b from-primary to-primary/70 rounded-full",
          isThumbnail ? "w-1 h-4" : "w-1.5 h-7"
        )} />
        <h3 className={cn(
          "font-bold text-foreground",
          isThumbnail ? "text-[10px]" : "text-xl"
        )}>
          {slide.title}
        </h3>
      </div>

      {slide.content.headline && (
        <p className={cn(
          "font-semibold text-foreground mb-2",
          isThumbnail ? "text-[7px]" : "text-base"
        )}>
          {slide.content.headline}
        </p>
      )}

      {slide.content.bullets && (
        <ul className={cn(
          "space-y-1.5 flex-1",
          isThumbnail ? "text-[6px]" : "text-sm"
        )}>
          {slide.content.bullets.slice(0, isThumbnail ? 3 : undefined).map((bullet, idx) => (
            <li key={idx} className="flex items-start gap-2 text-muted-foreground">
              <span className={cn(
                "text-primary font-bold mt-0.5",
                isThumbnail ? "text-[6px]" : "text-sm"
              )}>•</span>
              <span className={isThumbnail ? "line-clamp-1" : "leading-relaxed"}>{bullet}</span>
            </li>
          ))}
          {isThumbnail && slide.content.bullets.length > 3 && (
            <li className="text-muted-foreground text-[5px] pl-3">
              +{slide.content.bullets.length - 3} more...
            </li>
          )}
        </ul>
      )}

      {slide.content.footnote && (
        <p className={cn(
          "text-muted-foreground mt-auto pt-2 border-t border-muted italic",
          isThumbnail ? "text-[5px]" : "text-xs"
        )}>
          {slide.content.footnote}
        </p>
      )}
    </div>
  );
}

function KPISlideContent({ slide, isThumbnail }: { slide: ReportSlide; isThumbnail: boolean }) {
  const TrendIcon = {
    up: TrendingUp,
    down: TrendingDown,
    neutral: Minus,
  };

  const trendColor = {
    up: "text-emerald-600",
    down: "text-red-600",
    neutral: "text-gray-600",
  };

  const trendBg = {
    up: "bg-emerald-50",
    down: "bg-red-50",
    neutral: "bg-gray-50",
  };

  return (
    <div className="flex-1 flex flex-col">
      {/* Header */}
      <div className="flex items-center gap-2 pb-2 border-b border-muted mb-3">
        <div className={cn(
          "bg-gradient-to-b from-primary to-primary/70 rounded-full",
          isThumbnail ? "w-1 h-4" : "w-1.5 h-7"
        )} />
        <h3 className={cn(
          "font-bold text-foreground",
          isThumbnail ? "text-[10px]" : "text-xl"
        )}>
          {slide.title}
        </h3>
      </div>

      {/* KPI Grid */}
      <div className={cn(
        "grid flex-1 gap-3",
        slide.content.kpiCards && slide.content.kpiCards.length <= 4 
          ? "grid-cols-2" 
          : "grid-cols-3"
      )}>
        {slide.content.kpiCards?.map((kpi, idx) => {
          const Icon = TrendIcon[kpi.trend || "neutral"];
          const trend = kpi.trend || "neutral";
          return (
            <div 
              key={idx}
              className={cn(
                "rounded-xl flex flex-col items-center justify-center text-center border",
                isThumbnail ? "p-1.5 bg-gray-50" : "p-4 bg-gradient-to-br from-gray-50 to-gray-100/50"
              )}
            >
              <span className={cn(
                "text-muted-foreground font-medium",
                isThumbnail ? "text-[5px]" : "text-xs"
              )}>
                {kpi.label}
              </span>
              <span className={cn(
                "font-bold text-foreground",
                isThumbnail ? "text-[9px]" : "text-2xl"
              )}>
                {kpi.value}
              </span>
              {kpi.change && (
                <div className={cn(
                  "flex items-center gap-0.5 px-1.5 py-0.5 rounded-full mt-1",
                  trendBg[trend]
                )}>
                  <Icon className={cn(
                    trendColor[trend],
                    isThumbnail ? "h-2 w-2" : "h-3.5 w-3.5"
                  )} />
                  <span className={cn(
                    "font-semibold",
                    trendColor[trend],
                    isThumbnail ? "text-[5px]" : "text-xs"
                  )}>
                    {kpi.change}
                  </span>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {slide.content.footnote && (
        <p className={cn(
          "text-muted-foreground mt-auto pt-2 border-t border-muted italic",
          isThumbnail ? "text-[5px]" : "text-xs"
        )}>
          {slide.content.footnote}
        </p>
      )}
    </div>
  );
}

function TableSlideContent({ slide, isThumbnail }: { slide: ReportSlide; isThumbnail: boolean }) {
  const tableData = slide.content.tableData;
  
  return (
    <div className="flex-1 flex flex-col">
      {/* Header */}
      <div className="flex items-center gap-2 pb-2 border-b border-muted mb-2">
        <div className={cn(
          "bg-gradient-to-b from-primary to-primary/70 rounded-full",
          isThumbnail ? "w-1 h-4" : "w-1.5 h-7"
        )} />
        <h3 className={cn(
          "font-bold text-foreground",
          isThumbnail ? "text-[10px]" : "text-xl"
        )}>
          {slide.title}
        </h3>
      </div>

      {slide.content.headline && (
        <p className={cn(
          "font-semibold text-foreground mb-2",
          isThumbnail ? "text-[6px]" : "text-base"
        )}>
          {slide.content.headline}
        </p>
      )}

      {/* Table */}
      {tableData && (
        <div className="flex-1 overflow-hidden rounded-lg border">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-100">
                {tableData.headers.map((header, idx) => (
                  <th 
                    key={idx}
                    className={cn(
                      "text-left font-bold text-foreground px-2 py-1",
                      isThumbnail ? "text-[5px]" : "text-xs",
                      idx === 0 && "bg-gray-200"
                    )}
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {tableData.rows.slice(0, isThumbnail ? 4 : undefined).map((row, rowIdx) => (
                <tr key={rowIdx} className="border-t border-gray-100">
                  {row.map((cell, cellIdx) => (
                    <td 
                      key={cellIdx}
                      className={cn(
                        "px-2 py-1",
                        isThumbnail ? "text-[5px]" : "text-xs",
                        cellIdx === 0 
                          ? "font-medium text-foreground bg-gray-50" 
                          : "text-muted-foreground"
                      )}
                    >
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {slide.content.footnote && (
        <p className={cn(
          "text-muted-foreground mt-auto pt-1 border-t border-muted italic",
          isThumbnail ? "text-[4px]" : "text-xs"
        )}>
          {slide.content.footnote}
        </p>
      )}
    </div>
  );
}
