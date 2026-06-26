import Link from "next/link";
import { SiteFooter } from "@/components/SiteFooter";

interface BasketcaseLegalLayoutProps {
  eyebrow: string;
  title: string;
  intro: string;
  children: React.ReactNode;
}

export function BasketcaseLegalLayout({
  eyebrow,
  title,
  intro,
  children,
}: BasketcaseLegalLayoutProps) {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="mx-auto w-full max-w-3xl px-6 py-14">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <Link
            href="/basketcase"
            className="text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            Basketcase
          </Link>
          <nav className="flex items-center gap-4 text-sm text-muted-foreground">
            <Link className="transition-colors hover:text-foreground" href="/basketcase/privacy">
              Privacy
            </Link>
            <Link className="transition-colors hover:text-foreground" href="/basketcase/terms">
              Terms
            </Link>
            <Link className="transition-colors hover:text-foreground" href="/basketcase/support">
              Support
            </Link>
          </nav>
        </div>

        <header className="mt-12 border-b border-border pb-8">
          <p className="text-xs uppercase tracking-[0.12em] text-muted-foreground">
            {eyebrow}
          </p>
          <h1 className="mt-3 font-display text-4xl font-light tracking-tight md:text-5xl">
            {title}
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground">
            {intro}
          </p>
        </header>

        <div className="mt-10 space-y-8 text-sm leading-7 text-muted-foreground">
          {children}
        </div>

        <SiteFooter />
      </div>
    </main>
  );
}

export function LegalSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="space-y-3">
      <h2 className="text-lg font-medium text-foreground">{title}</h2>
      <div className="space-y-3">{children}</div>
    </section>
  );
}

export function LegalList({ items }: { items: string[] }) {
  return (
    <ul className="list-disc space-y-2 pl-5">
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}
