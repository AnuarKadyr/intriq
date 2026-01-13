import "./TonyFace.css";

interface TonyFaceProps {
  size?: "small" | "medium" | "large";
  className?: string;
}

export function TonyFace({ size = "medium", className = "" }: TonyFaceProps) {
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
            <div className="tony-eyes">
              <span className="tony-eye"></span>
              <span className="tony-eye"></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
