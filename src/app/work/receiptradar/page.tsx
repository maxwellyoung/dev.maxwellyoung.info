import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "ReceiptRadar — iOS/Android prototype",
  description: "Selected work: cross-platform prototype built with React Native/Expo.",
  openGraph: {
    title: "ReceiptRadar — iOS/Android prototype",
    description: "Selected work: cross-platform prototype built with React Native/Expo.",
    type: "article",
  },
  twitter: {
    card: "summary",
    title: "ReceiptRadar — iOS/Android prototype",
    description: "Selected work: cross-platform prototype built with React Native/Expo.",
  },
};

export default function Page() {
  return (
    <div className="relative w-full p-6 flex flex-col items-center">
      <div className="max-w-2xl w-full">
        <h1 className="text-2xl font-medium dark:text-zinc-100 text-zinc-800 font-roboto-mono">
          ReceiptRadar — iOS/Android prototype
        </h1>
        <p className="mt-3 text-sm dark:text-zinc-400 text-zinc-700 font-inter">
          Prototype for quick capture and categorization of receipts. Focus: camera UX, offline-first data model, and shareable exports.
        </p>
        <ul className="mt-4 text-sm list-disc pl-5 dark:text-zinc-400 text-zinc-700 font-inter">
          <li>Built with React Native + Expo; rapid iteration cadence.</li>
          <li>Local-first storage; sync model designed for future expansion.</li>
          <li>Gesture-first interactions; haptics tuned for task completion.</li>
        </ul>
        <div className="mt-6 text-sm underline">
          <Link href="/resume">Back to resume</Link>
        </div>
      </div>
    </div>
  );
}


