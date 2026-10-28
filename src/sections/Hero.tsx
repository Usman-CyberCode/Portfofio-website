"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useMotionValue, useSpring, useTransform, type Variants } from "framer-motion";
import { ArrowRight, Send, GraduationCap, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Magnetic } from "@/components/ui/magnetic";
import { GithubIcon, LinkedInIcon } from "@/components/ui/Icons";
import { personalData } from "@/data";
import { expoOut, framerEase } from "@/animations/motion";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.15,
    },
  },
};

const wordReveal: Variants = {
  hidden: {
    y: "115%",
    opacity: 0,
    rotateX: 20,
  },
  visible: {
    y: "0%",
    opacity: 1,
    rotateX: 0,
    transition: {
      duration: 0.85,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 22 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.65,
      ease: [0.215, 0.61, 0.355, 1],
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

  const heroTechStack = ["C++", "JavaScript", "TypeScript", "Redux", "React", "HTML/CSS"];

  // Interactive 3D tilt for hero portrait
  const photoX = useMotionValue(0);
  const photoY = useMotionValue(0);
  const tiltConfig = { damping: 24, stiffness: 220, mass: 0.35 };
  const rotateX = useSpring(useTransform(photoY, [-0.5, 0.5], [10, -10]), tiltConfig);
  const rotateY = useSpring(useTransform(photoX, [-0.5, 0.5], [-10, 10]), tiltConfig);

  const handlePhotoMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    photoX.set((e.clientX - rect.left) / rect.width - 0.5);
    photoY.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handlePhotoMouseLeave = () => {
    photoX.set(0);
    photoY.set(0);
  };

  return (
    <section className="relative min-h-[92vh] flex flex-col justify-center overflow-hidden bg-transparent px-4 sm:px-6 lg:px-8 pt-32 pb-16">
      {/* 1. Atmospheric Deep Navy & Sapphire Depth Glows */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-[radial-gradient(ellipse,rgba(37,99,235,0.14)_0%,rgba(56,189,248,0.05)_40%,transparent_70%)] blur-3xl rounded-full"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-12 right-1/4 w-[450px] h-[350px] bg-[radial-gradient(circle,rgba(59,130,246,0.09)_0%,transparent_65%)] blur-[100px] rounded-full"
      />

      {/* 2. Hollow Text Watermark in Hero Background */}
      <div
        aria-hidden="true"
        className="absolute top-16 left-6 lg:left-14 select-none pointer-events-none z-[1] opacity-10 overflow-hidden"
      >
        <div className="text-hollow-lg text-7xl sm:text-8xl md:text-9xl lg:text-[145px] font-black tracking-tighter leading-none block">
          DEVELOPER
        </div>
      </div>

      {/* 3. Main Hero Content Grid */}
      <div className="pt-6 relative z-10 max-w-6xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">

          {/* Left Column: HD Portrait Photo with 3D Tilt */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.215, 0.61, 0.355, 1] }}
            className="lg:col-span-5 flex justify-center lg:justify-start w-full order-1"
          >
            <motion.div
              onMouseMove={handlePhotoMouseMove}
              onMouseLeave={handlePhotoMouseLeave}
              style={{
                rotateX,
                rotateY,
                perspective: 900,
                transformStyle: "preserve-3d",
              }}
              className="relative w-full max-w-[320px] sm:max-w-[370px] group cursor-pointer"
            >
              {/* Soft Ambient Deep Sapphire Aura behind photo */}
              <div
                aria-hidden="true"
                className="absolute -inset-4 rounded-3xl bg-gradient-to-tr from-blue-600/25 via-sky-500/15 to-indigo-600/15 blur-2xl opacity-70 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
              />

              {/* Portrait Container with Deep Navy Border & Subtle Reflection */}
              <div className="relative w-full aspect-[3/4] sm:aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl shadow-black/90 border border-white/10 group-hover:border-blue-500/30 transition-colors duration-500">
                <Image
                  src="/images/profile.jpg"
                  alt={personalData.name}
                  fill
                  priority
                  quality={100}
                  unoptimized
                  className="object-cover object-top filter contrast-[1.04] brightness-[0.98] group-hover:scale-[1.04] transition-transform duration-700 ease-out"
                />

                {/* Subtle Cinematic Bottom Fade */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#030509]/85 via-transparent to-transparent pointer-events-none" />

                {/* Corner Specular Rim Highlight */}
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.03] to-white/[0.08] pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column: Staggered Hero Text Reveals */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left order-2"
          >
            {/* 1. Status Badges */}
            <motion.div
              variants={itemVariants}
              className="mb-4 flex flex-wrap items-center justify-center lg:justify-start gap-2.5"
            >
              <Badge
                variant="status"
                className="py-1 px-3.5 text-[11px] font-mono gap-2 border-emerald-500/30 bg-emerald-500/10 text-emerald-300 backdrop-blur-sm"
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                </span>
                <span>Seeking Web Development Internship</span>
              </Badge>

              <span className="inline-flex items-center gap-1.5 text-[11px] font-mono text-slate-300 py-1 px-3 rounded-full bg-white/[0.03] border border-white/[0.08]">
                <GraduationCap className="h-3 w-3 text-blue-400" />
                <span>BSCS &bull; 5th Semester</span>
              </span>
            </motion.div>

            {/* 2. Staggered Hero Masked Text Reveal (Headline) */}
            <div className="overflow-hidden mb-3">
              <motion.div variants={wordReveal} className="flex flex-wrap items-baseline gap-x-3 gap-y-1 justify-center lg:justify-start">
                <span className="text-3xl sm:text-4xl md:text-5xl font-light text-slate-400 font-sans">
                  Hi, I&apos;m
                </span>
                <span className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white leading-tight">
                  Muhammad Usman Tahir
                </span>
              </motion.div>
            </div>

            {/* 3. Professional Subtitle with Editorial Serif Accent */}
            <motion.div
              variants={itemVariants}
              className="mb-5 flex flex-wrap items-center gap-2 justify-center lg:justify-start"
            >
              <span className="text-xl sm:text-2xl md:text-3xl font-semibold text-slate-100 tracking-tight">
                Web Developer
              </span>
              <span className="text-blue-400/60 mx-1">&bull;</span>
              <span className="text-xl sm:text-2xl md:text-3xl font-serif italic text-blue-300 tracking-normal font-normal">
                Problem Solver in C++
              </span>
            </motion.div>

            {/* 4. Professional Introduction Paragraph */}
            <motion.p
              variants={itemVariants}
              className="text-sm sm:text-base text-slate-300 max-w-xl mb-6 leading-relaxed font-normal"
            >
              {personalData.shortBio}
            </motion.p>

            {/* 5. Core Tech Stack Mini Row */}
            <motion.div
              variants={itemVariants}
              className="flex flex-wrap items-center justify-center lg:justify-start gap-1.5 mb-8 text-xs font-mono text-slate-400"
            >
              <span className="text-slate-500 text-[11px] uppercase tracking-wider mr-1">
                Core Stack:
              </span>
              {heroTechStack.map((tech) => (
                <span
                  key={tech}
                  className="py-1 px-2.5 rounded-lg bg-white/[0.03] border border-white/[0.08] text-slate-300 hover:border-blue-500/30 hover:text-white transition-colors"
                >
                  {tech}
                </span>
              ))}
            </motion.div>

            {/* 6. Magnetic CTA Buttons */}
            <motion.div
              variants={itemVariants}
              className="relative z-20 flex flex-wrap items-center justify-center lg:justify-start gap-3.5 w-full sm:w-auto mb-8"
            >
              <Magnetic strength={0.22}>
                <Link href="#projects">
                  <Button
                    size="lg"
                    variant="default"
                    className="w-full sm:w-auto text-xs sm:text-sm font-medium group font-mono cursor-pointer"
                  >
                    <span>View Projects</span>
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" />
                  </Button>
                </Link>
              </Magnetic>

              <Magnetic strength={0.22}>
                <Link href="#contact">
                  <Button
                    size="lg"
                    variant="secondary"
                    className="w-full sm:w-auto text-xs sm:text-sm font-medium font-mono cursor-pointer"
                  >
                    <Send className="h-3.5 w-3.5 text-blue-400" />
                    <span>Contact Me</span>
                  </Button>
                </Link>
              </Magnetic>
            </motion.div>

            {/* 7. Magnetic Social Profiles Row */}
            <motion.div
              variants={itemVariants}
              className="relative z-20 flex items-center gap-3 text-xs text-slate-400 font-mono"
            >
              <span className="text-slate-500 uppercase tracking-widest text-[11px] mr-1">
                Profiles:
              </span>
              {githubLink && (
                <Magnetic strength={0.35}>
                  <a
                    href={githubLink.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={githubLink.label}
                    className="py-1.5 px-3 rounded-xl border border-white/10 bg-white/[0.03] text-slate-300 hover:text-white hover:border-blue-500/40 hover:bg-blue-500/10 transition-all duration-200 flex items-center gap-1.5 cursor-pointer"
                  >
                    <GithubIcon className="h-4 w-4" />
                    <span className="text-xs">GitHub</span>
                  </a>
                </Magnetic>
              )}
              {linkedinLink && (
                <Magnetic strength={0.35}>
                  <a
                    href={linkedinLink.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={linkedinLink.label}
                    className="py-1.5 px-3 rounded-xl border border-white/10 bg-white/[0.03] text-slate-300 hover:text-white hover:border-blue-500/40 hover:bg-blue-500/10 transition-all duration-200 flex items-center gap-1.5 cursor-pointer"
                  >
                    <LinkedInIcon className="h-4 w-4 text-[#38bdf8]" />
                    <span className="text-xs">LinkedIn</span>
                  </a>
                </Magnetic>
              )}
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}

export default Hero;
