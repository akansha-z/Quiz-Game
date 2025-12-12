import { useEffect, useCallback } from "react";

interface UseKeyboardNavigationProps {
  options: string[];
  selectedAnswer: string | null;
  onSelectAnswer: (answer: string) => void;
  focusedIndex: number;
  setFocusedIndex: (index: number) => void;
  isActive: boolean;
}

/**
 * Custom hook for keyboard navigation in quiz options
 * Supports Arrow Up/Down and Enter key selection
 */
export const useKeyboardNavigation = ({
  options,
  selectedAnswer,
  onSelectAnswer,
  focusedIndex,
  setFocusedIndex,
  isActive,
}: UseKeyboardNavigationProps) => {
  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (!isActive) return;

      switch (event.key) {
        case "ArrowDown":
          event.preventDefault();
          setFocusedIndex(Math.min(focusedIndex + 1, options.length - 1));
          break;
        case "ArrowUp":
          event.preventDefault();
          setFocusedIndex(Math.max(focusedIndex - 1, 0));
          break;
        case "Enter":
        case " ":
          event.preventDefault();
          if (focusedIndex >= 0 && focusedIndex < options.length) {
            onSelectAnswer(options[focusedIndex]);
          }
          break;
      }
    },
    [isActive, focusedIndex, options, onSelectAnswer, setFocusedIndex]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  return { focusedIndex };
};
