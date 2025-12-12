import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import QuizOption from "./QuizOption";
import AnswerFeedback from "./AnswerFeedback";
import { useKeyboardNavigation } from "@/hooks/useKeyboardNavigation";

interface Question {
  id: number;
  category: "General" | "Science" | "History" | "Geography";
  question: string;
  options: string[];
  correctAnswer: string;
}

const categoryColors: Record<Question["category"], string> = {
  General: "bg-quiz-purple/20 text-quiz-purple",
  Science: "bg-quiz-blue/20 text-quiz-blue",
  History: "bg-quiz-pink/20 text-quiz-pink",
  Geography: "bg-quiz-teal/20 text-quiz-teal",
};

interface QuizQuestionProps {
  question: Question;
  questionNumber: number;
  selectedAnswer: string | null;
  onSelectAnswer: (answer: string) => void;
}

/**
 * Question display with keyboard navigation and answer feedback
 */
const QuizQuestion = ({
  question,
  questionNumber,
  selectedAnswer,
  onSelectAnswer,
}: QuizQuestionProps) => {
  const [focusedIndex, setFocusedIndex] = useState(0);
  const [showFeedback, setShowFeedback] = useState(false);

  // Reset focus when question changes
  useEffect(() => {
    setFocusedIndex(0);
  }, [question.id]);

  // Show feedback when answer is selected
  useEffect(() => {
    if (selectedAnswer) {
      setShowFeedback(true);
      const timer = setTimeout(() => setShowFeedback(false), 1500);
      return () => clearTimeout(timer);
    }
  }, [selectedAnswer]);

  // Keyboard navigation hook
  useKeyboardNavigation({
    options: question.options,
    selectedAnswer,
    onSelectAnswer,
    focusedIndex,
    setFocusedIndex,
    isActive: true,
  });

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={question.id}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        transition={{ duration: 0.3 }}
        className="space-y-4"
        role="group"
        aria-labelledby={`question-${question.id}`}
      >
        {/* Category and Question */}
        <div className="flex items-center justify-center gap-3 flex-wrap">
          <motion.span
            className={`px-3 py-1 rounded-full text-xs font-medium ${categoryColors[question.category]}`}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.05 }}
          >
            {question.category}
          </motion.span>
          <motion.div
            className="quiz-question-pill"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <span id={`question-${question.id}`}>
              {questionNumber}. {question.question}
            </span>
          </motion.div>
        </div>

        {/* Answer Feedback */}
        <AnswerFeedback show={showFeedback} />

        {/* Options */}
        <div
          className="space-y-3"
          role="listbox"
          aria-label="Answer options"
          aria-activedescendant={`option-${focusedIndex}`}
        >
          {question.options.map((option, index) => (
            <QuizOption
              key={option}
              option={option}
              isSelected={selectedAnswer === option}
              onSelect={() => onSelectAnswer(option)}
              index={index}
              isFocused={focusedIndex === index}
            />
          ))}
        </div>

        {/* Keyboard hint */}
        <motion.p
          className="text-center text-xs text-muted-foreground mt-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          Use ↑↓ arrows to navigate, Enter to select
        </motion.p>
      </motion.div>
    </AnimatePresence>
  );
};

export default QuizQuestion;
