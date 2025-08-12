import Link from "next/link";

export function Nav() {
  return (
    <header className="w-full sticky top-0 z-40 backdrop-blur supports-[backdrop-filter]:bg-black/30">
      <div className="mx-auto w-full max-w-[var(--content-width)] px-4 py-4 flex items-center justify-between">
        <Link
          href="/"
          className="text-sm tracking-[0.08em] text-muted hover:text-text"
        >
          Maxwell Young
        </Link>
        <nav className="flex items-center gap-4 text-xs tracking-[0.08em] text-muted">
          <Link href="/projects" className="hover:text-text underline">
            Projects
          </Link>
          <Link href="/resume" className="hover:text-text underline">
            Resume
          </Link>
          <Link href="/principles" className="hover:text-text underline">
            Principles
          </Link>
          <Link href="/now" className="hover:text-text underline">
            Now
          </Link>
        </nav>
      </div>
    </header>
  );
}
