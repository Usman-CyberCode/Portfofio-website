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

    // Fast, responsive loading progression taking ~800ms total
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
        const step = Math.floor(Math.random() * 20) + 14;
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
            transition: { duration: 0.65, ease: [0.76, 0, 0.24, 1] },
          }}
          className="fixed inset-0 z-[100000] bg-[#030509] flex flex-col items-center justify-center p-6 select-none"
        >
          {/* Subtle Ambient Background Deep Sapphire Glow */}
          <div
            aria-hidden="true"
            className="absolute w-[500px] h-[500px] rounded-full bg-[radial-gradient(circle,rgba(37,99,235,0.18)_0%,rgba(14,165,233,0.06)_40%,transparent_70%)] blur-3xl pointer-events-none"
          />

          <div className="relative z-10 flex flex-col items-center justify-center max-w-sm w-full text-center">
            {/* Top Monogram / System Identity */}
            <div className="mb-4 inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/[0.03] text-[11px] font-mono text-slate-400">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-ping" />
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
            <div className="mb-3 font-mono text-xs text-blue-400 tracking-widest font-semibold">
              {progress.toString().padStart(3, " ")}%
            </div>

            {/* Ultra-Smooth Glowing Progress Rail */}
            <div className="w-52 sm:w-64 h-[2.5px] bg-white/[0.08] rounded-full overflow-hidden relative">
              <motion.div
                className="h-full bg-gradient-to-r from-blue-600 via-sky-400 to-indigo-500 rounded-full shadow-[0_0_14px_rgba(59,130,246,0.9)]"
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
            <div className="mt-5 text-[10px] font-mono text-slate-400 flex items-center gap-3">
              <span>PORTFOLIO v2.0</span>
              <span className="text-slate-600">&bull;</span>
              <span className="text-blue-400">READY</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default Preloader;
