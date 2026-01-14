import { useMemo } from "react";

interface SparklineProps {
  previousValue: number;
  currentValue: number;
  width?: number;
  height?: number;
  className?: string;
}

export function Sparkline({ 
  previousValue, 
  currentValue, 
  width = 60, 
  height = 24,
  className = ""
}: SparklineProps) {
  const isPositive = currentValue >= previousValue;
  
  // Generate a realistic-looking trend line with some variation
  const points = useMemo(() => {
    const numPoints = 8;
    const result: { x: number; y: number }[] = [];
    
    const diff = currentValue - previousValue;
    const padding = 4;
    const usableHeight = height - padding * 2;
    const usableWidth = width - padding * 2;
    
    // Normalize values for display
    const minVal = Math.min(previousValue, currentValue) * 0.95;
    const maxVal = Math.max(previousValue, currentValue) * 1.05;
    const range = maxVal - minVal || 1;
    
    for (let i = 0; i < numPoints; i++) {
      const progress = i / (numPoints - 1);
      
      // Create a curved path from previous to current
      const baseValue = previousValue + (diff * progress);
      
      // Add some controlled variation for visual interest
      const noise = (Math.sin(i * 1.5) * 0.1 + Math.cos(i * 2.3) * 0.05) * Math.abs(diff);
      const value = i === 0 ? previousValue : i === numPoints - 1 ? currentValue : baseValue + noise;
      
      const x = padding + (progress * usableWidth);
      const y = padding + usableHeight - ((value - minVal) / range) * usableHeight;
      
      result.push({ x, y });
    }
    
    return result;
  }, [previousValue, currentValue, width, height]);

  const pathD = points.map((p, i) => 
    i === 0 ? `M ${p.x} ${p.y}` : `L ${p.x} ${p.y}`
  ).join(" ");

  const areaPath = `${pathD} L ${points[points.length - 1].x} ${height - 2} L ${points[0].x} ${height - 2} Z`;

  const strokeColor = isPositive ? "#10b981" : "#ef4444";
  const fillColor = isPositive ? "rgba(16, 185, 129, 0.1)" : "rgba(239, 68, 68, 0.1)";

  return (
    <svg 
      width={width} 
      height={height} 
      className={className}
      viewBox={`0 0 ${width} ${height}`}
    >
      {/* Gradient fill under the line */}
      <path 
        d={areaPath} 
        fill={fillColor}
      />
      {/* The trend line */}
      <path
        d={pathD}
        fill="none"
        stroke={strokeColor}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* End point indicator */}
      <circle
        cx={points[points.length - 1].x}
        cy={points[points.length - 1].y}
        r={3}
        fill={strokeColor}
      />
    </svg>
  );
}
