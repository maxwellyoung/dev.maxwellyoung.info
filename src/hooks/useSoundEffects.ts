"use client";

import { useCallback, useEffect, useRef, useState } from "react";

type SoundType = "click" | "hover" | "open" | "close" | "select" | "success" | "toggle";

// Base64 encoded tiny audio files (generated procedurally)
const SOUNDS: Record<SoundType, () => AudioBuffer | null> = {
  click: () => createToneBuffer(800, 0.05, "sine", 0.3),
  hover: () => createToneBuffer(600, 0.03, "sine", 0.15),
  open: () => createSweepBuffer(400, 800, 0.1, 0.25),
  close: () => createSweepBuffer(800, 400, 0.08, 0.2),
  select: () => createToneBuffer(1000, 0.08, "sine", 0.35),
  success: () => createChordBuffer([523, 659, 784], 0.15, 0.3),
  toggle: () => createToneBuffer(700, 0.06, "triangle", 0.25),
};

let audioContext: AudioContext | null = null;

function getAudioContext(): AudioContext | null {
  if (typeof window === "undefined") return null;
  if (!audioContext) {
    try {
      audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    } catch {
      return null;
    }
  }
  return audioContext;
}

function createToneBuffer(
  frequency: number,
  duration: number,
  type: OscillatorType,
  volume: number
): AudioBuffer | null {
  const ctx = getAudioContext();
  if (!ctx) return null;

  const sampleRate = ctx.sampleRate;
  const length = Math.floor(sampleRate * duration);
  const buffer = ctx.createBuffer(1, length, sampleRate);
  const data = buffer.getChannelData(0);

  for (let i = 0; i < length; i++) {
    const t = i / sampleRate;
    const envelope = Math.exp(-t * 20); // Quick decay
    let sample = 0;

    switch (type) {
      case "sine":
        sample = Math.sin(2 * Math.PI * frequency * t);
        break;
      case "triangle":
        sample = 2 * Math.abs(2 * ((frequency * t) % 1) - 1) - 1;
        break;
      case "square":
        sample = Math.sin(2 * Math.PI * frequency * t) > 0 ? 1 : -1;
        break;
      default:
        sample = Math.sin(2 * Math.PI * frequency * t);
    }

    data[i] = sample * envelope * volume;
  }

  return buffer;
}

function createSweepBuffer(
  startFreq: number,
  endFreq: number,
  duration: number,
  volume: number
): AudioBuffer | null {
  const ctx = getAudioContext();
  if (!ctx) return null;

  const sampleRate = ctx.sampleRate;
  const length = Math.floor(sampleRate * duration);
  const buffer = ctx.createBuffer(1, length, sampleRate);
  const data = buffer.getChannelData(0);

  for (let i = 0; i < length; i++) {
    const t = i / sampleRate;
    const progress = i / length;
    const frequency = startFreq + (endFreq - startFreq) * progress;
    const envelope = Math.exp(-t * 15);
    const sample = Math.sin(2 * Math.PI * frequency * t);
    data[i] = sample * envelope * volume;
  }

  return buffer;
}

function createChordBuffer(
  frequencies: number[],
  duration: number,
  volume: number
): AudioBuffer | null {
  const ctx = getAudioContext();
  if (!ctx) return null;

  const sampleRate = ctx.sampleRate;
  const length = Math.floor(sampleRate * duration);
  const buffer = ctx.createBuffer(1, length, sampleRate);
  const data = buffer.getChannelData(0);

  for (let i = 0; i < length; i++) {
    const t = i / sampleRate;
    const envelope = Math.exp(-t * 10);
    let sample = 0;

    for (const freq of frequencies) {
      sample += Math.sin(2 * Math.PI * freq * t);
    }

    data[i] = (sample / frequencies.length) * envelope * volume;
  }

  return buffer;
}

export function useSoundEffects() {
  const [enabled, setEnabled] = useState(true);
  const [initialized, setInitialized] = useState(false);
  const buffersRef = useRef<Map<SoundType, AudioBuffer>>(new Map());

  // Initialize on first user interaction
  useEffect(() => {
    const init = () => {
      if (initialized) return;

      const ctx = getAudioContext();
      if (!ctx) return;

      // Pre-generate all sound buffers
      Object.entries(SOUNDS).forEach(([key, generator]) => {
        const buffer = generator();
        if (buffer) {
          buffersRef.current.set(key as SoundType, buffer);
        }
      });

      setInitialized(true);
      document.removeEventListener("click", init);
      document.removeEventListener("keydown", init);
    };

    document.addEventListener("click", init, { once: true });
    document.addEventListener("keydown", init, { once: true });

    return () => {
      document.removeEventListener("click", init);
      document.removeEventListener("keydown", init);
    };
  }, [initialized]);

  // Load preference from localStorage
  useEffect(() => {
    const stored = localStorage.getItem("sound-enabled");
    if (stored !== null) {
      setEnabled(stored === "true");
    }
  }, []);

  const playSound = useCallback(
    (type: SoundType) => {
      if (!enabled) return;

      const ctx = getAudioContext();
      if (!ctx) return;

      const buffer = buffersRef.current.get(type);
      if (!buffer) return;

      // Resume context if suspended (autoplay policy)
      if (ctx.state === "suspended") {
        ctx.resume();
      }

      const source = ctx.createBufferSource();
      source.buffer = buffer;
      source.connect(ctx.destination);
      source.start();
    },
    [enabled]
  );

  const toggleSound = useCallback(() => {
    setEnabled((prev) => {
      const next = !prev;
      localStorage.setItem("sound-enabled", String(next));
      return next;
    });
  }, []);

  return { playSound, enabled, toggleSound };
}

// Provider component for global sound access
export function SoundProvider({ children }: { children: React.ReactNode }) {
  return children;
}
