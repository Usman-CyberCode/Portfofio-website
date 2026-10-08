"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

// Custom authentic SVG icons matching the reference 3D mechanical keyboard image
const FigmaIcon = () => (
  <svg viewBox="0 0 38 57" className="w-5 h-5 sm:w-7 sm:h-7" fill="none">
    <path d="M19 28.5a9.5 9.5 0 1 1 19 0 9.5 9.5 0 0 1-19 0z" fill="#1ABCFE" />
    <path d="M0 47.5A9.5 9.5 0 0 1 9.5 38H19v9.5a9.5 9.5 0 1 1-19 0z" fill="#0ACF83" />
    <path d="M19 0v19h9.5a9.5 9.5 0 1 0 0-19H19z" fill="#FF7262" />
    <path d="M0 9.5A9.5 9.5 0 0 0 9.5 19H19V0H9.5A9.5 9.5 0 0 0 0 9.5z" fill="#F24E1E" />
    <path d="M0 28.5A9.5 9.5 0 0 0 9.5 38H19V19H9.5A9.5 9.5 0 0 0 0 28.5z" fill="#A259FF" />
  </svg>
);

const ReactIcon = () => (
  <svg viewBox="-11.5 -10.23 23 20.46" className="w-5 h-5 sm:w-7 sm:h-7" fill="none" stroke="#00d8ff" strokeWidth="1.3">
    <circle cx="0" cy="0" r="2.1" fill="#00d8ff" />
    <ellipse rx="11" ry="4.2" />
    <ellipse rx="11" ry="4.2" transform="rotate(60)" />
    <ellipse rx="11" ry="4.2" transform="rotate(120)" />
  </svg>
);

const NodeIcon = () => (
  <svg viewBox="0 0 32 32" className="w-5 h-5 sm:w-7 sm:h-7" fill="#539e43">
    <path d="M16 2.5l11.5 6.6v13.8L16 29.5 4.5 22.9V9.1L16 2.5zm-1 8v2.2c1.2-.5 2.2-.4 2.8.2.7.6.6 1.7-.1 2.3-.9.7-2.6 1.1-2.7 2.5v2.8h-2.3V10.5h2.3zm4.5 5.5c-.3 1.2-1.3 1.8-2.6 1.8v2.2c2.4 0 4.5-1.1 4.9-3.7.4-2.5-1.1-3.6-2.9-4.2-1.3-.4-2-.8-2-1.4 0-.6.5-1 1.4-1 .8 0 1.6.4 2 1.1l1.5-1.5C21 8.3 19.8 7.7 18.5 7.7c-2.3 0-3.9 1.4-3.9 3.5 0 2.2 1.5 3.1 3 3.6 1.4.5 1.9.9 1.9 1.2z" />
  </svg>
);

const TSIcon = () => (
  <svg viewBox="0 0 32 32" className="w-5 h-5 sm:w-7 sm:h-7" fill="none">
    <rect width="32" height="32" rx="4" fill="#3178c6" />
    <path d="M12.5 11h-7v2.2h2.3v9.3h2.4v-9.3h2.3V11zm4.1 8.5c.7.6 1.7 1 2.8 1 1.3 0 2-.6 2-1.4 0-1-.9-1.3-2.3-1.8-2-.7-3.4-1.7-3.4-3.5 0-2 1.7-3.4 4.1-3.4 1.5 0 2.8.5 3.6 1.2l-1 1.8c-.6-.5-1.5-.9-2.5-.9-1.2 0-1.8.5-1.8 1.2 0 .8.8 1.2 2.2 1.6 2.2.8 3.5 1.7 3.5 3.6 0 2.2-1.8 3.6-4.5 3.6-1.8 0-3.3-.6-4.3-1.5l1.6-1.9z" fill="#fff" />
  </svg>
);

const PythonIcon = () => (
  <svg viewBox="0 0 32 32" className="w-5 h-5 sm:w-7 sm:h-7">
    <path d="M15.9 3c-4.4 0-4.1 1.9-4.1 1.9l.01 2h4.2v.6H9.1S6 7.2 6 11.6s2.7 4.2 2.7 4.2h1.6v-2.3c0-1.7 1.4-3 3-3h5.2c1.4 0 2.5-1.1 2.5-2.5V4.9S20.3 3 15.9 3zm-2.4 1.5c.6 0 1 .4 1 1s-.4 1-1 1-1-.4-1-1 .4-1 1-1z" fill="#3776ab" />
    <path d="M16.1 29c4.4 0 4.1-1.9 4.1-1.9l-.01-2h-4.2v-.6h6.9s3.1.3 3.1-4.1-2.7-4.2-2.7-4.2h-1.6v2.3c0 1.7-1.4 3-3 3h-5.2c-1.4 0-2.5 1.1-2.5 2.5v3.1s.7 1.9 5.1 1.9zm2.4-1.5c-.6 0-1-.4-1-1s.4-1 1-1 1 .4 1 1-.4 1-1 1z" fill="#ffd43b" />
  </svg>
);

const TailwindIcon = () => (
  <svg viewBox="0 0 32 32" className="w-5 h-5 sm:w-7 sm:h-7" fill="#38bdf8">
    <path d="M9 13.5c1.5-3 3.8-4.5 6.8-4.5 4.5 0 6 3 8.3 3 1.5 0 3-.8 4.5-2.3-1.5 3-3.8 4.5-6.8 4.5-4.5 0-6-3-8.3-3-1.5 0-3 .8-4.5 2.3zm-6 6.8c1.5-3 3.8-4.5 6.8-4.5 4.5 0 6 3 8.3 3 1.5 0 3-.8 4.5-2.3-1.5 3-3.8 4.5-6.8 4.5-4.5 0-6-3-8.3-3-1.5 0-3 .8-4.5 2.3z" />
  </svg>
);

const NextjsIcon = () => (
  <svg viewBox="0 0 32 32" className="w-5 h-5 sm:w-7 sm:h-7" fill="none">
    <circle cx="16" cy="16" r="14.5" fill="#000" />
    <path d="M22.5 22.8L13.1 10.5H10.5V21.5H12.8V13.8L20.8 24.3c.6-.4 1.2-.9 1.7-1.5z" fill="#fff" />
    <path d="M20 10.5h2.3v6.5H20z" fill="#fff" />
  </svg>
);

const OpenAIIcon = () => (
  <svg viewBox="0 0 32 32" className="w-5 h-5 sm:w-7 sm:h-7" fill="#10a37f">
    <path d="M27.5 13.4c-.3-2.1-1.8-3.8-3.8-4.4-.5-.9-1.2-1.7-2.1-2.2-2.1-1.3-4.8-1-6.6.6-1.1-.5-2.4-.6-3.6-.3-2 .5-3.5 2.1-3.8 4.2-.9.5-1.7 1.2-2.2 2.1-1.3 2.1-1 4.8.6 6.6-.5 1.1-.6 2.4-.3 3.6.5 2 2.1 3.5 4.2 3.8.5.9 1.2 1.7 2.1 2.2 2.1 1.3 4.8 1 6.6-.6 1.1.5 2.4.6 3.6.3 2-.5 3.5-2.1 3.8-4.2.9-.5 1.7-1.2 2.2-2.1 1.3-2.1 1-4.8-.6-6.6.5-1.1.6-2.4.3-3.6zM16 19.5a3.5 3.5 0 1 1 0-7 3.5 3.5 0 0 1 0 7z" />
  </svg>
);

const MongoDBIcon = () => (
  <svg viewBox="0 0 32 32" className="w-5 h-5 sm:w-7 sm:h-7" fill="#13aa52">
    <path d="M15.9 2.5s-6.9 7.6-6.9 14.1c0 5.6 4.3 9.9 6.9 12.9 2.6-3 6.9-7.3 6.9-12.9 0-6.5-6.9-14.1-6.9-14.1zm.4 24.6V17.5c0-.2.2-.4.4-.4s.4.2.4.4v9.6c-1.3 1.8-2.3 2.9-2.3 2.9s.7-1.1 1.5-2.9z" />
  </svg>
);

const PostgresIcon = () => (
  <svg viewBox="0 0 32 32" className="w-5 h-5 sm:w-7 sm:h-7" fill="none" stroke="#336791" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 5c-5.2 0-9.2 4-9.2 9 0 6 5.2 11 9.2 13 4-2 9.2-7 9.2-13 0-5-4-9-9.2-9z" />
    <path d="M10.5 15.5c1.2-3.2 3.2-5.2 5.5-5.2s4.3 2 5.5 5.2" />
    <path d="M13 18.5c0 3 1.3 5.8 3 7.8 1.7-2 3-4.8 3-7.8" />
  </svg>
);

const GitIcon = () => (
  <svg viewBox="0 0 32 32" className="w-5 h-5 sm:w-7 sm:h-7" fill="#f05032">
    <path d="M28.4 13.9L18.1 3.6c-1.4-1.4-3.7-1.4-5.1 0l-2.6 2.6 3.3 3.3c.7-.2 1.5-.1 2 .5.6.6.7 1.5.3 2.2l3.2 3.2c.7-.4 1.6-.3 2.2.3.8.8.8 2.2 0 3-.8.8-2.2.8-3 0-.6-.6-.7-1.5-.3-2.2l-3-3v7.3c.2.2.4.5.4.9 0 1.2-1 2.2-2.2 2.2s-2.2-1-2.2-2.2c0-.9.5-1.6 1.3-2v-7.8c-.7-.4-1.3-1.1-1.3-2 0-.8.4-1.5 1-1.9L9 8.2 3.6 13.6c-1.4 1.4-1.4 3.7 0 5.1l10.3 10.3c1.4 1.4 3.7 1.4 5.1 0l9.4-9.4c1.4-1.4 1.4-3.7 0-5.7z" />
  </svg>
);

const DockerIcon = () => (
  <svg viewBox="0 0 32 32" className="w-5 h-5 sm:w-7 sm:h-7" fill="#2496ed">
    <path d="M29.5 14.8c-.7-.5-1.8-.7-2.8-.4-.3-.6-.8-1.2-1.5-1.5-.2-.1-.7-.3-1.3-.3-.2-1.7-1.5-2.6-1.5-2.6s-1.1 1.2-1.2 2.4h-9.9v-2.3h-3.2v2.3H5.7c-.5 0-1.8.3-2.7 1.4-.8 1-1 2.2-1 3.4 0 5.3 4.2 9.4 11.2 9.4 6.8 0 11.8-3.6 13.7-9.5.4 0 1.5-.1 2.6-.9.2-.2.3-.3.4-.5-.1-.1-.3-.3-.4-.4zM12 9.5h2.6v2.3H12V9.5zm-3.5 0h2.6v2.3H8.5V9.5zm7 0h2.6v2.3h-2.6V9.5zm3.5 0h2.6v2.3H19V9.5z" />
  </svg>
);

const GraphQLIcon = () => (
  <svg viewBox="0 0 32 32" className="w-5 h-5 sm:w-7 sm:h-7" fill="none">
    <path d="M16 4l10.4 6v12L16 28 5.6 22V10L16 4z" stroke="#e10098" strokeWidth="1.5" />
    <circle cx="16" cy="4" r="2.2" fill="#e10098" />
    <circle cx="26.4" cy="10" r="2.2" fill="#e10098" />
    <circle cx="26.4" cy="22" r="2.2" fill="#e10098" />
    <circle cx="16" cy="28" r="2.2" fill="#e10098" />
    <circle cx="5.6" cy="22" r="2.2" fill="#e10098" />
    <circle cx="5.6" cy="10" r="2.2" fill="#e10098" />
    <path d="M16 4v24M5.6 10l20.8 12M5.6 22L26.4 10" stroke="#e10098" strokeWidth="1" />
  </svg>
);

const WebpackIcon = () => (
  <svg viewBox="0 0 32 32" className="w-5 h-5 sm:w-7 sm:h-7" fill="none">
    <path d="M16 3l11 6.3v13.4L16 29 5 22.7V9.3L16 3z" stroke="#1d63ed" strokeWidth="1.6" fill="#eaf2fe" />
    <path d="M16 8.5l6.5 3.8v7.4L16 23.5l-6.5-3.8v-7.4L16 8.5z" fill="#1d63ed" />
  </svg>
);

const JSIcon = () => (
  <svg viewBox="0 0 32 32" className="w-5 h-5 sm:w-7 sm:h-7" fill="none">
    <rect width="32" height="32" rx="4" fill="#f7df1e" />
    <path d="M17.8 19.3c.5.8 1.1 1.4 2.2 1.4 1 0 1.6-.5 1.6-1.2 0-.8-.7-1.1-1.8-1.6l-.6-.3c-1.8-.8-3-1.8-3-3.8 0-1.9 1.5-3.3 3.8-3.3 1.6 0 2.8.6 3.6 2l-1.8 1.2c-.4-.7-.9-1-1.8-1-.8 0-1.3.5-1.3 1.1 0 .7.5 1 1.6 1.5l.6.3c2.1.9 3.3 1.9 3.3 4 0 2.3-1.8 3.5-4.2 3.5-2.3 0-3.8-1.1-4.5-2.6l2.4-1.2zm-7.6.2c.3.5.6.9 1.1 1.2.7.4 1.5.3 2 .1.3-.2.5-.5.5-1.6V11h2.7v8.3c0 1.9-.6 3.1-1.7 3.8-1.1.7-2.7.6-3.8.1-.9-.5-1.6-1.4-1.9-2.2l2.2-1.5z" fill="#000" />
  </svg>
);

interface KeyItem {
  id: string;
  name: string;
  Icon: React.FC;
  accent: "coral" | "white";
}

// Exactly the 15 keys shown in the user's reference image
const KEYS: KeyItem[] = [
  // ROW 1: Coral / Peach Keycaps
  { id: "figma", name: "Figma", Icon: FigmaIcon, accent: "coral" },
  { id: "react", name: "React", Icon: ReactIcon, accent: "coral" },
  { id: "node", name: "Node.js", Icon: NodeIcon, accent: "coral" },
  { id: "typescript", name: "TypeScript", Icon: TSIcon, accent: "coral" },
  { id: "python", name: "Python", Icon: PythonIcon, accent: "coral" },

  // ROW 2: Clean White / Cream Keycaps
  { id: "tailwind", name: "Tailwind", Icon: TailwindIcon, accent: "white" },
  { id: "nextjs", name: "Next.js", Icon: NextjsIcon, accent: "white" },
  { id: "openai", name: "OpenAI", Icon: OpenAIIcon, accent: "white" },
  { id: "mongodb", name: "MongoDB", Icon: MongoDBIcon, accent: "white" },
  { id: "postgres", name: "PostgreSQL", Icon: PostgresIcon, accent: "white" },

  // ROW 3: Clean White / Cream Keycaps
  { id: "git", name: "Git", Icon: GitIcon, accent: "white" },
  { id: "docker", name: "Docker", Icon: DockerIcon, accent: "white" },
  { id: "graphql", name: "GraphQL", Icon: GraphQLIcon, accent: "white" },
  { id: "webpack", name: "Webpack", Icon: WebpackIcon, accent: "white" },
  { id: "javascript", name: "JavaScript", Icon: JSIcon, accent: "white" },
];

export function TechnologyStack3D() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [pressedKey, setPressedKey] = useState<string | null>(null);
  const [hoveredKey, setHoveredKey] = useState<string | null>(null);
  const [reducedMotion, setReducedMotion] = useState(false);

  // Mouse tilt tracking
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth springs for mouse parallax
  const springConfig = { damping: 25, stiffness: 180, mass: 0.5 };
  const parallaxX = useSpring(useTransform(mouseY, [-0.5, 0.5], [6, -6]), springConfig);
  const parallaxY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-8, 8]), springConfig);

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
      className="relative w-full max-w-[640px] mx-auto py-10 select-none perspective-1200 px-3 sm:px-4"
      aria-label="Interactive 3D Mechanical Technology Keyboard matching reference"
    >
      {/* Directional Soft Drop Shadow */}
      <motion.div
        aria-hidden="true"
        animate={
          reducedMotion
            ? { opacity: 0.6 }
            : {
                scale: [0.94, 1.05, 0.94],
                opacity: [0.4, 0.65, 0.4],
              }
        }
        transition={{
          repeat: Infinity,
          duration: 8,
          ease: "easeInOut",
        }}
        className="pointer-events-none absolute inset-x-8 bottom-0 h-28 bg-gradient-to-tr from-black/80 via-black/60 to-transparent blur-3xl rounded-full translate-y-6"
      />

      {/* Continuously Rotating 3D Mechanical Keyboard Platform */}
      <motion.div
        style={{
          rotateX: parallaxX,
          rotateY: parallaxY,
          transformStyle: "preserve-3d",
        }}
        animate={
          reducedMotion
            ? {
                rotateX: 20,
                rotateY: -12,
                rotateZ: -2,
                y: 0,
              }
            : {
                rotateY: [-22, 22, -22],
                rotateX: [17, 27, 17],
                rotateZ: [-3, 3, -3],
                y: [-12, 12, -12],
              }
        }
        transition={{
          repeat: Infinity,
          duration: 8,
          ease: "easeInOut",
        }}
        className="relative rounded-[32px] sm:rounded-[40px] p-4 sm:p-7 bg-gradient-to-b from-[#e8e9ee] via-[#dadce3] to-[#b8bac4] border border-white/80 shadow-[0_45px_90px_-15px_rgba(0,0,0,0.85),inset_0_3px_6px_rgba(255,255,255,0.9)]"
      >
        {/* Physical 3D Chassis Base Extrusion (Thick 20px Rounded Tray) */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 -bottom-5 sm:-bottom-6 h-8 sm:h-9 rounded-b-[32px] sm:rounded-b-[40px] bg-gradient-to-b from-[#686c78] to-[#3a3c44] shadow-2xl border-b border-black/40"
          style={{ transform: "translateZ(-22px)" }}
        />

        {/* Recessed Tray Bed where keycaps sit */}
        <div
          className="relative rounded-[22px] sm:rounded-[28px] p-2.5 sm:p-4 bg-gradient-to-b from-[#b8bbc5] via-[#aaadb8] to-[#9a9da8] shadow-[inset_0_6px_16px_rgba(0,0,0,0.32)] border border-black/10"
          style={{ transformStyle: "preserve-3d" }}
        >
          {/* Keycaps Grid: 3 rows x 5 columns with Thick Chunky Mechanical Keys */}
          <div
            className="grid grid-cols-5 gap-2 sm:gap-3.5"
            style={{ transformStyle: "preserve-3d" }}
          >
            {KEYS.map((key) => {
              const Icon = key.Icon;
              const isCoral = key.accent === "coral";
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
                  whileHover={reducedMotion ? {} : { y: -5, scale: 1.03 }}
                  whileTap={{ y: 8, scale: 0.97 }}
                  className={`group relative aspect-[1/1.08] min-h-[66px] sm:min-h-[88px] rounded-xl sm:rounded-2xl flex flex-col items-center justify-center p-2 cursor-pointer transition-shadow duration-150 transform-style-3d ${
                    isCoral
                      ? "bg-gradient-to-b from-[#ffb294] via-[#fba27d] to-[#e4764b] border-t-2 border-white/90 text-white shadow-[0_12px_22px_-2px_rgba(228,118,75,0.45),0_6px_8px_rgba(0,0,0,0.25)]"
                      : "bg-gradient-to-b from-[#ffffff] via-[#f7f8fa] to-[#e1e3ea] border-t-2 border-white text-zinc-800 shadow-[0_12px_22px_-2px_rgba(0,0,0,0.35),0_6px_8px_rgba(0,0,0,0.2)]"
                  }`}
                  style={{
                    boxShadow: isPressed
                      ? "0 2px 4px rgba(0,0,0,0.5), inset 0 3px 6px rgba(0,0,0,0.35)"
                      : isHovered
                      ? isCoral
                        ? "0 18px 30px -2px rgba(228,118,75,0.65), 0 8px 12px rgba(0,0,0,0.35)"
                        : "0 18px 28px -2px rgba(0,0,0,0.45), 0 8px 12px rgba(0,0,0,0.25)"
                      : undefined,
                  }}
                >
                  {/* Thick 3D Sloping Keycap Extrusion (Motta 12px-14px Drop Side-Wall) */}
                  <div
                    aria-hidden="true"
                    className={`pointer-events-none absolute inset-x-0 -bottom-3 sm:-bottom-3.5 h-3 sm:h-3.5 rounded-b-xl sm:rounded-b-2xl border-t ${
                      isCoral
                        ? "bg-gradient-to-b from-[#c85a30] to-[#8d3b1b] border-[#f57b4b]"
                        : "bg-gradient-to-b from-[#a4a7b5] to-[#727582] border-[#cbcfde]"
                    }`}
                  />

                  {/* Top Key Face Inset Concave Bevel & Highlight */}
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-x-2 top-0.5 h-[1.5px] bg-white/85 rounded-full"
                  />

                  {/* Centered Large Tech Icon */}
                  <div className="flex items-center justify-center transition-transform duration-200 group-hover:scale-115">
                    <Icon />
                  </div>
                </motion.button>
              );
            })}
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default TechnologyStack3D;
