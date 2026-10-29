"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, useReducedMotion, AnimatePresence } from "framer-motion";
import {
  Code2,
  Layers,
  Globe,
  Wrench,
  Brain,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";
import { SubpageHeader } from "@/components/subpage/SubpageHeader";
import { Footer } from "@/components/common/Footer";
import { GlowCard } from "@/components/ui/GlowCard";
import { Button } from "@/components/ui/Button";
import { Magnetic } from "@/components/ui/magnetic";
import { CosmicParallaxBg } from "@/components/ui/parallax-cosmic-background";

interface DetailedSkill {
  name: string;
  category: string;
  context: string;
  highlight?: boolean;
  status: "Academic Tested" | "Project Verified" | "Active Training";
}

const verifiedSkillDirectory: DetailedSkill[] = [
  // Programming
  {
    name: "C++",
    category: "Programming",
    context: "Core academic language for Data Structures, OOP, and problem solving. Used in ATM Clone banking simulation.",
    highlight: true,
    status: "Academic Tested",
  },
  {
    name: "JavaScript (ES6+)",
    category: "Programming",
    context: "Modern asynchronous JavaScript, promises, event handling, and DOM manipulation. Used across all web projects.",
    highlight: true,
    status: "Project Verified",
  },
  {
    name: "TypeScript",
    category: "Programming",
    context: "Type annotations, interface contracts, and compiler verification for maintainable frontend architectures.",
    highlight: true,
    status: "Project Verified",
  },

  // State Management
  {
    name: "Redux / Redux Toolkit",
    category: "State Management",
    context: "Configuring store slices, pure reducers, immutable updates, and typed dispatch actions. Built Redux Counter.",
    highlight: true,
    status: "Project Verified",
  },
  {
    name: "Unidirectional Data Flow",
    category: "State Management",
    context: "Structuring component hierarchies so state flows downward and actions dispatch upward cleanly.",
    highlight: false,
    status: "Project Verified",
  },

  // Web Technologies
  {
    name: "HTML5",
    category: "Web Technologies",
    context: "Semantic elements, accessible document structures, and clean form inputs following modern standards.",
    highlight: false,
    status: "Project Verified",
  },
  {
    name: "CSS3 / Modern Layouts",
    category: "Web Technologies",
    context: "Mobile-first responsive design, CSS Flexbox, Grid systems, animations, and custom styling.",
    highlight: false,
    status: "Project Verified",
  },
  {
    name: "Tailwind CSS",
    category: "Web Technologies",
    context: "Utility-first design tokens, responsive breakpoint variants, dark mode theming, and layout utilities.",
    highlight: true,
    status: "Project Verified",
  },
  {
    name: "Responsive Design",
    category: "Web Technologies",
    context: "Designing interfaces that scale without horizontal overflow from 320px mobile up to desktop monitors.",
    highlight: true,
    status: "Project Verified",
  },
  {
    name: "Basic React / Next.js",
    category: "Web Technologies",
    context: "Component-driven development, Next.js App Router static pages, client/server boundaries, and routing.",
    highlight: true,
    status: "Project Verified",
  },

  // Tools & Workflows
  {
    name: "Git",
    category: "Tools & Workflows",
    context: "Local version control, staged commits, branch management, and repository history tracking.",
    highlight: false,
    status: "Project Verified",
  },
  {
    name: "GitHub",
    category: "Tools & Workflows",
    context: "Remote collaboration, pull requests, project boards, and open source repository management.",
    highlight: true,
    status: "Project Verified",
  },
  {
    name: "VS Code",
    category: "Tools & Workflows",
    context: "Configured development environment with ESLint, Prettier, TypeScript tooling, and debugger extensions.",
    highlight: false,
    status: "Project Verified",
  },
  {
    name: "Microsoft Word & PowerPoint",
    category: "Tools & Workflows",
    context: "Technical documentation, academic presentation slide decks, and project reports.",
    highlight: false,
    status: "Academic Tested",
  },

  // Core CS & Problem Solving
  {
    name: "Problem Solving",
    category: "Core CS & Problem Solving",
    context: "Breaking complex algorithmic challenges into modular functions, guard conditions, and structured edge cases.",
    highlight: true,
    status: "Academic Tested",
  },
  {
    name: "Data Structures & Algorithms",
    category: "Core CS & Problem Solving",
    context: "Arrays, linked lists, stacks, queues, trees, graphs, sorting/searching mechanics, and asymptotic notation.",
    highlight: true,
    status: "Academic Tested",
  },
  {
    name: "Object-Oriented Programming (OOP)",
    category: "Core CS & Problem Solving",
    context: "Encapsulation, class inheritance, polymorphism, and modular abstraction patterns in C++.",
    highlight: true,
    status: "Academic Tested",
  },
  {
    name: "Programming Fundamentals",
    category: "Core CS & Problem Solving",
    context: "Control flow, memory pointers, function references, recursion, and structured software architecture.",
    highlight: false,
    status: "Academic Tested",
  },
  {
    name: "Continuous Learning",
    category: "Core CS & Problem Solving",
    context: "Active habit of reading technical documentation, learning modern web libraries, and adopting new frameworks.",
    highlight: false,
    status: "Active Training",
  },
];

const categoryIcons: Record<string, React.ElementType> = {
  Programming: Code2,
  "State Management": Layers,
  "Web Technologies": Globe,
  "Tools & Workflows": Wrench,
  "Core CS & Problem Solving": Brain,
};

export default function SkillsPage() {
  const shouldReduceMotion = useReducedMotion();
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const categories = [
    "All",
    "Programming",
    "State Management",
    "Web Technologies",
    "Tools & Workflows",
    "Core CS & Problem Solving",
  ];

  const filteredSkills =
    selectedCategory === "All"
      ? verifiedSkillDirectory
      : verifiedSkillDirectory.filter((s) => s.category === selectedCategory);

  return (
    <div className="min-h-screen bg-[#050508] text-[#ebe8e5] relative overflow-hidden">
      {/* Background starfield & ambient glow */}
      <CosmicParallaxBg className="opacity-20" />

      <div className="absolute top-1/4 -right-20 w-[600px] h-[550px] rounded-full bg-[radial-gradient(circle,rgba(168,85,247,0.12)_0%,transparent_70%)] blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/3 -left-20 w-[600px] h-[550px] rounded-full bg-[radial-gradient(circle,rgba(59,130,246,0.08)_0%,transparent_70%)] blur-3xl pointer-events-none" />

      <SubpageHeader
        badge="Technical Competencies"
        title="Verified Skills &amp;"
        serifAccent="Technologies"
        description="Comprehensive technical matrix organized by programming languages, state management, frontend standards, developer workflows, and core computer science fundamentals."
        currentPath="/skills"
      />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-28 relative z-10">
        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-10 pb-6 border-b border-white/[0.06]">
          <div className="flex flex-wrap items-center gap-2">
            {categories.map((cat) => {
              const isSelected = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  type="button"
                  className={`text-xs font-mono py-1.5 px-4 rounded-full transition-all duration-200 cursor-pointer ${
                    isSelected
                      ? "bg-purple-600/30 text-white border border-purple-400/50 shadow-[0_0_15px_rgba(168,85,247,0.3)] font-medium"
                      : "bg-white/[0.03] text-zinc-400 hover:text-white border border-white/[0.08] hover:border-white/20"
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          <span className="text-xs font-mono text-zinc-500">
            Showing {filteredSkills.length} verified competencies
          </span>
        </div>

        {/* Skills Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
          <AnimatePresence mode="popLayout">
            {filteredSkills.map((skill, idx) => {
              const Icon = categoryIcons[skill.category] || Code2;

              return (
                <motion.div
                  layout
                  key={skill.name}
                  initial={
                    shouldReduceMotion
                      ? {}
                      : { opacity: 0, y: 30, filter: "blur(6px)" }
                  }
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{
                    duration: 0.5,
                    delay: idx * 0.04,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="flex"
                >
                  <GlowCard
                    glowColor="navy"
                    className="w-full flex flex-col justify-between p-6 rounded-2xl bg-[#070c18]/85 border border-white/[0.08] hover:border-purple-500/40 transition-colors"
                  >
                    <div>
                      {/* Skill Card Header */}
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <div className="p-2 rounded-lg bg-purple-500/10 border border-purple-500/20 text-purple-300">
                            <Icon className="h-4 w-4" />
                          </div>
                          <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider">
                            {skill.category}
                          </span>
                        </div>

                        {skill.highlight && (
                          <span className="h-2 w-2 rounded-full bg-purple-400 animate-pulse shadow-[0_0_8px_rgba(168,85,247,0.8)]" />
                        )}
                      </div>

                      <h3 className="text-base font-bold text-white mb-2 group-hover:text-purple-200 transition-colors">
                        {skill.name}
                      </h3>

                      <p className="text-xs text-zinc-300 leading-relaxed mb-4">
                        {skill.context}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-white/[0.06] flex items-center justify-between text-[10px] font-mono">
                      <span className="text-zinc-500">Validation:</span>
                      <span
                        className={`inline-flex items-center gap-1 font-medium ${
                          skill.status === "Academic Tested"
                            ? "text-blue-400"
                            : skill.status === "Project Verified"
                            ? "text-emerald-400"
                            : "text-purple-400"
                        }`}
                      >
                        <CheckCircle2 className="h-3 w-3" />
                        {skill.status}
                      </span>
                    </div>
                  </GlowCard>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Verification Guarantee Banner */}
        <div className="p-8 sm:p-10 rounded-2xl bg-gradient-to-br from-[#0c1328] via-[#070b1a] to-[#04060d] border border-white/[0.08] relative overflow-hidden">
          <div className="max-w-2xl">
            <span className="text-xs font-mono uppercase tracking-wider text-purple-400 block mb-2">
              Transparency &bull; Verification Policy
            </span>
            <h3 className="text-xl sm:text-2xl font-bold text-white mb-3">
              Grounded Strictly in Real Codebases &amp; Coursework
            </h3>
            <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed mb-6">
              Every skill listed above corresponds directly to coursework completed at the University of Agriculture Faisalabad, modules trained at Saylani Welfare Trust, or projects engineered in this portfolio repository. No unverified qualifications or exaggerated senior claims are made.
            </p>
            <div className="flex flex-wrap gap-4">
              <Magnetic strength={0.25}>
                <Link href="/work">
                  <Button
                    variant="default"
                    size="sm"
                    className="gap-2 text-xs font-mono bg-purple-600 hover:bg-purple-500 text-white font-semibold px-5 py-2.5 rounded-full cursor-pointer"
                  >
                    <span>Inspect Project Implementations</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Button>
                </Link>
              </Magnetic>

              <Magnetic strength={0.25}>
                <Link href="/education">
                  <Button
                    variant="outline"
                    size="sm"
                    className="gap-2 text-xs font-mono border-white/15 hover:border-purple-500/50 hover:bg-purple-500/10 text-zinc-300 hover:text-white px-5 py-2.5 rounded-full cursor-pointer"
                  >
                    <span>View University Coursework</span>
                  </Button>
                </Link>
              </Magnetic>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}