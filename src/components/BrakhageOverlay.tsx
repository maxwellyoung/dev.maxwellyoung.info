"use client";

import React, { useEffect, useRef } from "react";

type BrakhageOverlayProps = {
  className?: string;
  flickerIntensity?: number; // 0-1
  grainIntensity?: number; // 0-1
  grainFPS?: number;
  scratchDensity?: number; // scratches per second
  maxDPR?: number;
};

/**
 * Fullscreen overlay that adds Brakhage-like flicker, film grain, and scratches.
 * Render atop any background for a filmic feel. Mobile-safe and reduced-motion aware.
 */
export default function BrakhageOverlay({
  className = "",
  flickerIntensity = 0.12,
  grainIntensity = 0.08,
  grainFPS = 10,
  scratchDensity = 0.8,
  maxDPR = 1.5,
}: BrakhageOverlayProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const noiseCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const scratchesRef = useRef<
    Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      life: number;
      maxLife: number;
      width: number;
      hue: number;
    }>
  >([]);

  useEffect(() => {
    const canv = canvasRef.current;
    if (!canv) return;
    const ctx = canv.getContext("2d");
    if (!ctx) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const dpr = Math.min(maxDPR, Math.max(1, window.devicePixelRatio || 1));

    const resize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      canv.width = Math.floor(w * dpr);
      canv.height = Math.floor(h * dpr);
      canv.style.width = `${w}px`;
      canv.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    // noise canvas
    const nc = document.createElement("canvas");
    nc.width = 96;
    nc.height = 96;
    noiseCanvasRef.current = nc;
    const nctx = nc.getContext("2d");

    let raf = 0;
    let lastGrain = performance.now();
    let scratchAcc = 0;
    const clockStart = performance.now();

    const spawnScratch = () => {
      const w = canv.width / dpr;
      const h = canv.height / dpr;
      const vertical = Math.random() > 0.4;
      const x = Math.random() * w;
      const y = Math.random() * h;
      const speed = vertical
        ? 60 + Math.random() * 120
        : 80 + Math.random() * 160;
      const angle = vertical
        ? -Math.PI / 2 + (Math.random() - 0.5) * 0.2
        : -Math.PI / 2 + (Math.random() - 0.5);
      const width = 0.6 + Math.random() * 0.8;
      const hue = 25 + Math.random() * 20;
      scratchesRef.current.push({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        life: 0,
        maxLife: 0.6 + Math.random(),
        width,
        hue,
      });
      if (scratchesRef.current.length > 20) scratchesRef.current.shift();
    };

    const loop = () => {
      const w = canv.width / dpr;
      const h = canv.height / dpr;
      ctx.clearRect(0, 0, w, h);

      // flicker
      const flicker = prefersReduced
        ? flickerIntensity * 0.4
        : flickerIntensity;
      if (flicker > 0) {
        const warm = Math.random() > 0.5;
        ctx.fillStyle = warm
          ? `rgba(255,238,210,${flicker * (0.25 + Math.random() * 0.5)})`
          : `rgba(220,230,255,${flicker * (0.2 + Math.random() * 0.4)})`;
        ctx.fillRect(0, 0, w, h);
      }

      // grain (throttled)
      if (grainIntensity > 0 && nctx) {
        const now = performance.now();
        if (now - lastGrain > 1000 / grainFPS) {
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
          lastGrain = now;
        }
        ctx.globalAlpha = grainIntensity;
        const pattern = ctx.createPattern(nc, "repeat");
        if (pattern) {
          ctx.fillStyle = pattern as unknown as string;
          ctx.fillRect(0, 0, w, h);
        }
        ctx.globalAlpha = 1;
      }

      // scratches
      if (!prefersReduced && scratchDensity > 0) {
        scratchAcc += ((performance.now() - clockStart) / 1000) * 0.0001; // tiny drift
        if (Math.random() < scratchDensity * 0.02) spawnScratch();
      }
      if (scratchesRef.current.length) {
        ctx.save();
        ctx.globalCompositeOperation = "lighten";
        const dt = 1 / 60;
        for (let i = scratchesRef.current.length - 1; i >= 0; i--) {
          const s = scratchesRef.current[i];
          s.life += dt;
          if (s.life > s.maxLife) {
            scratchesRef.current.splice(i, 1);
            continue;
          }
          s.x += s.vx * dt;
          s.y += s.vy * dt;
          const alpha = 0.14 * (1 - s.life / s.maxLife);
          ctx.strokeStyle = `hsla(${s.hue}, 60%, 75%, ${alpha})`;
          ctx.lineWidth = s.width;
          ctx.beginPath();
          ctx.moveTo(s.x, s.y);
          ctx.lineTo(s.x + s.vx * 0.05, s.y + s.vy * 0.05);
          ctx.stroke();
        }
        ctx.restore();
      }

      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, [flickerIntensity, grainFPS, grainIntensity, maxDPR, scratchDensity]);

  return (
    <canvas
      ref={canvasRef}
      className={["pointer-events-none fixed inset-0 z-[5]", className].join(
        " "
      )}
      aria-hidden
    />
  );
}
