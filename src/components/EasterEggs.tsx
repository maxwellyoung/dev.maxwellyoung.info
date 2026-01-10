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

export function EasterEggs() {
  const [activeEgg, setActiveEgg] = useState<EasterEggType>(null);

  const triggerRandomEgg = useCallback(() => {
    const eggs: EasterEggType[] = ["matrix", "disco", "gravity"];
    const random = eggs[Math.floor(Math.random() * eggs.length)];
    setActiveEgg(random);
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
      if (buffer.length > 10) buffer = buffer.slice(-10);

      if (buffer.includes("hello")) {
        triggerRandomEgg();
        buffer = "";
      }
    };

    window.addEventListener("keypress", handler);
    return () => window.removeEventListener("keypress", handler);
  }, [triggerRandomEgg]);

  const handleComplete = useCallback(() => setActiveEgg(null), []);

  return (
    <AnimatePresence>
      {activeEgg === "matrix" && <MatrixRain onComplete={handleComplete} />}
      {activeEgg === "disco" && <DiscoMode onComplete={handleComplete} />}
      {activeEgg === "gravity" && <GravityMode onComplete={handleComplete} />}
    </AnimatePresence>
  );
}
