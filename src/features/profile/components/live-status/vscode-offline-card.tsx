"use client";

import { VSCodeLogo } from "./vscode-logo";

interface VsCodeOfflineCardProps {
  yesterdayTime: string;
}

export function VsCodeOfflineCard({ yesterdayTime }: VsCodeOfflineCardProps) {
  return (
    <div className="relative overflow-hidden border border-foreground/[0.06] bg-foreground/[0.015]">
      <div className="flex gap-4 p-4">
        <div className="flex size-[88px] flex-shrink-0 items-center justify-center bg-foreground/[0.03]">
          <VSCodeLogo className="size-11 opacity-20" />
        </div>

        <div className="flex min-w-0 flex-1 flex-col justify-center py-0.5">
          <div className="flex items-center gap-1.5 font-mono text-[9px] tracking-[0.12em] text-foreground/22 uppercase">
            <span className="size-[5px] rounded-full bg-foreground/20" />
            Offline
          </div>
          <h3 className="mt-1.5 font-serif text-[1.1rem] leading-tight font-medium text-foreground/45">
            Not currently coding
          </h3>
          <p className="mt-0.5 font-mono text-[11px] text-foreground/28">
            Yesterday: {yesterdayTime}
          </p>
        </div>
      </div>
    </div>
  );
}
