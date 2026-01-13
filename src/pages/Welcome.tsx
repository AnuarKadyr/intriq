import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import logoBlack from "@/assets/logo-black.svg";
import illustration from "@/assets/illustration.svg";

const Welcome = () => {
  const navigate = useNavigate();

  const handleBegin = () => {
    navigate("/");
  };

  return (
    <div 
      className="min-h-screen flex flex-col relative overflow-hidden bg-gradient-to-br from-[hsl(180_30%_95%)] via-[hsl(180_20%_97%)] to-[hsl(180_10%_98%)]"
      style={{
        backgroundImage: `url(${illustration})`,
        backgroundRepeat: 'repeat',
        backgroundSize: '150px',
        backgroundPosition: 'center',
      }}
    >
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-[hsl(180_30%_95%)/90] via-[hsl(180_20%_97%)/85] to-[hsl(180_10%_98%)/90]" />

      {/* Logo */}
      <header className="relative z-10 px-8 py-6">
        <img src={logoBlack} alt="Intriq AI" className="h-8" />
      </header>

      {/* Main content */}
      <main className="relative z-10 flex-1 flex items-center px-8 lg:px-16">
        <div className="w-full max-w-3xl">
          {/* Title */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight mb-6 animate-fade-in-up">
            Welcome to{" "}
            <span className="text-primary">Intriq AI</span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg md:text-xl text-muted-foreground mb-10 animate-fade-in-up max-w-lg" style={{ animationDelay: "0.1s" }}>
            Transform unstructured data into deal-ready insights with AI-powered due diligence tools built for finance teams.
          </p>

          {/* CTA Button */}
          <div className="animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
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