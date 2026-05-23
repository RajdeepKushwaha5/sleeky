"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

import type { LanyardData } from "@/hooks/use-lanyard";

import { SpotifyLogo } from "./spotify-logo";

interface SpotifyCardProps {
  spotify: NonNullable<LanyardData["spotify"]>;
  status: LanyardData["discord_status"];
}

export function SpotifyCard({ spotify }: SpotifyCardProps) {
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  useEffect(() => {
    const update = () => {
      const now = Date.now();
      const elapsed = now - spotify.timestamps.start;
      const duration = spotify.timestamps.end - spotify.timestamps.start;
      setProgress(Math.min((elapsed / duration) * 100, 100));
      setCurrentTime(elapsed);
    };
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, [spotify.timestamps]);

  const duration = spotify.timestamps.end - spotify.timestamps.start;

  const fmt = (ms: number) => {
    const s = Math.floor(ms / 1000);
    return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;
  };

  return (
    <div className="relative overflow-hidden border border-foreground/[0.08] bg-foreground/[0.025]">
      {/* Live pulse in top-right */}
      <div className="absolute top-3 right-3 flex items-center gap-1.5">
        <span className="relative flex size-[6px]">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#1DB954] opacity-60" />
          <span className="relative inline-flex size-[6px] rounded-full bg-[#1DB954]" />
        </span>
        <span className="font-mono text-[8px] tracking-[0.12em] text-[#1DB954]/70 uppercase">
          Live
        </span>
      </div>

      <div className="flex gap-4 p-4 pr-16">
        {/* Album Art */}
        <div className="relative size-[88px] flex-shrink-0 overflow-hidden">
          <Image
            src={spotify.album_art_url || "/placeholder-album.png"}
            alt={spotify.album}
            fill
            className="object-cover"
            unoptimized
          />
        </div>

        {/* Track info */}
        <div className="flex min-w-0 flex-1 flex-col justify-between py-0.5">
          <div>
            <div className="flex items-center gap-1.5 font-mono text-[9px] tracking-[0.12em] text-foreground/30 uppercase">
              <SpotifyLogo className="size-3 text-[#1DB954]/60" />
              Spotify
            </div>
            <h3 className="mt-1.5 truncate font-serif text-[1.1rem] leading-tight font-medium text-foreground/90">
              {spotify.song}
            </h3>
            <p className="mt-0.5 truncate font-mono text-[11px] text-foreground/40">
              {spotify.artist}
            </p>
          </div>

          {/* Progress */}
          <div className="mt-3">
            <div className="relative h-px w-full bg-foreground/[0.1]">
              <div
                className="absolute top-0 left-0 h-full bg-[#1DB954]/60 transition-all duration-1000"
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className="mt-1.5 flex justify-between font-mono text-[9px] text-foreground/28">
              <span>{fmt(currentTime)}</span>
              <span>{fmt(duration)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
