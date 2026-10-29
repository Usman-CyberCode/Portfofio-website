"use client";

import React from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import {
  Code2,
  Layout,
  Layers,
  Globe,
  Sparkles,
  Check,
  Send,
  Workflow,
  ShieldCheck,
  Smartphone,
} from "lucide-react";
import { SubpageHeader } from "@/components/subpage/SubpageHeader";
import { Footer } from "@/components/common/Footer";
import { GlowCard } from "@/components/ui/GlowCard";
import { Button } from "@/components/ui/Button";
import { Magnetic } from "@/components/ui/magnetic";
import { focusAreasData, personalData } from "@/data";
import { CosmicParallaxBg } from "@/components/ui/parallax-cosmic-background";

const serviceIcons: Record<string, React.ElementType> = {
  code: Code2,
  layout: Layout,
  layers: Layers,
  globe: Globe,
  sparkles: Sparkles,
};

const workflowSteps = [
  {
    step: "01",
    title: "Requirements & Scope",
    description:
      "Clarifying user stories, target viewport constraints, and component requirements before writing code.",
    icon: Workflow,
  },
  {
    step: "02",
    title: "Semantic Architecture",
    description:
      "Constructing clean, accessible HTML5 document structure and organizing component hierarchies.",
    icon: Code2,
  },
  {
    step: "03",
    title: "Responsive Styling",
    description:
      "Implementing mobile-first layouts using CSS Flexbox, Grid, and Tailwind CSS with strict overflow prevention.",
    icon: Smartphone,
  },
  {
    step: "04",
    title: "Interaction & State",
    description:
      "Wiring reactive state (Redux / React hooks), smooth micro-animations, and full reduced-motion support.",
    icon: Sparkles,
  },
  {
    step: "05",
    title: "Quality & Delivery",
    description:
      "Running ESLint audits, TypeScript checks, multi-device viewport tests, and static build verifications.",
    icon: ShieldCheck,
  },
];

export default function ServicesPage() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="min-h-screen bg-[#050508] text-[#ebe8e5] relative overflow-hidden">
      {/* Background starfield & ambient glow */}
      <CosmicParallaxBg className="opacity-20" />

      <div className="absolute top-1/4 -right-20 w-[600px] h-[550px] rounded-full bg-[radial-gradient(circle,rgba(168,85,247,0.12)_0%,transparent_70%)] blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/3 -left-20 w-[600px] h-[550px] rounded-full bg-[radial-gradient(circle,rgba(59,130,246,0.08)_0%,transparent_70%)] blur-3xl pointer-events-none" />

      <SubpageHeader
        badge="Frontend Capabilities"
        title="Web Development"
        serifAccent="Services"
        description="Focused frontend engineering and interface development grounded in actual verified competencies: responsive layouts, clean code, state management, and website improvements."
        currentPath="/services"
      />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-28 relative z-10">
        {/* Core Services Section */}
        <div className="mb-20">
          <div className="mb-10 pb-4 border-b border-white/[0.08] flex flex-wrap items-center justify-between gap-4">
            <div>
              <span className="text-xs font-mono uppercase tracking-wider text-purple-400 block mb-1">
                Verified Skill Areas
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-white">
                What I Bring to Your Team
              </h2>
            </div>
            <span className="text-xs font-mono text-zinc-500">
              5 Dedicated Service Offerings
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {focusAreasData.map((service, idx) => {
              const Icon = service.icon ? serviceIcons[service.icon] || Code2 : Code2;

              return (
                <motion.div
                  key={service.id}
                  initial={
                    shouldReduceMotion
                      ? {}
                      : { opacity: 0, y: 35, filter: "blur(6px)" }
                  }
                  whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{
                    duration: 0.75,
                    delay: idx * 0.1,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="flex"
                >
                  <GlowCard
                    glowColor="navy"
                    className="w-full flex flex-col justify-between p-7 rounded-2xl bg-[#070c18]/85 border border-white/[0.08] hover:border-purple-500/40 transition-colors"
                  >
                    <div>
                      {/* Service Header */}
                      <div className="flex items-center justify-between mb-5">
                        <div className="p-3 rounded-xl bg-purple-500/10 border border-purple-500/25 text-purple-300 group-hover:scale-105 group-hover:bg-purple-500/20 transition-all duration-300">
                          <Icon className="h-5 w-5" />
                        </div>
                        <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider font-medium">
                          0{idx + 1} &bull; SERVICE
                        </span>
                      </div>

                      <h3 className="text-lg font-bold text-white mb-2 group-hover:text-purple-200 transition-colors">
                        {service.title}
                      </h3>

                      <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed mb-6">
                        {service.description}
                      </p>

                      {/* Capabilities Checklist */}
                      {service.capabilities && (
                        <div className="space-y-2.5 pt-4 border-t border-white/[0.06] mb-6">
                          <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-500 block">
                            Key Capabilities:
                          </span>
                          {service.capabilities.map((cap, cIdx) => (
                            <div
                              key={cIdx}
                              className="flex items-start gap-2 text-xs text-zinc-300"
                            >
                              <Check className="h-3.5 w-3.5 text-purple-400 shrink-0 mt-0.5" />
                              <span>{cap}</span>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Deliverables */}
                      {service.deliverables && (
                        <div className="space-y-2 pt-3 border-t border-white/[0.06]">
                          <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-500 block">
                            Deliverables:
                          </span>
                          {service.deliverables.map((deliv, dIdx) => (
                            <div
                              key={dIdx}
                              className="flex items-start gap-2 text-xs text-zinc-400 font-mono"
                            >
                              <span className="text-purple-400">&bull;</span>
                              <span>{deliv}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    <div className="mt-6 pt-4 border-t border-white/[0.06] flex items-center justify-between text-[11px] font-mono text-zinc-500">
                      <span>Junior Developer Scope</span>
                      <span className="text-purple-400 font-medium">Ready to Build</span>
                    </div>
                  </GlowCard>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Development Workflow / Process */}
        <div className="mb-20">
          <div className="mb-10 pb-4 border-b border-white/[0.08]">
            <span className="text-xs font-mono uppercase tracking-wider text-purple-400 block mb-1">
              Methodology
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              My Development Workflow
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {workflowSteps.map((step, sIdx) => (
              <motion.div
                key={step.step}
                initial={
                  shouldReduceMotion
                    ? {}
                    : { opacity: 0, y: 30 }
                }
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: sIdx * 0.08 }}
                className="p-5 rounded-xl bg-white/[0.02] border border-white/[0.06] hover:border-purple-500/30 transition-colors flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-lg font-mono font-bold text-purple-400">
                      {step.step}
                    </span>
                    <step.icon className="h-4 w-4 text-zinc-500" />
                  </div>
                  <h4 className="text-sm font-semibold text-white mb-2">
                    {step.title}
                  </h4>
                  <p className="text-xs text-zinc-400 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Contact / Internship Call to Action Banner */}
        <motion.div
          initial={shouldReduceMotion ? {} : { opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="p-8 sm:p-12 rounded-2xl bg-gradient-to-br from-[#0c1328] via-[#070b1a] to-[#04060d] border border-purple-500/30 relative overflow-hidden text-center"
        >
          <div className="relative z-10 max-w-2xl mx-auto">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono mb-4">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Internship Opportunities
            </span>

            <h3 className="text-2xl sm:text-4xl font-bold text-white mb-4">
              Need Frontend Assistance on Your Project?
            </h3>

            <p className="text-sm sm:text-base text-zinc-300 leading-relaxed mb-8">
              I am actively seeking a Web Development Internship where I can contribute to real-world codebases, implement pixel-perfect responsive layouts, and continuously learn from experienced senior engineers.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4">
              <Magnetic strength={0.25}>
                <Link href="/#contact">
                  <Button
                    variant="default"
                    size="lg"
                    className="gap-2 text-xs font-mono bg-purple-600 hover:bg-purple-500 text-white font-semibold px-7 py-3 rounded-full cursor-pointer shadow-[0_0_20px_rgba(168,85,247,0.35)]"
                  >
                    <Send className="h-3.5 w-3.5" />
                    <span>Send Project Inquiry</span>
                  </Button>
                </Link>
              </Magnetic>

              <Magnetic strength={0.25}>
                <a
                  href={`mailto:${personalData.email}`}
                  className="inline-block"
                >
                  <Button
                    variant="outline"
                    size="lg"
                    className="gap-2 text-xs font-mono border-white/15 hover:border-purple-500/50 hover:bg-purple-500/10 text-zinc-300 hover:text-white px-7 py-3 rounded-full"
                  >
                    <span>Direct: {personalData.email}</span>
                  </Button>
                </a>
              </Magnetic>
            </div>
          </div>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
}
