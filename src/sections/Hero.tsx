"use client";

import React, { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from "framer-motion";
import { ArrowRight, Send, Sparkles, Terminal, Code2, Cpu } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Magnetic } from "@/components/ui/magnetic";
import { GithubIcon, LinkedInIcon } from "@/components/ui/Icons";
import { personalData } from "@/data";

export function Hero() {
  const shouldReduceMotion = useReducedMotion();
  const heroRef = useRef<HTMLDivElement>(null);

  // Mouse-follow parallax values for desktop
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 28, stiffness: 180, mass: 0.35 };
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);

  // Parallax transforms for floating elements
  const portraitParallaxX = useTransform(smoothMouseX, [-0.5, 0.5], [-16, 16]);
  const portraitParallaxY = useTransform(smoothMouseY, [-0.5, 0.5], [-14, 14]);

  const cardParallaxX = useTransform(smoothMouseX, [-0.5, 0.5], [18, -18]);
  const cardParallaxY = useTransform(smoothMouseY, [-0.5, 0.5], [16, -16]);

  const badgeParallaxX = useTransform(smoothMouseX, [-0.5, 0.5], [-10, 10]);
  const badgeParallaxY = useTransform(smoothMouseY, [-0.5, 0.5], [10, -10]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (shouldReduceMotion || !heroRef.current) return;
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
      className="relative min-h-[96vh] flex flex-col justify-between overflow-hidden bg-[#050508] px-4 sm:px-6 lg:px-8 pt-24 pb-12 select-none"
    >
      {/* 1. Subtle Dark Purple Radial Gradient Glow in the center */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[650px] bg-[radial-gradient(ellipse_at_center,rgba(88,28,135,0.26)_0%,rgba(45,12,72,0.12)_45%,transparent_75%)] blur-3xl rounded-full"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/4 right-1/4 w-[450px] h-[350px] bg-[radial-gradient(circle,rgba(59,130,246,0.06)_0%,transparent_65%)] blur-[100px] rounded-full"
      />

      {/* 2. Top Centered Availability Badge with Staged Delay */}
      <div className="relative z-20 flex justify-center pt-2">
        <motion.div
          initial={{ opacity: 0, y: -20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.85, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-white/10 bg-white/[0.04] backdrop-blur-md shadow-[0_4px_24px_rgba(0,0,0,0.5)]"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
          </span>
          <span className="text-xs font-mono text-zinc-300">
            Available for work
          </span>
          <span className="text-zinc-600 text-[10px]">&bull;</span>
          <span className="text-[11px] font-mono text-zinc-400">
            Seeking Internship
          </span>
        </motion.div>
      </div>

      {/* 3. Massive Full-Width Typography & Overlapping Editorial Composition */}
      <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col items-center justify-center my-auto py-6 sm:py-10">

        {/* Floating Circular Monochrome Portrait (Left-Center Overlap) */}
        <motion.div
          style={
            shouldReduceMotion
              ? {}
              : {
                x: portraitParallaxX,
                y: portraitParallaxY,
              }
          }
          initial={{ opacity: 0, scale: 0.75, y: 35 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 0.65, ease: [0.16, 1, 0.3, 1] }}
          className="absolute left-[3%] sm:left-[6%] lg:left-[20%] -top-[8%] sm:-top-[10%] lg:-top-[12%] z-30"
        >
          {/* Continuous gentle floating bobbing */}
          <motion.div
            animate={
              shouldReduceMotion
                ? {}
                : {
                  y: [0, -10, 0],
                  rotate: [0, 1.5, 0],
                }
            }
            transition={{
              duration: 5.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            whileHover={{ scale: 1.08, rotate: 2 }}
            className="group cursor-pointer"
          >
            <div className="relative w-24 h-24 sm:w-36 sm:h-36 lg:w-44 lg:h-44 rounded-full overflow-hidden border-2 border-white/20 shadow-2xl shadow-black/90 bg-[#090812]">
              <Image
                src="/images/profile.jpg"
                alt={personalData.name}
                fill
                priority
                quality={100}
                unoptimized
                className="object-cover object-top filter grayscale contrast-125 brightness-95 group-hover:scale-105 group-hover:contrast-115 transition-all duration-500"
              />
              {/* Subtle specular vignette ring */}
              <div className="absolute inset-0 rounded-full border border-white/25 pointer-events-none" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
            </div>

            {/* Small floating developer tag */}
            <div className="absolute -bottom-2 left-1/2 -translate-x-0/2 px-2.5 py-0.5 rounded-full bg-[#050508]/90 border border-white/15 text-[10px] font-mono text-zinc-300 backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap shadow-lg">
              {personalData.name}
            </div>
          </motion.div>
        </motion.div>

        {/* Floating Framed Creative Illustration Card (Right-Center Overlap) */}
        <motion.div
          style={
            shouldReduceMotion
              ? {}
              : {
                x: cardParallaxX,
                y: cardParallaxY,
              }
          }
          initial={{ opacity: 0, scale: 0.8, rotate: -6, y: 45 }}
          animate={{ opacity: 1, scale: 1, rotate: 0, y: 0 }}
          transition={{ duration: 1.15, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="absolute right-[3%] sm:right-[7%] lg:right-[2%] top-[12%] sm:top-[46%] z-30"
        >
          {/* Continuous gentle floating bobbing */}
          <motion.div
            animate={
              shouldReduceMotion
                ? {}
                : {
                  y: [0, 12, 0],
                  rotate: [0, -2, 0],
                }
            }
            transition={{
              duration: 6.8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            whileHover={{ scale: 1.06, rotate: -1 }}
            className="group cursor-pointer"
          >
            <div className="relative w-28 sm:w-40 lg:w-48 aspect-[4/5] rounded-2xl overflow-hidden border border-white/20 shadow-2xl shadow-purple-950/50 bg-[#080711] backdrop-blur-xl">
              <Image
                src="/images/creative-art.jpg"
                alt="Creative 3D Abstract Digital Art"
                fill
                priority
                quality={95}
                unoptimized
                className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050508]/80 via-transparent to-transparent pointer-events-none" />

            </div>
          </motion.div>
        </motion.div>



        {/* Main Massive Editorial Typography Headline */}
        <div className="w-full flex flex-col items-center justify-center leading-none text-center">

          {/* Line 1: FULL STACK (with overflow clip reveal) */}
          <div className="overflow-hidden py-1 w-full flex justify-center">
            <motion.h1
              initial={{ y: "120%", opacity: 0 }}
              animate={{ y: "0%", opacity: 1 }}
              transition={{
                duration: 1.25,
                delay: 0.38,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="font-black tracking-[-0.035em] uppercase text-[#ebe8e5] text-[13.5vw] sm:text-[14.5vw] lg:text-[12.8vw] leading-[0.85] select-none text-center"
            >
              FULL STACK
            </motion.h1>
          </div>

          {/* Line 2: DEVELOPER (with overflow clip reveal) */}
          <div className="overflow-hidden py-1 w-full flex justify-center">
            <motion.h1
              initial={{ y: "120%", opacity: 0 }}
              animate={{ y: "0%", opacity: 1 }}
              transition={{
                duration: 1.25,
                delay: 0.52,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="font-black tracking-[-0.035em] uppercase text-[#ebe8e5] text-[13.5vw] sm:text-[14.5vw] lg:text-[12.8vw] leading-[0.85] select-none text-center"
            >
              DEVELOPER
            </motion.h1>
          </div>

          {/* Elegant Italic Subtitle: with intention (matching the reference!) */}
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 1.1,
              delay: 0.9,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="mt-5 sm:mt-7 text-center relative z-20"
          >
            <span className="font-serif italic font-normal text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-[#ebe8e5] tracking-wide block">
              with intention
            </span>
          </motion.div>

        </div>
      </div>

      {/* 4. Bottom Information & Call to Action Row */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 1.15, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-20 max-w-6xl mx-auto w-full pt-6 border-t border-white/[0.08] flex flex-col md:flex-row items-center justify-between gap-6"
      >
        {/* Developer Bio & Location */}
        <div className="flex flex-col text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-2 text-sm font-semibold text-white">
            <span>{personalData.name}</span>
            <span className="text-zinc-500">&bull;</span>
            <span className="text-xs font-mono text-zinc-400 font-normal">
              BSCS Student at UAF
            </span>
          </div>
          <p className="text-xs text-zinc-400 font-mono mt-0.5 max-w-md">
            Frontend Web Developer &amp; Problem Solver in C++. Saylani Welfare Trust Trainee.
          </p>
        </div>

        {/* CTA Magnetic Buttons */}
        <div className="flex items-center gap-3.5 flex-wrap justify-center">
          <Magnetic strength={0.22}>
            <Link href="#projects">
              <Button
                size="default"
                variant="default"
                className="text-xs font-mono bg-[#ebe8e5] hover:bg-white text-black font-semibold shadow-xl border-none cursor-pointer"
              >
                <span>View Works</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Button>
            </Link>
          </Magnetic>

          <Magnetic strength={0.22}>
            <Link href="#contact">
              <Button
                size="default"
                variant="secondary"
                className="text-xs font-mono border-white/15 bg-white/[0.04] text-white hover:bg-white/[0.08] cursor-pointer"
              >
                <Send className="h-3 w-3 text-purple-400" />
                <span>Let&apos;s talk</span>
              </Button>
            </Link>
          </Magnetic>

          {/* Social Profiles */}
          <div className="hidden sm:flex items-center gap-2 pl-2 border-l border-white/10">
            {githubLink && (
              <Magnetic strength={0.3}>
                <a
                  href={githubLink.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-xl text-zinc-400 hover:text-white hover:bg-white/[0.06] transition-colors"
                  aria-label="GitHub"
                >
                  <GithubIcon className="h-4 w-4" />
                </a>
              </Magnetic>
            )}
            {linkedinLink && (
              <Magnetic strength={0.3}>
                <a
                  href={linkedinLink.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-xl text-zinc-400 hover:text-white hover:bg-white/[0.06] transition-colors"
                  aria-label="LinkedIn"
                >
                  <LinkedInIcon className="h-4 w-4 text-[#38bdf8]" />
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
