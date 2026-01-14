import { useState, useEffect, useRef } from "react";

interface UseAnimatedCounterOptions {
  duration?: number;
  delay?: number;
  easing?: (t: number) => number;
}

// Easing function for smooth animation
const easeOutExpo = (t: number): number => {
  return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
};

export function useAnimatedCounter(
  endValue: number,
  options: UseAnimatedCounterOptions = {}
) {
  const { duration = 2000, delay = 0, easing = easeOutExpo } = options;
  const [value, setValue] = useState(0);
  const startTimeRef = useRef<number | null>(null);
  const animationRef = useRef<number | null>(null);

  useEffect(() => {
    const startAnimation = () => {
      const animate = (timestamp: number) => {
        if (!startTimeRef.current) {
          startTimeRef.current = timestamp;
        }

        const elapsed = timestamp - startTimeRef.current;
        const progress = Math.min(elapsed / duration, 1);
        const easedProgress = easing(progress);
        
        setValue(Math.floor(easedProgress * endValue));

        if (progress < 1) {
          animationRef.current = requestAnimationFrame(animate);
        } else {
          setValue(endValue);
        }
      };

      animationRef.current = requestAnimationFrame(animate);
    };

    const timeoutId = setTimeout(startAnimation, delay);

    return () => {
      clearTimeout(timeoutId);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [endValue, duration, delay, easing]);

  return value;
}

interface AnimatedNumberProps {
  value: number;
  formatter?: (v: number) => string;
  duration?: number;
  delay?: number;
  className?: string;
}

export function AnimatedNumber({ 
  value, 
  formatter = (v: number) => v.toLocaleString(),
  duration = 2000,
  delay = 0,
  className = ""
}: AnimatedNumberProps) {
  const animatedValue = useAnimatedCounter(value, { duration, delay });
  return <span className={className}>{formatter(animatedValue)}</span>;
}
