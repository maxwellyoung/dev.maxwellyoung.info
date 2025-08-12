import { type Metadata } from "next";
import { AnimatedSection } from "@/components/AnimatedSection";

export const metadata: Metadata = {
  title: "Setup",
  description: "A list of the hardware and software I use.",
  robots: { index: false, follow: false },
};

const setupItems = [
  {
    category: "machines",
    details: "macbook pro  ·  thinkpad t490 (arch + hyprland)",
  },
  { category: "display", details: "dell 4k" },
  {
    category: "input",
    details: "lofree lite84  ·  magic mouse",
  },
  {
    category: "audio",
    details: "scarlett 2i2  ·  yamaha hs5  ·  sm7db + wave arm",
  },
  {
    category: "code",
    details: "cursor  ·  zsh  ·  next.js  ·  react native  ·  unity",
  },
  { category: "design", details: "figma  ·  lottie" },
];

export default function SetupPage() {
  return (
    <main className="min-h-screen flex items-center justify-center">
      <AnimatedSection>
        <div className={`font-mono bg-surface p-8 text-sm`}>
          <p className="mb-4 text-muted">
            Pragmatic list of tools I use; shared for transparency and easy
            reference.
          </p>
          {setupItems.map((item) => (
            <div
              key={item.category}
              className="grid grid-cols-[80px_10px_1fr] gap-x-2"
            >
              <span className="text-muted text-right">{item.category}</span>
              <span className="text-muted">:</span>
              <span>{item.details}</span>
            </div>
          ))}
        </div>
      </AnimatedSection>
    </main>
  );
}
