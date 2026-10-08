"use client";

import React, { useRef, useEffect, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Globe2, MapPin, Radio, Activity, Compass, ShieldCheck } from "lucide-react";

// Official cartographic 571-point vector boundary of Pakistan from Natural Earth 50m
const PAKISTAN_SVG_PATH =
  "M 383.4 76.5 L 384.5 78.6 L 386.1 81.8 L 387.2 83.9 L 388.4 86.2 L 389 87.4 L 390 89.4 L 389.6 90.6 L 388.9 92.2 L 386.3 93.5 L 383.8 94.4 L 383.2 94.9 L 383 95.6 L 381.7 97 L 379.3 98.2 L 377.4 98.1 L 376.1 97.7 L 369.5 99.8 L 366.4 99.8 L 364 101.1 L 362.2 102.3 L 358.6 103.7 L 356.2 103.7 L 352.6 102.9 L 348.2 101.4 L 346.4 100.5 L 344.7 100.5 L 340.8 100.3 L 337 99.6 L 332.4 98.7 L 330.2 98.3 L 325.6 97.5 L 322.5 98.6 L 319.8 99.5 L 317.6 100.1 L 315.8 103.1 L 315 104.1 L 314.1 105.6 L 313.7 106.6 L 314.1 107.8 L 316.7 108.7 L 317.9 109.9 L 318 111 L 317.1 112.1 L 316.3 112.9 L 316.3 113.7 L 316.7 114.5 L 317.3 115 L 321.2 115.4 L 323.4 115.4 L 324.3 115.7 L 324.4 116.7 L 323.6 118.1 L 320.4 119.2 L 318.5 120.4 L 318 122 L 318 123.3 L 318.6 124.1 L 320.1 125 L 321.6 126.1 L 322 127 L 321.9 128.2 L 321.3 129.9 L 319.7 131.9 L 318.4 133.2 L 318.3 133.7 L 318.6 134.5 L 319.7 135.6 L 321.5 137.1 L 323.7 138.4 L 325.2 138.8 L 325.6 139.1 L 326.1 140.6 L 326.2 142.2 L 325.7 143.4 L 326.8 144.3 L 329.8 144.3 L 332.3 144.7 L 333.3 144.3 L 334.1 144.6 L 333.6 148.1 L 333.9 150.2 L 334.6 150.8 L 337 151.6 L 341.7 151.5 L 344.4 152.5 L 347.4 153.6 L 349.1 154.9 L 349.8 155.8 L 349.6 157.3 L 347.9 159.1 L 345.2 159.9 L 343.6 160.3 L 335.9 163.6 L 333.4 164.9 L 331.5 166.6 L 330.8 167.9 L 330.5 169.1 L 332.2 173.5 L 332.4 174.9 L 331.1 179.7 L 330.7 181.5 L 331.2 182.7 L 332.8 183.2 L 333.2 184.2 L 333.4 185 L 330.5 186.8 L 327.4 188.3 L 326.5 188.3 L 323.6 191.2 L 318.7 197.1 L 316.2 199.1 L 316 200 L 315.8 201 L 316.7 202.7 L 317 204.1 L 315.9 205.5 L 314 207.1 L 310.5 208.5 L 306 209.9 L 304 210.8 L 302.5 214.6 L 301.1 218.4 L 300.5 219.8 L 298.1 224.2 L 293.9 230.6 L 292.8 232 L 286.3 235.1 L 279.6 238.5 L 278.5 239.8 L 277.1 242.9 L 275.8 246.3 L 274.6 248 L 270.4 252 L 269 255 L 268.6 257 L 265 258.2 L 260.9 259.2 L 255 259.6 L 252.5 260.1 L 245.2 262.9 L 243.4 263 L 242 262.5 L 240.9 261.6 L 239.9 260 L 239.5 257.6 L 238.1 256.5 L 236.2 255.6 L 234.2 255.6 L 232.2 256.6 L 230.4 257.7 L 229.3 258.6 L 228.1 259.7 L 225.9 263.3 L 222.3 268.5 L 218.3 272.3 L 216.8 273.4 L 215.8 274.3 L 214.6 275.5 L 213.9 276.7 L 212.9 280.7 L 212.3 284.2 L 212.6 285 L 213.2 285.6 L 215.3 286.7 L 218.5 288.4 L 222.6 289.3 L 226.1 289.5 L 227.4 290.2 L 228.2 291.2 L 228.4 292 L 228.2 294.9 L 227.8 298 L 226.5 301.4 L 226.6 303.3 L 227.1 305.2 L 230.9 309.9 L 232.3 310.4 L 235.2 310.5 L 236.6 310.4 L 238.1 310 L 239.1 310.3 L 239.9 310.9 L 240.1 311.8 L 240 316.6 L 241.2 318.7 L 243.5 321.7 L 245.3 325 L 247 329.1 L 248.7 332.2 L 249.3 333.8 L 248.2 334.6 L 247.6 335.4 L 247.5 336.5 L 247.7 337.7 L 247.5 338.5 L 248.3 339.5 L 249.2 339.9 L 249.2 340.6 L 247.8 341.5 L 246.5 341.5 L 245.5 341.9 L 243.6 343.8 L 242.7 344.2 L 241.5 344.4 L 240.2 344.2 L 238.3 343.4 L 237.7 342.2 L 238 340.9 L 237.5 340.1 L 236.2 340.3 L 231.5 341.6 L 227 343.2 L 226.2 344.3 L 225.2 345.5 L 223.2 345.9 L 220.1 346.1 L 218.1 345.9 L 216.1 344.7 L 214.4 343.6 L 211.7 343.5 L 206.8 343.7 L 204.1 343.7 L 202.5 343.2 L 200.9 343.6 L 198.9 343.1 L 198.1 343.7 L 197.2 343.8 L 196.6 342.7 L 196.1 342.6 L 195.6 342.8 L 195.2 343.1 L 194.9 343.7 L 194.8 350.8 L 191.6 350.7 L 189.3 350.7 L 186.8 351.1 L 184.4 351.6 L 183.3 352.3 L 181.7 353.3 L 181.3 354.7 L 180.5 355.7 L 179.4 354.2 L 178.7 353.5 L 177.9 354 L 176.7 354 L 174.5 352.2 L 173.6 354 L 170 354.4 L 169.6 353.1 L 169.5 351.8 L 167.6 352.7 L 166.2 351.4 L 165.5 349.5 L 165 349 L 164.4 348.4 L 162.9 347.8 L 161.6 345.9 L 161.5 343.8 L 161.1 341.3 L 158.4 332.2 L 156.7 331.4 L 147.4 329.8 L 146.9 328.2 L 147.6 323.9 L 147.3 321.2 L 144.3 317.6 L 143.4 315.2 L 141 313 L 138.5 312.4 L 136.1 312.7 L 134.7 313.5 L 134 314.9 L 139.3 314.6 L 140.5 315.1 L 141.9 316.1 L 140.4 316 L 138.6 315.6 L 136.4 315.6 L 128.2 316.7 L 123.4 318.2 L 117 317.7 L 108.9 319.2 L 102.2 319.3 L 99.5 322.2 L 98 321.7 L 96.8 321 L 87.6 318.7 L 86.9 317.7 L 85.4 317.1 L 83.7 318.3 L 82.5 318.5 L 77.5 317.5 L 73.6 318.2 L 72.2 319.5 L 72.1 321.6 L 67.3 321.2 L 64.6 320.5 L 60.9 321.2 L 52.7 320.3 L 50.5 320.5 L 47.6 321.9 L 46.3 322.9 L 44.5 323.3 L 43 321.9 L 41.8 321.2 L 40.7 321.7 L 39.2 322.9 L 35 323.4 L 31.1 323.3 L 27 322.1 L 27.5 321.8 L 28.1 319.8 L 28.7 312.8 L 29.4 310.3 L 29.2 308.9 L 29.4 308.5 L 31 307.3 L 31.4 306.7 L 32 303.2 L 32.7 299.2 L 33.4 297.8 L 34.1 297.4 L 39.2 295.6 L 40.1 294.4 L 42.7 294.7 L 43 294.4 L 43.2 293 L 44.4 291.5 L 46.2 290.3 L 47.4 289.9 L 52 289.1 L 54.7 288.1 L 55.6 288 L 62.8 288.2 L 64.3 287.8 L 64.5 287.5 L 64.9 283.4 L 66.2 282.8 L 66.4 282.4 L 66 279.7 L 66.2 277.8 L 67.7 276.7 L 67.6 276.1 L 66.6 274.7 L 65.2 273.9 L 64.5 273.7 L 58.6 274.5 L 56.2 274.2 L 55 273.7 L 54.8 273.4 L 55 272.6 L 55 271.2 L 55.9 269.2 L 56.2 268 L 55.5 260.8 L 54.5 256.1 L 55 251.4 L 54.9 250.5 L 54.7 250.2 L 53.9 250.2 L 50.4 250.6 L 47.3 247.6 L 45.4 246.4 L 40.2 244.9 L 37.9 244.6 L 34.5 243.3 L 31.4 240.5 L 28.3 237.6 L 27 235.7 L 25.6 232.6 L 21.6 226.5 L 21.6 224.9 L 21.1 224 L 17.2 220 L 14.5 217.2 L 10 212.6 L 18.9 215.1 L 25.9 217.1 L 37.1 220.3 L 45.9 222.7 L 48.3 223.1 L 73.9 221 L 83.3 222.6 L 86.3 223.5 L 86.8 223 L 88.1 221.9 L 90.3 220.8 L 93.3 219.9 L 96.2 219.5 L 100.5 219.4 L 103.4 219.5 L 105.6 219.7 L 109.7 219.6 L 111.7 219.2 L 118.5 217.4 L 123.1 216.3 L 130 214.4 L 135.1 213.1 L 136.3 212.4 L 137.6 211.1 L 138.3 210 L 136.7 208.2 L 136.5 206.7 L 137.5 204.7 L 138.1 201.7 L 138 197.5 L 137.6 195 L 139.1 190.4 L 140.2 187.9 L 142.6 186.6 L 144.2 185.9 L 144.9 185.3 L 145.6 184.7 L 148.1 181.3 L 150.4 179.6 L 152.6 178.6 L 155 178.8 L 157.1 180.1 L 161.1 180.7 L 165 180.3 L 168.4 179.3 L 169.9 178.5 L 171.7 177.7 L 171.6 176.9 L 169.5 176.2 L 168.4 175.2 L 167.9 173.9 L 169.1 173.2 L 171.7 173 L 178.2 169.9 L 180.9 167.9 L 181.6 167 L 182.8 166.9 L 185.3 167.8 L 188.2 168.1 L 190 167.2 L 191.8 167 L 193.6 168 L 194.6 169.2 L 196.2 170.7 L 198.2 170.9 L 200.6 170.2 L 203.2 168.5 L 205.6 166.2 L 207.8 163.8 L 207.3 156.5 L 206.9 152.2 L 208.1 149.9 L 209.7 148.5 L 210.8 146.4 L 210.8 144.4 L 211.9 142.8 L 213 138.4 L 214.6 137.4 L 217.8 136.7 L 222.8 136.3 L 226.8 134.3 L 230.8 132.1 L 231.4 130.3 L 229.9 128.3 L 227.9 124.4 L 226 122 L 221.6 117.9 L 222.1 115.3 L 224.6 114.3 L 230.7 116 L 232.4 116.4 L 234.5 116.6 L 240.1 116.6 L 244.6 115.9 L 249.4 114.3 L 250.3 112.6 L 250.3 110.7 L 250.3 109.1 L 250.4 106.8 L 248.7 105.4 L 247.7 104.1 L 247.4 103 L 248.5 102.5 L 249.7 101.4 L 250.8 99.5 L 253.5 97.2 L 255.1 95.1 L 256.6 94.1 L 258.8 92.8 L 260.3 90.8 L 261 89.6 L 262.3 88.5 L 262.7 87.7 L 262.4 87.1 L 261.7 86.2 L 261 85.2 L 261 84.3 L 261.6 83.3 L 262.2 82.5 L 261.9 81.2 L 261.6 79.2 L 260.3 78 L 259.5 75.3 L 258.2 72.5 L 257.5 71.4 L 256.2 70 L 253.3 68.6 L 252.5 67.6 L 253.6 65.7 L 255.5 64.6 L 259 61.7 L 261 59.7 L 262.7 58.3 L 265 58.6 L 266.3 58.4 L 267.4 57.2 L 269.8 56 L 273.9 53.7 L 275.3 52.1 L 277.5 51.3 L 279.3 51.2 L 281.7 50.6 L 284.1 49.8 L 286.2 49.1 L 289.6 49 L 294.9 48.6 L 297.8 48.2 L 304.7 47.9 L 312.2 47.7 L 313.1 47.7 L 316.4 48.6 L 318.6 49.3 L 319.4 49.2 L 323.1 47.5 L 328.6 45.5 L 331.2 44.6 L 332.6 44.3 L 334.7 44.3 L 336.5 44.8 L 338.2 45.6 L 339.4 46.2 L 340.8 45.9 L 343.2 45.4 L 345.4 45.7 L 350.1 47.1 L 350.8 47.8 L 351.9 51.3 L 352.8 51.6 L 355.4 50.8 L 357.6 51.2 L 360.1 52.3 L 361.7 53.3 L 362.7 54.5 L 363.8 56.3 L 364.3 57.8 L 364.8 59.6 L 364.7 64.6 L 363.9 65.4 L 363.2 66.5 L 363.4 67.4 L 364.1 68.2 L 365.7 68.7 L 367.1 69 L 367.8 69.8 L 368.9 72.6 L 369.6 73 L 371.3 73 L 374.5 72.4 L 377.2 71.4 L 378.3 71.2 L 378.6 73.9 L 380.2 74.9 L 382.5 76.1 L 383.4 76.5 Z";

// Telemetry points representing Muhammad Usman Tahir's education & development origin hubs
const TELEMETRY_HUBS = [
  {
    id: "fsd",
    name: "Faisalabad",
    label: "UAF (BSCS 5th Sem)",
    x: 296.9,
    y: 175.3,
    primary: true,
    accent: "#f97316",
  },
  {
    id: "khi",
    name: "Karachi",
    label: "Saylani Trainee",
    x: 154.4,
    y: 329.8,
    highlight: true,
    accent: "#ef4444",
  },
  {
    id: "lhr",
    name: "Lahore",
    label: "Tech Ecosystem",
    x: 326.9,
    y: 173.6,
    accent: "#e4e4e7",
  },
  {
    id: "isb",
    name: "Islamabad",
    label: "Capital Node",
    x: 296.2,
    y: 122.9,
    accent: "#e4e4e7",
  },
  {
    id: "psh",
    name: "Peshawar",
    label: "Northern Hub",
    x: 260.5,
    y: 115.1,
    accent: "#a1a1aa",
  },
  {
    id: "qta",
    name: "Quetta",
    label: "Southwest Node",
    x: 153.8,
    y: 205.0,
    accent: "#a1a1aa",
  },
  {
    id: "glt",
    name: "Gilgit",
    label: "Highlands Relay",
    x: 325.9,
    y: 70.4,
    accent: "#a1a1aa",
  },
];

interface Point3D {
  x: number;
  y: number;
  z: number;
  size: number;
  accent: boolean;
  baseColor: string;
}

export function PakistanNetworkGlobe() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [activeHub, setActiveHub] = useState<string>("fsd");
  const [reducedMotion, setReducedMotion] = useState(false);

  // Mouse tilt values for gentle 3D parallax
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mediaQuery.matches);
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  // 3D Spherical Network Canvas Implementation matching Reference 2
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || 400);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 340);

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    ctx.scale(dpr, dpr);

    // Generate ~140 Fibonacci sphere points
    const sphereRadius = Math.min(width, height) * 0.42;
    const nodeCount = 140;
    const nodes: Point3D[] = [];
    const phi = Math.PI * (3 - Math.sqrt(5)); // Golden ratio angle

    for (let i = 0; i < nodeCount; i++) {
      const y = 1 - (i / (nodeCount - 1)) * 2; // y from 1 to -1
      const radiusAtY = Math.sqrt(1 - y * y);
      const theta = phi * i;

      const x = Math.cos(theta) * radiusAtY;
      const z = Math.sin(theta) * radiusAtY;

      // Restrained palette matching Reference 2: predominantly crisp silver/white and subtle dark slate nodes
      const isOrangeAccent = i % 14 === 0;
      const isMuted = i % 4 === 0;

      nodes.push({
        x: x * sphereRadius,
        y: y * sphereRadius,
        z: z * sphereRadius,
        size: isOrangeAccent ? 2.8 : isMuted ? 1.4 : 2.0,
        accent: isOrangeAccent,
        baseColor: isOrangeAccent ? "#f97316" : "#ffffff",
      });
    }

    let rotationY = 0;
    const tiltX = 0.18; // subtle X tilt for nice perspective

    let targetRotSpeed = reducedMotion ? 0.0005 : 0.0032;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      rotationY += targetRotSpeed;

      const centerX = width / 2;
      const centerY = height / 2 + 10; // slight offset to nest cleanly under Pakistan

      const cosY = Math.cos(rotationY);
      const sinY = Math.sin(rotationY);
      const cosX = Math.cos(tiltX);
      const sinX = Math.sin(tiltX);

      const projected = nodes.map((node) => {
        // Rotate around Y
        const x1 = node.x * cosY - node.z * sinY;
        const z1 = node.z * cosY + node.x * sinY;

        // Tilt slightly around X
        const y2 = node.y * cosX - z1 * sinX;
        const z2 = z1 * cosX + node.y * sinX;

        // Perspective depth factor
        const depth = (z2 + sphereRadius) / (2 * sphereRadius);
        const scale = 0.8 + depth * 0.4;

        return {
          px: centerX + x1 * scale,
          py: centerY + y2 * scale,
          pz: z2,
          depth,
          accent: node.accent,
          size: node.size * scale,
          color: node.baseColor,
        };
      });

      // Draw geodesic connection lines matching Reference 2 wireframe sphere
      ctx.lineWidth = 0.6;
      const connectionDist = sphereRadius * 0.44;

      for (let i = 0; i < projected.length; i++) {
        const p1 = projected[i];
        if (p1.pz < -sphereRadius * 0.4) continue;

        for (let j = i + 1; j < projected.length; j++) {
          const p2 = projected[j];
          if (p2.pz < -sphereRadius * 0.4) continue;

          const dx = p1.px - p2.px;
          const dy = p1.py - p2.py;
          const dist = Math.hypot(dx, dy);

          if (dist < connectionDist) {
            const alpha = (1 - dist / connectionDist) * 0.28 * Math.max(0.12, p1.depth);
            ctx.strokeStyle = p1.accent || p2.accent
              ? `rgba(249, 115, 22, ${alpha * 1.4})`
              : `rgba(255, 255, 255, ${alpha})`;

            ctx.beginPath();
            ctx.moveTo(p1.px, p1.py);
            ctx.lineTo(p2.px, p2.py);
            ctx.stroke();
          }
        }
      }

      // Draw nodes sorted by depth (back to front)
      projected.sort((a, b) => a.pz - b.pz);

      for (let i = 0; i < projected.length; i++) {
        const p = projected[i];
        const alpha = Math.max(0.15, Math.min(0.95, p.depth * 0.95));

        ctx.save();
        if (p.accent) {
          ctx.shadowBlur = 8;
          ctx.shadowColor = p.color;
          ctx.fillStyle = p.color;
        } else {
          ctx.shadowBlur = 0;
          ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
        }

        ctx.beginPath();
        ctx.arc(p.px, p.py, p.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      // Central ambient pulse glow matching Reference 2 inner luminescence
      const gradient = ctx.createRadialGradient(
        centerX,
        centerY,
        sphereRadius * 0.15,
        centerX,
        centerY,
        sphereRadius * 0.95
      );
      gradient.addColorStop(0, "rgba(255, 255, 255, 0.08)");
      gradient.addColorStop(0.4, "rgba(249, 115, 22, 0.04)");
      gradient.addColorStop(1, "transparent");
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(centerX, centerY, sphereRadius, 0, Math.PI * 2);
      ctx.fill();

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    const handleResize = () => {
      if (!canvas.parentElement) return;
      width = canvas.parentElement.clientWidth || 400;
      height = canvas.parentElement.clientHeight || 340;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.scale(dpr, dpr);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
    };
  }, [reducedMotion]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (reducedMotion || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x * 12);
    mouseY.set(y * 12);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full max-w-3xl mx-auto rounded-3xl p-6 sm:p-8 bg-gradient-to-b from-[#13141f]/95 via-[#0d0e15]/98 to-[#07070b] border border-white/[0.08] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.85)] backdrop-blur-xl overflow-hidden select-none"
      aria-label="Digital Origin & Global Network System — Reference 2 Architecture"
    >
      {/* Ambient background glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-12 -left-12 w-64 h-64 rounded-full bg-orange-600/10 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-12 -right-12 w-64 h-64 rounded-full bg-red-600/10 blur-3xl"
      />

      {/* Header Telemetry Bar */}
      <div className="relative z-10 flex flex-wrap items-center justify-between pb-4 mb-4 border-b border-white/[0.06] gap-2">
        <div className="flex items-center gap-2.5">
          <div className="p-1.5 rounded-lg bg-orange-500/10 border border-orange-500/20 text-orange-400">
            <Radio className="w-4 h-4 animate-pulse" />
          </div>
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-white font-bold block">
              ORIGIN &bull; PAKISTAN TO GLOBAL MESH
            </span>
            <span className="text-[10px] font-mono text-zinc-400 block">
              Saylani Welfare Trust &bull; University of Agriculture Faisalabad &rarr; Global Web
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 text-[10px] font-mono text-zinc-400">
          <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 flex items-center gap-1.5 font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
            NODE ACTIVE
          </span>
          <span className="px-2.5 py-0.5 rounded bg-white/[0.03] border border-white/[0.06] text-orange-400/90">
            31.4504&deg; N, 73.0791&deg; E
          </span>
        </div>
      </div>

      {/* Main Composition matching Reference 2:
          Top: Solid Dark Silhouette of Pakistan
          Bottom: Interlocking 3D Wireframe Network Globe */}
      <div className="relative flex flex-col items-center justify-center my-2">

        {/* 1. Dark Solid Pakistan Map Silhouette (Positioned directly above the globe, matching Reference 2) */}
        <div className="relative z-20 w-full max-w-[340px] sm:max-w-[420px] aspect-[16/9] -mb-16 sm:-mb-20">
          <svg
            viewBox="0 0 400 360"
            className="w-full h-full filter drop-shadow-[0_0_20px_rgba(249,115,22,0.4)]"
            style={{ overflow: "visible" }}
          >
            <defs>
              <linearGradient id="pakDarkGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#1b1c28" />
                <stop offset="60%" stopColor="#10111a" />
                <stop offset="100%" stopColor="#08080c" />
              </linearGradient>

              <linearGradient id="pakBorderGlow" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="rgba(249,115,22,0.85)" />
                <stop offset="50%" stopColor="rgba(255,255,255,0.4)" />
                <stop offset="100%" stopColor="rgba(239,68,68,0.75)" />
              </linearGradient>
            </defs>

            {/* Dark Solid Silhouette */}
            <motion.path
              d={PAKISTAN_SVG_PATH}
              fill="url(#pakDarkGrad)"
              stroke="url(#pakBorderGlow)"
              strokeWidth="1.8"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            />

            {/* Downward Data Beams linking Pakistan's cities into the rotating globe */}
            <g stroke="rgba(249, 115, 22, 0.35)" strokeWidth="1" strokeDasharray="3 3">
              <line x1="296.9" y1="175.3" x2="296.9" y2="340" /> {/* FSD beam down */}
              <line x1="154.4" y1="329.8" x2="154.4" y2="350" /> {/* KHI beam down */}
              <line x1="326.9" y1="173.6" x2="326.9" y2="330" /> {/* LHR beam down */}
            </g>

            {/* Interactive City Nodes */}
            {TELEMETRY_HUBS.map((hub) => {
              const isActive = activeHub === hub.id;
              return (
                <g
                  key={hub.id}
                  className="cursor-pointer"
                  onClick={() => setActiveHub(hub.id)}
                >
                  {(hub.primary || isActive) && (
                    <circle
                      cx={hub.x}
                      cy={hub.y}
                      r="10"
                      fill="none"
                      stroke={hub.accent}
                      strokeWidth="1.2"
                      opacity="0.6"
                      className="animate-ping origin-center"
                    />
                  )}
                  <circle
                    cx={hub.x}
                    cy={hub.y}
                    r={hub.primary ? 4.5 : 3.2}
                    fill={hub.accent}
                    filter="drop-shadow(0 0 5px rgba(249,115,22,0.9))"
                  />
                  <circle
                    cx={hub.x}
                    cy={hub.y}
                    r={1.5}
                    fill="#ffffff"
                  />
                </g>
              );
            })}
          </svg>
        </div>

        {/* 2. 3D Rotating Geodesic Network Globe (HTML5 Canvas matching Reference 2) */}
        <div className="relative z-10 w-full max-w-[340px] sm:max-w-[400px] aspect-[1/0.85] flex items-center justify-center">
          <canvas
            ref={canvasRef}
            className="w-full h-full block"
            aria-label="3D Spherical Network Globe"
          />

          {/* Corner Crosshairs */}
          <div className="pointer-events-none absolute top-4 left-4 text-[9px] font-mono text-zinc-500">
            [GEO//SYS_NET]
          </div>
          <div className="pointer-events-none absolute bottom-4 right-4 text-[9px] font-mono text-orange-400">
            SECURE PROTOCOL &bull; C++ &amp; TS
          </div>
        </div>

      </div>

      {/* Active Hub Telemetry Details Bar */}
      <div className="relative z-20 mt-4 pt-4 border-t border-white/[0.06] flex flex-wrap items-center justify-between text-xs font-mono text-zinc-400 gap-3">
        <div className="flex items-center gap-2">
          <MapPin className="w-4 h-4 text-orange-400" />
          <span className="text-white font-medium">
            Active Hub: {TELEMETRY_HUBS.find((h) => h.id === activeHub)?.name} &mdash;{" "}
            <span className="text-zinc-400">
              {TELEMETRY_HUBS.find((h) => h.id === activeHub)?.label}
            </span>
          </span>
        </div>

        <div className="flex items-center gap-2">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
          <span className="text-zinc-300">Global Standards Aligned</span>
        </div>
      </div>
    </div>
  );
}

export default PakistanNetworkGlobe;
