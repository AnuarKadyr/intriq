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
  { id: 1, name: "New Engagement" },
  { id: 2, name: "Upload Documents" },
  { id: 3, name: "Review & Start" },
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
      <div className="container mx-auto px-6 py-8">
        <nav aria-label="Progress">
          <ol className="flex items-center justify-center">
            {steps.map((step, stepIdx) => (
              <li
                key={step.name}
                className={`relative ${
                  stepIdx !== steps.length - 1 ? "pr-20 sm:pr-32" : ""
                }`}
              >
                <div className="flex items-center">
                  <div
                    className={`relative flex h-10 w-10 items-center justify-center rounded-full border-2 transition-colors ${
                      step.id < currentStep
                        ? "border-primary bg-primary text-primary-foreground"
                        : step.id === currentStep
                        ? "border-primary bg-background text-primary"
                        : "border-muted-foreground/30 bg-background text-muted-foreground"
                    }`}
                  >
                    {step.id < currentStep ? (
                      <Check className="h-5 w-5" />
                    ) : (
                      <span className="text-sm font-medium">{step.id}</span>
                    )}
                  </div>
                  <span
                    className={`ml-4 text-sm font-medium whitespace-nowrap ${
                      step.id === currentStep
                        ? "text-foreground"
                        : "text-muted-foreground"
                    }`}
                  >
                    {step.name}
                  </span>
                </div>
                {stepIdx !== steps.length - 1 && (
                  <div
                    className={`absolute top-5 left-10 -ml-px h-0.5 w-16 sm:w-28 ${
                      step.id < currentStep ? "bg-primary" : "bg-muted"
                    }`}
                  />
                )}
              </li>
            ))}
          </ol>
        </nav>
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
