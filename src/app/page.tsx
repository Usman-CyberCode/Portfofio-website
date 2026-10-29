"use client";

import React from "react";
import { motion, useScroll, useSpring, useReducedMotion } from "framer-motion";
import { Navbar } from "@/components/common/Navbar";
import { Footer } from "@/components/common/Footer";
import { CustomCursor } from "@/components/ui/custom-cursor";
import { DesktopCursorGlow } from "@/components/ui/desktop-cursor-glow";
import { TechMarquee } from "@/components/ui/tech-marquee";
import {
  Hero,
  Projects,
  FocusAreas,
  About,
  Skills,
  Education,
  Contact,
} from "@/sections";

export default function Home() {
  const shouldReduceMotion = useReducedMotion();

  // Top viewport scroll progress indicator in violet & sapphire
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <>
      {/* 1. Global Custom 3D Reticle Cursor (Desktop-Only, Accessible) */}
      <CustomCursor />

      {/* 2. Desktop-Only Cursor-Following Glow */}
      <DesktopCursorGlow />

      {/* 3. Top Scroll Progress Indicator Bar in Purple & Sky Blue */}
      <motion.div
        style={{ scaleX }}
        className="fixed top-0 left-0 right-0 h-[2.5px] bg-gradient-to-r from-purple-600 via-indigo-400 to-sky-400 origin-left z-[9990] pointer-events-none shadow-[0_0_12px_rgba(168,85,247,0.6)]"
      />

      {/* 4. Main Navigation */}
      <Navbar />

      {/* 5. Main Application Content Sections - Immediate Fast Landing */}
      <motion.main
        initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="min-h-screen bg-transparent overflow-hidden relative z-10"
      >
        {/* Full-Screen Hero Section */}
        <Hero />

        {/* Looping Technology Marquee Ticker */}
        <TechMarquee />

        {/* Works (Practical Projects Showcase) */}
        <Projects />

        {/* Services (Capabilities & Focus Areas) */}
        <FocusAreas />

        {/* About (Editorial Developer Dossier) */}
        <About />

        {/* Technical Skills & Competencies */}
        <Skills />

        {/* Academic Journey (Education & Training Timeline) */}
        <Education />

        {/* Contact ('Let's build something great') Section */}
        <Contact />
      </motion.main>

      {/* 6. Footer */}
      <Footer />
    </>
  );
}
