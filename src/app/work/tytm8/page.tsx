import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "TYTM8 — artist portfolio",
  description: "Selected work: minimalist artist portfolio with fast-first UX.",
  openGraph: {
    title: "TYTM8 — artist portfolio",
    description: "Selected work: minimalist artist portfolio with fast-first UX.",
    type: "article",
  },
  twitter: {
    card: "summary",
    title: "TYTM8 — artist portfolio",
    description: "Selected work: minimalist artist portfolio with fast-first UX.",
  },
};

export default function Page() {
  return (
    <div className="relative w-full p-6 flex flex-col items-center">
      <div className="max-w-2xl w-full">
        <h1 className="text-2xl font-medium dark:text-zinc-100 text-zinc-800 font-roboto-mono">
          TYTM8 — artist portfolio
        </h1>
        <p className="mt-3 text-sm dark:text-zinc-400 text-zinc-700 font-inter">
          Ultra-lean portfolio prioritizing readability, fast loads, and clean typography. Details are progressively disclosed to keep focus.
        </p>
        <ul className="mt-4 text-sm list-disc pl-5 dark:text-zinc-400 text-zinc-700 font-inter">
          <li>One-line titles with hover-revealed descriptions.</li>
          <li>Next.js + Tailwind; strong Lighthouse scores.</li>
          <li>Subtle motion only where it aides comprehension.</li>
        </ul>
        <div className="mt-6 text-sm underline">
          <Link href="/resume">Back to resume</Link>
        </div>
      </div>
    </div>
  );
}


