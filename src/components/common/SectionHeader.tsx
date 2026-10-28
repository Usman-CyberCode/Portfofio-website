"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  badgeText: string;
  title: string;
  titleHighlight?: string;
  serifAccent?: string;
  description?: string;
  align?: "left" | "center" | "split";
  className?: string;
}

export function SectionHeader({
  badgeText,
  title,
  titleHighlight,
  serifAccent,
  description,
  align = "center",
  className,
}: SectionHeaderProps) {
  const shouldReduceMotion = useReducedMotion();
  const isSplit = align === "split";
  const isCenter = align === "center";

  if (isSplit) {
    return (
      <motion.div
        initial={shouldReduceMotion ? {} : { opacity: 0, y: 45, filter: "blur(6px)" }}
        whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        viewport={{ once: true, margin: "-70px" }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        className={cn(
          "mb-12 md:mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-white/[0.08]",
          className
        )}
      >
        <div>
          <span className="inline-flex items-center gap-1.5 py-1 px-3 rounded-full text-[11px] font-mono uppercase tracking-wider text-purple-300 bg-purple-500/10 border border-purple-500/20 backdrop-blur-sm mb-3">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            {badgeText}
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif italic text-[#ebe8e5] font-normal tracking-wide">
            {serifAccent || title}
          </h2>
        </div>

        {description && (
          <p className="text-sm sm:text-base text-zinc-400 max-w-md leading-relaxed md:text-right font-sans">
            {description}
          </p>
        )}
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={shouldReduceMotion ? {} : { opacity: 0, y: 40, filter: "blur(6px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-70px" }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        "mb-12 md:mb-16",
        isCenter ? "text-center mx-auto max-w-2xl" : "text-left max-w-2xl",
        className
      )}
    >
      <div
        className={cn(
          "flex mb-3.5",
          isCenter ? "justify-center" : "justify-start"
        )}
      >
        <span className="inline-flex items-center gap-1.5 py-1 px-3.5 rounded-full text-[11px] font-mono uppercase tracking-wider text-purple-300 bg-purple-500/10 border border-purple-500/20 backdrop-blur-sm shadow-[0_0_12px_rgba(168,85,247,0.15)]">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
          {badgeText}
        </span>
      </div>

      <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[42px] font-bold tracking-tight text-[#ebe8e5] leading-tight">
        {title}{" "}
        {serifAccent && (
          <span className="font-serif italic font-normal text-purple-300 px-1">
            {serifAccent}
          </span>
        )}{" "}
        {titleHighlight && (
          <span className="text-white font-extrabold">{titleHighlight}</span>
        )}
      </h2>

      {description && (
        <p className="mt-3.5 text-xs sm:text-sm text-zinc-400 leading-relaxed max-w-xl mx-auto">
          {description}
        </p>
      )}
    </motion.div>
  );
}

export default SectionHeader;
