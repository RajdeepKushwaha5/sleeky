"use client";

import { useEffect, useState } from "react";

import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { SimpleTooltip } from "@/components/ui/tooltip";
import { USER } from "@/features/profile/data/user";
import { cn } from "@/lib/utils";
import { FlipSentences } from "@/registry/flip-sentences";

import { ProfileStatusTooltip } from "./profile-status-tooltip";
import { VerifiedIcon } from "./verified-icon";

const AURA_KEY = "portfolio-aura";

function useISTClock() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const update = () => {
      const now = new Date();
      const ist = new Intl.DateTimeFormat("en-IN", {
        timeZone: "Asia/Kolkata",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      }).format(now);
      setTime(ist);
    };
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);

  return time;
}

function useAura() {
  const [auraOn, setAuraOn] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(AURA_KEY);
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setAuraOn(saved !== "off");
    setMounted(true);
  }, []);

  // Sync DOM class on mount or change
  useEffect(() => {
    if (!mounted) return;
    if (auraOn) {
      document.documentElement.classList.remove("no-aura");
    } else {
      document.documentElement.classList.add("no-aura");
    }
  }, [auraOn, mounted]);

  const toggle = () => {
    setAuraOn((prev) => {
      const next = !prev;
      if (next) {
        localStorage.setItem(AURA_KEY, "on");
      } else {
        localStorage.setItem(AURA_KEY, "off");
      }
      return next;
    });
  };

  return { auraOn, toggle, mounted };
}

export function ProfileHeader() {
  const istTime = useISTClock();
  const { auraOn, toggle, mounted } = useAura();
  const [clicked, setClicked] = useState(false);
  const [burstKey, setBurstKey] = useState(0);

  const effectiveAura = !mounted || auraOn;

  const handleAvatarClick = () => {
    toggle();
    setClicked(true);
    setBurstKey((k) => k + 1);
    setTimeout(() => setClicked(false), 300);
  };

  return (
    <div className="relative mx-2 my-6 flex flex-col items-center overflow-hidden rounded-2xl border border-border/20 bg-card/40 p-6 text-center backdrop-blur-sm sm:flex-row sm:p-8 sm:text-left">
      {/* Subtle gradient decoration */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-foreground/[0.008] via-transparent to-foreground/[0.012]" />

      {/* Avatar with Aura Toggle */}
      <div className="relative shrink-0 pb-5 sm:pr-8 sm:pb-0">
        <button
          onClick={handleAvatarClick}
          aria-label={effectiveAura ? "Disable aura" : "Enable aura"}
          aria-pressed={effectiveAura}
          className="group relative flex aspect-square items-center justify-center rounded-full outline-none focus:outline-none focus-visible:outline-none"
        >
          {/* Layer 4 — Outer bloom (soft diffuse glow) */}
          <span
            className={cn(
              "pointer-events-none absolute inset-[-24px] aspect-square rounded-full transition-all duration-700",
              "bg-[radial-gradient(circle,var(--aura-color-1)_0%,var(--aura-color-2)_40%,transparent_70%)]",
              "blur-2xl",
              effectiveAura ? "animate-aura-bloom" : "scale-90 opacity-0"
            )}
            style={{ opacity: effectiveAura ? "var(--aura-opacity)" : 0 }}
          />

          {/* Layer 3 — Rotating ring (SVG for guaranteed circle) */}
          {effectiveAura && (
            <svg
              className={cn(
                "pointer-events-none absolute inset-[-10px] z-[1] animate-[spin_8s_linear_infinite] transition-all duration-1000",
                effectiveAura ? "scale-100" : "scale-90 opacity-0"
              )}
              viewBox="0 0 100 100"
              fill="none"
              style={{ opacity: "var(--aura-opacity)" }}
            >
              <defs>
                <linearGradient
                  id="aura-ring-grad"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="100%"
                >
                  <stop
                    offset="0%"
                    stopColor="var(--aura-color-1)"
                    stopOpacity="0.8"
                  />
                  <stop
                    offset="40%"
                    stopColor="var(--aura-color-2)"
                    stopOpacity="0.5"
                  />
                  <stop
                    offset="70%"
                    stopColor="var(--aura-color-3)"
                    stopOpacity="0.3"
                  />
                  <stop
                    offset="100%"
                    stopColor="var(--aura-color-1)"
                    stopOpacity="0"
                  />
                </linearGradient>
              </defs>
              <circle
                cx="50"
                cy="50"
                r="46"
                stroke="url(#aura-ring-grad)"
                strokeWidth="3"
                strokeLinecap="round"
                strokeDasharray="120 170"
                filter="blur(2px)"
              />
            </svg>
          )}

          {/* Layer 2 — Inner ring pulse */}
          <span
            className={cn(
              "pointer-events-none absolute inset-[-1px] aspect-square rounded-full transition-all duration-500",
              effectiveAura
                ? "animate-aura-ring-pulse ring-2 ring-[var(--aura-color-1)]/60 ring-offset-1 ring-offset-background"
                : "opacity-0 ring-0"
            )}
          />

          {/* Orbiting particles */}
          {effectiveAura && (
            <>
              <span
                className="animate-aura-orbit pointer-events-none absolute inset-0 z-[1]"
                style={{ top: "50%", left: "50%", width: 0, height: 0 }}
              >
                <span
                  className="absolute size-2 rounded-full blur-[2px]"
                  style={{
                    background: "var(--aura-particle)",
                    boxShadow: "0 0 6px 2px var(--aura-particle)",
                    top: "-3px",
                    left: "-3px",
                  }}
                />
              </span>
              <span
                className="animate-aura-orbit-reverse pointer-events-none absolute inset-0 z-[1]"
                style={{ top: "50%", left: "50%", width: 0, height: 0 }}
              >
                <span
                  className="absolute size-1.5 rounded-full blur-[1px]"
                  style={{
                    background: "var(--aura-color-2)",
                    boxShadow: "0 0 4px 1px var(--aura-color-2)",
                    top: "-2px",
                    left: "-2px",
                  }}
                />
              </span>
            </>
          )}

          {/* Click burst ring */}
          <span
            key={burstKey}
            className={cn(
              "pointer-events-none absolute inset-0 z-[3] aspect-square rounded-full",
              "ring-2 ring-[var(--aura-color-1)]/70",
              burstKey > 0 ? "animate-aura-click-burst" : "opacity-0"
            )}
          />

          {/* Wisps — faint tendrils drifting upward */}
          {effectiveAura && (
            <>
              <span
                className="animate-aura-wisp pointer-events-none absolute top-0 left-1/3 z-[1] h-8 w-[2px] rounded-full opacity-0"
                style={{
                  background:
                    "linear-gradient(to top, var(--aura-color-1), transparent)",
                }}
              />
              <span
                className="animate-aura-wisp-delayed pointer-events-none absolute top-0 right-1/3 z-[1] h-6 w-[2px] rounded-full opacity-0"
                style={{
                  background:
                    "linear-gradient(to top, var(--aura-color-2), transparent)",
                }}
              />
            </>
          )}

          <HoverCard openDelay={100} closeDelay={100}>
            <HoverCardTrigger asChild>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                className={cn(
                  "relative z-[2] size-28 cursor-pointer rounded-full bg-zinc-800 ring-offset-background grayscale transition-all duration-300 select-none sm:size-36 dark:bg-zinc-900 dark:grayscale-0 dark:hover:grayscale-0",
                  "hover:grayscale-[50%]",
                  clicked ? "scale-95" : "scale-100",
                  effectiveAura && "animate-aura-breath hover:scale-[1.05]"
                )}
                alt={`${USER.displayName}'s avatar`}
                src={USER.avatar}
                style={
                  effectiveAura
                    ? { boxShadow: "0 0 20px 4px var(--aura-ring)" }
                    : undefined
                }
                fetchPriority="high"
              />
            </HoverCardTrigger>
            <HoverCardContent side="right" align="start" className="w-auto p-0">
              <ProfileStatusTooltip />
            </HoverCardContent>
          </HoverCard>
        </button>

        {/* Aura status label */}
        <p
          className={cn(
            "absolute -bottom-1 left-1/2 -translate-x-1/2 font-mono text-[9px] tracking-widest whitespace-nowrap uppercase transition-all duration-500",
            effectiveAura
              ? "translate-y-0 text-[var(--aura-color-1)] opacity-60"
              : "pointer-events-none translate-y-1 opacity-0"
          )}
        >
          ✦ aura
        </p>
      </div>

      {/* Info */}
      <div className="relative flex flex-1 flex-col items-center justify-center sm:items-start">
        {/* Specialty */}
        <div className="mb-3 inline-flex items-center rounded-full border border-border/25 bg-muted/30 px-3 py-1 text-[10px] font-medium tracking-[0.1em] text-muted-foreground uppercase">
          Web Dev &bull; AI &bull; dApps &amp; Blockchain
        </div>

        {/* Name */}
        <h1 className="mb-2 flex flex-wrap items-center justify-center gap-2.5 font-serif text-2xl leading-tight text-foreground/95 italic sm:justify-start sm:text-[2.5rem]">
          {USER.displayName}
          <SimpleTooltip content="Verified">
            <VerifiedIcon className="size-[0.45em] translate-y-px text-info select-none" />
          </SimpleTooltip>
        </h1>

        {/* Dictionary metadata row */}
        <div className="mb-3 flex flex-wrap items-center justify-center gap-x-2 gap-y-1 font-mono text-[11px] text-muted-foreground/50 sm:justify-start">
          <span className="italic">/rɑːdʒdiːp sɪŋ/</span>
          <span className="text-muted-foreground/30">•</span>
          <span>noun</span>
          <span className="text-muted-foreground/30">•</span>
          {istTime && <span className="tabular-nums">{istTime} IST</span>}
        </div>

        {/* Flip sentences */}
        <div className="font-light text-muted-foreground/80">
          <FlipSentences sentences={USER.flipSentences} />
        </div>
      </div>
    </div>
  );
}
