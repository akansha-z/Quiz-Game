import { useState, useEffect, useCallback } from "react";

interface QuizState {
  currentQuestion: number;
  selectedAnswers: (string | null)[];
  userName: string;
  quizStarted: boolean;
}

const STORAGE_KEY = "quiz_state";

/**
 * Custom hook to persist quiz state in localStorage
 * Handles saving/loading quiz progress automatically
 */
export const useQuizPersistence = (totalQuestions: number) => {
  const [isLoading, setIsLoading] = useState(true);
  const [state, setState] = useState<QuizState>({
    currentQuestion: 0,
    selectedAnswers: new Array(totalQuestions).fill(null),
    userName: "",
    quizStarted: false,
  });

  // Load state from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved) as QuizState;
        // Validate the saved state matches current quiz length
        if (parsed.selectedAnswers.length === totalQuestions) {
          setState(parsed);
        }
      }
    } catch (error) {
      console.error("Failed to load quiz state:", error);
    }
    setIsLoading(false);
  }, [totalQuestions]);

  // Save state to localStorage whenever it changes
  useEffect(() => {
    if (!isLoading) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
      } catch (error) {
        console.error("Failed to save quiz state:", error);
      }
    }
  }, [state, isLoading]);

  const updateState = useCallback((updates: Partial<QuizState>) => {
    setState((prev) => ({ ...prev, ...updates }));
  }, []);

  const resetState = useCallback(() => {
    setState({
      currentQuestion: 0,
      selectedAnswers: new Array(totalQuestions).fill(null),
      userName: "",
      quizStarted: false,
    });
    localStorage.removeItem(STORAGE_KEY);
  }, [totalQuestions]);

  return {
    ...state,
    isLoading,
    updateState,
    resetState,
  };
};
