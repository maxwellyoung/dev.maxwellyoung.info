"use client";

import React, { useEffect, useRef } from "react";

type Props = {
  className?: string;
  quality?: number; // 0.5..2 pixel ratio multiplier (perf/clarity)
  viscosity?: number; // 0..1 fade strength (higher = shorter trails)
  swirl?: number; // 0..1 background curl strength
  hueShift?: number; // hue shift speed
};

// A lightweight, GPU-free "fluid ink" effect. Not a true Navier–Stokes sim,
// but visually fluid: mouse/touch injects velocity and dye; background curl
// field keeps ink alive. Trails are produced by alpha veil.
export default function FluidInkBackground({
  className = "",
  quality = 1,
  viscosity = 0.06,
  swirl = 0.25,
  hueShift = 0.06,
}: Props) {
  const ref = useRef<HTMLCanvasElement | null>(null);
  const rafRef = useRef<number | null>(null);
  const pointerRef = useRef({ x: 0, y: 0, dx: 0, dy: 0, down: false });
  const hueRef = useRef(180);

  useEffect(() => {
    const c = ref.current;
    if (!c) return;
    const ctx = c.getContext("2d");
    if (!ctx) return;

    const maxDpr = 1.8;
    const dpr = Math.min(
      maxDpr,
      Math.max(1, (window.devicePixelRatio || 1) * quality)
    );
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

    // Track pointer globally so we don't need pointer events on the canvas
    const onMove = (e: MouseEvent | TouchEvent) => {
      let x = 0,
        y = 0;
      if ("touches" in e) {
        const t = e.touches[0] || e.changedTouches[0];
        if (!t) return;
        x = t.clientX;
        y = t.clientY;
      } else {
        x = (e as MouseEvent).clientX;
        y = (e as MouseEvent).clientY;
      }
      const p = pointerRef.current;
      p.dx = x - p.x;
      p.dy = y - p.y;
      p.x = x;
      p.y = y;
    };
    const onDown = () => (pointerRef.current.down = true);
    const onUp = () => (pointerRef.current.down = false);
    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("touchmove", onMove, { passive: true });
    window.addEventListener("mousedown", onDown);
    window.addEventListener("touchstart", onDown, { passive: true });
    window.addEventListener("mouseup", onUp);
    window.addEventListener("touchend", onUp);

    type Droplet = {
      x: number;
      y: number;
      vx: number;
      vy: number;
      r: number;
      h: number;
    };
    const drops: Droplet[] = [];

    const emit = (
      x: number,
      y: number,
      vx: number,
      vy: number,
      hue: number
    ) => {
      for (let i = 0; i < 6; i++) {
        drops.push({
          x: x + (Math.random() - 0.5) * 10,
          y: y + (Math.random() - 0.5) * 10,
          vx: vx * (0.6 + Math.random() * 0.6),
          vy: vy * (0.6 + Math.random() * 0.6),
          r: 6 + Math.random() * 10,
          h: hue + (Math.random() - 0.5) * 16,
        });
      }
    };

    const step = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      // alpha veil creates trails; higher viscosity = faster fade
      ctx.fillStyle = `rgba(0,0,0,${viscosity})`;
      ctx.fillRect(0, 0, w, h);

      // gentle background curl field
      const curl = (x: number, y: number) => {
        const nx = x / w - 0.5;
        const ny = y / h - 0.5;
        const a = Math.sin(nx * 3.1) * Math.cos(ny * 3.7);
        return { x: -ny * a * swirl * 2, y: nx * a * swirl * 2 };
      };

      // pointer-driven dye
      const p = pointerRef.current;
      if (p.down && Math.abs(p.dx) + Math.abs(p.dy) > 0.2) {
        hueRef.current = (hueRef.current + hueShift) % 360;
        emit(p.x, p.y, p.dx, p.dy, hueRef.current);
      }

      // integrate droplets
      ctx.globalCompositeOperation = "lighter";
      for (let i = drops.length - 1; i >= 0; i--) {
        const d = drops[i];
        const k = curl(d.x, d.y);
        d.vx += k.x;
        d.vy += k.y;
        d.vx *= 0.992;
        d.vy *= 0.992;
        d.x += d.vx;
        d.y += d.vy;
        d.r *= 0.998;
        // draw
        const g = ctx.createRadialGradient(d.x, d.y, 0, d.x, d.y, d.r * 3);
        g.addColorStop(0, `hsla(${Math.floor(d.h)}, 85%, 65%, 0.9)`);
        g.addColorStop(1, `hsla(${Math.floor(d.h)}, 85%, 65%, 0)`);
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
        ctx.fill();

        // cull if off-screen and tiny
        if (
          d.r < 1 &&
          (d.x < -50 || d.x > w + 50 || d.y < -50 || d.y > h + 50)
        ) {
          drops.splice(i, 1);
        }
      }
      ctx.globalCompositeOperation = "source-over";

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
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("touchmove", onMove as any);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("touchstart", onDown as any);
      window.removeEventListener("mouseup", onUp);
      window.removeEventListener("touchend", onUp as any);
    };
  }, [quality, viscosity, swirl, hueShift]);

  return (
    <canvas
      ref={ref}
      aria-hidden
      className={["fixed inset-0 z-0", className].join(" ")}
      style={{ pointerEvents: "none" }}
    />
  );
}
