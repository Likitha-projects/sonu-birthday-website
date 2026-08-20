"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Stethoscope } from "lucide-react";

export default function Letter() {
  const [paragraphs, setParagraphs] = useState<string[]>([]);

  useEffect(() => {
    fetch("/data/letter.txt")
      .then(res => res.text())
      .then(text => {
        // Split by blank lines to form paragraphs
        const paras = text.split(/\n\s*\n/).filter(p => p.trim().length > 0);
        setParagraphs(paras);
      })
      .catch(console.error);
  }, []);

  return (
    <div className="absolute inset-0 overflow-y-auto p-6 pb-24 text-cream-50">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5 }}
        className="max-w-md mx-auto w-full pt-8 relative z-10"
      >
        <h2 className="font-script text-5xl mb-12 text-rose-300 text-center drop-shadow-md">To my dearest person,</h2>
        
        <div className="font-sans text-lg leading-[1.8] space-y-6 text-cream-50 mb-16 px-2 drop-shadow-sm">
          {paragraphs.length > 0 ? (
            paragraphs.map((para, idx) => (
              <motion.p 
                key={idx}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.8, delay: idx * 0.1 }}
              >
                {para}
              </motion.p>
            ))
          ) : (
            <p className="italic text-rose-300">Loading letter...</p>
          )}
        </div>

        {/* Signature Area */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.5 }}
          className="flex flex-col items-center justify-center mt-20 mb-12 space-y-4"
        >
          {/* Animated SVG Signature line */}
          <svg className="w-32 h-12" viewBox="0 0 100 40">
            <motion.path 
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 2, delay: 1, ease: "easeInOut" }}
              d="M10,20 C30,0 50,40 70,20 C80,10 90,30 95,20" 
              fill="transparent" 
              stroke="#fda4af" 
              strokeWidth="2" 
              strokeLinecap="round"
            />
          </svg>

          <p className="font-script text-4xl text-rose-200 text-center mt-2">
            Happy 21st birthday my Love
          </p>
          <div className="flex items-center gap-2 mt-2 text-rose-300 font-sans text-sm tracking-widest uppercase">
            <span>Future Dr. Sonu Lokesh</span>
            <Stethoscope size={16} />
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
