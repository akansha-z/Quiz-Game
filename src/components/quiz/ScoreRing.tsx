import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface ScoreRingProps {
  percentage: number;
  size?: number;
  strokeWidth?: number;
}

/**
 * Animated SVG score ring with count-up effect
 */
const ScoreRing = ({ percentage, size = 200, strokeWidth = 12 }: ScoreRingProps) => {
  const [displayValue, setDisplayValue] = useState(0);
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;

  // Animated count-up effect
  useEffect(() => {
    const duration = 1500;
    const steps = 60;
    const increment = percentage / steps;
    let current = 0;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      current = Math.min(Math.round(increment * step), percentage);
      setDisplayValue(current);

      if (step >= steps) {
        clearInterval(timer);
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [percentage]);

  // Get color based on score
  const getScoreColor = () => {
    if (percentage >= 80) return "hsl(var(--accent))";
    if (percentage >= 60) return "hsl(var(--primary))";
    if (percentage >= 40) return "hsl(var(--quiz-purple))";
    return "hsl(var(--destructive))";
  };

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg
        width={size}
        height={size}
        className="transform -rotate-90"
        aria-hidden="true"
      >
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="hsl(var(--border))"
          strokeWidth={strokeWidth}
        />
        {/* Progress circle */}
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={getScoreColor()}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        />
      </svg>
      {/* Center text */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <motion.span
          className="font-serif text-5xl md:text-6xl font-bold"
          style={{ color: getScoreColor() }}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, type: "spring", stiffness: 100 }}
        >
          {displayValue}
        </motion.span>
        <span className="text-muted-foreground text-lg">%</span>
      </div>
    </div>
  );
};

export default ScoreRing;
