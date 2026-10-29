"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion, AnimatePresence } from "framer-motion";
import {
  ExternalLink,
  ArrowUpRight,
  FolderGit2,
  Clock,
} from "lucide-react";
import { SubpageHeader } from "@/components/subpage/SubpageHeader";
import { Footer } from "@/components/common/Footer";
import { Button } from "@/components/ui/Button";
import { BorderBeam } from "@/components/ui/border-beam";
import { Magnetic } from "@/components/ui/magnetic";
import { GithubIcon } from "@/components/ui/Icons";
import { projectsData, personalData } from "@/data";
import { CosmicParallaxBg } from "@/components/ui/parallax-cosmic-background";

export default function AllWorkPage() {
  const shouldReduceMotion = useReducedMotion();
  const [activeFilter, setActiveFilter] = useState("all");

  const categories = [
    { id: "all", label: "All Projects" },
    { id: "web", label: "Frontend & Web" },
    { id: "state", label: "State Architecture" },
    { id: "cpp", label: "C++ Systems" },
  ];

  const filteredProjects = projectsData.filter((p) => {
    if (activeFilter === "all") return true;
    if (activeFilter === "web")
      return p.technologies?.some((t) =>
        ["Next.js", "React", "TypeScript", "JavaScript", "HTML", "Responsive Design"].some((k) =>
          t.includes(k)
        )
      );
    if (activeFilter === "state")
      return p.technologies?.some((t) => t.includes("Redux"));
    if (activeFilter === "cpp")
      return p.technologies?.some((t) => t.includes("C++"));
    return true;
  });

  const githubLink = personalData.socialLinks.find(
    (s) => s.platform.toLowerCase() === "github"
  );

  return (
    <div className="min-h-screen bg-[#050508] text-[#ebe8e5] relative overflow-hidden">
      {/* Background starfield & ambient glow */}
      <CosmicParallaxBg className="opacity-20" />

      {/* Atmospheric glows */}
      <div className="absolute top-1/4 -right-20 w-[600px] h-[550px] rounded-full bg-[radial-gradient(circle,rgba(168,85,247,0.12)_0%,transparent_70%)] blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/3 -left-20 w-[600px] h-[550px] rounded-full bg-[radial-gradient(circle,rgba(59,130,246,0.08)_0%,transparent_70%)] blur-3xl pointer-events-none" />

      <SubpageHeader
        badge="Engineering Portfolio"
        title="All Projects &amp;"
        serifAccent="Case Studies"
        description="Comprehensive catalogue of web applications, state containers, and C++ algorithmic software engineered during university studies, Saylani training, and hackathons."
        currentPath="/work"
      />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-28 relative z-10">
        {/* Category Filters */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-10 pb-6 border-b border-white/[0.06]">
          <div className="flex flex-wrap items-center gap-2">
            {categories.map((cat) => {
              const isActive = activeFilter === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveFilter(cat.id)}
                  type="button"
                  className={`text-xs font-mono py-1.5 px-4 rounded-full transition-all duration-200 cursor-pointer ${
                    isActive
                      ? "bg-purple-600/30 text-white border border-purple-400/50 shadow-[0_0_15px_rgba(168,85,247,0.3)] font-medium"
                      : "bg-white/[0.03] text-zinc-400 hover:text-white border border-white/[0.08] hover:border-white/20"
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>

          <span className="text-xs font-mono text-zinc-500">
            Showing {filteredProjects.length} of {projectsData.length} verified projects
          </span>
        </div>

        {/* Detailed Projects Grid */}
        <div className="space-y-12">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, idx) => {
              const hasGithub = Boolean(project.githubUrl);
              const hasLive = Boolean(project.liveUrl);

              return (
                <motion.article
                  layout
                  key={project.id}
                  initial={shouldReduceMotion ? {} : { opacity: 0, y: 35 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.55, delay: idx * 0.08 }}
                  className="rounded-2xl border border-white/[0.08] bg-[#070c18]/90 overflow-hidden relative shadow-[0_12px_40px_rgba(0,0,0,0.6)] group hover:border-purple-500/40 transition-colors duration-300"
                >
                  {project.featured && (
                    <BorderBeam
                      size={220}
                      duration={12}
                      colorFrom="#a855f7"
                      colorTo="#38bdf8"
                    />
                  )}

                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
                    {/* Visual Preview Graphic Side */}
                    <div className="lg:col-span-5 relative bg-[#04060d] border-b lg:border-b-0 lg:border-r border-white/[0.08] flex flex-col justify-between overflow-hidden">
                      {/* Window title bar */}
                      <div className="flex items-center justify-between px-4 py-3 bg-white/[0.02] border-b border-white/[0.06]">
                        <div className="flex items-center gap-1.5">
                          <span className="h-2.5 w-2.5 rounded-full bg-red-500/70" />
                          <span className="h-2.5 w-2.5 rounded-full bg-amber-500/70" />
                          <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/70" />
                        </div>
                        <span className="text-[11px] font-mono text-zinc-400 truncate max-w-[200px]">
                          {project.id}
                        </span>
                        <span className="text-[10px] font-mono text-purple-400 uppercase tracking-wider">
                          {project.featured ? "Featured Build" : "Project"}
                        </span>
                      </div>

                      {/* Image container with hover zoom */}
                      <div className="relative aspect-[16/10] w-full overflow-hidden">
                        {project.image ? (
                          <Image
                            src={project.image}
                            alt={`${project.title} Preview Graphic`}
                            fill
                            sizes="(max-width: 1024px) 100vw, 45vw"
                            className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#090e1c] to-[#04060d]">
                            <FolderGit2 className="h-8 w-8 text-purple-400" />
                          </div>
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-[#070c18] via-transparent to-transparent opacity-30 pointer-events-none" />
                      </div>

                      {/* Metrics strip at the bottom of the image */}
                      {project.metrics && (
                        <div className="grid grid-cols-3 divide-x divide-white/[0.06] border-t border-white/[0.06] bg-black/40 text-center py-2.5 px-2">
                          {project.metrics.map((m, mIdx) => (
                            <div key={mIdx} className="px-1">
                              <span className="text-[9px] font-mono uppercase tracking-wider text-zinc-500 block">
                                {m.label}
                              </span>
                              <span className="text-xs font-mono font-medium text-purple-300 block truncate">
                                {m.value}
                              </span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Detailed Content Side */}
                    <div className="lg:col-span-7 p-6 sm:p-8 flex flex-col justify-between">
                      <div>
                        {/* Tagline & Title */}
                        <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                          <span className="text-xs font-mono uppercase tracking-wider text-purple-400 font-medium">
                            {project.tagline || "Web Application"}
                          </span>
                          <span className="text-[11px] font-mono text-zinc-500">
                            ID: #{project.id}
                          </span>
                        </div>

                        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4 group-hover:text-purple-200 transition-colors">
                          {project.title}
                        </h2>

                        {/* Detailed Description */}
                        <p className="text-sm text-zinc-300 leading-relaxed mb-4">
                          {project.detailedDescription || project.description}
                        </p>

                        {/* Core Technologies */}
                        {project.technologies && (
                          <div className="mb-6">
                            <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-500 block mb-2">
                              Technologies &amp; Architecture:
                            </span>
                            <div className="flex flex-wrap gap-2">
                              {project.technologies.map((tech) => (
                                <span
                                  key={tech}
                                  className="text-xs font-mono py-1 px-3 rounded-lg bg-white/[0.03] border border-white/[0.08] text-zinc-300 group-hover:border-purple-500/25 group-hover:text-white transition-colors"
                                >
                                  {tech}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Action Links Bar */}
                      <div className="pt-5 border-t border-white/[0.08] flex flex-wrap items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                          {hasGithub ? (
                            <Magnetic strength={0.25}>
                              <a
                                href={project.githubUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                <Button
                                  variant="secondary"
                                  size="sm"
                                  className="gap-2 text-xs font-mono border-white/15 bg-white/[0.04] text-white hover:border-purple-400/50 hover:bg-purple-500/15"
                                >
                                  <GithubIcon className="h-3.5 w-3.5" />
                                  <span>View Repository</span>
                                  <ArrowUpRight className="h-3 w-3 text-purple-400" />
                                </Button>
                              </a>
                            </Magnetic>
                          ) : (
                            <span className="inline-flex items-center gap-1.5 text-xs font-mono text-zinc-400 py-1.5 px-3 rounded-lg border border-dashed border-white/10 bg-white/[0.02]">
                              <Clock className="h-3 w-3 text-purple-400" />
                              <span>Code repository update in progress</span>
                            </span>
                          )}

                          {hasLive && (
                            <Magnetic strength={0.25}>
                              <a
                                href={project.liveUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                <Button
                                  variant="default"
                                  size="sm"
                                  className="gap-1.5 text-xs font-mono bg-purple-600 hover:bg-purple-500 text-white"
                                >
                                  <span>Live Demo</span>
                                  <ExternalLink className="h-3 w-3" />
                                </Button>
                              </a>
                            </Magnetic>
                          )}
                        </div>

                        <span className="text-[11px] font-mono text-zinc-500">
                          {personalData.name} &bull; Verified Build
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Bottom GitHub CTA */}
        {githubLink && (
          <div className="mt-16 text-center pt-8 border-t border-white/[0.06]">
            <p className="text-xs font-mono text-zinc-400 mb-4">
              Looking for more repositories, open-source work, and code samples?
            </p>
            <Magnetic strength={0.25}>
              <a
                href={githubLink.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block"
              >
                <Button
                  variant="outline"
                  size="lg"
                  className="gap-2.5 text-xs font-mono border-white/15 hover:border-purple-500/50 hover:bg-purple-500/10 text-zinc-300 hover:text-white rounded-full px-6 py-3"
                >
                  <GithubIcon className="h-4 w-4" />
                  <span>Visit GitHub Profile (@Usman-CyberCode)</span>
                  <ArrowUpRight className="h-3.5 w-3.5 text-purple-400" />
                </Button>
              </a>
            </Magnetic>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}