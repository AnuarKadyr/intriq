import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import logoBlack from "@/assets/logo-black.svg";

const steps = [
  { id: 1, name: "Engagement Details" },
  { id: 2, name: "Engagement Letter" },
  { id: 3, name: "Client Data Upload" },
  { id: 4, name: "Add Team" },
];

const industries = [
  "Technology",
  "Healthcare",
  "Financial Services",
  "Manufacturing",
  "Retail",
  "Energy",
  "Real Estate",
  "Telecommunications",
  "Consumer Goods",
  "Other",
];

const Onboarding = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    engagementName: "",
    industry: "",
    projectLead: "",
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const isStepComplete = () => {
    return (
      formData.engagementName.trim() !== "" &&
      formData.industry !== "" &&
      formData.projectLead.trim() !== ""
    );
  };

  const handleContinue = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <img src={logoBlack} alt="Intriq AI" className="h-8" />
          <Button variant="ghost" size="sm" onClick={() => navigate("/")}>
            Back to Home
          </Button>
        </div>
      </header>

      {/* Stepper */}
      <div className="container mx-auto px-6 py-10">
        <div className="flex items-center justify-center">
          {steps.map((step, stepIdx) => (
            <div key={step.id} className="flex items-center">
              {/* Step Circle and Label */}
              <div className="flex flex-col items-center">
                <div
                  className={`
                    relative flex h-12 w-12 items-center justify-center rounded-full 
                    transition-all duration-300 ease-out
                    ${
                      step.id < currentStep
                        ? "bg-primary text-primary-foreground shadow-lg shadow-primary/30"
                        : step.id === currentStep
                        ? "bg-gradient-to-br from-primary to-primary/80 text-primary-foreground shadow-lg shadow-primary/40 ring-4 ring-primary/20"
                        : "bg-muted text-muted-foreground"
                    }
                  `}
                >
                  {step.id < currentStep ? (
                    <Check className="h-5 w-5" strokeWidth={3} />
                  ) : (
                    <span className="text-sm font-semibold">{step.id}</span>
                  )}
                </div>
                <span
                  className={`
                    mt-3 text-sm font-medium text-center max-w-[100px] leading-tight
                    transition-colors duration-300
                    ${
                      step.id === currentStep
                        ? "text-foreground"
                        : step.id < currentStep
                        ? "text-primary"
                        : "text-muted-foreground"
                    }
                  `}
                >
                  {step.name}
                </span>
              </div>

              {/* Connector Line */}
              {stepIdx !== steps.length - 1 && (
                <div className="flex items-center mx-4 -mt-8">
                  <div
                    className={`
                      h-1 w-16 sm:w-24 md:w-32 rounded-full transition-all duration-500
                      ${
                        step.id < currentStep
                          ? "bg-gradient-to-r from-primary to-primary"
                          : "bg-muted"
                      }
                    `}
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Form Content */}
      <div className="container mx-auto px-6 py-8 max-w-xl">
        <div className="bg-card rounded-xl border border-border p-8 shadow-intriq-md">
          <h1 className="text-2xl font-semibold text-foreground mb-2">
            Start a New Engagement
          </h1>
          <p className="text-muted-foreground mb-8">
            Enter the details for your new due diligence engagement.
          </p>

          <div className="space-y-6">
            {/* Engagement Name */}
            <div className="space-y-2">
              <Label htmlFor="engagementName" className="text-foreground">
                Engagement Name
              </Label>
              <Input
                id="engagementName"
                placeholder="e.g., Project Alpha Acquisition"
                value={formData.engagementName}
                onChange={(e) =>
                  handleInputChange("engagementName", e.target.value)
                }
                className="bg-background"
              />
            </div>

            {/* Industry */}
            <div className="space-y-2">
              <Label htmlFor="industry" className="text-foreground">
                Industry
              </Label>
              <Select
                value={formData.industry}
                onValueChange={(value) => handleInputChange("industry", value)}
              >
                <SelectTrigger className="bg-background">
                  <SelectValue placeholder="Select an industry" />
                </SelectTrigger>
                <SelectContent>
                  {industries.map((industry) => (
                    <SelectItem key={industry} value={industry}>
                      {industry}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Project Lead */}
            <div className="space-y-2">
              <Label htmlFor="projectLead" className="text-foreground">
                Project Lead
              </Label>
              <Input
                id="projectLead"
                placeholder="e.g., John Smith"
                value={formData.projectLead}
                onChange={(e) =>
                  handleInputChange("projectLead", e.target.value)
                }
                className="bg-background"
              />
            </div>
          </div>

          {/* Actions */}
          <div className="mt-8 flex justify-end gap-3">
            <Button variant="outline" onClick={() => navigate("/")}>
              Cancel
            </Button>
            <Button
              onClick={handleContinue}
              disabled={!isStepComplete()}
              className="bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              Continue
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Onboarding;
