import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
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
        ctx!.fillStyle = `rgba(${255 - (Math.random() * 255/2)}, 255, 255, ${this.opacity})`;
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
        <h2><a href="#">RAFA</a></h2>
        <div className="mid-spot"></div>
        <button className="contact-btn" onClick={handleBegin}>
          <span className="glow"></span>
          <span className="contact-btn-content">Contact Us</span>
        </button>
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
          <h2>Eclipx</h2>
          <h2>Eclipx</h2>
        </div>
      </div>

      <p className="hero-p">
        The world's best platform,<br />
        powered by EclipxOS + React.
      </p>

      <div className="mountains">
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default Welcome;