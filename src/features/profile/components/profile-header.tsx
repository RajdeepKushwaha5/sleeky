import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { SimpleTooltip } from "@/components/ui/tooltip";
import { USER } from "@/features/profile/data/user";
import { FlipSentences } from "@/registry/flip-sentences";

import { ProfileStatusTooltip } from "./profile-status-tooltip";
import { VerifiedIcon } from "./verified-icon";

export function ProfileHeader() {
  return (
    <div className="relative mx-2 my-5 flex flex-col items-center overflow-hidden rounded-[1.75rem] border border-border/30 bg-card/50 p-5 text-center backdrop-blur-sm sm:flex-row sm:p-8 sm:text-left dark:bg-card/40">
      {/* Subtle gradient decoration */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-foreground/[0.01] via-transparent to-foreground/[0.02]" />

      {/* Avatar */}
      <div className="relative shrink-0 pb-5 sm:pr-8 sm:pb-0">
        <HoverCard openDelay={100} closeDelay={100}>
          <HoverCardTrigger asChild>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              className="size-28 cursor-pointer rounded-full bg-zinc-800 ring-[3px] ring-border/60 ring-offset-[5px] ring-offset-background grayscale transition-all duration-500 select-none hover:scale-[1.03] hover:grayscale-[50%] sm:size-36 dark:bg-zinc-900 dark:grayscale-0 dark:hover:grayscale-0"
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

      {/* Info */}
      <div className="relative flex flex-1 flex-col items-center justify-center sm:items-start">
        {/* Specialty */}
        <div className="mb-3 inline-flex items-center rounded-full border border-border/40 bg-muted/50 px-3 py-1 text-[11px] font-medium tracking-[0.08em] text-muted-foreground uppercase">
          Web Dev &bull; AI &bull; dApps &amp; Blockchain
        </div>

        {/* Name */}
        <h1 className="mb-3 flex flex-wrap items-center justify-center gap-2.5 font-serif text-2xl leading-tight font-semibold text-foreground/95 italic sm:justify-start sm:text-[2.5rem]">
          {USER.displayName}
          <SimpleTooltip content="Verified">
            <VerifiedIcon className="size-[0.45em] translate-y-px text-info select-none" />
          </SimpleTooltip>
        </h1>

        {/* Flip sentences */}
        <div className="font-light text-muted-foreground/80">
          <FlipSentences sentences={USER.flipSentences} />
        </div>
      </div>
    </div>
  );
}
