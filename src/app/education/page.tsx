"use client";

import React from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import {
  GraduationCap,
  Award,
  Calendar,
  MapPin,
  CheckCircle2,
  Cpu,
  ArrowRight,
} from "lucide-react";
import { SubpageHeader } from "@/components/subpage/SubpageHeader";
import { Footer } from "@/components/common/Footer";
import { GlowCard } from "@/components/ui/GlowCard";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Magnetic } from "@/components/ui/magnetic";
import { educationData, trainingData } from "@/data";
import { CosmicParallaxBg } from "@/components/ui/parallax-cosmic-background";

export default function EducationPage() {
  const shouldReduceMotion = useReducedMotion();
  const edu = educationData[0];
  const training = trainingData[0];

  const universityCourses = [
    {
      code: "CS-301",
      name: "Data Structures & Algorithms",
      discipline: "C++",
      description: "Linear and hierarchical data structures: arrays, linked lists, stacks, queues, trees, and graphs. Algorithmic complexity and searching/sorting algorithms.",
    },
    {
      code: "CS-201",
      name: "Object-Oriented Programming (OOP)",
      discipline: "C++",
      description: "Encapsulation, inheritance, polymorphism, abstraction, operator overloading, and memory management in C++.",
    },
    {
      code: "CS-101",
      name: "Programming Fundamentals",
      discipline: "C++",
      description: "Structured procedural programming, control structures, functions, pointers, references, and standard I/O streams.",
    },
    {
      code: "CS-302",
      name: "Discrete Mathematics",
      discipline: "Mathematics",
      description: "Propositional logic, set theory, functions, relations, graph theory, combinatorics, and mathematical reasoning.",
    },
    {
      code: "CS-304",
      name: "Database Systems",
      discipline: "Databases",
      description: "Relational database concepts, entity-relationship models, normalization forms, and SQL query design.",
    },
    {
      code: "CS-306",
      name: "Computer Networks & Architecture",
      discipline: "Systems",
      description: "Network layered protocols, IP routing, client-server models, and computer hardware-software boundaries.",
    },
  ];

  const saylaniModules = [
    {
      name: "HTML5 & Semantic Document Structure",
      focus: "Accessible semantic tags, document outlines, and SEO best practices.",
    },
    {
      name: "Modern Responsive CSS & Layout Systems",
      focus: "Mobile-first responsive grids, Flexbox layouts, media queries, and Tailwind CSS.",
    },
    {
      name: "JavaScript (ES6+) & DOM Engineering",
      focus: "Modern ECMAScript standards, asynchronous promises, event listeners, and DOM manipulation.",
    },
    {
      name: "Component-Based UI Architecture with React",
      focus: "Modular component trees, unidirectional data flow, props interfaces, and state lifting.",
    },
    {
      name: "TypeScript Typing & Safe Codebases",
      focus: "Interface definitions, type annotations, and compiler verification.",
    },
    {
      name: "Version Control & Team Workflows",
      focus: "Git commit practices, branching, pull requests, and repository hosting on GitHub.",
    },
  ];

  return (
    <div className="min-h-screen bg-[#050508] text-[#ebe8e5] relative overflow-hidden">
      {/* Background starfield & ambient glow */}
      <CosmicParallaxBg className="opacity-20" />

      <div className="absolute top-1/4 -right-20 w-[600px] h-[550px] rounded-full bg-[radial-gradient(circle,rgba(168,85,247,0.12)_0%,transparent_70%)] blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/3 -left-20 w-[600px] h-[550px] rounded-full bg-[radial-gradient(circle,rgba(59,130,246,0.08)_0%,transparent_70%)] blur-3xl pointer-events-none" />

      <SubpageHeader
        badge="Academic Roadmap"
        title="Education &amp;"
        serifAccent="Training"
        description="Formal university degree curriculum in Computer Science alongside verified practical frontend web development training."
        currentPath="/education"
      />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-28 relative z-10">
        {/* Timeline Overview Row */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-20 items-stretch">
          {/* Main University Degree */}
          {edu && (
            <motion.div
              initial={shouldReduceMotion ? {} : { opacity: 0, y: 35 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-7 flex flex-col justify-between"
            >
              <GlowCard glowColor="navy" className="p-7 sm:p-8 h-full bg-[#070c18]/90 border border-white/[0.08] flex flex-col justify-between">
                <div>
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                    <Badge variant="default" className="text-xs">
                      Formal University Degree
                    </Badge>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-0.5 rounded-full">
                        {edu.currentSemester}
                      </span>
                      <span className="text-xs font-mono text-purple-300 bg-purple-500/10 border border-purple-500/20 px-2.5 py-0.5 rounded-full">
                        CGPA {edu.cgpa}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 mb-4">
                    <div className="p-3 rounded-xl bg-purple-500/10 border border-purple-500/25 text-purple-300 shrink-0">
                      <GraduationCap className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="text-xl sm:text-2xl font-bold text-white mb-1">
                        {edu.degree}
                      </h3>
                      <p className="text-sm font-medium text-purple-300">
                        {edu.institution}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-zinc-400 mb-6 pb-4 border-b border-white/[0.06]">
                    <span className="flex items-center gap-1.5">
                      <MapPin className="h-3.5 w-3.5 text-purple-400" />
                      {edu.location}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Calendar className="h-3.5 w-3.5 text-purple-400" />
                      {edu.period}
                    </span>
                  </div>

                  <p className="text-sm text-zinc-300 leading-relaxed mb-6">
                    {edu.details}
                  </p>

                  <div className="space-y-2 pt-2">
                    <span className="text-xs font-mono uppercase tracking-wider text-zinc-500 block">
                      Core Academic Disciplines:
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {[
                        "Programming Fundamentals in C++",
                        "Object-Oriented Programming (OOP)",
                        "Data Structures & Algorithms (DSA)",
                        "Discrete Mathematics",
                        "Database Systems",
                        "Computer Networks",
                      ].map((item) => (
                        <span
                          key={item}
                          className="text-xs font-mono py-1 px-3 rounded-lg bg-white/[0.03] border border-white/[0.08] text-zinc-300"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-4 border-t border-white/[0.06] flex items-center justify-between text-xs font-mono text-zinc-500">
                  <span>Enrolled Student</span>
                  <span className="text-purple-400 font-medium">Undergraduate Active</span>
                </div>
              </GlowCard>
            </motion.div>
          )}

          {/* Saylani Welfare Trust Practical Training */}
          {training && (
            <motion.div
              initial={shouldReduceMotion ? {} : { opacity: 0, y: 35 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-5 flex flex-col justify-between"
            >
              <GlowCard glowColor="navy" className="p-7 sm:p-8 h-full bg-[#070c18]/90 border border-white/[0.08] flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <Badge variant="status" className="text-xs">
                      Practical Web Training
                    </Badge>
                    <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-0.5 rounded-full">
                      {training.period}
                    </span>
                  </div>

                  <div className="flex items-start gap-4 mb-4">
                    <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 shrink-0">
                      <Award className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white mb-1">
                        {training.title}
                      </h3>
                      <p className="text-sm font-medium text-emerald-300">
                        {training.institution}
                      </p>
                    </div>
                  </div>

                  <p className="text-sm text-zinc-300 leading-relaxed mb-6">
                    {training.description}
                  </p>

                  <div className="space-y-3 pt-4 border-t border-white/[0.06]">
                    <span className="text-xs font-mono uppercase tracking-wider text-zinc-500 block">
                      Practical Project Curriculum:
                    </span>
                    <ul className="space-y-2 text-xs text-zinc-300">
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 shrink-0 mt-0.5" />
                        <span>Semantic HTML5 &amp; modern CSS responsive standards</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 shrink-0 mt-0.5" />
                        <span>JavaScript (ES6+) asynchronous programming &amp; DOM state</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 shrink-0 mt-0.5" />
                        <span>React component design, props flow &amp; state management</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 shrink-0 mt-0.5" />
                        <span>Version control workflows using Git &amp; GitHub</span>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="mt-8 pt-4 border-t border-white/[0.06] flex items-center justify-between text-xs font-mono text-zinc-500">
                  <span>Hands-on Code Training</span>
                  <span className="text-emerald-400 font-medium">Completed</span>
                </div>
              </GlowCard>
            </motion.div>
          )}
        </div>

        {/* Detailed University Coursework Breakdown */}
        <div className="mb-20">
          <div className="mb-10 pb-4 border-b border-white/[0.08] flex items-center justify-between">
            <div>
              <span className="text-xs font-mono uppercase tracking-wider text-purple-400 block mb-1">
                Curriculum Focus
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-white">
                University Coursework &amp; Fundamentals
              </h2>
            </div>
            <span className="text-xs font-mono text-zinc-500">
              6 Core Subjects
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {universityCourses.map((c) => (
              <div
                key={c.code}
                className="p-6 rounded-2xl bg-[#070c18]/80 border border-white/[0.08] hover:border-purple-500/30 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-mono text-purple-400 font-semibold">
                      {c.code}
                    </span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/[0.04] text-zinc-400">
                      {c.discipline}
                    </span>
                  </div>
                  <h4 className="text-base font-bold text-white mb-2">
                    {c.name}
                  </h4>
                  <p className="text-xs text-zinc-400 leading-relaxed">
                    {c.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Saylani Training Modules Breakdown */}
        <div className="mb-20">
          <div className="mb-10 pb-4 border-b border-white/[0.08]">
            <span className="text-xs font-mono uppercase tracking-wider text-emerald-400 block mb-1">
              Applied Training Modules
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              Saylani Welfare Trust Web Curriculum
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {saylaniModules.map((m, mIdx) => (
              <div
                key={mIdx}
                className="p-6 rounded-2xl bg-[#070c18]/80 border border-white/[0.08] hover:border-emerald-500/30 transition-all"
              >
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs font-mono text-emerald-400 font-semibold">
                    MODULE 0{mIdx + 1}
                  </span>
                </div>
                <h4 className="text-sm font-bold text-white mb-2">
                  {m.name}
                </h4>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  {m.focus}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Action Link to Skills Matrix */}
        <div className="text-center p-8 sm:p-12 rounded-2xl bg-gradient-to-br from-[#0b1022] to-[#04060d] border border-purple-500/30">
          <h3 className="text-2xl sm:text-3xl font-bold text-white mb-3">
            Explore Verified Technical Skills
          </h3>
          <p className="text-sm text-zinc-300 max-w-xl mx-auto mb-6">
            See how this academic background translates into hands-on technologies like C++, JavaScript, TypeScript, React, Next.js, and Redux.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Magnetic strength={0.25}>
              <Link href="/skills">
                <Button
                  variant="default"
                  size="lg"
                  className="gap-2 text-xs font-mono bg-purple-600 hover:bg-purple-500 text-white font-semibold px-7 py-3 rounded-full cursor-pointer"
                >
                  <Cpu className="h-3.5 w-3.5" />
                  <span>View Skills Matrix</span>
                </Button>
              </Link>
            </Magnetic>
            <Magnetic strength={0.25}>
              <Link href="/work">
                <Button
                  variant="outline"
                  size="lg"
                  className="gap-2 text-xs font-mono border-white/15 hover:border-purple-500/50 hover:bg-purple-500/10 text-zinc-300 hover:text-white px-7 py-3 rounded-full cursor-pointer"
                >
                  <span>View Project Implementations</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Button>
              </Link>
            </Magnetic>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}