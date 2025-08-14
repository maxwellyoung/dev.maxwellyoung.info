"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import PastelHazeBackground from "@/components/PastelHazeBackground";
import DotMatrix from "@/components/DotMatrix";
import BrakhageOverlay from "@/components/BrakhageOverlay";
import GlassFlareOverlay from "@/components/GlassFlareOverlay";
import GeoCitiesBackground from "@/components/GeoCitiesBackground";
import VhsScanlines from "@/components/VhsScanlines";
import AuroraBackground from "@/components/AuroraBackground";
import ParticleField from "@/components/ParticleField";
import MeshWarpBackground from "@/components/MeshWarpBackground";
import AsciiRain from "@/components/AsciiRain";
import MatrixRain from "@/components/MatrixRain";
import FlowFieldBackground from "@/components/FlowFieldBackground";
import FluidInkBackground from "@/components/FluidInkBackground";
import CityScene from "@/components/CityScene";

export type ArtStyle =
  | "default"
  | "haze"
  | "dots"
  | "film"
  | "geocities"
  | "vhs"
  | "aurora"
  | "particles"
  | "mesh"
  | "ascii"
  | "matrix"
  | "flow";
// additional flex modes
// "fluid" and "city" added below

type Ctx = {
  style: ArtStyle;
  setStyle: (s: ArtStyle) => void;
  toggleMenu: () => void;
  isMenuOpen: boolean;
};

const ArtStyleContext = createContext<Ctx | null>(null);

export function useArtStyle() {
  const ctx = useContext(ArtStyleContext);
  if (!ctx) throw new Error("useArtStyle must be used within ArtStyleProvider");
  return ctx;
}

export default function ArtStyleProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [style, setStyle] = useState<ArtStyle>("default");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // hydrate from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem("art-style");
      if (
        saved === "haze" ||
        saved === "dots" ||
        saved === "default" ||
        saved === "film" ||
        saved === "geocities"
      ) {
        setStyle(saved);
      } else if (typeof window !== "undefined" && window.innerWidth < 768) {
        // prefer no background by default on small screens
        setStyle("default");
      }
    } catch {}
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem("art-style", style);
    } catch {}
    // DEBUG LOGS: style changes + background counts
    try {
      // eslint-disable-next-line no-console
      console.log("[ArtStyle] style=", style);
      // eslint-disable-next-line no-console
      console.log(
        "[ArtStyle] provider backgrounds present:",
        document.querySelectorAll("[data-art-bg]")?.length
      );
      // eslint-disable-next-line no-console
      console.log(
        "[ArtStyle] page canvases (fixed inset-0):",
        document.querySelectorAll("canvas.pointer-events-none.fixed.inset-0")
          ?.length
      );
      // eslint-disable-next-line no-console
      console.log(
        "[ArtStyle] dot-matrix nodes:",
        document.querySelectorAll(".dot-matrix")?.length
      );
    } catch {}
  }, [style]);

  // keyboard toggle: Cmd/Ctrl + Shift + A
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const mod = e.metaKey || e.ctrlKey;
      if (mod && e.shiftKey && (e.key === "A" || e.key === "a")) {
        e.preventDefault();
        setIsMenuOpen((v) => !v);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const value = useMemo<Ctx>(
    () => ({
      style,
      setStyle,
      toggleMenu: () => setIsMenuOpen((v) => !v),
      isMenuOpen,
    }),
    [style, isMenuOpen]
  );

  return (
    <ArtStyleContext.Provider value={value}>
      {/* global background renderer */}
      {style === "haze" && (
        <>
          <PastelHazeBackground
            className="fixed inset-0 z-0"
            opacity={0.32}
            speed={0.24}
            blobCount={8}
            grainIntensity={0.018}
            grainFPS={8}
            // @ts-expect-error custom attribute for debugging
            data-art-bg
          />
          {/* subtle flare on desktop for premium glass feel */}
          <GlassFlareOverlay className="hidden md:block" strength={0.06} />
        </>
      )}
      {style === "dots" && (
        <DotMatrix className="fixed inset-0 z-0 opacity-60" />
      )}
      {style === "film" && (
        <>
          <PastelHazeBackground
            className="fixed inset-0 z-0"
            opacity={0.28}
            speed={0.22}
            blobCount={7}
            grainIntensity={0.03}
            grainFPS={9}
            // @ts-expect-error custom attribute for debugging
            data-art-bg
          />
          <BrakhageOverlay
            className="z-[2]"
            flickerIntensity={0.08}
            grainIntensity={0.06}
            grainFPS={8}
            scratchDensity={0.6}
            // @ts-expect-error custom attribute for debugging
            data-art-bg
          />
        </>
      )}
      {style === "geocities" && (
        <GeoCitiesBackground className="fixed inset-0 z-0" />
      )}
      {style === "vhs" && (
        <VhsScanlines
          className="z-0"
          opacity={0.22}
          lineOpacity={0.22}
          gap={2}
          wobble={1.2}
          speed={0.9}
          chroma
        />
      )}
      {style === "aurora" && (
        <AuroraBackground className="z-0" opacity={0.5} speed={0.16} />
      )}
      {style === "particles" && (
        <ParticleField
          className="z-0"
          count={90}
          color="rgba(255,255,255,0.62)"
          size={1.2}
          trail={0.08}
          linkDistance={120}
          linkColor="255,255,255"
          linkOpacity={0.18}
        />
      )}
      {style === "mesh" && <MeshWarpBackground className="z-0" opacity={0.5} />}
      {style === "ascii" && (
        <AsciiRain className="z-0" density={0.92} color="#7CFFB2" />
      )}
      {style === "matrix" && (
        <MatrixRain
          className="z-0"
          fontSize={14}
          headColor="#C9FFD3"
          tailColor="#00FF7F"
          tailLength={22}
          speedMin={0.9}
          speedMax={1.8}
        />
      )}
      {style === "flow" && (
        <FlowFieldBackground
          className="z-0"
          lineCount={1400}
          color="rgba(255,255,255,0.16)"
          lineWidth={1.25}
          glow={4}
          blendMode="screen"
        />
      )}
      {style === "fluid" && (
        <FluidInkBackground
          className="z-0"
          quality={1}
          viscosity={0.06}
          swirl={0.28}
          hueShift={0.12}
        />
      )}
      {style === "city" && (
        <CityScene className="fixed inset-0 z-0" snow crowd lights speed={1} />
      )}
      {/* default = no background */}
      {children}
    </ArtStyleContext.Provider>
  );
}
