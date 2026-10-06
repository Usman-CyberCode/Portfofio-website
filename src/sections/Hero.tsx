"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import { ArrowRight, Send, Terminal, Sparkles, GraduationCap } from "lucide-react";
import { CursorParticles } from "@/components/ui/cursor-particles";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { GithubIcon, LinkedInIcon } from "@/components/ui/Icons";
import { MorphText } from "@/components/ui/morph-text";
import { BorderBeam } from "@/components/ui/border-beam";
import { personalData } from "@/data";
import { fadeInUp } from "@/animations/motion";

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
    <section className="relative min-h-[92vh] flex items-center justify-center overflow-hidden bg-black px-4 sm:px-6 lg:px-8 pt-28 pb-16">
      {/* 1. Interactive Cursor Particles Layer (preserves existing CursorParticles component exactly) */}
      <CursorParticles
        particleCount={15}
        particleColor="#ef4444"
        backgroundColor="#000000"
        className="absolute inset-0 z-0 pointer-events-none"
      />

      {/* 2. Subtle Ambient Glows Layer */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/4 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[340px] bg-gradient-to-tr from-orange-600/12 via-red-600/8 to-transparent blur-3xl rounded-full"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-12 right-1/4 w-80 h-80 bg-orange-600/6 blur-[120px] rounded-full"
      />

      {/* 3. Hero Content Grid */}
      <div className="relative z-10 max-w-6xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column: Developer Headline & Introduction */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left"
          >
            {/* Status Badge without any city tag */}
            <motion.div
              variants={itemVariants}
              className="mb-5 flex flex-wrap items-center justify-center lg:justify-start gap-2.5"
            >
              <Badge
                variant="status"
                className="py-1 px-3 text-[11px] font-mono gap-2 border-emerald-500/30 bg-emerald-500/10 text-emerald-300 backdrop-blur-sm"
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                </span>
                <span>Seeking Web Development Internship</span>
              </Badge>

              <span className="inline-flex items-center gap-1.5 text-[11px] font-mono text-zinc-400 py-1 px-3 rounded-full bg-white/[0.03] border border-white/[0.08]">
                <GraduationCap className="h-3 w-3 text-orange-400" />
                <span>BSCS &bull; 5th Semester</span>
              </span>
            </motion.div>

            {/* Name Heading */}
            <motion.h1
              variants={itemVariants}
              className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white leading-[1.1] mb-2"
            >
              Hi, I&apos;m <span className="text-white">{personalData.name}</span>
            </motion.h1>

            {/* Morphing Professional Title */}
            <motion.div
              variants={itemVariants}
              className="w-full flex justify-center lg:justify-start my-2 min-h-[52px]"
            >
              <MorphText
                words={[
                  "PROBLEM SOLVER IN C++",
                  "WEB DEVELOPER",
                  "BSCS UNDERGRADUATE",
                  "ALGORITHM ENTHUSIAST",
                ]}
                fontSize="clamp(1.4rem, 3.5vw, 2.4rem)"
                className="items-center lg:items-start"
                textClassName="text-gradient-fire font-bold tracking-tight"
              />
            </motion.div>

            {/* Professional Introduction Paragraph */}
            <motion.p
              variants={itemVariants}
              className="text-xs sm:text-sm md:text-base text-zinc-300 max-w-xl mb-6 leading-relaxed font-normal"
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
                  className="py-0.5 px-2.5 rounded bg-white/[0.03] border border-white/[0.07] text-zinc-300"
                >
                  {tech}
                </span>
              ))}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              variants={itemVariants}
              className="flex flex-wrap items-center justify-center lg:justify-start gap-3 w-full sm:w-auto mb-8"
            >
              <Link href="#projects">
                <Button
                  size="lg"
                  variant="default"
                  className="w-full sm:w-auto text-xs sm:text-sm font-medium shadow-md shadow-orange-500/25 group font-mono"
                >
                  <span>View Projects</span>
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
                </Button>
              </Link>

              <Link href="#contact">
                <Button
                  size="lg"
                  variant="secondary"
                  className="w-full sm:w-auto text-xs sm:text-sm font-medium font-mono"
                >
                  <Send className="h-3.5 w-3.5 text-orange-400" />
                  <span>Contact Me</span>
                </Button>
              </Link>
            </motion.div>

            {/* Social Links Row */}
            <motion.div
              variants={itemVariants}
              className="flex items-center gap-2.5 text-xs text-zinc-400 font-mono"
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
                  <span className="text-xs">GitHub</span>
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
                  <span className="text-xs">LinkedIn</span>
                </a>
              )}
            </motion.div>
          </motion.div>

          {/* Right Column: User Portrait Photo with BorderBeam & Status Details */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            className="lg:col-span-5 flex justify-center w-full"
          >
            <div className="relative rounded-2xl developer-panel p-3.5 sm:p-4 w-full max-w-[340px] sm:max-w-[370px] overflow-hidden group shadow-2xl shadow-black/60">
              {/* BorderBeam Animated Laser Outline */}
              <BorderBeam
                size={180}
                duration={10}
                colorFrom="#ff7a18"
                colorTo="#ef4444"
              />

              {/* Photo Frame Container */}
              <div className="relative w-full aspect-[4/5] rounded-xl overflow-hidden border border-white/10 bg-zinc-950">
                <Image
                  src="/images/profile.png"
                  alt={personalData.name}
                  fill
                  priority
                  className="object-cover object-top filter brightness-[0.98] contrast-[1.03] group-hover:scale-[1.03] transition-transform duration-500"
                />

                {/* Subtle Image Gradient Vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />

                {/* Floating Bottom Card Over Picture */}
                <div className="absolute bottom-3 left-3 right-3 p-3 rounded-lg bg-black/70 backdrop-blur-md border border-white/15">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-xs font-bold text-white tracking-tight">
                        {personalData.name}
                      </h4>
                      <p className="text-[10px] font-mono text-orange-400">
                        Web Developer &bull; C++ Solver
                      </p>
                    </div>
                    <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_#34d399]" />
                  </div>
                </div>
              </div>

              {/* Technical Caption Bar */}
              <div className="pt-3 px-1 flex items-center justify-between text-[11px] font-mono text-zinc-400">
                <span>BSCS Undergrad</span>
                <span className="text-zinc-500">UAF Faisalabad</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
