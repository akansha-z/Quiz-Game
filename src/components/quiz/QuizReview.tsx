import { motion } from "framer-motion";
import { Check, X, ChevronRight } from "lucide-react";

interface Question {
  id: number;
  category: "General" | "Science" | "History" | "Geography";
  question: string;
  options: string[];
  correctAnswer: string;
}

interface QuizReviewProps {
  questions: Question[];
  selectedAnswers: (string | null)[];
  onJumpToQuestion: (index: number) => void;
  onSubmitFinal: () => void;
}

const categoryColors: Record<Question["category"], string> = {
  General: "bg-quiz-purple/20 text-quiz-purple border-quiz-purple/30",
  Science: "bg-quiz-blue/20 text-quiz-blue border-quiz-blue/30",
  History: "bg-quiz-pink/20 text-quiz-pink border-quiz-pink/30",
  Geography: "bg-quiz-teal/20 text-quiz-teal border-quiz-teal/30",
};

/**
 * Review screen showing all questions and answers before final submission
 */
const QuizReview = ({
  questions,
  selectedAnswers,
  onJumpToQuestion,
  onSubmitFinal,
}: QuizReviewProps) => {
  const answeredCount = selectedAnswers.filter((a) => a !== null).length;
  const allAnswered = answeredCount === questions.length;

  return (
    <motion.div
      className="space-y-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      {/* Header */}
      <div className="text-center mb-8">
        <motion.h2
          className="font-serif text-2xl md:text-3xl mb-2"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <span className="quiz-title-test">Review </span>
          <span className="quiz-title-knowledge">Your Answers</span>
        </motion.h2>
        <motion.p
          className="text-muted-foreground text-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          {answeredCount} of {questions.length} questions answered • Click to change
        </motion.p>
      </div>

      {/* Questions List */}
      <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2" role="list">
        {questions.map((question, index) => {
          const userAnswer = selectedAnswers[index];
          const isCorrect = userAnswer === question.correctAnswer;
          const isAnswered = userAnswer !== null;

          return (
            <motion.button
              key={question.id}
              onClick={() => onJumpToQuestion(index)}
              className={`w-full text-left p-4 rounded-xl border transition-all ${
                isAnswered
                  ? "bg-card border-border hover:border-primary/50"
                  : "bg-secondary/50 border-dashed border-border hover:border-primary/50"
              } focus:outline-none focus:ring-2 focus:ring-ring`}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ scale: 1.01 }}
              role="listitem"
              aria-label={`Question ${index + 1}: ${question.question}. ${
                isAnswered ? `Your answer: ${userAnswer}` : "Not answered"
              }`}
            >
              <div className="flex items-start gap-3">
                {/* Status Icon */}
                <div
                  className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center ${
                    isAnswered
                      ? "bg-primary/10 text-primary"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  {isAnswered ? (
                    <Check className="w-4 h-4" />
                  ) : (
                    <span className="text-xs font-medium">{index + 1}</span>
                  )}
                </div>

                {/* Question Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${
                        categoryColors[question.category]
                      }`}
                    >
                      {question.category}
                    </span>
                  </div>
                  <p className="text-sm text-foreground line-clamp-1">
                    {question.question}
                  </p>
                  {isAnswered && (
                    <p className="text-xs text-muted-foreground mt-1">
                      Your answer: <span className="text-foreground">{userAnswer}</span>
                    </p>
                  )}
                </div>

                {/* Arrow */}
                <ChevronRight className="w-5 h-5 text-muted-foreground flex-shrink-0" />
              </div>
            </motion.button>
          );
        })}
      </div>

      {/* Submit Button */}
      <motion.div
        className="pt-4 border-t border-border"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <motion.button
          onClick={onSubmitFinal}
          disabled={!allAnswered}
          className={`quiz-submit-btn w-full py-3 text-lg ${
            !allAnswered ? "opacity-50 cursor-not-allowed" : ""
          }`}
          whileHover={allAnswered ? { scale: 1.02 } : {}}
          whileTap={allAnswered ? { scale: 0.98 } : {}}
          aria-disabled={!allAnswered}
        >
          {allAnswered ? "Submit Quiz" : `Answer all questions (${answeredCount}/${questions.length})`}
        </motion.button>
      </motion.div>
    </motion.div>
  );
};

export default QuizReview;
