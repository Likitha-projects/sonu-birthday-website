"use client";

import { motion } from "framer-motion";
import { Activity } from "lucide-react";
import { useEffect, useState } from "react";

export default function Hero() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center overflow-hidden">
      {/* Main Content */}
      <div className="z-10 flex flex-col items-center gap-4">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-sans text-rose-200 uppercase tracking-widest text-sm"
        >
          Happy 21st Birthday
        </motion.p>
        
        <motion.h1
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="font-script text-6xl md:text-8xl text-cream-50 drop-shadow-sm leading-tight"
        >
          Sonu Lokesh
        </motion.h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.0 }}
          className="flex items-center gap-3 mt-2 text-rose-300"
        >
          <div className="h-[1px] w-12 bg-rose-400" />
          <p className="font-script text-3xl">my Chinna</p>
          <div className="h-[1px] w-12 bg-rose-400" />
        </motion.div>

        {/* EKG / Medical Motif */}
        <motion.div
          initial={{ opacity: 0, width: 0 }}
          animate={{ opacity: 1, width: "auto" }}
          transition={{ duration: 1.5, delay: 1.5 }}
          className="mt-8 text-rose-300 flex items-center justify-center overflow-hidden"
        >
          <Activity size={32} strokeWidth={1.5} />
        </motion.div>
      </div>
    </div>
  );
}
