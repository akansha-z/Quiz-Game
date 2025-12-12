import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import QuizProgress from "./QuizProgress";
import QuizQuestion from "./QuizQuestion";
import QuizNavigation from "./QuizNavigation";
import QuizResult from "./QuizResult";
import QuizStart from "./QuizStart";
import QuizReview from "./QuizReview";
import LoadingSkeleton from "./LoadingSkeleton";
import { useQuizPersistence } from "@/hooks/useQuizPersistence";

// Types
export interface Question {
  id: number;
  category: "General" | "Science" | "History" | "Geography";
  question: string;
  options: string[];
  correctAnswer: string;
}

// Quiz questions data
const questions: Question[] = [
  // General Knowledge
  { id: 1, category: "General", question: "What sound does a cat make?", options: ["Bhau-Bhau", "Meow-Meow", "Oink-Oink"], correctAnswer: "Meow-Meow" },
  { id: 2, category: "General", question: "What would you probably find in your fridge?", options: ["Shoes", "Ice Cream", "Books"], correctAnswer: "Ice Cream" },
  // Science
  { id: 3, category: "Science", question: "What planet is known as the Red Planet?", options: ["Venus", "Mars", "Jupiter"], correctAnswer: "Mars" },
  { id: 4, category: "Science", question: "What is the chemical symbol for water?", options: ["H2O", "CO2", "O2"], correctAnswer: "H2O" },
  { id: 5, category: "Science", question: "How many bones are in the adult human body?", options: ["106", "206", "306"], correctAnswer: "206" },
  // History
  { id: 6, category: "History", question: "Who was the first President of the United States?", options: ["Abraham Lincoln", "George Washington", "Thomas Jefferson"], correctAnswer: "George Washington" },
  { id: 7, category: "History", question: "In which year did World War II end?", options: ["1943", "1945", "1947"], correctAnswer: "1945" },
  { id: 8, category: "History", question: "The Great Wall of China was primarily built to protect against?", options: ["Floods", "Invaders", "Earthquakes"], correctAnswer: "Invaders" },
  // Geography
  { id: 9, category: "Geography", question: "What is the largest ocean on Earth?", options: ["Atlantic Ocean", "Indian Ocean", "Pacific Ocean"], correctAnswer: "Pacific Ocean" },
  { id: 10, category: "Geography", question: "Which country has the most population?", options: ["USA", "India", "Russia"], correctAnswer: "India" },
  { id: 11, category: "Geography", question: "What is the capital of Japan?", options: ["Seoul", "Tokyo", "Beijing"], correctAnswer: "Tokyo" },
  { id: 12, category: "Geography", question: "Which river is the longest in the world?", options: ["Amazon", "Nile", "Yangtze"], correctAnswer: "Nile" },
];

type QuizScreen = "start" | "quiz" | "review" | "result";

/**
 * Main Quiz Card component orchestrating the entire quiz experience
 */
const QuizCard = () => {
  const {
    currentQuestion,
    selectedAnswers,
    userName,
    quizStarted,
    isLoading,
    updateState,
    resetState,
  } = useQuizPersistence(questions.length);

  const [screen, setScreen] = useState<QuizScreen>(() => 
    quizStarted ? "quiz" : "start"
  );

  // Handle starting the quiz with user name
  const handleStart = useCallback((name: string) => {
    updateState({ userName: name, quizStarted: true });
    setScreen("quiz");
  }, [updateState]);

  // Handle answer selection
  const handleSelectAnswer = useCallback((answer: string) => {
    const updated = [...selectedAnswers];
    updated[currentQuestion] = answer;
    updateState({ selectedAnswers: updated });
  }, [currentQuestion, selectedAnswers, updateState]);

  // Navigation handlers
  const handleNext = useCallback(() => {
    if (currentQuestion < questions.length - 1) {
      updateState({ currentQuestion: currentQuestion + 1 });
    }
  }, [currentQuestion, updateState]);

  const handleBack = useCallback(() => {
    if (currentQuestion > 0) {
      updateState({ currentQuestion: currentQuestion - 1 });
    }
  }, [currentQuestion, updateState]);

  // Review screen handlers
  const handleReview = useCallback(() => {
    setScreen("review");
  }, []);

  const handleJumpToQuestion = useCallback((index: number) => {
    updateState({ currentQuestion: index });
    setScreen("quiz");
  }, [updateState]);

  const handleSubmitFinal = useCallback(() => {
    setScreen("result");
  }, []);

  // Restart quiz
  const handleRestart = useCallback(() => {
    resetState();
    setScreen("start");
  }, [resetState]);

  // Calculate score
  const calculateScore = () => {
    return selectedAnswers.reduce((score, answer, index) => {
      return answer === questions[index].correctAnswer ? score + 1 : score;
    }, 0);
  };

  // Show loading skeleton while hydrating from localStorage
  if (isLoading) {
    return <LoadingSkeleton />;
  }

  // Render based on current screen
  return (
    <AnimatePresence mode="wait">
      {screen === "start" && (
        <motion.div
          key="start"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
        >
          <QuizStart onStart={handleStart} savedName={userName} />
        </motion.div>
      )}

      {screen === "quiz" && (
        <motion.div
          key="quiz"
          className="quiz-card w-full max-w-2xl mx-auto p-8 md:p-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4 }}
        >
          {/* Title */}
          <motion.div className="text-center mb-2">
            <h1 className="text-4xl md:text-5xl">
              <span className="quiz-title-test">Test </span>
              <span className="quiz-title-your">Your </span>
              <span className="quiz-title-knowledge">Knowledge</span>
            </h1>
          </motion.div>

          {/* Subtitle with user name */}
          <motion.p className="text-center text-muted-foreground text-sm mb-8">
            Good luck, <span className="text-foreground font-medium">{userName}</span>!
          </motion.p>

          {/* Progress */}
          <QuizProgress
            currentQuestion={currentQuestion}
            totalQuestions={questions.length}
          />

          {/* Question */}
          <QuizQuestion
            question={questions[currentQuestion]}
            questionNumber={currentQuestion + 1}
            selectedAnswer={selectedAnswers[currentQuestion]}
            onSelectAnswer={handleSelectAnswer}
          />

          {/* Navigation */}
          <QuizNavigation
            currentQuestion={currentQuestion}
            totalQuestions={questions.length}
            canGoBack={currentQuestion > 0}
            canGoNext={currentQuestion < questions.length - 1 && selectedAnswers[currentQuestion] !== null}
            onBack={handleBack}
            onNext={handleNext}
            onReview={handleReview}
            hasSelectedAnswer={selectedAnswers[currentQuestion] !== null}
          />
        </motion.div>
      )}

      {screen === "review" && (
        <motion.div
          key="review"
          className="quiz-card w-full max-w-2xl mx-auto p-8 md:p-12"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
        >
          <QuizReview
            questions={questions}
            selectedAnswers={selectedAnswers}
            onJumpToQuestion={handleJumpToQuestion}
            onSubmitFinal={handleSubmitFinal}
          />
        </motion.div>
      )}

      {screen === "result" && (
        <motion.div
          key="result"
          className="quiz-card w-full max-w-2xl mx-auto p-8 md:p-12"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
        >
          <QuizResult
            score={calculateScore()}
            totalQuestions={questions.length}
            userName={userName}
            onRestart={handleRestart}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default QuizCard;
