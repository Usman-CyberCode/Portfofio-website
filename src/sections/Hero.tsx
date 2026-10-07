"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import { ArrowRight, Send, GraduationCap, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { GithubIcon, LinkedInIcon } from "@/components/ui/Icons";
import { WovenCanvas } from "@/components/ui/woven-light-hero";
import { CursorParticles } from "@/components/ui/cursor-particles";
import { TechnologyStack3D } from "@/components/portfolio/technology-stack-3d";
import { personalData } from "@/data";
import { fadeInUp } from "@/animations/motion";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.08,
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

  const heroTechStack = ["C++", "JavaScript", "TypeScript", "React", "Redux"];

  return (
    <section className="relative min-h-[94vh] flex items-center justify-center overflow-hidden bg-[#08080a] px-4 sm:px-6 lg:px-8 pt-28 pb-16">
      {/* 1. Background Cursor Particles (Interactive ambient physics) */}
      <CursorParticles
        particleCount={18}
        particleColor="#f97316"
        backgroundColor="transparent"
        className="absolute inset-0 z-0 pointer-events-none opacity-40"
      />

      {/* 2. Motion Particles Canvas positioned specifically on the RIGHT side as requested */}
      <div className="absolute top-0 right-0 bottom-0 w-full lg:w-[60vw] max-w-[850px] z-0 pointer-events-none overflow-hidden opacity-55">
        <WovenCanvas className="w-full h-full pointer-events-none" />
      </div>

      {/* 3. Atmospheric Depth Glow (Behind content) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[340px] bg-gradient-to-tr from-orange-600/10 via-amber-600/6 to-transparent blur-3xl rounded-full"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-12 right-1/4 w-80 h-80 bg-red-600/5 blur-[120px] rounded-full"
      />

      {/* 4. Large Hollow Text Typography Accent in Background */}
      <div
        aria-hidden="true"
        className="absolute top-16 left-6 lg:left-14 select-none pointer-events-none z-[1] opacity-15 overflow-hidden"
      >
        <span className="text-hollow-lg text-7xl sm:text-8xl md:text-9xl lg:text-[140px] font-black tracking-tighter leading-none block">
          DEVELOPER
        </span>
      </div>

      {/* 5. Main Content Grid: Left Column Text & Profile, Right Column TechnologyStack3D */}
      <div className="relative z-10 max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          
          {/* Left Column: Developer Headline, Bio & Action Buttons */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="lg:col-span-6 flex flex-col items-center lg:items-start text-center lg:text-left order-1"
          >
            {/* Status Badge + Profile Avatar Capsule */}
            <motion.div
              variants={itemVariants}
              className="mb-4 flex flex-wrap items-center justify-center lg:justify-start gap-2.5"
            >
              <div className="flex items-center gap-2 p-1 pr-3 rounded-full bg-white/[0.04] border border-white/[0.08] backdrop-blur-sm">
                <div className="relative w-7 h-7 rounded-full overflow-hidden border border-orange-500/40">
                  <Image
                    src="/images/profile.jpg"
                    alt={personalData.name}
                    fill
                    sizes="28px"
                    className="object-cover object-top"
                  />
                </div>
                <span className="text-[11px] font-mono text-zinc-300 font-medium">
                  Muhammad Usman Tahir
                </span>
              </div>

              <Badge
                variant="status"
                className="py-1 px-3 text-[11px] font-mono gap-2 border-emerald-500/30 bg-emerald-500/10 text-emerald-300 backdrop-blur-sm"
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                </span>
                <span>Seeking Internship</span>
              </Badge>

              <span className="inline-flex items-center gap-1.5 text-[11px] font-mono text-zinc-400 py-1 px-3 rounded-full bg-white/[0.03] border border-white/[0.08]">
                <GraduationCap className="h-3 w-3 text-orange-400" />
                <span>UAF &bull; 5th Sem</span>
              </span>
            </motion.div>

            {/* Name Heading with Hollow Text Accent */}
            <motion.h1
              variants={itemVariants}
              className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white leading-[1.08] mb-3"
            >
              Hi, I&apos;m{" "}
              <span className="text-white">Muhammad</span>{" "}
              <span className="text-gradient-fire">Usman</span>
            </motion.h1>

            {/* Professional Title with Hollow Highlight */}
            <motion.div variants={itemVariants} className="mb-4 flex flex-wrap items-center gap-2 justify-center lg:justify-start">
              <span className="text-xl sm:text-2xl md:text-3xl font-semibold text-zinc-200 tracking-tight">
                Web Developer
              </span>
              <span className="text-zinc-500 mx-0.5">&bull;</span>
              <span className="text-xl sm:text-2xl md:text-3xl font-semibold text-hollow-accent">
                Problem Solver in C++
              </span>
            </motion.div>

            {/* Professional Introduction Paragraph */}
            <motion.p
              variants={itemVariants}
              className="text-sm sm:text-base text-zinc-300 max-w-xl mb-6 leading-relaxed font-normal"
            >
              {personalData.shortBio}
            </motion.p>

            {/* Core Tech Stack Mini Row */}
            <motion.div
              variants={itemVariants}
              className="flex flex-wrap items-center justify-center lg:justify-start gap-1.5 mb-7 text-xs font-mono text-zinc-400"
            >
              <span className="text-zinc-500 text-[11px] uppercase tracking-wider mr-1">
                Core Stack:
              </span>
              {heroTechStack.map((tech) => (
                <span
                  key={tech}
                  className="py-0.5 px-2.5 rounded bg-white/[0.03] border border-white/[0.07] text-zinc-300 hover:border-orange-500/40 transition-colors"
                >
                  {tech}
                </span>
              ))}
            </motion.div>

            {/* CTA Buttons (High z-index to guarantee clickability) */}
            <motion.div
              variants={itemVariants}
              className="relative z-20 flex flex-wrap items-center justify-center lg:justify-start gap-3 w-full sm:w-auto mb-8"
            >
              <Link href="#projects" className="w-full sm:w-auto">
                <Button
                  size="lg"
                  variant="default"
                  className="w-full sm:w-auto text-xs sm:text-sm font-medium shadow-lg shadow-orange-500/25 group font-mono cursor-pointer"
                >
                  <span>View Projects</span>
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
                </Button>
              </Link>

              <Link href="#contact" className="w-full sm:w-auto">
                <Button
                  size="lg"
                  variant="secondary"
                  className="w-full sm:w-auto text-xs sm:text-sm font-medium font-mono cursor-pointer"
                >
                  <Send className="h-3.5 w-3.5 text-orange-400" />
                  <span>Contact Me</span>
                </Button>
              </Link>
            </motion.div>

            {/* Social Links Row */}
            <motion.div
              variants={itemVariants}
              className="relative z-20 flex items-center gap-2.5 text-xs text-zinc-400 font-mono"
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
                  className="p-2 rounded-lg border border-white/10 bg-white/[0.03] text-zinc-300 hover:text-white hover:border-orange-500/40 hover:bg-orange-500/10 transition-all duration-150 flex items-center gap-1.5 cursor-pointer"
                >
                  <GithubIcon className="h-4 w-4" />
                  <span className="text-xs">GitHub</span>
                </a>
              )}
              {linkedinLink && (
                <a
                  href={linkedinLink.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={linkedinLink.label}
                  className="p-2 rounded-lg border border-white/10 bg-white/[0.03] text-zinc-300 hover:text-white hover:border-orange-500/40 hover:bg-orange-500/10 transition-all duration-150 flex items-center gap-1.5 cursor-pointer"
                >
                  <LinkedInIcon className="h-4 w-4 text-[#0a66c2]" />
                  <span className="text-xs">LinkedIn</span>
                </a>
              )}
            </motion.div>
          </motion.div>

          {/* Right Column: 3D Technology Stack Platform (TechnologyStack3D) */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            className="lg:col-span-6 flex justify-center w-full order-2 relative z-10"
          >
            <div className="w-full max-w-[560px]">
              <TechnologyStack3D />
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}

export default Hero;
