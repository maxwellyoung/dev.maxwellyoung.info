"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export function PageTransitionProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // Scroll to top on route change, unless the link targets an anchor (e.g. /craft#essays),
  // which the browser has already scrolled to.
  useEffect(() => {
    const target = window.location.hash && document.getElementById(decodeURIComponent(window.location.hash.slice(1)));
    if (target) target.scrollIntoView();
    else window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [pathname]);

  return <div>{children}</div>;
}
