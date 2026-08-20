"use client";
import { UTILITY_OPEN_EVENT } from "./UtilityShell";
export function CommandHint() {
  return <button type="button" onClick={() => window.dispatchEvent(new CustomEvent(UTILITY_OPEN_EVENT, { detail: "palette" }))} className="text-xs text-muted-foreground/70 transition-colors hover:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent">Commands <kbd className="ml-1 rounded border border-border/60 px-1.5 py-0.5">⌘K</kbd></button>;
}
