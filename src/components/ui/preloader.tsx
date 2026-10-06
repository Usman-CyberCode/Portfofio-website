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
    // Disable body scroll while loading
    document.body.style.overflow = "hidden";

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsFinished(true);
            document.body.style.overflow = "";
            onComplete?.();
          }, 300);
          return 100;
        }
        // Realistic variable progress increments
        const increment = Math.floor(Math.random() * 12) + 5;
        return Math.min(100, prev + increment);
      });
    }, 75);

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
          className="fixed inset-0 z-[10000] bg-[#07070a] flex flex-col items-center justify-center p-6 select-none"
        >
          {/* Subtle Background Glow */}
          <div
            aria-hidden="true"
            className="absolute w-[350px] h-[350px] rounded-full bg-gradient-to-tr from-orange-600/15 via-red-600/10 to-transparent blur-3xl pointer-events-none"
          />

          <div className="relative z-10 flex flex-col items-center max-w-sm w-full text-center">
            {/* Monogram Box */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.4 }}
              className="h-16 w-16 rounded-2xl bg-zinc-900 border border-white/10 flex items-center justify-center font-mono font-bold text-xl text-white shadow-xl shadow-orange-500/10 mb-6"
            >
              <span className="text-orange-400">U</span>
              <span>T</span>
            </motion.div>

            {/* Name & Title */}
            <motion.div
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1, duration: 0.4 }}
            >
              <h2 className="text-base sm:text-lg font-bold text-white tracking-tight">
                Muhammad Usman Tahir
              </h2>
              <p className="text-xs font-mono text-zinc-400 mt-1">
                Web Developer &bull; Problem Solver in C++
              </p>
            </motion.div>

            {/* Progress Bar Container */}
            <div className="w-full mt-8">
              <div className="flex items-center justify-between text-[11px] font-mono text-zinc-400 mb-2">
                <span>INITIALIZING SYSTEM</span>
                <span className="text-orange-400 font-semibold">{progress}%</span>
              </div>

              <div className="w-full h-1 bg-white/[0.08] rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-orange-500 via-amber-500 to-red-500 rounded-full"
                  style={{ width: `${progress}%` }}
                  transition={{ ease: "easeOut" }}
                />
              </div>
            </div>

            {/* Terminal Status Text */}
            <div className="mt-4 text-[10px] font-mono text-zinc-500">
              {progress < 40 && "> Loading core components & modules..."}
              {progress >= 40 && progress < 85 && "> Preparing 3D graphics & layout..."}
              {progress >= 85 && "> Launching developer portfolio..."}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
