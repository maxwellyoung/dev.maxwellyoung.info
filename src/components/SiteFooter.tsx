import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="mt-16 py-8 border-t border-border/50">
      <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-muted-foreground/60">
        <Link href="/" className="hover:text-muted-foreground transition-colors">
          Home
        </Link>
        <span className="text-border/40">·</span>
        <Link href="/projects" className="hover:text-muted-foreground transition-colors">
          Projects
        </Link>
        <span className="text-border/40">·</span>
        <Link href="/contact" className="hover:text-muted-foreground transition-colors">
          Contact
        </Link>
        <span className="text-border/40">·</span>
        <Link href="/privacy" className="hover:text-muted-foreground transition-colors">
          Privacy
        </Link>
      </div>
    </footer>
  );
}
