"use client";

import { useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";

import { Panel, PanelContent, PanelHeader, PanelTitle } from "./panel";

const PRESETS = { focus: 25 * 60, shortBreak: 5 * 60 } as const;

function formatTime(seconds: number) {
  const m = Math.floor(seconds / 60)
    .toString()
    .padStart(2, "0");
  const s = (seconds % 60).toString().padStart(2, "0");
  return `${m}:${s}`;
}

export function PomodoroTimer() {
  const [mode, setMode] = useState<"focus" | "shortBreak">("focus");
  const [remaining, setRemaining] = useState(PRESETS.focus);
  const [running, setRunning] = useState(false);
  const [adjusting, setAdjusting] = useState(false);
  const [customFocus, setCustomFocus] = useState(25);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Tick
  useEffect(() => {
    if (!running) return;
    intervalRef.current = setInterval(() => {
      setRemaining((prev) => {
        if (prev <= 1) {
          setRunning(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(intervalRef.current!);
  }, [running]);

  const switchMode = (next: "focus" | "shortBreak") => {
    setRunning(false);
    setMode(next);
    setRemaining(next === "focus" ? customFocus * 60 : PRESETS.shortBreak);
  };

  const reset = () => {
    setRunning(false);
    setRemaining(mode === "focus" ? customFocus * 60 : PRESETS.shortBreak);
  };

  const progress =
    remaining / (mode === "focus" ? customFocus * 60 : PRESETS.shortBreak);

  return (
    <Panel id="pomodoro">
      <PanelHeader>
        <div className="flex items-start justify-between">
          <PanelTitle>Pomodoro Timer</PanelTitle>
          <button
            onClick={() => setAdjusting((v) => !v)}
            className="mt-1 font-mono text-[10px] tracking-[0.12em] text-muted-foreground/50 uppercase transition-colors hover:text-muted-foreground"
          >
            {adjusting ? "Done" : "Adjust Time"}
          </button>
        </div>
      </PanelHeader>

      <PanelContent>
        <div className="flex flex-col gap-5">
          {/* Flavour text */}
          <p className="font-serif text-sm leading-relaxed text-muted-foreground/60 italic sm:text-base">
            You&apos;ve reached the end! Or have you? Before you vanish into the
            digital void, I&apos;ve got a quick Pomodoro Timer to help you focus
            better on your next big thing{" "}
            <span className="not-italic">
              (or just to remind you to stop doomscrolling).
            </span>
          </p>

          {/* Timer card */}
          <div className="rounded-2xl border border-border/30 bg-card/60 p-5 backdrop-blur-sm">
            {/* Adjust panel */}
            {adjusting && (
              <div className="mb-4 flex items-center gap-3 rounded-xl border border-border/20 bg-muted/30 p-3">
                <span className="text-xs text-muted-foreground/60">
                  Focus (min):
                </span>
                <input
                  type="number"
                  min={1}
                  max={120}
                  value={customFocus}
                  onChange={(e) => {
                    const v = Math.max(
                      1,
                      Math.min(120, Number(e.target.value))
                    );
                    setCustomFocus(v);
                    if (mode === "focus") {
                      setRunning(false);
                      setRemaining(v * 60);
                    }
                  }}
                  className="w-16 rounded-lg border border-border/30 bg-background px-2 py-1 text-center text-sm tabular-nums focus:ring-1 focus:ring-foreground/20 focus:outline-none"
                />
              </div>
            )}

            <div className="flex items-center gap-6 sm:gap-8">
              {/* Clock */}
              <div className="flex flex-col gap-1">
                <div
                  className="font-mono text-4xl font-bold tracking-tight text-foreground tabular-nums sm:text-5xl"
                  aria-live="polite"
                  aria-label={`${formatTime(remaining)} remaining`}
                >
                  {formatTime(remaining)}
                </div>
                <div className="font-mono text-[9px] tracking-[0.18em] text-muted-foreground/50 uppercase">
                  {mode === "focus" ? "Focus Session" : "Short Break"}
                </div>
                {/* Progress bar */}
                <div className="mt-2 h-0.5 w-24 overflow-hidden rounded-full bg-border/30">
                  <div
                    className={cn(
                      "h-full rounded-full transition-all duration-1000",
                      mode === "focus"
                        ? "bg-foreground/60"
                        : "bg-emerald-500/60"
                    )}
                    style={{ width: `${progress * 100}%` }}
                  />
                </div>
              </div>

              {/* Controls */}
              <div className="ml-auto flex items-center gap-2">
                {/* Preset buttons */}
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => switchMode("focus")}
                    className={cn(
                      "rounded-full px-3 py-1.5 font-mono text-xs tracking-wide transition-all",
                      mode === "focus"
                        ? "bg-foreground text-background"
                        : "border border-border/40 text-muted-foreground hover:border-border/60 hover:text-foreground/80"
                    )}
                  >
                    {customFocus}m
                  </button>
                  <button
                    onClick={() => switchMode("shortBreak")}
                    className={cn(
                      "rounded-full px-3 py-1.5 font-mono text-xs tracking-wide transition-all",
                      mode === "shortBreak"
                        ? "bg-foreground text-background"
                        : "border border-border/40 text-muted-foreground hover:border-border/60 hover:text-foreground/80"
                    )}
                  >
                    5m
                  </button>
                </div>

                {/* Play / Pause */}
                <button
                  onClick={() => setRunning((v) => !v)}
                  aria-label={running ? "Pause timer" : "Start timer"}
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-foreground text-background transition-opacity hover:opacity-80"
                >
                  {running ? (
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 14 14"
                      fill="currentColor"
                    >
                      <rect x="2" y="2" width="3.5" height="10" rx="1" />
                      <rect x="8.5" y="2" width="3.5" height="10" rx="1" />
                    </svg>
                  ) : (
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 14 14"
                      fill="currentColor"
                    >
                      <path d="M3 2.5l9 4.5-9 4.5z" />
                    </svg>
                  )}
                </button>

                {/* Reset */}
                <button
                  onClick={reset}
                  aria-label="Reset timer"
                  className="flex h-8 w-8 items-center justify-center rounded-full border border-border/40 text-muted-foreground/60 transition-all hover:border-border/60 hover:text-foreground/80"
                >
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 12 12"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M1.5 6A4.5 4.5 0 106 1.5H3.5" />
                    <path d="M3.5 3.5V1.5H1.5" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </PanelContent>
    </Panel>
  );
}
