"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FlipFadeText } from "@/components/ui/flip-fade-text";

interface PreloaderProps {
  onComplete?: () => void;
}

export function Preloader({ onComplete }: PreloaderProps) {
  const [progress, setProgress] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    document.body.style.overflow = "hidden";

    // Fast, responsive loading progression taking ~850ms total
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsFinished(true);
            document.body.style.overflow = "";
            onComplete?.();
          }, 240);
          return 100;
        }
        const step = Math.floor(Math.random() * 18) + 14;
        return Math.min(100, prev + step);
      });
    }, 42);

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
            opacity: 0.98,
            transition: { duration: 0.6, ease: [0.76, 0, 0.24, 1] },
          }}
          className="fixed inset-0 z-[100000] bg-[#07070a] flex flex-col items-center justify-center p-6 select-none"
        >
          {/* Subtle Ambient Background Warm Glow */}
          <div
            aria-hidden="true"
            className="absolute w-[450px] h-[450px] rounded-full bg-gradient-to-tr from-orange-600/15 via-red-600/8 to-transparent blur-3xl pointer-events-none"
          />

          <div className="relative z-10 flex flex-col items-center justify-center max-w-sm w-full text-center">
            {/* Top Monogram / System Identity */}
            <div className="mb-4 inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/[0.03] text-[11px] font-mono text-zinc-400">
              <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-ping" />
              <span>MUT // SYSTEM INITIALIZE</span>
            </div>

            {/* 3D Flip-Fade Text Effect showing 'LOADING' */}
            <div className="mb-2">
              <FlipFadeText
                words={["LOADING"]}
                interval={4000}
                className="min-h-[52px]"
                textClassName="text-2xl sm:text-3xl font-mono font-extrabold tracking-[0.35em] text-white"
                letterDuration={0.4}
                staggerDelay={0.04}
              />
            </div>

            {/* Live Percentage Counter */}
            <div className="mb-3 font-mono text-xs text-orange-400 tracking-widest font-semibold">
              {progress.toString().padStart(3, " ")}%
            </div>

            {/* Ultra-Smooth Glowing Progress Rail */}
            <div className="w-52 sm:w-64 h-[2.5px] bg-white/[0.08] rounded-full overflow-hidden relative">
              <motion.div
                className="h-full bg-gradient-to-r from-orange-500 via-amber-400 to-red-500 rounded-full shadow-[0_0_14px_rgba(249,115,22,1)]"
                style={{ width: `${progress}%` }}
                transition={{ ease: "easeOut" }}
              />
              <motion.div
                className="absolute top-0 bottom-0 w-12 bg-gradient-to-r from-transparent via-white to-transparent opacity-80"
                style={{
                  left: `calc(${progress}% - 24px)`,
                }}
              />
            </div>

            {/* Bottom Telemetry Note */}
            <div className="mt-5 text-[10px] font-mono text-zinc-400 flex items-center gap-3">
              <span>MUHAMMAD USMAN TAHIR</span>
              <span>&bull;</span>
              <span className="text-zinc-400">BSCS 5TH SEM</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default Preloader;
