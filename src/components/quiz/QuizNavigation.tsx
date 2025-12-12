import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, ClipboardList } from "lucide-react";

interface QuizNavigationProps {
  currentQuestion: number;
  totalQuestions: number;
  canGoBack: boolean;
  canGoNext: boolean;
  onBack: () => void;
  onNext: () => void;
  onReview: () => void;
  hasSelectedAnswer: boolean;
}

/**
 * Enhanced navigation with review option and clear disabled states
 */
const QuizNavigation = ({
  currentQuestion,
  totalQuestions,
  canGoBack,
  canGoNext,
  onBack,
  onNext,
  onReview,
  hasSelectedAnswer,
}: QuizNavigationProps) => {
  const isLastQuestion = currentQuestion === totalQuestions - 1;

  return (
    <motion.div
      className="flex items-center justify-between gap-2 mt-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5 }}
    >
      {/* Back button */}
      <motion.button
        className="quiz-nav-btn"
        onClick={onBack}
        disabled={!canGoBack}
        whileHover={canGoBack ? { scale: 1.05 } : {}}
        whileTap={canGoBack ? { scale: 0.95 } : {}}
        aria-label="Previous question"
      >
        <ChevronLeft className="w-5 h-5 text-muted-foreground" />
      </motion.button>

      {/* Center: Review or hint */}
      <div className="flex items-center gap-2">
        {isLastQuestion ? (
          <motion.button
            className="quiz-submit-btn flex items-center gap-2"
            onClick={onReview}
            disabled={!hasSelectedAnswer}
            whileHover={hasSelectedAnswer ? { scale: 1.02 } : {}}
            whileTap={hasSelectedAnswer ? { scale: 0.98 } : {}}
            aria-label="Review your answers"
          >
            <ClipboardList className="w-4 h-4" />
            Review Answers
          </motion.button>
        ) : (
          !hasSelectedAnswer && (
            <motion.span
              className="text-xs text-muted-foreground"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              Select an answer to continue
            </motion.span>
          )
        )}
      </div>

      {/* Next button */}
      <motion.button
        className="quiz-nav-btn"
        onClick={onNext}
        disabled={!canGoNext}
        whileHover={canGoNext ? { scale: 1.05 } : {}}
        whileTap={canGoNext ? { scale: 0.95 } : {}}
        aria-label="Next question"
      >
        <ChevronRight className="w-5 h-5 text-muted-foreground" />
      </motion.button>
    </motion.div>
  );
};

export default QuizNavigation;
