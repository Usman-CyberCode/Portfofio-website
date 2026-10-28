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

    // Silky smooth, continuous linear progression over ~1.5s
    const startTime = performance.now();
    const duration = 1450; // ms

    let animationFrameId: number;

    const animateProgress = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const fraction = Math.min(1, elapsed / duration);

      // Smooth ease-out cubic for realistic velocity that eases into 100%
      const easeProgress = 1 - Math.pow(1 - fraction, 2.5);
      const currentPercent = Math.min(100, Math.floor(easeProgress * 100));

      setProgress(currentPercent);

      if (fraction < 1) {
        animationFrameId = requestAnimationFrame(animateProgress);
      } else {
        setProgress(100);
        // Graceful pause at 100% before cinematic curtain reveal
        setTimeout(() => {
          setIsFinished(true);
          document.body.style.overflow = "";
          onComplete?.();
        }, 220);
      }
    };

    animationFrameId = requestAnimationFrame(animateProgress);

    return () => {
      cancelAnimationFrame(animationFrameId);
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
            transition: { duration: 0.85, ease: [0.76, 0, 0.24, 1] },
          }}
          className="fixed inset-0 z-[100000] bg-[#050508] flex flex-col items-center justify-center p-6 select-none"
        >
          {/* Subtle Ambient Background Dark Purple Glow */}
          <div
            aria-hidden="true"
            className="absolute w-[550px] h-[550px] rounded-full bg-[radial-gradient(circle,rgba(88,28,135,0.22)_0%,rgba(30,10,60,0.1)_45%,transparent_75%)] blur-3xl pointer-events-none"
          />

          <div className="relative z-10 flex flex-col items-center justify-center max-w-sm w-full text-center">
            {/* Top Monogram / System Status Pill */}
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="mb-5 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/10 bg-white/[0.03] text-[11px] font-mono text-zinc-400"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>MUT // SYSTEM INITIALIZE</span>
            </motion.div>

            {/* 3D Flip-Fade Text Effect showing 'LOADING' */}
            <div className="mb-2">
              <FlipFadeText
                words={["LOADING"]}
                interval={4000}
                className="min-h-[50px]"
                textClassName="text-2xl sm:text-3xl font-mono font-extrabold tracking-[0.35em] text-[#ebe8e5]"
                letterDuration={0.4}
                staggerDelay={0.035}
              />
            </div>

            {/* Live Percentage Counter with Monospace Precision */}
            <div className="mb-3.5 font-mono text-xs text-purple-300 tracking-widest font-semibold tabular-nums">
              {progress.toString().padStart(3, "0")}%
            </div>

            {/* Ultra-Smooth Glowing Progress Rail */}
            <div className="w-56 sm:w-64 h-[2px] bg-white/[0.08] rounded-full overflow-hidden relative">
              <motion.div
                className="h-full bg-gradient-to-r from-purple-600 via-indigo-400 to-sky-400 rounded-full shadow-[0_0_16px_rgba(168,85,247,0.8)]"
                style={{ width: `${progress}%` }}
                transition={{ ease: "linear" }}
              />
              <motion.div
                className="absolute top-0 bottom-0 w-14 bg-gradient-to-r from-transparent via-white to-transparent opacity-75"
                style={{
                  left: `calc(${progress}% - 28px)`,
                }}
              />
            </div>

            {/* Bottom Telemetry Note */}
            <div className="mt-6 text-[10px] font-mono text-zinc-500 flex items-center gap-3">
              <span>PORTFOLIO v2.0</span>
              <span className="text-zinc-700">&bull;</span>
              <span className="text-purple-400">READY</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default Preloader;
