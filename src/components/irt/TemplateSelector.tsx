import { Upload, FileSpreadsheet, ChevronRight, DollarSign, TrendingUp, ShoppingBag, Settings, LucideIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { irtTemplates } from "@/data/irtTemplates";
import { IRTTemplate } from "@/types/irt";

interface TemplateSelectorProps {
  onSelectTemplate: (template: IRTTemplate) => void;
  onUploadTemplate: () => void;
}

const iconMap: Record<string, LucideIcon> = {
  DollarSign,
  TrendingUp,
  ShoppingBag,
  Settings,
};

const iconColorMap: Record<string, string> = {
  DollarSign: "bg-emerald-100 text-emerald-600",
  TrendingUp: "bg-blue-100 text-blue-600",
  ShoppingBag: "bg-purple-100 text-purple-600",
  Settings: "bg-amber-100 text-amber-600",
};

export function TemplateSelector({ onSelectTemplate, onUploadTemplate }: TemplateSelectorProps) {
  return (
    <div className="space-y-8 animate-fade-in">
      <div className="text-center max-w-2xl mx-auto">
        <h2 className="text-2xl font-bold text-gray-900 mb-3">
          Select a Template or Upload Your Own
        </h2>
        <p className="text-gray-500">
          Choose from pre-configured information request templates or upload your custom template in Excel or PDF format.
        </p>
      </div>

      {/* Template Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {irtTemplates.map((template) => {
          const IconComponent = iconMap[template.icon] || Settings;
          const iconColorClass = iconColorMap[template.icon] || "bg-gray-100 text-gray-600";
          
          return (
            <Card
              key={template.id}
              className="cursor-pointer border-gray-200 hover:border-primary hover:shadow-lg transition-all duration-200 group"
              onClick={() => onSelectTemplate(template)}
            >
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${iconColorClass}`}>
                      <IconComponent className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 group-hover:text-primary transition-colors">
                        {template.name}
                      </h3>
                      <p className="text-sm text-gray-500 mt-1">{template.description}</p>
                      <p className="text-xs text-gray-400 mt-2">
                        {template.items.length} items
                      </p>
                    </div>
                  </div>
                  <ChevronRight className="h-5 w-5 text-gray-300 group-hover:text-primary transition-colors" />
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Upload Section */}
      <div className="border-t border-gray-200 pt-8">
        <Card className="border-dashed border-2 border-gray-300 hover:border-primary transition-colors">
          <CardContent className="p-8">
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <Upload className="h-8 w-8 text-gray-400" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">
                Upload Custom Template
              </h3>
              <p className="text-sm text-gray-500 mb-4 max-w-md">
                Upload your own information request template in Excel (.xlsx, .xls) or PDF format. 
                We'll automatically parse and digitize it.
              </p>
              <div className="flex gap-3">
                <Button onClick={onUploadTemplate} className="gap-2">
                  <FileSpreadsheet className="h-4 w-4" />
                  Upload Template
                </Button>
              </div>
              <p className="text-xs text-gray-400 mt-4">
                Supported formats: .xlsx, .xls, .pdf
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}