"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
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
          description="Crafted builds demonstrating frontend architectures, Redux state management, and C++ application logic."
        />

        {/* Project Cards with Staggered Scroll-Triggered Reveals */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projectsData.map((project, idx) => (
            <motion.div
              key={project.id}
              initial={
                shouldReduceMotion
                  ? {}
                  : { opacity: 0, y: 55, filter: "blur(6px)", scale: 0.95 }
              }
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)", scale: 1 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{
                duration: 0.85,
                delay: idx * 0.12,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="flex"
            >
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </div>

        {githubLink && (
          <motion.div
            initial={shouldReduceMotion ? {} : { opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mt-14 text-center"
          >
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
                  className="gap-2.5 text-xs font-mono border-white/15 hover:border-purple-500/50 hover:bg-purple-500/10 text-zinc-300 hover:text-white group px-6 py-2.5 rounded-full"
                >
                  <GithubIcon className="h-4 w-4" />
                  <span>View all works on GitHub</span>
                  <ArrowUpRight className="h-3.5 w-3.5 text-purple-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
                </Button>
              </a>
            </Magnetic>
          </motion.div>
        )}
      </div>
    </section>
  );
}

export default Projects;
