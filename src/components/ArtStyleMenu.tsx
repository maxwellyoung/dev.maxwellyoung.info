"use client";

import React from "react";
import { useArtStyle, ArtStyle } from "@/components/providers/ArtStyleProvider";

const styles: { key: ArtStyle; label: string }[] = [
  { key: "default", label: "Default (no bg)" },
  { key: "aurora", label: "Aurora" },
  { key: "dots", label: "Dot Matrix" },
  { key: "particles", label: "Particle Field" },
  { key: "film", label: "Brakhage Film" },
  { key: "matrix", label: "Matrix" },
  { key: "vhs", label: "VHS Scanlines" },
  { key: "flow", label: "Flow Field" },
  { key: "fluid", label: "Fluid Ink (interactive)" },
  { key: "city", label: "Isometric City" },
];

export default function ArtStyleMenu() {
  const { style, setStyle, isMenuOpen, toggleMenu } = useArtStyle();
  if (!isMenuOpen)
    return (
      <button
        onClick={toggleMenu}
        className="fixed bottom-4 right-4 z-[60] h-9 rounded-full px-3 text-xs bg-white/80 text-neutral-900 backdrop-blur ring-1 ring-black/10 hover:bg-white"
        title="Art styles (Ctrl/Cmd+Shift+A)"
        aria-label="Open art styles"
      >
        styles
      </button>
    );

  return (
    <div className="fixed inset-0 z-[70] flex items-end sm:items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40" onClick={toggleMenu} />
      <div className="relative w-full max-w-sm rounded-2xl bg-neutral-900/80 backdrop-blur ring-1 ring-white/10 p-4 text-sm text-white">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-white/90">Art styles</h3>
          <button
            onClick={toggleMenu}
            className="text-white/70 hover:text-white"
          >
            close
          </button>
        </div>
        <div className="space-y-2">
          {styles.map((s) => (
            <button
              key={s.key}
              onClick={() => {
                try {
                  console.log("[ArtStyleMenu] click", s.key);
                } catch {}
                setStyle(s.key);
                toggleMenu();
              }}
              className={
                "w-full text-left rounded-lg px-3 py-2 ring-1 transition " +
                (style === s.key
                  ? "bg-white/10 ring-white/30"
                  : "bg-transparent ring-white/10 hover:bg-white/5")
              }
            >
              {s.label}
            </button>
          ))}
        </div>
        <p className="mt-3 text-xs text-white/60">
          Tip: press Ctrl/Cmd+Shift+A anywhere.
        </p>
      </div>
    </div>
  );
}
