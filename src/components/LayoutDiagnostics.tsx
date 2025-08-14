"use client";

import React, { useEffect, useMemo } from "react";

export default function LayoutDiagnostics() {
  const params = useMemo(
    () =>
      new URLSearchParams(
        typeof window !== "undefined" ? window.location.search : ""
      ),
    []
  );
  const showLayoutScan = params.get("debug") === "layout";
  const showGrid = params.get("debug") === "grid";

  useEffect(() => {
    if (!showLayoutScan) return;

    const highlight = (els: Element[]) => {
      els.forEach((el) => {
        (el as HTMLElement).style.outline = "1px solid rgba(255,0,0,0.4)";
        (el as HTMLElement).style.outlineOffset = "-1px";
      });
    };

    const scan = () => {
      const vw = window.innerWidth;
      const docW = Math.max(
        document.documentElement.scrollWidth,
        document.body.scrollWidth
      );
      // eslint-disable-next-line no-console
      console.log("[Layout] viewport=", vw, "scrollWidth=", docW);
      const offenders: { el: Element; overflow: number }[] = [];
      document.querySelectorAll("*").forEach((el) => {
        const r = (el as HTMLElement).getBoundingClientRect();
        const overflow = Math.max(0, r.right - vw, -r.left);
        if (overflow > 1) offenders.push({ el, overflow });
      });
      offenders.sort((a, b) => b.overflow - a.overflow);
      const top = offenders.slice(0, 5).map((o) => o.el);
      // eslint-disable-next-line no-console
      console.log("[Layout] top overflow elements:", top);
      highlight(top);
    };

    const onResize = () => scan();
    scan();
    window.addEventListener("resize", onResize);
    window.addEventListener("orientationchange", onResize);
    return () => {
      window.removeEventListener("resize", onResize);
      window.removeEventListener("orientationchange", onResize);
    };
  }, [showLayoutScan]);

  useEffect(() => {
    // lightweight grid tuner via query params
    const setVar = (name: string, value?: string | null) => {
      if (!value) return;
      const root = document.documentElement;
      const num = Number(value);
      if (!Number.isNaN(num)) {
        root.style.setProperty(name, `${num}px`);
      } else {
        // allow presets: narrow, default, wide
        if (name === "--grid-max-width") {
          const preset = value.toLowerCase();
          if (preset === "narrow") root.style.setProperty(name, "640px");
          if (preset === "wide") root.style.setProperty(name, "960px");
          if (preset === "xl") root.style.setProperty(name, "1120px");
        }
      }
    };
    setVar("--grid-max-width", params.get("grid"));
    setVar("--grid-gutter", params.get("gutter"));
    setVar("--baseline", params.get("baseline"));
    const cols = params.get("cols");
    if (cols && !Number.isNaN(Number(cols))) {
      document.documentElement.style.setProperty(
        "--grid-columns",
        String(Number(cols))
      );
    }
  }, [params]);

  if (!showGrid) return null;

  return (
    <div
      className="fixed inset-0 pointer-events-none z-[9999] grid-overlay"
      aria-hidden
    />
  );
}
