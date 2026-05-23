import dayjs from "dayjs";
import { ArrowUpRightIcon, ChevronDownIcon } from "lucide-react";

import { Markdown } from "@/components/markdown";
import {
  CollapsibleContent,
  CollapsibleTrigger,
  CollapsibleWithContext,
} from "@/components/ui/collapsible";
import { Prose } from "@/components/ui/typography";
import { cn } from "@/lib/utils";

import type { Award } from "../../types/awards";

const PRIZE_RANK: Record<string, string> = {
  "1st Place": "01",
  Winner: "01",
  "Runner Up": "02",
  "2nd Place": "02",
  "3rd Place": "03",
  Finalist: "FN",
  Participant: "—",
};

function getPrizeCode(prize: string): string {
  return PRIZE_RANK[prize] ?? prize.slice(0, 2).toUpperCase();
}

export function AwardItem({
  className,
  award,
}: {
  className?: string;
  award: Award;
}) {
  const canExpand = !!award.description;

  return (
    <CollapsibleWithContext disabled={!canExpand} asChild>
      <div className={cn("border-b border-foreground/[0.055]", className)}>
        <CollapsibleTrigger
          className="group/award flex w-full items-center gap-4 py-4 text-left select-none"
          disabled={!canExpand}
        >
          {/* Prize rank label */}
          <span className="w-6 shrink-0 font-mono text-[10px] text-foreground/25 tabular-nums">
            {getPrizeCode(award.prize)}
          </span>

          {/* Main info */}
          <div className="min-w-0 flex-1">
            <h3 className="truncate text-[13.5px] font-medium text-foreground/80 group-hover/award:text-foreground/95">
              {award.title}
            </h3>
            <div className="mt-0.5 flex flex-wrap items-center gap-x-2 font-mono text-[10px] text-foreground/30">
              <span>{award.prize}</span>
              <span className="text-foreground/15">·</span>
              <time dateTime={dayjs(award.date).toISOString()}>
                {dayjs(award.date).format("MM.YYYY")}
              </time>
              <span className="text-foreground/15">·</span>
              <span>{award.grade}</span>
            </div>
          </div>

          {/* Reference link */}
          {award.referenceLink && (
            <a
              href={award.referenceLink}
              target="_blank"
              rel="noopener"
              onClick={(e) => e.stopPropagation()}
              className="shrink-0 text-foreground/25 transition-colors hover:text-foreground/60"
              aria-label="Open reference"
            >
              <ArrowUpRightIcon className="size-3.5" aria-hidden />
            </a>
          )}

          {/* Expand chevron */}
          {canExpand && (
            <ChevronDownIcon
              className="size-3.5 shrink-0 text-foreground/20 transition-transform duration-200 group-data-[state=open]/award:rotate-180"
              aria-hidden
            />
          )}
        </CollapsibleTrigger>

        {canExpand && (
          <CollapsibleContent className="overflow-hidden duration-300 data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down">
            <Prose className="pb-4 pl-10 text-[13px] text-foreground/50">
              <Markdown>{award.description}</Markdown>
            </Prose>
          </CollapsibleContent>
        )}
      </div>
    </CollapsibleWithContext>
  );
}
