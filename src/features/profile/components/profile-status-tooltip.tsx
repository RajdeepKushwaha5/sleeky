"use client";

import { useLanyard } from "@/hooks/use-lanyard";
import { useWakaTime } from "@/hooks/use-wakatime";

const DISCORD_USER_ID = "993454036751745125";

export function ProfileStatusTooltip() {
  const { data: lanyardData } = useLanyard(DISCORD_USER_ID);
  const { stats: wakaStats } = useWakaTime();

  if (!lanyardData) return null;

  const isOnline = lanyardData.discord_status !== "offline";
  const hasSpotify = lanyardData.listening_to_spotify && lanyardData.spotify;

  // Build status message
  const parts: string[] = [];

  // Discord status
  if (isOnline) {
    parts.push("Online");
  } else {
    parts.push("Offline");
  }

  // Spotify status
  if (hasSpotify && lanyardData.spotify) {
    parts.push(
      `Listening to: '${lanyardData.spotify.song}' by ${lanyardData.spotify.artist}`
    );
  } else if (isOnline) {
    parts.push("Not listening");
  }

  // Coding time
  if (wakaStats.todaySeconds > 0) {
    parts.push(`Coding: ${wakaStats.todayFormatted} today`);
  }

  return parts.join(" | ");
}
