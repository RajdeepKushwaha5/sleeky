"use client";

import { VSCodeLogo } from "./vscode-logo";

interface VsCodeOfflineCardProps {
  yesterdayTime: string;
}

export function VsCodeOfflineCard({ yesterdayTime }: VsCodeOfflineCardProps) {
  return (
    <div className="relative overflow-hidden rounded-lg border border-zinc-200 bg-zinc-100/80 grayscale transition-all duration-500 hover:grayscale-0 dark:border-border/50 dark:bg-card/80 dark:grayscale-0">
      <div className="flex gap-3 p-3">
        {/* VS Code Logo */}
        <div className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-md bg-[#007ACC]/10 ring-1 ring-edge">
          <VSCodeLogo className="h-10 w-10 opacity-40" />
        </div>

        {/* Status Info */}
        <div className="flex min-w-0 flex-1 flex-col justify-center">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-muted-foreground/40" />
            <span className="text-xs font-medium text-muted-foreground/60">
              Offline
            </span>
          </div>

          <h3 className="mt-1 font-semibold text-foreground/80">
            Not currently coding
          </h3>

          <p className="text-sm text-muted-foreground/60">
            Yesterday: {yesterdayTime}
          </p>
        </div>
      </div>
    </div>
  );
}
