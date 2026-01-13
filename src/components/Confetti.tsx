import { useMemo } from "react";
import "./Confetti.css";

const colors = ["#05D3D3", "#04B8B8", "#03A0A0", "#FFB900", "#FF6B6B"];

const Confetti = () => {
  const confettiPieces = useMemo(() => {
    return Array.from({ length: 150 }, (_, i) => {
      const width = Math.random() * 8 + 4;
      const left = Math.random() * 100;
      const delay = Math.random() * 3;
      const duration = 4 + Math.random() * 3;
      const rotation = Math.random() * 360;
      const color = colors[Math.floor(Math.random() * colors.length)];
      const drift = (Math.random() - 0.5) * 15;

      return {
        id: i,
        style: {
          width: `${width}px`,
          height: `${width * 0.4}px`,
          backgroundColor: color,
          left: `${left}%`,
          opacity: Math.random() * 0.5 + 0.5,
          transform: `rotate(${rotation}deg)`,
          animationDelay: `${delay}s`,
          animationDuration: `${duration}s`,
          "--drift": `${drift}%`,
        } as React.CSSProperties,
      };
    });
  }, []);

  return (
    <div className="confetti-wrapper">
      {confettiPieces.map((piece) => (
        <div
          key={piece.id}
          className="confetti-piece"
          style={piece.style}
        />
      ))}
    </div>
  );
};

export default Confetti;
