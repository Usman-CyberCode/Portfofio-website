"use client";

import React, { useState } from "react";
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
      {/* 1. Initial Site Load Animation */}
      <Preloader onComplete={() => setLoadingComplete(true)} />

      {/* 2. Full-Screen 3D Interactive Custom Cursor & Ambient Aura */}
      <CustomCursor />

      {/* 3. Top Scroll Progress Indicator Bar */}
      <motion.div
        style={{ scaleX }}
        className="fixed top-0 left-0 right-0 h-[2.5px] bg-gradient-to-r from-orange-500 via-amber-500 to-red-500 origin-left z-[9990] pointer-events-none"
      />

      {/* 4. Main Navigation */}
      <Navbar />

      {/* 5. Main Application Content Sections */}
      <main className="min-h-screen bg-black overflow-hidden relative">
        {/* Hero Section with Muhammad Usman Tahir portrait & MorphText */}
        <Hero />

        {/* Editorial About Section */}
        <About />

        {/* Categorized Technical Skills */}
        <Skills />

        {/* Practical Projects (Practical Work) */}
        <Projects />

        {/* 3D Rubik's Cube Section (Positioned between Practical Work & Academic Journey) */}
        <RubiksSection />

        {/* Academic Journey (Education & Training Timeline) */}
        <Education />

        {/* Capabilities & Focus Areas */}
        <FocusAreas />

        {/* Contact Section */}
        <Contact />
      </main>

      {/* 6. Footer */}
      <Footer />
    </>
  );
}
