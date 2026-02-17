"use client";

import { motion } from "motion/react";
import Image from "next/image";
import { useEffect, useState } from "react";

import type { LanyardData } from "@/hooks/use-lanyard";

import { SpotifyLogo } from "./spotify-logo";

interface SpotifyCardProps {
  spotify: NonNullable<LanyardData["spotify"]>;
  status: LanyardData["discord_status"];
}

export function SpotifyCard({ spotify, status }: SpotifyCardProps) {
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  useEffect(() => {
    const updateProgress = () => {
      const now = Date.now();
      const elapsed = now - spotify.timestamps.start;
      const duration = spotify.timestamps.end - spotify.timestamps.start;
      const progressPercent = Math.min((elapsed / duration) * 100, 100);

      setProgress(progressPercent);
      setCurrentTime(elapsed);
    };

    updateProgress();
    const interval = setInterval(updateProgress, 1000);

    return () => clearInterval(interval);
  }, [spotify.timestamps]);

  const formatTime = (ms: number) => {
    const seconds = Math.floor(ms / 1000);
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const duration = spotify.timestamps.end - spotify.timestamps.start;
  const progressWidth = Math.min(progress, 100);

  return (
    <motion.div
      whileHover={{ y: -4, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 400, damping: 20 }}
      className="group relative overflow-hidden rounded-lg border border-zinc-200 bg-zinc-100/80 grayscale transition-all duration-500 hover:border-accent/50 hover:shadow-md hover:grayscale-0 dark:border-border/25 dark:bg-card/40 dark:grayscale-0"
    >
      {/* Spotify-green animated shimmer */}
      <motion.div
        className="pointer-events-none absolute inset-0 -translate-x-full"
        animate={{ translateX: ["-100%", "200%"] }}
        transition={{
          duration: 3,
          repeat: Infinity,
          repeatDelay: 4,
          ease: "easeInOut",
        }}
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, rgba(29,185,84,0.08) 50%, transparent 100%)",
        }}
      />
      <div className="flex gap-3 p-3">
        {/* Album Art */}
        <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-md ring-1 ring-edge">
          <Image
            src={spotify.album_art_url || "/placeholder-album.png"}
            alt={spotify.album}
            fill
            className="object-cover transition-transform group-hover:scale-105"
            unoptimized
          />
        </div>

        {/* Track Info */}
        <div className="flex min-w-0 flex-1 flex-col justify-center">
          <div className="flex items-center gap-2">
            {/* Online status indicator */}
            <span
              className={`h-2 w-2 rounded-full ${
                status === "online"
                  ? "bg-green-500"
                  : status === "idle"
                    ? "bg-yellow-500"
                    : status === "dnd"
                      ? "bg-red-500"
                      : "bg-gray-500"
              }`}
            />
            <span
              className={`text-xs font-medium ${
                status === "online"
                  ? "text-green-600 dark:text-green-500"
                  : status === "idle"
                    ? "text-yellow-600 dark:text-yellow-500"
                    : status === "dnd"
                      ? "text-red-600 dark:text-red-500"
                      : "text-gray-600 dark:text-gray-500"
              }`}
            >
              {status === "online"
                ? "Online"
                : status === "idle"
                  ? "Idle"
                  : status === "dnd"
                    ? "Do Not Disturb"
                    : "Offline"}
            </span>
            <span className="text-xs text-muted-foreground">•</span>
            <SpotifyLogo className="h-3.5 w-3.5 text-[#1DB954]" />
            <span className="text-xs font-medium text-[#1DB954]">
              Listening to Spotify
            </span>
          </div>

          <h3 className="mt-0.5 truncate font-semibold text-foreground">
            {spotify.song}
          </h3>

          <p className="truncate text-sm text-muted-foreground">
            {spotify.artist}
          </p>

          {/* Progress Bar */}
          <div className="mt-2 space-y-1">
            <div className="relative h-1 w-full overflow-hidden rounded-full bg-muted/50">
              <ProgressBar width={progressWidth} />
            </div>
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration)}</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function ProgressBar({ width }: { width: number }) {
  return (
    <div
      className="absolute top-0 left-0 h-full bg-[#1DB954] transition-all duration-1000"
      style={{ width: `${width}%` }}
    />
  );
}
