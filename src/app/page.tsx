"use client";

import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Opening from "@/components/Opening";
import Hero from "@/components/Hero";
import Surprises from "@/components/Surprises";
import NameAcrostic from "@/components/NameAcrostic";
import Reasons from "@/components/Reasons";
import AllOurs from "@/components/AllOurs";
import Letter from "@/components/Letter";
import AudioPlayer from "@/components/AudioPlayer";
import NavigationControls from "@/components/NavigationControls";
import FloatingHearts from "@/components/FloatingHearts";

const TOTAL_STEPS = 7;

export default function Home() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isNextLocked, setIsNextLocked] = useState(false);

  useEffect(() => {
    // Preload assets in the background
    fetch("/data/letter.txt").catch(() => {});
    fetch("/data/reasons.json")
      .then(res => res.json())
      .then(data => {
        data.forEach((reason: any) => {
          if (reason.photo) {
            const img = new Image();
            img.src = `/images/reasons/${reason.photo.replace('.jpg', '.jpeg')}`;
          }
        });
      })
      .catch(() => {});
  }, []);

  const handleNext = () => {
    if (currentStep < TOTAL_STEPS - 1) {
      const nextStep = currentStep + 1;
      setCurrentStep(nextStep);
      // Lock the continue button for interactive steps (Acrostic=3, Reasons=4)
      setIsNextLocked(nextStep === 3 || nextStep === 4);
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      const prevStep = currentStep - 1;
      setCurrentStep(prevStep);
      // Lock the continue button for interactive steps (Acrostic=3, Reasons=4)
      setIsNextLocked(prevStep === 3 || prevStep === 4);
    }
  };

  const steps = [
    <Opening key="step-0" onNext={handleNext} />,
    <Hero key="step-1" />,
    <Surprises key="step-2" />,
    <NameAcrostic key="step-3" onUnlockNext={() => setIsNextLocked(false)} />,
    <Reasons key="step-4" onUnlockNext={() => setIsNextLocked(false)} />,
    <AllOurs key="step-5" />,
    <Letter key="step-6" />
  ];

  return (
    <main className="relative w-full h-[100dvh] overflow-hidden bg-gradient-to-br from-rose-950 via-rose-900 to-rose-950 select-none text-cream-50">
      <FloatingHearts />
      <AudioPlayer currentStep={currentStep} />
      
      <NavigationControls 
        currentStep={currentStep} 
        totalSteps={TOTAL_STEPS} 
        onNext={handleNext} 
        onPrev={handlePrev}
        isNextLocked={isNextLocked}
      />

      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, y: 10, filter: "blur(5px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          exit={{ opacity: 0, y: -10, filter: "blur(5px)" }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="absolute inset-0 z-10 flex flex-col"
        >
          {steps[currentStep]}
        </motion.div>
      </AnimatePresence>
    </main>
  );
}
