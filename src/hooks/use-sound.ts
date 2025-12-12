import { useCallback, useEffect, useRef } from "react";

// Singleton AudioContext to prevent hitting browser limits (especially on iOS)
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

/**
 * Custom React hook to load and play a sound from a given URL using the Web Audio API.
 *
 * This hook fetches the audio file at the specified URL, decodes it, and prepares it for playback.
 * It returns a `play` function that can be called to play the loaded sound.
 *
 * @param url - The URL of the audio file to load and play.
 * @returns A function that, when called, plays the loaded sound.
 *
 * @remarks
 * - If the Web Audio API is not supported in the browser, a warning is logged and playback is disabled.
 * - The audio context and buffer are managed internally using a singleton context.
 * - Errors during fetching or decoding the audio are logged to the console.
 *
 * @example
 * ```tsx
 * const playClick = useSound('/sounds/click.mp3');
 * // Later in an event handler:
 * playClick();
 * ```
 */
export function useSound(url: string) {
  const bufferRef = useRef<AudioBuffer | null>(null);

  useEffect(() => {
    const audioCtx = getAudioContext();

    if (!audioCtx) {
      console.warn("Web Audio API is not supported in this browser.");
      return;
    }

    fetch(url)
      .then((res) => res.arrayBuffer())
      .then((data) => audioCtx.decodeAudioData(data))
      .then((decoded) => {
        bufferRef.current = decoded;
      })
      .catch((err) => {
        console.error(`Failed to load sound from ${url}:`, err);
      });
  }, [url]);

  const play = useCallback(() => {
    const audioCtx = getAudioContext();
    if (audioCtx && bufferRef.current) {
      if (audioCtx.state === "suspended") {
        audioCtx.resume();
      }
      const source = audioCtx.createBufferSource();
      source.buffer = bufferRef.current;
      source.connect(audioCtx.destination);
      source.start(0);
    }
  }, []);

  return play;
}
