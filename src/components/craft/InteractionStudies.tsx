"use client";

import { motion, useInView, useMotionValue, useSpring } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Heart, Download, Share, Play } from "lucide-react";

export function InteractionStudies() {
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
          Interaction Studies
        </h2>
        <p className="text-muted leading-relaxed max-w-2xl">
          Explorations in micro-interactions that reward learning and create 
          delightful moments. Each study focuses on a specific interaction pattern 
          or motion principle.
        </p>
      </div>

      <div className="grid gap-8 md:gap-12">
        <LikeButtonStudy />
        <DownloadProgressStudy />
        <ShareMenuStudy />
        <PlaybackControlStudy />
      </div>
    </motion.section>
  );
}

function LikeButtonStudy() {
  const [isLiked, setIsLiked] = useState(false);
  const [count, setCount] = useState(42);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-display text-xl">Like Button Feedback</h3>
        <span className="text-sm text-muted/70">Spring physics • Haptic feedback</span>
      </div>
      
      <div className="bg-card border border-border rounded-lg p-8 flex items-center justify-center">
        <motion.button
          onClick={() => {
            setIsLiked(!isLiked);
            setCount(isLiked ? count - 1 : count + 1);
          }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center space-x-2 group"
          aria-label={isLiked ? "Unlike" : "Like"}
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
              className={`w-6 h-6 transition-all duration-300 ${
                isLiked ? 'fill-accent text-accent' : 'text-muted'
              }`}
            />
            {isLiked && (
              <motion.div
                initial={{ scale: 1 }}
                animate={{ scale: [1, 1.5, 0] }}
                transition={{ duration: 0.6 }}
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
      </div>
      
      <p className="text-sm text-muted/70 leading-relaxed">
        Combines scale feedback with color transition and particle burst. 
        The spring animation creates a satisfying tactile feeling that rewards engagement.
      </p>
    </div>
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
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-display text-xl">Download Progress</h3>
        <span className="text-sm text-muted/70">Morphing states • Progress indication</span>
      </div>
      
      <div className="bg-card border border-border rounded-lg p-8 flex items-center justify-center">
        <motion.button
          onClick={startDownload}
          disabled={isDownloading}
          className="relative overflow-hidden bg-accent/10 border border-accent/20 rounded-lg px-6 py-3 min-w-[160px]"
          whileTap={{ scale: 0.98 }}
          aria-label={isDownloading ? `Downloading ${Math.round(progress)}%` : progress === 100 ? "Download complete" : "Download file"}
        >
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: isDownloading ? `${progress}%` : "0%" }}
            className="absolute left-0 top-0 h-full bg-accent/20 rounded-lg"
          />
          
          <div className="relative flex items-center justify-center space-x-2">
            <Download className="w-4 h-4" />
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
      
      <p className="text-sm text-muted/70 leading-relaxed">
        Button morphs to show download progress with fluid fill animation. 
        State changes feel connected and provide clear feedback about system status.
      </p>
    </div>
  );
}

function ShareMenuStudy() {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { icon: "📧", label: "Email", delay: 0 },
    { icon: "🐦", label: "Twitter", delay: 0.1 },
    { icon: "📋", label: "Copy Link", delay: 0.2 },
    { icon: "💾", label: "Save", delay: 0.3 },
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-display text-xl">Share Menu</h3>
        <span className="text-sm text-muted/70">Staggered reveal • Elastic motion</span>
      </div>
      
      <div className="bg-card border border-border rounded-lg p-8 flex items-center justify-center">
        <div className="relative">
          <motion.button
            onClick={() => setIsOpen(!isOpen)}
            whileTap={{ scale: 0.95 }}
            className="bg-accent/10 border border-accent/20 rounded-full p-3"
            aria-label={isOpen ? "Close share menu" : "Open share menu"}
            aria-expanded={isOpen}
          >
            <Share className="w-5 h-5" />
          </motion.button>
          
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-card border border-border rounded-lg p-2 min-w-[140px]"
            >
              {menuItems.map((item, index) => (
                <motion.button
                  key={item.label}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ 
                    delay: item.delay,
                    type: "spring",
                    stiffness: 400,
                    damping: 25
                  }}
                  className="w-full flex items-center space-x-3 px-3 py-2 text-left hover:bg-muted/50 rounded text-sm"
                >
                  <span>{item.icon}</span>
                  <span>{item.label}</span>
                </motion.button>
              ))}
            </motion.div>
          )}
        </div>
      </div>
      
      <p className="text-sm text-muted/70 leading-relaxed">
        Share menu appears with staggered spring animations. Each item enters 
        with a slight delay, creating rhythm and drawing attention to options.
      </p>
    </div>
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
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-display text-xl">Playback Control</h3>
        <span className="text-sm text-muted/70">Morphing icon • Smooth transitions</span>
      </div>
      
      <div className="bg-card border border-border rounded-lg p-8">
        <div className="flex items-center space-x-4">
          <motion.button
            onClick={() => setIsPlaying(!isPlaying)}
            whileTap={{ scale: 0.95 }}
            className="bg-accent/10 border border-accent/20 rounded-full p-4 relative overflow-hidden"
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
              className={`w-6 h-6 transition-all duration-200 ${
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
            <div className="flex justify-between text-xs text-muted/70">
              <span>{Math.floor(currentTime / 10)}:{(currentTime % 10).toString().padStart(2, '0')}</span>
              <span>{Math.floor(duration / 10)}:{(duration % 10).toString().padStart(2, '0')}</span>
            </div>
          </div>
        </div>
      </div>
      
      <p className="text-sm text-muted/70 leading-relaxed">
        Play button morphs to pause state with layered animations. 
        Progress bar updates smoothly to maintain the feeling of continuous playback.
      </p>
    </div>
  );
}