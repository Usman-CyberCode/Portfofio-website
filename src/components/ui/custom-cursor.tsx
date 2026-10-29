"use client";

import React, { useEffect, useState, useRef, useSyncExternalStore } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  // Accessible touch & reduced motion detection
  const isTouchOrReduced = useSyncExternalStore(
    (callback) => {
      if (typeof window === "undefined") return () => {};
      const q1 = window.matchMedia("(pointer: coarse)");
      const q2 = window.matchMedia("(prefers-reduced-motion: reduce)");
      q1.addEventListener("change", callback);
      q2.addEventListener("change", callback);
      return () => {
        q1.removeEventListener("change", callback);
        q2.removeEventListener("change", callback);
      };
    },
    () =>
      typeof window !== "undefined" &&
      (window.matchMedia("(pointer: coarse)").matches ||
        window.matchMedia("(prefers-reduced-motion: reduce)").matches),
    () => false
  );

  // Raw mouse coordinates
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Velocity tracking for 3D attitude tilt (pure ref initialization)
  const prevPos = useRef({ x: -100, y: -100, time: 0 });
  const tiltX = useMotionValue(0);
  const tiltY = useMotionValue(0);

  // Primary smooth spring
  const springPrimary = { damping: 26, stiffness: 360, mass: 0.28 };
  const smoothX = useSpring(mouseX, springPrimary);
  const smoothY = useSpring(mouseY, springPrimary);

  // Secondary trailing lag spring for fluid 3D comet tail
  const springTrail = { damping: 30, stiffness: 220, mass: 0.45 };
  const trailX = useSpring(mouseX, springTrail);
  const trailY = useSpring(mouseY, springTrail);

  // Smooth springs for 3D tilt
  const smoothTiltX = useSpring(tiltX, { damping: 18, stiffness: 200 });
  const smoothTiltY = useSpring(tiltY, { damping: 18, stiffness: 200 });

  useEffect(() => {
    if (isTouchOrReduced) return;

    const handleMouseMove = (e: MouseEvent) => {
      const now = Date.now();
      const dt = Math.max(1, now - (prevPos.current.time || now));
      const vx = (e.clientX - prevPos.current.x) / dt;
      const vy = (e.clientY - prevPos.current.y) / dt;

      // Calculate 3D tilt angles based on velocity (clamped to [-35, 35] deg)
      const targetTiltY = Math.max(-35, Math.min(35, vx * 22));
      const targetTiltX = Math.max(-35, Math.min(35, -vy * 22));

      tiltY.set(targetTiltY);
      tiltX.set(targetTiltX);

      prevPos.current = { x: e.clientX, y: e.clientY, time: now };

      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);

      const target = e.target as HTMLElement | null;
      if (target) {
        const isInteractive = Boolean(
          target.closest(
            "a, button, input, textarea, select, [role='button'], .cursor-pointer"
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
  }, [mouseX, mouseY, tiltX, tiltY, isVisible, isTouchOrReduced]);

  if (isTouchOrReduced || !isVisible) return null;

  return (
    <div
      className="pointer-events-none fixed inset-0 z-[99999] overflow-hidden select-none"
      aria-hidden="true"
    >
      {/* 1. Fluid 3D Trailing Comet Aura (Lagging Node) */}
      <motion.div
        style={{
          x: trailX,
          y: trailY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        className="fixed top-0 left-0 w-10 h-10 rounded-full bg-gradient-to-tr from-blue-600/20 via-sky-500/15 to-transparent blur-md"
      />

      {/* 2. Gyroscopic 3D HUD Reticle with Attitude Tilt */}
      <motion.div
        style={{
          x: smoothX,
          y: smoothY,
          translateX: "-50%",
          translateY: "-50%",
          rotateX: smoothTiltX,
          rotateY: smoothTiltY,
          perspective: 800,
          transformStyle: "preserve-3d",
        }}
        animate={{
          scale: isClicked ? 0.75 : isHovered ? 1.75 : 1,
        }}
        transition={{ duration: 0.16, ease: "easeOut" }}
        className="fixed top-0 left-0 w-8 h-8 flex items-center justify-center"
      >
        {/* Outer Ring with Ambient Pulse */}
        <div
          className={`absolute inset-0 rounded-full border transition-colors duration-200 ${
            isHovered
              ? "border-blue-400/80 shadow-[0_0_16px_rgba(59,130,246,0.6)] bg-blue-500/10"
              : "border-white/25 bg-white/[0.02]"
          }`}
        />

        {/* Rotating Crosshair Ticks */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 10, ease: "linear" }}
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
        >
          <span
            className={`absolute top-0 w-1 h-[2px] rounded-full transition-colors ${
              isHovered ? "bg-blue-400" : "bg-white/40"
            }`}
          />
          <span
            className={`absolute bottom-0 w-1 h-[2px] rounded-full transition-colors ${
              isHovered ? "bg-blue-400" : "bg-white/40"
            }`}
          />
          <span
            className={`absolute left-0 h-1 w-[2px] rounded-full transition-colors ${
              isHovered ? "bg-blue-400" : "bg-white/40"
            }`}
          />
          <span
            className={`absolute right-0 h-1 w-[2px] rounded-full transition-colors ${
              isHovered ? "bg-blue-400" : "bg-white/40"
            }`}
          />
        </motion.div>
      </motion.div>

      {/* 3. Glowing Plasma Core */}
      <motion.div
        style={{
          x: mouseX,
          y: mouseY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          scale: isClicked ? 1.3 : isHovered ? 0.6 : 1,
        }}
        transition={{ duration: 0.1, ease: "easeOut" }}
        className="fixed top-0 left-0 flex items-center justify-center"
      >
        <div
          className={`w-2.5 h-2.5 rounded-full transition-all duration-150 ${
            isHovered
              ? "bg-gradient-to-r from-sky-400 to-blue-500 shadow-[0_0_12px_rgba(59,130,246,1)]"
              : "bg-white shadow-[0_0_8px_rgba(255,255,255,0.9),0_0_16px_rgba(59,130,246,0.7)]"
          }`}
        />
      </motion.div>

      {/* 4. Click Shockwave Wavefront */}
      {isClicked && (
        <motion.div
          initial={{ scale: 0.5, opacity: 0.9 }}
          animate={{ scale: 2.4, opacity: 0 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          style={{
            x: mouseX,
            y: mouseY,
            translateX: "-50%",
            translateY: "-50%",
          }}
          className="fixed top-0 left-0 w-8 h-8 rounded-full border border-blue-400/80 pointer-events-none"
        />
      )}
    </div>
  );
}

export default CustomCursor;
