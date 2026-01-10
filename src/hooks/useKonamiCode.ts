import { useEffect, useState, useCallback } from "react";

/**
 * Konami Code Easter Egg Hook
 *
 * The classic: ↑ ↑ ↓ ↓ ← → ← → B A
 * Because every portfolio needs a moment of delight (Evan Bacon)
 */

const KONAMI_CODE = [
  "ArrowUp",
  "ArrowUp",
  "ArrowDown",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ArrowLeft",
  "ArrowRight",
  "KeyB",
  "KeyA",
];

export function useKonamiCode(callback?: () => void) {
  const [isActivated, setIsActivated] = useState(false);
  const [inputSequence, setInputSequence] = useState<string[]>([]);

  const resetSequence = useCallback(() => {
    setInputSequence([]);
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const newSequence = [...inputSequence, event.code];

      // Keep only the last N keys (where N = KONAMI_CODE length)
      if (newSequence.length > KONAMI_CODE.length) {
        newSequence.shift();
      }

      setInputSequence(newSequence);

      // Check if the sequence matches
      const isMatch =
        newSequence.length === KONAMI_CODE.length &&
        newSequence.every((key, index) => key === KONAMI_CODE[index]);

      if (isMatch) {
        setIsActivated(true);
        callback?.();
        // Reset after activation
        setTimeout(resetSequence, 100);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [inputSequence, callback, resetSequence]);

  // Reset activation after a delay
  useEffect(() => {
    if (isActivated) {
      const timer = setTimeout(() => setIsActivated(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [isActivated]);

  return { isActivated, reset: resetSequence };
}
