import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowUpRight,
  Database,
  LineChart,
  ReceiptText,
  ScanLine,
  ShieldCheck,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Basketcase | Maxwell Young",
  description:
    "Basketcase is a mobile grocery prototype that turns scanned receipts into source-labelled item history, price memory, and calmer pre-shop comparison.",
  openGraph: {
    title: "Basketcase",
    description:
      "Receipts into price memory. Scan the shop, track the items, and compare with source-labelled context.",
    images: [
      {
        url: "/og/basketcase-og.png",
        width: 1200,
        height: 630,
        alt: "Basketcase product artwork with receipts, item tokens, and price-memory charts",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Basketcase",
    description:
      "Receipts into price memory. Scan the shop, track the items, and compare with source-labelled context.",
    images: ["/og/basketcase-og.png"],
  },
};

const productLoop = [
  {
    title: "Capture",
    body: "Scan a grocery receipt and extract the store, date, totals, and item lines while the shop is still fresh.",
    icon: ScanLine,
  },
  {
    title: "Normalize",
    body: "Turn messy receipt text into repeatable item history that can survive typos, abbreviations, and store formats.",
    icon: Database,
  },
  {
    title: "Compare",
    body: "Review prices with their original source, so price memory stays useful without pretending to be a live shelf feed.",
    icon: LineChart,
  },
];

const buildProof = [
  {
    label: "Product problem",
    value: "Household grocery spend is hard to remember item-by-item once the receipt is gone.",
  },
  {
    label: "Design position",
    value: "Useful memory over noisy optimization: source-labelled context, not fake certainty.",
  },
  {
    label: "Engineering shape",
    value: "React Native, Expo, OCR, normalized item records, and a real-time backend.",
  },
];

export default function BasketcasePage() {
  return (
    <main id="main-content" className="min-h-screen bg-[#f7f1e6] text-[#071321]">
      <div className="mx-auto w-full max-w-6xl px-5 py-6 sm:px-8">
        <header className="flex flex-wrap items-center justify-between gap-4 border-b border-[#071321]/10 pb-5 text-sm">
          <Link
            href="/#projects"
            className="text-[#071321]/65 transition-colors hover:text-[#071321]"
          >
            Maxwell Young / projects
          </Link>
          <nav
            className="flex items-center gap-4 text-[#071321]/60"
            aria-label="Basketcase pages"
          >
            <Link className="transition-colors hover:text-[#071321]" href="/basketcase/privacy">
              Privacy
            </Link>
            <Link className="transition-colors hover:text-[#071321]" href="/basketcase/terms">
              Terms
            </Link>
            <Link className="transition-colors hover:text-[#071321]" href="/basketcase/support">
              Support
            </Link>
          </nav>
        </header>

        <section className="grid min-h-[calc(100vh-9rem)] gap-10 py-12 md:grid-cols-[0.92fr_1.08fr] md:items-center md:py-14">
          <div className="max-w-xl">
            <h1 className="font-display text-5xl font-light tracking-tight sm:text-6xl md:text-7xl">
              Basketcase
            </h1>
            <p className="mt-6 max-w-lg text-3xl font-semibold leading-[1.04] tracking-tight sm:text-5xl">
              Receipts into price memory.
            </p>
            <p className="mt-6 max-w-md text-base leading-7 text-[#071321]/68">
              A mobile grocery product for scanning receipts, remembering item
              prices, and comparing the next shop with calm, source-labelled
              context.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href="mailto:maxwell@ninetynine.digital?subject=Basketcase%20early%20access"
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-md bg-[#071321] px-4 text-sm font-medium text-[#f7f1e6] transition-transform duration-200 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1177d5] focus-visible:ring-offset-2 focus-visible:ring-offset-[#f7f1e6]"
              >
                Request early access
                <ArrowUpRight className="h-4 w-4" />
              </a>
              <a
                href="https://www.ninetynine.digital"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-md border border-[#071321]/18 px-4 text-sm font-medium text-[#071321] transition-colors duration-200 hover:border-[#1177d5]/50 hover:text-[#1177d5] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1177d5] focus-visible:ring-offset-2 focus-visible:ring-offset-[#f7f1e6]"
              >
                ninetynine digital
                <ArrowUpRight className="h-4 w-4" />
              </a>
            </div>

            <dl className="mt-10 grid gap-0 overflow-hidden rounded-md border border-[#071321]/12 text-sm sm:grid-cols-3">
              <div className="border-b border-[#071321]/12 p-3 sm:border-b-0 sm:border-r">
                <dt className="text-[0.62rem] font-semibold uppercase tracking-[0.16em] text-[#071321]/45">
                  Stage
                </dt>
                <dd className="mt-1 text-[#071321]">In development</dd>
              </div>
              <div className="border-b border-[#071321]/12 p-3 sm:border-b-0 sm:border-r">
                <dt className="text-[0.62rem] font-semibold uppercase tracking-[0.16em] text-[#071321]/45">
                  Role
                </dt>
                <dd className="mt-1 text-[#071321]">Solo product</dd>
              </div>
              <div className="p-3">
                <dt className="text-[0.62rem] font-semibold uppercase tracking-[0.16em] text-[#071321]/45">
                  Stack
                </dt>
                <dd className="mt-1 text-[#071321]">React Native / OCR</dd>
              </div>
            </dl>
          </div>

          <figure className="relative overflow-hidden rounded-md border border-[#071321]/12 bg-[#071321] shadow-[0_24px_80px_rgba(7,19,33,0.18)]">
            <div className="relative aspect-[16/10] w-full">
              <Image
                src="/projectImages/basketcase-cover.webp"
                alt="Basketcase product artwork showing layered receipts, item tokens, and price-memory charts."
                fill
                priority
                sizes="(max-width: 768px) 100vw, 560px"
                className="object-cover"
              />
            </div>
          </figure>
        </section>

        <section className="grid gap-4 border-t border-[#071321]/10 py-12 md:grid-cols-3">
          {productLoop.map(({ title, body, icon: Icon }) => (
            <div
              key={title}
              className="rounded-md border border-[#071321]/12 bg-white/38 p-5 shadow-[0_1px_0_rgba(7,19,33,0.04)]"
            >
              <Icon className="h-5 w-5 text-[#dc3f2f]" />
              <h2 className="mt-5 text-lg font-medium">{title}</h2>
              <p className="mt-2 text-sm leading-6 text-[#071321]/65">{body}</p>
            </div>
          ))}
        </section>

        <section className="grid gap-8 border-t border-[#071321]/10 py-12 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <ReceiptText className="h-6 w-6 text-[#1177d5]" />
            <h2 className="mt-4 max-w-sm font-display text-3xl font-light tracking-tight sm:text-4xl">
              A sharper public story than a receipt scanner.
            </h2>
          </div>

          <div className="space-y-0 overflow-hidden rounded-md border border-[#071321]/12 bg-[#fffaf0]/70">
            {buildProof.map((item) => (
              <div
                key={item.label}
                className="grid gap-2 border-b border-[#071321]/10 p-5 last:border-b-0 sm:grid-cols-[10rem_1fr]"
              >
                <p className="text-[0.62rem] font-semibold uppercase tracking-[0.16em] text-[#071321]/45">
                  {item.label}
                </p>
                <p className="text-sm leading-6 text-[#071321]/72">{item.value}</p>
              </div>
            ))}
            <div className="grid gap-2 border-t border-[#071321]/10 p-5 sm:grid-cols-[10rem_1fr]">
              <p className="text-[0.62rem] font-semibold uppercase tracking-[0.16em] text-[#071321]/45">
                Privacy stance
              </p>
              <p className="flex gap-2 text-sm leading-6 text-[#071321]/72">
                <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-[#1177d5]" />
                Receipt and household spend data is treated as personal
                information, with legal and support pages published from day one.
              </p>
            </div>
          </div>
        </section>

        <footer className="flex flex-col gap-4 border-t border-[#071321]/10 py-8 text-sm text-[#071321]/60 sm:flex-row sm:items-center sm:justify-between">
          <p>Built through ninetynine digital.</p>
          <div className="flex flex-wrap gap-x-4 gap-y-2">
            <Link className="transition-colors hover:text-[#071321]" href="/basketcase/privacy">
              Privacy
            </Link>
            <Link className="transition-colors hover:text-[#071321]" href="/basketcase/terms">
              Terms
            </Link>
            <Link className="transition-colors hover:text-[#071321]" href="/basketcase/support">
              Support
            </Link>
            <Link className="transition-colors hover:text-[#071321]" href="/#projects">
              Back to work
            </Link>
          </div>
        </footer>
      </div>
    </main>
  );
}
