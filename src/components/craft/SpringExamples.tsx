"use client";

import { motion, useInView, AnimatePresence, useMotionValue, useTransform, useSpring } from "framer-motion";
import { useRef, useState } from "react";

export function SpringExamples() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

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
          Spring Physics
        </h2>
        <p className="text-muted leading-relaxed max-w-2xl">
          Exploring natural motion through spring animations. These examples show 
          how different spring configurations create distinct feelings and personality in interfaces.
        </p>
      </div>

      <div className="grid gap-8">
        <SpringComparison />
        <MagneticButton />
        <StackedCards />
        <ElasticInput />
      </div>
    </motion.section>
  );
}

function SpringComparison() {
  const [trigger, setTrigger] = useState(0);

  const springs = [
    { name: "Gentle", stiffness: 100, damping: 20, mass: 1 },
    { name: "Snappy", stiffness: 400, damping: 10, mass: 0.5 },
    { name: "Bouncy", stiffness: 300, damping: 8, mass: 1 },
    { name: "Smooth", stiffness: 200, damping: 25, mass: 1 },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="font-display text-xl">Spring Configurations</h3>
        <button
          onClick={() => setTrigger(prev => prev + 1)}
          className="px-4 py-2 bg-accent/10 border border-accent/20 rounded-lg text-sm hover:bg-accent/20 transition-colors"
        >
          Animate
        </button>
      </div>
      
      <div className="bg-card border border-border rounded-lg p-6 space-y-4">
        {springs.map((spring, index) => (
          <div key={spring.name} className="flex items-center space-x-4">
            <motion.div
              key={trigger}
              initial={{ x: 0, scale: 1 }}
              animate={{ x: 200, scale: 1.1 }}
              transition={{
                type: "spring",
                stiffness: spring.stiffness,
                damping: spring.damping,
                mass: spring.mass,
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
    </div>
  );
}

function MagneticButton() {
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
    if (distance < 100) {
      x.set(distanceX * 0.3);
      y.set(distanceY * 0.3);
    }
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="font-display text-xl">Magnetic Button</h3>
        <span className="text-sm text-muted-foreground">Mouse interaction • Attraction force</span>
      </div>
      
      <div 
        className="bg-card border border-border rounded-lg p-12 flex items-center justify-center cursor-none"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <motion.button
          style={{ x: springX, y: springY }}
          whileTap={{ scale: 0.95 }}
          className="bg-accent text-accent-foreground px-8 py-4 rounded-lg font-medium shadow-lg"
        >
          Magnetic Button
        </motion.button>
      </div>
      
      <p className="text-sm text-muted-foreground leading-relaxed">
        Button is attracted to cursor within proximity. Spring physics create 
        natural magnetic behavior that feels responsive without being jarring.
      </p>
    </div>
  );
}

function StackedCards() {
  const [cards, setCards] = useState([
    { id: 1, title: "First Card", color: "bg-blue-500/20 border-blue-500/30" },
    { id: 2, title: "Second Card", color: "bg-purple-500/20 border-purple-500/30" },
    { id: 3, title: "Third Card", color: "bg-pink-500/20 border-pink-500/30" },
  ]);

  const moveToBack = (id: number) => {
    setCards(prev => {
      const card = prev.find(c => c.id === id);
      const others = prev.filter(c => c.id !== id);
      return card ? [...others, card] : prev;
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="font-display text-xl">Stacked Cards</h3>
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
                  scale: 1,
                  y: index * 8 - 10,
                  transition: { type: "spring", stiffness: 300, damping: 20 }
                }}
                transition={{
                  type: "spring",
                  stiffness: 200,
                  damping: 15,
                  mass: 0.8
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
      
      <p className="text-sm text-muted-foreground leading-relaxed">
        Click cards to cycle through stack. Each card has natural spring motion 
        and slight rotation to create depth. Hover reveals the layered structure.
      </p>
    </div>
  );
}

function ElasticInput() {
  const [value, setValue] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="font-display text-xl">Elastic Input</h3>
        <span className="text-sm text-muted-foreground">Focus states • Smooth scaling</span>
      </div>
      
      <div className="bg-card border border-border rounded-lg p-8 flex items-center justify-center">
        <div className="w-full max-w-md">
          <motion.div
            animate={{
              scale: isFocused ? 1.02 : 1,
            }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 20
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
              className="w-full px-4 py-3 bg-transparent border border-border rounded-lg focus:outline-none focus:border-accent transition-colors"
            />
            
            <motion.div
              initial={{ width: 0 }}
              animate={{ 
                width: isFocused ? "100%" : "0%" 
              }}
              transition={{
                type: "spring",
                stiffness: 400,
                damping: 30
              }}
              className="absolute bottom-0 left-0 h-0.5 bg-accent rounded-full"
            />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ 
              opacity: value.length > 0 ? 1 : 0,
              y: value.length > 0 ? 0 : 10
            }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 20
            }}
            className="mt-2 text-sm text-muted-foreground"
          >
            {value.length} characters
          </motion.div>
        </div>
      </div>
      
      <p className="text-sm text-muted-foreground leading-relaxed">
        Input field scales gently on focus with elastic spring physics. 
        The accent line grows smoothly, and character count appears with spring animation.
      </p>
    </div>
  );
}