"use client";

import { useEffect, useState } from "react";

import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { SimpleTooltip } from "@/components/ui/tooltip";
import { USER } from "@/features/profile/data/user";
import { FlipSentences } from "@/registry/flip-sentences";

import { ProfileStatusTooltip } from "./profile-status-tooltip";
import { VerifiedIcon } from "./verified-icon";

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

export function ProfileHeader() {
  const istTime = useISTClock();

  return (
    <div className="relative mx-2 my-6 flex flex-col items-center overflow-hidden rounded-2xl border border-border/20 bg-card/40 p-6 text-center backdrop-blur-sm sm:flex-row sm:p-8 sm:text-left">
      {/* Subtle gradient decoration */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-foreground/[0.008] via-transparent to-foreground/[0.012]" />

      {/* Avatar */}
      <div className="relative shrink-0 pb-5 sm:pr-8 sm:pb-0">
        <HoverCard openDelay={100} closeDelay={100}>
          <HoverCardTrigger asChild>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              className="size-28 cursor-pointer rounded-full bg-zinc-800 ring-2 ring-border/40 ring-offset-4 ring-offset-background grayscale transition-all duration-400 select-none hover:scale-[1.02] hover:grayscale-[50%] sm:size-36 dark:bg-zinc-900 dark:grayscale-0 dark:hover:grayscale-0"
              alt={`${USER.displayName}'s avatar`}
              src={USER.avatar}
              fetchPriority="high"
            />
          </HoverCardTrigger>
          <HoverCardContent side="right" align="start" className="w-auto p-0">
            <ProfileStatusTooltip />
          </HoverCardContent>
        </HoverCard>
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

        {/* Dictionary metadata row — justaditya-inspired */}
        <div className="mb-3 flex flex-wrap items-center justify-center gap-x-2 gap-y-1 font-mono text-[11px] text-muted-foreground/50 sm:justify-start">
          <span className="italic">/rɑːdʒdiːp sɪŋ/</span>
          <span className="text-muted-foreground/30">•</span>
          <span>noun</span>
          <span className="text-muted-foreground/30">•</span>
          {istTime && (
            <>
              <span className="tabular-nums">{istTime} IST</span>
              <span className="text-muted-foreground/30">•</span>
            </>
          )}
          <span>Jaipur, India</span>
        </div>

        {/* Flip sentences */}
        <div className="font-light text-muted-foreground/80">
          <FlipSentences sentences={USER.flipSentences} />
        </div>
      </div>
    </div>
  );
}
