"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import {
  Code2,
  FileCode2,
  Terminal,
  Atom,
  Layers,
  GitBranch,
  Globe2,
  Cpu,
  Sparkles,
} from "lucide-react";
import { GithubIcon } from "@/components/ui/Icons";

interface TechItem {
  id: string;
  name: string;
  subtitle: string;
  category: "core" | "web" | "state" | "tool";
  accentColor: string;
  glowColor: string;
  icon: React.ElementType;
  tag: string;
  highlight?: boolean;
}

// Exactly the technologies from the user's authentic profile
const technologies: TechItem[] = [
  {
    id: "cpp",
    name: "C++",
    subtitle: "DSA & Problem Solving",
    category: "core",
    accentColor: "#f97316", // Primary orange accent
    glowColor: "rgba(249, 115, 22, 0.45)",
    icon: Cpu,
    tag: "Core Logic",
    highlight: true,
  },
  {
    id: "ts",
    name: "TypeScript",
    subtitle: "Type-Safe Architecture",
    category: "web",
    accentColor: "#3b82f6",
    glowColor: "rgba(59, 130, 246, 0.35)",
    icon: FileCode2,
    tag: "Frontend",
    highlight: true,
  },
  {
    id: "react",
    name: "React",
    subtitle: "Component Systems",
    category: "web",
    accentColor: "#06b6d4",
    glowColor: "rgba(6, 182, 212, 0.35)",
    icon: Atom,
    tag: "Library",
    highlight: true,
  },
  {
    id: "nextjs",
    name: "Next.js",
    subtitle: "SSR & Full-Stack",
    category: "web",
    accentColor: "#ffffff",
    glowColor: "rgba(255, 255, 255, 0.25)",
    icon: Globe2,
    tag: "Framework",
    highlight: true,
  },
  {
    id: "js",
    name: "JavaScript",
    subtitle: "Modern ES6+ Logic",
    category: "web",
    accentColor: "#eab308",
    glowColor: "rgba(234, 179, 8, 0.35)",
    icon: Code2,
    tag: "Language",
  },
  {
    id: "redux",
    name: "Redux",
    subtitle: "Predictable State",
    category: "state",
    accentColor: "#a855f7",
    glowColor: "rgba(168, 85, 247, 0.35)",
    icon: Layers,
    tag: "State Management",
    highlight: true,
  },
  {
    id: "html",
    name: "HTML5",
    subtitle: "Semantic Structure",
    category: "web",
    accentColor: "#f97316",
    glowColor: "rgba(249, 115, 22, 0.25)",
    icon: Terminal,
    tag: "Markup",
  },
  {
    id: "css",
    name: "CSS3",
    subtitle: "Responsive Styling",
    category: "web",
    accentColor: "#38bdf8",
    glowColor: "rgba(56, 189, 248, 0.25)",
    icon: Sparkles,
    tag: "Layout",
  },
  {
    id: "git",
    name: "Git",
    subtitle: "Version Control",
    category: "tool",
    accentColor: "#ef4444",
    glowColor: "rgba(239, 68, 68, 0.35)",
    icon: GitBranch,
    tag: "VCS",
  },
  {
    id: "github",
    name: "GitHub",
    subtitle: "Open Source Collab",
    category: "tool",
    accentColor: "#d4d4d8",
    glowColor: "rgba(212, 212, 216, 0.3)",
    icon: GithubIcon,
    tag: "Ecosystem",
  },
];

export function TechnologyStack3D() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [hoveredKey, setHoveredKey] = useState<string | null>(null);
  const [reducedMotion, setReducedMotion] = useState(false);

  // Motion values for smooth 3D tilt
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Spring physics for buttery-smooth platform inertia
  const springConfig = { damping: 24, stiffness: 220, mass: 0.4 };
  const smoothRotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [10, -10]), springConfig);
  const smoothRotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-12, 12]), springConfig);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mediaQuery.matches);

    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (reducedMotion || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    setHoveredKey(null);
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full max-w-[560px] mx-auto py-6 px-2 sm:px-4 select-none perspective-1000"
      aria-label="Interactive 3D Technology Stack Platform"
    >
      {/* Ambient background glow beneath platform */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-4 -bottom-6 rounded-full bg-gradient-to-tr from-orange-600/15 via-amber-500/10 to-red-600/10 blur-3xl opacity-70"
      />

      {/* Main 3D Floating Platform */}
      <motion.div
        style={{
          rotateX: reducedMotion ? 0 : smoothRotateX,
          rotateY: reducedMotion ? 0 : smoothRotateY,
          transformStyle: "preserve-3d",
        }}
        animate={
          reducedMotion
            ? { y: 0 }
            : {
                y: [-3, 3, -3],
                transition: {
                  repeat: Infinity,
                  duration: 6,
                  ease: "easeInOut",
                },
              }
        }
        className="relative rounded-3xl p-4 sm:p-6 bg-gradient-to-b from-[#161722]/90 via-[#0e0f16]/95 to-[#08080d]/98 border border-white/[0.08] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.85),0_0_20px_rgba(249,115,22,0.06)] backdrop-blur-xl"
      >
        {/* Subtle Platform Header Bar (Keyboard / Module chassis aesthetic) */}
        <div className="flex items-center justify-between pb-3.5 mb-4 border-b border-white/[0.06]">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-orange-500/80 shadow-[0_0_8px_rgba(249,115,22,0.8)] animate-pulse" />
            <span className="text-[11px] font-mono uppercase tracking-widest text-zinc-400 font-semibold">
              ENGINEERING_STACK.3D
            </span>
          </div>

          <div className="flex items-center gap-1.5 text-[10px] font-mono text-zinc-500">
            <span className="px-2 py-0.5 rounded bg-white/[0.03] border border-white/[0.05]">
              ACTIVE_KEYS: 10
            </span>
            <span className="hidden sm:inline-block px-2 py-0.5 rounded bg-white/[0.03] border border-white/[0.05] text-orange-400/90">
              PHYSICAL_BEVEL
            </span>
          </div>
        </div>

        {/* 3D Key Tiles Grid */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.04,
                delayChildren: 0.1,
              },
            },
          }}
          className="grid grid-cols-2 sm:grid-cols-5 gap-2.5 sm:gap-3"
          style={{ transformStyle: "preserve-3d" }}
        >
          {technologies.map((tech) => {
            const Icon = tech.icon;
            const isHovered = hoveredKey === tech.id;

            return (
              <motion.div
                key={tech.id}
                variants={{
                  hidden: { opacity: 0, y: 16, scale: 0.92 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    transition: {
                      type: "spring",
                      stiffness: 260,
                      damping: 20,
                    },
                  },
                }}
                onMouseEnter={() => setHoveredKey(tech.id)}
                onMouseLeave={() => setHoveredKey(null)}
                whileHover={
                  reducedMotion
                    ? {}
                    : {
                        y: -6,
                        scale: 1.03,
                        transition: { duration: 0.18, ease: "easeOut" },
                      }
                }
                whileTap={{ scale: 0.97 }}
                className={`group relative rounded-xl cursor-pointer p-3 sm:p-3.5 flex flex-col justify-between transition-all duration-200 transform-style-3d interactive-tile ${
                  tech.highlight
                    ? "bg-gradient-to-b from-[#1e202e] to-[#12131d] border border-white/[0.12]"
                    : "bg-gradient-to-b from-[#181924] to-[#0f1018] border border-white/[0.06]"
                }`}
                style={{
                  boxShadow: isHovered
                    ? `0 14px 28px -4px rgba(0,0,0,0.85), 0 0 20px ${tech.glowColor}, inset 0 1px 1px rgba(255,255,255,0.2)`
                    : "0 6px 14px -2px rgba(0,0,0,0.7), inset 0 1px 1px rgba(255,255,255,0.08)",
                }}
              >
                {/* Physical 3D Keycap Top Highlight (Slight bevel reflection) */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-x-1.5 top-0.5 h-[1.5px] rounded-full bg-gradient-to-r from-transparent via-white/25 to-transparent"
                />

                {/* Key Top Row: Category dot / tag & Icon */}
                <div className="flex items-center justify-between mb-2.5">
                  <span
                    className="w-1.5 h-1.5 rounded-full transition-transform duration-200 group-hover:scale-125"
                    style={{
                      backgroundColor: tech.accentColor,
                      boxShadow: isHovered ? `0 0 8px ${tech.accentColor}` : "none",
                    }}
                  />
                  <div
                    className="p-1.5 rounded-lg bg-black/40 border border-white/[0.05] text-zinc-300 transition-colors group-hover:text-white"
                    style={{
                      color: isHovered ? tech.accentColor : undefined,
                    }}
                  >
                    <Icon className="w-3.5 h-3.5" />
                  </div>
                </div>

                {/* Key Label & Info */}
                <div className="mt-1">
                  <div className="flex items-baseline justify-between gap-1">
                    <span className="text-xs sm:text-sm font-semibold tracking-tight text-white group-hover:text-white transition-colors block">
                      {tech.name}
                    </span>
                  </div>
                  <span className="text-[10px] font-mono text-zinc-400 block truncate group-hover:text-zinc-300 transition-colors mt-0.5">
                    {tech.subtitle}
                  </span>
                </div>

                {/* Bottom Mechanical Keycap Extrusion Rim (Tactile 3D Base) */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-x-0 -bottom-[3px] h-[3px] rounded-b-xl bg-black/80 border-t border-black/40"
                />
              </motion.div>
            );
          })}
        </motion.div>

        {/* Platform Bottom Telemetry Bar */}
        <div className="mt-5 pt-3.5 border-t border-white/[0.06] flex items-center justify-between text-[11px] font-mono text-zinc-400">
          <div className="flex items-center gap-2">
            <span className="text-zinc-500">SYSTEM:</span>
            <span className="text-zinc-300">REACT 19 &bull; NEXT.JS &bull; C++</span>
          </div>
          <div className="flex items-center gap-1.5 text-orange-400/90 font-medium">
            <span>&Delta; 3D_INTERACTIVE</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default TechnologyStack3D;
