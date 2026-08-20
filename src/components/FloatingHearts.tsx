"use client";

import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import { useEffect, useState } from "react";

export default function FloatingHearts() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0 opacity-50">
      {[...Array(30)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ 
            y: "110vh", 
            x: `${Math.random() * 100}vw`,
            scale: Math.random() * 0.6 + 0.4,
            opacity: Math.random() * 0.6 + 0.2
          }}
          animate={{ 
            y: "-10vh",
            x: `${Math.random() * 100}vw`
          }}
          transition={{ 
            duration: Math.random() * 15 + 10,
            repeat: Infinity,
            ease: "linear",
            delay: Math.random() * 15
          }}
          className="absolute text-rose-300"
        >
          <Heart fill="currentColor" size={24} />
        </motion.div>
      ))}
    </div>
  );
}
