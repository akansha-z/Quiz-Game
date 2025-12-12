import { motion } from "framer-motion";
import ScoreRing from "./ScoreRing";

interface QuizResultProps {
  score: number;
  totalQuestions: number;
  userName: string;
  onRestart: () => void;
}

/**
 * Get motivational message based on score percentage
 */
const getMotivationalMessage = (percentage: number): { title: string; message: string } => {
  if (percentage === 100) {
    return { title: "Perfect Score! 🎉", message: "You're a true knowledge master!" };
  }
  if (percentage >= 80) {
    return { title: "Excellent! 🌟", message: "You really know your stuff!" };
  }
  if (percentage >= 60) {
    return { title: "Good Job! 👍", message: "Solid performance, keep learning!" };
  }
  if (percentage >= 40) {
    return { title: "Keep Trying! 💪", message: "Practice makes perfect!" };
  }
  return { title: "Keep Learning! 📚", message: "Every attempt is a step forward!" };
};

/**
 * Enhanced result screen with animated score ring and personalization
 */
const QuizResult = ({ score, totalQuestions, userName, onRestart }: QuizResultProps) => {
  const percentage = Math.round((score / totalQuestions) * 100);
  const { title, message } = getMotivationalMessage(percentage);

  return (
    <motion.div
      className="flex flex-col items-center justify-center min-h-[450px] text-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Motivational Badge */}
      <motion.div
        className="result-badge mb-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        {title}
      </motion.div>

      {/* Personalized Greeting */}
      <motion.h2
        className="font-serif text-2xl md:text-3xl mb-2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <span className="quiz-title-your">{userName}, </span>
        <span className="quiz-title-knowledge italic font-normal">your score is</span>
      </motion.h2>

      {/* Score Ring */}
      <motion.div
        className="my-8"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.4, type: "spring", stiffness: 100 }}
      >
        <ScoreRing percentage={percentage} size={180} strokeWidth={14} />
      </motion.div>

      {/* Score Details */}
      <motion.p
        className="text-muted-foreground mb-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        You got <span className="text-foreground font-medium">{score}</span> out of{" "}
        <span className="text-foreground font-medium">{totalQuestions}</span> questions correct
      </motion.p>

      {/* Motivational Message */}
      <motion.p
        className="text-sm text-muted-foreground mb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        {message}
      </motion.p>

      {/* Restart Button */}
      <motion.button
        className="start-again-btn"
        onClick={onRestart}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2 }}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        Try Again
      </motion.button>
    </motion.div>
  );
};

export default QuizResult;
