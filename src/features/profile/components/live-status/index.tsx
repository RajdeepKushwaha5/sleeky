"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

import type { LanyardData } from "@/hooks/use-lanyard";
import { getLastPlayedSpotify, useLanyard } from "@/hooks/use-lanyard";
import { useWakaTime } from "@/hooks/use-wakatime";

import { Panel, PanelContent, PanelHeader, PanelTitle } from "../panel";
import { DiscordStatus } from "./discord-status";
import { OfflineCard } from "./offline-card";
import { SpotifyCard } from "./spotify-card";
import { SpotifyOfflineCard } from "./spotify-offline-card";
import { VsCodeCard } from "./vscode-card";
import { VsCodeOfflineCard } from "./vscode-offline-card";

const DISCORD_USER_ID = "993454036751745125";

export function LiveStatus() {
  const { data, isLoading } = useLanyard(DISCORD_USER_ID);
  const { stats: wakaStats } = useWakaTime();
  const [lastPlayedSpotify] = useState<LanyardData["spotify"] | null>(() =>
    getLastPlayedSpotify()
  );

  // Check status
  const hasSpotify = data?.listening_to_spotify && data.spotify;
  const vscodeActivities =
    data?.activities?.filter(
      (activity) => activity.name === "Visual Studio Code"
    ) || [];
  const hasVsCodeActivity = vscodeActivities.length > 0;

  // Determine if user is online on Discord
  const isDiscordOnline = data?.discord_status !== "offline";

  return (
    <Panel id="live" className="group/live bg-zinc-50 dark:bg-card">
      <PanelHeader className="flex items-center justify-between py-4">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <PanelTitle>Live Activity</PanelTitle>
        </motion.div>
        {data && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            <DiscordStatus status={data.discord_status} />
          </motion.div>
        )}
      </PanelHeader>

      <PanelContent className="space-y-3">
        <AnimatePresence mode="wait">
          {isLoading ? (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center justify-center py-8"
            >
              <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
            </motion.div>
          ) : (
            <motion.div
              key="content"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 gap-3 md:grid-cols-2"
            >
              {/* Spotify Section - Show currently playing or last played */}
              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
              >
                {hasSpotify && data ? (
                  <SpotifyCard
                    spotify={data.spotify!}
                    status={data.discord_status}
                  />
                ) : lastPlayedSpotify ? (
                  <SpotifyOfflineCard lastPlayed={lastPlayedSpotify} />
                ) : (
                  <OfflineCard
                    icon="spotify"
                    title="Offline"
                    subtitle="Not currently listening"
                    isOnline={false}
                    subtitleClassName="font-[family-name:var(--font-outfit)] tracking-wide"
                  />
                )}
              </motion.div>

              {/* VS Code Section - Show live activity when coding, otherwise show offline with stats */}
              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.25, ease: "easeOut" }}
              >
                {hasVsCodeActivity && data ? (
                  // Currently coding: Show live coding activity with current session info
                  vscodeActivities.map((activity, index) => (
                    <VsCodeCard
                      key={activity.id || index}
                      activity={activity}
                      status={data.discord_status}
                      wakaStats={wakaStats}
                    />
                  ))
                ) : wakaStats.todaySeconds > 0 ? (
                  // Not currently coding but has today's data: Show today's stats
                  <OfflineCard
                    icon="vscode"
                    title={isDiscordOnline ? "Online" : "Away"}
                    subtitle={`Coded ${wakaStats.todayFormatted} today`}
                    isOnline={isDiscordOnline}
                    subtitleClassName="font-mono tracking-wider"
                  />
                ) : wakaStats.yesterdaySeconds > 0 ? (
                  // No today data: Show yesterday's stats
                  <VsCodeOfflineCard
                    yesterdayTime={wakaStats.yesterdayFormatted}
                  />
                ) : (
                  // No data at all: Show generic offline
                  <OfflineCard
                    icon="vscode"
                    title="Offline"
                    subtitle="Not currently coding"
                    isOnline={false}
                    subtitleClassName="font-[family-name:var(--font-outfit)] tracking-wide"
                  />
                )}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </PanelContent>
    </Panel>
  );
}
