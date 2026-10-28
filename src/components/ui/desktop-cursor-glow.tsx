"use client";

import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export function DesktopCursorGlow() {
  const [isDesktop, setIsDesktop] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const mouseX = useMotionValue(-500);
  const mouseY = useMotionValue(-500);

  // Silky lagging spring for the ambient spotlight
  const springConfig = { damping: 32, stiffness: 180, mass: 0.6 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  useEffect(() => {
    // Only enable on desktop with fine pointer and no reduced-motion preference
    const mediaQuery = window.matchMedia(
      "(pointer: fine) and (hover: hover) and (prefers-reduced-motion: no-preference)"
    );

    const updateMedia = () => {
      setIsDesktop(mediaQuery.matches);
    };

    updateMedia();
    mediaQuery.addEventListener("change", updateMedia);

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      mediaQuery.removeEventListener("change", updateMedia);
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, [mouseX, mouseY, isVisible]);

  if (!isDesktop || !isVisible) return null;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[1] overflow-hidden select-none"
    >
      {/* Primary Ambient Sapphire/Navy Spotlight */}
      <motion.div
        style={{
          x: smoothX,
          y: smoothY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        className="w-[650px] h-[650px] rounded-full bg-[radial-gradient(circle,rgba(37,99,235,0.12)_0%,rgba(14,165,233,0.04)_40%,transparent_70%)] blur-2xl will-change-transform"
      />

      {/* Secondary Soft Core Glow */}
      <motion.div
        style={{
          x: mouseX,
          y: mouseY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        className="w-[280px] h-[280px] rounded-full bg-[radial-gradient(circle,rgba(96,165,250,0.09)_0%,transparent_65%)] blur-xl will-change-transform"
      />
    </div>
  );
}
