"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface OpeningProps {
  onNext: () => void;
}

export default function Opening({ onNext }: OpeningProps) {
  const [blownOut, setBlownOut] = useState(false);
  const [showText, setShowText] = useState(false);
  const [countdown, setCountdown] = useState<number | null>(null);

  const handleTap = () => {
    if (!blownOut) {
      setBlownOut(true);
      // Wait a moment before showing the text
      setTimeout(() => setShowText(true), 800);
      setCountdown(3);
    }
  };

  useEffect(() => {
    if (countdown === null || !showText) return;

    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 800); // slightly faster than 1s
      return () => clearTimeout(timer);
    } else {
      onNext();
    }
  }, [countdown, showText, onNext]);

  return (
    <div 
      className="absolute inset-0 flex flex-col items-center justify-center p-6 text-cream-50"
      onClick={handleTap}
    >
      <AnimatePresence>
        {!showText && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
            transition={{ duration: 1 }}
            className="flex flex-col items-center"
          >
            {/* The Candle / Cake representation */}
            <div className="relative mb-12">
              <div className="w-16 h-24 bg-cream-50 rounded-md relative shadow-lg">
                {/* Flame */}
                <AnimatePresence>
                  {!blownOut && (
                    <motion.div
                      key="flame"
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ 
                        scale: [1, 1.1, 0.9, 1],
                        opacity: 1,
                        y: [0, -2, 2, 0]
                      }}
                      exit={{ scale: 0, opacity: 0, y: -20, transition: { duration: 0.5 } }}
                      transition={{ 
                        duration: 1.5, 
                        repeat: Infinity
                      }}
                      className="absolute -top-10 left-1/2 -translate-x-1/2 w-6 h-10 bg-gold-400 rounded-full blur-[2px]"
                      style={{
                        boxShadow: "0 0 20px 10px rgba(251, 191, 36, 0.6)",
                        borderTopLeftRadius: "50%",
                        borderTopRightRadius: "50%",
                        borderBottomLeftRadius: "40%",
                        borderBottomRightRadius: "40%"
                      }}
                    >
                      <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-3 h-5 bg-white rounded-full opacity-80" />
                    </motion.div>
                  )}
                </AnimatePresence>
                {/* Wick */}
                <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-1 h-2 bg-gray-800" />
              </div>
            </div>

            <p className="font-sans text-rose-200 tracking-widest text-sm uppercase mb-4 text-center">
              A little surprise for you, Chinna
            </p>
            <p className="font-script text-3xl text-rose-100 text-center animate-pulse">
              {blownOut ? "" : "Tap to blow out the candle..."}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showText && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 1 }}
            className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none"
          >
            <h1 className="font-script text-5xl md:text-6xl text-gold-400 text-center drop-shadow-lg px-4 mb-8">
              Happy Birthday, My Love
            </h1>
            
            {countdown !== null && countdown > 0 && (
              <motion.div 
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="relative flex items-center justify-center w-20 h-20"
              >
                <svg viewBox="0 0 24 24" className="absolute inset-0 w-full h-full text-rose-500 fill-current drop-shadow-lg animate-pulse">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                </svg>
                <AnimatePresence mode="popLayout">
                  <motion.span 
                    key={countdown}
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.5 }}
                    transition={{ duration: 0.3 }}
                    className="relative z-10 font-sans font-bold text-3xl text-white"
                  >
                    {countdown}
                  </motion.span>
                </AnimatePresence>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
