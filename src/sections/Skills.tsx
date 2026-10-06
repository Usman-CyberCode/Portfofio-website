"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Code2,
  Layers,
  Globe,
  Wrench,
  Brain,
  Terminal,
  Check,
} from "lucide-react";
import { SectionHeader } from "@/components/common/SectionHeader";
import { Badge } from "@/components/ui/Badge";
import { skillCategories } from "@/data";
import { fadeInUp, staggerContainer } from "@/animations/motion";

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
    <section id="skills" className="py-24 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto relative">
      <SectionHeader
        badgeText="Technical Skills"
        title="Categorized Competencies &"
        titleHighlight="Core Tooling"
        description="Structured into programming languages, state management, web standards, developer tools, and fundamental computer science topics."
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
              className={`text-xs font-mono py-1.5 px-3.5 rounded-full transition-all cursor-pointer ${
                isSelected
                  ? "bg-white/[0.12] text-white border border-white/20 font-medium shadow-sm"
                  : "bg-white/[0.03] text-zinc-400 hover:text-zinc-200 border border-white/[0.06] hover:border-white/10"
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
                <div className="developer-panel rounded-2xl w-full flex flex-col justify-between p-6 transition-all duration-200 group hover:border-orange-500/40">
                  <div>
                    {/* Header */}
                    <div className="flex items-center justify-between gap-3 mb-3">
                      <div className="flex items-center gap-2.5">
                        <div className="p-2 rounded-lg bg-orange-500/10 border border-orange-500/20 text-orange-400 group-hover:scale-105 transition-transform">
                          <Icon className="h-4.5 w-4.5" />
                        </div>
                        <h3 className="text-base font-semibold text-white group-hover:text-orange-200 transition-colors">
                          {category.title}
                        </h3>
                      </div>
                      <span className="text-[10px] font-mono text-zinc-400">
                        {category.skills.length} skills
                      </span>
                    </div>

                    {category.description && (
                      <p className="text-xs text-zinc-400 mb-5 leading-relaxed">
                        {category.description}
                      </p>
                    )}

                    {/* Skill Badges */}
                    <div className="flex flex-wrap gap-2 pt-1">
                      {category.skills.map((skill) => (
                        <motion.span
                          key={skill.name}
                          whileHover={{ y: -1 }}
                          className={`inline-flex items-center gap-1.5 text-xs font-mono py-1 px-3 rounded-lg border transition-all ${
                            skill.highlight
                              ? "border-orange-500/40 bg-orange-500/10 text-orange-300 font-medium hover:bg-orange-500/15"
                              : "border-white/10 bg-white/[0.03] text-zinc-300 hover:border-white/20 hover:text-white"
                          }`}
                        >
                          {skill.highlight && (
                            <span className="h-1.5 w-1.5 rounded-full bg-orange-400" />
                          )}
                          <span>{skill.name}</span>
                        </motion.span>
                      ))}
                    </div>
                  </div>

                  <div className="mt-6 pt-3 border-t border-white/[0.06] flex items-center justify-between text-[10px] font-mono text-zinc-400">
                    <span>Verified Knowledge</span>
                    <span className="text-emerald-400 flex items-center gap-1">
                      <Check className="h-3 w-3" />
                      Active
                    </span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}
