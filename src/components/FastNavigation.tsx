"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

/**
 * Starts client-side navigation on mouse down instead of waiting for the
 * click that follows on release, which takes the length of the press
 * (typically 80-120 ms) off every in-site navigation. The click still fires
 * afterwards; by then the router is already on that URL, so it is a no-op.
 *
 * Only plain left-button presses on same-origin page links are taken over.
 * Modified clicks, new-tab links, downloads, files and in-page anchors keep
 * the browser's own behaviour, and touch and keyboard are untouched. Add
 * `data-no-fast-nav` to a link (or an ancestor) to opt it out.
 */
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

      router.push(url.pathname + url.search + url.hash);
    };

    document.addEventListener("mousedown", onMouseDown);
    return () => document.removeEventListener("mousedown", onMouseDown);
  }, [router]);

  return null;
}
