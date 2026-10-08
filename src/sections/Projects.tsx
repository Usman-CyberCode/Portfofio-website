"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, FolderGit2 } from "lucide-react";
import { SectionHeader } from "@/components/common/SectionHeader";
import { ProjectCard } from "@/components/common/ProjectCard";
import { Button } from "@/components/ui/Button";
import { GithubIcon } from "@/components/ui/Icons";
import { projectsData, personalData } from "@/data";
import { fadeInUp, staggerContainer } from "@/animations/motion";
import { CosmicParallaxBg } from "@/components/ui/parallax-cosmic-background";

export function Projects() {
  const githubLink = personalData.socialLinks.find(
    (s) => s.platform.toLowerCase() === "github"
  );

  return (
    <section id="projects" className="py-28 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* 1. Animated Cosmic Parallax Starfield & Ambient Glow Background */}
      <CosmicParallaxBg className="opacity-40" />

      {/* 2. Soft Dynamic Ambient Light Meshes */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-1/3 -right-20 w-[550px] h-[500px] rounded-full bg-gradient-to-bl from-orange-600/10 via-amber-600/5 to-transparent blur-3xl animate-ambient-drift [animation-delay:2s]" />
        <div className="absolute bottom-10 -left-20 w-[600px] h-[550px] rounded-full bg-gradient-to-tr from-red-600/8 via-orange-500/5 to-transparent blur-3xl animate-ambient-drift [animation-delay:6s]" />

        {/* Hollow Watermark Text Accent */}
        <div className="absolute top-12 left-6 lg:left-16 text-hollow-lg text-7xl sm:text-8xl md:text-9xl font-black select-none opacity-10">
          PROJECTS
        </div>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <SectionHeader
          badgeText="Project Showcase"
          title="Practical Work &"
          titleHighlight="Code Repositories"
          description="Featured builds demonstrating frontend architectures, Redux state containers, and C++ application logic."
        />

        {/* Dynamic Animated Grid Pattern */}
        <div className="absolute inset-0 bg-grid-pattern opacity-35 animate-grid-pulse" />

        {/* Hollow Watermark Text */}
        <div className="absolute top-12 left-6 lg:left-16 text-hollow-lg text-7xl sm:text-8xl md:text-9xl font-black select-none opacity-10">
          PROJECTS
        </div>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <SectionHeader
          badgeText="Project Showcase"
          title="Practical Work &"
          titleHighlight="Code Repositories"
          description="Featured builds demonstrating frontend architectures, Redux state containers, and C++ application logic."
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {projectsData.map((project) => (
            <motion.div key={project.id} variants={fadeInUp} className="flex">
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </motion.div>
      )}
      </div>
    </section>
  );
}
