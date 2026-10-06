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
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
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
      sub: "JavaScript, TypeScript, C++, Redux",
    },
    {
      label: "Target Role",
      value: "Web Development Intern",
      sub: "Seeking collaborative team opportunities",
    },
  ];

  return (
    <section id="about" className="py-24 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto relative">
      <SectionHeader
        badgeText="About Me"
        title="Academic Foundation &"
        titleHighlight="Engineering Direction"
        description="Combining university computer science coursework in C++ and algorithms with dedicated practical web development training."
      />

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
        className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch"
      >
        {/* Left Column: Editorial Narrative */}
        <motion.div
          variants={fadeInUp}
          className="lg:col-span-7 flex flex-col justify-between"
        >
          <div className="developer-panel rounded-2xl p-7 sm:p-8 h-full flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between gap-2 mb-6 pb-4 border-b border-white/[0.08]">
                <span className="text-xs font-mono uppercase tracking-wider text-orange-400 flex items-center gap-2">
                  <Terminal className="h-3.5 w-3.5" />
                  <span>Developer Dossier</span>
                </span>
                <span className="text-[11px] font-mono text-zinc-500">
                  REF: MUT-BSCS-05
                </span>
              </div>

              {/* Career Objective Statement */}
              <div className="mb-6">
                <span className="text-xs font-mono uppercase tracking-widest text-zinc-400 block mb-2">
                  Career Objective:
                </span>
                <blockquote className="text-base sm:text-lg text-zinc-200 leading-relaxed font-normal border-l-2 border-orange-500/60 pl-4 py-1 italic">
                  &ldquo;{personalData.careerObjective}&rdquo;
                </blockquote>
              </div>

              <div className="space-y-4 text-sm text-zinc-300 leading-relaxed pt-2">
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
                <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                  <span className="text-xs font-mono text-orange-400 block mb-1">
                    01 &bull; Problem Solving in C++
                  </span>
                  <p className="text-xs text-zinc-400 leading-normal">
                    Strengthening logical reasoning, algorithmic thinking, and memory models.
                  </p>
                </div>
                <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                  <span className="text-xs font-mono text-orange-400 block mb-1">
                    02 &bull; Modern Web Interfaces
                  </span>
                  <p className="text-xs text-zinc-400 leading-normal">
                    Crafting responsive, clean, and accessible web experiences with HTML, CSS, JS/TS, and Redux.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-white/[0.08] flex flex-wrap items-center justify-between text-xs font-mono text-zinc-400 gap-2">
              <span className="flex items-center gap-1.5">
                <MapPin className="h-3.5 w-3.5 text-orange-400" />
                {personalData.location}
              </span>
              <span className="text-emerald-400/90 flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                Seeking Internship
              </span>
            </div>
          </div>
        </motion.div>

        {/* Right Column: Technical Profile Specification Grid */}
        <motion.div
          variants={fadeInUp}
          className="lg:col-span-5 flex flex-col justify-between"
        >
          <div className="developer-panel rounded-2xl p-7 h-full flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between gap-2 mb-5 pb-3 border-b border-white/[0.08]">
                <h3 className="text-sm font-mono uppercase tracking-wider text-white flex items-center gap-2">
                  <FileCode className="h-4 w-4 text-orange-400" />
                  <span>Technical &amp; Academic Data</span>
                </h3>
                <span className="text-[10px] font-mono text-zinc-500 uppercase">
                  Verified
                </span>
              </div>

              <div className="space-y-4">
                {profileSpecs.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.06] hover:border-orange-500/30 transition-colors"
                  >
                    <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-400 block mb-0.5">
                      {item.label}
                    </span>
                    <span className="text-sm font-semibold text-white block">
                      {item.value}
                    </span>
                    <span className="text-xs text-zinc-400 block mt-0.5">
                      {item.sub}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-white/[0.08] text-[11px] font-mono text-zinc-400 flex items-center justify-between">
              <span>Status: Undergraduate</span>
              <span className="text-orange-400/90">Eager to contribute</span>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
