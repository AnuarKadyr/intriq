import { ReportSection } from "@/types/reportGenerator";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { 
  FileText, 
  Newspaper, 
  TrendingUp, 
  Wallet, 
  RefreshCw, 
  BarChart2, 
  Paperclip,
  ChevronDown,
  ChevronRight
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

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-foreground">Report Sections</h3>
        <Badge variant="secondary">
          {selectedCount} of {sections.length} selected
        </Badge>
      </div>

      <div className="space-y-2">
        {sections.map((section) => {
          const IconComponent = iconMap[section.icon] || FileText;
          const isExpanded = expandedSections.has(section.id);
          const selectedSubsections = section.subsections?.filter(s => s.isSelected).length || 0;
          const totalSubsections = section.subsections?.length || 0;

          return (
            <Card 
              key={section.id}
              className={cn(
                "transition-all duration-200",
                section.isSelected ? "ring-2 ring-primary/50 bg-accent/30" : "hover:bg-muted/50"
              )}
            >
              <div className="p-4">
                <div className="flex items-start gap-3">
                  <Checkbox
                    checked={section.isSelected}
                    onCheckedChange={() => onSectionToggle(section.id)}
                    className="mt-1"
                  />
                  
                  <div 
                    className={cn(
                      "w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0",
                      section.isSelected ? "bg-primary text-primary-foreground" : "bg-muted"
                    )}
                  >
                    <IconComponent className="h-4 w-4" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h4 className="font-medium text-sm text-foreground">
                        {section.name}
                      </h4>
                      {section.subsections && section.subsections.length > 0 && (
                        <Badge variant="outline" className="text-xs">
                          {selectedSubsections}/{totalSubsections}
                        </Badge>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2">
                      {section.description}
                    </p>
                  </div>

                  {section.subsections && section.subsections.length > 0 && (
                    <button
                      onClick={() => toggleExpanded(section.id)}
                      className="p-1 hover:bg-muted rounded transition-colors"
                    >
                      {isExpanded ? (
                        <ChevronDown className="h-4 w-4 text-muted-foreground" />
                      ) : (
                        <ChevronRight className="h-4 w-4 text-muted-foreground" />
                      )}
                    </button>
                  )}
                </div>

                {/* Subsections */}
                {isExpanded && section.subsections && section.subsections.length > 0 && (
                  <div className="mt-3 ml-12 space-y-2 border-l-2 border-muted pl-4">
                    {section.subsections.map((subsection) => (
                      <div 
                        key={subsection.id}
                        className="flex items-center gap-2"
                      >
                        <Checkbox
                          checked={subsection.isSelected && section.isSelected}
                          disabled={!section.isSelected}
                          onCheckedChange={() => onSubsectionToggle(section.id, subsection.id)}
                          className="h-3.5 w-3.5"
                        />
                        <span className={cn(
                          "text-xs",
                          section.isSelected ? "text-foreground" : "text-muted-foreground"
                        )}>
                          {subsection.name}
                        </span>
                      </div>
                    ))}
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
