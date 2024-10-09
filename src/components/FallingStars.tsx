import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface Star {
  id: number;
  x: number;
  delay: number;
}

interface FallingStarsProps {
  onComplete: () => void;
}

const FallingStars: React.FC<FallingStarsProps> = ({ onComplete }) => {
  const [stars, setStars] = useState<Star[]>([]);

  useEffect(() => {
    const newStars = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * window.innerWidth,
      delay: Math.random() * 2,
    }));
    setStars(newStars);

    const timer = setTimeout(() => {
      onComplete();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      {stars.map((star) => (
        <motion.div
          key={star.id}
          className="absolute w-1 h-1 rounded-full dark:bg-white bg-black"
          initial={{ y: -10, x: star.x }}
          animate={{ y: window.innerHeight + 10 }}
          transition={{
            duration: 2,
            delay: star.delay,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
};

export default FallingStars;
