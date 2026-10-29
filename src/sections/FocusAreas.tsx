"use client";

import React from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { Code2, Layout, Layers, Globe, Sparkles, Check, ArrowRight } from "lucide-react";
import { SectionHeader } from "@/components/common/SectionHeader";
import { GlowCard } from "@/components/ui/GlowCard";
import { Button } from "@/components/ui/Button";
import { Magnetic } from "@/components/ui/magnetic";
import { focusAreasData } from "@/data";

const serviceIcons: Record<string, React.ElementType> = {
  code: Code2,
  layout: Layout,
  layers: Layers,
  globe: Globe,
  sparkles: Sparkles,
};

export function FocusAreas() {
  const shouldReduceMotion = useReducedMotion();

  // Show 3 featured services on the homepage
  const featuredServices = focusAreasData.filter((s) => s.highlighted).slice(0, 3);

  return (
    <section id="focus-areas" className="py-28 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto relative">
      {/* Background ambient lighting */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[750px] h-[400px] bg-[radial-gradient(ellipse,rgba(88,28,135,0.12)_0%,transparent_70%)] blur-3xl rounded-full"
      />

      {/* Reference-matching editorial split header */}
      <SectionHeader
        align="split"
        badgeText="Core Services"
        title="Services"
        serifAccent="Services"
        description="Focused frontend engineering and interface development tailored for web applications, portfolio builds, and internship contributions."
      />

      {/* Cards with distinct scroll reveal */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {featuredServices.map((item, idx) => {
          const Icon = item.icon ? serviceIcons[item.icon] || Code2 : Code2;

          return (
            <motion.div
              key={item.id}
              initial={
                shouldReduceMotion
                  ? {}
                  : { opacity: 0, y: 45, filter: "blur(6px)", scale: 0.96 }
              }
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)", scale: 1 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{
                duration: 0.8,
                delay: idx * 0.1,
                ease: [0.16, 1, 0.3, 1],
              }}
              whileHover={{ y: -6 }}
              className="flex"
            >
              <GlowCard glowColor="navy" className="w-full flex flex-col justify-between p-6">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-300 group-hover:scale-110 group-hover:bg-purple-500/20 transition-all duration-300">
                      <Icon className="h-5 w-5" />
                    </div>
                    <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider group-hover:text-purple-300 transition-colors">
                      0{idx + 1} &bull; SERVICE
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-[#ebe8e5] mb-2 group-hover:text-purple-200 transition-colors">
                    {item.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed mb-5">
                    {item.description}
                  </p>

                  <div className="space-y-2 pt-3 border-t border-white/[0.06]">
                    {item.capabilities?.map((cap, capIdx) => (
                      <div
                        key={capIdx}
                        className="flex items-start gap-2 text-xs text-zinc-300 group-hover:text-zinc-200 transition-colors"
                      >
                        <Check className="h-3.5 w-3.5 text-purple-400 shrink-0 mt-0.5" />
                        <span>{cap}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-6 pt-3 border-t border-white/[0.06] text-[10px] font-mono text-zinc-500 flex items-center justify-between">
                  <span>Scope: Web &amp; Internship</span>
                  <span className="text-purple-400/90 font-medium">Available</span>
                </div>
              </GlowCard>
            </motion.div>
          );
        })}
      </div>

      {/* Action: Prominent 'View All Services' button opening /services in a new tab */}
      <motion.div
        initial={shouldReduceMotion ? {} : { opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="mt-12 text-center"
      >
        <Magnetic strength={0.25}>
          <Link
            href="/services"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block"
          >
            <Button
              variant="outline"
              size="lg"
              className="gap-2.5 text-xs font-mono border-white/15 hover:border-purple-500/50 hover:bg-purple-500/10 text-zinc-300 hover:text-white group px-7 py-3 rounded-full cursor-pointer"
            >
              <Layers className="h-4 w-4 text-purple-400" />
              <span>View All Services</span>
              <ArrowRight className="h-3.5 w-3.5 text-purple-400 group-hover:translate-x-1 transition-transform duration-200" />
            </Button>
          </Link>
        </Magnetic>
      </motion.div>
    </section>
  );
}

export default FocusAreas;
