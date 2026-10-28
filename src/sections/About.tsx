"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  GraduationCap,
  Award,
  Terminal,
  Compass,
  MapPin,
  CheckCircle2,
  FileCode,
  Sparkles,
} from "lucide-react";
import { SectionHeader } from "@/components/common/SectionHeader";
import { GlowCard } from "@/components/ui/GlowCard";
import { personalData, educationData, trainingData } from "@/data";
import { fadeInUp, staggerContainer } from "@/animations/motion";

export function About() {
  const primaryEdu = educationData[0];
  const primaryTraining = trainingData[0];

  const profileSpecs = [
    {
      label: "Degree Program",
      value: "BS in Computer Science (BSCS)",
      sub: "University of Agriculture Faisalabad",
    },
    {
      label: "Current Semester",
      value: "5th Semester",
      sub: "Active Undergraduate",
    },
    {
      label: "Academic Merit",
      value: "CGPA 3.4 / 4.0",
      sub: "Solid standing in CS fundamentals",
    },
    {
      label: "Practical Training",
      value: "Web Development Training",
      sub: "Saylani Welfare Trust",
    },
    {
      label: "Primary Focus",
      value: "Frontend Web & C++ Algorithms",
      sub: "JavaScript, TypeScript, C++, Redux, React",
    },
    {
      label: "Target Role",
      value: "Web Development Intern",
      sub: "Seeking collaborative team opportunities",
    },
  ];

  return (
    <section id="about" className="py-26 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto relative">
      {/* Background ambient sapphire glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/3 left-1/2 -translate-x-1/2 w-[650px] h-[350px] bg-[radial-gradient(ellipse,rgba(37,99,235,0.08)_0%,transparent_70%)] blur-3xl rounded-full"
      />

      <SectionHeader
        badgeText="About Me"
        title="Academic Foundation &"
        serifAccent="Philosophy"
        titleHighlight="Engineering Direction"
        description="Combining university computer science coursework in C++ and algorithms with dedicated practical web development training."
      />

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
        className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch relative z-10"
      >
        {/* Left Column: Editorial Narrative */}
        <motion.div
          variants={fadeInUp}
          className="lg:col-span-7 flex flex-col justify-between"
        >
          <GlowCard glowColor="navy" className="h-full flex flex-col justify-between p-7 sm:p-8">
            <div>
              <div className="flex items-center justify-between gap-2 mb-6 pb-4 border-b border-white/[0.08]">
                <span className="text-xs font-mono uppercase tracking-wider text-blue-400 flex items-center gap-2">
                  <Terminal className="h-3.5 w-3.5" />
                  <span>Developer Dossier</span>
                </span>
                <span className="text-[11px] font-mono text-slate-500">
                  REF: MUT-BSCS-05
                </span>
              </div>

              {/* Career Objective Statement */}
              <div className="mb-6">
                <span className="text-xs font-mono uppercase tracking-widest text-slate-400 block mb-2">
                  Career Objective:
                </span>
                <blockquote className="text-base sm:text-lg text-slate-200 leading-relaxed font-normal border-l-2 border-blue-500/60 pl-4 py-1 italic font-serif">
                  &ldquo;{personalData.careerObjective}&rdquo;
                </blockquote>
              </div>

              <div className="space-y-4 text-sm text-slate-300 leading-relaxed pt-2">
                <p>
                  I am a computer science student at the{" "}
                  <strong className="text-white font-medium">
                    University of Agriculture Faisalabad
                  </strong>
                  , currently in my 5th semester with an academic CGPA of{" "}
                  <strong className="text-white font-medium">3.4 / 4.0</strong>.
                  My coursework emphasizes core computational disciplines, including
                  Programming Fundamentals, Object-Oriented Programming (OOP), and
                  Data Structures &amp; Algorithms using C++.
                </p>
                <p>
                  Alongside academic studies, I completed hands-on Web Development
                  Training at{" "}
                  <strong className="text-white font-medium">
                    Saylani Welfare Trust
                  </strong>
                  , which focused on frontend web technologies, component layouts,
                  and practical projects.
                </p>
              </div>

              {/* Pillars */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-6 pt-6 border-t border-white/[0.08]">
                <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06] hover:border-blue-500/30 transition-colors">
                  <span className="text-xs font-mono text-blue-400 block mb-1">
                    01 &bull; Problem Solving in C++
                  </span>
                  <p className="text-xs text-slate-400 leading-normal">
                    Strengthening logical reasoning, algorithmic thinking, and memory models.
                  </p>
                </div>
                <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06] hover:border-blue-500/30 transition-colors">
                  <span className="text-xs font-mono text-blue-400 block mb-1">
                    02 &bull; Modern Web Interfaces
                  </span>
                  <p className="text-xs text-slate-400 leading-normal">
                    Crafting responsive, clean, and accessible web experiences with HTML, CSS, JS/TS, and Redux.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-white/[0.08] flex flex-wrap items-center justify-between text-xs font-mono text-slate-400 gap-2">
              <span className="flex items-center gap-1.5">
                <MapPin className="h-3.5 w-3.5 text-blue-400" />
                {personalData.location}
              </span>
              <span className="text-emerald-400 flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Seeking Internship
              </span>
            </div>
          </GlowCard>
        </motion.div>

        {/* Right Column: Technical Profile Specification Grid */}
        <motion.div
          variants={fadeInUp}
          className="lg:col-span-5 flex flex-col justify-between"
        >
          <GlowCard glowColor="cyan" className="h-full flex flex-col justify-between p-7">
            <div>
              <div className="flex items-center justify-between gap-2 mb-5 pb-3 border-b border-white/[0.08]">
                <h3 className="text-sm font-mono uppercase tracking-wider text-white flex items-center gap-2">
                  <FileCode className="h-4 w-4 text-blue-400" />
                  <span>Technical &amp; Academic Data</span>
                </h3>
                <span className="text-[10px] font-mono text-blue-400 uppercase">
                  Verified
                </span>
              </div>

              <div className="space-y-3.5">
                {profileSpecs.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.06] hover:border-blue-500/30 transition-all duration-200 group/spec"
                  >
                    <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400 block mb-0.5">
                      {item.label}
                    </span>
                    <span className="text-sm font-semibold text-white block group-hover/spec:text-blue-200 transition-colors">
                      {item.value}
                    </span>
                    <span className="text-xs text-slate-400 block mt-0.5">
                      {item.sub}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-white/[0.08] text-[11px] font-mono text-slate-400 flex items-center justify-between">
              <span>Status: Undergraduate</span>
              <span className="text-blue-400 font-medium">Eager to contribute</span>
            </div>
          </GlowCard>
        </motion.div>
      </motion.div>
    </section>
  );
}

export default About;
