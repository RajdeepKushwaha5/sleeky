"use client";

import { SpotifyLogo } from "./spotify-logo";
import { VSCodeLogo } from "./vscode-logo";

interface OfflineCardProps {
  icon: "spotify" | "vscode";
  title: string;
  subtitle: string;
  isOnline?: boolean;
}

export function OfflineCard({
  icon,
  title,
  subtitle,
  isOnline = false,
}: OfflineCardProps) {
  const isSpotify = icon === "spotify";

  return (
    <div className="relative overflow-hidden rounded-lg border border-border/50 bg-card/80 transition-all">
      <div className="flex gap-3 p-3">
        {/* Icon */}
        <div
          className={`flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-md ${isSpotify ? "bg-[#1DB954]/10" : "bg-[#007ACC]/10"
            }`}
        >
          {isSpotify ? (
            <SpotifyLogo
              className={`h-8 w-8 ${isOnline ? "text-[#1DB954]/60" : "text-[#1DB954]/40"}`}
            />
          ) : (
            <VSCodeLogo
              className={`h-8 w-8 ${isOnline ? "opacity-60" : "opacity-40"}`}
            />
          )}
        </div>

        {/* Status Info */}
        <div className="flex min-w-0 flex-1 flex-col justify-center">
          <div className="flex items-center gap-2">
            <span
              className={`h-2 w-2 rounded-full ${isOnline ? "bg-green-500/60" : "bg-muted-foreground/40"}`}
            />
            <span
              className={`text-xs font-medium ${isOnline ? "text-green-600 dark:text-green-500" : "text-muted-foreground/60"}`}
            >
              {isOnline ? "Online" : "Offline"}
            </span>
          </div>

          <h3 className="mt-1 truncate font-medium text-foreground/80">
            {title}
          </h3>

          <p className="truncate text-sm text-muted-foreground/60">
            {subtitle}
          </p>
        </div>
      </div>
    </div>
  );
}
