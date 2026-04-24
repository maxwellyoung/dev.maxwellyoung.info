"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Heart, Download, Share, Play, Mail, Link2, Bookmark, MessageCircle } from "lucide-react";
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
        whileTap={tap.deep}
        className="group flex min-h-11 min-w-11 items-center space-x-2 rounded-md px-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
        aria-label={isLiked ? `${count} likes, unlike` : `${count} likes, like`}
        aria-pressed={isLiked}
      >
        <motion.div
          animate={{ scale: isLiked ? 1.2 : 1 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
          className="relative"
        >
          <Heart
            className={`h-6 w-6 transition-all duration-300 ${
              isLiked ? "fill-accent text-accent" : "text-muted"
            }`}
            aria-hidden="true"
          />
          {isLiked && (
            <motion.div
              initial={{ scale: 1 }}
              animate={{ scale: [1, 1.5, 0] }}
              transition={{ duration: duration.slow }}
              className="absolute inset-0 bg-accent rounded-full opacity-30"
            />
          )}
        </motion.div>
        <motion.span
          key={count}
          initial={{ y: -10, opacity: 0 }}
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
        return prev + Math.random() * 15;
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
        whileTap={tap.press}
        aria-label={
          isDownloading
            ? `Downloading ${Math.round(progress)}%`
            : progress === 100
            ? "Download complete"
            : "Download file"
        }
      >
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: isDownloading ? `${progress}%` : "0%" }}
          className="absolute left-0 top-0 h-full bg-accent/20 rounded-lg"
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

  const menuItems = [
    { icon: Mail, label: "Email", delay: 0 },
    { icon: MessageCircle, label: "Post", delay: 0.1 },
    { icon: Link2, label: "Copy Link", delay: 0.2 },
    { icon: Bookmark, label: "Save", delay: 0.3 },
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
          whileTap={tap.deep}
          className="min-h-11 min-w-11 rounded-full border border-accent/20 bg-accent/10 p-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
          aria-label={isOpen ? "Close share menu" : "Open share menu"}
          aria-expanded={isOpen}
        >
          <Share className="h-5 w-5" aria-hidden="true" />
        </motion.button>

        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-card border border-border rounded-lg p-2 min-w-[140px]"
          >
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <motion.button
                  type="button"
                  key={item.label}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    delay: item.delay,
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
      </div>
    </Study>
  );
}

function PlaybackControlStudy() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
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
          whileTap={tap.deep}
          className="relative min-h-11 min-w-11 overflow-hidden rounded-full border border-accent/20 bg-accent/10 p-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
          aria-label={isPlaying ? "Pause" : "Play"}
        >
          <motion.div
            animate={{
              scale: isPlaying ? 1 : 0,
              opacity: isPlaying ? 1 : 0,
            }}
            transition={{ duration: 0.2 }}
            className="absolute inset-3 bg-accent/20 rounded-sm"
          />
          <Play
            className={`h-6 w-6 transition-all duration-200 ${
              isPlaying ? "opacity-0 scale-75" : "opacity-100 scale-100"
            }`}
            aria-hidden="true"
          />
        </motion.button>

        <div className="flex-1 space-y-2">
          <div className="relative bg-muted/30 rounded-full h-1 overflow-hidden">
            <motion.div
              className="absolute left-0 top-0 h-full bg-accent rounded-full"
              initial={{ width: "0%" }}
              animate={{ width: `${(currentTime / trackDuration) * 100}%` }}
              transition={{ duration: 0.1 }}
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
