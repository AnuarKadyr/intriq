import { useEffect, useState, useRef } from "react";
import { TrendingUp, Check } from "lucide-react";
import "./PriceVolumeProcessing.css";

const processingSteps = [
  "Parsing uploaded data file",
  "Validating SKU identifiers",
  "Calculating revenue deltas",
  "Decomposing price impact",
  "Decomposing volume impact",
  "Calculating mix effects",
  "Aggregating by geography",
  "Aggregating by product group",
  "Identifying top contributors",
  "Generating key insights",
  "Building analysis dashboard",
  "Finalizing report",
];

interface PriceVolumeProcessingProps {
  onComplete: () => void;
}

export function PriceVolumeProcessing({ onComplete }: PriceVolumeProcessingProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [isFading, setIsFading] = useState(false);
  const hasCompletedRef = useRef(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCompletedSteps(prev => {
        if (prev.length < processingSteps.length) {
          return [...prev, prev.length];
        }
        return prev;
      });
      
      setCurrentStep(prev => {
        if (prev < processingSteps.length - 1) {
          return prev + 1;
        }
        return prev;
      });
    }, 400);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (completedSteps.length === processingSteps.length && !hasCompletedRef.current) {
      hasCompletedRef.current = true;
      setTimeout(() => {
        setIsFading(true);
        setTimeout(onComplete, 500);
      }, 800);
    }
  }, [completedSteps, onComplete]);

  const visibleSteps = processingSteps.slice(
    Math.max(0, currentStep - 2),
    Math.min(processingSteps.length, currentStep + 4)
  );

  const startIndex = Math.max(0, currentStep - 2);

  return (
    <div className={`flex-1 flex flex-col items-center justify-center p-8 bg-gradient-to-br from-pink-950 via-slate-900 to-slate-950 transition-opacity duration-500 ${isFading ? 'opacity-0' : 'opacity-100'}`}>
      <div className="mb-8">
        <div className="relative">
          <div className="p-5 rounded-2xl bg-pink-500/20 animate-pulse">
            <TrendingUp className="h-14 w-14 text-pink-400" />
          </div>
          <div className="absolute inset-0 rounded-2xl bg-pink-500/10 animate-ping" />
        </div>
      </div>

      <h2 className="text-2xl font-bold text-white mb-2">Analyzing Your Data</h2>
      <p className="text-pink-200/70 mb-8">Please wait while we process your sales data...</p>

      <div className="w-full max-w-md space-y-3">
        {visibleSteps.map((step, idx) => {
          const actualIndex = startIndex + idx;
          const isCompleted = completedSteps.includes(actualIndex);
          const isCurrent = actualIndex === currentStep && !isCompleted;
          
          return (
            <div
              key={actualIndex}
              className={`flex items-center gap-3 p-3 rounded-lg transition-all duration-300 ${
                isCompleted 
                  ? 'bg-pink-500/20 text-pink-100' 
                  : isCurrent 
                    ? 'bg-white/10 text-white' 
                    : 'bg-white/5 text-white/40'
              }`}
            >
              <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                isCompleted 
                  ? 'bg-pink-500' 
                  : isCurrent 
                    ? 'bg-white/20 animate-pulse' 
                    : 'bg-white/10'
              }`}>
                {isCompleted ? (
                  <Check className="h-4 w-4 text-white" />
                ) : (
                  <span className="text-xs">{actualIndex + 1}</span>
                )}
              </div>
              <span className="text-sm">{step}</span>
              {isCurrent && (
                <div className="ml-auto flex gap-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-pink-400 animate-bounce" style={{ animationDelay: '0ms' }} />
                  <div className="w-1.5 h-1.5 rounded-full bg-pink-400 animate-bounce" style={{ animationDelay: '150ms' }} />
                  <div className="w-1.5 h-1.5 rounded-full bg-pink-400 animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="mt-8 w-full max-w-md">
        <div className="h-2 bg-white/10 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-pink-500 to-pink-400 rounded-full transition-all duration-300"
            style={{ width: `${(completedSteps.length / processingSteps.length) * 100}%` }}
          />
        </div>
        <p className="text-center text-pink-200/50 text-sm mt-2">
          {completedSteps.length} of {processingSteps.length} steps complete
        </p>
      </div>
    </div>
  );
}
