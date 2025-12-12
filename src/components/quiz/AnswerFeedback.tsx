import { motion, AnimatePresence } from "framer-motion";
import { Check } from "lucide-react";

interface AnswerFeedbackProps {
  show: boolean;
}

/**
 * Subtle feedback animation when an answer is selected
 */
const AnswerFeedback = ({ show }: AnswerFeedbackProps) => {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="flex items-center justify-center gap-2 text-primary"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
        >
          <Check className="w-4 h-4" />
          <span className="text-sm font-medium">Answer recorded</span>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AnswerFeedback;
