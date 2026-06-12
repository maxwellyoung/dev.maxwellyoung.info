"use client";

import { ReactNode, useEffect } from "react";
import { usePathname } from "next/navigation";
import { capture, preloadAnalytics } from "@/lib/analytics";

export function CSPostHogProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  useEffect(() => {
    preloadAnalytics();
  }, []);

  useEffect(() => {
    if (!pathname) return;

    capture("$pageview", {
      $current_url: window.location.href,
    });
  }, [pathname]);

  return <>{children}</>;
}
