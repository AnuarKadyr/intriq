import { Button } from "@/components/ui/button";
import { ArrowRight, Shield, Zap, BarChart3 } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Welcome = () => {
  const navigate = useNavigate();

  const handleBegin = () => {
    // Navigate to next step (workspace or dashboard)
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Background subtle pattern */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-intriq-teal-lighter rounded-full blur-3xl opacity-40 -translate-y-1/2 translate-x-1/3" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-intriq-teal-lighter rounded-full blur-3xl opacity-30 translate-y-1/2 -translate-x-1/3" />
      </div>

      {/* Header */}
      <header className="relative z-10 px-8 py-6">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-sm">I</span>
          </div>
          <span className="font-semibold text-lg text-foreground tracking-tight">Intriq AI</span>
        </div>
      </header>

      {/* Main content */}
      <main className="relative z-10 flex-1 flex items-center justify-center px-8 pb-20">
        <div className="max-w-2xl mx-auto text-center">
          {/* Welcome badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-intriq-teal-light text-intriq-teal-dark text-sm font-medium mb-8 animate-fade-in">
            <Shield className="w-4 h-4" />
            <span>Private & Secure AI Platform</span>
          </div>

          {/* Heading */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight mb-6 animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
            Welcome to{" "}
            <span className="text-primary">Intriq AI</span>
          </h1>

          {/* Subheading */}
          <p className="text-lg md:text-xl text-muted-foreground max-w-lg mx-auto mb-12 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
            Transform unstructured data into deal-ready insights with AI-powered due diligence tools built for finance teams.
          </p>

          {/* CTA Button */}
          <div className="animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
            <Button 
              variant="intriq" 
              size="xl" 
              onClick={handleBegin}
              className="group"
            >
              Let's Begin
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </Button>
          </div>

          {/* Feature highlights */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-20 animate-fade-in-up" style={{ animationDelay: "0.5s" }}>
            <div className="flex flex-col items-center gap-3 p-6 rounded-2xl bg-card border border-border/50 shadow-intriq hover:shadow-intriq-md transition-shadow">
              <div className="w-12 h-12 rounded-xl bg-intriq-teal-light flex items-center justify-center">
                <Zap className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground">Fast Analysis</h3>
              <p className="text-sm text-muted-foreground text-center">Process documents in minutes, not days</p>
            </div>

            <div className="flex flex-col items-center gap-3 p-6 rounded-2xl bg-card border border-border/50 shadow-intriq hover:shadow-intriq-md transition-shadow">
              <div className="w-12 h-12 rounded-xl bg-intriq-teal-light flex items-center justify-center">
                <BarChart3 className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground">Data Integrity</h3>
              <p className="text-sm text-muted-foreground text-center">Audit-ready outputs with source citations</p>
            </div>

            <div className="flex flex-col items-center gap-3 p-6 rounded-2xl bg-card border border-border/50 shadow-intriq hover:shadow-intriq-md transition-shadow">
              <div className="w-12 h-12 rounded-xl bg-intriq-teal-light flex items-center justify-center">
                <Shield className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground">Private AI</h3>
              <p className="text-sm text-muted-foreground text-center">Your data never leaves your control</p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 px-8 py-6 text-center">
        <p className="text-sm text-muted-foreground">
          Trusted by finance teams for confidential due diligence
        </p>
      </footer>
    </div>
  );
};

export default Welcome;
