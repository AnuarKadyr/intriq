import { useNavigate } from "react-router-dom";
import { CheckCircle2, ArrowRight, LayoutDashboard } from "lucide-react";
import { Button } from "@/components/ui/button";
import Confetti from "@/components/Confetti";
import logoBlack from "@/assets/logo-black.svg";

const OnboardingComplete = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 relative overflow-hidden flex flex-col">
      {/* Confetti Animation */}
      <Confetti />
      
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-primary/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

      {/* Header */}
      <header className="border-b border-border bg-card/80 backdrop-blur-sm relative z-10">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <img src={logoBlack} alt="Intriq AI" className="h-8" />
        </div>
      </header>

      {/* Content */}
      <div className="flex-1 flex items-center justify-center relative z-10">
        <div className="text-center max-w-lg px-6 animate-fade-in">
          {/* Success Icon */}
          <div className="mx-auto w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center mb-8 animate-scale-in">
            <CheckCircle2 className="w-14 h-14 text-primary" strokeWidth={1.5} />
          </div>

          {/* Heading */}
          <h1 className="text-4xl font-semibold text-foreground mb-4">
            You are all set!
          </h1>

          {/* Description */}
          <p className="text-lg text-muted-foreground mb-8">
            Your engagement is configured. AI agents are ready to assist your workflow.
          </p>

          {/* CTA Button */}
          <Button
            onClick={() => {
              sessionStorage.setItem("just-completed-onboarding", "true");
              navigate("/dashboard");
            }}
            className="bg-primary hover:bg-primary/90 text-primary-foreground min-w-[220px] h-12 text-base shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 transition-all duration-300"
          >
            <LayoutDashboard className="w-5 h-5 mr-2" />
            Go to Dashboard
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default OnboardingComplete;
