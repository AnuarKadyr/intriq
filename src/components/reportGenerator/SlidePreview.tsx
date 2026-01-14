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
    isSelected && "ring-2 ring-primary shadow-lg",
    isThumbnail && "cursor-pointer hover:shadow-lg hover:scale-[1.02]"
  );

  const aspectRatio = isThumbnail ? "aspect-[16/9]" : "aspect-[16/9]";

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
        "w-12 h-1 bg-primary mb-4",
        isThumbnail && "w-6 mb-2"
      )} />
      <h2 className={cn(
        "font-bold text-foreground",
        isThumbnail ? "text-sm" : "text-2xl"
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
          "w-1 bg-primary rounded-full",
          isThumbnail ? "h-3" : "h-6"
        )} />
        <h3 className={cn(
          "font-semibold text-foreground",
          isThumbnail ? "text-[9px]" : "text-lg"
        )}>
          {slide.title}
        </h3>
      </div>

      {slide.content.headline && (
        <p className={cn(
          "font-medium text-foreground mb-2",
          isThumbnail ? "text-[7px]" : "text-sm"
        )}>
          {slide.content.headline}
        </p>
      )}

      {slide.content.bullets && (
        <ul className={cn(
          "space-y-1 flex-1",
          isThumbnail ? "text-[6px]" : "text-sm"
        )}>
          {slide.content.bullets.slice(0, isThumbnail ? 3 : undefined).map((bullet, idx) => (
            <li key={idx} className="flex items-start gap-1.5 text-muted-foreground">
              <span className="text-primary mt-0.5">•</span>
              <span className={isThumbnail ? "line-clamp-1" : ""}>{bullet}</span>
            </li>
          ))}
          {isThumbnail && slide.content.bullets.length > 3 && (
            <li className="text-muted-foreground text-[5px]">
              +{slide.content.bullets.length - 3} more...
            </li>
          )}
        </ul>
      )}

      {slide.content.footnote && (
        <p className={cn(
          "text-muted-foreground mt-auto pt-2 border-t border-muted",
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

  return (
    <div className="flex-1 flex flex-col">
      {/* Header */}
      <div className="flex items-center gap-2 pb-2 border-b border-muted mb-3">
        <div className={cn(
          "w-1 bg-primary rounded-full",
          isThumbnail ? "h-3" : "h-6"
        )} />
        <h3 className={cn(
          "font-semibold text-foreground",
          isThumbnail ? "text-[9px]" : "text-lg"
        )}>
          {slide.title}
        </h3>
      </div>

      {/* KPI Grid */}
      <div className={cn(
        "grid flex-1 gap-2",
        slide.content.kpiCards && slide.content.kpiCards.length <= 4 
          ? "grid-cols-2" 
          : "grid-cols-3"
      )}>
        {slide.content.kpiCards?.map((kpi, idx) => {
          const Icon = TrendIcon[kpi.trend || "neutral"];
          return (
            <div 
              key={idx}
              className={cn(
                "bg-muted/50 rounded-lg flex flex-col items-center justify-center text-center",
                isThumbnail ? "p-1" : "p-3"
              )}
            >
              <span className={cn(
                "text-muted-foreground",
                isThumbnail ? "text-[5px]" : "text-xs"
              )}>
                {kpi.label}
              </span>
              <span className={cn(
                "font-bold text-foreground",
                isThumbnail ? "text-[8px]" : "text-xl"
              )}>
                {kpi.value}
              </span>
              {kpi.change && (
                <div className={cn(
                  "flex items-center gap-0.5",
                  trendColor[kpi.trend || "neutral"]
                )}>
                  <Icon className={isThumbnail ? "h-2 w-2" : "h-3 w-3"} />
                  <span className={isThumbnail ? "text-[5px]" : "text-xs"}>
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
          "text-muted-foreground mt-auto pt-2 border-t border-muted",
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
          "w-1 bg-primary rounded-full",
          isThumbnail ? "h-3" : "h-6"
        )} />
        <h3 className={cn(
          "font-semibold text-foreground",
          isThumbnail ? "text-[9px]" : "text-lg"
        )}>
          {slide.title}
        </h3>
      </div>

      {slide.content.headline && (
        <p className={cn(
          "font-medium text-foreground mb-2",
          isThumbnail ? "text-[6px]" : "text-sm"
        )}>
          {slide.content.headline}
        </p>
      )}

      {/* Table */}
      {tableData && (
        <div className="flex-1 overflow-hidden">
          <table className="w-full">
            <thead>
              <tr>
                {tableData.headers.map((header, idx) => (
                  <th 
                    key={idx}
                    className={cn(
                      "text-left font-semibold text-foreground bg-muted/50 px-1 py-0.5",
                      isThumbnail ? "text-[5px]" : "text-xs"
                    )}
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {tableData.rows.slice(0, isThumbnail ? 4 : undefined).map((row, rowIdx) => (
                <tr key={rowIdx} className="border-b border-muted/50">
                  {row.map((cell, cellIdx) => (
                    <td 
                      key={cellIdx}
                      className={cn(
                        "text-muted-foreground px-1 py-0.5",
                        isThumbnail ? "text-[5px]" : "text-xs",
                        cellIdx === 0 && "font-medium text-foreground"
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
          "text-muted-foreground mt-auto pt-1 border-t border-muted",
          isThumbnail ? "text-[4px]" : "text-xs"
        )}>
          {slide.content.footnote}
        </p>
      )}
    </div>
  );
}
