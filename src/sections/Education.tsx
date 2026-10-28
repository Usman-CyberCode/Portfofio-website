"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  GraduationCap,
  Award,
  BookOpen,
  Calendar,
  MapPin,
  CheckCircle2,
  Terminal,
} from "lucide-react";
import { SectionHeader } from "@/components/common/SectionHeader";
import { Badge } from "@/components/ui/Badge";
import { GlowCard } from "@/components/ui/GlowCard";
import { educationData, trainingData } from "@/data";
import { fadeInUp, staggerContainer } from "@/animations/motion";

export function Education() {
  const edu = educationData[0];
  const training = trainingData[0];

  return (
    <section id="education" className="py-26 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto relative">
      <SectionHeader
        badgeText="Education & Training"
        title="Academic"
        serifAccent="Milestones"
        titleHighlight="& Practical Training"
        description="Formal university degree curriculum alongside dedicated practical frontend web development training."
      />

      <div className="relative border-l border-white/[0.08] ml-4 sm:ml-8 pl-6 sm:pl-10 space-y-12">
        {/* Timeline Item 1: BSCS Degree */}
        {edu && (
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="relative"
          >
            {/* Timeline Glowing Node */}
            <div className="absolute -left-[31px] sm:-left-[47px] top-1.5 h-5 w-5 rounded-full bg-[#030509] border-2 border-blue-500 flex items-center justify-center shadow-[0_0_14px_rgba(59,130,246,0.5)]">
              <span className="h-1.5 w-1.5 rounded-full bg-blue-400" />
            </div>

            <GlowCard glowColor="navy" className="p-6 sm:p-7">
              <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                <Badge variant="default" className="text-[10px]">
                  Academic Degree
                </Badge>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded">
                    {edu.currentSemester}
                  </span>
                  <span className="text-xs font-mono text-blue-400 bg-blue-500/10 border border-blue-500/20 px-2 py-0.5 rounded">
                    CGPA {edu.cgpa}
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-3.5 mb-4">
                <div className="p-2.5 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400 shrink-0 mt-0.5 group-hover:scale-105 transition-transform">
                  <GraduationCap className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-blue-200 transition-colors">
                    {edu.degree}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 font-medium mt-0.5">
                    {edu.institution}
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-slate-400 mb-4 pb-4 border-b border-white/[0.06]">
                <span className="flex items-center gap-1.5">
                  <MapPin className="h-3.5 w-3.5 text-blue-400" />
                  {edu.location}
                </span>
                <span className="flex items-center gap-1.5">
                  <Calendar className="h-3.5 w-3.5 text-blue-400" />
                  {edu.period}
                </span>
              </div>

              {edu.details && (
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4">
                  {edu.details}
                </p>
              )}

              <div className="flex flex-wrap gap-1.5 pt-1">
                {[
                  "Programming Fundamentals",
                  "Object-Oriented Programming (OOP)",
                  "Data Structures & Algorithms",
                  "C++",
                ].map((item) => (
                  <span
                    key={item}
                    className="text-[11px] font-mono py-0.5 px-2.5 rounded bg-white/[0.03] border border-white/[0.07] text-slate-300 hover:border-blue-500/30 transition-colors"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </GlowCard>
          </motion.div>
        )}

        {/* Timeline Item 2: Saylani Practical Training */}
        {training && (
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="relative"
          >
            {/* Timeline Glowing Node */}
            <div className="absolute -left-[31px] sm:-left-[47px] top-1.5 h-5 w-5 rounded-full bg-[#030509] border-2 border-sky-400 flex items-center justify-center shadow-[0_0_14px_rgba(56,189,248,0.5)]">
              <span className="h-1.5 w-1.5 rounded-full bg-sky-300" />
            </div>

            <GlowCard glowColor="cyan" className="p-6 sm:p-7">
              <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                <Badge variant="default" className="text-[10px]">
                  Practical Training
                </Badge>
                <span className="text-xs font-mono text-sky-400 bg-sky-500/10 border border-sky-500/20 px-2 py-0.5 rounded">
                  {training.period}
                </span>
              </div>

              <div className="flex items-start gap-3.5 mb-4">
                <div className="p-2.5 rounded-xl bg-sky-500/10 border border-sky-500/20 text-sky-400 shrink-0 mt-0.5 group-hover:scale-105 transition-transform">
                  <Award className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-sky-200 transition-colors">
                    {training.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 font-medium mt-0.5">
                    {training.institution}
                  </p>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4">
                {training.description}
              </p>

              <div className="flex flex-wrap gap-1.5 pt-1">
                {[
                  "HTML & CSS Standards",
                  "JavaScript (ES6+)",
                  "TypeScript Basics",
                  "Frontend Layouts",
                  "Practical Projects",
                ].map((item) => (
                  <span
                    key={item}
                    className="text-[11px] font-mono py-0.5 px-2.5 rounded bg-white/[0.03] border border-white/[0.07] text-slate-300 hover:border-sky-500/30 transition-colors"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </GlowCard>
          </motion.div>
        )}
      </div>
    </section>
  );
}

export default Education;
