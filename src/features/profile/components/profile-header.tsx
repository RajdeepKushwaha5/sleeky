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
  const [auraOn, setAuraOn] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem(AURA_KEY) !== "off";
    }
    return true;
  });

  // Sync DOM class on mount or change
  useEffect(() => {
    if (auraOn) {
      document.documentElement.classList.remove("no-aura");
    } else {
      document.documentElement.classList.add("no-aura");
    }
  }, [auraOn]);

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

  return { auraOn, toggle };
}

export function ProfileHeader() {
  const istTime = useISTClock();
  const { auraOn, toggle } = useAura();
  const [clicked, setClicked] = useState(false);

  const handleAvatarClick = () => {
    toggle();
    // Brief scale-down click feedback
    setClicked(true);
    setTimeout(() => setClicked(false), 300);
  };

  return (
    <div className="relative mx-2 my-6 flex flex-col items-center overflow-hidden rounded-2xl border border-border/20 bg-card/40 p-6 text-center backdrop-blur-sm sm:flex-row sm:p-8 sm:text-left">
      {/* Subtle gradient decoration */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-foreground/[0.008] via-transparent to-foreground/[0.012]" />

      {/* Avatar with Aura Toggle */}
      <div className="relative shrink-0 pb-5 sm:pr-8 sm:pb-0">
        {/* Outer glow layers — only visible when aura is ON */}
        <button
          onClick={handleAvatarClick}
          aria-label={auraOn ? "Disable aura" : "Enable aura"}
          aria-pressed={auraOn}
          className="group relative flex items-center justify-center rounded-full focus:outline-none"
        >
          {/* Ring 3 — outermost faint pulse */}
          <span
            className={cn(
              "pointer-events-none absolute rounded-full transition-all duration-700",
              auraOn
                ? "inset-[-14px] scale-100 animate-[aura-pulse_3s_ease-in-out_infinite] bg-indigo-400/[0.07] opacity-100 dark:bg-emerald-400/[0.07]"
                : "inset-0 scale-90 opacity-0"
            )}
          />
          {/* Ring 2 — medium glow */}
          <span
            className={cn(
              "pointer-events-none absolute rounded-full blur-md transition-all duration-500",
              auraOn
                ? "inset-[-8px] scale-100 bg-indigo-400/20 opacity-100 dark:bg-emerald-400/20"
                : "inset-0 scale-90 opacity-0"
            )}
          />
          {/* Ring 1 — tight glowing border */}
          <span
            className={cn(
              "pointer-events-none absolute inset-0 rounded-full transition-all duration-400",
              auraOn
                ? "ring-2 ring-indigo-400/50 ring-offset-2 ring-offset-background dark:ring-emerald-400/50"
                : "ring-0"
            )}
          />

          <HoverCard openDelay={100} closeDelay={100}>
            <HoverCardTrigger asChild>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                className={cn(
                  "size-28 cursor-pointer rounded-full bg-zinc-800 ring-offset-background grayscale transition-all duration-300 select-none sm:size-36 dark:bg-zinc-900 dark:grayscale-0 dark:hover:grayscale-0",
                  "hover:grayscale-[50%]",
                  clicked ? "scale-95" : "scale-100",
                  auraOn && "hover:scale-[1.03]"
                )}
                alt={`${USER.displayName}'s avatar`}
                src={USER.avatar}
                fetchPriority="high"
              />
            </HoverCardTrigger>
            <HoverCardContent side="right" align="start" className="w-auto p-0">
              <ProfileStatusTooltip />
            </HoverCardContent>
          </HoverCard>
        </button>

        {/* Tiny aura status label */}
        <p
          className={cn(
            "absolute -bottom-1 left-1/2 -translate-x-1/2 font-mono text-[9px] tracking-widest whitespace-nowrap uppercase transition-all duration-500",
            auraOn
              ? "translate-y-0 text-indigo-500 opacity-60 dark:text-emerald-400"
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
