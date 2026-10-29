"use client";

import React from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, ArrowRight, Layers } from "lucide-react";
import { SectionHeader } from "@/components/common/SectionHeader";
import { ProjectCard } from "@/components/common/ProjectCard";
import { Button } from "@/components/ui/Button";
import { Magnetic } from "@/components/ui/magnetic";
import { GithubIcon } from "@/components/ui/Icons";
import { projectsData, personalData } from "@/data";
import { CosmicParallaxBg } from "@/components/ui/parallax-cosmic-background";

export function Projects() {
  const shouldReduceMotion = useReducedMotion();
  const githubLink = personalData.socialLinks.find(
    (s) => s.platform.toLowerCase() === "github"
  );

  // Curated selection for the homepage: Workspace Manager, ATM Clone, and Redux Counter
  const curatedProjects = projectsData.filter((p) => p.featured || p.id === "atm-clone");

  return (
    <section id="projects" className="py-28 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* 1. Animated Cosmic Parallax Starfield & Ambient Glow Background */}
      <CosmicParallaxBg className="opacity-25" />

      {/* 2. Soft Dynamic Ambient Light Meshes in Deep Purple & Violet */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-1/3 -right-20 w-[600px] h-[500px] rounded-full bg-[radial-gradient(circle,rgba(88,28,135,0.18)_0%,transparent_70%)] blur-3xl" />
        <div className="absolute bottom-10 -left-20 w-[600px] h-[550px] rounded-full bg-[radial-gradient(circle,rgba(59,130,246,0.08)_0%,transparent_65%)] blur-3xl" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Reference-matching editorial split header */}
        <SectionHeader
          align="split"
          badgeText="Selected Works"
          title="Works"
          serifAccent="Works"
          description="Curated builds demonstrating hackathon frontend architectures, C++ system algorithms, and Redux state containers."
        />

        {/* Curated Project Cards with Staggered Scroll-Triggered Reveals */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {curatedProjects.map((project, idx) => (
            <motion.div
              key={project.id}
              initial={
                shouldReduceMotion
                  ? {}
                  : { opacity: 0, y: 45, filter: "blur(6px)", scale: 0.96 }
              }
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)", scale: 1 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{
                duration: 0.8,
                delay: idx * 0.12,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="flex"
            >
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </div>

        {/* Action Row: Prominent 'View All My Work' button opening /work in a new tab */}
        <motion.div
          initial={shouldReduceMotion ? {} : { opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.25 }}
          className="mt-14 flex flex-wrap items-center justify-center gap-4 text-center"
        >
          <Magnetic strength={0.25}>
            <Link
              href="/work"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block"
            >
              <Button
                variant="default"
                size="lg"
                className="gap-2.5 text-xs font-mono bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-semibold shadow-[0_0_24px_rgba(168,85,247,0.35)] px-7 py-3 rounded-full cursor-pointer group"
              >
                <Layers className="h-4 w-4 text-purple-200" />
                <span>View All My Work</span>
                <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform duration-200" />
              </Button>
            </Link>
          </Magnetic>

          {githubLink && (
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
                  className="gap-2.5 text-xs font-mono border-white/15 hover:border-purple-500/50 hover:bg-purple-500/10 text-zinc-300 hover:text-white group px-6 py-3 rounded-full"
                >
                  <GithubIcon className="h-4 w-4" />
                  <span>GitHub Profile</span>
                  <ArrowUpRight className="h-3.5 w-3.5 text-purple-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
                </Button>
              </a>
            </Magnetic>
          )}
        </motion.div>
      </div>
    </section>
  );
}

export default Projects;
