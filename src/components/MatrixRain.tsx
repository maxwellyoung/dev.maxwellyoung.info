"use client";

import React, { useEffect, useRef } from "react";

type Props = {
  className?: string;
  fontSize?: number; // px
  headColor?: string;
  tailColor?: string;
  tailLength?: number; // number of glyphs in trail
  speedMin?: number;
  speedMax?: number;
};

export default function MatrixRain({
  className = "",
  fontSize = 14,
  headColor = "#c9ffd3",
  tailColor = "#00ff7f",
  tailLength = 20,
  speedMin = 0.9,
  speedMax = 1.9,
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
    const chars =
      "アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨワ0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const heads = new Array(columns).fill(0).map(() => Math.random() * 20);
    const speeds = new Array(columns)
      .fill(0)
      .map(() => speedMin + Math.random() * (speedMax - speedMin));

    ctx.font = `${fontSize}px monospace`;

    const step = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      // black veil for persistence trails
      ctx.fillStyle = "rgba(0,0,0,0.08)";
      ctx.fillRect(0, 0, w, h);

      for (let i = 0; i < columns; i++) {
        const headY = heads[i] * fontSize;
        const x = i * fontSize;

        // draw trail from tailLength..1 (dim -> bright)
        for (let k = tailLength; k >= 0; k--) {
          const y = headY - k * fontSize;
          if (y < 0 || y > h) continue;
          const ch = chars[Math.floor(Math.random() * chars.length)];
          if (k === 0) {
            // bright head
            ctx.fillStyle = headColor;
            ctx.shadowColor = headColor;
            ctx.shadowBlur = 8;
            ctx.fillText(ch, x, y);
            ctx.shadowBlur = 0;
          } else {
            // tail with gradient alpha
            const a = Math.max(0, 1 - k / (tailLength + 2));
            ctx.fillStyle = hexWithAlpha(tailColor, a);
            ctx.fillText(ch, x, y);
          }
        }

        // advance head
        heads[i] += speeds[i];
        if (headY > h && Math.random() > 0.975) {
          heads[i] = 0;
          speeds[i] = speedMin + Math.random() * (speedMax - speedMin);
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
  }, [fontSize, headColor, tailColor, tailLength, speedMin, speedMax]);

  return (
    <canvas
      ref={ref}
      aria-hidden
      className={["pointer-events-none fixed inset-0 z-0", className].join(" ")}
    />
  );
}

function hexWithAlpha(hex: string, alpha: number): string {
  // supports #RRGGBB or rgb/rgba strings; for #RRGGBB convert to rgba
  if (hex.startsWith("#") && (hex.length === 7 || hex.length === 4)) {
    let r: number, g: number, b: number;
    if (hex.length === 7) {
      r = parseInt(hex.slice(1, 3), 16);
      g = parseInt(hex.slice(3, 5), 16);
      b = parseInt(hex.slice(5, 7), 16);
    } else {
      r = parseInt(hex[1] + hex[1], 16);
      g = parseInt(hex[2] + hex[2], 16);
      b = parseInt(hex[3] + hex[3], 16);
    }
    return `rgba(${r},${g},${b},${alpha})`;
  }
  if (hex.startsWith("rgb")) return hex; // assume caller included alpha
  return hex;
}
