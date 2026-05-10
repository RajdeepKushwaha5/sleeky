"use client";

import Image from "next/image";
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
    <div className="relative mx-2 my-5 flex flex-col items-center overflow-hidden rounded-[1.75rem] border border-border/25 bg-background/72 p-6 text-center shadow-[0_18px_70px_rgba(0,0,0,0.08),0_1px_0_rgba(255,255,255,0.32)_inset] backdrop-blur-xl sm:flex-row sm:p-8 sm:text-left dark:bg-card/62 dark:shadow-[0_18px_80px_rgba(0,0,0,0.42),0_1px_0_rgba(255,255,255,0.06)_inset]">
      {/* Subtle gradient decoration — enhanced with dual tone */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-foreground/[0.01] via-transparent to-foreground/[0.015]" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-tl from-primary/[0.008] via-transparent to-transparent" />

      {/* Avatar */}
      <div className="relative shrink-0 pb-5 sm:pr-8 sm:pb-0">
        <HoverCard openDelay={100} closeDelay={100}>
          <HoverCardTrigger asChild>
            <div className="relative">
              {/* Avatar glow ring */}
              <div className="absolute -inset-1.5 animate-pulse rounded-full bg-gradient-to-br from-foreground/[0.06] via-transparent to-foreground/[0.04] blur-md" />
              <Image
                className="relative z-[2] size-28 rounded-full bg-zinc-800 ring-2 ring-foreground/[0.08] ring-offset-[3px] ring-offset-background grayscale transition-all duration-500 select-none hover:ring-foreground/[0.15] hover:grayscale-[30%] sm:size-36 dark:bg-zinc-900 dark:grayscale-0 dark:hover:grayscale-0"
                alt={`${USER.displayName}'s avatar`}
                src={USER.avatar}
                width={144}
                height={144}
                priority
              />
            </div>
          </HoverCardTrigger>
          <HoverCardContent side="right" align="start" className="w-auto p-0">
            <ProfileStatusTooltip />
          </HoverCardContent>
        </HoverCard>
      </div>

      {/* Info */}
      <div className="relative flex flex-1 flex-col items-center justify-center sm:items-start">
        {/* Specialty — enhanced pill with subtle shimmer */}
        <div className="mb-3 inline-flex items-center rounded-full border border-border/25 bg-muted/35 px-3.5 py-1.5 text-[10px] font-medium text-muted-foreground/80 uppercase shadow-sm backdrop-blur-sm">
          <span className="relative">
            Web Dev &bull; AI &bull; dApps &amp; Blockchain
          </span>
        </div>

        {/* Name — enhanced serif with subtle gradient */}
        <h1 className="mb-2 flex flex-wrap items-center justify-center gap-2.5 font-serif text-2xl leading-tight italic sm:justify-start sm:text-[2.5rem]">
          <span className="bg-gradient-to-br from-foreground via-foreground/90 to-foreground/75 bg-clip-text text-transparent">
            {USER.displayName}
          </span>
          <SimpleTooltip content="Verified">
            <VerifiedIcon className="size-[0.45em] translate-y-px text-info select-none" />
          </SimpleTooltip>
        </h1>

        {/* Dictionary metadata row — slightly brighter */}
        <div className="mb-3 flex flex-wrap items-center justify-center gap-x-2.5 gap-y-1 font-mono text-[11px] text-muted-foreground/58 sm:justify-start">
          <span className="italic">/rɑːdʒdiːp sɪŋ/</span>
          <span className="text-muted-foreground/25">•</span>
          <span>noun</span>
          <span className="text-muted-foreground/25">•</span>
          {istTime && <span className="tabular-nums">{istTime} IST</span>}
        </div>

        {/* Flip sentences — improved contrast */}
        <div className="text-[15px] font-light text-muted-foreground/70 sm:text-base">
          <FlipSentences sentences={USER.flipSentences} />
        </div>
      </div>

      {/* Sponsor button — top right, enhanced hover glow */}
      <a
        href="https://github.com/sponsors/RajdeepKushwaha5"
        target="_blank"
        rel="noopener noreferrer"
        className="group absolute top-4 right-4 z-10 flex items-center gap-1.5 rounded-full border border-pink-500/15 bg-pink-500/[0.05] px-3 py-1.5 text-xs shadow-sm backdrop-blur-sm transition-all duration-300 hover:border-pink-400/30 hover:bg-pink-500/[0.1] hover:shadow-[0_0_20px_rgba(236,72,153,0.15)]"
      >
        <svg
          className="size-3.5 fill-none stroke-pink-400/70 transition-all duration-300 group-hover:[animation:heartbeat_1.2s_ease-in-out_infinite] group-hover:stroke-pink-400"
          strokeWidth={1.5}
          viewBox="0 0 16 16"
          aria-hidden
        >
          <path d="M4.25 2.5c-1.336 0-2.75 1.164-2.75 3 0 2.15 1.58 4.144 3.365 5.682A20.57 20.57 0 008 13.393a20.57 20.57 0 003.135-2.211C12.92 9.644 14.5 7.65 14.5 5.5c0-1.836-1.414-3-2.75-3-1.373 0-2.609.986-3.029 2.456a.75.75 0 01-1.442 0C6.859 3.486 5.623 2.5 4.25 2.5z" />
        </svg>
        <span className="font-medium text-muted-foreground/60 transition-colors duration-300 group-hover:text-pink-300/80">
          Sponsor
        </span>
      </a>
    </div>
  );
}
