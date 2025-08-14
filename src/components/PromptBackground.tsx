"use client";

import React from "react";
import AuroraBackground from "@/components/AuroraBackground";
import ParticleField from "@/components/ParticleField";
import FlowFieldBackground from "@/components/FlowFieldBackground";
import MeshWarpBackground from "@/components/MeshWarpBackground";
import PastelHazeBackground from "@/components/PastelHazeBackground";
import VhsScanlines from "@/components/VhsScanlines";
import MatrixRain from "@/components/MatrixRain";

type Props = {
  className?: string;
  prompt?: string;
};

function includesAny(text: string, words: string[]) {
  const t = text.toLowerCase();
  return words.some((w) => t.includes(w));
}

export default function PromptBackground({
  className = "",
  prompt = "",
}: Props) {
  const p = (prompt || "").toLowerCase();

  // Simple mapping from prompt keywords to layered backgrounds
  // No external API calls; purely client-side interpretation
  if (includesAny(p, ["matrix", "cyber", "neon code", "hacker"])) {
    return (
      <MatrixRain
        className={["pointer-events-none fixed inset-0 z-0", className].join(
          " "
        )}
        fontSize={14}
        headColor="#A8FFB6"
        tailColor="#00FF7F"
        tailLength={24}
        speedMin={0.9}
        speedMax={1.9}
      />
    );
  }

  if (includesAny(p, ["vhs", "crt", "retro", "analog"])) {
    return (
      <VhsScanlines
        className={className}
        opacity={0.22}
        lineOpacity={0.24}
        gap={2}
        wobble={1.1}
        speed={0.8}
        chroma
      />
    );
  }

  if (includesAny(p, ["firefly", "fireflies", "candle", "cabin", "quaint"])) {
    return (
      <ParticleField
        className={className}
        count={60}
        color="rgba(255,235,130,0.9)"
        size={1.4}
        trail={0.05}
        linkDistance={0}
        linkColor="255,235,130"
        linkOpacity={0}
      />
    );
  }

  if (includesAny(p, ["aurora", "borealis", "dawn", "twilight"])) {
    return (
      <AuroraBackground className={className} opacity={0.55} speed={0.14} />
    );
  }

  if (includesAny(p, ["flow", "wind", "field", "glow lines"])) {
    return (
      <FlowFieldBackground
        className={className}
        lineCount={1400}
        color="rgba(255,255,255,0.14)"
        lineWidth={1.2}
        glow={4}
        blendMode="screen"
      />
    );
  }

  if (includesAny(p, ["mesh", "warp", "pastiche"])) {
    return <MeshWarpBackground className={className} opacity={0.55} />;
  }

  // default: soft haze with subtle particles based on tone words
  const isCool = includesAny(p, [
    "midnight",
    "blue",
    "forest",
    "moss",
    "teal",
    "night",
  ]);
  const isWarm = includesAny(p, [
    "candle",
    "amber",
    "gold",
    "sunset",
    "dawn",
    "warm",
  ]);
  const tint = isWarm ? 28 : isCool ? 200 : 260;

  return (
    <>
      <PastelHazeBackground
        className={className}
        opacity={0.28}
        speed={0.2}
        blobCount={8}
        grainIntensity={0.02}
        grainFPS={8}
        hueBias={tint}
      />
      <ParticleField
        className="z-0"
        count={isWarm ? 70 : 50}
        color={isWarm ? "rgba(255,220,170,0.45)" : "rgba(190,220,255,0.35)"}
        size={1}
        trail={0.06}
        linkDistance={0}
        linkColor="255,255,255"
        linkOpacity={0}
      />
    </>
  );
}
