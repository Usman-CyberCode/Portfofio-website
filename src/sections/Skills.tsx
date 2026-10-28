"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Code2,
  Layers,
  Globe,
  Wrench,
  Brain,
  Check,
} from "lucide-react";
import { SectionHeader } from "@/components/common/SectionHeader";
import { GlowCard } from "@/components/ui/GlowCard";
import { skillCategories } from "@/data";
import { fadeInUp, staggerContainer } from "@/animations/motion";
import { CosmicParallaxBg } from "@/components/ui/parallax-cosmic-background";

const categoryIcons: Record<string, React.ElementType> = {
  Programming: Code2,
  "State Management": Layers,
  "Web Technologies": Globe,
  Tools: Wrench,
  "Core Skills / Interests": Brain,
};

export function Skills() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const categories = ["All", ...skillCategories.map((c) => c.title)];

  const filteredCategories =
    selectedCategory === "All"
      ? skillCategories
      : skillCategories.filter((c) => c.title === selectedCategory);

  return (
    <section id="skills" className="py-28 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* 1. Animated Cosmic Parallax Starfield & Ambient Glow Background */}
      <CosmicParallaxBg className="opacity-30" />

      {/* 2. Soft Dynamic Ambient Light Meshes in Deep Navy & Sapphire */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-1/4 -left-20 w-[550px] h-[500px] rounded-full bg-[radial-gradient(circle,rgba(37,99,235,0.11)_0%,transparent_70%)] blur-3xl animate-ambient-drift" />
        <div className="absolute bottom-10 -right-20 w-[600px] h-[550px] rounded-full bg-[radial-gradient(circle,rgba(56,189,248,0.06)_0%,transparent_65%)] blur-3xl animate-ambient-drift [animation-delay:4s]" />

        {/* Hollow Watermark Text Accent */}
        <div className="absolute top-12 right-6 lg:right-16 text-hollow-lg text-7xl sm:text-8xl md:text-9xl font-black select-none opacity-10">
          SKILLS
        </div>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <SectionHeader
          badgeText="Technical Skills"
          title="Categorized Competencies &"
          serifAccent="Tooling"
          titleHighlight="Architecture"
          description="Structured into programming languages, state management, modern web standards, developer tools, and fundamental computer science topics."
        />

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                type="button"
                className={`text-xs font-mono py-1.5 px-4 rounded-full transition-all duration-200 cursor-pointer ${
                  isSelected
                    ? "bg-blue-600/25 text-white border border-blue-400/40 font-medium shadow-[0_0_15px_rgba(59,130,246,0.25)]"
                    : "bg-white/[0.03] text-slate-400 hover:text-white border border-white/[0.07] hover:border-white/15"
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Skills Grid */}
        <motion.div
          layout
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredCategories.map((category) => {
              const Icon = categoryIcons[category.title] || Code2;

              return (
                <motion.div
                  layout
                  key={category.title}
                  variants={fadeInUp}
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.25 }}
                  className="flex"
                >
                  <GlowCard glowColor="navy" className="w-full flex flex-col justify-between p-6">
                    <div>
                      {/* Header */}
                      <div className="flex items-center justify-between gap-3 mb-3">
                        <div className="flex items-center gap-2.5">
                          <div className="p-2.5 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400 group-hover:scale-105 group-hover:bg-blue-500/20 transition-all duration-300">
                            <Icon className="h-4.5 w-4.5" />
                          </div>
                          <h3 className="text-base font-semibold text-white group-hover:text-blue-200 transition-colors">
                            {category.title}
                          </h3>
                        </div>
                        <span className="text-[10px] font-mono text-slate-400">
                          {category.skills.length} skills
                        </span>
                      </div>

                      {category.description && (
                        <p className="text-xs text-slate-400 mb-5 leading-relaxed">
                          {category.description}
                        </p>
                      )}

                      {/* Skill Badges with Hover Glow Interactions */}
                      <div className="flex flex-wrap gap-2 pt-1">
                        {category.skills.map((skill) => (
                          <motion.span
                            key={skill.name}
                            whileHover={{ y: -2, scale: 1.03 }}
                            transition={{ duration: 0.15 }}
                            className={`inline-flex items-center gap-1.5 text-xs font-mono py-1 px-3 rounded-lg border transition-all cursor-default ${
                              skill.highlight
                                ? "border-blue-500/40 bg-blue-500/10 text-blue-300 font-medium hover:bg-blue-500/20 hover:border-blue-400 shadow-[0_0_12px_rgba(59,130,246,0.15)]"
                                : "border-white/10 bg-white/[0.03] text-slate-300 hover:border-blue-500/30 hover:text-white hover:bg-white/[0.06]"
                            }`}
                          >
                            {skill.highlight && (
                              <span className="h-1.5 w-1.5 rounded-full bg-blue-400 animate-pulse" />
                            )}
                            <span>{skill.name}</span>
                          </motion.span>
                        ))}
                      </div>
                    </div>

                    <div className="mt-6 pt-3 border-t border-white/[0.06] flex items-center justify-between text-[10px] font-mono text-slate-400">
                      <span>Verified Competency</span>
                      <span className="text-emerald-400 flex items-center gap-1">
                        <Check className="h-3 w-3" />
                        Active
                      </span>
                    </div>
                  </GlowCard>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}

export default Skills;
