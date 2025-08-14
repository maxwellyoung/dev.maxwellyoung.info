"use client";

import React, { useEffect, useRef } from "react";

type DotMatrixProps = {
  /**
   * Optional extra class names to adjust masking/positioning per page.
   */
  className?: string;
  /**
   * Grid spacing in px; larger = bigger, sparser dots
   */
  size?: number;
  /**
   * Drift multiplier for the animated background-position
   */
  drift?: number;
  /**
   * Parallax translation in px at screen edge. 0 disables pointer reaction.
   */
  parallax?: number;
};

/**
 * Subtle, performant dot-matrix backdrop using a CSS radial-gradient.
 * Rendered fixed and non-interactive behind all content.
 */
export default function DotMatrix({
  className = "",
  size = 16,
  drift = 1,
  parallax = 6,
}: DotMatrixProps) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Initialize CSS variables
    el.style.setProperty("--dot-size", `${size}px`);
    el.style.setProperty("--drift-x", `${Math.round(size * drift)}px`);
    el.style.setProperty("--drift-y", `${Math.round((size / 2) * drift)}px`);

    // Respect reduced motion
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced || parallax === 0) return;

    const onMove = (e: PointerEvent) => {
      const w = window.innerWidth || 1;
      const h = window.innerHeight || 1;
      const nx = (e.clientX / w) * 2 - 1; // -1..1
      const ny = (e.clientY / h) * 2 - 1; // -1..1
      const tx = Math.max(-1, Math.min(1, nx)) * parallax;
      const ty = Math.max(-1, Math.min(1, ny)) * parallax;
      el.style.transform = `translate3d(${tx}px, ${ty}px, 0)`;
      // Bias the vignette focus slightly toward the pointer
      const fx = 50 + nx * 6; // percent
      const fy = 30 + ny * 6; // percent
      el.style.setProperty("--mask-focus-x", `${fx}%`);
      el.style.setProperty("--mask-focus-y", `${fy}%`);
    };
    window.addEventListener("pointermove", onMove);
    return () => window.removeEventListener("pointermove", onMove);
  }, [size, drift, parallax]);

  return <div ref={ref} aria-hidden className={`dot-matrix ${className}`} />;
}
