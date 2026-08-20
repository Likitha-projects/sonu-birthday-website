"use client";

import { motion } from "framer-motion";

import { ChevronDown, ChevronUp, ChevronLeft } from "lucide-react";

interface NavigationControlsProps {
  currentStep: number;
  totalSteps: number;
  onNext: () => void;
  onPrev: () => void;
  isNextLocked?: boolean;
}

export default function NavigationControls({ currentStep, totalSteps, onNext, onPrev, isNextLocked }: NavigationControlsProps) {
  // We don't show navigation on Step 0 (Opening) or Step 6 (Letter - last step)
  if (currentStep === 0 || currentStep >= totalSteps - 1) return null;

  return (
    <>
      {/* Delicate Progress Dots at the Top */}
      <div className="fixed top-6 left-0 right-0 z-40 flex justify-center items-center gap-2 pointer-events-none">
        {Array.from({ length: totalSteps - 1 }).map((_, idx) => {
          // idx 0 corresponds to Step 1
          const stepIndex = idx + 1;
          const isActive = stepIndex === currentStep;
          const isPast = stepIndex < currentStep;

          return (
            <motion.div
              key={idx}
              className={`h-1.5 rounded-full transition-all duration-500 ease-in-out ${
                isActive ? "w-4 bg-rose-500" : isPast ? "w-1.5 bg-rose-300" : "w-1.5 bg-rose-200/50"
              }`}
            />
          );
        })}
      </div>

      {/* Back Button (Top Left) */}
      <motion.button
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        onClick={onPrev}
        className="fixed top-4 left-4 z-40 flex items-center gap-1 text-rose-300 hover:text-rose-100 transition-colors bg-rose-950/20 px-3 py-2 rounded-full backdrop-blur-sm"
      >
        <ChevronLeft size={18} />
        <span className="text-xs font-medium tracking-widest uppercase">Back</span>
      </motion.button>

      {/* Continue Affordance at the Bottom (Hidden if locked) */}
      {!isNextLocked && (
        <motion.button
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1 }} // delayed so it doesn't rush them
          onClick={onNext}
          className="fixed bottom-8 left-1/2 -translate-x-1/2 z-40 flex flex-col items-center gap-1 text-cream-50 hover:text-white bg-rose-950/60 backdrop-blur-md px-6 py-2 rounded-full border border-rose-400/30 shadow-[0_0_15px_rgba(225,29,72,0.3)] active:scale-95 transition-all"
        >
          <span className="text-xs font-semibold tracking-widest uppercase">Continue</span>
          <motion.div
            animate={{ y: [0, 5, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          >
            <ChevronDown size={22} className="text-rose-300" />
          </motion.div>
        </motion.button>
      )}
    </>
  );
}
