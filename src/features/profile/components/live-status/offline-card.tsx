"use client";

import { motion } from "motion/react";

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
    <motion.div
      whileHover={{ y: -4, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 400, damping: 20 }}
      className="relative overflow-hidden rounded-lg border border-zinc-200 bg-zinc-100/80 grayscale transition-all duration-500 hover:grayscale-0 dark:border-border/25 dark:bg-card/40 dark:grayscale-0"
    >
      {/* Animated gradient border glow on hover */}
      <div
        className="pointer-events-none absolute inset-0 rounded-lg opacity-0 transition-opacity duration-500 hover:opacity-100"
        style={{
          background:
            "linear-gradient(135deg, transparent 40%, rgba(29,185,84,0.05) 50%, transparent 60%)",
        }}
      />
      <div className="flex gap-3 p-3">
        {/* Icon */}
        <div
          className={`flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-md ${
            isSpotify ? "bg-[#1DB954]/10" : "bg-[#007ACC]/10"
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

          <h3 className="mt-1 truncate font-[family-name:var(--font-syne)] font-medium tracking-tight text-foreground/80">
            {title}
          </h3>

          <p
            className={cn(
              "truncate text-sm text-muted-foreground/60",
              subtitleClassName
            )}
          >
            {subtitle}
          </p>
        </div>
      </div>
    </motion.div>
  );
}
