"use client";

import React, { useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { Navbar } from "@/components/common/Navbar";
import { Footer } from "@/components/common/Footer";
import { Preloader } from "@/components/ui/preloader";
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
  const [loadingComplete, setLoadingComplete] = useState(false);

  // Top viewport scroll progress indicator in violet & sapphire
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <>
      {/* 1. Global Custom 3D Reticle Cursor */}
      <CustomCursor />

      {/* 2. Desktop-Only Cursor-Following Glow */}
      <DesktopCursorGlow />

      {/* 3. Initial Silky Site Load Animation */}
      <Preloader onComplete={() => setLoadingComplete(true)} />

      {/* 4. Top Scroll Progress Indicator Bar in Purple & Sky Blue */}
      <motion.div
        style={{ scaleX }}
        className="fixed top-0 left-0 right-0 h-[2.5px] bg-gradient-to-r from-purple-600 via-indigo-400 to-sky-400 origin-left z-[9990] pointer-events-none shadow-[0_0_12px_rgba(168,85,247,0.6)]"
      />

      {/* 5. Main Navigation matching reference */}
      <Navbar />

      {/* 6. Main Application Content Sections with Slower, Grand Entrance */}
      <motion.main
        initial={{ opacity: 0, scale: 0.98, y: 25 }}
        animate={
          loadingComplete
            ? { opacity: 1, scale: 1, y: 0 }
            : { opacity: 0, scale: 0.98, y: 25 }
        }
        transition={{ duration: 1.15, ease: [0.16, 1, 0.3, 1] }}
        className="min-h-screen bg-transparent overflow-hidden relative z-10"
      >
        {/* Full-Screen Hero Section matching reference composition */}
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

      {/* 7. Footer */}
      <Footer />
    </>
  );
}
