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
  const [hasInteracted, setHasInteracted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const playClick = useSound("/audio/ui-sounds/click.wav");

  // Initialize audio element with iOS-compatible settings
  useEffect(() => {
    const audio = new Audio();

    // iOS-specific attributes
    audio.setAttribute("playsinline", "true");
    audio.setAttribute("webkit-playsinline", "true");

    audio.src = AUDIO_SRC;
    audio.loop = true;
    audio.volume = 0.3;
    audio.preload = "auto"; // Use 'auto' for better iOS compatibility

    audio.addEventListener("canplaythrough", () => {
      setIsLoaded(true);
    });

    audio.addEventListener("error", () => {
      // Suppress audio errors - format issues are non-critical
      // Background music is optional enhancement
      setIsLoaded(false);
    });

    audio.addEventListener("ended", () => {
      setIsPlaying(false);
    });

    audioRef.current = audio;

    // Try to load the audio
    audio.load();

    return () => {
      audio.pause();
      audio.src = "";
    };
  }, []);

  const togglePlay = useCallback(async () => {
    const audio = audioRef.current;
    if (!audio) return;

    // Try to play click sound, but don't let it block music
    try {
      playClick();
    } catch {
      // Ignore click sound errors
    }

    if (isPlaying) {
      // Pause the audio
      audio.pause();
      setIsPlaying(false);
    } else {
      // iOS workaround: reload and play in the same user gesture
      try {
        // Reset the audio for iOS
        audio.currentTime = 0;
        audio.volume = 0.3;

        // For iOS, we need to call load() then play() in the same gesture
        if (!hasInteracted) {
          audio.load();
          setHasInteracted(true);
        }

        // Attempt to play - this must happen within the user gesture
        await audio.play();
        setIsPlaying(true);
      } catch {
        // Audio playback failed - likely user hasn't interacted yet or format issue

        // Fallback: try muted start, then unmute
        try {
          audio.muted = true;
          await audio.play();
          audio.muted = false;
          setIsPlaying(true);
        } catch {
          // Fallback also failed - audio is non-critical
          setIsPlaying(false);
        }
      }
    }
  }, [isPlaying, hasInteracted, playClick]);

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
        {isPlaying ? "Pause" : "Play"} ambient music
      </span>
    </Button>
  );
}
