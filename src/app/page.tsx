"use client";

import React from "react";
import { Navbar } from "@/components/common/Navbar";
import { Footer } from "@/components/common/Footer";
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
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-black overflow-hidden">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Education />
        <FocusAreas />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
