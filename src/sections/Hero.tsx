"use client";

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import { ArrowRight, Send } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Magnetic } from "@/components/ui/magnetic";
import { GithubIcon, LinkedInIcon } from "@/components/ui/Icons";
import { personalData } from "@/data";

export function Hero() {
  const shouldReduceMotion = useReducedMotion();
  const heroRef = useRef<HTMLDivElement>(null);

  // Floating animation starts approximately 2 seconds after the images finish entering (~3.5s total)
  const [isFloatingActive, setIsFloatingActive] = useState(false);

  useEffect(() => {
    // Entrance ends around 1.6s -> floating begins after ~2s delay (at ~3.5s)
    const timer = setTimeout(() => {
      setIsFloatingActive(true);
    }, 3500);
    return () => clearTimeout(timer);
  }, []);

  // Mouse-follow parallax values for desktop
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 28, stiffness: 180, mass: 0.35 };
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);

  // Parallax transforms for desktop floating elements (subtle, restrained, keeps elements near their anchors)
  const portraitParallaxX = useTransform(smoothMouseX, [-0.5, 0.5], [-10, 10]);
  const portraitParallaxY = useTransform(smoothMouseY, [-0.5, 0.5], [-8, 8]);

  const cardParallaxX = useTransform(smoothMouseX, [-0.5, 0.5], [10, -10]);
  const cardParallaxY = useTransform(smoothMouseY, [-0.5, 0.5], [9, -9]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (
      shouldReduceMotion ||
      !heroRef.current ||
      "ontouchstart" in window ||
      navigator.maxTouchPoints > 0
    ) {
      return;
    }
    const rect = heroRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const githubLink = personalData.socialLinks.find(
    (s) => s.platform.toLowerCase() === "github"
  );
  const linkedinLink = personalData.socialLinks.find(
    (s) => s.platform.toLowerCase() === "linkedin"
  );

  return (
    <section
      ref={heroRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative min-h-[92vh] sm:min-h-[96vh] flex flex-col justify-between overflow-x-clip bg-[#050508] px-3 sm:px-6 lg:px-8 pt-20 sm:pt-24 pb-8 sm:pb-12 select-none w-full max-w-full"
    >
      {/* 1. Subtle Dark Purple & Blue Radial Gradients */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[320px] xs:w-[450px] sm:w-[650px] lg:w-[850px] h-[320px] xs:h-[450px] sm:h-[650px] bg-[radial-gradient(ellipse_at_center,rgba(88,28,135,0.22)_0%,rgba(45,12,72,0.1)_45%,transparent_75%)] blur-3xl rounded-full"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/4 right-1/4 w-[240px] sm:w-[450px] h-[200px] sm:h-[350px] bg-[radial-gradient(circle,rgba(59,130,246,0.06)_0%,transparent_65%)] blur-[90px] rounded-full"
      />

      {/* 2. Top Centered Availability Badge (Enters first with text) */}
      <div className="relative z-20 flex justify-center pt-1 sm:pt-2">
        <motion.div
          initial={{ opacity: 0, y: -16, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.65, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="inline-flex items-center gap-2 sm:gap-2.5 px-3 sm:px-4 py-1 sm:py-1.5 rounded-full border border-white/10 bg-white/[0.04] backdrop-blur-md shadow-[0_4px_24px_rgba(0,0,0,0.5)]"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
          </span>
          <span className="text-[11px] sm:text-xs font-mono text-zinc-300">
            Available for work
          </span>
          <span className="text-zinc-600 text-[10px]">&bull;</span>
          <span className="text-[10px] sm:text-[11px] font-mono text-zinc-400">
            Seeking Internship
          </span>
        </motion.div>
      </div>

      {/* 3. Main Hero Typography & Flanking Composition */}
      <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col items-center justify-center my-auto py-4 sm:py-8">

        {/* --- DESKTOP FLANKING IMAGES (Visible md and up, carefully positioned so they never overlap typography) --- */}
        
        {/* Flank Left: Circular Profile Portrait */}
        <div className="hidden md:block absolute md:left-[4%] lg:left-[8%] xl:left-[12%] md:top-[1%] lg:top-[3%] z-30 pointer-events-auto">
          <motion.div
            style={
              shouldReduceMotion
                ? {}
                : {
                    x: portraitParallaxX,
                    y: portraitParallaxY,
                  }
            }
          >
            {/* Entrance Animation: Enters ~0.85s after page opens (text appears first) */}
            <motion.div
              initial={{ opacity: 0, scale: 0.82 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 0.75,
                delay: 0.85,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              {/* Floating Animation: Starts gently ~2s after entrance finishes */}
              <motion.div
                animate={
                  isFloatingActive && !shouldReduceMotion
                    ? {
                        y: [0, -6, 0, 6, 0],
                        rotate: [0, 1.2, 0, -1.2, 0],
                      }
                    : { y: 0, rotate: 0 }
                }
                transition={{
                  duration: 6.2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                whileHover={{ scale: 1.06, rotate: 1.5 }}
                className="group cursor-pointer"
              >
                <div className="relative w-24 h-24 lg:w-32 lg:h-32 xl:w-36 xl:h-36 rounded-full overflow-hidden border-2 border-white/20 shadow-2xl shadow-purple-950/60 bg-[#090812] transition-shadow duration-300 group-hover:border-purple-400/50">
                  <Image
                    src="/images/profile.webp"
                    alt={`${personalData.name} — Web Developer`}
                    fill
                    priority
                    sizes="(max-width: 1024px) 96px, (max-width: 1280px) 128px, 144px"
                    className="object-cover object-top filter grayscale contrast-125 brightness-95 group-hover:scale-105 group-hover:contrast-115 transition-all duration-500"
                  />
                  <div className="absolute inset-0 rounded-full border border-white/20 pointer-events-none" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
                </div>

                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 px-2.5 py-0.5 rounded-full bg-[#050508]/90 border border-white/15 text-[10px] font-mono text-zinc-300 backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap shadow-lg">
                  {personalData.name}
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>

        {/* Flank Right: Creative 3D Artwork Card */}
        <div className="hidden md:block absolute md:right-[4%] lg:right-[8%] xl:right-[12%] md:top-[38%] lg:top-[40%] z-30 pointer-events-auto">
          <motion.div
            style={
              shouldReduceMotion
                ? {}
                : {
                    x: cardParallaxX,
                    y: cardParallaxY,
                  }
            }
          >
            {/* Entrance Animation: Enters ~0.95s after page opens */}
            <motion.div
              initial={{ opacity: 0, scale: 0.82, rotate: -3 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{
                duration: 0.75,
                delay: 0.95,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              {/* Floating Animation: Starts gently ~2s after entrance finishes */}
              <motion.div
                animate={
                  isFloatingActive && !shouldReduceMotion
                    ? {
                        y: [0, 7, 0, -5, 0],
                        rotate: [0, -1.6, 0, 1.3, 0],
                      }
                    : { y: 0, rotate: 0 }
                }
                transition={{
                  duration: 7.2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                whileHover={{ scale: 1.06, rotate: -1 }}
                className="group cursor-pointer"
              >
                <div className="relative w-22 sm:w-26 lg:w-32 xl:w-36 aspect-[4/5] rounded-2xl overflow-hidden border border-white/20 shadow-2xl shadow-purple-950/50 bg-[#080711] backdrop-blur-xl transition-shadow duration-300 group-hover:border-blue-400/50">
                  <Image
                    src="/images/creative-art.webp"
                    alt="Creative 3D Abstract Digital Art"
                    fill
                    priority
                    sizes="(max-width: 1024px) 104px, (max-width: 1280px) 128px, 144px"
                    className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#050508]/80 via-transparent to-transparent pointer-events-none" />
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>

        {/* --- MAIN EDITORIAL HEADLINE TYPOGRAPHY (Prioritized and Revealed First) --- */}
        <div className="w-full flex flex-col items-center justify-center leading-none text-center px-1">
          
          {/* Line 1: FULL STACK */}
          <div className="overflow-hidden py-0.5 sm:py-1 w-full flex justify-center">
            <motion.h1
              initial={{ y: "115%", opacity: 0 }}
              animate={{ y: "0%", opacity: 1 }}
              transition={{
                duration: 0.85,
                delay: 0.2,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="font-black tracking-[-0.035em] uppercase text-[#ebe8e5] text-4xl xs:text-5xl sm:text-7xl md:text-8xl lg:text-[11vw] xl:text-[10.5vw] leading-[0.88] select-none text-center"
            >
              FULL STACK
            </motion.h1>
          </div>

          {/* Line 2: DEVELOPER */}
          <div className="overflow-hidden py-0.5 sm:py-1 w-full flex justify-center">
            <motion.h1
              initial={{ y: "115%", opacity: 0 }}
              animate={{ y: "0%", opacity: 1 }}
              transition={{
                duration: 0.85,
                delay: 0.32,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="font-black tracking-[-0.035em] uppercase text-[#ebe8e5] text-4xl xs:text-5xl sm:text-7xl md:text-8xl lg:text-[11vw] xl:text-[10.5vw] leading-[0.88] select-none text-center"
            >
              DEVELOPER
            </motion.h1>
          </div>

          {/* Line 3: with intention */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.7,
              delay: 0.48,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="mt-3 sm:mt-5 text-center relative z-20"
          >
            <span className="font-serif italic font-normal text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-[#ebe8e5] tracking-wide block">
              with intention
            </span>
          </motion.div>

          {/* --- MOBILE VISUAL SHOWCASE (md:hidden) --- */}
          {/* Sits cleanly below text, never overlapping the heading on mobile */}
          <div className="flex md:hidden items-center justify-center gap-4 sm:gap-6 mt-5 mb-3 w-full">
            {/* Mobile Circular Portrait */}
            <motion.div
              initial={{ opacity: 0, scale: 0.82 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 0.7,
                delay: 0.85,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <motion.div
                animate={
                  isFloatingActive && !shouldReduceMotion
                    ? {
                        y: [0, -4, 0, 4, 0],
                        rotate: [0, 1.2, 0, -1.2, 0],
                      }
                    : { y: 0, rotate: 0 }
                }
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="relative w-16 h-16 xs:w-20 xs:h-20 rounded-full overflow-hidden border-2 border-white/20 shadow-xl shadow-purple-950/50 bg-[#090812]"
              >
                <Image
                  src="/images/profile.webp"
                  alt={`${personalData.name} — Web Developer`}
                  fill
                  priority
                  sizes="(max-width: 640px) 80px, 96px"
                  className="object-cover object-top filter grayscale contrast-125 brightness-95"
                />
                <div className="absolute inset-0 rounded-full border border-white/20 pointer-events-none" />
              </motion.div>
            </motion.div>

            {/* Mobile 3D Artwork Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.82, rotate: -2 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{
                duration: 0.7,
                delay: 0.95,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <motion.div
                animate={
                  isFloatingActive && !shouldReduceMotion
                    ? {
                        y: [0, 4, 0, -4, 0],
                        rotate: [0, -1.4, 0, 1.2, 0],
                      }
                    : { y: 0, rotate: 0 }
                }
                transition={{
                  duration: 6.8,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="relative w-14 xs:w-16 aspect-[4/5] rounded-xl overflow-hidden border border-white/20 shadow-xl shadow-purple-950/40 bg-[#080711]"
              >
                <Image
                  src="/images/creative-art.webp"
                  alt="Creative 3D Abstract Digital Art"
                  fill
                  priority
                  sizes="(max-width: 640px) 64px, 80px"
                  className="object-cover"
                />
              </motion.div>
            </motion.div>
          </div>

        </div>
      </div>

      {/* 4. Bottom Information & Call to Action Row */}
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.58, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-20 max-w-6xl mx-auto w-full pt-4 sm:pt-6 border-t border-white/[0.08] flex flex-col md:flex-row items-center justify-between gap-4 sm:gap-6"
      >
        {/* Developer Bio & Location */}
        <div className="flex flex-col text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-2 text-xs sm:text-sm font-semibold text-white">
            <span>{personalData.name}</span>
            <span className="text-zinc-500">&bull;</span>
            <span className="text-[11px] sm:text-xs font-mono text-zinc-400 font-normal">
              BSCS Student at UAF
            </span>
          </div>
          <p className="text-[11px] sm:text-xs text-zinc-400 font-mono mt-0.5 max-w-md">
            Frontend Web Developer &amp; Problem Solver in C++. Saylani Welfare Trust Trainee.
          </p>
        </div>

        {/* CTA Magnetic Buttons */}
        <div className="flex items-center gap-2.5 sm:gap-3.5 flex-wrap justify-center">
          <Magnetic strength={0.22}>
            <Link href="#projects">
              <Button
                size="sm"
                variant="default"
                className="text-xs font-mono bg-[#ebe8e5] hover:bg-white text-black font-semibold shadow-xl border-none cursor-pointer px-4 sm:px-5"
              >
                <span>View Works</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Button>
            </Link>
          </Magnetic>

          <Magnetic strength={0.22}>
            <Link href="#contact">
              <Button
                size="sm"
                variant="secondary"
                className="text-xs font-mono border-white/15 bg-white/[0.04] text-white hover:bg-white/[0.08] cursor-pointer px-3.5 sm:px-4"
              >
                <Send className="h-3 w-3 text-purple-400" />
                <span>Let&apos;s talk</span>
              </Button>
            </Link>
          </Magnetic>

          {/* Social Profiles */}
          <div className="flex items-center gap-2 pl-2 border-l border-white/10">
            {githubLink && (
              <Magnetic strength={0.3}>
                <a
                  href={githubLink.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-1.5 sm:p-2 rounded-xl text-zinc-400 hover:text-white hover:bg-white/[0.06] transition-colors"
                  aria-label="GitHub"
                >
                  <GithubIcon className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                </a>
              </Magnetic>
            )}
            {linkedinLink && (
              <Magnetic strength={0.3}>
                <a
                  href={linkedinLink.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-1.5 sm:p-2 rounded-xl text-zinc-400 hover:text-white hover:bg-white/[0.06] transition-colors"
                  aria-label="LinkedIn"
                >
                  <LinkedInIcon className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-[#38bdf8]" />
                </a>
              </Magnetic>
            )}
          </div>
        </div>
      </motion.div>
    </section>
  );
}

export default Hero;
