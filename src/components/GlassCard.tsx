"use client";

import React, { PropsWithChildren, useEffect, useRef, useState } from "react";

type GlassCardProps = PropsWithChildren<{
  className?: string;
  parallaxStrength?: number;
  hoverScale?: number;
}>;

/**
 * High-quality glass panel with soft border, inner highlight, and backdrop blur.
 * Tracks pointer for a gentle specular highlight.
 */
export default function GlassCard({
  className = "",
  children,
  parallaxStrength = 0,
  hoverScale = 1,
}: GlassCardProps) {
  const outerRef = useRef<HTMLDivElement | null>(null);
  const innerRef = useRef<HTMLDivElement | null>(null);
  const [prefersReduced, setPrefersReduced] = useState(false);

  useEffect(() => {
    const el = outerRef.current;
    if (!el) return;
    const onMove = (e: PointerEvent) => {
      const rect = el.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      el.style.setProperty("--mx", x.toString());
      el.style.setProperty("--my", y.toString());
    };
    window.addEventListener("pointermove", onMove);
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  useEffect(() => {
    setPrefersReduced(
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    );
    const el = outerRef.current;
    const inner = innerRef.current;
    if (!el || !inner) return;

    let hovered = false;
    const update = () => {
      if (!inner) return;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight || 1;
      const centerDelta = r.top + r.height / 2 - vh / 2;
      const progress = Math.max(-1, Math.min(1, centerDelta / (vh / 2)));
      const translateY = (prefersReduced ? 0 : parallaxStrength) * progress;
      const scale = hovered ? hoverScale : 1;
      inner.style.transform = `translate3d(0, ${translateY}px, 0) scale(${scale})`;
    };

    const onScroll = () => update();
    const onResize = () => update();
    const onEnter = () => {
      hovered = true;
      update();
    };
    const onLeave = () => {
      hovered = false;
      update();
    };

    update();
    if (parallaxStrength !== 0) {
      window.addEventListener("scroll", onScroll, { passive: true });
      window.addEventListener("resize", onResize);
    }
    if (hoverScale !== 1) {
      el.addEventListener("pointerenter", onEnter);
      el.addEventListener("pointerleave", onLeave);
    }
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      el.removeEventListener("pointerenter", onEnter);
      el.removeEventListener("pointerleave", onLeave);
    };
  }, [hoverScale, parallaxStrength, prefersReduced]);

  return (
    <div
      ref={outerRef}
      className={[
        "relative rounded-3xl",
        "backdrop-blur-xl bg-white/6 ring-1 ring-inset ring-white/15",
        "shadow-[0_30px_80px_-20px_rgba(0,0,0,0.45)]",
        className,
      ].join(" ")}
    >
      {/* border glow */}
      <div className="pointer-events-none absolute inset-0 rounded-3xl ring-1 ring-white/10" />

      {/* specular highlight following cursor */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-3xl"
        style={{
          background:
            "radial-gradient(600px 300px at calc(var(--mx,0.5)*100%) calc(var(--my,0.5)*100%), rgba(255,255,255,0.10), rgba(255,255,255,0))",
        }}
      />

      {/* inner content with parallax + hover scale */}
      <div ref={innerRef} className="relative z-10 will-change-transform">
        {children}
      </div>
    </div>
  );
}
