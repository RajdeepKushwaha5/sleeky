"use client";

import { cn } from "@/lib/utils";

import { SpotifyLogo } from "./spotify-logo";
import { VSCodeLogo } from "./vscode-logo";

interface OfflineCardProps {
  icon: "spotify" | "vscode";
  title: string;
  subtitle: string;
  isOnline?: boolean;
  subtitleClassName?: string;
}

export function OfflineCard({
  icon,
  title,
  subtitle,
  isOnline = false,
  subtitleClassName,
}: OfflineCardProps) {
  const isSpotify = icon === "spotify";

  return (
    <div className="relative overflow-hidden border border-foreground/[0.06] bg-foreground/[0.015]">
      <div className="flex gap-4 p-4">
        {/* Icon box */}
        <div className="flex size-[88px] flex-shrink-0 items-center justify-center bg-foreground/[0.03]">
          {isSpotify ? (
            <SpotifyLogo className="size-9 text-foreground/20" />
          ) : (
            <VSCodeLogo className="size-11 opacity-20" />
          )}
        </div>

        {/* Status info */}
        <div className="flex min-w-0 flex-1 flex-col justify-center py-0.5">
          <div className="flex items-center gap-1.5 font-mono text-[9px] tracking-[0.12em] text-foreground/22 uppercase">
            <span
              className={cn(
                "size-[5px] rounded-full",
                isOnline ? "bg-emerald-500/60" : "bg-foreground/20"
              )}
            />
            {isOnline ? "Online" : "Offline"}
          </div>
          <h3 className="mt-1.5 truncate font-serif text-[1.1rem] leading-tight font-medium text-foreground/45">
            {title}
          </h3>
          <p
            className={cn(
              "mt-0.5 truncate font-mono text-[11px] text-foreground/28",
              subtitleClassName
            )}
          >
            {subtitle}
          </p>
        </div>
      </div>
    </div>
  );
}
