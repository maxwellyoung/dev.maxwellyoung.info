"use client";

import React, { useEffect, useRef } from "react";

type VhsScanlinesProps = {
  className?: string;
  opacity?: number; // global alpha for the overlay
  lineOpacity?: number; // alpha for black scan lines
  gap?: number; // px between lines (device pixels scaled by DPR)
  wobble?: number; // horizontal wobble amplitude in px
  speed?: number; // wobble/flicker speed multiplier
  chroma?: boolean; // enable chromatic aberration bands
};

/**
 * Fullscreen VHS-style scanline overlay with optional chroma offsets and wobble.
 * Canvas-only, very cheap; respects DPR and reduced-motion.
 */
export default function VhsScanlines({
  className = "",
  opacity = 0.18,
  lineOpacity = 0.16,
  gap = 2,
  wobble = 0.8,
  speed = 0.6,
  chroma = true,
  ...rest
}: VhsScanlinesProps & React.CanvasHTMLAttributes<HTMLCanvasElement>) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const dpr = Math.min(2, Math.max(1, window.devicePixelRatio || 1));

    const resize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    let raf = 0;
    const start = performance.now();

    const render = (now: number) => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      ctx.clearRect(0, 0, w, h);

      // Base scanlines
      ctx.globalAlpha = lineOpacity;
      ctx.fillStyle = "#000";
      const g = Math.max(1, gap);
      const t = prefersReduced ? 0 : ((now - start) / 1000) * speed;
      const wob = prefersReduced ? 0 : wobble;
      for (let y = 0; y < h; y += g) {
        // subtle per-line wobble
        const offset = Math.sin(y * 0.07 + t * 3.2) * wob;
        ctx.fillRect(offset, y, w + 2, 1);
      }

      // Chroma aberration bands (very subtle)
      if (chroma) {
        const bandH = 3 * g;
        ctx.globalAlpha = Math.min(1, opacity);
        const y1 = (Math.sin(t * 1.3) * 0.5 + 0.5) * (h - bandH);
        const gradR = ctx.createLinearGradient(0, y1, w, y1);
        gradR.addColorStop(0, "rgba(255,0,60,0.10)");
        gradR.addColorStop(1, "rgba(0,0,0,0)");
        ctx.fillStyle = gradR;
        ctx.fillRect(0, y1, w, bandH);

        const y2 = (Math.cos(t * 1.1) * 0.5 + 0.5) * (h - bandH);
        const gradB = ctx.createLinearGradient(w, y2, 0, y2);
        gradB.addColorStop(0, "rgba(60,160,255,0.10)");
        gradB.addColorStop(1, "rgba(0,0,0,0)");
        ctx.fillStyle = gradB;
        ctx.fillRect(0, y2, w, bandH);
      }

      // global overlay alpha
      ctx.globalAlpha = opacity;

      raf = requestAnimationFrame(render);
    };
    raf = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, [chroma, gap, lineOpacity, opacity, speed, wobble]);

  return (
    <canvas
      ref={canvasRef}
      className={["pointer-events-none fixed inset-0 z-0", className].join(" ")}
      aria-hidden
      {...rest}
    />
  );
}
