"use client";

import React, { useEffect, useRef } from "react";

type PastelHazeBackgroundProps = {
  opacity?: number; // overall alpha
  speed?: number; // motion multiplier
  blobCount?: number; // number of gradient blobs
  maxDPR?: number; // cap device pixel ratio for perf
  grainIntensity?: number; // 0-1 overlay noise
  grainFPS?: number; // how often to refresh noise
  className?: string;
};

/**
 * PastelHazeBackground — slow, elegant Jeremy Blake / Brakhage‑ish canvas.
 * Renders additive pastel blobs (lavender / peach / baby blue) with a soft
 * vignette. Motion is gentle; respects prefers-reduced-motion.
 */
export default function PastelHazeBackground({
  opacity = 0.5,
  speed = 0.35,
  blobCount = 9,
  maxDPR = 1.6,
  grainIntensity = 0.12,
  grainFPS = 12,
  className = "",
}: PastelHazeBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const rafRef = useRef<number | null>(null);
  const noiseCanvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const dpr = Math.min(maxDPR, Math.max(1, window.devicePixelRatio || 1));

    const resize = () => {
      const { innerWidth: w, innerHeight: h } = window;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    // Pastel palette (hue, sat, light)
    const base = [
      { h: 320, s: 55, l: 72 }, // pink lavender
      { h: 210, s: 60, l: 72 }, // baby blue
      { h: 36, s: 70, l: 72 }, // peach
      { h: 265, s: 45, l: 70 }, // periwinkle
    ];

    type Blob = {
      hue: number;
      sat: number;
      light: number;
      radius: number;
      ampX: number;
      ampY: number;
      freqX: number;
      freqY: number;
      phase: number;
      cxBias: number;
      cyBias: number;
      alpha: number;
    };

    const blobs: Blob[] = Array.from({ length: blobCount }).map((_, i) => {
      const p = base[i % base.length];
      const jitter = () => Math.random() * 10 - 5;
      return {
        hue: p.h + jitter(),
        sat: p.s + Math.random() * 8 - 4,
        light: p.l + Math.random() * 6 - 3,
        radius: 180 + Math.random() * 260,
        ampX: 140 + Math.random() * 220,
        ampY: 140 + Math.random() * 220,
        freqX: 0.04 + Math.random() * 0.05,
        freqY: 0.035 + Math.random() * 0.05,
        phase: Math.random() * Math.PI * 2,
        cxBias: -0.15 + Math.random() * 0.3,
        cyBias: -0.15 + Math.random() * 0.3,
        alpha: 0.18 + Math.random() * 0.14,
      };
    });

    const start = performance.now();

    const drawBlob = (
      x: number,
      y: number,
      radius: number,
      hue: number,
      sat: number,
      light: number,
      a: number
    ) => {
      const g = ctx.createRadialGradient(x, y, 0, x, y, radius);
      g.addColorStop(
        0,
        `hsla(${hue}, ${sat}%, ${light}%, ${Math.min(1, a + 0.1)})`
      );
      g.addColorStop(
        0.55,
        `hsla(${hue}, ${sat - 10}%, ${light - 6}%, ${a * 0.6})`
      );
      g.addColorStop(1, `hsla(${hue}, ${sat - 12}%, ${light - 10}%, 0)`);
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.fill();
    };

    let lastGrainTime = performance.now();

    const renderFrame = (t: number) => {
      const { innerWidth: w, innerHeight: h } = window;
      ctx.clearRect(0, 0, w, h);

      // vignette
      ctx.globalCompositeOperation = "source-over";
      const vg = ctx.createRadialGradient(
        w * 0.5,
        h * 0.5,
        Math.min(w, h) * 0.25,
        w * 0.5,
        h * 0.5,
        Math.max(w, h) * 0.85
      );
      vg.addColorStop(0, "rgba(0,0,0,0)");
      vg.addColorStop(1, "rgba(0,0,0,0.20)");
      ctx.fillStyle = vg;
      ctx.fillRect(0, 0, w, h);

      // additive pastel blobs
      ctx.globalCompositeOperation = "lighter";
      ctx.globalAlpha = opacity;

      const seconds = ((t - start) / 1000) * speed;
      blobs.forEach((b, i) => {
        const cx = w * (0.5 + b.cxBias);
        const cy = h * (0.5 + b.cyBias);
        const x = cx + Math.cos(seconds * b.freqX + b.phase + i * 0.3) * b.ampX;
        const y =
          cy + Math.sin(seconds * b.freqY + b.phase + i * 0.24) * b.ampY;
        drawBlob(x, y, b.radius, b.hue, b.sat, b.light, b.alpha);
      });

      // film grain overlay (screen-space)
      if (grainIntensity > 0) {
        const nc =
          noiseCanvasRef.current ||
          (() => {
            const c = document.createElement("canvas");
            c.width = 96;
            c.height = 96;
            noiseCanvasRef.current = c;
            return c;
          })();
        const nctx = nc.getContext("2d");
        if (nctx) {
          const now = performance.now();
          if (now - lastGrainTime > 1000 / grainFPS) {
            const img = nctx.createImageData(nc.width, nc.height);
            const data = img.data;
            for (let i = 0; i < data.length; i += 4) {
              const v = Math.random() * 255;
              data[i] = v;
              data[i + 1] = v;
              data[i + 2] = v;
              data[i + 3] = 255;
            }
            nctx.putImageData(img, 0, 0);
            lastGrainTime = now;
          }
          ctx.globalCompositeOperation = "source-over";
          ctx.globalAlpha = prefersReducedMotion
            ? grainIntensity * 0.5
            : grainIntensity;
          const pattern = ctx.createPattern(nc, "repeat");
          if (pattern) {
            ctx.fillStyle = pattern as unknown as string;
            ctx.fillRect(0, 0, w, h);
          }
          ctx.globalAlpha = 1;
        }
      }
    };

    const loop = (now: number) => {
      renderFrame(now);
      rafRef.current = requestAnimationFrame(loop);
    };

    if (prefersReducedMotion) {
      renderFrame(performance.now());
    } else {
      rafRef.current = requestAnimationFrame(loop);
    }

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
    };
  }, [blobCount, maxDPR, opacity, speed]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className={["pointer-events-none fixed inset-0 z-0", className].join(" ")}
    />
  );
}
