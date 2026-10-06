"use client";

import React from "react";
import { motion } from "framer-motion";
import { Code2, Layout, Layers, Globe, Sparkles, Check } from "lucide-react";
import { SectionHeader } from "@/components/common/SectionHeader";
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
    <section id="focus-areas" className="py-24 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto relative">
      <SectionHeader
        badgeText="Capabilities & Focus"
        title="What I Can Build &"
        titleHighlight="Areas I Work With"
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
              whileHover={{ y: -3 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="flex"
            >
              <div className="developer-panel rounded-2xl w-full flex flex-col justify-between p-6 hover:border-orange-500/40 transition-colors group">
                <div>
                  <div className="p-2.5 rounded-xl bg-orange-500/10 border border-orange-500/20 text-orange-400 w-fit mb-4 group-hover:scale-105 transition-transform">
                    <Icon className="h-5 w-5" />
                  </div>

                  <h3 className="text-base font-bold text-white mb-2 group-hover:text-orange-200 transition-colors">
                    {item.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed mb-5">
                    {item.description}
                  </p>

                  <div className="space-y-2 pt-2 border-t border-white/[0.06]">
                    {item.capabilities?.map((cap, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-2 text-xs text-zinc-300"
                      >
                        <Check className="h-3.5 w-3.5 text-orange-400 shrink-0 mt-0.5" />
                        <span>{cap}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-6 pt-3 border-t border-white/[0.06] text-[10px] font-mono text-zinc-400 flex items-center justify-between">
                  <span>Scope: Project &amp; Internship</span>
                  <span className="text-orange-400/80">Active Interest</span>
                </div>
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
}
