"use client";

import useSWR from "swr";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

interface SpotifyTrack {
  isPlaying: boolean;
  title: string;
  artist: string;
  album: string;
  albumArt: string;
  songUrl: string;
}

async function fetchNowPlaying(): Promise<SpotifyTrack | null> {
  const res = await fetch("/api/spotify/now-playing");
  if (!res.ok) return null;
  const data = await res.json();
  return data.isPlaying ? data : null;
}

export function NowPlaying() {
  const { data: track, isLoading: loading } = useSWR(
    "spotify-now-playing",
    fetchNowPlaying,
    {
      refreshInterval: 30000, // Poll every 30 seconds
      revalidateOnFocus: false,
    }
  );

  // Don't show anything while loading or if not playing
  if (loading) return null;

  return (
    <AnimatePresence>
      {track && (
        <motion.a
          href={track.songUrl}
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="flex items-center gap-3 p-3 rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--background))]/50 backdrop-blur-sm hover:border-[hsl(var(--accent))]/50 transition-colors group"
        >
          {/* Album art with animation bars */}
          <div className="relative w-10 h-10 rounded overflow-hidden flex-shrink-0">
            {track.albumArt ? (
              <Image
                src={track.albumArt}
                alt={track.album}
                fill
                className="object-cover"
                sizes="40px"
              />
            ) : (
              <div className="w-full h-full bg-[hsl(var(--muted))]" />
            )}
            {/* Playing animation overlay */}
            <div className="absolute inset-0 bg-black/40 flex items-end justify-center gap-0.5 pb-1">
              {[1, 2, 3].map((i) => (
                <motion.div
                  key={i}
                  className="w-0.5 bg-[hsl(var(--accent))] rounded-full"
                  animate={{
                    height: ["4px", "12px", "6px", "10px", "4px"],
                  }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                    delay: i * 0.15,
                    ease: "easeInOut",
                  }}
                />
              ))}
            </div>
          </div>

          {/* Track info */}
          <div className="min-w-0 flex-1">
            <p className="text-xs text-muted-foreground flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
              Now playing
            </p>
            <p className="text-sm font-medium text-foreground truncate group-hover:text-[hsl(var(--accent))] transition-colors">
              {track.title}
            </p>
            <p className="text-xs text-muted-foreground truncate">
              {track.artist}
            </p>
          </div>

          {/* Spotify logo */}
          <svg
            className="w-5 h-5 text-muted-foreground group-hover:text-green-500 transition-colors flex-shrink-0"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
          </svg>
        </motion.a>
      )}
    </AnimatePresence>
  );
}

// Fallback component when Spotify API is not configured
export function NowPlayingFallback() {
  return (
    <div className="flex items-center gap-3 p-3 rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--background))]/50">
      <div className="relative w-10 h-10 rounded overflow-hidden flex-shrink-0 bg-[hsl(var(--muted))] flex items-center justify-center">
        <svg
          className="w-5 h-5 text-muted-foreground"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
        </svg>
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-xs text-muted-foreground">Music</p>
        <p className="text-sm text-muted-foreground italic">Not playing</p>
      </div>
    </div>
  );
}
