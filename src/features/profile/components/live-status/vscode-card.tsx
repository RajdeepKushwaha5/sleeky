"use client";

import { FileCode } from "lucide-react";
import { motion } from "motion/react";

import type { LanyardData } from "@/hooks/use-lanyard";

import { VSCodeLogo } from "./vscode-logo";

interface WakaStats {
  todaySeconds: number;
  todayFormatted: string;
  yesterdaySeconds: number;
  yesterdayFormatted: string;
  isOnline: boolean;
}

interface VsCodeCardProps {
  activity: LanyardData["activities"][0];
  status: LanyardData["discord_status"];
  wakaStats: WakaStats;
}

const languageIcons: Record<string, string> = {
  javascript: "🟨",
  typescript: "🔷",
  python: "🐍",
  java: "☕",
  html: "🌐",
  css: "🎨",
  json: "📋",
  markdown: "📝",
  rust: "🦀",
  go: "🐹",
  cpp: "⚙️",
  c: "⚙️",
  php: "🐘",
  ruby: "💎",
  swift: "🍎",
  kotlin: "🟣",
  dart: "🎯",
  solidity: "💠",
};

export function VsCodeCard({ activity, status, wakaStats }: VsCodeCardProps) {
  // Extract file extension from details
  const getFileExtension = (details?: string) => {
    if (!details) return null;
    const match = details.match(/\.([a-zA-Z0-9]+)$/);
    return match ? match[1].toLowerCase() : null;
  };

  const getLanguageIcon = (details?: string) => {
    const extension = getFileExtension(details);
    if (!extension) return "📄";

    // Map common extensions to language keys
    const extensionMap: Record<string, string> = {
      js: "javascript",
      jsx: "javascript",
      ts: "typescript",
      tsx: "typescript",
      py: "python",
      md: "markdown",
      rs: "rust",
      sol: "solidity",
    };

    const language = extensionMap[extension] || extension;
    return languageIcons[language] || "📄";
  };

  const fileName = activity.details || "Unknown file";
  const workspace = activity.state || "Unknown workspace";
  const icon = getLanguageIcon(activity.details);

  return (
    <motion.div
      whileHover={{ y: -4, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 400, damping: 20 }}
      className="group relative overflow-hidden rounded-lg border border-zinc-200 bg-zinc-100/80 grayscale transition-all duration-500 hover:border-accent/50 hover:shadow-md hover:grayscale-0 dark:border-border/50 dark:bg-card/80 dark:grayscale-0"
    >
      {/* VS Code blue animated shimmer */}
      <motion.div
        className="pointer-events-none absolute inset-0 -translate-x-full"
        animate={{ translateX: ["-100%", "200%"] }}
        transition={{
          duration: 3,
          repeat: Infinity,
          repeatDelay: 5,
          ease: "easeInOut",
        }}
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, rgba(0,122,204,0.08) 50%, transparent 100%)",
        }}
      />
      <div className="flex gap-3 p-3">
        {/* VS Code Logo */}
        <div className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-md bg-[#007ACC]/10 ring-1 ring-edge">
          <VSCodeLogo className="h-10 w-10" />
        </div>

        {/* Activity Info */}
        <div className="flex min-w-0 flex-1 flex-col justify-center">
          <div className="flex items-center gap-2">
            {/* Online status indicator */}
            <span
              className={`h-2 w-2 rounded-full ${
                status === "online"
                  ? "bg-green-500"
                  : status === "idle"
                    ? "bg-yellow-500"
                    : status === "dnd"
                      ? "bg-red-500"
                      : "bg-gray-500"
              }`}
            />
            <span
              className={`text-xs font-medium ${
                status === "online"
                  ? "text-green-600 dark:text-green-500"
                  : status === "idle"
                    ? "text-yellow-600 dark:text-yellow-500"
                    : status === "dnd"
                      ? "text-red-600 dark:text-red-500"
                      : "text-gray-600 dark:text-gray-500"
              }`}
            >
              {status === "online"
                ? "Online"
                : status === "idle"
                  ? "Idle"
                  : status === "dnd"
                    ? "Do Not Disturb"
                    : "Offline"}
            </span>
            <span className="text-xs text-muted-foreground">•</span>
            <FileCode className="h-3.5 w-3.5 text-[#007ACC]" />
            <span className="text-xs font-medium text-[#007ACC]">
              Coding in VS Code
            </span>
          </div>

          <div className="mt-0.5 flex items-center gap-2">
            <span className="text-base">{icon}</span>
            <h3 className="truncate font-semibold text-foreground">
              {fileName}
            </h3>
          </div>

          <p className="truncate text-sm text-muted-foreground">{workspace}</p>

          {/* Time tracking from WakaTime */}
          <div className="mt-1 flex items-center gap-2 text-xs">
            {activity.timestamps?.start && (
              <span className="text-muted-foreground/70">
                Session: {getElapsedTime(activity.timestamps.start)}
              </span>
            )}
            {wakaStats.todaySeconds > 0 && (
              <>
                <span className="text-muted-foreground/50">•</span>
                <span className="text-muted-foreground/70">
                  Today: {wakaStats.todayFormatted}
                </span>
              </>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function getElapsedTime(startTime: number): string {
  const elapsed = Date.now() - startTime;
  const minutes = Math.floor(elapsed / 60000);
  const hours = Math.floor(minutes / 60);

  if (hours > 0) {
    return `${hours}h ${minutes % 60}m elapsed`;
  }
  return `${minutes}m elapsed`;
}
