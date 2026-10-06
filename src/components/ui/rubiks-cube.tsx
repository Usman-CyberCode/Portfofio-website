"use client";

import React, { useEffect, useRef, useState } from "react";
import { Play, RotateCw, CheckCircle2, Sparkles, Move } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { cn } from "@/lib/utils";

interface RubiksCubeProps {
  className?: string;
  autoStartSolve?: boolean;
}

const CUBIE_PX = 58;
const HALF_PX = 29;
const STEP_PX = 58;

const FC = {
  front: { bg: "#009B48", cls: "fc-green" },
  back: { bg: "#0051A2", cls: "fc-blue" },
  right: { bg: "#C41E3A", cls: "fc-red" },
  left: { bg: "#FF5800", cls: "fc-orange" },
  top: { bg: "#FFFFFF", cls: "fc-white" },
  bottom: { bg: "#FFD500", cls: "fc-yellow" },
  inner: { bg: "#111116", cls: "fc-inner" },
};

const FACE_DEFS = [
  { key: "front", t: `translateZ(${HALF_PX}px)` },
  { key: "back", t: `rotateY(180deg) translateZ(${HALF_PX}px)` },
  { key: "right", t: `rotateY(90deg) translateZ(${HALF_PX}px)` },
  { key: "left", t: `rotateY(-90deg) translateZ(${HALF_PX}px)` },
  { key: "top", t: `rotateX(90deg) translateZ(${HALF_PX}px)` },
  { key: "bottom", t: `rotateX(-90deg) translateZ(${HALF_PX}px)` },
];

const MOVES = [
  { axis: "y", slice: 1, angle: 90 },
  { axis: "y", slice: 1, angle: -90 },
  { axis: "y", slice: 0, angle: 90 },
  { axis: "y", slice: 0, angle: -90 },
  { axis: "y", slice: -1, angle: 90 },
  { axis: "y", slice: -1, angle: -90 },
  { axis: "x", slice: 1, angle: 90 },
  { axis: "x", slice: 1, angle: -90 },
  { axis: "x", slice: 0, angle: 90 },
  { axis: "x", slice: 0, angle: -90 },
  { axis: "x", slice: -1, angle: 90 },
  { axis: "x", slice: -1, angle: -90 },
  { axis: "z", slice: 1, angle: 90 },
  { axis: "z", slice: 1, angle: -90 },
  { axis: "z", slice: -1, angle: 90 },
  { axis: "z", slice: -1, angle: -90 },
];

export function RubiksCube3D({ className, autoStartSolve = true }: RubiksCubeProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<HTMLDivElement>(null);

  const [status, setStatus] = useState("Solved! ✓");
  const [isBusy, setIsBusy] = useState(false);
  const [historyCount, setHistoryCount] = useState(0);

  // References to keep mutable state across async closures without re-renders
  const stateRef = useRef({
    cubies: [] as { el: HTMLDivElement; m: DOMMatrix }[],
    history: [] as typeof MOVES,
    busy: false,
    manualMode: false,
    manualTimer: null as any,
    animFrame: null as number | null,
    mounted: true,
  });

  useEffect(() => {
    stateRef.current.mounted = true;
    const scene = sceneRef.current;
    const viewport = viewportRef.current;
    if (!scene || !viewport) return;

    // Helper: Snap matrix to whole coordinates
    const snap = (m: DOMMatrix) => {
      m.m41 = Math.round(m.m41 / STEP_PX) * STEP_PX;
      m.m42 = Math.round(m.m42 / STEP_PX) * STEP_PX;
      m.m43 = Math.round(m.m43 / STEP_PX) * STEP_PX;

      (["m11", "m12", "m13", "m21", "m22", "m23", "m31", "m32", "m33"] as const).forEach(
        (f) => {
          if (Math.abs(m[f]) < 0.1) m[f] = 0;
          else m[f] = Math.sign(m[f]);
        }
      );
    };

    // Helper: Make single cubie
    const makeCubie = (lx: number, ly: number, lz: number) => {
      const el = document.createElement("div");
      el.className = "cubie";
      el.style.cssText = `position:absolute;width:${CUBIE_PX}px;height:${CUBIE_PX}px;margin:-${HALF_PX}px 0 0 -${HALF_PX}px;transform-style:preserve-3d;`;

      FACE_DEFS.forEach((fd) => {
        let fc = FC.inner;
        if (fd.key === "front" && lz === 1) fc = FC.front;
        if (fd.key === "back" && lz === -1) fc = FC.back;
        if (fd.key === "right" && lx === 1) fc = FC.right;
        if (fd.key === "left" && lx === -1) fc = FC.left;
        if (fd.key === "top" && ly === 1) fc = FC.top;
        if (fd.key === "bottom" && ly === -1) fc = FC.bottom;

        const face = document.createElement("div");
        face.className = `cubie-face ${fc.cls}`;
        face.style.cssText = `position:absolute;width:${CUBIE_PX}px;height:${CUBIE_PX}px;border-radius:8px;border:2.5px solid #050505;backface-visibility:visible;transform:${fd.t}${
          fc === FC.inner ? " scale(0.98)" : ""
        };`;

        if (fc !== FC.inner) {
          face.style.backgroundColor = fc.bg;
          face.innerHTML =
            '<div class="gloss absolute inset-0 rounded-[5px] pointer-events-none" style="background:linear-gradient(135deg, rgba(255,255,255,0.25) 0%, transparent 50%);"></div>';
        } else {
          face.style.backgroundColor = "#0d0d12";
          face.style.borderColor = "transparent";
          face.style.opacity = "0";
        }
        el.appendChild(face);
      });

      const m = new DOMMatrix().translate(lx * STEP_PX, -ly * STEP_PX, lz * STEP_PX);
      el.style.transform = m.toString();
      return { el, m };
    };

    // Build the 27-cubie Rubik's system
    scene.innerHTML = "";
    stateRef.current.cubies = [];

    for (let y = 1; y >= -1; y--) {
      for (let x = -1; x <= 1; x++) {
        for (let z = 1; z >= -1; z--) {
          const c = makeCubie(x, y, z);
          scene.appendChild(c.el);
          stateRef.current.cubies.push(c);
        }
      }
    }

    // ── Drag & Inertia 3D Physics ─────────────────────────────────────
    let rotX = -20,
      rotY = 40;
    let velX = 0,
      velY = 0;
    let dragging = false,
      lx2 = 0,
      ly2 = 0;
    let lastDx = 0,
      lastDy = 0;

    const applyRot = () => {
      if (!scene) return;
      scene.style.transform = `rotateX(${rotX}deg) rotateY(${rotY}deg)`;
    };

    const animRot = () => {
      if (!stateRef.current.mounted) return;
      if (!dragging) {
        velY *= 0.92;
        velX *= 0.92;
        if (!stateRef.current.manualMode && !stateRef.current.busy) {
          velY += (0.22 - velY) * 0.02;
          velX += (0 - velX) * 0.02;
        }
        rotY += velY;
        rotX += velX;
        rotX = Math.max(-65, Math.min(65, rotX));
      }
      applyRot();
      stateRef.current.animFrame = requestAnimationFrame(animRot);
    };

    stateRef.current.animFrame = requestAnimationFrame(animRot);

    // Mouse handlers
    const onMouseDown = (e: MouseEvent) => {
      dragging = true;
      lx2 = e.clientX;
      ly2 = e.clientY;
      velX = 0;
      velY = 0;
      lastDx = 0;
      lastDy = 0;
      stateRef.current.manualMode = true;
      clearTimeout(stateRef.current.manualTimer);
      e.preventDefault();
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!dragging) return;
      lastDx = (e.clientX - lx2) * 0.45;
      lastDy = (e.clientY - ly2) * 0.45;
      rotY += lastDx;
      rotX -= lastDy;
      rotX = Math.max(-65, Math.min(65, rotX));
      lx2 = e.clientX;
      ly2 = e.clientY;
    };

    const onMouseUp = () => {
      if (!dragging) return;
      dragging = false;
      velY = lastDx * 0.85;
      velX = -lastDy * 0.85;
      stateRef.current.manualTimer = setTimeout(() => {
        stateRef.current.manualMode = false;
      }, 7000);
    };

    // Touch handlers
    const onTouchStart = (e: TouchEvent) => {
      if (!e.touches[0]) return;
      dragging = true;
      lx2 = e.touches[0].clientX;
      ly2 = e.touches[0].clientY;
      velX = 0;
      velY = 0;
      lastDx = 0;
      lastDy = 0;
      stateRef.current.manualMode = true;
      clearTimeout(stateRef.current.manualTimer);
    };

    const onTouchMove = (e: TouchEvent) => {
      if (!dragging || !e.touches[0]) return;
      lastDx = (e.touches[0].clientX - lx2) * 0.45;
      lastDy = (e.touches[0].clientY - ly2) * 0.45;
      rotY += lastDx;
      rotX -= lastDy;
      rotX = Math.max(-65, Math.min(65, rotX));
      lx2 = e.touches[0].clientX;
      ly2 = e.touches[0].clientY;
    };

    const onTouchEnd = () => {
      dragging = false;
      velY = lastDx * 0.85;
      velX = -lastDy * 0.85;
      stateRef.current.manualTimer = setTimeout(() => {
        stateRef.current.manualMode = false;
      }, 7000);
    };

    viewport.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);

    viewport.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    window.addEventListener("touchend", onTouchEnd);

    // Initial demo sequence
    let initialTimer: any;
    if (autoStartSolve) {
      initialTimer = setTimeout(() => {
        handleScramble(7, 180);
      }, 1200);
    }

    return () => {
      stateRef.current.mounted = false;
      clearTimeout(initialTimer);
      clearTimeout(stateRef.current.manualTimer);
      if (stateRef.current.animFrame) {
        cancelAnimationFrame(stateRef.current.animFrame);
      }
      viewport.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
      viewport.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onTouchEnd);
    };
  }, [autoStartSolve]);

  // Helper: Rotate layer
  const rotateLayer = (
    axis: string,
    slice: number,
    angle: number,
    ms: number
  ): Promise<void> => {
    return new Promise((resolve) => {
      const scene = sceneRef.current;
      if (!scene || !stateRef.current.mounted) {
        resolve();
        return;
      }

      const layer = stateRef.current.cubies.filter((c) => {
        const x = Math.round(c.m.m41 / STEP_PX);
        const y = Math.round(-c.m.m42 / STEP_PX);
        const z = Math.round(c.m.m43 / STEP_PX);
        const val = axis === "x" ? x : axis === "y" ? y : z;
        return val === slice;
      });

      if (layer.length === 0) {
        resolve();
        return;
      }

      const pivot = document.createElement("div");
      pivot.style.cssText =
        "position:absolute;width:0;height:0;transform-style:preserve-3d;";
      scene.appendChild(pivot);
      layer.forEach((c) => pivot.appendChild(c.el));

      pivot.getBoundingClientRect();

      if (ms > 0) {
        pivot.style.transition = `transform ${ms}ms cubic-bezier(0.34, 1.25, 0.64, 1)`;
      }
      pivot.style.transform =
        axis === "y"
          ? `rotateY(${angle}deg)`
          : axis === "x"
          ? `rotateX(${angle}deg)`
          : `rotateZ(${angle}deg)`;

      setTimeout(() => {
        if (!stateRef.current.mounted) {
          pivot.remove();
          resolve();
          return;
        }

        const rotStr =
          axis === "y"
            ? `rotateY(${angle}deg)`
            : axis === "x"
            ? `rotateX(${angle}deg)`
            : `rotateZ(${angle}deg)`;
        const rotM = new DOMMatrix(rotStr);

        layer.forEach((c) => {
          c.m = rotM.multiply(c.m);
          // Snap
          c.m.m41 = Math.round(c.m.m41 / STEP_PX) * STEP_PX;
          c.m.m42 = Math.round(c.m.m42 / STEP_PX) * STEP_PX;
          c.m.m43 = Math.round(c.m.m43 / STEP_PX) * STEP_PX;
          scene.appendChild(c.el);
          c.el.style.transition = "none";
          c.el.style.transform = c.m.toString();
          void c.el.offsetHeight;
        });

        pivot.remove();
        resolve();
      }, ms + 35);
    });
  };

  const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

  // Scramble Function
  const handleScramble = async (n = 12, ms = 175) => {
    if (stateRef.current.busy) return;
    stateRef.current.busy = true;
    setIsBusy(true);
    setStatus("Scrambling Cube...");

    for (let i = 0; i < n; i++) {
      if (!stateRef.current.mounted) break;
      let m: (typeof MOVES)[0];
      do {
        m = MOVES[Math.floor(Math.random() * MOVES.length)];
      } while (
        stateRef.current.history.length &&
        stateRef.current.history[stateRef.current.history.length - 1].axis ===
          m.axis &&
        stateRef.current.history[stateRef.current.history.length - 1].slice ===
          m.slice
      );

      stateRef.current.history.push(m);
      setHistoryCount(stateRef.current.history.length);
      await rotateLayer(m.axis, m.slice, m.angle, ms);
      await sleep(15);
    }

    stateRef.current.busy = false;
    setIsBusy(false);
    setStatus("Scrambled — Ready to Solve");
  };

  // Solve Function
  const handleSolve = async (ms = 320) => {
    if (stateRef.current.busy || !stateRef.current.history.length) return;
    stateRef.current.busy = true;
    setIsBusy(true);
    setStatus("Algorithmic Solving...");

    const moves = [...stateRef.current.history]
      .reverse()
      .map((m) => ({ ...m, angle: -m.angle }));

    for (const m of moves) {
      if (!stateRef.current.mounted) break;
      await rotateLayer(m.axis, m.slice, m.angle, ms);
      await sleep(25);
    }

    stateRef.current.history = [];
    setHistoryCount(0);
    stateRef.current.busy = false;
    setIsBusy(false);
    setStatus("Solved! ✓");
  };

  return (
    <div
      ref={containerRef}
      className={cn(
        "cube-wrapper relative flex flex-col items-center justify-center p-4 select-none",
        className
      )}
    >
      {/* Subtle Aura Glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute w-[260px] h-[260px] rounded-full bg-gradient-to-tr from-orange-600/15 via-red-600/10 to-transparent blur-3xl"
      />

      {/* 3D Viewport */}
      <div
        ref={viewportRef}
        className="cube-viewport relative w-[220px] h-[220px] flex items-center justify-center cursor-grab active:cursor-grabbing"
        style={{
          perspective: 850,
          perspectiveOrigin: "50% 50%",
        }}
      >
        <div
          ref={sceneRef}
          id="cubeScene"
          className="relative w-0 h-0"
          style={{
            transformStyle: "preserve-3d",
            willChange: "transform",
          }}
        />
      </div>

      {/* Controls & Status Bar */}
      <div className="cube-ui text-center mt-5 z-10 w-full max-w-[280px]">
        {/* Status Indicator */}
        <div className="flex items-center justify-center gap-2 mb-3">
          <Badge
            variant={status.includes("Solved") ? "status" : "default"}
            className="text-[11px] font-mono py-0.5 px-2.5 transition-colors"
          >
            {status.includes("Solved") ? (
              <CheckCircle2 className="h-3 w-3 text-emerald-400" />
            ) : (
              <RotateCw className={`h-3 w-3 ${isBusy ? "animate-spin" : ""}`} />
            )}
            <span>{status}</span>
          </Badge>
        </div>

        {/* Buttons */}
        <div className="flex items-center justify-center gap-2 mb-2">
          <Button
            type="button"
            variant="secondary"
            size="sm"
            disabled={isBusy}
            onClick={() => {
              stateRef.current.manualMode = true;
              handleScramble(12, 180);
            }}
            className="text-xs h-8 px-3.5 font-mono gap-1.5"
          >
            <RotateCw className="h-3 w-3" />
            <span>Scramble</span>
          </Button>

          <Button
            type="button"
            variant="default"
            size="sm"
            disabled={isBusy || historyCount === 0}
            onClick={() => {
              stateRef.current.manualMode = true;
              handleSolve(300);
            }}
            className="text-xs h-8 px-3.5 font-mono gap-1.5 shadow-sm shadow-orange-500/20"
          >
            <Play className="h-3 w-3 fill-current" />
            <span>Solve ({historyCount})</span>
          </Button>
        </div>

        <p className="text-[10px] font-mono text-zinc-400 flex items-center justify-center gap-1">
          <Move className="h-3 w-3" />
          <span>Interactive 3D: Drag to rotate physics</span>
        </p>
      </div>

      <style>{`
        .fc-red    { background: #C41E3A; box-shadow: inset 0 -3px 0 rgba(0,0,0,.35), 0 0 10px rgba(196,30,58,.4); }
        .fc-orange { background: #FF5800; box-shadow: inset 0 -3px 0 rgba(0,0,0,.35), 0 0 10px rgba(255,88,0,.4); }
        .fc-blue   { background: #0051A2; box-shadow: inset 0 -3px 0 rgba(0,0,0,.35), 0 0 10px rgba(0,81,162,.4); }
        .fc-green  { background: #009B48; box-shadow: inset 0 -3px 0 rgba(0,0,0,.35), 0 0 10px rgba(0,155,72,.4); }
        .fc-yellow { background: #FFD500; box-shadow: inset 0 -3px 0 rgba(0,0,0,.35), 0 0 10px rgba(255,213,0,.4); }
        .fc-white  { background: #FFFFFF; box-shadow: inset 0 -3px 0 rgba(0,0,0,.2), 0 0 8px rgba(255,255,255,.3); }
        .fc-inner  { background: transparent !important; box-shadow: none !important; border-color: transparent !important; opacity: 0; }
      `}</style>
    </div>
  );
}

export default RubiksCube3D;
