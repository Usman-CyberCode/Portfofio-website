"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface PreloaderProps {
  onComplete?: () => void;
}

export function Preloader({ onComplete }: PreloaderProps) {
  const [progress, setProgress] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    document.body.style.overflow = "hidden";

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsFinished(true);
            document.body.style.overflow = "";
            onComplete?.();
          }, 250);
          return 100;
        }
        const increment = Math.floor(Math.random() * 15) + 8;
        return Math.min(100, prev + increment);
      });
    }, 60);

    return () => {
      clearInterval(interval);
      document.body.style.overflow = "";
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!isFinished && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{
            y: "-100%",
            transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1] },
          }}
          className="fixed inset-0 z-[100000] bg-[#07070a] flex flex-col items-center justify-center p-6 select-none"
        >
          {/* Subtle Background Glow */}
          <div
            aria-hidden="true"
            className="absolute w-[400px] h-[400px] rounded-full bg-gradient-to-tr from-orange-600/12 via-red-600/8 to-transparent blur-3xl pointer-events-none"
          />

          <div className="relative z-10 flex flex-col items-center justify-center max-w-sm w-full text-center">
            {/* Minimalist Shimmering 'LOADING' Text */}
            <div className="relative overflow-hidden mb-6">
              <motion.h1
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="text-sm sm:text-base font-mono uppercase tracking-[0.55em] text-zinc-300 font-semibold relative"
              >
                <span className="relative z-10">LOADING</span>
                
                {/* Smooth light shimmer sweep across the text */}
                <motion.span
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-orange-400 to-transparent bg-clip-text text-transparent pointer-events-none"
                  animate={{
                    x: ["-120%", "120%"],
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 1.8,
                    ease: "easeInOut",
                  }}
                >
                  LOADING
                </motion.span>
              </motion.h1>
            </div>

            {/* Smooth Glowing Progress Bar */}
            <div className="w-48 sm:w-56 h-[2px] bg-white/[0.08] rounded-full overflow-hidden relative">
              <motion.div
                className="h-full bg-gradient-to-r from-orange-500 via-amber-400 to-red-500 rounded-full shadow-[0_0_12px_rgba(249,115,22,0.8)]"
                style={{ width: `${progress}%` }}
                transition={{ ease: "easeOut" }}
              />
              {/* Subtle glowing tracer spark */}
              <motion.div
                className="absolute top-0 bottom-0 w-8 bg-gradient-to-r from-transparent via-white to-transparent opacity-80"
                style={{
                  left: `calc(${progress}% - 16px)`,
                }}
              />
            </div>

            {/* Subtle animated dots below */}
            <div className="flex items-center gap-1.5 mt-4">
              {[0, 1, 2].map((i) => (
                <motion.span
                  key={i}
                  className="w-1 h-1 rounded-full bg-orange-400/70"
                  animate={{
                    opacity: [0.3, 1, 0.3],
                    scale: [0.8, 1.2, 0.8],
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 1.2,
                    delay: i * 0.25,
                    ease: "easeInOut",
                  }}
                />
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default Preloader;
