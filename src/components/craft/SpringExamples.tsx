"use client";

import { motion, AnimatePresence, useMotionValue, useSpring, useReducedMotion } from "framer-motion";
import { useState } from "react";
import { duration, tap } from "@/lib/motion";
import { CraftSection } from "@/components/craft/CraftSection";
import { SymbolCaution, SymbolEvidence, SymbolPrinciple, SymbolState } from "@/components/craft/CraftSymbols";

export function SpringExamples() {
  const shouldReduceMotion = useReducedMotion() ?? false;

  return (
    <CraftSection
      id="spring-physics"
      title="Spring Physics"
      intent="Natural motion should map to interface weight and urgency, not just visual flair."
      constraint="Use spring mechanics only when they add causal clarity."
      evidence="All demos use transform/opacity with reduced-motion equivalents."
    >
      <div className="grid gap-8">
        <SpringComparison shouldReduceMotion={shouldReduceMotion} />
        <MagneticButton shouldReduceMotion={shouldReduceMotion} />
        <StackedCards shouldReduceMotion={shouldReduceMotion} />
        <ElasticInput shouldReduceMotion={shouldReduceMotion} />
      </div>
    </CraftSection>
  );
}

function SpringComparison({ shouldReduceMotion }: { shouldReduceMotion: boolean }) {
  const [trigger, setTrigger] = useState(0);

  const springs = [
    { name: "Gentle", stiffness: 100, damping: 20, mass: 1 },
    { name: "Snappy", stiffness: 400, damping: 10, mass: 0.5 },
    { name: "Bouncy", stiffness: 300, damping: 8, mass: 1 },
    { name: "Smooth", stiffness: 200, damping: 25, mass: 1 },
  ];

  return (
    <article className="rounded-xl border border-border/70 bg-card/60 p-6 space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h3 className="font-display text-xl inline-flex items-center gap-2">
          <SymbolState className="text-accent" />
          Spring Configurations
        </h3>
        <button
          onClick={() => setTrigger(prev => prev + 1)}
          className="craft-focus motion-safe-transform px-4 py-2 bg-accent/10 border border-accent/30 rounded-lg text-sm hover:bg-accent/20"
        >
          Animate
        </button>
      </div>
      
      <div className="bg-card border border-border rounded-lg p-6 space-y-4">
        {springs.map((spring) => (
          <div key={spring.name} className="flex items-center space-x-4">
            <motion.div
              key={trigger}
              initial={{ x: 0, scale: 1 }}
              animate={{ x: 200, scale: 1.1 }}
              transition={{
                ...(shouldReduceMotion
                  ? { duration: 0 }
                  : {
                      type: "spring",
                      stiffness: spring.stiffness,
                      damping: spring.damping,
                      mass: spring.mass,
                    }),
              }}
              className="w-4 h-4 bg-accent rounded-full"
            />
            <div className="flex-1">
              <div className="font-medium text-sm">{spring.name}</div>
              <div className="text-xs text-muted-foreground">
                Stiffness: {spring.stiffness} • Damping: {spring.damping} • Mass: {spring.mass}
              </div>
            </div>
          </div>
        ))}
      </div>
    </article>
  );
}

function MagneticButton({ shouldReduceMotion }: { shouldReduceMotion: boolean }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 300, damping: 20 });
  const springY = useSpring(y, { stiffness: 300, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const distanceX = e.clientX - centerX;
    const distanceY = e.clientY - centerY;
    
    // Magnetic effect: pull towards cursor when within range
    const distance = Math.sqrt(distanceX ** 2 + distanceY ** 2);
    if (!shouldReduceMotion && distance < 100) {
      x.set(distanceX * 0.3);
      y.set(distanceY * 0.3);
    }
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <article className="rounded-xl border border-border/70 bg-card/60 p-6 space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h3 className="font-display text-xl inline-flex items-center gap-2">
          <SymbolPrinciple className="text-accent" />
          Magnetic Button
        </h3>
        <span className="text-sm text-muted-foreground">Mouse interaction • Attraction force</span>
      </div>
      
      <div 
        className="bg-card border border-border rounded-lg p-12 flex items-center justify-center"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <motion.button
          style={shouldReduceMotion ? undefined : { x: springX, y: springY }}
          whileTap={tap.deep}
          className="craft-focus motion-safe-transform bg-foreground text-background px-8 py-4 rounded-lg font-medium shadow-lg"
        >
          Magnetic Button
        </motion.button>
      </div>
      
      <p className="text-sm text-muted-foreground leading-relaxed inline-flex gap-2">
        <SymbolEvidence className="text-accent mt-0.5 shrink-0" />
        Utility note: the interaction remains optional and never blocks action completion.
      </p>
    </article>
  );
}

function StackedCards({ shouldReduceMotion }: { shouldReduceMotion: boolean }) {
  const [cards, setCards] = useState([
    { id: 1, title: "First Card", color: "bg-blue-500/10 border-blue-500/40 text-foreground" },
    { id: 2, title: "Second Card", color: "bg-purple-500/10 border-purple-500/40 text-foreground" },
    { id: 3, title: "Third Card", color: "bg-pink-500/10 border-pink-500/40 text-foreground" },
  ]);

  const moveToBack = (id: number) => {
    setCards(prev => {
      const card = prev.find(c => c.id === id);
      const others = prev.filter(c => c.id !== id);
      return card ? [...others, card] : prev;
    });
  };

  return (
    <article className="rounded-xl border border-border/70 bg-card/60 p-6 space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h3 className="font-display text-xl inline-flex items-center gap-2">
          <SymbolState className="text-accent" />
          Stacked Cards
        </h3>
        <span className="text-sm text-muted-foreground">Staggered animation • Z-index layers</span>
      </div>
      
      <div className="bg-card border border-border rounded-lg p-12 flex items-center justify-center">
        <div className="relative w-48 h-32">
          <AnimatePresence>
            {cards.map((card, index) => (
              <motion.div
                key={card.id}
                layout
                initial={{ 
                  scale: 0.8, 
                  y: index * 20, 
                  rotate: (index - 1) * 5,
                  opacity: 0 
                }}
                animate={{ 
                  scale: 1 - index * 0.05, 
                  y: index * 8, 
                  rotate: (index - 1) * 3,
                  opacity: 1,
                  zIndex: cards.length - index 
                }}
                exit={{ 
                  scale: 0.8, 
                  opacity: 0, 
                  transition: { duration: 0.2 } 
                }}
                whileHover={{ 
                  ...(shouldReduceMotion
                    ? {}
                    : {
                        scale: 1,
                        y: index * 8 - 10,
                        transition: { type: "spring", stiffness: 300, damping: 20 },
                      })
                }}
                transition={{
                  ...(shouldReduceMotion
                    ? { duration: 0 }
                    : {
                        type: "spring",
                        stiffness: 200,
                        damping: 15,
                        mass: 0.8,
                      })
                }}
                onClick={() => moveToBack(card.id)}
                className={`absolute inset-0 ${card.color} border rounded-lg p-4 cursor-pointer select-none flex items-center justify-center font-medium text-sm`}
                style={{ zIndex: cards.length - index }}
              >
                {card.title}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
      
      <p className="text-sm text-muted-foreground leading-relaxed inline-flex gap-2">
        <SymbolCaution className="text-accent mt-0.5 shrink-0" />
        Anti-pattern avoided: depth cues are subtle enough to preserve scanability.
      </p>
    </article>
  );
}

function ElasticInput({ shouldReduceMotion }: { shouldReduceMotion: boolean }) {
  const [value, setValue] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  return (
    <article className="rounded-xl border border-border/70 bg-card/60 p-6 space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h3 className="font-display text-xl inline-flex items-center gap-2">
          <SymbolState className="text-accent" />
          Elastic Input
        </h3>
        <span className="text-sm text-muted-foreground">Focus states • Smooth scaling</span>
      </div>
      
      <div className="bg-card border border-border rounded-lg p-8 flex items-center justify-center">
        <div className="w-full max-w-md">
          <motion.div
            animate={{
              scale: shouldReduceMotion ? 1 : isFocused ? 1.02 : 1,
            }}
            transition={{
              ...(shouldReduceMotion
                ? { duration: 0 }
                : {
                    type: "spring",
                    stiffness: 300,
                    damping: 20,
                  })
            }}
            className="relative"
          >
            <motion.input
              type="text"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              placeholder="Type something..."
              aria-label="Elastic input demo"
              className="craft-focus motion-safe-transform w-full px-4 py-3 bg-transparent border border-border rounded-lg focus:outline-none focus:border-accent"
            />
            
            <motion.div
              initial={{ width: 0 }}
              animate={{ 
                width: isFocused ? "100%" : "0%" 
              }}
              transition={{
                ...(shouldReduceMotion
                  ? { duration: 0 }
                  : {
                      type: "spring",
                      stiffness: 400,
                      damping: 30,
                    })
              }}
              className="absolute bottom-0 left-0 h-0.5 bg-accent rounded-full"
            />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ 
              opacity: value.length > 0 ? 1 : 0,
              y: shouldReduceMotion ? 0 : value.length > 0 ? 0 : 10
            }}
            transition={{
              ...(shouldReduceMotion
                ? { duration: 0 }
                : {
                    type: "spring",
                    stiffness: 300,
                    damping: 20,
                  })
            }}
            className="mt-2 text-sm text-muted-foreground"
          >
            {value.length} characters
          </motion.div>
        </div>
      </div>
      
      <p className="text-sm text-muted-foreground leading-relaxed inline-flex gap-2">
        <SymbolEvidence className="text-accent mt-0.5 shrink-0" />
        Product rationale: focus, text entry, and response remain visually coupled.
      </p>
    </article>
  );
}
