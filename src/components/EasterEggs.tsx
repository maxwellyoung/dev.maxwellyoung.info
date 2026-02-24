"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Matrix rain effect
function MatrixRain({ onComplete }: { onComplete: () => void }) {
  useEffect(() => {
    const timer = setTimeout(onComplete, 5000);
    return () => clearTimeout(timer);
  }, [onComplete]);

  const columns = Array.from({ length: 30 }, (_, i) => i);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[200] bg-black/90 pointer-events-none overflow-hidden"
      onClick={onComplete}
    >
      {columns.map((col) => (
        <MatrixColumn key={col} index={col} />
      ))}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.p
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 }}
          className="text-green-500 text-2xl font-mono"
        >
          Wake up, Neo...
        </motion.p>
      </div>
    </motion.div>
  );
}

function MatrixColumn({ index }: { index: number }) {
  const chars = "アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789";
  const [stream, setStream] = useState<string[]>([]);

  useEffect(() => {
    const generateStream = () => {
      const length = Math.floor(Math.random() * 20) + 10;
      return Array.from({ length }, () =>
        chars.charAt(Math.floor(Math.random() * chars.length))
      );
    };

    setStream(generateStream());
    const interval = setInterval(() => {
      setStream(generateStream());
    }, 150);

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      className="absolute top-0 text-green-500 font-mono text-sm leading-none"
      style={{
        left: `${(index / 30) * 100}%`,
        writingMode: "vertical-rl",
      }}
      initial={{ y: -500 }}
      animate={{ y: "100vh" }}
      transition={{
        duration: Math.random() * 3 + 2,
        repeat: Infinity,
        delay: Math.random() * 2,
        ease: "linear",
      }}
    >
      {stream.map((char, i) => (
        <span
          key={i}
          style={{
            opacity: 1 - i / stream.length,
            color: i === 0 ? "#fff" : undefined,
          }}
        >
          {char}
        </span>
      ))}
    </motion.div>
  );
}

// Disco mode
function DiscoMode({ onComplete }: { onComplete: () => void }) {
  useEffect(() => {
    const timer = setTimeout(onComplete, 5000);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[200] pointer-events-none"
      onClick={onComplete}
    >
      <motion.div
        className="absolute inset-0"
        animate={{
          background: [
            "radial-gradient(circle, #ff0000 0%, transparent 70%)",
            "radial-gradient(circle, #00ff00 0%, transparent 70%)",
            "radial-gradient(circle, #0000ff 0%, transparent 70%)",
            "radial-gradient(circle, #ffff00 0%, transparent 70%)",
            "radial-gradient(circle, #ff00ff 0%, transparent 70%)",
          ],
        }}
        transition={{
          duration: 0.5,
          repeat: Infinity,
        }}
        style={{ mixBlendMode: "overlay" }}
      />
    </motion.div>
  );
}

// Gravity effect - everything falls
function GravityMode({ onComplete }: { onComplete: () => void }) {
  useEffect(() => {
    const elements = document.querySelectorAll("h1, h2, h3, p, a, button, img");
    const originals: { el: Element; transform: string }[] = [];

    elements.forEach((el) => {
      const htmlEl = el as HTMLElement;
      originals.push({ el, transform: htmlEl.style.transform });

      const delay = Math.random() * 500;
      const rotation = (Math.random() - 0.5) * 30;

      setTimeout(() => {
        htmlEl.style.transition = "transform 1s cubic-bezier(0.55, 0, 1, 0.45)";
        htmlEl.style.transform = `translateY(100vh) rotate(${rotation}deg)`;
      }, delay);
    });

    const timer = setTimeout(() => {
      elements.forEach((el, i) => {
        const htmlEl = el as HTMLElement;
        htmlEl.style.transition = "transform 0.5s ease-out";
        htmlEl.style.transform = originals[i].transform;
      });
      onComplete();
    }, 3000);

    return () => {
      clearTimeout(timer);
      elements.forEach((el, i) => {
        const htmlEl = el as HTMLElement;
        htmlEl.style.transform = originals[i].transform;
      });
    };
  }, [onComplete]);

  return null;
}

type EasterEggType = "matrix" | "disco" | "gravity" | "stars" | null;

function SpringDebugger({ onClose }: { onClose: () => void }) {
  const [stiffness, setStiffness] = useState(320);
  const [damping, setDamping] = useState(24);
  const [mass, setMass] = useState(1);
  const [tick, setTick] = useState(0);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[210] bg-black/60 backdrop-blur-sm"
    >
      <div className="absolute inset-0 flex items-center justify-center p-4">
        <div className="w-full max-w-xl rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--background))] p-5">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-sm font-medium text-foreground">Spring Debugger</h3>
            <button
              type="button"
              onClick={onClose}
              className="rounded px-2 py-1 text-xs text-muted-foreground hover:text-foreground"
            >
              Close
            </button>
          </div>

          <p className="mb-4 text-xs text-muted-foreground">
            Press Test to replay the spring with current values.
          </p>

          <div className="space-y-3">
            <label className="block text-xs text-muted-foreground">
              Stiffness: {stiffness}
              <input
                type="range"
                min={60}
                max={700}
                value={stiffness}
                onChange={(e) => setStiffness(Number(e.target.value))}
                className="mt-1 w-full"
              />
            </label>
            <label className="block text-xs text-muted-foreground">
              Damping: {damping}
              <input
                type="range"
                min={6}
                max={60}
                value={damping}
                onChange={(e) => setDamping(Number(e.target.value))}
                className="mt-1 w-full"
              />
            </label>
            <label className="block text-xs text-muted-foreground">
              Mass: {mass.toFixed(2)}
              <input
                type="range"
                min={0.4}
                max={2}
                step={0.05}
                value={mass}
                onChange={(e) => setMass(Number(e.target.value))}
                className="mt-1 w-full"
              />
            </label>
          </div>

          <div className="mt-4 rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--card))]/50 p-4">
            <div className="relative h-10 overflow-hidden rounded bg-[hsl(var(--muted))]/40">
              <motion.div
                key={tick}
                initial={{ x: 0 }}
                animate={{ x: 260 }}
                transition={{ type: "spring", stiffness, damping, mass }}
                className="absolute left-0 top-1/2 h-4 w-4 -translate-y-1/2 rounded-full bg-accent"
              />
            </div>
            <button
              type="button"
              onClick={() => setTick((prev) => prev + 1)}
              className="mt-3 rounded-md border border-[hsl(var(--border))] px-3 py-1.5 text-xs text-foreground hover:border-accent/60"
            >
              Test
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export function EasterEggs() {
  const [activeEgg, setActiveEgg] = useState<EasterEggType>(null);
  const [playModeEnabled, setPlayModeEnabled] = useState(false);
  const [showSpringDebugger, setShowSpringDebugger] = useState(false);
  const [caseStudyAnnotations, setCaseStudyAnnotations] = useState(false);

  const triggerRandomEgg = useCallback(() => {
    if (!playModeEnabled) return;
    const eggs: EasterEggType[] = ["matrix", "disco", "gravity"];
    const random = eggs[Math.floor(Math.random() * eggs.length)];
    setActiveEgg(random);
  }, [playModeEnabled]);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("play-mode-enabled");
      setPlayModeEnabled(saved === "true");
    } catch {
      setPlayModeEnabled(false);
    }
  }, []);

  useEffect(() => {
    const handleToggle = (event: Event) => {
      const custom = event as CustomEvent<{ enabled?: boolean }>;
      const enabled = custom.detail?.enabled;
      if (typeof enabled === "boolean") {
        setPlayModeEnabled(enabled);
      }
    };
    window.addEventListener("play-mode-toggled", handleToggle as EventListener);
    return () =>
      window.removeEventListener("play-mode-toggled", handleToggle as EventListener);
  }, []);

  // Listen for custom trigger event
  useEffect(() => {
    const handler = () => triggerRandomEgg();
    window.addEventListener("trigger-easter-egg", handler);
    return () => window.removeEventListener("trigger-easter-egg", handler);
  }, [triggerRandomEgg]);

  // Secret key combo: Type "hello"
  useEffect(() => {
    let buffer = "";
    const handler = (e: KeyboardEvent) => {
      buffer += e.key.toLowerCase();
      if (buffer.length > 24) buffer = buffer.slice(-24);

      if ((buffer.includes("hello") || buffer.includes("party")) && playModeEnabled) {
        triggerRandomEgg();
        buffer = "";
      }
      if (buffer.includes("spring") && playModeEnabled) {
        setShowSpringDebugger((prev) => !prev);
        buffer = "";
      }
      if (buffer.includes("annotate") && playModeEnabled) {
        setCaseStudyAnnotations((prev) => {
          const next = !prev;
          window.dispatchEvent(
            new CustomEvent("toggle-case-study-annotations", {
              detail: { enabled: next },
            })
          );
          return next;
        });
        buffer = "";
      }
    };

    window.addEventListener("keypress", handler);
    return () => window.removeEventListener("keypress", handler);
  }, [playModeEnabled, triggerRandomEgg]);

  const handleComplete = useCallback(() => setActiveEgg(null), []);

  return (
    <>
      {playModeEnabled && (
        <div className="fixed bottom-6 left-6 z-[205] hidden md:flex items-center gap-2 rounded-full border border-[hsl(var(--border))] bg-[hsl(var(--card))] px-3 py-2 text-[11px] text-muted-foreground shadow-lg">
          <span className="text-accent">Play Mode</span>
          <span>hello/party: random</span>
          <span>spring: debugger</span>
          <span>annotate: case study notes {caseStudyAnnotations ? "on" : "off"}</span>
        </div>
      )}
      <AnimatePresence>
        {activeEgg === "matrix" && <MatrixRain onComplete={handleComplete} />}
        {activeEgg === "disco" && <DiscoMode onComplete={handleComplete} />}
        {activeEgg === "gravity" && <GravityMode onComplete={handleComplete} />}
        {showSpringDebugger && (
          <SpringDebugger onClose={() => setShowSpringDebugger(false)} />
        )}
      </AnimatePresence>
    </>
  );
}
