import { motion } from "framer-motion";
import { Sun, Moon } from "lucide-react";

interface ThemeToggleProps {
  theme: "light" | "dark";
  onToggle: () => void;
}

/**
 * Accessible theme toggle button with smooth animation
 */
const ThemeToggle = ({ theme, onToggle }: ThemeToggleProps) => {
  return (
    <motion.button
      onClick={onToggle}
      className="fixed top-4 right-4 z-50 w-12 h-12 rounded-full bg-card border border-border shadow-lg flex items-center justify-center transition-colors hover:border-primary/50 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
      role="switch"
      aria-checked={theme === "dark"}
    >
      <motion.div
        initial={false}
        animate={{ rotate: theme === "dark" ? 180 : 0 }}
        transition={{ duration: 0.3 }}
      >
        {theme === "light" ? (
          <Sun className="w-5 h-5 text-foreground" />
        ) : (
          <Moon className="w-5 h-5 text-foreground" />
        )}
      </motion.div>
    </motion.button>
  );
};

export default ThemeToggle;
