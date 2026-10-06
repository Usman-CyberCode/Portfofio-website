"use client";

import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  // Exact cursor coordinates
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // High-performance smooth spring interpolation
  const springConfig = { damping: 28, stiffness: 350, mass: 0.35 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  useEffect(() => {
    // Disable on touch devices
    if (window.matchMedia("(pointer: coarse)").matches) {
      setIsTouchDevice(true);
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);

      const target = e.target as HTMLElement | null;
      if (target) {
        const isInteractive = Boolean(
          target.closest(
            "a, button, input, textarea, select, [role='button'], .cubie, .cubie-face, .cursor-pointer"
          )
        );
        setIsHovered(isInteractive);
      }
    };

    const handleMouseDown = () => setIsClicked(true);
    const handleMouseUp = () => setIsClicked(false);
    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, [mouseX, mouseY, isVisible]);

  if (isTouchDevice || !isVisible) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[99999] overflow-hidden">
      {/* 1. Fluid Trailing Ring with Magnetic Expansion */}
      <motion.div
        style={{
          x: smoothX,
          y: smoothY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          scale: isClicked ? 0.85 : isHovered ? 1.9 : 1,
          borderColor: isHovered
            ? "rgba(249, 115, 22, 0.7)"
            : "rgba(255, 255, 255, 0.22)",
          backgroundColor: isHovered
            ? "rgba(249, 115, 22, 0.08)"
            : "rgba(255, 255, 255, 0.02)",
        }}
        transition={{ duration: 0.16, ease: "easeOut" }}
        className="fixed top-0 left-0 w-8 h-8 rounded-full border border-white/20 backdrop-blur-[0.5px] transition-colors"
      />

      {/* 2. Precision Center Laser Dot */}
      <motion.div
        style={{
          x: mouseX,
          y: mouseY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          scale: isHovered ? 0.7 : 1,
          backgroundColor: isHovered ? "#ff7a18" : "#ffffff",
          boxShadow: isHovered
            ? "0 0 12px rgba(249, 115, 22, 0.9)"
            : "0 0 8px rgba(255, 255, 255, 0.7)",
        }}
        transition={{ duration: 0.1, ease: "easeOut" }}
        className="fixed top-0 left-0 w-1.5 h-1.5 rounded-full bg-white"
      />
    </div>
  );
}

export default CustomCursor;
