"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import { ArrowRight, Send, GraduationCap } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { GithubIcon, LinkedInIcon } from "@/components/ui/Icons";
import { WovenCanvas } from "@/components/ui/woven-light-hero";
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
    <section className="relative min-h-[92vh] flex items-center justify-center overflow-hidden bg-[#08080a] px-4 sm:px-6 lg:px-8 pt-32 pb-20">
      {/* 1. Three.js Woven Light Particles Canvas (Reacts dynamically to cursor movement with 3D physics) */}
      <WovenCanvas className="absolute inset-0 z-0 pointer-events-none opacity-55" />

      {/* 2. Atmospheric Depth Glow (Behind content) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[340px] bg-gradient-to-tr from-orange-600/10 via-amber-600/6 to-transparent blur-3xl rounded-full"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-12 right-1/4 w-80 h-80 bg-red-600/5 blur-[120px] rounded-full"
      />

      {/* 3. Hero Content Grid with HD Photo on Left & Content on Right */}
      <div className="relative z-10 max-w-6xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left Column: HD Portrait Photo with Pure Borderless CSS */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            className="lg:col-span-5 flex justify-center lg:justify-start w-full order-1"
          >
            <div className="relative w-full max-w-[320px] sm:max-w-[370px] group">
              {/* Soft Ambient Warm Glow behind the photo */}
              <div
                aria-hidden="true"
                className="absolute -inset-4 rounded-3xl bg-gradient-to-tr from-orange-500/20 via-amber-500/10 to-red-500/10 blur-2xl opacity-75 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
              />

              {/* Completely Borderless HD Image with smooth rounded corners and shadow */}
              <div className="relative w-full aspect-[3/4] sm:aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl shadow-black/90">
                <Image
                  src="/images/profile.jpg"
                  alt={personalData.name}
                  fill
                  priority
                  quality={100}
                  unoptimized
                  className="object-cover object-top filter contrast-[1.03] brightness-[1.0] group-hover:scale-[1.02] transition-transform duration-500"
                />

                {/* Subtle Cinematic Bottom Fade */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#08080a]/75 via-transparent to-transparent pointer-events-none" />
              </div>
            </div>
          </motion.div>

          {/* Right Column: Developer Headline, Bio & Action Buttons */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left order-2"
          >
            {/* Status Badge */}
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
              className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white leading-[1.08] mb-3"
            >
              Hi, I&apos;m {personalData.name}
            </motion.h1>

            {/* Professional Title */}
            <motion.div variants={itemVariants} className="mb-4">
              <span className="text-xl sm:text-2xl md:text-3xl font-semibold text-zinc-200 tracking-tight block">
                Web Developer <span className="text-zinc-500 mx-1.5">&bull;</span> Problem Solver in C++
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

        </div>
      </div>
    </section>
  );
}
