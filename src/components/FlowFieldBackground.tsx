"use client";

import React, { useEffect, useRef } from "react";

type Props = {
  className?: string;
  lineCount?: number;
  color?: string;
  lineWidth?: number;
  glow?: number;
  blendMode?: GlobalCompositeOperation;
};

export default function FlowFieldBackground({
  className = "",
  lineCount = 1200,
  color = "rgba(255,255,255,0.12)",
  lineWidth = 1.25,
  glow = 2,
  blendMode = "lighter",
}: Props) {
  const ref = useRef<HTMLCanvasElement | null>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const c = ref.current;
    if (!c) return;
    const ctx = c.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(1.5, Math.max(1, window.devicePixelRatio || 1));
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

    type P = { x: number; y: number; t: number };
    const ps: P[] = Array.from({ length: lineCount }).map(() => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      t: Math.random() * 1000,
    }));

    function noise(x: number, y: number) {
      // cheap hash-based noise (not true Perlin; good enough for flow)
      const s = Math.sin(x * 12.9898 + y * 78.233) * 43758.5453;
      return s - Math.floor(s);
    }

    const step = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      ctx.clearRect(0, 0, w, h);
      ctx.globalCompositeOperation = blendMode;
      ctx.strokeStyle = color;
      ctx.lineWidth = lineWidth;
      ctx.shadowColor = color;
      ctx.shadowBlur = glow;
      ctx.beginPath();
      ps.forEach((p) => {
        const a = noise(p.x * 0.002, p.y * 0.002 + p.t) * Math.PI * 2;
        const nx = p.x + Math.cos(a) * 12;
        const ny = p.y + Math.sin(a) * 12;
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(nx, ny);
        p.x = (nx + w) % w;
        p.y = (ny + h) % h;
        p.t += 0.0025;
      });
      ctx.stroke();
      ctx.shadowBlur = 0;
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
  }, [lineCount, color, lineWidth, glow, blendMode]);

  return (
    <canvas
      ref={ref}
      aria-hidden
      className={["pointer-events-none fixed inset-0 z-0", className].join(" ")}
    />
  );
}
