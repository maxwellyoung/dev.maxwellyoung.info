import { type Metadata } from "next";
import { AnimatedSection } from "@/components/AnimatedSection";

type Principle = { title: string; note?: string };

const UPDATED = "August 12, 2025";

const principles: Principle[] = [
  {
    title: "i don't build to addict.",
    note: "design for agency, not compulsion.",
  },
  {
    title: "i don't chase vanity metrics.",
    note: "optimize for outcomes and longevity.",
  },
  {
    title: "friction is memory.",
    note: "a little effort creates intent and recall.",
  },
  {
    title: "systems are rooms; tools should ask something of us.",
    note: "software should shape behavior with care.",
  },
  {
    title: "the interesting problems are always human.",
    note: "tech is the means, not the end.",
  },
];

export const metadata: Metadata = {
  title: "principles",
  description: "my design and development manifesto.",
  alternates: { canonical: "/principles" },
};

const slug = (s: string) =>
  s
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");

export default function PrinciplesPage() {
  return (
    <main className="min-h-screen flex items-center justify-center px-6 py-16">
      <AnimatedSection>
        <div className="max-w-prose mx-auto">
          <header className="text-center mb-10">
            <h1 className="text-base font-semibold tracking-widest uppercase text-muted-foreground">
              principles
            </h1>
            <p className="text-sm text-muted-foreground/80 mt-1">
              updated {UPDATED} · auckland, nz
            </p>
          </header>

          <hr className="w-10 mx-auto border-accent mb-8" />

          <ol className="space-y-6">
            {principles.map((p, i) => (
              <li
                key={slug(p.title)}
                id={slug(p.title)}
                className="scroll-mt-24"
              >
                <a
                  href={`#${slug(p.title)}`}
                  className="group block"
                  aria-label={`principle ${i + 1}: ${p.title}`}
                >
                  <p className="text-xl font-medium leading-relaxed">
                    {p.title}
                    <span className="ml-2 opacity-0 group-hover:opacity-100 text-muted-foreground transition">
                      #
                    </span>
                  </p>
                  {p.note && (
                    <p className="text-sm text-muted-foreground mt-1">
                      {p.note}
                    </p>
                  )}
                </a>
              </li>
            ))}
          </ol>

          <hr className="w-10 mx-auto border-accent mt-8" />
        </div>
      </AnimatedSection>
    </main>
  );
}
