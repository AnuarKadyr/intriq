import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import logoBlack from "@/assets/logo-black.svg";
import "./Welcome.css";

const Welcome = () => {
  const navigate = useNavigate();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleBegin = () => {
    navigate("/");
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let particles: Particle[] = [];
    let animationId: number;

    class Particle {
      x: number;
      y: number;
      speed: number;
      opacity: number;
      fadeDelay: number;
      fadeStart: number;
      fadingOut: boolean;

      constructor() {
        this.x = Math.random() * canvas!.width;
        this.y = Math.random() * canvas!.height;
        this.speed = Math.random() / 5 + 0.1;
        this.opacity = 1;
        this.fadeDelay = Math.random() * 600 + 100;
        this.fadeStart = Date.now() + this.fadeDelay;
        this.fadingOut = false;
      }

      reset() {
        this.x = Math.random() * canvas!.width;
        this.y = Math.random() * canvas!.height;
        this.speed = Math.random() / 5 + 0.1;
        this.opacity = 1;
        this.fadeDelay = Math.random() * 600 + 100;
        this.fadeStart = Date.now() + this.fadeDelay;
        this.fadingOut = false;
      }

      update() {
        this.y -= this.speed;
        if (this.y < 0) {
          this.reset();
        }
        if (!this.fadingOut && Date.now() > this.fadeStart) {
          this.fadingOut = true;
        }
        if (this.fadingOut) {
          this.opacity -= 0.008;
          if (this.opacity <= 0) {
            this.reset();
          }
        }
      }

      draw() {
        ctx!.fillStyle = `rgba(5, 211, 211, ${this.opacity * 0.6})`;
        ctx!.fillRect(this.x, this.y, 0.4, Math.random() * 2 + 1);
      }
    }

    const calculateParticleCount = () => {
      return Math.floor((canvas.width * canvas.height) / 6000);
    };

    const initParticles = () => {
      particles = [];
      const count = calculateParticleCount();
      for (let i = 0; i < count; i++) {
        particles.push(new Particle());
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((particle) => {
        particle.update();
        particle.draw();
      });
      animationId = requestAnimationFrame(animate);
    };

    const onResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
    };

    window.addEventListener("resize", onResize);
    initParticles();
    animate();

    return () => {
      window.removeEventListener("resize", onResize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <div className="welcome-page">
      <header className="welcome-header">
        <img src={logoBlack} alt="Intriq AI" className="welcome-logo" />
        <div className="mid-spot"></div>
        <Button
          variant="intriq"
          size="lg"
          onClick={handleBegin}
          className="welcome-cta group"
        >
          <span className="glow"></span>
          Let's Begin
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </Button>
        <div className="spotlight">
          <div></div>
          <div></div>
          <div></div>
        </div>
      </header>

      <canvas ref={canvasRef} className="particle-canvas"></canvas>

      <div className="accent-lines">
        <div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
        <div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>

      <div className="hero-sub-p">
        <p>Introducing</p>
      </div>

      <div className="hero">
        <div className="hero-t">
          <h2>Intriq AI</h2>
          <h2>Intriq AI</h2>
        </div>
      </div>

      <p className="hero-p">
        Transform unstructured data into deal-ready insights
        <br />
        with AI-powered due diligence tools.
      </p>

      <div className="mountains">
        <div></div>
        <div></div>
        <div></div>
      </div>

      <div className="hero-spacer"></div>
    </div>
  );
};

export default Welcome;