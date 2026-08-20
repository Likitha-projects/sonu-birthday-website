"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface AcrosticItem {
  letter: string;
  word: string;
  description: string;
}

export default function NameAcrostic({ onUnlockNext }: { onUnlockNext?: () => void }) {
  const [data, setData] = useState<AcrosticItem[]>([]);
  // -1 for intro/start, but let's just start at 0
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    fetch("/data/acrostic.json?t=" + Date.now())
      .then(res => res.json())
      .then(setData)
      .catch(console.error);
  }, []);

  const handleNext = () => {
    if (currentIndex < data.length - 1) {
      setCurrentIndex(prev => prev + 1);
      if (currentIndex + 1 === data.length - 1) {
        if (onUnlockNext) onUnlockNext();
      }
    }
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    }
  };

  if (data.length === 0) return null;

  const currentItem = data[currentIndex];
  // Reconstruct her name based on the JSON or hardcode it. The JSON spells "SONULOKESH".
  // We can insert a space after the 4th letter for "SONU LOKESH".
  const fullName = "SONU LOKESH".split("");

  // Map the currentIndex (which is 0-9 for SONULOKESH) to the index in fullName (which includes a space)
  const spaceOffset = currentIndex >= 4 ? 1 : 0;
  const activeCharIndex = currentIndex + spaceOffset;

  return (
    <div 
      className="absolute inset-0 flex flex-col items-center justify-center p-8"
      onClick={handleNext}
      style={{ perspective: 1000 }} // For 3D effects
    >
      <div className="absolute top-16 left-0 right-0 flex justify-center gap-1.5 px-4 font-script text-3xl md:text-4xl">
        {fullName.map((char, idx) => (
          <span 
            key={idx}
            className={`transition-all duration-500 ${
              char === " " ? "w-4" : ""
            } ${
              idx === activeCharIndex 
                ? "text-cream-50 scale-125 drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]" 
                : "text-rose-400/40 scale-100"
            }`}
          >
            {char}
          </span>
        ))}
      </div>

      <div className="text-center w-full max-w-sm mt-12">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, rotateY: 90, scale: 0.8 }}
            animate={{ opacity: 1, rotateY: 0, scale: 1 }}
            exit={{ opacity: 0, rotateY: -90, scale: 0.8 }}
            transition={{ duration: 0.6, type: "spring", bounce: 0.4 }}
            className="flex flex-col items-center bg-white/5 backdrop-blur-sm p-8 rounded-3xl border border-white/10 shadow-2xl"
          >
            <h2 className="font-script text-8xl md:text-9xl text-cream-50 mb-4 drop-shadow-lg">
              {currentItem.letter}
            </h2>
            <h3 className="font-sans text-2xl text-rose-300 font-light tracking-wide mb-6 uppercase">
              {currentItem.word}
            </h3>
            <p className="font-sans text-cream-100 leading-relaxed text-center italic text-lg">
              "{currentItem.description}"
            </p>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="absolute bottom-8 left-0 right-0 flex justify-between px-8 pointer-events-none z-20">
        <button 
          onClick={handlePrev}
          className={`pointer-events-auto text-rose-400 p-2 uppercase tracking-widest text-xs transition-opacity ${currentIndex === 0 ? "opacity-0" : "opacity-100"}`}
          disabled={currentIndex === 0}
        >
          Previous
        </button>
        
        <span className="text-rose-400/50 p-2 uppercase tracking-widest text-xs">
          {currentIndex === data.length - 1 ? "" : "Tap Next"}
        </span>
      </div>
    </div>
  );
}
