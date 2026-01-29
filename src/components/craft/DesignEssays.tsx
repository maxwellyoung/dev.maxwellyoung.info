"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowUpRight, Clock, Calendar } from "lucide-react";
import Link from "next/link";

export function DesignEssays() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  const essays = [
    {
      title: "The Invisible Details of Interaction Design",
      excerpt: "Why great interfaces borrow from thousands of years of physical intuition, and how spring physics can make digital feel tangible.",
      date: "2026-01-29",
      readTime: "8 min",
      category: "Motion Design",
      featured: true,
      content: `
        There's a moment in every great interface where you stop thinking about the interface itself. 
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
        engineering isn't a problem to solve—it's where the craft lives.
      `
    },
    {
      title: "Motion Grammar for Humane Interfaces",
      excerpt: "Building a consistent language of movement that guides users naturally through digital spaces without overwhelming them.",
      date: "2026-01-28", 
      readTime: "6 min",
      category: "Design Systems",
      featured: false,
      content: `
        Every interface speaks in motion. The question is whether it's speaking clearly.

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

        The goal isn't to impress. It's to disappear into the experience, making complex interactions feel simple.
      `
    },
    {
      title: "The Typography System Behind Strawhouse",
      excerpt: "How editorial typography principles can transform a gallery website from corporate to intimate, making art feel considered rather than commercialized.",
      date: "2026-01-27",
      readTime: "4 min", 
      category: "Typography",
      featured: false,
      content: `
        Most gallery websites feel like catalogs. Clinical. Corporate. They present art as product 
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
        right emotional context for experiencing art.
      `
    }
  ];

  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.8, ease: [0.2, 0.8, 0.2, 1] }}
      className="space-y-8"
    >
      <div>
        <h2 className="font-display text-3xl font-light mb-4">
          Design Essays
        </h2>
        <p className="text-muted leading-relaxed max-w-2xl">
          Thoughts on craft, motion, and the intersection of design and engineering. 
          Documenting lessons learned and principles discovered while building interfaces that feel alive.
        </p>
      </div>

      <div className="space-y-8">
        {essays.map((essay, index) => (
          <EssayCard key={essay.title} essay={essay} index={index} />
        ))}
      </div>

      <div className="pt-8 border-t border-border/50">
        <p className="text-sm text-muted/70 text-center">
          More essays coming soon. Following in the footsteps of Rauno, Emil, and the design engineers 
          who document their craft.
        </p>
      </div>
    </motion.section>
  );
}

interface Essay {
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  category: string;
  featured: boolean;
  content: string;
}

function EssayCard({ essay, index }: { essay: Essay; index: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.6, 
        delay: index * 0.1,
        ease: [0.2, 0.8, 0.2, 1] 
      }}
      className={`group cursor-pointer ${
        essay.featured ? 'col-span-full' : ''
      }`}
    >
      <Link href={`/craft/essay/${essay.title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')}`}>
        <div className={`
          border border-border/50 rounded-xl p-6 md:p-8 
          hover:border-accent/30 transition-all duration-500 
          hover:shadow-lg group-hover:scale-[1.01]
          ${essay.featured ? 'bg-accent/5' : 'hover:bg-muted/30'}
        `}>
          {essay.featured && (
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-2 h-2 bg-accent rounded-full"></div>
              <span className="text-xs font-medium text-accent uppercase tracking-wide">
                Featured Essay
              </span>
            </div>
          )}

          <div className="space-y-4">
            <div>
              <h3 className={`font-display font-light group-hover:text-accent transition-colors ${
                essay.featured ? 'text-2xl md:text-3xl' : 'text-xl'
              }`}>
                {essay.title}
              </h3>
              
              <p className="text-muted/80 leading-relaxed mt-2">
                {essay.excerpt}
              </p>
            </div>

            <div className="flex items-center space-x-4 text-sm text-muted/60">
              <span className="bg-muted/30 px-3 py-1 rounded-full font-medium">
                {essay.category}
              </span>
              
              <div className="flex items-center space-x-1">
                <Calendar className="w-3 h-3" />
                <span>{new Date(essay.date).toLocaleDateString('en-US', { 
                  month: 'short', 
                  day: 'numeric',
                  year: 'numeric'
                })}</span>
              </div>
              
              <div className="flex items-center space-x-1">
                <Clock className="w-3 h-3" />
                <span>{essay.readTime}</span>
              </div>
            </div>

            {essay.featured && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="pt-4 border-t border-border/30"
              >
                <div className="prose prose-sm dark:prose-invert max-w-none">
                  <div className="text-muted/80 leading-relaxed">
                    {essay.content.split('\n\n')[1]?.substring(0, 200)}...
                  </div>
                </div>
              </motion.div>
            )}
          </div>

          <motion.div 
            className="flex items-center justify-between mt-6 pt-4 border-t border-border/30"
            initial={false}
            animate={{
              opacity: 1
            }}
          >
            <motion.span 
              className="text-sm font-medium text-accent group-hover:text-accent-foreground transition-colors inline-flex items-center space-x-1"
              whileHover={{ x: 5 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
            >
              <span>Read essay</span>
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </motion.span>
            
            <div className="text-xs text-muted/50">
              Coming soon
            </div>
          </motion.div>
        </div>
      </Link>
    </motion.article>
  );
}