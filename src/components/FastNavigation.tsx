"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

/** Warm internal routes on mouse down while preserving normal click and drag behavior. */
export function FastNavigation() {
  const router = useRouter();

  useEffect(() => {
    const onMouseDown = (event: MouseEvent) => {
      if (event.button !== 0 || event.defaultPrevented) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      if (!(event.target instanceof Element)) return;

      const link = event.target.closest("a");
      if (!link || !link.hasAttribute("href")) return;
      if (link.target && link.target !== "_self") return;
      if (link.hasAttribute("download")) return;
      if (link.closest("[data-no-fast-nav], [contenteditable='true']")) return;

      const url = new URL(link.href, window.location.href);
      if (url.origin !== window.location.origin) return;
      // Files (PDFs, images) and API routes are not pages the router can render.
      if (/\.[a-z0-9]+$/i.test(url.pathname) || url.pathname.startsWith("/api/")) return;
      // In-page anchors and links to the current page are left to the browser.
      if (url.pathname === window.location.pathname && url.search === window.location.search) return;

      router.prefetch(url.pathname + url.search);
    };

    document.addEventListener("mousedown", onMouseDown);
    return () => document.removeEventListener("mousedown", onMouseDown);
  }, [router]);

  return null;
}
