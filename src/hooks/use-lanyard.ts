"use client";

import { useEffect, useState } from "react";

export interface LanyardData {
  spotify: {
    track_id: string;
    timestamps: {
      start: number;
      end: number;
    };
    song: string;
    artist: string;
    album_art_url: string;
    album: string;
  } | null;
  discord_user: {
    id: string;
    username: string;
    avatar: string;
    discriminator: string;
    bot: boolean;
    global_name: string | null;
    avatar_decoration_data: null;
    display_name: string;
    public_flags: number;
  };
  discord_status: "online" | "idle" | "dnd" | "offline";
  activities: Array<{
    id: string;
    name: string;
    type: number;
    state?: string;
    details?: string;
    timestamps?: {
      start?: number;
      end?: number;
    };
    assets?: {
      large_image?: string;
      large_text?: string;
      small_image?: string;
      small_text?: string;
    };
    application_id?: string;
    created_at?: number;
  }>;
  listening_to_spotify: boolean;
  kv: Record<string, string>;
  active_on_discord_mobile: boolean;
  active_on_discord_desktop: boolean;
  active_on_discord_web: boolean;
}

export function useLanyard(userId: string) {
  const [data, setData] = useState<LanyardData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let ws: WebSocket | null = null;
    const heartbeatIntervals: NodeJS.Timeout[] = [];
    let reconnectTimeout: NodeJS.Timeout | null = null;

    const connect = () => {
      try {
        ws = new WebSocket("wss://api.lanyard.rest/socket");

        ws.onopen = () => {
          setError(null);
        };

        ws.onmessage = (event) => {
          const message = JSON.parse(event.data);

          switch (message.op) {
            case 1: // Hello
              const heartbeatInterval = message.d.heartbeat_interval;

              // Send initial subscribe
              ws?.send(
                JSON.stringify({
                  op: 2,
                  d: {
                    subscribe_to_id: userId,
                  },
                })
              );

              // Start heartbeat
              if (heartbeatInterval) {
                const interval = setInterval(() => {
                  if (ws?.readyState === WebSocket.OPEN) {
                    ws.send(JSON.stringify({ op: 3 }));
                  }
                }, heartbeatInterval);
                heartbeatIntervals.push(interval);
              }
              break;

            case 0: // Event
              if (
                message.t === "INIT_STATE" ||
                message.t === "PRESENCE_UPDATE"
              ) {
                setData(message.d);
                setIsLoading(false);
              }
              break;
          }
        };

        ws.onerror = () => {
          // WebSocket errors don't provide useful info in the event
          // The actual error will be handled in onclose with reconnect
          setError(new Error("WebSocket connection failed"));
        };

        ws.onclose = () => {
          heartbeatIntervals.forEach(clearInterval);

          // Reconnect after 5 seconds
          reconnectTimeout = setTimeout(() => {
            connect();
          }, 5000);
        };
      } catch (err) {
        setError(err instanceof Error ? err : new Error("Unknown error"));
        setIsLoading(false);
      }
    };

    connect();

    return () => {
      if (ws) {
        ws.close();
      }
      heartbeatIntervals.forEach(clearInterval);
      if (reconnectTimeout) {
        clearTimeout(reconnectTimeout);
      }
    };
  }, [userId]);

  return { data, isLoading, error };
}
