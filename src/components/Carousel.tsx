"use client";

import { ChevronLeft, ChevronRight, X, Loader2 } from "lucide-react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useTransform,
} from "framer-motion";
import { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import { FastAverageColor } from "fast-average-color";

interface CarouselProps {
  images: string[];
  onClose: () => void;
}

const DRAG_THRESHOLD = 150;

export default function Carousel({ images, onClose }: CarouselProps) {
  const [index, setIndex] = useState(0);
  const [isDark, setIsDark] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const x = useMotionValue(0);

  useEffect(() => {
    setIsLoading(true);
    const img = new window.Image();
    img.src = images[index];
    const fac = new FastAverageColor();

    const processImage = () => {
      fac
        .getColorAsync(img)
        .then((color) => {
          setIsDark(color.isDark);
        })
        .catch(() => {
          // Color extraction failed - use default
        })
        .finally(() => {
          setIsLoading(false);
          fac.destroy();
        });
    };

    if (img.complete) {
      processImage();
    } else {
      img.onload = processImage;
    }

    return () => {
      img.onload = null;
      fac.destroy();
    };
  }, [index, images]);

  const onDragEnd = (info: { offset: { x: number } }) => {
    if (info.offset.x > DRAG_THRESHOLD && index > 0) {
      setIndex(index - 1);
    } else if (info.offset.x < -DRAG_THRESHOLD && index < images.length - 1) {
      setIndex(index + 1);
    }
  };

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft" && index > 0) setIndex(index - 1);
      else if (e.key === "ArrowRight" && index < images.length - 1)
        setIndex(index + 1);
      else if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKeyPress);
    return () => document.removeEventListener("keydown", handleKeyPress);
  }, [index, images.length, onClose]);

  const buttonClasses = `absolute top-1/2 -translate-y-1/2 z-20 flex h-10 w-10 items-center justify-center rounded-full transition-all duration-200 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 ${
    isDark ? "bg-white/10 hover:bg-white/20" : "bg-black/10 hover:bg-black/20"
  }`;
  const iconClasses = `h-6 w-6 ${isDark ? "text-white" : "text-black"}`;

  // Preload next and previous images
  useEffect(() => {
    if (index > 0) {
      const prevImage = new window.Image();
      prevImage.src = images[index - 1];
    }
    if (index < images.length - 1) {
      const nextImage = new window.Image();
      nextImage.src = images[index + 1];
    }
  }, [index, images]);

  return (
    <div className="relative h-screen w-screen bg-black/50">
      <AnimatePresence>
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className={`absolute top-4 right-4 z-20 flex h-10 w-10 items-center justify-center rounded-full transition-all duration-200 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 ${
            isDark
              ? "bg-white/10 hover:bg-white/20"
              : "bg-black/10 hover:bg-black/20"
          }`}
          onClick={onClose}
          aria-label="Close image gallery"
        >
          <X className={iconClasses} />
        </motion.button>
      </AnimatePresence>

      <div className="absolute inset-0 z-0">
        <Image
          src={images[index]}
          alt="Background"
          fill
          objectFit="cover"
          className="blur-xl scale-110"
        />
      </div>

      <motion.div
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        style={{ x }}
        onDragEnd={(_, info) => onDragEnd(info)}
        className="relative z-10 h-full w-full flex items-center justify-center"
      >
        <AnimatePresence>
          {isLoading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute z-10"
            >
              <Loader2 className={`animate-spin h-12 w-12 ${iconClasses}`} />
            </motion.div>
          )}
        </AnimatePresence>
        <AnimatePresence initial={false}>
          <motion.div
            key={index}
            initial={{ opacity: 0, x: index > 0 ? 100 : -100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: index > 0 ? -100 : 100 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="absolute flex items-center justify-center h-full w-full"
          >
            <Image
              src={images[index]}
              alt={`Screenshot ${index + 1}`}
              fill
              objectFit="contain"
              className="pointer-events-none"
            />
          </motion.div>
        </AnimatePresence>
      </motion.div>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex space-x-2">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            aria-label={`Go to image ${i + 1}`}
            className={`h-2 w-2 rounded-full transition-all duration-200 hover:scale-125 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 ${
              i === index
                ? isDark
                  ? "bg-white"
                  : "bg-black"
                : isDark
                ? "bg-white/30 hover:bg-white/50"
                : "bg-black/30 hover:bg-black/50"
            }`}
          />
        ))}
      </div>

      <AnimatePresence>
        {index > 0 && (
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={`${buttonClasses} left-4`}
            onClick={() => setIndex(index - 1)}
            aria-label="Previous image"
          >
            <ChevronLeft className={iconClasses} />
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {index < images.length - 1 && (
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={`${buttonClasses} right-4`}
            onClick={() => setIndex(index + 1)}
            aria-label="Next image"
          >
            <ChevronRight className={iconClasses} />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
