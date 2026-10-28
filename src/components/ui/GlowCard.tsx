"use client";

import React, { useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface GlowCardProps extends React.HTMLAttributes<HTMLDivElement> {
  glowColor?: "blue" | "cyan" | "navy" | "subtle";
}

export function GlowCard({
  children,
  className,
  glowColor = "blue",
  ...props
}: GlowCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const glowStyles = {
    blue: "rgba(59, 130, 246, 0.16)",
    cyan: "rgba(56, 189, 248, 0.14)",
    navy: "rgba(37, 99, 235, 0.18)",
    subtle: "rgba(255, 255, 255, 0.08)",
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={cn(
        "group relative rounded-2xl border border-white/[0.08] bg-[#070c18]/80 p-6 backdrop-blur-xl transition-all duration-300 hover:border-blue-500/40 hover:shadow-2xl hover:shadow-blue-500/10 overflow-hidden",
        className
      )}
      {...props}
    >
      {/* Dynamic Cursor Spotlight Overlay */}
      <div
        className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: isHovered
            ? `radial-gradient(350px circle at ${mousePos.x}px ${mousePos.y}px, ${glowStyles[glowColor]}, transparent 70%)`
            : "none",
        }}
      />

      {/* Inner Content */}
      <div className="relative z-10">{children}</div>
    </div>
  );
}
