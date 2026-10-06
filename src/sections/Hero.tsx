"use client";

import React from "react";
import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import { ArrowRight, Send, MapPin, Terminal, Code2 } from "lucide-react";
import { CursorParticles } from "@/components/ui/cursor-particles";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { GithubIcon, LinkedInIcon } from "@/components/ui/Icons";
import { personalData } from "@/data";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

export function Hero() {
  const githubLink = personalData.socialLinks.find(
    (s) => s.platform.toLowerCase() === "github"
  );
  const linkedinLink = personalData.socialLinks.find(
    (s) => s.platform.toLowerCase() === "linkedin"
  );

  const heroTechStack = ["C++", "JavaScript", "TypeScript", "Redux", "HTML/CSS"];

  return (
    <section className="relative min-h-[92vh] flex items-center justify-center overflow-hidden bg-black px-4 sm:px-6 lg:px-8 pt-32 pb-20">
      {/* 1. Interactive Cursor Particles Layer (preserves existing CursorParticles component exactly) */}
      <CursorParticles
        particleCount={15}
        particleColor="#ef4444"
        backgroundColor="#000000"
        className="absolute inset-0 z-0 pointer-events-none"
      />

      {/* 2. Subtle Ambient Glows Layer (restrained and cinematic) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[340px] bg-gradient-to-tr from-orange-600/12 via-red-600/10 to-transparent blur-3xl rounded-full"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-10 left-1/4 w-72 h-72 bg-orange-600/5 blur-[120px] rounded-full"
      />

      {/* 3. Hero Content Layer */}
      <div className="relative z-10 max-w-4xl mx-auto text-center flex flex-col items-center">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center"
        >
          {/* Status Badge & Location Indicator */}
          <motion.div
            variants={itemVariants}
            className="mb-6 flex flex-wrap items-center justify-center gap-2.5"
          >
            <Badge
              variant="status"
              className="py-1 px-3 text-[11px] font-mono gap-2 border-emerald-500/30 bg-emerald-500/10 text-emerald-300 backdrop-blur-sm"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <span>Available for Web Development Internship</span>
            </Badge>

            <span className="inline-flex items-center gap-1.5 text-[11px] font-mono text-zinc-400 py-1 px-3 rounded-full bg-white/[0.03] border border-white/[0.08]">
              <MapPin className="h-3 w-3 text-orange-400" />
              <span>Safdarabad, Punjab, PK</span>
            </span>
          </motion.div>

          {/* Heading */}
          <motion.h1
            variants={itemVariants}
            className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white leading-[1.08] mb-4"
          >
            Hi, I&apos;m{" "}
            <span className="text-white">{personalData.name}</span>
            <span className="block mt-2.5 text-2xl sm:text-4xl md:text-5xl font-bold text-gradient-fire">
              {personalData.title}
            </span>
          </motion.h1>

          {/* Professional Introduction */}
          <motion.p
            variants={itemVariants}
            className="text-sm sm:text-base md:text-lg text-zinc-300 max-w-2xl mx-auto mb-7 leading-relaxed font-normal"
          >
            {personalData.shortBio}
          </motion.p>

          {/* Core Tech Stack Mini Row */}
          <motion.div
            variants={itemVariants}
            className="flex flex-wrap items-center justify-center gap-2 mb-9 text-xs font-mono text-zinc-400"
          >
            <span className="text-zinc-500 text-[11px] uppercase tracking-wider mr-1">
              Core Stack:
            </span>
            {heroTechStack.map((tech) => (
              <span
                key={tech}
                className="py-0.5 px-2.5 rounded bg-white/[0.03] border border-white/[0.07] text-zinc-300"
              >
                {tech}
              </span>
            ))}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-wrap items-center justify-center gap-3.5 w-full sm:w-auto mb-9"
          >
            <Link href="#projects">
              <Button
                size="lg"
                variant="default"
                className="w-full sm:w-auto text-xs sm:text-sm font-medium shadow-md shadow-orange-500/25 group"
              >
                <span>View Projects</span>
                <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
              </Button>
            </Link>

            <Link href="#contact">
              <Button
                size="lg"
                variant="secondary"
                className="w-full sm:w-auto text-xs sm:text-sm font-medium"
              >
                <Send className="h-3.5 w-3.5 text-orange-400" />
                <span>Contact Me</span>
              </Button>
            </Link>
          </motion.div>

          {/* Social Links Row */}
          <motion.div
            variants={itemVariants}
            className="flex items-center gap-2.5 pt-1 text-xs text-zinc-400 font-mono"
          >
            <span className="text-zinc-500 uppercase tracking-widest text-[11px] mr-1">
              Profiles:
            </span>
            {githubLink && (
              <a
                href={githubLink.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={githubLink.label}
                className="p-2 rounded-lg border border-white/10 bg-white/[0.03] text-zinc-300 hover:text-white hover:border-orange-500/40 hover:bg-orange-500/10 transition-all duration-150 flex items-center gap-1.5"
              >
                <GithubIcon className="h-4 w-4" />
                <span className="hidden sm:inline text-xs">GitHub</span>
              </a>
            )}
            {linkedinLink && (
              <a
                href={linkedinLink.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={linkedinLink.label}
                className="p-2 rounded-lg border border-white/10 bg-white/[0.03] text-zinc-300 hover:text-white hover:border-orange-500/40 hover:bg-orange-500/10 transition-all duration-150 flex items-center gap-1.5"
              >
                <LinkedInIcon className="h-4 w-4 text-[#0a66c2]" />
                <span className="hidden sm:inline text-xs">LinkedIn</span>
              </a>
            )}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
