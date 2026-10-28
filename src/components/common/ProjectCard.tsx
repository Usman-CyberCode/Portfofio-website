"use client";

import React, { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ExternalLink, FolderGit2, ArrowUpRight, Clock, Code2, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { GithubIcon } from "@/components/ui/Icons";
import { BorderBeam } from "@/components/ui/border-beam";
import { Magnetic } from "@/components/ui/magnetic";
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
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const hasGithub = Boolean(project.githubUrl);
  const hasLive = Boolean(project.liveUrl);
  const fileName = fileMap[project.id] || `${project.id}.ts`;

  // 3D Perspective Tilt Motion Values
  const cardX = useMotionValue(0);
  const cardY = useMotionValue(0);
  const shineX = useMotionValue(0);
  const shineY = useMotionValue(0);

  const springConfig = { damping: 22, stiffness: 220, mass: 0.3 };
  const rotateX = useSpring(useTransform(cardY, [-0.5, 0.5], [8, -8]), springConfig);
  const rotateY = useSpring(useTransform(cardX, [-0.5, 0.5], [-8, 8]), springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;

    cardX.set(x);
    cardY.set(y);
    shineX.set(e.clientX - rect.left);
    shineY.set(e.clientY - rect.top);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    cardX.set(0);
    cardY.set(0);
  };

  const shineBackground = useTransform(
    [shineX, shineY],
    ([x, y]) =>
      `radial-gradient(circle 260px at ${x}px ${y}px, rgba(96, 165, 250, 0.12), transparent 80%)`
  );
  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        perspective: 1000,
        transformStyle: "preserve-3d",
      }}
      className="developer-panel relative rounded-2xl h-full flex flex-col justify-between group p-6 transition-all duration-300 hover:border-blue-500/40 overflow-hidden bg-[#070c18]/80"
    >
      {/* Specular Mouse-Following Glow / Shine Overlay */}
      {/* Specular Mouse-Following Glow / Shine Overlay */}
      <motion.div
        style={{
          background: shineBackground,
          opacity: isHovered ? 1 : 0,
        }}
        className="pointer-events-none absolute inset-0 z-10 transition-opacity"
      />
      {/* Featured Border Beam Effect in Deep Sapphire & Cyan */}
      {project.featured && (
        <BorderBeam
          size={180}
          duration={10}
          colorFrom="#3b82f6"
          colorTo="#38bdf8"
        />
      )}

      <div className="relative z-10">
        {/* Terminal Header Mockup with Image/Visual Zoom */}
        <div className="rounded-xl overflow-hidden mb-5 border border-white/[0.08] bg-[#050812] group/preview">
          {/* Terminal Window Controls Bar */}
          <div className="flex items-center justify-between px-3.5 py-2.5 bg-white/[0.03] border-b border-white/[0.06]">
            <div className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-red-500/70" />
              <span className="h-2 w-2 rounded-full bg-amber-500/70" />
              <span className="h-2 w-2 rounded-full bg-emerald-500/70" />
            </div>
            <span className="text-[11px] font-mono text-slate-400 truncate max-w-[180px]">
              {fileName}
            </span>
            <span className="text-[10px] font-mono text-blue-400 uppercase tracking-wider">
              {project.featured ? "Featured" : "Build"}
            </span>
          </div>

          {/* Terminal Preview Content Area with Smooth Inner Zoom on Hover */}
          <div className="p-4 flex items-center justify-between min-h-[96px] bg-gradient-to-b from-[#090e1c] to-[#04060d] overflow-hidden relative">
            <motion.div
              animate={{ scale: isHovered ? 1.05 : 1 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="flex items-center gap-3.5 w-full relative z-10"
            >
              <div className="p-3 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400 group-hover:bg-blue-500/20 group-hover:border-blue-400/40 transition-all duration-300">
                <FolderGit2 className="h-5 w-5" />
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-semibold text-white group-hover:text-blue-200 transition-colors">
                  {project.title}
                </span>
                <span className="text-[11px] font-mono text-slate-400">
                  {project.tagline || "Project Repository"}
                </span>
              </div>
            </motion.div>

            {/* Subtle background circuit pattern inside terminal */}
            <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none" />
          </div>
        </div>

        {/* Project Title & Category */}
        <div className="mb-3">
          <span className="text-[11px] font-mono text-blue-400 uppercase tracking-wider block mb-1">
            {project.tagline || "Application"}
          </span>
          <h3 className="text-lg font-bold text-white group-hover:text-blue-100 transition-colors">
            {project.title}
          </h3>
        </div>

        {/* Project Description */}
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-5">
          {project.description}
        </p>

        {/* Technologies List */}
        {project.technologies && project.technologies.length > 0 && (
          <div className="mb-6">
            <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block mb-2">
              Stack &bull; Concepts:
            </span>
            <div className="flex flex-wrap gap-1.5">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="text-[11px] font-mono py-1 px-2.5 rounded-lg bg-white/[0.03] border border-white/[0.08] text-slate-300 group-hover:border-blue-500/25 group-hover:text-slate-100 transition-colors"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Footer Action Links with Magnetic Button */}
      <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between gap-3 relative z-10">
        {hasGithub ? (
          <Magnetic strength={0.2} className="w-full">
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full block"
            >
              <Button
                variant="secondary"
                size="sm"
                className="w-full text-xs font-mono justify-between group/btn hover:border-blue-500/40 hover:text-white"
              >
                <span className="flex items-center gap-1.5">
                  <GithubIcon className="h-3.5 w-3.5" />
                  <span>Source Code</span>
                </span>
                <ArrowUpRight className="h-3.5 w-3.5 text-slate-400 group-hover/btn:text-blue-400 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
              </Button>
            </a>
          </Magnetic>
        ) : (
          <div className="w-full flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg border border-dashed border-white/10 bg-white/[0.02] text-xs text-slate-400 font-mono">
            <Clock className="h-3 w-3 text-slate-400" />
            <span>Repository link to be updated</span>
          </div>
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
                className="text-xs px-3.5 gap-1 font-mono"
              >
                <span>Demo</span>
                <ExternalLink className="h-3 w-3" />
              </Button>
            </a>
          </Magnetic>
        )}
      </div>
    </motion.div>
  );
}
