"use client";

import React, { useEffect, useRef } from "react";

type CitySceneProps = {
  className?: string;
  dprMax?: number;
  snow?: boolean;
  crowd?: boolean;
  lights?: boolean;
  speed?: number;
};

/**
 * Festive isometric city vignette (canvas 2D):
 * - Isometric tile grid with glowing windows
 * - Tiny NPCs moving on loops
 * - Snow particles
 * - Perf safe: DPR cap, pause when hidden, reduced-motion support
 */
export default function CityScene({
  className = "",
  dprMax = 2,
  snow = true,
  crowd = true,
  lights = true,
  speed = 1,
}: CitySceneProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    let isHidden = document.visibilityState === "hidden";
    const onVis = () => (isHidden = document.visibilityState === "hidden");
    document.addEventListener("visibilitychange", onVis);

    const dpr = Math.min(dprMax, Math.max(1, window.devicePixelRatio || 1));

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

    // City params
    const centerX = () => window.innerWidth * 0.5;
    const centerY = () => window.innerHeight * 0.48;
    const tile = 18; // base tile size
    const cols = 14;
    const rows = 10;

    // Precompute building windows map
    const windows: Array<{
      x: number;
      y: number;
      z: number;
      hue: number;
      on: number;
    }> = [];
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const z = 1 + ((r + c) % 4); // pseudo height
        const hue = [30, 45, 200, 180][(r * 3 + c) % 4];
        windows.push({ x: c, y: r, z, hue, on: Math.random() });
      }
    }

    // Snow
    const snowCount = snow
      ? Math.min(
          220,
          Math.floor((window.innerWidth * window.innerHeight) / 9000)
        )
      : 0;
    const flakes = Array.from({ length: snowCount }).map(() => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      v: 0.5 + Math.random() * 1.2,
      a: Math.random() * Math.PI * 2,
      r: 0.6 + Math.random() * 0.9,
    }));

    // NPCs
    const npcCount = crowd ? 20 : 0;
    const npcs = Array.from({ length: npcCount }).map((_, i) => ({
      t: Math.random(),
      speed: 0.03 + Math.random() * 0.06,
      color: `hsl(${(i * 37) % 360} 80% 70%)`,
    }));

    const iso = (cx: number, cy: number, gx: number, gy: number) => ({
      x: cx + (gx - gy) * tile,
      y: cy + (gx + gy) * tile * 0.5,
    });

    const drawTile = (
      x: number,
      y: number,
      h: number,
      hue: number,
      twinkle: number
    ) => {
      // Base diamond
      ctx.fillStyle = "#0b1214";
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(x + tile, y + tile * 0.5);
      ctx.lineTo(x, y + tile);
      ctx.lineTo(x - tile, y + tile * 0.5);
      ctx.closePath();
      ctx.fill();
      // Tower
      if (h > 1) {
        const height = h * tile * 0.75;
        const g = ctx.createLinearGradient(x, y, x, y - height);
        g.addColorStop(0, "#111a1d");
        g.addColorStop(1, "#22343a");
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.moveTo(x - tile, y + tile * 0.5);
        ctx.lineTo(x - tile, y - height + tile * 0.5);
        ctx.lineTo(x, y - height);
        ctx.lineTo(x, y);
        ctx.closePath();
        ctx.fill();
        ctx.beginPath();
        ctx.moveTo(x + tile, y + tile * 0.5);
        ctx.lineTo(x + tile, y - height + tile * 0.5);
        ctx.lineTo(x, y - height);
        ctx.lineTo(x, y);
        ctx.closePath();
        ctx.fill();
        // windows glow
        if (lights) {
          const a = 0.15 + twinkle * 0.25;
          ctx.fillStyle = `hsla(${hue}, 80%, 60%, ${a})`;
          ctx.fillRect(x - 2, y - height + 4, 4, 4);
        }
      }
    };

    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      if (isHidden) {
        raf = requestAnimationFrame(tick);
        return;
      }
      const t = ((now - start) / 1000) * (prefersReduced ? 0.4 : speed);
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

      // City grid
      const cx = centerX();
      const cy = centerY();
      for (const w of windows) {
        const p = iso(cx, cy, w.x - cols / 2, w.y - rows / 2);
        const tw =
          (Math.sin(w.x * 13.1 + w.y * 7.7 + t * 2.3) + 1) * 0.5 * w.on;
        drawTile(p.x, p.y, w.z, w.hue, tw);
      }

      // NPCs
      if (npcs.length) {
        npcs.forEach((n) => {
          n.t = (n.t + n.speed * (prefersReduced ? 0.5 : 1)) % 1;
          const gx = Math.sin(n.t * Math.PI * 2) * (cols * 0.35) + cols * 0.5;
          const gy = Math.cos(n.t * Math.PI * 2) * (rows * 0.25) + rows * 0.5;
          const p = iso(cx, cy, gx - cols / 2, gy - rows / 2);
          ctx.fillStyle = n.color;
          ctx.beginPath();
          ctx.arc(p.x, p.y - 2, 1.6, 0, Math.PI * 2);
          ctx.fill();
        });
      }

      // Snow
      if (flakes.length) {
        ctx.fillStyle = "rgba(255,255,255,0.8)";
        flakes.forEach((f) => {
          f.y += f.v * (prefersReduced ? 0.4 : 1);
          f.x += Math.sin((f.a += 0.02)) * 0.2;
          if (f.y > window.innerHeight) {
            f.y = -4;
            f.x = Math.random() * window.innerWidth;
          }
          ctx.fillRect(f.x, f.y, f.r, f.r);
        });
      }

      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", onVis);
    };
  }, [crowd, dprMax, lights, snow, speed]);

  return (
    <canvas
      ref={canvasRef}
      className={["pointer-events-none fixed inset-0 z-0", className].join(" ")}
      aria-hidden
    />
  );
}
