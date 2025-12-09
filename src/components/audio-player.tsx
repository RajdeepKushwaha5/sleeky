"use client";

import { PauseIcon, PlayIcon } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import React, { useCallback, useEffect, useRef, useState } from "react";

import { useSound } from "@/hooks/use-sound";

import { Button } from "./ui/button";

// Audio file path - Interstellar Chase 2 (calm ambient)
const AUDIO_SRC = "/audio/interstellar_chase_2.mp3";

export function AudioPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const playClick = useSound("/audio/ui-sounds/click.wav");

  // Initialize audio element
  useEffect(() => {
    const audio = new Audio(AUDIO_SRC);
    audio.loop = true;
    audio.volume = 0.3; // Calm, ambient volume
    audio.preload = "metadata";

    audio.addEventListener("canplaythrough", () => {
      setIsLoaded(true);
    });

    audio.addEventListener("ended", () => {
      setIsPlaying(false);
    });

    audioRef.current = audio;

    return () => {
      audio.pause();
      audio.src = "";
    };
  }, []);

  const togglePlay = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;

    playClick();

    if (isPlaying) {
      // Smooth fade out
      const fadeOut = setInterval(() => {
        if (audio.volume > 0.05) {
          audio.volume = Math.max(0, audio.volume - 0.05);
        } else {
          clearInterval(fadeOut);
          audio.pause();
          audio.volume = 0.3;
        }
      }, 50);
      setIsPlaying(false);
    } else {
      audio.volume = 0;
      audio.play().catch(() => {
        // Autoplay might be blocked
        console.log("Audio playback requires user interaction");
      });
      // Smooth fade in
      const fadeIn = setInterval(() => {
        if (audio.volume < 0.25) {
          audio.volume = Math.min(0.3, audio.volume + 0.05);
        } else {
          clearInterval(fadeIn);
          audio.volume = 0.3;
        }
      }, 50);
      setIsPlaying(true);
    }
  }, [isPlaying, playClick]);

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={togglePlay}
      disabled={!isLoaded}
      className="relative overflow-hidden"
      aria-label={isPlaying ? "Pause ambient music" : "Play ambient music"}
    >
      <AnimatePresence mode="wait" initial={false}>
        {isPlaying ? (
          <motion.div
            key="pause"
            initial={{ scale: 0, rotate: -90, opacity: 0 }}
            animate={{ scale: 1, rotate: 0, opacity: 1 }}
            exit={{ scale: 0, rotate: 90, opacity: 0 }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 20,
              duration: 0.3,
            }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <PauseIcon className="h-4 w-4" />
          </motion.div>
        ) : (
          <motion.div
            key="play"
            initial={{ scale: 0, rotate: 90, opacity: 0 }}
            animate={{ scale: 1, rotate: 0, opacity: 1 }}
            exit={{ scale: 0, rotate: -90, opacity: 0 }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 20,
              duration: 0.3,
            }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <PlayIcon className="h-4 w-4" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Subtle pulsing ring when playing */}
      {isPlaying && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: [0.3, 0.1, 0.3], scale: [1, 1.15, 1] }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="pointer-events-none absolute inset-0 rounded-md border border-foreground/20"
        />
      )}

      <span className="sr-only">
        {isPlaying ? "Pause" : "Play"} Chris Cornell - Seasons
      </span>
    </Button>
  );
}
