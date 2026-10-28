"use client";

import React from "react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/Badge";
import { fadeInUp } from "@/animations/motion";
import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  badgeText: string;
  title: string;
  titleHighlight?: string;
  serifAccent?: string;
  description?: string;
  align?: "left" | "center";
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
  const isCenter = align === "center";

  return (
    <motion.div
      variants={fadeInUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
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
        <span className="inline-flex items-center gap-1.5 py-1 px-3 rounded-full text-[11px] font-mono uppercase tracking-wider text-blue-300 bg-blue-500/10 border border-blue-500/20 backdrop-blur-sm shadow-[0_0_12px_rgba(59,130,246,0.12)]">
          <span className="h-1.5 w-1.5 rounded-full bg-blue-400" />
          {badgeText}
        </span>
      </div>

      <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[42px] font-bold tracking-tight text-white leading-tight">
        {title}{" "}
        {serifAccent && (
          <span className="font-serif italic font-normal text-blue-300 px-1">
            {serifAccent}
          </span>
        )}{" "}
        {titleHighlight && (
          <span className="text-gradient-navy">{titleHighlight}</span>
        )}
      </h2>

      {description && (
        <p className="mt-3.5 text-xs sm:text-sm text-slate-400 leading-relaxed max-w-xl mx-auto">
          {description}
        </p>
      )}
    </motion.div>
  );
}
