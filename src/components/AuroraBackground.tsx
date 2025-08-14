"use client";

import React, { useEffect, useRef } from "react";

type Props = {
  className?: string;
  opacity?: number;
  speed?: number;
};

export default function AuroraBackground({
  className = "",
  opacity = 0.5,
  speed = 0.2,
}: Props) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const c = canvasRef.current;
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

    const blobs = Array.from({ length: 4 }).map((_, i) => ({
      hue: [200, 270, 320, 160][i % 4],
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      r: 220 + Math.random() * 320,
      phase: Math.random() * Math.PI * 2,
      vx: (Math.random() * 0.6 + 0.2) * (Math.random() < 0.5 ? -1 : 1),
      vy: (Math.random() * 0.4 + 0.2) * (Math.random() < 0.5 ? -1 : 1),
    }));

    const start = performance.now();
    const render = (now: number) => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      ctx.clearRect(0, 0, w, h);
      ctx.globalCompositeOperation = "lighter";
      ctx.globalAlpha = opacity;

      const t = ((now - start) / 1000) * speed;
      blobs.forEach((b, i) => {
        b.x += b.vx;
        b.y += b.vy;
        if (b.x < -b.r) b.x = w + b.r;
        if (b.x > w + b.r) b.x = -b.r;
        if (b.y < -b.r) b.y = h + b.r;
        if (b.y > h + b.r) b.y = -b.r;
        const g = ctx.createRadialGradient(b.x, b.y, 0, b.x, b.y, b.r);
        const hue = b.hue + Math.sin(t + i) * 10;
        g.addColorStop(0, `hsla(${hue}, 92%, 72%, 1)`);
        g.addColorStop(0.55, `hsla(${hue}, 84%, 60%, 0.5)`);
        g.addColorStop(1, `hsla(${hue}, 70%, 52%, 0)`);
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2);
        ctx.fill();
      });

      rafRef.current = requestAnimationFrame(render);
    };

    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reduce) {
      render(performance.now());
    } else {
      rafRef.current = requestAnimationFrame(render);
    }

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
    };
  }, [opacity, speed]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className={["pointer-events-none fixed inset-0 z-0", className].join(" ")}
    />
  );
}
