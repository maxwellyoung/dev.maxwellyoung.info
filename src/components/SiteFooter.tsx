import Link from "next/link";
import { BossKeyTrigger } from "@/components/boss-key/BossKeyTrigger";
import { CommandHint } from "@/components/utilities/CommandHint";

export function SiteFooter() {
  const links = [
    { href: "/", label: "Home" },
    { href: "/#projects", label: "Projects" },
    { href: "/about", label: "About" },
    { href: "/craft", label: "Lab" },
    { href: "/contact", label: "Contact" },
    { href: "/privacy", label: "Privacy" },
  ];

  return (
    <footer className="mt-16 border-t border-border/50 py-8">
      <div className="grid grid-cols-2 overflow-hidden rounded-sm border border-border/60 text-sm text-muted-foreground sm:grid-cols-6">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="inline-flex min-h-11 items-center justify-center border-border/60 px-3 transition-colors duration-300 hover:bg-muted/30 hover:text-foreground focus-visible:z-10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 max-sm:[&:nth-child(odd)]:border-r max-sm:[&:nth-child(-n+4)]:border-b sm:border-r sm:last:border-r-0"
          >
            {link.label}
          </Link>
        ))}
      </div>
      <div className="mt-2 flex items-center justify-end gap-4">
        <CommandHint />
        <BossKeyTrigger />
      </div>
    </footer>
  );
}
