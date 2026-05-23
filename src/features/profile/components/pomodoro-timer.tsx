"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";

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
  const progressBarRef = useRef<HTMLDivElement>(null);

  const progress =
    remaining / (mode === "focus" ? customFocus * 60 : PRESETS.shortBreak);

  useLayoutEffect(() => {
    if (progressBarRef.current) {
      progressBarRef.current.style.width = `${progress * 100}%`;
    }
  }, [progress]);

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

  return (
    <Panel id="pomodoro">
      <PanelHeader>
        <div className="flex items-center justify-between">
          <PanelTitle>Pomodoro Timer</PanelTitle>

          {/* Mode toggle — matches TechStack Icons/Category pill */}
          <div className="flex items-center gap-0.5 rounded-full border border-border/25 bg-background/70 p-0.5 shadow-sm backdrop-blur-sm dark:bg-card/60">
            <button
              type="button"
              onClick={() => switchMode("focus")}
              className={cn(
                "rounded-full px-3.5 py-1 font-mono text-[10px] tracking-normal uppercase transition-all duration-300",
                mode === "focus"
                  ? "bg-foreground text-background shadow-md"
                  : "text-muted-foreground/50 hover:bg-foreground/[0.04] hover:text-muted-foreground"
              )}
            >
              {customFocus}m
            </button>
            <button
              type="button"
              onClick={() => switchMode("shortBreak")}
              className={cn(
                "rounded-full px-3.5 py-1 font-mono text-[10px] tracking-normal uppercase transition-all duration-300",
                mode === "shortBreak"
                  ? "bg-foreground text-background shadow-md"
                  : "text-muted-foreground/50 hover:bg-foreground/[0.04] hover:text-muted-foreground"
              )}
            >
              5m
            </button>
          </div>
        </div>
      </PanelHeader>

      <PanelContent>
        <div className="flex flex-col gap-8">
          {/* Flavour text — matches About body style */}
          <p className="max-w-[58ch] text-[13.5px] leading-[1.8] text-foreground/55">
            You&apos;ve reached the end — or have you? Before you vanish into
            the digital void, here&apos;s a quick timer to help you focus on
            your next big thing{" "}
            <span className="text-foreground/35">
              (or just to remind you to stop doomscrolling).
            </span>
          </p>

          {/* Adjust row — inline, no card */}
          {adjusting && (
            <div className="flex items-center gap-3">
              <span className="font-mono text-[10px] tracking-[0.14em] text-foreground/35 uppercase">
                Focus
              </span>
              <div className="h-px w-8 bg-border/40" />
              <input
                type="number"
                aria-label="Focus duration in minutes"
                min={1}
                max={120}
                value={customFocus}
                onChange={(e) => {
                  const v = Math.max(1, Math.min(120, Number(e.target.value)));
                  setCustomFocus(v);
                  if (mode === "focus") {
                    setRunning(false);
                    setRemaining(v * 60);
                  }
                }}
                className="w-12 border-b border-border/40 bg-transparent pb-0.5 text-center font-mono text-sm text-foreground/70 tabular-nums focus:border-foreground/30 focus:outline-none"
              />
              <span className="font-mono text-[10px] text-foreground/35">
                min
              </span>
            </div>
          )}

          {/* Timer row — open layout, no card wrapper */}
          <div className="flex items-center justify-between gap-6">
            {/* Left: clock + label + progress */}
            <div className="flex flex-col gap-1.5">
              <div
                className="font-mono text-5xl font-bold tracking-tight text-foreground tabular-nums sm:text-6xl"
                aria-live="polite"
                aria-label={`${formatTime(remaining)} remaining`}
              >
                {formatTime(remaining)}
              </div>
              <div className="flex items-center gap-3">
                <span className="font-mono text-[9px] tracking-[0.18em] text-foreground/35 uppercase">
                  {mode === "focus" ? "Focus Session" : "Short Break"}
                </span>
                <div className="h-px w-20 overflow-hidden bg-foreground/10">
                  <div
                    ref={progressBarRef}
                    className={cn(
                      "h-full transition-all duration-1000",
                      mode === "focus"
                        ? "bg-foreground/50"
                        : "bg-emerald-500/60"
                    )}
                  />
                </div>
              </div>
            </div>

            {/* Right: controls */}
            <div className="flex items-center gap-2.5">
              {/* Adjust toggle */}
              <button
                type="button"
                onClick={() => setAdjusting((v) => !v)}
                className={cn(
                  "font-mono text-[9px] tracking-[0.12em] uppercase transition-colors",
                  adjusting
                    ? "text-foreground/55"
                    : "text-foreground/28 hover:text-foreground/50"
                )}
              >
                {adjusting ? "Done" : "Adjust"}
              </button>

              {/* Play / Pause */}
              <button
                type="button"
                onClick={() => setRunning((v) => !v)}
                aria-label={running ? "Pause timer" : "Start timer"}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-foreground text-background transition-opacity hover:opacity-75"
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
                type="button"
                onClick={reset}
                aria-label="Reset timer"
                className="flex h-8 w-8 items-center justify-center text-foreground/28 transition-colors hover:text-foreground/55"
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
      </PanelContent>
    </Panel>
  );
}
