import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { SimpleTooltip } from "@/components/ui/tooltip";
import { USER } from "@/features/profile/data/user";
import { cn } from "@/lib/utils";
import { FlipSentences } from "@/registry/flip-sentences";

import { ProfileStatusTooltip } from "./profile-status-tooltip";
import { VerifiedIcon } from "./verified-icon";

export function ProfileHeader() {
  return (
    <div className="screen-line-after relative flex border-x border-edge">
      {/* Blueprint corner markers */}
      <div className="pointer-events-none absolute top-0 left-0 z-10 h-8 w-8 border-t-2 border-l-2 border-foreground/15" />
      <div className="pointer-events-none absolute top-0 right-0 z-10 h-8 w-8 border-t-2 border-r-2 border-foreground/15" />
      <div className="pointer-events-none absolute bottom-0 left-0 z-10 h-8 w-8 border-b-2 border-l-2 border-foreground/15" />
      <div className="pointer-events-none absolute right-0 bottom-0 z-10 h-8 w-8 border-r-2 border-b-2 border-foreground/15" />

      {/* Technical measurement marks - top */}
      <div className="pointer-events-none absolute top-2 left-1/2 z-10 flex -translate-x-1/2 gap-1 opacity-20">
        <div className="h-2 w-px bg-foreground" />
        <div className="h-3 w-px bg-foreground" />
        <div className="h-2 w-px bg-foreground" />
        <div className="h-3 w-px bg-foreground" />
        <div className="h-2 w-px bg-foreground" />
      </div>

      {/* Architectural dimension line - bottom */}
      <div className="pointer-events-none absolute right-8 -bottom-px left-8 z-10 flex items-center gap-1 opacity-50">
        <div className="h-1 w-1 rounded-full bg-foreground" />
        <div className="h-px flex-1 bg-foreground" />
        <div className="font-mono text-[9px] text-foreground/60 select-none">
          PROFILE SPEC.
        </div>
        <div className="h-px flex-1 bg-foreground" />
        <div className="h-1 w-1 rounded-full bg-foreground" />
      </div>

      <div className="relative z-20 shrink-0 border-r border-edge">
        {/* Avatar frame corner indicators */}
        <div className="pointer-events-none absolute top-2 left-2 h-3 w-3 border-t border-l border-foreground/20" />
        <div className="pointer-events-none absolute top-2 right-2 h-3 w-3 border-t border-r border-foreground/20" />
        <div className="pointer-events-none absolute bottom-2 left-2 h-3 w-3 border-b border-l border-foreground/20" />
        <div className="pointer-events-none absolute right-2 bottom-2 h-3 w-3 border-r border-b border-foreground/20" />

        <div className="mx-0.5 my-[3px]">
          <HoverCard openDelay={100} closeDelay={100}>
            <HoverCardTrigger asChild>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                className="size-32 cursor-pointer rounded-full bg-zinc-800 ring-2 ring-zinc-200 ring-offset-4 ring-offset-background transition-transform duration-200 select-none hover:scale-105 sm:size-40 dark:bg-zinc-900 dark:ring-zinc-700"
                alt={`${USER.displayName}'s avatar`}
                src={USER.avatar}
                fetchPriority="high"
              />
            </HoverCardTrigger>
            <HoverCardContent side="right" align="start" className="w-auto p-0">
              <ProfileStatusTooltip />
            </HoverCardContent>
          </HoverCard>
        </div>
      </div>

      <div className="relative z-20 flex flex-1 flex-col">
        <div
          className={cn(
            "relative flex grow items-end pb-1 pl-4",
            "bg-gradient-to-r from-background via-muted/10 to-background"
          )}
          style={{
            backgroundImage:
              "repeating-linear-gradient(0deg, transparent, transparent 4px, var(--color-edge) 4px, var(--color-edge) 5px)",
            backgroundSize: "100% 5px",
          }}
        >
          {/* Blueprint annotation for specialty */}
          <div className="pointer-events-none absolute top-2 right-2 flex items-center gap-1 opacity-30">
            <div className="h-px w-2 bg-foreground" />
            <div className="h-1 w-1 rounded-full bg-foreground" />
          </div>

          <div className="relative z-10 line-clamp-1 pb-2 font-mono text-xs text-zinc-500 select-none max-sm:hidden dark:text-zinc-500">
            Web Dev • AI • dApps & Blockchain
          </div>
        </div>

        <div className="relative border-t border-edge">
          {/* Technical label */}
          <div className="pointer-events-none absolute -top-2 left-2 bg-background px-1 font-mono text-[9px] text-muted-foreground/60 select-none">
            ID: PROFILE-001
          </div>

          <h1 className="flex items-center py-2 pl-4 text-3xl font-semibold">
            {USER.displayName}
            &nbsp;
            <SimpleTooltip content="Verified">
              <VerifiedIcon className="size-[0.6em] translate-y-px text-info select-none" />
            </SimpleTooltip>
          </h1>

          <div className="relative h-12 border-t border-edge py-2 pl-4 sm:h-auto">
            {/* Blueprint measurement dots - left */}
            <div className="pointer-events-none absolute top-1/2 left-1 flex -translate-y-1/2 flex-col gap-1 opacity-20">
              <div className="h-1 w-1 rounded-full bg-foreground" />
              <div className="h-1 w-1 rounded-full bg-foreground" />
            </div>

            <FlipSentences sentences={USER.flipSentences} />
          </div>
        </div>
      </div>
    </div>
  );
}
