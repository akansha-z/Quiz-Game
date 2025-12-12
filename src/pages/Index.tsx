import { motion } from "framer-motion";
import QuizCard from "@/components/quiz/QuizCard";
import ThemeToggle from "@/components/quiz/ThemeToggle";
import { useTheme } from "@/hooks/useTheme";

const Index = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <main className="min-h-screen quiz-gradient-bg flex items-center justify-center p-4 md:p-8">
      {/* Theme Toggle */}
      <ThemeToggle theme={theme} onToggle={toggleTheme} />

      {/* Quiz Card */}
      <motion.div
        className="w-full"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <QuizCard />
      </motion.div>
    </main>
  );
};

export default Index;
