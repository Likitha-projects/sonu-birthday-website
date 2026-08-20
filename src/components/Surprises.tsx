"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Gift, Heart, Mail, Star, X } from "lucide-react";

const SURPRISES = [
  {
    id: 1,
    icon: Gift,
    title: "A Little Gift",
    message: "For the girl who gives so much to everyone else, today is all about you, Chinna."
  },
  {
    id: 2,
    icon: Heart,
    title: "My Heart",
    message: "It beats a little faster every time I see your name pop up on my phone."
  },
  {
    id: 3,
    icon: Mail,
    title: "A Note",
    message: "You're going to make the most amazing doctor someday. I'm so proud of you."
  },
  {
    id: 4,
    icon: Star,
    title: "A Wish",
    message: "I wish I could freeze time right now, just to celebrate you a little longer."
  }
];

export default function Surprises() {
  const [activeSurprise, setActiveSurprise] = useState<number | null>(null);

  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center p-6">
      <motion.h2 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="font-sans text-rose-200 text-lg uppercase tracking-widest mb-12 text-center"
      >
        Little Surprises
      </motion.h2>

      <div className="grid grid-cols-2 gap-8 w-full max-w-sm">
        {SURPRISES.map((surprise, index) => {
          const Icon = surprise.icon;
          return (
            <motion.button
              key={surprise.id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.2 + 0.5 }}
              onClick={() => setActiveSurprise(surprise.id)}
              className="flex flex-col items-center justify-center gap-4 aspect-square bg-white rounded-2xl shadow-sm border border-rose-100 text-rose-500 active:scale-95 transition-transform"
            >
              <Icon size={40} strokeWidth={1.5} />
            </motion.button>
          );
        })}
      </div>

      {/* Modal for active surprise */}
      <AnimatePresence>
        {activeSurprise !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-rose-950/40 backdrop-blur-sm"
            onClick={() => setActiveSurprise(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-cream-50 p-8 rounded-3xl shadow-xl w-full max-w-sm relative flex flex-col items-center text-center"
            >
              <button 
                onClick={() => setActiveSurprise(null)}
                className="absolute top-4 right-4 text-rose-300 p-2"
              >
                <X size={20} />
              </button>
              
              {SURPRISES.map(s => {
                if (s.id !== activeSurprise) return null;
                const ModalIcon = s.icon;
                return (
                  <div key={s.id} className="flex flex-col items-center">
                    <div className="w-16 h-16 bg-rose-100 rounded-full flex items-center justify-center text-rose-500 mb-6">
                      <ModalIcon size={32} strokeWidth={1.5} />
                    </div>
                    <h3 className="font-script text-3xl text-rose-800 mb-4">{s.title}</h3>
                    <p className="font-sans text-rose-700 leading-relaxed">
                      {s.message}
                    </p>
                  </div>
                );
              })}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
