"use client";

import { useEffect, useCallback, useState } from "react";

interface UseKeyboardNavigationOptions {
  itemCount: number;
  onSelect?: (index: number) => void;
  onEscape?: () => void;
  enabled?: boolean;
  loop?: boolean;
}

export function useKeyboardNavigation({
  itemCount,
  onSelect,
  onEscape,
  enabled = true,
  loop = true,
}: UseKeyboardNavigationOptions) {
  const [focusedIndex, setFocusedIndex] = useState(-1);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!enabled || itemCount === 0) return;

      switch (e.key) {
        case "ArrowDown":
        case "j":
          e.preventDefault();
          setFocusedIndex((prev) => {
            if (prev === -1) return 0;
            if (prev >= itemCount - 1) return loop ? 0 : prev;
            return prev + 1;
          });
          break;

        case "ArrowUp":
        case "k":
          e.preventDefault();
          setFocusedIndex((prev) => {
            if (prev === -1) return itemCount - 1;
            if (prev <= 0) return loop ? itemCount - 1 : prev;
            return prev - 1;
          });
          break;

        case "Enter":
        case " ":
          if (focusedIndex >= 0 && onSelect) {
            e.preventDefault();
            onSelect(focusedIndex);
          }
          break;

        case "Escape":
          if (onEscape) {
            e.preventDefault();
            onEscape();
          }
          setFocusedIndex(-1);
          break;

        case "Home":
          e.preventDefault();
          setFocusedIndex(0);
          break;

        case "End":
          e.preventDefault();
          setFocusedIndex(itemCount - 1);
          break;
      }
    },
    [enabled, itemCount, focusedIndex, onSelect, onEscape, loop]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  const resetFocus = useCallback(() => setFocusedIndex(-1), []);
  const setFocus = useCallback((index: number) => setFocusedIndex(index), []);

  return {
    focusedIndex,
    resetFocus,
    setFocus,
    isFocused: (index: number) => focusedIndex === index,
  };
}
