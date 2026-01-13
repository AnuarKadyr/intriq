import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Check, Upload, FileText, X, Briefcase, FileCheck, FolderUp, Sparkles } from "lucide-react";
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
  { id: 1, name: "Engagement Details", icon: Briefcase },
  { id: 2, name: "Engagement Letter", icon: FileCheck },
  { id: 3, name: "Client Data Upload", icon: FolderUp },
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
  const [clientDataFile, setClientDataFile] = useState<File | null>(null);
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

  const isStep3Complete = () => {
    return clientDataFile !== null;
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
    if (currentStep === 3) return isStep3Complete();
    return true;
  };

  const progressPercentage = ((currentStep - 1) / (steps.length - 1)) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-primary/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
      
      {/* Header */}
      <header className="border-b border-border bg-card/80 backdrop-blur-sm relative z-10">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <img src={logoBlack} alt="Intriq AI" className="h-8" />
          <Button variant="ghost" size="sm" onClick={() => navigate("/")} className="hover:bg-primary/10">
            Back to Home
          </Button>
        </div>
      </header>


      {/* Stepper */}
      <div className="container mx-auto px-6 py-6 relative z-10">
        <div className="flex items-center justify-center">
          {steps.map((step, stepIdx) => {
            const StepIcon = step.icon;
            return (
              <div key={step.id} className="flex items-center">
                {/* Step Circle and Label */}
                <div className="flex flex-col items-center group">
                  <div
                    className={`
                      relative flex h-10 w-10 items-center justify-center rounded-xl 
                      transition-all duration-300 ease-out
                      ${
                        step.id < currentStep
                          ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25"
                          : step.id === currentStep
                          ? "bg-primary text-primary-foreground shadow-lg shadow-primary/30 ring-4 ring-primary/20 scale-110"
                          : "bg-muted text-muted-foreground hover:bg-muted/80"
                      }
                    `}
                  >
                    {step.id < currentStep ? (
                      <Check className="h-4 w-4" strokeWidth={3} />
                    ) : (
                      <StepIcon className="h-4 w-4" />
                    )}
                    {step.id === currentStep && (
                      <span className="absolute -top-1 -right-1 flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-white border-2 border-primary"></span>
                      </span>
                    )}
                  </div>
                  <span
                    className={`
                      mt-2.5 text-xs font-medium whitespace-nowrap
                      transition-all duration-300
                      ${
                        step.id === currentStep
                          ? "text-foreground font-semibold"
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
                  <div className="flex items-center mx-4 -mt-6">
                    <div className="relative w-16 sm:w-20 h-[2px]">
                      <div className="absolute inset-0 bg-muted rounded-full" />
                      <div
                        className={`
                          absolute inset-y-0 left-0 bg-gradient-to-r from-primary to-primary/80 rounded-full 
                          transition-all duration-500 ease-out
                        `}
                        style={{ width: step.id < currentStep ? '100%' : '0%' }}
                      />
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Form Content */}
      <div className="container mx-auto px-6 py-6 max-w-xl relative z-10">
        <div className="bg-card/80 backdrop-blur-sm rounded-2xl border border-border/50 p-8 shadow-xl shadow-black/5 transition-all duration-300 hover:shadow-2xl hover:shadow-black/10">
          {/* Step 1: Engagement Details */}
          {currentStep === 1 && (
            <div className="animate-fade-in">
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
            </div>
          )}

          {/* Step 2: Engagement Letter */}
          {currentStep === 2 && (
            <div className="animate-fade-in">
              <h1 className="text-2xl font-semibold text-foreground mb-2">
                Upload Engagement Letter
              </h1>
              <p className="text-muted-foreground mb-8">
                Key scope and deliverables will be pulled automatically to build AI agents.
              </p>

              <div className="space-y-6">
                {/* Upload Area */}
                <div
                  className={`
                    relative border-2 border-dashed rounded-2xl p-10 text-center
                    transition-all duration-300 cursor-pointer group
                    ${
                      isDragOver
                        ? "border-primary bg-primary/10 scale-[1.02]"
                        : uploadedFile
                        ? "border-primary/50 bg-primary/5"
                        : "border-border hover:border-primary/50 hover:bg-primary/5 hover:scale-[1.01]"
                    }
                  `}
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onClick={() => {
                    const mockFile = new File([""], "Engagement_Letter_ProjectAlpha.pdf", {
                      type: "application/pdf",
                    });
                    Object.defineProperty(mockFile, "size", { value: 2457600 });
                    setUploadedFile(mockFile);
                  }}
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
                      <div className="flex items-center gap-3 bg-background rounded-xl px-5 py-4 border border-border shadow-sm">
                        <div className="p-2 rounded-lg bg-primary/10">
                          <FileText className="h-6 w-6 text-primary" />
                        </div>
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
                          className="ml-2 p-1.5 rounded-full hover:bg-destructive/10 transition-colors"
                        >
                          <X className="h-4 w-4 text-muted-foreground hover:text-destructive" />
                        </button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="mx-auto w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                        <Upload className="h-7 w-7 text-primary" />
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
            </div>
          )}

          {/* Step 3: Client Data Upload */}
          {currentStep === 3 && (
            <div className="animate-fade-in">
              <h1 className="text-2xl font-semibold text-foreground mb-2">
                Client Data Upload
              </h1>
              <p className="text-muted-foreground mb-8">
                Upload your own documents before sending the request to your client.
              </p>

              <div className="space-y-6">
                {/* Upload Area */}
                <div
                  className={`
                    relative border-2 border-dashed rounded-2xl p-10 text-center
                    transition-all duration-300 cursor-pointer group
                    ${
                      isDragOver
                        ? "border-primary bg-primary/10 scale-[1.02]"
                        : clientDataFile
                        ? "border-primary/50 bg-primary/5"
                        : "border-border hover:border-primary/50 hover:bg-primary/5 hover:scale-[1.01]"
                    }
                  `}
                  onClick={() => {
                    const mockFile = new File([""], "Client_Financial_Data_2024.pdf", {
                      type: "application/pdf",
                    });
                    Object.defineProperty(mockFile, "size", { value: 5242880 });
                    setClientDataFile(mockFile);
                  }}
                >
                  {clientDataFile ? (
                    <div className="flex items-center justify-center gap-4">
                      <div className="flex items-center gap-3 bg-background rounded-xl px-5 py-4 border border-border shadow-sm">
                        <div className="p-2 rounded-lg bg-primary/10">
                          <FileText className="h-6 w-6 text-primary" />
                        </div>
                        <div className="text-left">
                          <p className="text-sm font-medium text-foreground truncate max-w-[200px]">
                            {clientDataFile.name}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {formatFileSize(clientDataFile.size)}
                          </p>
                        </div>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setClientDataFile(null);
                          }}
                          className="ml-2 p-1.5 rounded-full hover:bg-destructive/10 transition-colors"
                        >
                          <X className="h-4 w-4 text-muted-foreground hover:text-destructive" />
                        </button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="mx-auto w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                        <Upload className="h-7 w-7 text-primary" />
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
            </div>
          )}

          {/* Actions */}
          <div className="mt-10 flex justify-between items-center">
            <Button 
              variant="outline" 
              onClick={handleBack}
              className="hover:bg-muted/50"
            >
              {currentStep === 1 ? "Cancel" : "Back"}
            </Button>
            <Button
              onClick={handleContinue}
              disabled={!canContinue()}
              className="bg-primary hover:bg-primary/90 text-primary-foreground min-w-[180px] shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 transition-all duration-300"
            >
              {currentStep === steps.length ? "Submit & Finish" : "Continue"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Onboarding;
