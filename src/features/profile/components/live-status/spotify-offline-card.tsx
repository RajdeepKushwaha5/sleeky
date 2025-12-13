"use client";

import Image from "next/image";

import type { LanyardData } from "@/hooks/use-lanyard";

import { SpotifyLogo } from "./spotify-logo";

interface SpotifyOfflineCardProps {
  lastPlayed: NonNullable<LanyardData["spotify"]>;
}

export function SpotifyOfflineCard({ lastPlayed }: SpotifyOfflineCardProps) {
  return (
    <div className="relative overflow-hidden rounded-lg border border-border/50 bg-card/80 transition-all">
      <div className="flex gap-3 p-3">
        {/* Album Art */}
        <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-md ring-1 ring-edge">
          <Image
            src={lastPlayed.album_art_url}
            alt={lastPlayed.album}
            width={64}
            height={64}
            className="h-full w-full object-cover opacity-60"
            unoptimized
          />
          <div className="absolute inset-0 flex items-center justify-center bg-black/40">
            <SpotifyLogo className="h-6 w-6 text-white/80" />
          </div>
        </div>

        {/* Status Info */}
        <div className="flex min-w-0 flex-1 flex-col justify-center">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-muted-foreground/40" />
            <span className="text-xs font-medium text-muted-foreground/60">
              Offline
            </span>
          </div>

          <h3 className="mt-1 truncate font-medium text-foreground/80">
            {lastPlayed.song}
          </h3>

          <p className="truncate text-sm text-muted-foreground/60">
            {lastPlayed.artist}
          </p>
        </div>
      </div>
    </div>
  );
}
