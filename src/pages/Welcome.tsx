import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import logoBlack from "@/assets/logo-black.svg";
import carousel1 from "@/assets/carousel-1.png";
import carousel2 from "@/assets/carousel-2.png";
import carousel3 from "@/assets/carousel-3.png";

const carouselImages = [carousel1, carousel2, carousel3];

const Welcome = () => {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % carouselImages.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleBegin = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden bg-gradient-to-br from-[hsl(180_30%_95%)] via-[hsl(180_20%_97%)] to-[hsl(180_10%_98%)]">
      {/* Logo */}
      <header className="relative z-10 px-8 py-6">
        <img src={logoBlack} alt="Intriq AI" className="h-8" />
      </header>

      {/* Main content */}
      <main className="relative z-10 flex-1 flex items-center px-8 lg:px-16">
        <div className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left side - Text content */}
          <div className="order-2 lg:order-1">
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

          {/* Right side - Image carousel */}
          <div className="order-1 lg:order-2 relative animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
            <div className="relative overflow-hidden rounded-2xl shadow-intriq-lg">
              <div 
                className="flex transition-transform duration-700 ease-in-out"
                style={{ transform: `translateX(-${currentIndex * 100}%)` }}
              >
                {carouselImages.map((img, index) => (
                  <img
                    key={index}
                    src={img}
                    alt={`Platform preview ${index + 1}`}
                    className="w-full flex-shrink-0 object-cover"
                  />
                ))}
              </div>
            </div>
            
            {/* Carousel indicators */}
            <div className="flex justify-center gap-2 mt-4">
              {carouselImages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === currentIndex 
                      ? "bg-primary w-6" 
                      : "bg-primary/30 hover:bg-primary/50"
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Welcome;