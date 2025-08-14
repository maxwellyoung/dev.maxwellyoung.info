"use client";

import React, { useEffect, useRef } from "react";

type Props = {
  className?: string;
  count?: number;
  color?: string;
  size?: number; // base radius multiplier
  trail?: number; // 0..1 trail strength
  linkDistance?: number; // px distance within which to draw lines
  linkColor?: string;
  linkOpacity?: number; // 0..1
};

export default function ParticleField({
  className = "",
  count = 80,
  color = "rgba(255,255,255,0.55)",
  size = 1,
  trail = 0.08,
  linkDistance = 110,
  linkColor = "255,255,255",
  linkOpacity = 0.16,
}: Props) {
  const ref = useRef<HTMLCanvasElement | null>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const c = ref.current;
    if (!c) return;
    const ctx = c.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(1.8, Math.max(1, window.devicePixelRatio || 1));
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

    type P = { x: number; y: number; vx: number; vy: number; r: number };
    const ps: P[] = Array.from({ length: count }).map(() => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      r: Math.random() * 1.6 + 0.4,
    }));

    const step = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      ctx.fillStyle = `rgba(0,0,0,${trail})`;
      ctx.fillRect(0, 0, w, h);
      ctx.fillStyle = color;
      ps.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < -5) p.x = w + 5;
        if (p.x > w + 5) p.x = -5;
        if (p.y < -5) p.y = h + 5;
        if (p.y > h + 5) p.y = -5;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r * size, 0, Math.PI * 2);
        ctx.fill();
      });
      // linking lines
      ctx.lineWidth = 1;
      for (let i = 0; i < ps.length; i++) {
        for (let j = i + 1; j < ps.length; j++) {
          const dx = ps[i].x - ps[j].x;
          const dy = ps[i].y - ps[j].y;
          const d2 = dx * dx + dy * dy;
          const maxD2 = linkDistance * linkDistance;
          if (d2 < maxD2) {
            const a = (1 - d2 / maxD2) * linkOpacity; // fade with distance
            ctx.strokeStyle = `rgba(${linkColor},${a})`;
            ctx.beginPath();
            ctx.moveTo(ps[i].x, ps[i].y);
            ctx.lineTo(ps[j].x, ps[j].y);
            ctx.stroke();
          }
        }
      }
      rafRef.current = requestAnimationFrame(step);
    };

    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reduce) step();
    else rafRef.current = requestAnimationFrame(step);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
    };
  }, [count, color]);

  return (
    <canvas
      ref={ref}
      aria-hidden
      className={["pointer-events-none fixed inset-0 z-0", className].join(" ")}
    />
  );
}
