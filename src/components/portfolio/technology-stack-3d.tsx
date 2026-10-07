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
  Database,
  Binary,
  Workflow,
  Laptop,
} from "lucide-react";
import { GithubIcon } from "@/components/ui/Icons";

interface KeycapItem {
  id: string;
  name: string;
  sub: string;
  icon: React.ElementType;
  accent: "peach" | "white" | "dark";
  color?: string;
  symbol?: string;
}

// Exactly authentic technologies for Muhammad Usman Tahir arranged into a 3x5 mechanical macropad
const KEYCAP_DATA: KeycapItem[] = [
  // ROW 1: Peach / Warm-Orange Keycaps (matching top row in reference)
  {
    id: "cpp",
    name: "C++",
    sub: "Core DSA",
    icon: Cpu,
    accent: "peach",
    symbol: "C++",
  },
  {
    id: "react",
    name: "React",
    sub: "v19",
    icon: Atom,
    accent: "peach",
    symbol: "⚛",
  },
  {
    id: "nextjs",
    name: "Next.js",
    sub: "v16",
    icon: Globe2,
    accent: "peach",
    symbol: "▲",
  },
  {
    id: "ts",
    name: "TypeScript",
    sub: "Strict",
    icon: FileCode2,
    accent: "peach",
    symbol: "TS",
  },
  {
    id: "redux",
    name: "Redux",
    sub: "Toolkit",
    icon: Layers,
    accent: "peach",
    symbol: "RTK",
  },

  // ROW 2: Tactile Clean Off-White Sculpted Keys with Vibrant Logos
  {
    id: "js",
    name: "JavaScript",
    sub: "ES6+",
    icon: Code2,
    accent: "white",
    color: "#ca8a04",
    symbol: "JS",
  },
  {
    id: "html",
    name: "HTML5",
    sub: "Semantic",
    icon: Terminal,
    accent: "white",
    color: "#ea580c",
    symbol: "</>",
  },
  {
    id: "css",
    name: "CSS3",
    sub: "Tailwind",
    icon: Sparkles,
    accent: "white",
    color: "#0284c7",
    symbol: "#css",
  },
  {
    id: "git",
    name: "Git",
    sub: "VCS",
    icon: GitBranch,
    accent: "white",
    color: "#dc2626",
    symbol: "git",
  },
  {
    id: "github",
    name: "GitHub",
    sub: "Collab",
    icon: GithubIcon,
    accent: "white",
    color: "#18181b",
    symbol: "GH",
  },

  // ROW 3: Tactile Mechanical Base Keys
  {
    id: "dsa",
    name: "DSA Logic",
    sub: "Problem Solver",
    icon: Binary,
    accent: "white",
    color: "#f97316",
    symbol: "O(n)",
  },
  {
    id: "oop",
    name: "OOP C++",
    sub: "Pointers & Mem",
    icon: Database,
    accent: "white",
    color: "#2563eb",
    symbol: "class",
  },
  {
    id: "uaf",
    name: "UAF CS",
    sub: "5th Semester",
    icon: Laptop,
    accent: "white",
    color: "#16a34a",
    symbol: "BSCS",
  },
  {
    id: "saylani",
    name: "Saylani",
    sub: "Web Trainee",
    icon: Workflow,
    accent: "white",
    color: "#9333ea",
    symbol: "Web",
  },
  {
    id: "frontend",
    name: "Frontend",
    sub: "Responsive",
    icon: Sparkles,
    accent: "white",
    color: "#f59e0b",
    symbol: "UI",
  },
];

export function TechnologyStack3D() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [pressedKey, setPressedKey] = useState<string | null>(null);
  const [hoveredKey, setHoveredKey] = useState<string | null>(null);
  const [reducedMotion, setReducedMotion] = useState(false);

  // Mouse tilt tracking
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Spring physics for smooth 3D platform tilt
  const springConfig = { damping: 25, stiffness: 200, mass: 0.5 };
  // Natural isometric view inclination (approx 20 deg rotateX, -16 deg rotateY, -4 deg rotateZ)
  const baseRotateX = 22;
  const baseRotateY = -14;
  const baseRotateZ = -3;

  const tiltX = useSpring(useTransform(mouseY, [-0.5, 0.5], [baseRotateX + 8, baseRotateX - 8]), springConfig);
  const tiltY = useSpring(useTransform(mouseX, [-0.5, 0.5], [baseRotateY - 10, baseRotateY + 10]), springConfig);

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
      className="relative w-full max-w-[540px] mx-auto py-4 select-none perspective-1200"
      aria-label="Interactive 3D Mechanical Technology Keyboard"
    >
      {/* Soft warm shadow below entire keyboard */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-8 bottom-0 h-24 bg-black/60 blur-3xl rounded-full"
      />

      {/* 3D Mechanical Macropad Platform */}
      <motion.div
        style={{
          rotateX: reducedMotion ? baseRotateX : tiltX,
          rotateY: reducedMotion ? baseRotateY : tiltY,
          rotateZ: baseRotateZ,
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
        className="relative rounded-[28px] p-5 sm:p-6 bg-gradient-to-b from-[#d5d7de] via-[#c6c8d0] to-[#a3a6b2] border border-white/60 shadow-[0_35px_70px_-15px_rgba(0,0,0,0.85),inset_0_2px_4px_rgba(255,255,255,0.8)]"
      >
        {/* Physical 3D Chassis Base Lip (Extrusion depth matching Reference 1) */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 -bottom-4 h-6 rounded-b-[28px] bg-gradient-to-b from-[#7e8291] to-[#484b55] shadow-2xl"
          style={{ transform: "translateZ(-15px)" }}
        />

        {/* Recessed Keyplate Area */}
        <div
          className="relative rounded-2xl p-3 sm:p-4 bg-gradient-to-b from-[#b8bac4] to-[#a8abb6] shadow-[inset_0_4px_12px_rgba(0,0,0,0.25)] border border-black/10"
          style={{ transformStyle: "preserve-3d" }}
        >
          {/* Keycaps Grid: 3 rows x 5 columns */}
          <div
            className="grid grid-cols-5 gap-2 sm:gap-2.5"
            style={{ transformStyle: "preserve-3d" }}
          >
            {KEYCAP_DATA.map((key) => {
              const Icon = key.icon;
              const isPeach = key.accent === "peach";
              const isPressed = pressedKey === key.id;
              const isHovered = hoveredKey === key.id;

              return (
                <motion.button
                  key={key.id}
                  type="button"
                  onMouseEnter={() => setHoveredKey(key.id)}
                  onMouseLeave={() => setHoveredKey(null)}
                  onMouseDown={() => setPressedKey(key.id)}
                  onMouseUp={() => setPressedKey(null)}
                  whileHover={reducedMotion ? {} : { y: -4, scale: 1.02 }}
                  whileTap={{ y: 3, scale: 0.98 }}
                  className={`group relative aspect-[1/1.05] rounded-xl flex flex-col items-center justify-between p-1.5 sm:p-2 cursor-pointer transition-shadow duration-150 transform-style-3d ${
                    isPeach
                      ? "bg-gradient-to-b from-[#ffb494] via-[#ffa07a] to-[#f47a46] text-white border-t border-white/80"
                      : "bg-gradient-to-b from-[#ffffff] via-[#f7f7fa] to-[#e6e7ec] text-zinc-800 border-t border-white"
                  }`}
                  style={{
                    boxShadow: isPressed
                      ? "0 2px 4px rgba(0,0,0,0.4), inset 0 2px 4px rgba(0,0,0,0.3)"
                      : isHovered
                      ? isPeach
                        ? "0 14px 24px -2px rgba(244,122,70,0.55), 0 4px 8px rgba(0,0,0,0.3)"
                        : "0 14px 22px -2px rgba(0,0,0,0.45), 0 4px 8px rgba(0,0,0,0.25)"
                      : isPeach
                      ? "0 7px 14px -1px rgba(244,122,70,0.4), 0 4px 6px rgba(0,0,0,0.25)"
                      : "0 7px 12px -2px rgba(0,0,0,0.35), 0 3px 5px rgba(0,0,0,0.2)",
                  }}
                >
                  {/* Physical 3D Keycap Switch Side Extrusion (Underneath each keycap) */}
                  <div
                    aria-hidden="true"
                    className={`pointer-events-none absolute inset-x-0 -bottom-[5px] h-[5px] rounded-b-xl border-t ${
                      isPeach
                        ? "bg-[#c85526] border-[#e46430]"
                        : "bg-[#b0b3bf] border-[#cacedc]"
                    }`}
                  />

                  {/* Top Key Face Bevel Specular Line */}
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-x-1.5 top-0.5 h-[1px] bg-white/70 rounded-full"
                  />

                  {/* Keycap Center Logo / Icon */}
                  <div className="flex-1 flex items-center justify-center w-full pt-0.5">
                    <div
                      className={`transition-transform duration-200 group-hover:scale-110 flex items-center justify-center ${
                        isPeach ? "text-white" : ""
                      }`}
                      style={{ color: !isPeach ? key.color : undefined }}
                    >
                      <Icon className="w-4 h-4 sm:w-5 sm:h-5 drop-shadow-sm" />
                    </div>
                  </div>

                  {/* Keycap Bottom Label */}
                  <span
                    className={`text-[9px] sm:text-[10px] font-mono font-bold tracking-tight leading-none truncate max-w-full pb-0.5 ${
                      isPeach ? "text-white/95" : "text-zinc-700"
                    }`}
                  >
                    {key.name}
                  </span>
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* Chassis Front Telemetry & Brand Stamp matching Reference 1 */}
        <div className="mt-3 flex items-center justify-between text-[10px] font-mono text-zinc-700/80 px-2 font-semibold">
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-orange-600 animate-pulse" />
            <span>USMAN.KEYPAD_3D // 15 KEYS</span>
          </div>
          <span className="text-zinc-600">MECHANICAL TACTILE PROFILE</span>
        </div>
      </motion.div>
    </div>
  );
}

export default TechnologyStack3D;
