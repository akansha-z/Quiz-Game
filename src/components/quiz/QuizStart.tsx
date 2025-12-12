import { useState, useCallback, FormEvent } from "react";
import { motion } from "framer-motion";

interface QuizStartProps {
  onStart: (name: string) => void;
  savedName?: string;
}

/**
 * Welcome screen with name input for personalization
 */
const QuizStart = ({ onStart, savedName = "" }: QuizStartProps) => {
  const [name, setName] = useState(savedName);
  const [error, setError] = useState("");

  const handleSubmit = useCallback(
    (e: FormEvent) => {
      e.preventDefault();
      const trimmedName = name.trim();
      if (!trimmedName) {
        setError("Please enter your name to continue");
        return;
      }
      onStart(trimmedName);
    },
    [name, onStart]
  );

  return (
    <motion.div
      className="quiz-card w-full max-w-2xl mx-auto p-8 md:p-12"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
    >
      <div className="flex flex-col items-center justify-center min-h-[400px] text-center">
        {/* Title */}
        <motion.h1
          className="text-4xl md:text-5xl mb-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <span className="quiz-title-test">Test </span>
          <span className="quiz-title-your">Your </span>
          <span className="quiz-title-knowledge">Knowledge</span>
        </motion.h1>

        <motion.p
          className="text-muted-foreground mb-8 max-w-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          Challenge yourself with questions across Science, History, Geography, and more!
        </motion.p>

        {/* Name Input Form */}
        <motion.form
          onSubmit={handleSubmit}
          className="w-full max-w-sm space-y-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="space-y-2">
            <label htmlFor="player-name" className="sr-only">
              Your Name
            </label>
            <input
              id="player-name"
              type="text"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                setError("");
              }}
              placeholder="Enter your name"
              className="w-full px-6 py-3 rounded-full border border-border bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-primary transition-all"
              aria-describedby={error ? "name-error" : undefined}
              aria-invalid={!!error}
              autoComplete="name"
              autoFocus
            />
            {error && (
              <motion.p
                id="name-error"
                className="text-destructive text-sm"
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                role="alert"
              >
                {error}
              </motion.p>
            )}
          </div>

          <motion.button
            type="submit"
            className="quiz-submit-btn w-full py-3 text-lg"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Start Quiz
          </motion.button>
        </motion.form>

        {/* Features hint */}
        <motion.div
          className="mt-8 flex flex-wrap justify-center gap-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          {["12 Questions", "4 Categories", "Track Progress"].map((feature) => (
            <span
              key={feature}
              className="px-3 py-1 rounded-full text-xs bg-secondary text-secondary-foreground"
            >
              {feature}
            </span>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default QuizStart;
