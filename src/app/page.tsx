"use client";

import React, { useState } from "react";
import { WovenCanvas } from "@/components/ui/woven-light-hero";
import { motion, useScroll, useSpring } from "framer-motion";
import { Navbar } from "@/components/common/Navbar";
import { Footer } from "@/components/common/Footer";
import { Preloader } from "@/components/ui/preloader";
import { CustomCursor } from "@/components/ui/custom-cursor";
import {
  Hero,
  About,
  Skills,
  Projects,
  RubiksSection,
  Education,
  FocusAreas,
  Contact,
} from "@/sections";

export default function Home() {
  const [loadingComplete, setLoadingComplete] = useState(false);

  // Top viewport scroll progress indicator
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <>
      {/* 1. Global Custom 3D & Magnetic Cursor */}
      <CustomCursor />

      {/* 2. Persistent Animated Woven Light Particles Background across all sections */}
      <div className="fixed top-0 right-0 w-full lg:w-[60vw] max-w-[800px] h-full z-0 pointer-events-none opacity-40 translate-x-4 sm:translate-x-8">
        <WovenCanvas className="w-full h-full pointer-events-none" />
      </div>

      {/* 3. Initial Site Load Animation */}
      <Preloader onComplete={() => setLoadingComplete(true)} />

      {/* 4. Top Scroll Progress Indicator Bar */}
      <motion.div
        style={{ scaleX }}
        className="fixed top-0 left-0 right-0 h-[2.5px] bg-gradient-to-r from-orange-500 via-amber-500 to-red-500 origin-left z-[9990] pointer-events-none"
      />

      {/* 5. Main Navigation */}
      <Navbar />

      {/* 6. Main Application Content Sections with 3D Cinematic Entrance Motion */}
      <motion.main
        initial={{ opacity: 0, scale: 0.96, y: 24, rotateX: 2 }}
        animate={
          loadingComplete
            ? { opacity: 1, scale: 1, y: 0, rotateX: 0 }
            : { opacity: 0, scale: 0.96, y: 24, rotateX: 2 }
        }
        transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
        style={{ transformOrigin: "50% 15%", perspective: 1200 }}
        className="min-h-screen bg-[#08080a]/85 overflow-hidden relative z-10"
      >
        {/* Hero Section with Muhammad Usman Tahir portrait & Hollow Watermark */}
        <Hero />

        {/* Editorial About Section */}
        <About />

        {/* Categorized Technical Skills */}
        <Skills />

        {/* Practical Projects (Practical Work) with 3D Mechanical Keyboard */}
        <Projects />

        {/* 3D Rubik's Cube Section (Positioned between Practical Work & Academic Journey) */}
        <RubiksSection />

        {/* Academic Journey (Education & Training Timeline) */}
        <Education />

        {/* Capabilities & Focus Areas */}
        <FocusAreas />

        {/* Contact Section */}
        <Contact />
      </motion.main>

      {/* 6. Footer */}
      <Footer />
    </>
  );
}
