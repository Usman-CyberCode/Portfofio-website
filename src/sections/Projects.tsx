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
    <section id="projects" className="py-24 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto relative">
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
              className="gap-2.5 text-xs font-mono border-white/10 hover:border-orange-500/50 hover:bg-orange-500/10 text-zinc-300 hover:text-white group"
            >
              <GithubIcon className="h-4 w-4" />
              <span>Explore All Repositories on GitHub</span>
              <ArrowUpRight className="h-3.5 w-3.5 text-orange-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Button>
          </a>
        </motion.div>
      )}
    </section>
  );
}
