import { motion } from "framer-motion";
import { useEffect, useRef } from "react";

interface QuizOptionProps {
  option: string;
  isSelected: boolean;
  onSelect: () => void;
  index: number;
  isFocused: boolean;
}

/**
 * Individual quiz option with keyboard support and enhanced animations
 */
const QuizOption = ({ option, isSelected, onSelect, index, isFocused }: QuizOptionProps) => {
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Auto-focus when keyboard navigation changes focus
  useEffect(() => {
    if (isFocused && buttonRef.current) {
      buttonRef.current.focus();
    }
  }, [isFocused]);

  return (
    <motion.button
      ref={buttonRef}
      className={`quiz-option w-full ${isSelected ? "selected" : ""} ${
        isFocused ? "ring-2 ring-ring ring-offset-2" : ""
      }`}
      onClick={onSelect}
      initial={{ opacity: 0, y: 10 }}
      animate={{ 
        opacity: 1, 
        y: 0,
        scale: isSelected ? 1.02 : 1,
      }}
      transition={{ delay: 0.2 + index * 0.1, duration: 0.3 }}
      whileHover={{ scale: 1.01, boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}
      whileTap={{ scale: 0.98 }}
      aria-pressed={isSelected}
      role="option"
      aria-selected={isSelected}
      tabIndex={isFocused ? 0 : -1}
    >
      <span className="flex items-center justify-center gap-2">
        {isSelected && (
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="w-2 h-2 rounded-full bg-primary"
          />
        )}
        {option}
      </span>
    </motion.button>
  );
};

export default QuizOption;
