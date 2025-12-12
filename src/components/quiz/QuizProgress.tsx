import { motion } from "framer-motion";

interface QuizProgressProps {
  currentQuestion: number;
  totalQuestions: number;
}

/**
 * Enhanced progress indicator with question counter and animated bar
 */
const QuizProgress = ({ currentQuestion, totalQuestions }: QuizProgressProps) => {
  const progressPercentage = ((currentQuestion + 1) / totalQuestions) * 100;

  return (
    <div className="mb-8 space-y-3">
      {/* Question counter */}
      <motion.div
        className="flex items-center justify-between text-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
      >
        <span className="text-muted-foreground">
          Question <span className="text-foreground font-medium">{currentQuestion + 1}</span> of{" "}
          <span className="text-foreground font-medium">{totalQuestions}</span>
        </span>
        <span className="text-muted-foreground">{Math.round(progressPercentage)}%</span>
      </motion.div>

      {/* Progress bar */}
      <div
        className="relative h-2 bg-muted rounded-full overflow-hidden"
        role="progressbar"
        aria-valuenow={currentQuestion + 1}
        aria-valuemin={1}
        aria-valuemax={totalQuestions}
        aria-label={`Question ${currentQuestion + 1} of ${totalQuestions}`}
      >
        <motion.div
          className="absolute inset-y-0 left-0 bg-primary rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${progressPercentage}%` }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        />
      </div>

      {/* Step indicators */}
      <div className="flex items-center justify-center gap-1.5">
        {Array.from({ length: totalQuestions }).map((_, index) => (
          <motion.div
            key={index}
            className={`w-1.5 h-1.5 rounded-full transition-colors ${
              index <= currentQuestion ? "bg-primary" : "bg-border"
            }`}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: index * 0.03, duration: 0.2 }}
          />
        ))}
      </div>
    </div>
  );
};

export default QuizProgress;
