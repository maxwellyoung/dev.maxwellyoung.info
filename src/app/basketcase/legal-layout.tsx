import Link from "next/link";
import { BasketcaseLegalNav } from "./legal-nav";

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
    <main id="main-content" className="min-h-screen bg-background text-foreground">
      <div className="mx-auto w-full max-w-3xl px-6 py-14">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <Link
            href="/basketcase"
            className="inline-flex min-h-11 items-center text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            Basketcase
          </Link>
          <BasketcaseLegalNav />
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

        <footer className="mt-16 flex flex-col gap-2 border-t border-border/50 pt-6 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>Basketcase is built by Maxwell Young through ninetynine.digital.</p>
          <Link className="inline-flex min-h-11 items-center transition-colors hover:text-foreground" href="/#projects">
            Back to work
          </Link>
        </footer>
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
