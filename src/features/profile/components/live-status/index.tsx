"use client";

import { useLanyard } from "@/hooks/use-lanyard";
import { useWakaTime } from "@/hooks/use-wakatime";

import { Panel, PanelContent, PanelHeader, PanelTitle } from "../panel";
import { DiscordStatus } from "./discord-status";
import { OfflineCard } from "./offline-card";
import { SpotifyCard } from "./spotify-card";
import { VsCodeCard } from "./vscode-card";
import { VsCodeOfflineCard } from "./vscode-offline-card";

const DISCORD_USER_ID = "993454036751745125";

export function LiveStatus() {
  const { data, isLoading } = useLanyard(DISCORD_USER_ID);
  const { stats: wakaStats } = useWakaTime();

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
    <Panel>
      <PanelHeader className="flex items-center justify-between py-4">
        <PanelTitle>Live Activity</PanelTitle>
        {data && <DiscordStatus status={data.discord_status} />}
      </PanelHeader>

      <PanelContent className="space-y-3">
        {isLoading ? (
          <div className="flex items-center justify-center py-8">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
            {/* Spotify Section - Show only when actually listening */}
            {hasSpotify && data ? (
              <SpotifyCard
                spotify={data.spotify!}
                status={data.discord_status}
              />
            ) : (
              <OfflineCard
                icon="spotify"
                title="Offline"
                subtitle="Not listening to Spotify"
                isOnline={false}
              />
            )}

            {/* VS Code Section - Show live activity when coding, otherwise show offline with stats */}
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
                title={isDiscordOnline ? "Online" : "Offline"}
                subtitle={`VS Code • Today: ${wakaStats.todayFormatted}`}
                isOnline={isDiscordOnline}
              />
            ) : wakaStats.yesterdaySeconds > 0 ? (
              // No today data: Show yesterday's stats
              <VsCodeOfflineCard yesterdayTime={wakaStats.yesterdayFormatted} />
            ) : (
              // No data at all: Show generic offline
              <OfflineCard
                icon="vscode"
                title="Offline"
                subtitle="No coding activity"
                isOnline={false}
              />
            )}
          </div>
        )}
      </PanelContent>
    </Panel>
  );
}
