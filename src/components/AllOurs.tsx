"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function AllOurs() {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center overflow-hidden">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
        className="w-full max-w-sm flex flex-col items-center justify-center h-full"
      >
        <div className="relative w-[280px] h-[350px] overflow-hidden mb-8 mask-heart shadow-2xl">
          {/* We'll use a CSS mask or just a high border-radius for an elegant rounded mask */}
          <div className="absolute inset-0 rounded-t-full rounded-b-[40px] overflow-hidden border-4 border-rose-900/50 flex items-center justify-center bg-rose-900">
            <img
              src="/images/hero/us.jpeg"
              alt="Us"
              className="absolute inset-0 w-full h-full object-cover opacity-90 z-10"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = 'none';
              }}
            />
            {/* Fallback styling */}
            <div className="absolute inset-0 flex items-center justify-center text-cream-50/50 text-sm italic z-0">
              [Image: hero/us.jpeg]
            </div>
          </div>
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="font-script text-3xl md:text-4xl text-rose-200 mt-2 px-4 mb-20"
        >
          This little part of Internet is all ours , Chinna. ❤️
        </motion.p>
      </motion.div>
    </div>
  );
}
