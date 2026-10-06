"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { RubiksCube3D } from "@/components/ui/rubiks-cube";
import { fadeInUp } from "@/animations/motion";

export function RubiksSection() {
  return (
    <section
      id="problem-solving"
      className="py-24 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto relative overflow-hidden"
    >
      {/* Subtle Atmospheric Backdrop Glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-gradient-to-tr from-orange-600/10 via-amber-600/5 to-transparent blur-3xl"
      />

      <motion.div
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
        className="relative z-10 flex flex-col items-center"
      >
        {/* Top Header Bar matching screenshot: MORE ABOUT ME ↗ and signature doodle */}
        <div className="w-full flex items-center justify-between pb-8 border-b border-white/[0.06] mb-8">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono uppercase tracking-widest text-zinc-400">
              Interactive Logic System
            </span>
          </div>

          <div className="flex items-center gap-4">
            <Link
              href="#about"
              className="text-xs font-mono font-medium uppercase tracking-wider text-zinc-300 hover:text-white flex items-center gap-1.5 transition-colors group"
            >
              <span>More About Me</span>
              <ArrowUpRight className="h-3.5 w-3.5 text-orange-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>

            {/* Signature Doodle SVG Icon */}
            <svg
              className="h-6 w-12 text-zinc-400 opacity-70"
              viewBox="0 0 100 50"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M10 30 Q25 5 45 25 T80 15 Q95 25 85 40 Q75 48 65 35 Q55 20 70 25" />
            </svg>
          </div>
        </div>

        {/* 3D Rubik's Cube Center Stage */}
        <div className="w-full flex flex-col items-center justify-center my-4">
          <RubiksCube3D autoStartSolve={false} />
        </div>

        {/* Bottom Tagline matching screenshot: COMPLEXITY → CLARITY */}
        <div className="mt-12 text-center pt-6 border-t border-white/[0.06] w-full">
          <span className="text-xs sm:text-sm font-mono uppercase tracking-[0.35em] text-zinc-400 font-medium">
            COMPLEXITY &nbsp;&rarr;&nbsp; CLARITY
          </span>
        </div>
      </motion.div>
    </section>
  );
}
