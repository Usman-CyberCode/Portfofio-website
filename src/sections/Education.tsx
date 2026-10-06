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
import { educationData, trainingData } from "@/data";
import { fadeInUp, staggerContainer } from "@/animations/motion";

export function Education() {
  const edu = educationData[0];
  const training = trainingData[0];

  return (
    <section id="education" className="py-24 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto relative">
      <SectionHeader
        badgeText="Education & Training"
        title="Academic Journey &"
        titleHighlight="Practical Training"
        description="Formal university degree curriculum alongside dedicated practical frontend training."
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
            <div className="absolute -left-[31px] sm:-left-[47px] top-1.5 h-5 w-5 rounded-full bg-zinc-950 border-2 border-orange-500 flex items-center justify-center">
              <span className="h-1.5 w-1.5 rounded-full bg-orange-400" />
            </div>

            <div className="developer-panel rounded-2xl p-6 sm:p-7">
              <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                <Badge variant="default" className="text-[10px]">
                  Academic Degree
                </Badge>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded">
                    {edu.currentSemester}
                  </span>
                  <span className="text-xs font-mono text-orange-400 bg-orange-500/10 border border-orange-500/20 px-2 py-0.5 rounded">
                    CGPA {edu.cgpa}
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-3.5 mb-4">
                <div className="p-2.5 rounded-xl bg-orange-500/10 border border-orange-500/20 text-orange-400 shrink-0 mt-0.5">
                  <GraduationCap className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-white">
                    {edu.degree}
                  </h3>
                  <p className="text-xs sm:text-sm text-zinc-300 font-medium mt-0.5">
                    {edu.institution}
                  </p>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed mb-4">
                {edu.details}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-3 border-t border-white/[0.06] text-xs text-zinc-300">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 text-orange-400 shrink-0" />
                  <span>Programming Fundamentals &amp; OOP in C++</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 text-orange-400 shrink-0" />
                  <span>Data Structures &amp; Algorithmic Thinking</span>
                </div>
              </div>

              <div className="mt-5 pt-3 border-t border-white/[0.06] flex items-center justify-between text-[11px] font-mono text-zinc-400">
                <span className="flex items-center gap-1.5">
                  <MapPin className="h-3 w-3 text-orange-400" />
                  {edu.location || "Faisalabad, Pakistan"}
                </span>
                <span className="text-orange-400/90">In Progress</span>
              </div>
            </div>
          </motion.div>
        )}

        {/* Timeline Item 2: Practical Web Development Training */}
        {training && (
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="relative"
          >
            {/* Timeline Glowing Node */}
            <div className="absolute -left-[31px] sm:-left-[47px] top-1.5 h-5 w-5 rounded-full bg-zinc-950 border-2 border-zinc-600 flex items-center justify-center">
              <span className="h-1.5 w-1.5 rounded-full bg-zinc-400" />
            </div>

            <div className="developer-panel rounded-2xl p-6 sm:p-7">
              <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                <Badge variant="secondary" className="text-[10px]">
                  Practical Training
                </Badge>
                <span className="text-xs font-mono text-zinc-400 bg-white/[0.04] border border-white/10 px-2 py-0.5 rounded">
                  Completed
                </span>
              </div>

              <div className="flex items-start gap-3.5 mb-4">
                <div className="p-2.5 rounded-xl bg-orange-500/10 border border-orange-500/20 text-orange-400 shrink-0 mt-0.5">
                  <BookOpen className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-white">
                    {training.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-zinc-300 font-medium mt-0.5">
                    {training.institution}
                  </p>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed mb-4">
                {training.description}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-3 border-t border-white/[0.06] text-xs text-zinc-300">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                  <span>Frontend markup, styling, and interactivity</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                  <span>Project execution and coding discipline</span>
                </div>
              </div>

              <div className="mt-5 pt-3 border-t border-white/[0.06] flex items-center justify-between text-[11px] font-mono text-zinc-400">
                <span className="flex items-center gap-1.5">
                  <Award className="h-3 w-3 text-orange-400" />
                  Vocational Certification
                </span>
                <span className="text-emerald-400">Completed</span>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
