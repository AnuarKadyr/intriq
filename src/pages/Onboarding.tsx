import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Check, Upload, FileText, X } from "lucide-react";
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
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const isStep1Complete = () => {
    return (
      formData.engagementName.trim() !== "" &&
      formData.industry !== "" &&
      formData.projectLead.trim() !== ""
    );
  };

  const isStep2Complete = () => {
    return uploadedFile !== null;
  };

  const handleContinue = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    } else {
      navigate("/");
    }
  };

  const handleFileSelect = (file: File) => {
    const allowedTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];
    if (allowedTypes.includes(file.type)) {
      setUploadedFile(file);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFileSelect(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFileSelect(file);
  };

  const removeFile = () => {
    setUploadedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + " B";
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
    return (bytes / (1024 * 1024)).toFixed(1) + " MB";
  };

  const canContinue = () => {
    if (currentStep === 1) return isStep1Complete();
    if (currentStep === 2) return isStep2Complete();
    return true;
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
      <div className="container mx-auto px-6 py-6">
        <div className="flex items-center justify-center">
          {steps.map((step, stepIdx) => (
            <div key={step.id} className="flex items-center">
              {/* Step Circle and Label */}
              <div className="flex flex-col items-center">
                <div
                  className={`
                    relative flex h-8 w-8 items-center justify-center rounded-full 
                    transition-all duration-300 ease-out text-xs
                    ${
                      step.id < currentStep
                        ? "bg-primary text-primary-foreground"
                        : step.id === currentStep
                        ? "bg-primary text-primary-foreground ring-[3px] ring-primary/20"
                        : "bg-muted text-muted-foreground"
                    }
                  `}
                >
                  {step.id < currentStep ? (
                    <Check className="h-3.5 w-3.5" strokeWidth={3} />
                  ) : (
                    <span className="font-semibold">{step.id}</span>
                  )}
                </div>
                <span
                  className={`
                    mt-2 text-xs font-medium whitespace-nowrap
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
                <div className="flex items-center mx-3 -mt-6">
                  <div
                    className={`
                      h-[2px] w-12 sm:w-16 rounded-full transition-all duration-500
                      ${step.id < currentStep ? "bg-primary" : "bg-muted"}
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
          {/* Step 1: Engagement Details */}
          {currentStep === 1 && (
            <>
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
            </>
          )}

          {/* Step 2: Engagement Letter */}
          {currentStep === 2 && (
            <>
              <h1 className="text-2xl font-semibold text-foreground mb-2">
                Upload Engagement Letter
              </h1>
              <p className="text-muted-foreground mb-8">
                Upload the engagement letter to set up your project. Key scope and
                deliverables will be pulled automatically to build AI agents that
                mirror your workstreams.
              </p>

              <div className="space-y-6">
                {/* Upload Area */}
                <div
                  className={`
                    relative border-2 border-dashed rounded-xl p-8 text-center
                    transition-all duration-200 cursor-pointer
                    ${
                      isDragOver
                        ? "border-primary bg-primary/5"
                        : uploadedFile
                        ? "border-primary/50 bg-primary/5"
                        : "border-border hover:border-primary/50 hover:bg-muted/50"
                    }
                  `}
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onClick={() => fileInputRef.current?.click()}
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".pdf,.doc,.docx"
                    className="hidden"
                    onChange={handleFileInputChange}
                  />

                  {uploadedFile ? (
                    <div className="flex items-center justify-center gap-4">
                      <div className="flex items-center gap-3 bg-background rounded-lg px-4 py-3 border border-border">
                        <FileText className="h-8 w-8 text-primary" />
                        <div className="text-left">
                          <p className="text-sm font-medium text-foreground truncate max-w-[200px]">
                            {uploadedFile.name}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {formatFileSize(uploadedFile.size)}
                          </p>
                        </div>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            removeFile();
                          }}
                          className="ml-2 p-1 rounded-full hover:bg-muted transition-colors"
                        >
                          <X className="h-4 w-4 text-muted-foreground" />
                        </button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="mx-auto w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                        <Upload className="h-6 w-6 text-primary" />
                      </div>
                      <p className="text-foreground font-medium mb-1">
                        Drop your file here, or click to browse
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Supports PDF, DOC, DOCX (max 20MB)
                      </p>
                    </>
                  )}
                </div>
              </div>
            </>
          )}

          {/* Step 3: Client Data Upload - Placeholder */}
          {currentStep === 3 && (
            <>
              <h1 className="text-2xl font-semibold text-foreground mb-2">
                Client Data Upload
              </h1>
              <p className="text-muted-foreground mb-8">
                Upload client data files for analysis.
              </p>
              <div className="py-12 text-center text-muted-foreground">
                Coming soon...
              </div>
            </>
          )}

          {/* Step 4: Add Team - Placeholder */}
          {currentStep === 4 && (
            <>
              <h1 className="text-2xl font-semibold text-foreground mb-2">
                Add Team Members
              </h1>
              <p className="text-muted-foreground mb-8">
                Invite your team to collaborate on this engagement.
              </p>
              <div className="py-12 text-center text-muted-foreground">
                Coming soon...
              </div>
            </>
          )}

          {/* Actions */}
          <div className="mt-8 flex justify-between">
            <Button variant="outline" onClick={handleBack}>
              {currentStep === 1 ? "Cancel" : "Back"}
            </Button>
            <Button
              onClick={handleContinue}
              disabled={!canContinue()}
              className="bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              {currentStep === steps.length ? "Finish" : "Continue"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Onboarding;
