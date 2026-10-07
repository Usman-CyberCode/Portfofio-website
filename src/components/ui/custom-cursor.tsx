"use client";

import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring, useVelocity, useTransform } from "framer-motion";

export function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  // Exact cursor coordinates
  const mouseX = useMotionValue(-500);
  const mouseY = useMotionValue(-500);

  // Spring physics for responsive, fluid movement
  const springAura = { damping: 40, stiffness: 220, mass: 0.6 };
  const springRing = { damping: 25, stiffness: 380, mass: 0.2 };

  const auraX = useSpring(mouseX, springAura);
  const auraY = useSpring(mouseY, springAura);

  const ringX = useSpring(mouseX, springRing);
  const ringY = useSpring(mouseY, springRing);

  // Calculate 3D tilt based on velocity for physical inertia
  const velocityX = useVelocity(mouseX);
  const velocityY = useVelocity(mouseY);

  const tiltX = useTransform(velocityY, [-1500, 1500], [25, -25]);
  const tiltY = useTransform(velocityX, [-1500, 1500], [-25, 25]);

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
            "a, button, input, textarea, select, [role='button'], .cubie, .cubie-face, .cursor-pointer, .interactive-tile"
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
    <div
      className="pointer-events-none fixed inset-0 z-[99999] overflow-hidden select-none"
      aria-hidden="true"
    >
      {/* 1. Full-Screen Interactive 3D Ambient Light Aura (Illuminates UI softly across entire screen) */}
      <motion.div
        style={{
          x: auraX,
          y: auraY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        className="fixed top-0 left-0 w-[420px] h-[420px] rounded-full pointer-events-none opacity-40 mix-blend-screen"
      >
        <div className="w-full h-full rounded-full bg-gradient-to-tr from-orange-500/15 via-red-500/10 to-transparent blur-3xl" />
      </motion.div>

      {/* 2. 3D Floating Kinetic Inertia Ring */}
      <motion.div
        style={{
          x: ringX,
          y: ringY,
          translateX: "-50%",
          translateY: "-50%",
          rotateX: tiltX,
          rotateY: tiltY,
        }}
        animate={{
          scale: isClicked ? 0.75 : isHovered ? 2.1 : 1,
          borderColor: isHovered ? "rgba(249, 115, 22, 0.85)" : "rgba(255, 255, 255, 0.25)",
          boxShadow: isHovered
            ? "0 0 24px rgba(249, 115, 22, 0.4), inset 0 0 10px rgba(249, 115, 22, 0.2)"
            : "0 0 0px transparent",
        }}
        transition={{ duration: 0.18, ease: "easeOut" }}
        className="fixed top-0 left-0 w-8 h-8 rounded-full border border-white/25 backdrop-blur-[1px] transform-style-3d flex items-center justify-center"
      >
        {/* Subtle crosshairs or inner ticks when hovering interactive items */}
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-1.5 h-1.5 rounded-full bg-orange-400"
          />
        )}
      </motion.div>

      {/* 3. Precision Center Core Dot with Subtle Depth */}
      <motion.div
        style={{
          x: mouseX,
          y: mouseY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          scale: isHovered ? 0.4 : isClicked ? 1.4 : 1,
          backgroundColor: isHovered ? "#ff7a18" : "#ffffff",
          boxShadow: isHovered
            ? "0 0 14px rgba(249, 115, 22, 1)"
            : "0 0 8px rgba(255, 255, 255, 0.8)",
        }}
        transition={{ duration: 0.1, ease: "easeOut" }}
        className="fixed top-0 left-0 w-1.5 h-1.5 rounded-full bg-white shadow-sm"
      />
    </div>
  );
}

export default CustomCursor;
