"use client";

import React from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Magnetic } from "@/components/ui/magnetic";

interface SubpageHeaderProps {
  badge: string;
  title: string;
  serifAccent?: string;
  description: string;
  currentPath: string;
}

const subpages = [
  { name: "All Work", href: "/work" },
  { name: "Services", href: "/services" },
  { name: "About Me", href: "/about" },
  { name: "Skills Matrix", href: "/skills" },
  { name: "Education", href: "/education" },
];

export function SubpageHeader({
  badge,
  title,
  serifAccent,
  description,
  currentPath,
}: SubpageHeaderProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="relative pt-24 sm:pt-28 pb-12 sm:pb-16 border-b border-white/[0.08] mb-12 sm:mb-16 overflow-hidden">
      {/* Background ambient lighting */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[750px] h-[350px] bg-[radial-gradient(ellipse_at_top,rgba(168,85,247,0.18)_0%,rgba(59,130,246,0.08)_50%,transparent_75%)] blur-3xl rounded-full"
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Navigation / Breadcrumb Row */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <Magnetic strength={0.2}>
            <Link href="/" className="inline-block">
              <Button
                variant="secondary"
                size="sm"
                className="gap-2 text-xs font-mono border-white/10 bg-white/[0.03] text-zinc-300 hover:text-white hover:border-purple-500/40 hover:bg-purple-500/10 rounded-full px-4 py-2"
              >
                <ArrowLeft className="h-3.5 w-3.5 text-purple-400" />
                <span>Back to Home Portfolio</span>
              </Button>
            </Link>
          </Magnetic>

          {/* Subpage Pill Switcher */}
          <div className="hidden md:flex items-center gap-1.5 p-1 rounded-full bg-white/[0.03] border border-white/[0.08] backdrop-blur-md">
            {subpages.map((sp) => {
              const isCurrent = sp.href === currentPath;
              return (
                <Link
                  key={sp.href}
                  href={sp.href}
                  className={`text-xs font-mono px-3.5 py-1.5 rounded-full transition-all duration-200 ${
                    isCurrent
                      ? "bg-purple-600/30 text-white border border-purple-400/50 shadow-[0_0_12px_rgba(168,85,247,0.25)] font-medium"
                      : "text-zinc-400 hover:text-white hover:bg-white/[0.04]"
                  }`}
                >
                  {sp.name}
                </Link>
              );
            })}
          </div>
        </div>

        {/* Badge & Title */}
        <motion.div
          initial={shouldReduceMotion ? {} : { opacity: 0, y: 24, filter: "blur(6px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-3xl"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-purple-500/10 border border-purple-500/25 text-purple-300 text-xs font-mono uppercase tracking-wider mb-5 backdrop-blur-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-purple-400 animate-pulse" />
            <span>{badge}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-[#ebe8e5] leading-[1.1] mb-5">
            {title}{" "}
            {serifAccent && (
              <span className="font-serif italic font-normal text-purple-300 block sm:inline">
                {serifAccent}
              </span>
            )}
          </h1>

          <p className="text-sm sm:text-base text-zinc-300 leading-relaxed font-sans max-w-2xl">
            {description}
          </p>
        </motion.div>
      </div>
    </div>
  );
}

export default SubpageHeader;
