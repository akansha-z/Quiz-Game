import { motion } from "framer-motion";

/**
 * Loading skeleton for quiz initialization
 */
const LoadingSkeleton = () => {
  return (
    <motion.div
      className="quiz-card w-full max-w-2xl mx-auto p-8 md:p-12"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="flex flex-col items-center justify-center min-h-[400px] space-y-6">
        {/* Title skeleton */}
        <div className="space-y-2 text-center">
          <div className="h-10 w-64 bg-muted rounded-lg animate-pulse mx-auto" />
          <div className="h-4 w-48 bg-muted rounded animate-pulse mx-auto" />
        </div>

        {/* Progress skeleton */}
        <div className="flex gap-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <div
              key={i}
              className="h-1 w-16 bg-muted rounded-full animate-pulse"
              style={{ animationDelay: `${i * 100}ms` }}
            />
          ))}
        </div>

        {/* Question skeleton */}
        <div className="w-full space-y-3 mt-4">
          <div className="h-12 bg-muted rounded-full animate-pulse mx-auto w-3/4" />
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="h-12 bg-muted rounded-full animate-pulse"
              style={{ animationDelay: `${i * 150}ms` }}
            />
          ))}
        </div>

        {/* Loading text */}
        <motion.p
          className="text-muted-foreground text-sm"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          Loading your quiz...
        </motion.p>
      </div>
    </motion.div>
  );
};

export default LoadingSkeleton;
