"use client";

import { useState, useCallback } from "react";

type CopyStatus = "idle" | "copied" | "error";

export function useCopyToClipboard(resetDelay = 2000) {
  const [status, setStatus] = useState<CopyStatus>("idle");

  const copy = useCallback(
    async (text: string) => {
      try {
        await navigator.clipboard.writeText(text);
        setStatus("copied");
        setTimeout(() => setStatus("idle"), resetDelay);
        return true;
      } catch {
        setStatus("error");
        setTimeout(() => setStatus("idle"), resetDelay);
        return false;
      }
    },
    [resetDelay]
  );

  return { status, copy };
}
