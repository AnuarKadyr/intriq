import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import logoBlack from "@/assets/logo-black.svg";

const Welcome = () => {
  const navigate = useNavigate();

  const handleBegin = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">
      {/* Beautiful gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-primary/10 to-primary/20" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/15 via-transparent to-transparent" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent" />
      
      {/* Subtle animated orbs */}
      <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px] animate-pulse" />
      <div className="absolute bottom-1/4 left-1/4 w-[400px] h-[400px] bg-primary/15 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: "1s" }} />

      {/* Logo */}
      <header className="relative z-10 px-8 py-6">
        <img src={logoBlack} alt="Intriq AI" className="h-8" />
      </header>

      {/* Main content */}
      <main className="relative z-10 flex-1 flex items-center justify-center px-8">
        <div className="text-center">
          {/* Title */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight mb-12 animate-fade-in-up">
            Welcome to{" "}
            <span className="text-primary">Intriq AI</span>
          </h1>

          {/* CTA Button */}
          <div className="animate-fade-in-up" style={{ animationDelay: "0.15s" }}>
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
        </div>
      </main>
    </div>
  );
};

export default Welcome;
