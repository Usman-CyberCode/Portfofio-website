"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import {
  Code2,
  Layers,
  Globe,
  Wrench,
  Brain,
  Check,
  Cpu,
  ArrowRight,
} from "lucide-react";
import { SectionHeader } from "@/components/common/SectionHeader";
import { GlowCard } from "@/components/ui/GlowCard";
import { Button } from "@/components/ui/Button";
import { Magnetic } from "@/components/ui/magnetic";
import { skillCategories } from "@/data";
import { CosmicParallaxBg } from "@/components/ui/parallax-cosmic-background";

const categoryIcons: Record<string, React.ElementType> = {
  Programming: Code2,
  "State Management": Layers,
  "Web Technologies": Globe,
  Tools: Wrench,
  "Core Skills / Interests": Brain,
};

export function Skills() {
  const shouldReduceMotion = useReducedMotion();
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const categories = ["All", ...skillCategories.map((c) => c.title)];

  const filteredCategories =
    selectedCategory === "All"
      ? skillCategories
      : skillCategories.filter((c) => c.title === selectedCategory);

  return (
    <section id="skills" className="py-28 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* 1. Animated Cosmic Parallax Starfield & Ambient Glow Background */}
      <CosmicParallaxBg className="opacity-25" />

      {/* 2. Soft Dynamic Ambient Light Meshes in Deep Purple */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-1/4 -left-20 w-[550px] h-[500px] rounded-full bg-[radial-gradient(circle,rgba(88,28,135,0.16)_0%,transparent_70%)] blur-3xl animate-ambient-drift" />
        <div className="absolute bottom-10 -right-20 w-[600px] h-[550px] rounded-full bg-[radial-gradient(circle,rgba(59,130,246,0.08)_0%,transparent_65%)] blur-3xl animate-ambient-drift [animation-delay:4s]" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <SectionHeader
          align="split"
          badgeText="Capabilities"
          title="Skills"
          serifAccent="Skills"
          description="Languages, predictable state containers, and fundamental computer science disciplines honed through university coursework and dedicated training."
        />

        {/* Category Filter Pills */}
        <motion.div
          initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-wrap items-center justify-start gap-2 mb-10"
        >
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                type="button"
                className={`text-xs font-mono py-1.5 px-4 rounded-full transition-all duration-200 cursor-pointer ${
                  isSelected
                    ? "bg-purple-600/30 text-white border border-purple-400/50 font-medium shadow-[0_0_15px_rgba(168,85,247,0.3)]"
                    : "bg-white/[0.03] text-zinc-400 hover:text-white border border-white/[0.08] hover:border-white/20"
                }`}
              >
                {cat}
              </button>
            );
          })}
        </motion.div>

        {/* Skills Grid with Staggered Scroll-Triggered Reveals */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredCategories.map((category, idx) => {
              const Icon = categoryIcons[category.title] || Code2;

              return (
                <motion.div
                  layout
                  key={category.title}
                  initial={
                    shouldReduceMotion
                      ? {}
                      : { opacity: 0, y: 50, filter: "blur(6px)", scale: 0.96 }
                  }
                  whileInView={{ opacity: 1, y: 0, filter: "blur(0px)", scale: 1 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{
                    duration: 0.85,
                    delay: idx * 0.08,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="flex"
                >
                  <GlowCard glowColor="navy" className="w-full flex flex-col justify-between p-6">
                    <div>
                      {/* Header */}
                      <div className="flex items-center justify-between gap-3 mb-3">
                        <div className="flex items-center gap-2.5">
                          <div className="p-2.5 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-300 group-hover:scale-105 group-hover:bg-purple-500/20 transition-all duration-300">
                            <Icon className="h-4.5 w-4.5" />
                          </div>
                          <h3 className="text-base font-semibold text-[#ebe8e5] group-hover:text-purple-200 transition-colors">
                            {category.title}
                          </h3>
                        </div>
                        <span className="text-[10px] font-mono text-zinc-500">
                          {category.skills.length} skills
                        </span>
                      </div>

                      {category.description && (
                        <p className="text-xs text-zinc-400 mb-5 leading-relaxed">
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
                                ? "border-purple-500/40 bg-purple-500/10 text-purple-300 font-medium hover:bg-purple-500/20 hover:border-purple-400 shadow-[0_0_12px_rgba(168,85,247,0.18)]"
                                : "border-white/10 bg-white/[0.03] text-zinc-300 hover:border-purple-500/30 hover:text-white hover:bg-white/[0.06]"
                            }`}
                          >
                            {skill.highlight && (
                              <span className="h-1.5 w-1.5 rounded-full bg-purple-400 animate-pulse" />
                            )}
                            <span>{skill.name}</span>
                          </motion.span>
                        ))}
                      </div>
                    </div>

                    <div className="mt-6 pt-3 border-t border-white/[0.06] flex items-center justify-between text-[10px] font-mono text-zinc-500">
                      <span>Verified Knowledge</span>
                      <span className="text-emerald-400 flex items-center gap-1 font-medium">
                        <Check className="h-3 w-3" />
                        Active
                      </span>
                    </div>
                  </GlowCard>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Action: Prominent 'View All Skills' button opening /skills in a new tab */}
        <motion.div
          initial={shouldReduceMotion ? {} : { opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-12 text-center"
        >
          <Magnetic strength={0.25}>
            <Link
              href="/skills"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block"
            >
              <Button
                variant="outline"
                size="lg"
                className="gap-2.5 text-xs font-mono border-white/15 hover:border-purple-500/50 hover:bg-purple-500/10 text-zinc-300 hover:text-white group px-7 py-3 rounded-full cursor-pointer"
              >
                <Cpu className="h-4 w-4 text-purple-400" />
                <span>View All Skills &amp; Stack</span>
                <ArrowRight className="h-3.5 w-3.5 text-purple-400 group-hover:translate-x-1 transition-transform duration-200" />
              </Button>
            </Link>
          </Magnetic>
        </motion.div>
      </div>
    </section>
  );
}

export default Skills;
