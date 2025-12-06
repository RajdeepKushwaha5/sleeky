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
    <div className="screen-line-after flex border-x border-edge">
      <div className="shrink-0 border-r border-edge">
        <div className="mx-0.5 my-[3px]">
          <HoverCard openDelay={100} closeDelay={100}>
            <HoverCardTrigger asChild>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                className="size-32 cursor-pointer rounded-full bg-zinc-800 ring-2 ring-zinc-200 ring-offset-4 ring-offset-background transition-transform duration-200 select-none hover:scale-105 dark:bg-zinc-900 dark:ring-zinc-700 sm:size-40"
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

      <div className="flex flex-1 flex-col">
        <div
          className={cn(
            "flex grow items-end pb-1 pl-4",
            "bg-[repeating-linear-gradient(315deg,var(--pattern-foreground)_0,var(--pattern-foreground)_1px,transparent_0,transparent_50%)] bg-size-[10px_10px] [--pattern-foreground:var(--color-edge)]/56"
          )}
        >
          <div className="line-clamp-1 font-mono text-xs text-zinc-300 select-none max-sm:hidden dark:text-zinc-700">
            Web Dev • AI • dApps & Blockchain
          </div>
        </div>

        <div className="border-t border-edge">
          <h1 className="flex items-center pl-4 text-3xl font-semibold">
            {USER.displayName}
            &nbsp;
            <SimpleTooltip content="Verified">
              <VerifiedIcon className="size-[0.6em] translate-y-px text-info select-none" />
            </SimpleTooltip>
          </h1>

          <div className="h-12 border-t border-edge py-1 pl-4 sm:h-auto">
            <FlipSentences sentences={USER.flipSentences} />
          </div>
        </div>
      </div>
    </div>
  );
}
