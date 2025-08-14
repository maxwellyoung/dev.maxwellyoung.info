"use client";

import React, { useEffect, useRef } from "react";

type Props = { className?: string; scale?: number };

// Minimal isometric city: grid of extruded boxes with gentle day/night tint and slow motion.
export default function IsometricCity({ className = "", scale = 1 }: Props) {
  const ref = useRef<HTMLCanvasElement | null>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const c = ref.current;
    if (!c) return;
    const ctx = c.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(2, Math.max(1, window.devicePixelRatio || 1));
    const resize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      c.width = Math.floor(w * dpr);
      c.height = Math.floor(h * dpr);
      c.style.width = `${w}px`;
      c.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    // grid
    const cols = 16;
    const rows = 10;
    const tile = 40 * scale;
    const cx = () => window.innerWidth / 2;
    const cy = () => window.innerHeight / 2 + 60 * scale;

    type B = { i: number; j: number; h: number };
    const buildings: B[] = [];
    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        const base = Math.random() * 120 + 20;
        const noise = Math.sin(i * 0.7) * Math.cos(j * 0.6) * 20;
        buildings.push({ i, j, h: base + noise });
      }
    }

    const iso = (i: number, j: number) => {
      const x = (i - j) * (tile / 2);
      const y = (i + j) * (tile / 4);
      return { x, y };
    };

    const step = (t: number) => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      ctx.clearRect(0, 0, w, h);

      // day/night tint
      const day = (Math.sin(t / 6000) + 1) / 2; // 0..1
      const skyHue = 220 - day * 60; // shift blue -> dusk
      ctx.fillStyle = `hsl(${skyHue}, 40%, ${10 + 6 * day}%)`;
      ctx.fillRect(0, 0, w, h);

      ctx.save();
      ctx.translate(cx(), cy());

      // draw ground grid
      ctx.strokeStyle = "rgba(255,255,255,0.06)";
      ctx.lineWidth = 1;
      for (let i = -cols; i <= cols; i++) {
        ctx.beginPath();
        ctx.moveTo((i * tile) / 2, (-rows * tile) / 4);
        ctx.lineTo((i * tile) / 2, (rows * tile) / 4);
        ctx.stroke();
      }
      for (let j = -rows; j <= rows; j++) {
        ctx.beginPath();
        ctx.moveTo((-cols * tile) / 2, (j * tile) / 4);
        ctx.lineTo((cols * tile) / 2, (j * tile) / 4);
        ctx.stroke();
      }

      // simple camera sway
      const swayX = Math.sin(t / 3000) * 8 * scale;
      const swayY = Math.cos(t / 3500) * 6 * scale;
      ctx.translate(swayX, swayY);

      // draw buildings back-to-front for overlap
      buildings
        .slice()
        .sort((a, b) => a.i + a.j - (b.i + b.j))
        .forEach((b) => {
          const { x, y } = iso(b.i, b.j);
          const h3 = b.h * 0.8 * (0.8 + 0.2 * day);
          // top
          ctx.fillStyle = `rgba(255,255,255,${0.06 + 0.04 * day})`;
          ctx.beginPath();
          ctx.moveTo(x, y - h3);
          ctx.lineTo(x + tile / 2, y - h3 + tile / 4);
          ctx.lineTo(x, y - h3 + tile / 2);
          ctx.lineTo(x - tile / 2, y - h3 + tile / 4);
          ctx.closePath();
          ctx.fill();
          // right side
          ctx.fillStyle = `rgba(255,255,255,0.05)`;
          ctx.beginPath();
          ctx.moveTo(x, y);
          ctx.lineTo(x + tile / 2, y + tile / 4);
          ctx.lineTo(x + tile / 2, y - h3 + tile / 4);
          ctx.lineTo(x, y - h3);
          ctx.closePath();
          ctx.fill();
          // left side
          ctx.fillStyle = `rgba(255,255,255,0.04)`;
          ctx.beginPath();
          ctx.moveTo(x, y);
          ctx.lineTo(x, y - h3);
          ctx.lineTo(x - tile / 2, y - h3 + tile / 4);
          ctx.lineTo(x - tile / 2, y + tile / 4);
          ctx.closePath();
          ctx.fill();
        });

      ctx.restore();
      rafRef.current = requestAnimationFrame(step);
    };

    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reduce) step(performance.now());
    else rafRef.current = requestAnimationFrame(step);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
    };
  }, [scale]);

  return (
    <canvas
      ref={ref}
      aria-hidden
      className={["pointer-events-none fixed inset-0 z-0", className].join(" ")}
    />
  );
}

