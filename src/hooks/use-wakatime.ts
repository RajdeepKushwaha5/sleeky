"use client";

import { useEffect, useState } from "react";

interface WakaTimeStats {
  todaySeconds: number;
  todayFormatted: string;
  yesterdaySeconds: number;
  yesterdayFormatted: string;
  isOnline: boolean;
}

const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

export function useWakaTime() {
  const [stats, setStats] = useState<WakaTimeStats>({
    todaySeconds: 0,
    todayFormatted: "0h 0m",
    yesterdaySeconds: 0,
    yesterdayFormatted: "0h 0m",
    isOnline: false,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // Fetch last 7 days to get today and yesterday
        const response = await fetch("/api/wakatime");

        if (!response.ok) {
          throw new Error("Failed to fetch WakaTime stats");
        }

        const data = await response.json();

        if (data.data && data.data.length > 0) {
          // Today is the last element
          const todayData = data.data[data.data.length - 1];
          const yesterdayData =
            data.data.length > 1 ? data.data[data.data.length - 2] : null;

          const todaySeconds = todayData?.grand_total?.total_seconds || 0;
          const yesterdaySeconds =
            yesterdayData?.grand_total?.total_seconds || 0;

          // Format time helper
          const formatTime = (seconds: number) => {
            const hours = Math.floor(seconds / 3600);
            const minutes = Math.floor((seconds % 3600) / 60);
            return `${hours}h ${minutes}m`;
          };

          setStats({
            todaySeconds,
            todayFormatted: formatTime(todaySeconds),
            yesterdaySeconds,
            yesterdayFormatted: formatTime(yesterdaySeconds),
            isOnline: todaySeconds > 0,
          });
        }

        setIsLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err : new Error("Unknown error"));
        setIsLoading(false);
      }
    };

    fetchStats();

    // Refresh stats every 5 minutes
    const interval = setInterval(fetchStats, CACHE_DURATION);

    return () => clearInterval(interval);
  }, []);

  return { stats, isLoading, error };
}
