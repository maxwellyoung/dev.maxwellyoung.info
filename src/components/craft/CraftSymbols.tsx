"use client";

import { cn } from "@/lib/utils";
import type { PropsWithChildren } from "react";

interface SymbolProps {
  className?: string;
  title?: string;
}

function BaseSymbol({
  className,
  title,
  children,
}: PropsWithChildren<SymbolProps>) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      role={title ? "img" : "presentation"}
      aria-hidden={title ? undefined : true}
      aria-label={title}
      className={cn("h-4 w-4", className)}
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ transform: "translateY(var(--craft-icon-optical-y, 0px))" }}
    >
      {children}
    </svg>
  );
}

export function SymbolFeedback(props: SymbolProps) {
  return (
    <BaseSymbol {...props}>
      <circle cx="8" cy="8" r="5.2" />
      <path d="M8 4.8v6.4" />
      <path d="M4.8 8h6.4" />
    </BaseSymbol>
  );
}

export function SymbolState(props: SymbolProps) {
  return (
    <BaseSymbol {...props}>
      <rect x="2.8" y="4" width="10.4" height="8" rx="1.8" />
      <path d="M6.2 7.2h3.6" />
      <path d="M6.2 10h2.1" />
    </BaseSymbol>
  );
}

export function SymbolProgress(props: SymbolProps) {
  return (
    <BaseSymbol {...props}>
      <path d="M3 8a5 5 0 0 1 10 0" />
      <path d="M8 3v5l2.5 1.5" />
      <circle cx="8" cy="8" r="1" fill="currentColor" stroke="none" />
    </BaseSymbol>
  );
}

export function SymbolEvidence(props: SymbolProps) {
  return (
    <BaseSymbol {...props}>
      <path d="M3.5 12.5V3.5h9v9" />
      <path d="m6 9 1.8-1.8L10 9.5l2.3-2.3" />
      <path d="M5.2 12.5h5.6" />
    </BaseSymbol>
  );
}

export function SymbolPrinciple(props: SymbolProps) {
  return (
    <BaseSymbol {...props}>
      <path d="M8 2.8 13 5.5v4.8L8 13.2 3 10.3V5.5Z" />
      <path d="M8 2.8v4.4" />
      <path d="M8 7.2 13 5.5" />
      <path d="M8 7.2 3 5.5" />
    </BaseSymbol>
  );
}

export function SymbolCaution(props: SymbolProps) {
  return (
    <BaseSymbol {...props}>
      <path d="M8 2.8 14 13.2H2Z" />
      <path d="M8 6v3.4" />
      <circle cx="8" cy="11.2" r=".8" fill="currentColor" stroke="none" />
    </BaseSymbol>
  );
}
