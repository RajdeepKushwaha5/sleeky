"use client";

import type { LanyardData } from "@/hooks/use-lanyard";

interface DiscordStatusProps {
  status: LanyardData["discord_status"];
}

const statusConfig = {
  online: {
    label: "Online",
    color: "bg-green-500",
    ringColor: "ring-green-500/20",
  },
  idle: {
    label: "Idle",
    color: "bg-yellow-500",
    ringColor: "ring-yellow-500/20",
  },
  dnd: {
    label: "Do Not Disturb",
    color: "bg-red-500",
    ringColor: "ring-red-500/20",
  },
  offline: {
    label: "Offline",
    color: "bg-gray-500",
    ringColor: "ring-gray-500/20",
  },
};

export function DiscordStatus({ status }: DiscordStatusProps) {
  const config = statusConfig[status] || statusConfig.offline;

  return (
    <div className="flex items-center gap-2">
      <div className="relative">
        <div
          className={`h-2.5 w-2.5 rounded-full ${config.color} ring-4 ${config.ringColor}`}
        />
        <div
          className={`absolute inset-0 h-2.5 w-2.5 animate-ping rounded-full ${config.color} opacity-75`}
        />
      </div>
      <span className="text-xs font-medium text-muted-foreground">
        {config.label}
      </span>
    </div>
  );
}
