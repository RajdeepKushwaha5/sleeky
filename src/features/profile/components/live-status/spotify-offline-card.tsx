"use client";

import Image from "next/image";

import type { LanyardData } from "@/hooks/use-lanyard";

import { SpotifyLogo } from "./spotify-logo";

interface SpotifyOfflineCardProps {
  lastPlayed: NonNullable<LanyardData["spotify"]>;
}

export function SpotifyOfflineCard({ lastPlayed }: SpotifyOfflineCardProps) {
  return (
    <div className="relative overflow-hidden border border-foreground/[0.06] bg-foreground/[0.015]">
      <div className="flex gap-4 p-4">
        {/* Album Art — dimmed */}
        <div className="relative size-[88px] flex-shrink-0 overflow-hidden opacity-45">
          <Image
            src={lastPlayed.album_art_url}
            alt={lastPlayed.album}
            fill
            className="object-cover grayscale"
            unoptimized
          />
        </div>

        {/* Track info */}
        <div className="flex min-w-0 flex-1 flex-col justify-center py-0.5">
          <div className="flex items-center gap-1.5 font-mono text-[9px] tracking-[0.12em] text-foreground/22 uppercase">
            <SpotifyLogo className="size-3 text-foreground/25" />
            Last played
          </div>
          <h3 className="mt-1.5 truncate font-serif text-[1.1rem] leading-tight font-medium text-foreground/55">
            {lastPlayed.song}
          </h3>
          <p className="mt-0.5 truncate font-mono text-[11px] text-foreground/30">
            {lastPlayed.artist}
          </p>
        </div>
      </div>
    </div>
  );
}
