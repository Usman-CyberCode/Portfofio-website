"use client";

import React from "react";
import { motion, useReducedMotion, type Variants } from "framer-motion";

interface ScrollRevealProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  yOffset?: number;
  className?: string;
  stagger?: boolean;
}

export function ScrollReveal({
  children,
  delay = 0,
  duration = 0.7,
  yOffset = 30,
  className = "",
  stagger = false,
}: ScrollRevealProps) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  const variants: Variants = {
    hidden: {
      opacity: 0,
      y: yOffset,
      scale: 0.98,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration,
        delay,
        ease: [0.215, 0.61, 0.355, 1],
        ...(stagger
          ? {
              staggerChildren: 0.08,
              delayChildren: delay,
            }
          : {}),
      },
    },
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      variants={variants}
      className={className}
    >
      {children}
    </motion.div>
  );
}
