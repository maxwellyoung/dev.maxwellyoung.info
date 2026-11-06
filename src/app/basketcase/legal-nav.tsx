"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const LINKS = [
  { href: "/basketcase/privacy", label: "Privacy" },
  { href: "/basketcase/terms", label: "Terms" },
  { href: "/basketcase/support", label: "Support" },
];

/** The legal pages' nav, marking the page you're on. */
export function BasketcaseLegalNav() {
  const pathname = usePathname();
  return (
    <nav className="flex items-center gap-4 text-sm text-muted-foreground">
      {LINKS.map((link) => {
        const current = pathname === link.href;
        return (
          <Link
            key={link.href}
            href={link.href}
            aria-current={current ? "page" : undefined}
            className={`inline-flex min-h-11 items-center transition-colors hover:text-foreground ${current ? "text-foreground" : ""}`}
          >
            {link.label}
          </Link>
        );
      })}
    </nav>
  );
}
