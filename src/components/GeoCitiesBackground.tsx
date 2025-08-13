"use client";

import React, { useEffect, useRef } from "react";

type GeoCitiesBackgroundProps = {
  className?: string;
};

/**
 * Loud 90s GeoCities-esque background that stays readable by adding a soft
 * dark overlay on top. Pure CSS; no external assets.
 */
export default function GeoCitiesBackground({
  className = "",
}: GeoCitiesBackgroundProps) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    // animate background position
    let raf: number | null = null;
    let t = 0;
    const loop = () => {
      t += 0.3;
      el.style.setProperty("--bgx", `${t}px`);
      el.style.setProperty("--bgy", `${t * 0.6}px`);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => {
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      ref={ref}
      className={["pointer-events-none fixed inset-0 z-0", className].join(" ")}
    >
      {/* garish tiling stripes */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          backgroundImage:
            "repeating-linear-gradient(45deg, #ffeb3b 0 12px, #ff4081 12px 24px, #40c4ff 24px 36px, #69f0ae 36px 48px)",
          backgroundSize: "auto",
          backgroundPosition: "var(--bgx,0) var(--bgy,0)",
          opacity: 0.22,
        }}
      />
      {/* dotted star layer */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(circle at 10% 20%, rgba(255,255,255,0.35) 0 1px, transparent 1px), radial-gradient(circle at 70% 80%, rgba(255,255,255,0.25) 0 1px, transparent 1px)",
          backgroundSize: "120px 120px, 160px 160px",
          backgroundPosition:
            "var(--bgy,0) var(--bgx,0), calc(var(--bgx,0)*-1) calc(var(--bgy,0)*-1)",
          opacity: 0.35,
        }}
      />
      {/* blackout overlay for readability */}
      <div className="absolute inset-0 bg-black/45" />
    </div>
  );
}
