"use client";

import { FileCode } from "lucide-react";

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

export function VsCodeCard({ activity, wakaStats }: VsCodeCardProps) {
  const fileName = activity.details || "Unknown file";
  const workspace = activity.state || "Unknown workspace";

  const ext = fileName.match(/\.([a-zA-Z0-9]+)$/)?.[1]?.toLowerCase();
  const langMap: Record<string, string> = {
    ts: "TypeScript",
    tsx: "TypeScript",
    js: "JavaScript",
    jsx: "JavaScript",
    py: "Python",
    rs: "Rust",
    go: "Go",
    md: "Markdown",
    css: "CSS",
    json: "JSON",
  };
  const lang = ext ? (langMap[ext] ?? ext.toUpperCase()) : "Code";

  return (
    <div className="relative overflow-hidden border border-foreground/[0.08] bg-foreground/[0.025]">
      {/* Live pulse */}
      <div className="absolute top-3 right-3 flex items-center gap-1.5">
        <span className="relative flex size-[6px]">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#007ACC] opacity-60" />
          <span className="relative inline-flex size-[6px] rounded-full bg-[#007ACC]" />
        </span>
        <span className="font-mono text-[8px] tracking-[0.12em] text-[#007ACC]/70 uppercase">
          Live
        </span>
      </div>

      <div className="flex gap-4 p-4 pr-16">
        {/* VS Code icon */}
        <div className="flex size-[88px] flex-shrink-0 items-center justify-center bg-[#007ACC]/[0.07]">
          <VSCodeLogo className="size-11" />
        </div>

        {/* Activity info */}
        <div className="flex min-w-0 flex-1 flex-col justify-between py-0.5">
          <div>
            <div className="flex items-center gap-1.5 font-mono text-[9px] tracking-[0.12em] text-foreground/30 uppercase">
              <FileCode className="size-3 text-[#007ACC]/60" />
              VS Code
            </div>
            <h3 className="mt-1.5 truncate font-serif text-[1.1rem] leading-tight font-medium text-foreground/90">
              {fileName}
            </h3>
            <p className="mt-0.5 truncate font-mono text-[11px] text-foreground/40">
              {workspace}
            </p>
          </div>

          <div className="mt-3 flex items-center gap-3 font-mono text-[9px] text-foreground/28">
            <span className="rounded-sm border border-[#007ACC]/20 bg-[#007ACC]/[0.06] px-1.5 py-0.5 text-[#007ACC]/60">
              {lang}
            </span>
            {activity.timestamps?.start && (
              <span>{getElapsedTime(activity.timestamps.start)}</span>
            )}
            {wakaStats.todaySeconds > 0 && (
              <span className="text-foreground/20">
                · {wakaStats.todayFormatted} today
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function getElapsedTime(startTime: number): string {
  const elapsed = Date.now() - startTime;
  const minutes = Math.floor(elapsed / 60000);
  const hours = Math.floor(minutes / 60);
  return hours > 0 ? `${hours}h ${minutes % 60}m` : `${minutes}m`;
}
