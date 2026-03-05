"use client";

import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { useState, useEffect } from "react";
import { Heart, Download, Share, Play, Mail, Link2, Bookmark, MessageCircle } from "lucide-react";
import { duration, tap, transition } from "@/lib/motion";
import { CraftSection } from "@/components/craft/CraftSection";
import { SymbolEvidence, SymbolFeedback, SymbolPrinciple, SymbolProgress, SymbolState } from "@/components/craft/CraftSymbols";

export function InteractionStudies() {
  const shouldReduceMotion = useReducedMotion() ?? false;

  return (
    <CraftSection
      id="interaction-studies"
      title="Interaction Studies"
      intent="Focused studies in feedback and state transitions. Each demo exists to prove a product-facing behavior."
      constraint="Every state change must expose clear system status."
      evidence="Each study now includes one operational rationale and one failure mode."
    >
      <div className="grid gap-8 md:gap-10">
        <LikeButtonStudy shouldReduceMotion={shouldReduceMotion} />
        <DownloadProgressStudy />
        <ShareMenuStudy shouldReduceMotion={shouldReduceMotion} />
        <PlaybackControlStudy />
      </div>
    </CraftSection>
  );
}

function LikeButtonStudy({ shouldReduceMotion }: { shouldReduceMotion: boolean }) {
  const [isLiked, setIsLiked] = useState(false);
  const [count, setCount] = useState(42);

  return (
    <article className="rounded-xl border border-border/70 bg-card/60 p-6 space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h3 className="font-display text-xl inline-flex items-center gap-2">
          <SymbolFeedback className="text-accent" />
          Like Button Feedback
        </h3>
        <span className="text-sm text-muted-foreground">Micro lane • Immediate confirmation</span>
      </div>
      
      <div className="bg-background border border-border/70 rounded-lg p-8 flex items-center justify-center">
        <motion.button
          onClick={() => {
            setIsLiked(!isLiked);
            setCount(isLiked ? count - 1 : count + 1);
          }}
          whileTap={tap.deep}
          transition={transition.laneMicro}
          className="craft-focus motion-safe-transform inline-flex items-center space-x-2 group rounded-lg px-3 py-2"
          aria-label={isLiked ? `${count} likes, unlike` : `${count} likes, like`}
          aria-pressed={isLiked}
        >
          <motion.div
            animate={{ scale: isLiked ? 1.2 : 1 }}
            transition={{ 
              type: "spring", 
              stiffness: 400, 
              damping: 10 
            }}
            className="relative"
          >
            <Heart 
              aria-hidden="true"
              className={`w-6 h-6 motion-safe-transform duration-200 ${
                isLiked ? 'fill-accent text-accent' : 'text-muted'
              }`}
            />
            <AnimatePresence>
            {isLiked && !shouldReduceMotion && (
              <motion.div
                initial={{ scale: 1 }}
                animate={{ scale: [1, 1.5, 0] }}
                exit={{ opacity: 0 }}
                transition={{ duration: duration.slow }}
                className="absolute inset-0 bg-accent rounded-full opacity-30"
              />
            )}
            </AnimatePresence>
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
      </div>
      
      <p className="text-sm text-muted-foreground leading-relaxed inline-flex gap-2">
        <SymbolPrinciple className="text-accent mt-0.5 shrink-0" />
        Why this matters: confidence loops should be felt in under 200ms.
      </p>
    </article>
  );
}

function DownloadProgressStudy() {
  const [progress, setProgress] = useState(0);
  const [isDownloading, setIsDownloading] = useState(false);

  const startDownload = () => {
    setIsDownloading(true);
    setProgress(0);
    
    const interval = setInterval(() => {
      setProgress(prev => {
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
    <article className="rounded-xl border border-border/70 bg-card/60 p-6 space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h3 className="font-display text-xl inline-flex items-center gap-2">
          <SymbolProgress className="text-accent" />
          Download Progress
        </h3>
        <span className="text-sm text-muted-foreground">Interaction lane • Explicit status</span>
      </div>
      
      <div className="bg-background border border-border/70 rounded-lg p-8 flex items-center justify-center">
        <motion.button
          onClick={startDownload}
          disabled={isDownloading}
          className="craft-focus motion-safe-transform relative overflow-hidden bg-accent/10 border border-accent/30 rounded-lg px-6 py-3 min-w-[160px] font-medium"
          whileTap={tap.press}
          aria-label={isDownloading ? `Downloading ${Math.round(progress)}%` : progress === 100 ? "Download complete" : "Download file"}
        >
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: isDownloading ? `${progress}%` : "0%" }}
            className="absolute left-0 top-0 h-full bg-accent/20 rounded-lg"
          />
          
          <div className="relative flex items-center justify-center space-x-2">
            <Download aria-hidden="true" className="w-4 h-4" />
            <span className="font-medium">
              {isDownloading 
                ? `${Math.round(progress)}%` 
                : progress === 100 
                  ? "Complete!" 
                  : "Download"}
            </span>
          </div>
        </motion.button>
      </div>
      
      <p className="text-sm text-muted-foreground leading-relaxed inline-flex gap-2">
        <SymbolEvidence className="text-accent mt-0.5 shrink-0" />
        Failure mode prevented: no ambiguous waiting state once action is committed.
      </p>
    </article>
  );
}

function ShareMenuStudy({ shouldReduceMotion }: { shouldReduceMotion: boolean }) {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { icon: Mail, label: "Email", delay: 0 },
    { icon: MessageCircle, label: "Post", delay: 0.1 },
    { icon: Link2, label: "Copy Link", delay: 0.2 },
    { icon: Bookmark, label: "Save", delay: 0.3 },
  ];

  return (
    <article className="rounded-xl border border-border/70 bg-card/60 p-6 space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h3 className="font-display text-xl inline-flex items-center gap-2">
          <SymbolState className="text-accent" />
          Share Menu
        </h3>
        <span className="text-sm text-muted-foreground">Interaction lane • Contextual reveal</span>
      </div>
      
      <div className="bg-background border border-border/70 rounded-lg p-8 flex items-center justify-center">
        <div className="relative">
          <motion.button
            onClick={() => setIsOpen(!isOpen)}
            whileTap={tap.deep}
            className="craft-focus motion-safe-transform bg-accent/10 border border-accent/30 rounded-full p-3"
            aria-label={isOpen ? "Close share menu" : "Open share menu"}
            aria-expanded={isOpen}
          >
            <Share aria-hidden="true" className="w-5 h-5" />
          </motion.button>
          
          <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={shouldReduceMotion ? transition.fade : transition.laneInteraction}
              className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-card border border-border rounded-lg p-2 min-w-[140px]"
            >
              {menuItems.map((item) => {
                const Icon = item.icon;
                return (
                <motion.button
                  key={item.label}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ 
                    delay: item.delay,
                    ...transition.laneInteraction,
                  }}
                  className="craft-focus motion-safe-transform w-full flex items-center space-x-3 px-3 py-2 text-left hover:bg-muted/50 rounded text-sm"
                >
                  <Icon aria-hidden="true" className="h-4 w-4 text-muted-foreground" />
                  <span>{item.label}</span>
                </motion.button>
              )})}
            </motion.div>
          )}
          </AnimatePresence>
        </div>
      </div>
      
      <p className="text-sm text-muted-foreground leading-relaxed inline-flex gap-2">
        <SymbolPrinciple className="text-accent mt-0.5 shrink-0" />
        One trigger controls one localized surface; exit timing mirrors entry.
      </p>
    </article>
  );
}

function PlaybackControlStudy() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const duration = 100;

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentTime(prev => {
          if (prev >= duration) {
            setIsPlaying(false);
            return duration;
          }
          return prev + 1;
        });
      }, 100);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  return (
    <article className="rounded-xl border border-border/70 bg-card/60 p-6 space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h3 className="font-display text-xl inline-flex items-center gap-2">
          <SymbolState className="text-accent" />
          Playback Control
        </h3>
        <span className="text-sm text-muted-foreground">Micro + interaction lanes</span>
      </div>
      
      <div className="bg-background border border-border/70 rounded-lg p-8">
        <div className="flex items-center space-x-4">
          <motion.button
            onClick={() => setIsPlaying(!isPlaying)}
            whileTap={tap.deep}
            className="craft-focus motion-safe-transform bg-accent/10 border border-accent/30 rounded-full p-4 relative overflow-hidden"
            aria-label={isPlaying ? "Pause" : "Play"}
          >
            <motion.div
              animate={{ 
                scale: isPlaying ? 1 : 0,
                opacity: isPlaying ? 1 : 0 
              }}
              transition={{ duration: 0.2 }}
              className="absolute inset-3 bg-accent/20 rounded-sm"
            />
            <Play 
              aria-hidden="true"
              className={`w-6 h-6 motion-safe-transform duration-200 ${
                isPlaying ? 'opacity-0 scale-75' : 'opacity-100 scale-100'
              }`} 
            />
          </motion.button>
          
          <div className="flex-1 space-y-2">
            <div className="relative bg-muted/30 rounded-full h-1 overflow-hidden">
              <motion.div
                className="absolute left-0 top-0 h-full bg-accent rounded-full"
                initial={{ width: "0%" }}
                animate={{ width: `${(currentTime / duration) * 100}%` }}
                transition={{ duration: 0.1 }}
              />
            </div>
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>{Math.floor(currentTime / 10)}:{(currentTime % 10).toString().padStart(2, '0')}</span>
              <span>{Math.floor(duration / 10)}:{(duration % 10).toString().padStart(2, '0')}</span>
            </div>
          </div>
        </div>
      </div>
      
      <p className="text-sm text-muted-foreground leading-relaxed inline-flex gap-2">
        <SymbolEvidence className="text-accent mt-0.5 shrink-0" />
        Rationale: icon morph plus continuous progress keeps playback state legible.
      </p>
    </article>
  );
}
