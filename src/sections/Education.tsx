"use client";

import React from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import {
  GraduationCap,
  Award,
  Calendar,
  MapPin,
  ArrowRight,
} from "lucide-react";
import { SectionHeader } from "@/components/common/SectionHeader";
import { Badge } from "@/components/ui/Badge";
import { GlowCard } from "@/components/ui/GlowCard";
import { Button } from "@/components/ui/Button";
import { Magnetic } from "@/components/ui/magnetic";
import { educationData, trainingData } from "@/data";

export function Education() {
  const shouldReduceMotion = useReducedMotion();
  const edu = educationData[0];
  const training = trainingData[0];

  return (
    <section id="education" className="py-28 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto relative">
      <SectionHeader
        align="split"
        badgeText="Timeline"
        title="Education"
        serifAccent="Education"
        description="Formal university degree curriculum alongside dedicated practical frontend web development training."
      />

      <div className="relative border-l border-white/[0.08] ml-4 sm:ml-8 pl-6 sm:pl-10 space-y-12">
        {/* Timeline Item 1: BSCS Degree */}
        {edu && (
          <motion.div
            initial={shouldReduceMotion ? {} : { opacity: 0, x: -35, filter: "blur(6px)" }}
            whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
            {/* Timeline Glowing Node */}
            <div className="absolute -left-[31px] sm:-left-[47px] top-1.5 h-5 w-5 rounded-full bg-[#050508] border-2 border-purple-500 flex items-center justify-center shadow-[0_0_14px_rgba(168,85,247,0.6)]">
              <span className="h-1.5 w-1.5 rounded-full bg-purple-400" />
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
                  <span className="text-xs font-mono text-purple-300 bg-purple-500/10 border border-purple-500/20 px-2 py-0.5 rounded">
                    CGPA {edu.cgpa}
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-3.5 mb-4">
                <div className="p-2.5 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-300 shrink-0 mt-0.5 group-hover:scale-105 transition-transform">
                  <GraduationCap className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-[#ebe8e5] group-hover:text-purple-200 transition-colors">
                    {edu.degree}
                  </h3>
                  <p className="text-xs sm:text-sm text-zinc-400 font-medium mt-0.5">
                    {edu.institution}
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-zinc-400 mb-4 pb-4 border-b border-white/[0.06]">
                <span className="flex items-center gap-1.5">
                  <MapPin className="h-3.5 w-3.5 text-purple-400" />
                  {edu.location}
                </span>
                <span className="flex items-center gap-1.5">
                  <Calendar className="h-3.5 w-3.5 text-purple-400" />
                  {edu.period}
                </span>
              </div>

              {edu.details && (
                <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed mb-4">
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
                    className="text-[11px] font-mono py-0.5 px-2.5 rounded bg-white/[0.03] border border-white/[0.07] text-zinc-300 hover:border-purple-500/30 transition-colors"
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
            initial={shouldReduceMotion ? {} : { opacity: 0, x: -35, filter: "blur(6px)" }}
            whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
            {/* Timeline Glowing Node */}
            <div className="absolute -left-[31px] sm:-left-[47px] top-1.5 h-5 w-5 rounded-full bg-[#050508] border-2 border-emerald-500 flex items-center justify-center shadow-[0_0_14px_rgba(16,185,129,0.5)]">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            </div>

            <GlowCard glowColor="navy" className="p-6 sm:p-7">
              <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                <Badge variant="default" className="text-[10px]">
                  Practical Training
                </Badge>
                <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded">
                  {training.period}
                </span>
              </div>

              <div className="flex items-start gap-3.5 mb-4">
                <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 shrink-0 mt-0.5 group-hover:scale-105 transition-transform">
                  <Award className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-[#ebe8e5] group-hover:text-emerald-200 transition-colors">
                    {training.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-zinc-400 font-medium mt-0.5">
                    {training.institution}
                  </p>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed mb-4">
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
                    className="text-[11px] font-mono py-0.5 px-2.5 rounded bg-white/[0.03] border border-white/[0.07] text-zinc-300 hover:border-emerald-500/30 transition-colors"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </GlowCard>
          </motion.div>
        )}
      </div>

      {/* Action: Prominent 'View Full Education' button opening /education in a new tab */}
      <motion.div
        initial={shouldReduceMotion ? {} : { opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="mt-12 text-center"
      >
        <Magnetic strength={0.25}>
          <Link
            href="/education"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block"
          >
            <Button
              variant="outline"
              size="lg"
              className="gap-2.5 text-xs font-mono border-white/15 hover:border-purple-500/50 hover:bg-purple-500/10 text-zinc-300 hover:text-white group px-7 py-3 rounded-full cursor-pointer"
            >
              <GraduationCap className="h-4 w-4 text-purple-400" />
              <span>View Full Education &amp; Timeline</span>
              <ArrowRight className="h-3.5 w-3.5 text-purple-400 group-hover:translate-x-1 transition-transform duration-200" />
            </Button>
          </Link>
        </Magnetic>
      </motion.div>
    </section>
  );
}

export default Education;
