"use client";

import { useLanyard } from "@/hooks/use-lanyard";
import { useWakaTime } from "@/hooks/use-wakatime";
import { cn } from "@/lib/utils";

const DISCORD_USER_ID = "993454036751745125";

// Spotify Logo SVG
function SpotifyIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
    </svg>
  );
}

// VS Code Logo SVG
function VSCodeIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M23.15 2.587L18.21.21a1.494 1.494 0 0 0-1.705.29l-9.46 8.63-4.12-3.128a.999.999 0 0 0-1.276.057L.327 7.261A1 1 0 0 0 .326 8.74L3.899 12 .326 15.26a1 1 0 0 0 .001 1.479L1.65 17.94a.999.999 0 0 0 1.276.057l4.12-3.128 9.46 8.63a1.492 1.492 0 0 0 1.704.29l4.942-2.377A1.5 1.5 0 0 0 24 20.06V3.939a1.5 1.5 0 0 0-.85-1.352zm-5.146 14.861L10.826 12l7.178-5.448v10.896z" />
    </svg>
  );
}

export function ProfileStatusTooltip() {
  const { data: lanyardData } = useLanyard(DISCORD_USER_ID);
  const { stats: wakaStats } = useWakaTime();

  if (!lanyardData) {
    return (
      <div className="p-3 text-sm text-muted-foreground">
        Loading status...
      </div>
    );
  }

  const isOnline = lanyardData.discord_status !== "offline";
  const hasSpotify = lanyardData.listening_to_spotify && lanyardData.spotify;

  return (
    <div className="flex flex-col gap-2.5 p-3">
      {/* Discord Status */}
      <div className="flex items-center gap-2">
        <span
          className={cn(
            "h-2.5 w-2.5 rounded-full",
            isOnline ? "bg-green-500" : "bg-zinc-400"
          )}
        />
        <span className="text-sm font-medium">
          {isOnline ? "Online" : "Offline"}
        </span>
      </div>

      {/* Spotify Status */}
      {hasSpotify && lanyardData.spotify && (
        <div className="flex items-center gap-2 text-sm">
          <SpotifyIcon className="h-4 w-4 shrink-0 text-[#1DB954]" />
          <span className="text-muted-foreground">
            {lanyardData.spotify.song}
            <span className="text-xs opacity-70"> by {lanyardData.spotify.artist}</span>
          </span>
        </div>
      )}

      {/* Coding Time */}
      {wakaStats.todaySeconds > 0 && (
        <div className="flex items-center gap-2 text-sm">
          <VSCodeIcon className="h-4 w-4 shrink-0 text-[#007ACC]" />
          <span className="text-muted-foreground">
            {wakaStats.todayFormatted} today
          </span>
        </div>
      )}
    </div>
  );
}
