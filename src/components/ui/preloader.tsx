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

          <div className="relative z-10 flex flex-col items-center max-w-sm w-full text-center">
            {/* Monogram Box */}
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.35 }}
              className="h-14 w-14 rounded-2xl bg-zinc-900 border border-white/10 flex items-center justify-center font-mono font-bold text-lg text-white shadow-xl shadow-orange-500/10 mb-5"
            >
              <span className="text-orange-400">U</span>
              <span>T</span>
            </motion.div>

            {/* Name */}
            <motion.div
              initial={{ y: 8, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1, duration: 0.35 }}
            >
              <h2 className="text-base font-bold text-white tracking-tight">
                Muhammad Usman Tahir
              </h2>
              <p className="text-xs font-mono text-zinc-400 mt-0.5">
                Web Developer &bull; Problem Solver in C++
              </p>
            </motion.div>

            {/* Big Progress Number Display */}
            <div className="my-8 flex items-baseline justify-center gap-1 font-mono">
              <span className="text-5xl font-black text-white tracking-tighter">
                {progress < 10 ? `0${progress}` : progress}
              </span>
              <span className="text-sm font-semibold text-orange-400">%</span>
            </div>

            {/* Sleek Minimal Progress Bar */}
            <div className="w-full">
              <div className="w-full h-1 bg-white/[0.08] rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-orange-500 via-amber-500 to-red-500 rounded-full"
                  style={{ width: `${progress}%` }}
                  transition={{ ease: "easeOut" }}
                />
              </div>

              <div className="flex items-center justify-between text-[10px] font-mono text-zinc-500 mt-2.5">
                <span>SYSTEM_BOOT</span>
                <span>{progress === 100 ? "READY" : "LOADING..."}</span>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default Preloader;
