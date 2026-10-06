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
  description?: string;
  align?: "left" | "center";
  className?: string;
}

export function SectionHeader({
  badgeText,
  title,
  titleHighlight,
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
        <Badge variant="default" className="text-[11px] py-1 px-3">
          {badgeText}
        </Badge>
      </div>

      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-white leading-tight">
        {title}{" "}
        {titleHighlight && (
          <span className="text-gradient-fire">{titleHighlight}</span>
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
