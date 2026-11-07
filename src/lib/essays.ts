export interface Essay {
  title: string;
  slug: string;
  excerpt: string;
  date: string;
  readTime: string;
  category: string;
  featured: boolean;
  content: string;
}

type EssaySource = Omit<Essay, "readTime">;

const essaySources: EssaySource[] = [
  {
    title: "Spring Settings Are Design Decisions",
    slug: "the-invisible-details-of-interaction-design",
    excerpt:
      "Why spring settings are a design decision, and where this site's project list uses them.",
    date: "2026-01-29",
    category: "Motion Design",
    featured: true,
    content: `A spring has three numbers: stiffness, damping and mass. They decide whether a panel
snaps into place, drifts, or overshoots and wobbles back. Nobody sees the numbers, but
everyone feels the result, so choosing them is a design decision, not an implementation
detail to settle at the end.

## What the Numbers Do

Stiffness is how hard the spring pulls toward its target. Damping is how quickly that
motion dies away. Mass is how heavy the moving thing feels. High stiffness with low
damping arrives fast and overshoots. Moderate stiffness with more damping arrives a little
later and stops cleanly.

\`\`\`typescript
// Arrives fast, overshoots, wobbles before it settles
const overshooting = {
  stiffness: 400,
  damping: 10,
  mass: 0.5,
}

// Arrives a little later and stops without overshoot
const settled = {
  stiffness: 200,
  damping: 25,
  mass: 1,
}
\`\`\`

Neither is better in general. Overshoot suits something you threw, like a card flicked off
screen. It is wrong for a control that should simply answer, because the wobble reads as
hesitation. So the values belong with the palette and the type scale: a small set, chosen
once, reused everywhere.

## Where This Shows Up Here

On this site's project list, the chevron turns on the snappy spring (stiffness 500,
damping 35): it answers the click and settles without a wobble. The row itself opens on a
timed curve instead, 300ms for height and 200ms for opacity, and it closes faster than it
opens, in 220ms, because leaving should cost less than arriving. With reduced motion on,
both drop to zero.

None of that shows up in a mockup. It only exists once the interface runs, which is why I
tune it in code, with the thing in my hand, rather than describing it and handing it off.`,
  },
  {
    title: "Motion Grammar for Humane Interfaces",
    slug: "motion-grammar-for-humane-interfaces",
    excerpt:
      "The small set of durations and springs this site's motion draws from, and why one shared set matters more than any single value.",
    date: "2026-01-28",
    category: "Design Systems",
    featured: false,
    content: `Motion is part of what an interface says. If every component picks its own timing,
the interface talks over itself; if nothing moves, changes of state arrive without warning.
A motion grammar is a small set of durations and springs that everything draws from.

## Rhythm

I sort motion into three tiers. Immediate feedback, like a press or a toggle, takes
100–180ms. A change of state, like a row opening, takes 220–320ms. A large move, like a
sheet or a page, takes 350–500ms.

## What It Looks Like Here

On this site the grammar lives in one file: duration tokens of 100, 150, 250 and 400ms for
everyday work, 600ms kept for rare large moves, and six named springs. A button press uses
snappy; content arriving as you scroll uses gentle. Most components start from a token. The
exceptions are tuned by hand on purpose: the studies on the Craft page exaggerate their
springs so the behavior is easy to see, and the project rows use the timed curve described
in the first essay.

## Three Rules

1. **Every animation has a job**: feedback, orientation or continuity. If it has none, it goes.
2. **Related changes move alike**: the same kind of change gets the same token.
3. **Reduced motion is respected**: with it on, movement and stagger are removed and only opacity still fades.`,
  },
  {
    title: "The Typography System Behind Strawhouse",
    slug: "the-typography-system-behind-strawhouse",
    excerpt:
      "Type choices for an unlaunched gallery site: a serif for exhibitions, a plain sans for descriptions, and what that layout costs.",
    date: "2026-01-27",
    category: "Typography",
    featured: false,
    content: `Strawhouse is a gallery site I designed that hasn't launched, so there's no public link
yet. This note is about its type system, not a finished product.

Many gallery sites borrow the layout of a shop: a grid of thumbnails, prices and filters.
I wanted Strawhouse to read more like an exhibition catalog, where the text around a work
is set with the same care as the hang.

## The Hierarchy

Exhibition titles are set large in Sentient, a serif, at its regular 400 weight, so they
have presence without the weight of a bold. Artist names are in title case, never all
caps, so a name reads as a name rather than a label.

Body text is General Sans with generous line spacing and a ragged right edge. Justified
text opens uneven gaps between words, and in short gallery descriptions those gaps show.

## The Tradeoff

An editorial layout takes more vertical space than a grid, so fewer works fit on screen at
once. For a small gallery showing a few artists at a time, I chose reading over browsing
density. A larger catalog would need a denser index beside it.`,
  },
];

const WORDS_PER_MINUTE = 220;

/** Read time from the text itself, so the label can't drift from the essay. */
export function readTimeFor(content: string): string {
  const words = content.split(/\s+/).filter(Boolean).length;
  return `${Math.max(1, Math.round(words / WORDS_PER_MINUTE))} min`;
}

export const essays: Essay[] = essaySources.map((essay) => ({
  ...essay,
  readTime: readTimeFor(essay.content),
}));

/**
 * Split essay text into blocks on blank lines, keeping a fenced code block whole
 * even when the code itself contains a blank line.
 */
export function splitEssayBlocks(content: string): string[] {
  const blocks: string[] = [];
  let current: string[] = [];
  let inFence = false;
  for (const line of content.split("\n")) {
    if (line.trimStart().startsWith("```")) inFence = !inFence;
    if (!inFence && line.trim() === "") {
      if (current.length) blocks.push(current.join("\n"));
      current = [];
      continue;
    }
    current.push(line);
  }
  if (current.length) blocks.push(current.join("\n"));
  return blocks;
}

export function getEssay(slug: string): Essay | undefined {
  return essays.find((essay) => essay.slug === slug);
}

export function getAllEssaySlugs(): string[] {
  return essays.map((essay) => essay.slug);
}
