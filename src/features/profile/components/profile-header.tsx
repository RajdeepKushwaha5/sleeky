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
    <div className="relative mx-2 my-4 flex overflow-hidden rounded-2xl bg-card/60 p-6">
      {/* Avatar */}
      <div className="relative shrink-0 pr-6">
        <HoverCard openDelay={100} closeDelay={100}>
          <HoverCardTrigger asChild>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              className="size-28 cursor-pointer rounded-full bg-zinc-800 ring-2 ring-border ring-offset-4 ring-offset-background transition-transform duration-200 grayscale dark:grayscale-0 select-none hover:scale-105 sm:size-36 dark:bg-zinc-900"
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
      <div className="relative flex flex-1 flex-col justify-center">
        {/* Specialty */}
        <div className="mb-2 text-sm text-muted-foreground max-sm:hidden">
          Web Dev • AI • dApps & Blockchain
        </div>

        {/* Name */}
        <h1 className="mb-3 flex items-center font-serif text-3xl font-medium italic text-foreground/90 sm:text-4xl">
          {USER.displayName}
          &nbsp;
          <SimpleTooltip content="Verified">
            <VerifiedIcon className="size-[0.5em] translate-y-px text-info select-none" />
          </SimpleTooltip>
        </h1>

        {/* Flip sentences */}
        <div className="text-muted-foreground">
          <FlipSentences sentences={USER.flipSentences} />
        </div>
      </div>
    </div>
  );
}

