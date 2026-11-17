"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

// The boss key, command palette and lab render nothing until a shortcut or
// button opens them, so their code stays out of every page's first load and
// hydration. They mount once the browser is idle (2 s at the latest); a
// shortcut pressed before that is not heard.
const BossKeyMode = dynamic(
  () => import("@/components/boss-key/BossKeyMode").then((m) => m.BossKeyMode),
  { ssr: false },
);
const UtilityShell = dynamic(
  () => import("@/components/utilities/UtilityShell").then((m) => m.UtilityShell),
  { ssr: false },
);
const LabShell = dynamic(
  () => import("@/components/lab/LabShell").then((m) => m.LabShell),
  { ssr: false },
);

export function DeferredShells() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (typeof window.requestIdleCallback === "function") {
      const id = window.requestIdleCallback(() => setReady(true), { timeout: 2000 });
      return () => window.cancelIdleCallback(id);
    }
    const id = window.setTimeout(() => setReady(true), 1500);
    return () => window.clearTimeout(id);
  }, []);

  if (!ready) return null;
  return (
    <>
      <BossKeyMode />
      <UtilityShell />
      <LabShell />
    </>
  );
}
