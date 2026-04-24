import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="mt-16 py-8 border-t border-border/50">
      <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-sm text-muted-foreground">
        <Link href="/" className="inline-flex min-h-11 items-center rounded-sm transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2">
          Home
        </Link>
        <span className="text-border/40">·</span>
        <Link href="/#projects" className="inline-flex min-h-11 items-center rounded-sm transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2">
          Projects
        </Link>
        <span className="text-border/40">·</span>
        <Link href="/about" className="inline-flex min-h-11 items-center rounded-sm transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2">
          About
        </Link>
        <span className="text-border/40">·</span>
        <Link href="/craft" className="inline-flex min-h-11 items-center rounded-sm transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2">
          Lab
        </Link>
        <span className="text-border/40">·</span>
        <Link href="/contact" className="inline-flex min-h-11 items-center rounded-sm transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2">
          Contact
        </Link>
        <span className="text-border/40">·</span>
        <Link href="/privacy" className="inline-flex min-h-11 items-center rounded-sm transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2">
          Privacy
        </Link>
      </div>
    </footer>
  );
}
