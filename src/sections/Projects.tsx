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

export function Projects() {
  const githubLink = personalData.socialLinks.find(
    (s) => s.platform.toLowerCase() === "github"
  );

  return (
    <section id="projects" className="py-28 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* 1. Dynamic Animated Motion Background (Not pure flat black) */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {/* Soft Radial Ambient Meshes with Drift Animation */}
        <div className="absolute top-1/3 -right-20 w-[550px] h-[500px] rounded-full bg-gradient-to-bl from-orange-600/10 via-amber-600/5 to-transparent blur-3xl animate-ambient-drift [animation-delay:2s]" />
        <div className="absolute bottom-10 -left-20 w-[600px] h-[550px] rounded-full bg-gradient-to-tr from-red-600/8 via-orange-500/5 to-transparent blur-3xl animate-ambient-drift [animation-delay:6s]" />

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

        {githubLink && (
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mt-12 text-center"
          >
            <a
              href={githubLink.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block"
            >
              <Button
                variant="outline"
                size="lg"
                className="gap-2.5 text-xs font-mono border-white/10 hover:border-orange-500/50 hover:bg-orange-500/10 text-zinc-300 hover:text-white group cursor-pointer"
              >
                <GithubIcon className="h-4 w-4" />
                <span>Explore All Repositories on GitHub</span>
                <ArrowUpRight className="h-3.5 w-3.5 text-orange-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </Button>
            </a>
          </motion.div>
        )}
      </div>
    </section>
  );
}
