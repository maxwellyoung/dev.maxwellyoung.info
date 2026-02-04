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

export const essays: Essay[] = [
  {
    title: "The Invisible Details of Interaction Design",
    slug: "the-invisible-details-of-interaction-design",
    excerpt:
      "Why great interfaces borrow from thousands of years of physical intuition, and how spring physics can make digital feel tangible.",
    date: "2026-01-29",
    readTime: "8 min",
    category: "Motion Design",
    featured: true,
    content: `There's a moment in every great interface where you stop thinking about the interface itself.
The button doesn't feel like a button—it feels like pressing something real. The animation
doesn't feel like code—it feels like physics.

This is what Rauno Felber calls "invisible details of interaction design." The spring
tension that makes a button feel satisfying to press. The momentum that makes scrolling
feel connected to your finger. The way a modal appears not with a fade, but with the
gentle elasticity of something being placed in the world.

## Borrowed Metaphors

Great interaction design rewards learning by reusing metaphors. A swipe teaches you that
the interface is layered like a deck of cards. Pinching maps to the precision of picking
up tiny objects. These aren't decorative choices—they're borrowed from thousands of years
of physical intuition.

The design engineer's job is to implement that intuition in code. Not to simulate physics
perfectly, but to capture the feeling of physics. The essence, not the equations.

## Spring Physics as Emotional Language

Consider two buttons: one that transitions with CSS ease-out, another with spring physics.
The first feels digital. The second feels alive. Why? Because springs have personality.
A tight spring feels nervous, energetic. A loose spring feels confident, relaxed.

\`\`\`typescript
// Nervous button - high stiffness, low damping
const nervousSpring = { stiffness: 400, damping: 10, mass: 0.5 }

// Confident button - moderate stiffness, higher damping
const confidentSpring = { stiffness: 200, damping: 25, mass: 1 }
\`\`\`

This isn't just technical configuration—it's emotional configuration. The spring values
become part of your design language, as important as your color palette or typography scale.

## The Craft is in the Details

Linear's success isn't because it's a better project tracker. It's because every interaction
feels considered. The way tasks slide into place. The gentle bounce when you complete something.
The momentum when you scroll through a long list.

These details don't exist in Figma mockups. They emerge from design engineers who care about
how things feel, not just how they look. Who understand that the gap between design and
engineering isn't a problem to solve—it's where the craft lives.`,
  },
  {
    title: "Motion Grammar for Humane Interfaces",
    slug: "motion-grammar-for-humane-interfaces",
    excerpt:
      "Building a consistent language of movement that guides users naturally through digital spaces without overwhelming them.",
    date: "2026-01-28",
    readTime: "6 min",
    category: "Design Systems",
    featured: false,
    content: `Every interface speaks in motion. The question is whether it's speaking clearly.

Random animations feel chaotic. Missing animations feel cold. But a consistent motion
grammar—like Emil Kowalski's work at Linear—creates interfaces that guide users naturally
through digital spaces.

## Establishing Rhythm

Good motion grammar starts with rhythm. Fast transitions for immediate feedback (100-200ms).
Medium transitions for state changes (300-500ms). Slow transitions for major shifts (500ms+).

But rhythm alone isn't enough. You need personality. The specific spring configurations
that make your interface feel like yours.

## Three Principles

1. **Purposeful**: Every animation should have a job. Feedback, guidance, or delight—but never decoration.
2. **Connected**: Animations should feel related, like instruments in an orchestra.
3. **Respectful**: Honor users' attention and accessibility preferences.

The goal isn't to impress. It's to disappear into the experience, making complex interactions feel simple.`,
  },
  {
    title: "The Typography System Behind Strawhouse",
    slug: "the-typography-system-behind-strawhouse",
    excerpt:
      "How editorial typography principles can transform a gallery website from corporate to intimate, making art feel considered rather than commercialized.",
    date: "2026-01-27",
    readTime: "4 min",
    category: "Typography",
    featured: false,
    content: `Most gallery websites feel like catalogs. Clinical. Corporate. They present art as product
rather than experience.

For Strawhouse Gallery, I wanted something different. An editorial approach that makes
browsing feel like reading a carefully curated art magazine. Where typography becomes
part of the curation.

## The Hierarchy

Large, light serif headings (Sentient at 400 weight) give exhibitions breathing room.
Artist names set in title case, never all-caps—because caps feel like shouting, and
art deserves quiet attention.

Body text in General Sans, generous line spacing, never justified—because justified
text feels forced, and gallery descriptions should feel conversational, intimate.

## Editorial Rhythm

The layout follows magazine principles: asymmetric but balanced, with generous white
space that lets each piece breathe. Typography that steps back, never competing with
the art itself.

This isn't about showing off type skills. It's about using typography to create the
right emotional context for experiencing art.`,
  },
];

export function getEssay(slug: string): Essay | undefined {
  return essays.find((essay) => essay.slug === slug);
}

export function getAllEssaySlugs(): string[] {
  return essays.map((essay) => essay.slug);
}
