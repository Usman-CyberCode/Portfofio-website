"use client";

import React from "react";
import { motion } from "framer-motion";
import { Code2, Layout, Layers, Globe, Sparkles, Check, ArrowUpRight } from "lucide-react";
import { SectionHeader } from "@/components/common/SectionHeader";
import { GlowCard } from "@/components/ui/GlowCard";
import { focusAreasData } from "@/data";
import { fadeInUp, staggerContainer } from "@/animations/motion";

const serviceIcons: Record<string, React.ElementType> = {
  code: Code2,
  layout: Layout,
  layers: Layers,
  globe: Globe,
  sparkles: Sparkles,
};

export function FocusAreas() {
  return (
    <section id="focus-areas" className="py-26 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto relative">
      {/* Background ambient lighting */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-[radial-gradient(ellipse,rgba(37,99,235,0.08)_0%,transparent_70%)] blur-3xl rounded-full"
      />

      <SectionHeader
        badgeText="Capabilities & Focus"
        title="What I Can Build &"
        serifAccent="Services"
        titleHighlight="I Offer"
        description="Transparently framed around my academic coursework, practical training, and personal projects — areas where I can contribute as a web development intern."
      />

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {focusAreasData.map((item) => {
          const Icon = item.icon ? serviceIcons[item.icon] || Code2 : Code2;

          return (
            <motion.div
              key={item.id}
              variants={fadeInUp}
              whileHover={{ y: -5 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="flex"
            >
              <GlowCard glowColor="blue" className="w-full flex flex-col justify-between p-6">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400 group-hover:scale-110 group-hover:bg-blue-500/20 group-hover:text-blue-300 transition-all duration-300">
                      <Icon className="h-5 w-5" />
                    </div>
                    <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider group-hover:text-blue-400/80 transition-colors">
                      Service &bull; Skill
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-white mb-2 group-hover:text-blue-200 transition-colors">
                    {item.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-5">
                    {item.description}
                  </p>

                  <div className="space-y-2 pt-3 border-t border-white/[0.06]">
                    {item.capabilities?.map((cap, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-2 text-xs text-slate-300 group-hover:text-slate-200 transition-colors"
                      >
                        <Check className="h-3.5 w-3.5 text-blue-400 shrink-0 mt-0.5" />
                        <span>{cap}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-6 pt-3 border-t border-white/[0.06] text-[10px] font-mono text-slate-400 flex items-center justify-between">
                  <span>Scope: Project &amp; Internship</span>
                  <span className="text-blue-400/90 font-medium">Active Interest</span>
                </div>
              </GlowCard>
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
}

export default FocusAreas;
