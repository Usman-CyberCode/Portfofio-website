"use client";

import React from "react";
import { motion } from "framer-motion";
import { ExternalLink, FolderGit2, ArrowUpRight, Clock } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { GithubIcon } from "@/components/ui/Icons";
import { BorderBeam } from "@/components/ui/border-beam";
import { Project } from "@/types";

interface ProjectCardProps {
  project: Project;
}

const fileMap: Record<string, string> = {
  "workspace-manager-hackathon": "workspace-manager/App.tsx",
  "redux-counter": "redux-counter/store.ts",
  "atm-clone": "atm-clone/main.cpp",
  "personal-portfolio-website": "portfolio/src/app/page.tsx",
  "todo-list-app": "todo-app/index.js",
};

export function ProjectCard({ project }: ProjectCardProps) {
  const hasGithub = Boolean(project.githubUrl);
  const hasLive = Boolean(project.liveUrl);
  const fileName = fileMap[project.id] || `${project.id}.ts`;

  return (
    <motion.div
      whileHover={{ y: -3 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className="developer-panel relative rounded-2xl h-full flex flex-col justify-between group p-6 transition-colors duration-200 hover:border-orange-500/40 overflow-hidden"
    >
      {/* Featured Border Beam Effect */}
      {project.featured && (
        <BorderBeam
          size={160}
          duration={12}
          colorFrom="#ff7a18"
          colorTo="#ef4444"
        />
      )}

      <div>
        {/* Terminal Header Mockup */}
        <div className="rounded-xl overflow-hidden mb-5 border border-white/[0.08] bg-[#09090d]">
          {/* Terminal Window Controls Bar */}
          <div className="flex items-center justify-between px-3.5 py-2.5 bg-white/[0.03] border-b border-white/[0.06]">
            <div className="flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-red-500/60" />
              <span className="h-2.5 w-2.5 rounded-full bg-amber-500/60" />
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/60" />
            </div>
            <span className="text-[11px] font-mono text-zinc-400 truncate max-w-[200px]">
              {fileName}
            </span>
            <span className="text-[10px] font-mono text-orange-400/80 uppercase">
              {project.featured ? "Featured" : "Build"}
            </span>
          </div>

          {/* Terminal Preview Content Area */}
          <div className="p-4 flex items-center justify-between min-h-[90px] bg-gradient-to-b from-transparent to-black/40">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-lg bg-orange-500/10 border border-orange-500/20 text-orange-400 group-hover:scale-105 transition-transform">
                <FolderGit2 className="h-5 w-5" />
              </div>
              <div>
                <span className="text-xs font-semibold text-white group-hover:text-orange-300 transition-colors block">
                  {project.title}
                </span>
                <span className="text-[11px] font-mono text-zinc-400">
                  {project.tagline || "Project Repository"}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Project Title & Category */}
        <div className="mb-2.5">
          <span className="text-[11px] font-mono text-orange-400 uppercase tracking-wider block mb-1">
            {project.tagline || "Application"}
          </span>
          <h3 className="text-lg font-bold text-white group-hover:text-orange-200 transition-colors">
            {project.title}
          </h3>
        </div>

        {/* Project Description */}
        <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed mb-5">
          {project.description}
        </p>

        {/* Technologies List */}
        {project.technologies && project.technologies.length > 0 && (
          <div className="mb-5">
            <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-400 block mb-2">
              Stack &bull; Concepts:
            </span>
            <div className="flex flex-wrap gap-1.5">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="text-[11px] font-mono py-0.5 px-2 rounded bg-white/[0.03] border border-white/[0.08] text-zinc-300"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Footer Action Links */}
      <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between gap-3">
        {hasGithub ? (
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full"
          >
            <Button
              variant="secondary"
              size="sm"
              className="w-full text-xs font-mono justify-between group/btn hover:border-orange-500/40 hover:text-white"
            >
              <span className="flex items-center gap-1.5">
                <GithubIcon className="h-3.5 w-3.5" />
                <span>Source Code</span>
              </span>
              <ArrowUpRight className="h-3.5 w-3.5 text-zinc-400 group-hover/btn:text-orange-400 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
            </Button>
          </a>
        ) : (
          <div className="w-full flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg border border-dashed border-white/10 bg-white/[0.02] text-xs text-zinc-400 font-mono">
            <Clock className="h-3 w-3 text-zinc-400" />
            <span>Repository link to be updated</span>
          </div>
        )}

        {hasLive && (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button
              variant="default"
              size="sm"
              className="text-xs px-3 gap-1 font-mono"
            >
              <span>Demo</span>
              <ExternalLink className="h-3 w-3" />
            </Button>
          </a>
        )}
      </div>
    </motion.div>
  );
}
