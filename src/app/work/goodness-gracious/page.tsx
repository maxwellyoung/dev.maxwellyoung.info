import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Goodness Gracious — Shopify redesign",
  description: "Selected work: lean case study for a Shopify redesign.",
  openGraph: {
    title: "Goodness Gracious — Shopify redesign",
    description: "Selected work: lean case study for a Shopify redesign.",
    type: "article",
  },
  twitter: {
    card: "summary",
    title: "Goodness Gracious — Shopify redesign",
    description: "Selected work: lean case study for a Shopify redesign.",
  },
};

export default function Page() {
  return (
    <div className="relative w-full p-6 flex flex-col items-center">
      <div className="max-w-2xl w-full">
        <h1 className="text-2xl font-medium dark:text-zinc-100 text-zinc-800 font-roboto-mono">
          Goodness Gracious — Shopify redesign
        </h1>
        <p className="mt-3 text-sm dark:text-zinc-400 text-zinc-700 font-inter">
          Lightweight case overview. Goals: faster browse-to-checkout, clearer menu, brand-true visuals. Stack: Next.js, Tailwind, Shopify storefront.
        </p>
        <ul className="mt-4 text-sm list-disc pl-5 dark:text-zinc-400 text-zinc-700 font-inter">
          <li>Re-structured nav; simplified product taxonomy.</li>
          <li>Optimized images and layout for Core Web Vitals.</li>
          <li>Accessible, keyboard-friendly cart interactions.</li>
        </ul>
        <div className="mt-6 text-sm underline">
          <Link href="/resume">Back to resume</Link>
        </div>
      </div>
    </div>
  );
}


