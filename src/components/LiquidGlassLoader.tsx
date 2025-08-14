"use client";

import React, { useEffect, useRef } from "react";

type Props = {
  visible?: boolean;
  text?: string;
};

export default function LiquidGlassLoader({
  visible = false,
  text = "Generating…",
}: Props) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf: number | null = null;
    let t0 = performance.now();
    const step = (now: number) => {
      const t = (now - t0) / 1000;
      const x = 50 + Math.sin(t * 0.9) * 40; // 10%..90%
      const y = 50 + Math.cos(t * 0.7) * 40;
      el.style.setProperty("--lgx", `${x}%`);
      el.style.setProperty("--lgy", `${y}%`);
      raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => {
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      ref={ref}
      role="status"
      aria-live="polite"
      aria-busy
      className="fixed inset-0 z-[80] pointer-events-none"
      style={{ ["--lgx" as any]: "50%", ["--lgy" as any]: "50%" }}
    >
      {/* soft dark veil */}
      <div className="absolute inset-0 bg-black/35 backdrop-blur-sm" />
      {/* liquid glass card in center */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <div
          className="relative w-[180px] h-[180px] rounded-3xl overflow-hidden backdrop-blur-xl ring-1 ring-white/20"
          style={{
            background:
              "radial-gradient(120px 120px at var(--lgx) var(--lgy), rgba(255,255,255,0.18), rgba(255,255,255,0) 60%), linear-gradient(135deg, rgba(255,255,255,0.08), rgba(255,255,255,0.02))",
          }}
        >
          {/* inner shimmer */}
          <div
            className="absolute -inset-1 animate-pulse"
            style={{
              background:
                "radial-gradient(100px 100px at 30% 20%, rgba(255,255,255,0.12), rgba(255,255,255,0) 60%)",
              filter: "blur(10px)",
            }}
          />
          {/* subtle scanline to sell the glass */}
          <div
            className="absolute inset-0 opacity-[0.17]"
            style={{
              backgroundImage:
                "repeating-linear-gradient(180deg, rgba(255,255,255,0.35) 0 1px, rgba(255,255,255,0) 1px 3px)",
              mixBlendMode: "overlay",
            }}
          />
          {/* loader dots */}
          <div className="absolute inset-0 flex items-end justify-center pb-4">
            <div className="flex gap-1.5">
              <span className="size-1.5 rounded-full bg-white/80 animate-bounce [animation-delay:-.2s]" />
              <span className="size-1.5 rounded-full bg-white/70 animate-bounce [animation-delay:-.1s]" />
              <span className="size-1.5 rounded-full bg-white/60 animate-bounce" />
            </div>
          </div>
        </div>
        <div className="mt-3 text-center text-xs text-white/80">{text}</div>
      </div>
      <span className="sr-only">{text}</span>
    </div>
  );
}
