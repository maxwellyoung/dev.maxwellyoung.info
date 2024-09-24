"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  AnimatePresence,
  MotionConfig,
  motion,
  useMotionTemplate,
  useSpring,
} from "framer-motion";
import { useEffect, useState } from "react";
import Image from "next/image";

interface CarouselProps {
  images: string[];
}

export default function Carousel({ images }: CarouselProps) {
  let [index, setIndex] = useState(0);

  let x = index * 100;
  let xSpring = useSpring(x, { bounce: 0 });
  let xPercentage = useMotionTemplate`-${xSpring}%`;

  useEffect(() => {
    xSpring.set(x);
  }, [x, xSpring]);

  useEffect(() => {
    function handleKeyPress(e: KeyboardEvent) {
      if (e.key === "ArrowLeft") {
        if (index > 0) {
          setIndex(index - 1);
        }
      } else if (e.key === "ArrowRight") {
        if (index < images.length - 1) {
          setIndex(index + 1);
        }
      }
    }

    document.addEventListener("keydown", handleKeyPress);

    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [index, images.length]);

  return (
    <MotionConfig transition={{ type: "spring", bounce: 0 }}>
      <div className="flex flex-col h-screen">
        <div className="relative flex-grow">
          <div className="absolute inset-0 z-0">
            <Image
              src={images[index]}
              alt="Background"
              layout="fill"
              objectFit="cover"
              className="blur-xl opacity-50"
            />
          </div>
          <div className="relative z-10 h-full flex items-center justify-center">
            <motion.div
              style={{ x: xPercentage }}
              className="flex w-full h-full"
            >
              {images.map((image, i) => (
                <motion.div
                  key={image}
                  animate={{ opacity: i === index ? 1 : 0.4 }}
                  className="w-full h-full flex-shrink-0 relative"
                >
                  <Image
                    src={image}
                    alt={`Screenshot ${i + 1}`}
                    layout="fill"
                    objectFit="contain"
                  />
                </motion.div>
              ))}
            </motion.div>
          </div>

          <AnimatePresence initial={false}>
            {index > 0 && (
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.7 }}
                exit={{ opacity: 0, pointerEvents: "none" }}
                whileHover={{ opacity: 1 }}
                className="absolute left-4 top-1/2 -mt-4 flex h-8 w-8 items-center justify-center rounded-full bg-white z-20"
                onClick={() => setIndex(index - 1)}
              >
                <ChevronLeft className="h-6 w-6 text-black" />
              </motion.button>
            )}
          </AnimatePresence>

          <AnimatePresence initial={false}>
            {index + 1 < images.length && (
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.7 }}
                exit={{ opacity: 0, pointerEvents: "none" }}
                whileHover={{ opacity: 1 }}
                className="absolute right-4 top-1/2 -mt-4 flex h-8 w-8 items-center justify-center rounded-full bg-white z-20"
                onClick={() => setIndex(index + 1)}
              >
                <ChevronRight className="h-6 w-6 text-black" />
              </motion.button>
            )}
          </AnimatePresence>
        </div>

        <div className="relative z-10">
          <Thumbnails images={images} index={index} setIndex={setIndex} />
        </div>
      </div>
    </MotionConfig>
  );
}

const COLLAPSED_ASPECT_RATIO = 9 / 16;
const FULL_ASPECT_RATIO = 16 / 9;
const MARGIN = 4;
const GAP = 4;

function Thumbnails({
  images,
  index,
  setIndex,
}: {
  images: string[];
  index: number;
  setIndex: (value: number) => void;
}) {
  let x =
    index * 100 * (COLLAPSED_ASPECT_RATIO / FULL_ASPECT_RATIO) +
    MARGIN +
    index * GAP;
  let xSpring = useSpring(x, { bounce: 0 });
  let xPercentage = useMotionTemplate`-${xSpring}%`;

  useEffect(() => {
    xSpring.set(x);
  }, [x, xSpring]);

  return (
    <div className="flex justify-center overflow-hidden bg-black bg-opacity-50">
      <motion.div
        style={{
          gap: `${GAP}px`,
          x: xPercentage,
        }}
        className="flex min-w-0"
      >
        {images.map((image, i) => (
          <motion.button
            onClick={() => setIndex(i)}
            initial={false}
            animate={i === index ? "active" : "inactive"}
            variants={{
              active: {
                aspectRatio: FULL_ASPECT_RATIO,
                marginLeft: `${MARGIN}px`,
                marginRight: `${MARGIN}px`,
              },
              inactive: {
                aspectRatio: COLLAPSED_ASPECT_RATIO,
                marginLeft: 0,
                marginRight: 0,
              },
            }}
            className="h-16 shrink-0 relative"
            key={image}
          >
            <Image
              src={image}
              alt={`Thumbnail ${i + 1}`}
              layout="fill"
              objectFit="cover"
            />
          </motion.button>
        ))}
      </motion.div>
    </div>
  );
}
