"use client";

import { useCallback, useEffect, useRef } from "react";

// Singleton AudioContext to prevent hitting browser limits
let globalAudioCtx: AudioContext | null = null;

function getAudioContext() {
  if (!globalAudioCtx) {
    const AudioContextClass =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext })
        .webkitAudioContext;

    if (AudioContextClass) {
      globalAudioCtx = new AudioContextClass();
    }
  }
  return globalAudioCtx;
}

// Shared buffer cache to avoid re-fetching the same audio
const bufferCache = new Map<string, AudioBuffer>();

/**
 * Custom React hook for hover sound effects.
 * Returns event handlers to attach to elements for hover sounds.
 *
 * @param options - Configuration options
 * @returns Object with onMouseEnter handler and a manual play function
 *
 * @example
 * ```tsx
 * const { onMouseEnter } = useHoverSound();
 * <button onMouseEnter={onMouseEnter}>Hover me</button>
 * ```
 */
export function useHoverSound(
  options: {
    soundUrl?: string;
    volume?: number;
    enabled?: boolean;
  } = {}
) {
  const {
    soundUrl = "/audio/ui-sounds/click.wav",
    volume = 0.15,
    enabled = true,
  } = options;

  const bufferRef = useRef<AudioBuffer | null>(null);
  const lastPlayedRef = useRef<number>(0);

  useEffect(() => {
    if (!enabled) return;

    const audioCtx = getAudioContext();
    if (!audioCtx) return;

    // Check cache first
    const cached = bufferCache.get(soundUrl);
    if (cached) {
      bufferRef.current = cached;
      return;
    }

    // Fetch and decode the audio
    fetch(soundUrl)
      .then((res) => res.arrayBuffer())
      .then((data) => audioCtx.decodeAudioData(data))
      .then((decoded) => {
        bufferRef.current = decoded;
        bufferCache.set(soundUrl, decoded);
      })
      .catch((err) => {
        console.error(`Failed to load hover sound from ${soundUrl}:`, err);
      });
  }, [soundUrl, enabled]);

  const playSound = useCallback(() => {
    if (!enabled) return;

    const audioCtx = getAudioContext();
    if (!audioCtx || !bufferRef.current) return;

    // Throttle: don't play more than once every 50ms
    const now = Date.now();
    if (now - lastPlayedRef.current < 50) return;
    lastPlayedRef.current = now;

    // Resume audio context if suspended
    if (audioCtx.state === "suspended") {
      audioCtx.resume();
    }

    const source = audioCtx.createBufferSource();
    const gainNode = audioCtx.createGain();

    source.buffer = bufferRef.current;
    gainNode.gain.value = volume;

    source.connect(gainNode);
    gainNode.connect(audioCtx.destination);
    source.start(0);
  }, [enabled, volume]);

  const onMouseEnter = useCallback(() => {
    playSound();
  }, [playSound]);

  return { onMouseEnter, playSound };
}
