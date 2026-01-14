import { ReportSection } from "@/types/reportGenerator";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  FileText, 
  Newspaper, 
  TrendingUp, 
  Wallet, 
  RefreshCw, 
  BarChart2, 
  Paperclip,
  ChevronDown,
  ChevronRight,
  CheckCheck,
  XCircle
} from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  FileText,
  Newspaper,
  TrendingUp,
  Wallet,
  RefreshCw,
  BarChart2,
  Paperclip,
};

const iconColorMap: Record<string, string> = {
  FileText: "from-blue-500 to-blue-600",
  Newspaper: "from-violet-500 to-violet-600",
  TrendingUp: "from-emerald-500 to-emerald-600",
  Wallet: "from-amber-500 to-amber-600",
  RefreshCw: "from-cyan-500 to-cyan-600",
  BarChart2: "from-rose-500 to-rose-600",
  Paperclip: "from-gray-500 to-gray-600",
};

interface SectionSelectorProps {
  sections: ReportSection[];
  onSectionToggle: (sectionId: string) => void;
  onSubsectionToggle: (sectionId: string, subsectionId: string) => void;
}

export function SectionSelector({ 
  sections, 
  onSectionToggle, 
  onSubsectionToggle 
}: SectionSelectorProps) {
  const [expandedSections, setExpandedSections] = useState<Set<string>>(
    new Set(sections.filter(s => s.isSelected).map(s => s.id))
  );

  const toggleExpanded = (sectionId: string) => {
    const newExpanded = new Set(expandedSections);
    if (newExpanded.has(sectionId)) {
      newExpanded.delete(sectionId);
    } else {
      newExpanded.add(sectionId);
    }
    setExpandedSections(newExpanded);
  };

  const selectedCount = sections.filter(s => s.isSelected).length;

  const handleSelectAll = () => {
    sections.forEach(s => {
      if (!s.isSelected) onSectionToggle(s.id);
    });
  };

  const handleDeselectAll = () => {
    sections.forEach(s => {
      if (s.isSelected) onSectionToggle(s.id);
    });
  };

  return (
    <div className="space-y-4">
      {/* Header with actions */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <h3 className="text-lg font-semibold text-foreground">Report Sections</h3>
          <Badge variant="secondary" className="font-mono">
            {selectedCount}/{sections.length}
          </Badge>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleSelectAll}
            className="gap-1.5 text-xs"
          >
            <CheckCheck className="h-3.5 w-3.5" />
            Select All
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={handleDeselectAll}
            className="gap-1.5 text-xs"
          >
            <XCircle className="h-3.5 w-3.5" />
            Clear
          </Button>
        </div>
      </div>

      {/* Section Cards */}
      <div className="space-y-3">
        {sections.map((section) => {
          const IconComponent = iconMap[section.icon] || FileText;
          const iconColor = iconColorMap[section.icon] || "from-gray-500 to-gray-600";
          const isExpanded = expandedSections.has(section.id);
          const selectedSubsections = section.subsections?.filter(s => s.isSelected).length || 0;
          const totalSubsections = section.subsections?.length || 0;

          return (
            <Card 
              key={section.id}
              className={cn(
                "transition-all duration-200 overflow-hidden",
                section.isSelected 
                  ? "ring-2 ring-primary border-transparent bg-primary/5 shadow-sm" 
                  : "hover:bg-muted/50 hover:shadow-sm"
              )}
            >
              <div className="p-4">
                <div className="flex items-start gap-4">
                  {/* Checkbox */}
                  <div className="pt-1">
                    <Checkbox
                      checked={section.isSelected}
                      onCheckedChange={() => onSectionToggle(section.id)}
                      className="h-5 w-5"
                    />
                  </div>
                  
                  {/* Icon */}
                  <div className={cn(
                    "w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm transition-all",
                    section.isSelected 
                      ? `bg-gradient-to-br ${iconColor}` 
                      : "bg-gray-100"
                  )}>
                    <IconComponent className={cn(
                      "h-5 w-5",
                      section.isSelected ? "text-white" : "text-gray-500"
                    )} />
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className={cn(
                        "font-semibold text-sm transition-colors",
                        section.isSelected ? "text-foreground" : "text-muted-foreground"
                      )}>
                        {section.name}
                      </h4>
                      {section.subsections && section.subsections.length > 0 && (
                        <Badge 
                          variant="outline" 
                          className={cn(
                            "text-[10px] px-1.5 py-0",
                            section.isSelected ? "border-primary/30 text-primary" : ""
                          )}
                        >
                          {selectedSubsections}/{totalSubsections} subsections
                        </Badge>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {section.description}
                    </p>
                  </div>

                  {/* Expand Button */}
                  {section.subsections && section.subsections.length > 0 && (
                    <button
                      onClick={() => toggleExpanded(section.id)}
                      className={cn(
                        "p-2 rounded-lg transition-colors",
                        isExpanded ? "bg-primary/10 text-primary" : "hover:bg-muted text-muted-foreground"
                      )}
                    >
                      {isExpanded ? (
                        <ChevronDown className="h-4 w-4" />
                      ) : (
                        <ChevronRight className="h-4 w-4" />
                      )}
                    </button>
                  )}
                </div>

                {/* Subsections */}
                {isExpanded && section.subsections && section.subsections.length > 0 && (
                  <div className="mt-4 ml-14 pt-3 border-t border-dashed border-gray-200">
                    <div className="grid grid-cols-2 gap-2">
                      {section.subsections.map((subsection) => (
                        <div 
                          key={subsection.id}
                          className={cn(
                            "flex items-center gap-2 px-3 py-2 rounded-lg transition-colors",
                            subsection.isSelected && section.isSelected 
                              ? "bg-primary/10" 
                              : "bg-gray-50",
                            !section.isSelected && "opacity-50"
                          )}
                        >
                          <Checkbox
                            checked={subsection.isSelected && section.isSelected}
                            disabled={!section.isSelected}
                            onCheckedChange={() => onSubsectionToggle(section.id, subsection.id)}
                            className="h-4 w-4"
                          />
                          <span className={cn(
                            "text-xs",
                            subsection.isSelected && section.isSelected 
                              ? "text-foreground font-medium" 
                              : "text-muted-foreground"
                          )}>
                            {subsection.name}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
