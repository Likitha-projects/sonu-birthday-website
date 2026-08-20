"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

interface ReasonData {
  id: number;
  photo: string;
  reason: string;
  tag?: string;
}

export default function Reasons({ onUnlockNext }: { onUnlockNext?: () => void }) {
  const [reasons, setReasons] = useState<ReasonData[]>([]);
  // -1 represents the intro screen
  const [currentIndex, setCurrentIndex] = useState(-1);

  useEffect(() => {
    fetch("/data/reasons.json")
      .then(res => res.json())
      .then(setReasons)
      .catch(console.error);
  }, []);

  const handleNext = () => {
    if (currentIndex < reasons.length - 1) {
      setCurrentIndex(prev => prev + 1);
      // If we are about to enter the last reason (or if it's already empty), unlock
      if (currentIndex + 1 === reasons.length - 1) {
        if (onUnlockNext) onUnlockNext();
      }
    }
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (currentIndex > -1) {
      setCurrentIndex(prev => prev - 1);
    }
  };

  if (reasons.length === 0) return null;

  return (
    <div 
      className="absolute inset-0 flex flex-col items-center justify-center p-6 overflow-hidden"
      onClick={handleNext}
    >
      <AnimatePresence mode="wait">
        {currentIndex === -1 ? (
          <motion.div
            key="intro"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center text-center px-4"
          >
            <h2 className="font-script text-6xl text-cream-50 mb-6 drop-shadow-md leading-tight">
              21 Reasons
            </h2>
            <p className="font-sans text-rose-200 text-lg uppercase tracking-widest max-w-sm mb-4">
              Why I love you
            </p>
            <p className="font-sans text-rose-300 text-sm italic">
              (Tap anywhere to read them one by one)
            </p>
          </motion.div>
        ) : (
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, scale: 0.95, filter: "blur(4px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, scale: 1.05, filter: "blur(4px)" }}
            transition={{ duration: 0.4 }}
            className="w-full max-w-sm bg-white/10 backdrop-blur-md rounded-3xl p-4 shadow-2xl border border-white/20 flex flex-col mt-4 md:mt-8"
          >
            {/* Photo Container */}
            <div className="relative w-full aspect-[4/5] rounded-2xl overflow-hidden bg-rose-950/50 mb-6 flex items-center justify-center">
              {/* Using standard img to avoid Next.js 400 errors for missing files */}
              <img
                src={`/images/reasons/${reasons[currentIndex].photo.replace('.jpg', '.jpeg')}`}
                alt={`Reason ${currentIndex + 1}`}
                className={`absolute inset-0 w-full h-full object-cover z-10 ${
                  reasons[currentIndex].photo.includes('21') ? 'object-top' : 'object-center'
                }`}
                onError={(e) => {
                  // Hide broken image icon
                  (e.target as HTMLImageElement).style.display = 'none';
                }}
              />
            </div>

            {/* Reason Text */}
            <div className="px-2 pb-4 text-center">
              {reasons[currentIndex].tag && (
                <span className="text-gold-400 font-script text-2xl block mb-2">
                  {reasons[currentIndex].tag}
                </span>
              )}
              <p className="font-sans text-cream-50 leading-relaxed text-lg drop-shadow-md">
                {reasons[currentIndex].reason}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Conditionally hide the pill for specific reasons so it doesn't block the image on mobile */}
      {currentIndex > -1 && ![11, 12, 16, 20].includes(currentIndex + 1) && (
        <div className="absolute top-8 md:top-12 left-0 right-0 flex justify-center z-20 pointer-events-none">
          <span className="bg-white/10 backdrop-blur-md text-rose-200 text-xs font-semibold px-4 py-1.5 rounded-full shadow-sm border border-white/20">
            Reason #{currentIndex + 1} of {reasons.length}
          </span>
        </div>
      )}

      {currentIndex > -1 && (
        <div className="absolute bottom-8 left-0 right-0 flex justify-between px-8 pointer-events-none z-20">
          <button 
            onClick={handlePrev}
            className={`pointer-events-auto text-rose-400 p-2 uppercase tracking-widest text-xs transition-opacity ${currentIndex === 0 ? "opacity-0" : "opacity-100"}`}
            disabled={currentIndex === 0}
          >
            Previous
          </button>
          
          <span className="text-rose-400/50 p-2 uppercase tracking-widest text-xs">
            {currentIndex === reasons.length - 1 ? "" : "Tap Next"}
          </span>
        </div>
      )}
    </div>
  );
}
