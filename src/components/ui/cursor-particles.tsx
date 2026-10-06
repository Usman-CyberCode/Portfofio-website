"use client";

import React, { useEffect, useRef } from "react";

export interface CursorParticlesProps {
  particleCount?: number;
  className?: string;
  particleColor?: string;
  backgroundColor?: string;
}

interface Particle {
  // Base anchor position (percentage 0..1 of canvas dimensions)
  anchorX: number;
  anchorY: number;
  // Current rendered position
  currentX: number;
  currentY: number;
  // Size, opacity, and glow attributes
  radius: number;
  baseAlpha: number;
  glowIntensity: number;
  // Motion parameters
  easeSpeed: number;
  movementStrength: number;
  floatSpeed: number;
  floatRadius: number;
  floatAngle: number;
  wavePhase: number;
}

export function CursorParticles({
  particleCount = 15,
  className = "",
  particleColor = "#ef4444",
  backgroundColor = "#000000",
}: CursorParticlesProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Store mutable animation state in refs to avoid React re-renders
  const mouseRef = useRef({
    x: -9999,
    y: -9999,
    isHovering: false,
    targetX: -9999,
    targetY: -9999,
  });

  const particlesRef = useRef<Particle[]>([]);
  const animationFrameRef = useRef<number | null>(null);
  const dimensionsRef = useRef({ width: 0, height: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Check for prefers-reduced-motion accessibility setting
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    // Initialize or resize canvas dimensions
    const updateDimensions = () => {
      const rect = container.getBoundingClientRect();
      const width = Math.max(rect.width, 1);
      const height = Math.max(rect.height, 1);
      const dpr = Math.min(window.devicePixelRatio || 1, 2);

      dimensionsRef.current = { width, height };

      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
    };

    updateDimensions();

    // Initialize particle data with varied visual and motion attributes
    const { width: initWidth, height: initHeight } = dimensionsRef.current;
    const particles: Particle[] = [];

    for (let i = 0; i < particleCount; i++) {
      // Distribute anchors evenly with natural organic jitter
      const col = i % 5;
      const row = Math.floor(i / 5);
      const gridX = (col + 0.5) / 5 + (Math.random() - 0.5) * 0.12;
      const gridY = (row + 0.5) / Math.max(Math.ceil(particleCount / 5), 1) + (Math.random() - 0.5) * 0.12;

      const anchorX = Math.min(Math.max(gridX, 0.08), 0.92);
      const anchorY = Math.min(Math.max(gridY, 0.08), 0.92);

      const posX = anchorX * initWidth;
      const posY = anchorY * initHeight;

      // Distance from center factor (0 in center, up to ~1 at edges)
      const distFromCenter = Math.hypot(anchorX - 0.5, anchorY - 0.5) * 2;

      particles.push({
        anchorX,
        anchorY,
        currentX: posX,
        currentY: posY,
        // Varied sizes (2px to 5.5px)
        radius: 2 + Math.random() * 3.5,
        // Varied opacity (subtle, 0.25 to 0.7)
        baseAlpha: 0.25 + Math.random() * 0.45,
        // Glow blur (8px to 22px)
        glowIntensity: 8 + Math.random() * 14,
        // Staggered easing speed (0.04 to 0.09)
        easeSpeed: 0.04 + Math.random() * 0.05,
        // Reaction strength depends on distance from center
        movementStrength: (0.7 + Math.random() * 0.8) * (1 + distFromCenter * 0.3),
        // Idle floating oscillation
        floatSpeed: 0.008 + Math.random() * 0.012,
        floatRadius: 8 + Math.random() * 14,
        floatAngle: Math.random() * Math.PI * 2,
        wavePhase: Math.random() * Math.PI * 2,
      });
    }

    particlesRef.current = particles;

    // Mouse & Touch interaction handlers
    const handlePointerMove = (clientX: number, clientY: number) => {
      const rect = container.getBoundingClientRect();
      const isInside =
        clientX >= rect.left &&
        clientX <= rect.right &&
        clientY >= rect.top &&
        clientY <= rect.bottom;

      if (isInside) {
        mouseRef.current.isHovering = true;
        mouseRef.current.targetX = clientX - rect.left;
        mouseRef.current.targetY = clientY - rect.top;
      } else {
        mouseRef.current.isHovering = false;
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      handlePointerMove(e.clientX, e.clientY);
    };

    const handleMouseLeave = () => {
      mouseRef.current.isHovering = false;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        handlePointerMove(e.touches[0].clientX, e.touches[0].clientY);
      }
    };

    const handleTouchEnd = () => {
      mouseRef.current.isHovering = false;
    };

    // Attach listeners
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mouseleave", handleMouseLeave, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: true });
    window.addEventListener("touchend", handleTouchEnd, { passive: true });

    // Handle container resize
    const resizeObserver = new ResizeObserver(() => {
      updateDimensions();
    });
    resizeObserver.observe(container);

    let time = 0;

    // Animation Render Loop via requestAnimationFrame
    const render = () => {
      time += 1;
      const { width, height } = dimensionsRef.current;

      ctx.clearRect(0, 0, width, height);

      // Smooth mouse position interpolation
      if (mouseRef.current.isHovering) {
        mouseRef.current.x +=
          (mouseRef.current.targetX - mouseRef.current.x) * 0.15;
        mouseRef.current.y +=
          (mouseRef.current.targetY - mouseRef.current.y) * 0.15;
      }

      const isMouseActive =
        mouseRef.current.isHovering && !prefersReducedMotion;
      const mouseX = mouseRef.current.x;
      const mouseY = mouseRef.current.y;

      const interactionRadius = Math.max(Math.min(width, height) * 0.38, 160);

      // Render & update each particle
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Base anchor position in current dimensions
        const basePosX = p.anchorX * width;
        const basePosY = p.anchorY * height;

        // Subtle idle floating movement
        let idleOffsetX = 0;
        let idleOffsetY = 0;

        if (!prefersReducedMotion) {
          p.floatAngle += p.floatSpeed;
          idleOffsetX = Math.cos(p.floatAngle + p.wavePhase) * p.floatRadius;
          idleOffsetY = Math.sin(p.floatAngle * 0.9 + p.wavePhase) * (p.floatRadius * 0.8);
        }

        let targetX = basePosX + idleOffsetX;
        let targetY = basePosY + idleOffsetY;

        // Mouse interaction: fluid distortion & attraction/repulsion
        if (isMouseActive) {
          const dx = (basePosX + idleOffsetX) - mouseX;
          const dy = (basePosY + idleOffsetY) - mouseY;
          const dist = Math.hypot(dx, dy);

          if (dist < interactionRadius && dist > 0.001) {
            const normDist = dist / interactionRadius;
            const influence = Math.pow(1 - normDist, 1.8);

            // Wave-like ripple distortion
            const wave = Math.sin(normDist * Math.PI * 3 - time * 0.06) * 14 * influence;
            const angle = Math.atan2(dy, dx);
            const perpAngle = angle + Math.PI / 2;

            // Repel if very close, fluid wave displacement at mid range
            const repelStrength = 45 * influence * p.movementStrength;
            const waveOffsetX = Math.cos(perpAngle) * wave;
            const waveOffsetY = Math.sin(perpAngle) * wave;

            targetX += Math.cos(angle) * repelStrength + waveOffsetX;
            targetY += Math.sin(angle) * repelStrength + waveOffsetY;
          }
        }

        // Smooth staggered movement (easing toward target)
        const ease = prefersReducedMotion ? 1 : p.easeSpeed;
        p.currentX += (targetX - p.currentX) * ease;
        p.currentY += (targetY - p.currentY) * ease;

        // Draw particle with glow
        ctx.save();
        ctx.shadowBlur = p.glowIntensity;
        ctx.shadowColor = particleColor;
        ctx.fillStyle = particleColor;
        ctx.globalAlpha = p.baseAlpha;

        ctx.beginPath();
        ctx.arc(p.currentX, p.currentY, p.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      animationFrameRef.current = window.requestAnimationFrame(render);
    };

    // Start animation loop
    animationFrameRef.current = window.requestAnimationFrame(render);

    // Cleanup all listeners and animation frame on unmount
    return () => {
      if (animationFrameRef.current !== null) {
        window.cancelAnimationFrame(animationFrameRef.current);
      }
      resizeObserver.disconnect();
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, [particleCount, particleColor, backgroundColor]);

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden pointer-events-none select-none ${className}`}
      style={{ backgroundColor }}
      aria-hidden="true"
    >
      <canvas
        ref={canvasRef}
        className="block pointer-events-none w-full h-full"
      />
    </div>
  );
}
