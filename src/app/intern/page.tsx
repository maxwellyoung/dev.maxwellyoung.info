"use client";

import React, { useEffect, useState } from "react";
import InternInfo from "@/components/InternInfo";
import PastelHazeBackground from "@/components/PastelHazeBackground";
import { useArtStyle } from "@/components/providers/ArtStyleProvider";
// Ambient physics removed per request

export default function InternPage() {
  const [ambientOn, setAmbientOn] = useState(false);
  const { style } = useArtStyle();

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) setAmbientOn(false);
  }, []);

  return (
    <div className="relative min-h-screen">
      {style === "default" && (
        <PastelHazeBackground
          className="fixed inset-0 z-0"
          opacity={0.5}
          speed={0.35}
          blobCount={9}
          grainIntensity={0.04}
          grainFPS={8}
          data-art-bg
        />
      )}
      {/* ambient scene disabled */}
      <div className="relative z-10 mx-auto max-w-2xl p-4 md:p-8">
        <InternInfo />
      </div>
      <a
        href="/"
        className="absolute top-4 left-4 z-10 text-xs text-white/85 underline"
      >
        back
      </a>
      {/* ambient toggle removed to reduce UI noise */}
    </div>
  );
}
