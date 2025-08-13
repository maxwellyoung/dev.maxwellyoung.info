"use client";

import React, { useEffect, useRef } from "react";

type Props = {
  className?: string;
  density?: number; // lower = longer streams
  color?: string; // tail color
  headColor?: string; // bright head color
  fontSize?: number; // px size per glyph
};

export default function AsciiRain({
  className = "",
  density = 0.9,
  color = "#0aff6e",
  headColor = "#c9ffd3",
  fontSize = 14,
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

    const columns = Math.max(1, Math.floor(window.innerWidth / fontSize));
    const drops = new Array(columns).fill(0).map(() => Math.random() * 20);
    const speeds = new Array(columns)
      .fill(0)
      .map(() => 0.8 + Math.random() * 1.6); // per-column speed
    const chars =
      "アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨワ0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";

    const step = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      // darker veil to create trails; lower alpha = longer trails
      ctx.fillStyle = "rgba(0,0,0,0.08)";
      ctx.fillRect(0, 0, w, h);
      ctx.font = `${fontSize}px monospace`;
      for (let i = 0; i < drops.length; i++) {
        const x = i * fontSize;
        const y = drops[i] * fontSize;
        const ch = chars[Math.floor(Math.random() * chars.length)];
        // draw head bright with glow
        ctx.fillStyle = headColor;
        ctx.shadowColor = headColor;
        ctx.shadowBlur = 8;
        ctx.fillText(ch, x, y);
        // draw a faint extra tail glyph above head for density
        ctx.shadowBlur = 0;
        ctx.fillStyle = color;
        if (y - fontSize > 0 && Math.random() > 0.4) {
          const ch2 = chars[Math.floor(Math.random() * chars.length)];
          ctx.fillText(ch2, x, y - fontSize);
        }
        // reset stream with some randomness
        if (y > h && Math.random() > density) drops[i] = 0;
        drops[i] += speeds[i];
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
  }, [density, color, headColor, fontSize]);

  return (
    <canvas
      ref={ref}
      aria-hidden
      className={["pointer-events-none fixed inset-0 z-0", className].join(" ")}
    />
  );
}
