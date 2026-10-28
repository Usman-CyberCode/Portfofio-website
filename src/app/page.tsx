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
  About,
  Skills,
  Projects,
  Education,
  FocusAreas,
  Contact,
} from "@/sections";

export default function Home() {
  const [loadingComplete, setLoadingComplete] = useState(false);

  // Top viewport scroll progress indicator in deep sapphire
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

      {/* 3. Initial Site Load Animation */}
      <Preloader onComplete={() => setLoadingComplete(true)} />

      {/* 4. Top Scroll Progress Indicator Bar in Sapphire / Cyan */}
      <motion.div
        style={{ scaleX }}
        className="fixed top-0 left-0 right-0 h-[2.5px] bg-gradient-to-r from-blue-600 via-sky-400 to-indigo-500 origin-left z-[9990] pointer-events-none shadow-[0_0_10px_rgba(59,130,246,0.5)]"
      />

      {/* 5. Main Navigation */}
      <Navbar />

      {/* 6. Main Application Content Sections */}
      <motion.main
        initial={{ opacity: 0, scale: 0.97, y: 20 }}
        animate={
          loadingComplete
            ? { opacity: 1, scale: 1, y: 0 }
            : { opacity: 0, scale: 0.97, y: 20 }
        }
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="min-h-screen bg-transparent overflow-hidden relative z-10"
      >
        {/* Hero Section with Staggered Text Reveals & 3D Tilt Portrait */}
        <Hero />

        {/* Looping Technology Marquee Ticker */}
        <TechMarquee />

        {/* Editorial About Dossier Section */}
        <About />

        {/* Categorized Technical Skills with Interactive Hover Glows */}
        <Skills />

        {/* Practical Projects with 3D Tilt & Image Zoom */}
        <Projects />

        {/* Academic Journey (Education & Training Timeline) */}
        <Education />

        {/* Capabilities & Focus Areas with Service Hover Interactions */}
        <FocusAreas />

        {/* Animated Contact Form & Opportunities Section */}
        <Contact />
      </motion.main>

      {/* 7. Footer */}
      <Footer />
    </>
  );
}
