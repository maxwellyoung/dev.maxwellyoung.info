"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useState, useEffect } from "react";
import { Heart, Download, Share, Play, Pause, Mail, Link2, Bookmark, MessageCircle } from "lucide-react";
import { duration, tap } from "@/lib/motion";

export function InteractionStudies() {
  return (
    <section className="space-y-10">
      <div>
        <h2 className="text-xl font-medium mb-2">Interaction Studies</h2>
        <p className="text-sm text-muted-foreground leading-relaxed max-w-prose">
          Feedback, state transitions, and motion behavior. Patterns meant for
          product work, not demos.
        </p>
      </div>

      <div className="space-y-10">
        <LikeButtonStudy />
        <DownloadProgressStudy />
        <ShareMenuStudy />
        <PlaybackControlStudy />
      </div>
    </section>
  );
}

function Study({
  title,
  note,
  children,
}: {
  title: string;
  note: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-3">
      <div>
        <h3 className="text-sm font-medium text-foreground">{title}</h3>
        <p className="text-sm text-muted-foreground mt-1 leading-relaxed">{note}</p>
      </div>
      <div className="py-8 flex items-center justify-center border-t border-[hsl(var(--border))]/50">
        {children}
      </div>
    </div>
  );
}

function LikeButtonStudy() {
  const [isLiked, setIsLiked] = useState(false);
  const [count, setCount] = useState(42);
  const shouldReduceMotion = useReducedMotion() ?? false;

  return (
    <Study
      title="Like Button"
      note="Scale feedback with color transition and particle burst. Spring physics reward engagement."
    >
      <motion.button
        type="button"
        onClick={() => {
          setIsLiked(!isLiked);
          setCount(isLiked ? count - 1 : count + 1);
        }}
        whileTap={shouldReduceMotion ? undefined : tap.deep}
        className="group flex min-h-11 min-w-11 items-center space-x-2 rounded-md px-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
        aria-label={isLiked ? `${count} likes, unlike` : `${count} likes, like`}
        aria-pressed={isLiked}
      >
        <motion.div
          animate={{ scale: shouldReduceMotion ? 1 : isLiked ? 1.2 : 1 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
          className="relative"
        >
          <Heart
            className={`h-6 w-6 transition-colors duration-200 ${
              isLiked ? "fill-accent text-accent" : "text-muted"
            }`}
            aria-hidden="true"
          />
          {isLiked && !shouldReduceMotion && (
            <motion.div
              initial={{ scale: 1, opacity: 0.3 }}
              animate={{ scale: 1.35, opacity: 0 }}
              transition={{ duration: duration.slow }}
              className="absolute inset-0 bg-accent rounded-full opacity-30"
            />
          )}
        </motion.div>
        <motion.span
          key={count}
          initial={{ y: shouldReduceMotion ? 0 : -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 15 }}
          className="text-sm font-medium"
        >
          {count}
        </motion.span>
      </motion.button>
    </Study>
  );
}

function DownloadProgressStudy() {
  const [progress, setProgress] = useState(0);
  const [isDownloading, setIsDownloading] = useState(false);
  const shouldReduceMotion = useReducedMotion() ?? false;

  const startDownload = () => {
    setIsDownloading(true);
    setProgress(0);

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setIsDownloading(false), 500);
          return 100;
        }
        return Math.min(100, prev + Math.random() * 15);
      });
    }, 200);
  };

  return (
    <Study
      title="Download Progress"
      note="Button morphs to show progress with a fluid fill. State changes stay connected so the system feels legible."
    >
      <motion.button
        type="button"
        onClick={startDownload}
        disabled={isDownloading}
        className="relative min-h-11 min-w-[160px] overflow-hidden rounded-lg border border-accent/20 bg-accent/10 px-6 py-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
        whileTap={shouldReduceMotion ? undefined : tap.press}
        aria-label={
          isDownloading
            ? `Downloading ${Math.round(progress)}%`
            : progress === 100
            ? "Download complete"
            : "Download file"
        }
      >
        <div
          className="absolute inset-0 origin-left rounded-lg bg-accent/20 transition-transform duration-200 ease-linear motion-reduce:transition-none"
          style={{ transform: `scaleX(${Math.min(progress, 100) / 100})` }}
        />

        <div className="relative flex items-center justify-center space-x-2">
          <Download className="h-4 w-4" aria-hidden="true" />
          <span className="font-medium">
            {isDownloading
              ? `${Math.round(progress)}%`
              : progress === 100
              ? "Complete"
              : "Download"}
          </span>
        </div>
      </motion.button>
    </Study>
  );
}

function ShareMenuStudy() {
  const [isOpen, setIsOpen] = useState(false);
  const shouldReduceMotion = useReducedMotion() ?? false;

  const menuItems = [
    { icon: Mail, label: "Email", delay: 0 },
    { icon: MessageCircle, label: "Post", delay: 0.04 },
    { icon: Link2, label: "Copy Link", delay: 0.08 },
    { icon: Bookmark, label: "Save", delay: 0.12 },
  ];

  return (
    <Study
      title="Share Menu"
      note="Staggered spring reveals build rhythm without shouting — each item earns its own moment."
    >
      <div className="relative">
        <motion.button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          whileTap={shouldReduceMotion ? undefined : tap.deep}
          className="min-h-11 min-w-11 rounded-full border border-accent/20 bg-accent/10 p-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
          aria-label={isOpen ? "Close share menu" : "Open share menu"}
          aria-expanded={isOpen}
        >
          <Share className="h-5 w-5" aria-hidden="true" />
        </motion.button>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, scale: shouldReduceMotion ? 1 : 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: shouldReduceMotion ? 1 : 0.95 }}
              transition={shouldReduceMotion
                ? { duration: 0.1 }
                : { duration: 0.18, ease: [0.23, 1, 0.32, 1] }}
              className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 origin-bottom bg-card border border-border rounded-lg p-2 min-w-[140px]"
            >
              {menuItems.map((item) => {
                const Icon = item.icon;
                return (
                  <motion.button
                    type="button"
                    key={item.label}
                    initial={{ opacity: 0, x: shouldReduceMotion ? 0 : -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      delay: shouldReduceMotion ? 0 : item.delay,
                      type: "spring",
                      stiffness: 400,
                      damping: 25,
                    }}
                    className="flex min-h-11 w-full items-center space-x-3 rounded px-3 py-2 text-left text-sm hover:bg-muted/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
                  >
                    <Icon className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
                    <span>{item.label}</span>
                  </motion.button>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Study>
  );
}

function PlaybackControlStudy() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const shouldReduceMotion = useReducedMotion() ?? false;
  const trackDuration = 100;

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentTime((prev) => {
          if (prev >= trackDuration) {
            setIsPlaying(false);
            return trackDuration;
          }
          return prev + 1;
        });
      }, 100);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  return (
    <Study
      title="Playback Control"
      note="Play morphs to pause with layered transitions. Progress advances smoothly to hold the sense of continuity."
    >
      <div className="flex items-center space-x-4 w-full max-w-md">
        <motion.button
          type="button"
          onClick={() => setIsPlaying(!isPlaying)}
          whileTap={shouldReduceMotion ? undefined : tap.deep}
          className="relative min-h-11 min-w-11 overflow-hidden rounded-full border border-accent/20 bg-accent/10 p-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
          aria-label={isPlaying ? "Pause" : "Play"}
        >
          <span className="relative block h-6 w-6">
            <Play
              className={`absolute inset-0 h-6 w-6 transition-[opacity,transform] duration-150 motion-reduce:transition-none ${
                isPlaying ? "scale-95 opacity-0" : "scale-100 opacity-100"
              }`}
              aria-hidden="true"
            />
            <Pause
              className={`absolute inset-0 h-6 w-6 transition-[opacity,transform] duration-150 motion-reduce:transition-none ${
                isPlaying ? "scale-100 opacity-100" : "scale-95 opacity-0"
              }`}
              aria-hidden="true"
            />
          </span>
        </motion.button>

        <div className="flex-1 space-y-2">
          <div className="relative bg-muted/30 rounded-full h-1 overflow-hidden">
            <div
              style={{ transform: `scaleX(${currentTime / trackDuration})` }}
              className="absolute inset-0 origin-left rounded-full bg-accent transition-transform duration-100 ease-linear motion-reduce:transition-none"
            />
          </div>
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>
              {Math.floor(currentTime / 10)}:
              {(currentTime % 10).toString().padStart(2, "0")}
            </span>
            <span>
              {Math.floor(trackDuration / 10)}:
              {(trackDuration % 10).toString().padStart(2, "0")}
            </span>
          </div>
        </div>
      </div>
    </Study>
  );
}
