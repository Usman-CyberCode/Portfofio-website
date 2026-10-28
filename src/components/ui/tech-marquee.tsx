"use client";

import React from "react";
import {
  Code2,
  Cpu,
  Layers,
  Globe,
  Terminal,
  Database,
  GitBranch,
  Braces,
  Layout,
  Flame,
  Binary,
  CheckCircle2,
} from "lucide-react";

interface TechItem {
  name: string;
  category: string;
  icon: React.ElementType;
}

const technologies: TechItem[] = [
  { name: "C++", category: "Core Language", icon: Cpu },
  { name: "JavaScript (ES6+)", category: "Frontend & Scripting", icon: Code2 },
  { name: "TypeScript", category: "Type-Safe Development", icon: Braces },
  { name: "React", category: "UI Library", icon: Layout },
  { name: "Next.js", category: "Full-Stack Framework", icon: Globe },
  { name: "Redux / Redux Toolkit", category: "State Management", icon: Layers },
  { name: "Tailwind CSS", category: "Styling & Design Systems", icon: Layout },
  { name: "HTML5 & CSS3", category: "Web Standards", icon: Globe },
  { name: "Data Structures & Algorithms", category: "Problem Solving", icon: Binary },
  { name: "Object-Oriented Programming", category: "Software Architecture", icon: Terminal },
  { name: "Git & GitHub", category: "Version Control", icon: GitBranch },
  { name: "VS Code", category: "Development Environment", icon: Terminal },
  { name: "REST APIs", category: "Web Integration", icon: Database },
];

export function TechMarquee() {
  // Duplicate array twice to ensure seamless linear wrapping
  const marqueeItems = [...technologies, ...technologies];

  return (
    <div className="relative w-full py-10 overflow-hidden select-none border-y border-white/[0.06] bg-[#050914]/60 backdrop-blur-md">
      {/* Left and Right Fade Gradient Masks */}
      <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-24 sm:w-36 bg-gradient-to-r from-[#030509] to-transparent z-10" />
      <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-24 sm:w-36 bg-gradient-to-l from-[#030509] to-transparent z-10" />

      {/* Looping Marquee Track */}
      <div className="animate-marquee flex items-center gap-4">
        {marqueeItems.map((tech, idx) => {
          const Icon = tech.icon;
          return (
            <div
              key={`${tech.name}-${idx}`}
              className="flex items-center gap-3 px-4 py-2.5 rounded-full bg-white/[0.03] border border-white/[0.08] hover:border-blue-500/40 hover:bg-blue-500/[0.08] transition-all duration-300 group cursor-default shrink-0"
            >
              <div className="p-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 group-hover:scale-110 transition-transform">
                <Icon className="h-3.5 w-3.5" />
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-medium text-slate-200 group-hover:text-white transition-colors">
                  {tech.name}
                </span>
                <span className="text-[10px] font-mono text-slate-400 -mt-0.5">
                  {tech.category}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
