import "./TonyFace.css";

export type TonyExpression = "neutral" | "happy" | "thinking" | "excited" | "waving";

interface TonyFaceProps {
  expression?: TonyExpression;
  size?: "small" | "medium" | "large";
  className?: string;
}

export function TonyFace({ expression = "neutral", size = "medium", className = "" }: TonyFaceProps) {
  const sizeClass = {
    small: "tony-face-small",
    medium: "tony-face-medium",
    large: "tony-face-large",
  }[size];

  return (
    <div className={`tony-face ${sizeClass} ${className}`}>
      <div className="tony-face-outer">
        <div className="tony-face-inner">
          <div className="tony-face-background">
            <span className="tony-ball rosa"></span>
            <span className="tony-ball violet"></span>
            <span className="tony-ball green"></span>
            <span className="tony-ball cyan"></span>
          </div>
          <div className="tony-face-content">
            {/* Neutral eyes - default blinking */}
            {expression === "neutral" && (
              <div className="tony-eyes neutral">
                <span className="tony-eye"></span>
                <span className="tony-eye"></span>
              </div>
            )}

            {/* Happy eyes - curved arcs ^_^ */}
            {expression === "happy" && (
              <div className="tony-eyes happy">
                <span className="tony-eye-happy"></span>
                <span className="tony-eye-happy"></span>
              </div>
            )}

            {/* Thinking eyes - looking up */}
            {expression === "thinking" && (
              <div className="tony-eyes thinking">
                <span className="tony-eye-thinking"></span>
                <span className="tony-eye-thinking"></span>
              </div>
            )}

            {/* Excited eyes - wide and bouncing */}
            {expression === "excited" && (
              <div className="tony-eyes excited">
                <span className="tony-eye-excited"></span>
                <span className="tony-eye-excited"></span>
              </div>
            )}

            {/* Waving - happy eyes with hand */}
            {expression === "waving" && (
              <>
                <div className="tony-eyes happy">
                  <span className="tony-eye-happy"></span>
                  <span className="tony-eye-happy"></span>
                </div>
                <div className="tony-hand">👋</div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
