import { InfinityIcon } from "lucide-react";
import Link from "next/link";
import React from "react";

import { Markdown } from "@/components/markdown";
import {
  CollapsibleChevronsIcon,
  CollapsibleContent,
  CollapsibleTrigger,
  CollapsibleWithContext,
} from "@/components/ui/collapsible";
import { Tag } from "@/components/ui/tag";
import { Prose } from "@/components/ui/typography";
import { cn } from "@/lib/utils";

import type { ExperiencePosition } from "../../types/experiences";
import { ExperienceIcon } from "./experience-position-icon";

export function ExperiencePositionItem({
  position,
}: {
  position: ExperiencePosition;
}) {
  const { start, end } = position.employmentPeriod;
  const isOngoing = !end;

  return (
    <CollapsibleWithContext defaultOpen={position.isExpanded}>
      <div className="group/exp rounded-xl border border-border/15 bg-foreground/[0.02] p-4 transition-all duration-300 hover:border-border/30 hover:bg-foreground/[0.04]">
        <CollapsibleTrigger className="block w-full text-left select-none">
          <div className="flex items-start gap-4">
            {/* Icon */}
            <div
              className={cn(
                "flex size-10 shrink-0 items-center justify-center rounded-xl",
                "bg-foreground/[0.04] text-muted-foreground",
                "border border-border/15 transition-all duration-300 group-hover/exp:border-border/25 group-hover/exp:bg-foreground/[0.06]"
              )}
              aria-hidden
            >
              <ExperienceIcon className="size-5" icon={position.icon} />
            </div>

            {/* Content */}
            <div className="min-w-0 flex-1">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <h4 className="font-outfit text-base font-semibold text-foreground/90">
                    {position.title}
                    {position.link && (
                      <Link
                        className="ml-2 align-baseline text-sm font-normal text-info underline underline-offset-4 transition-colors hover:text-info/80"
                        href={position.link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {position.link.label}
                      </Link>
                    )}
                  </h4>

                  {position.organization && (
                    <p className="mt-1 text-sm text-muted-foreground md:hidden">
                      {position.organization}
                    </p>
                  )}
                </div>

                <div className="flex shrink-0 items-center gap-2">
                  {position.organization && (
                    <span className="hidden text-right text-sm text-muted-foreground md:inline">
                      {position.organization}
                    </span>
                  )}
                  <div
                    className="text-muted-foreground transition-transform duration-200 [&_svg]:size-4"
                    aria-hidden
                  >
                    <CollapsibleChevronsIcon />
                  </div>
                </div>
              </div>

              {/* Meta info */}
              <div className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-muted-foreground">
                {position.employmentType && (
                  <span className="font-medium text-foreground/60">
                    {position.employmentType}
                  </span>
                )}
                <span className="flex items-center gap-1 font-mono text-xs">
                  <span>{start}</span>
                  <span>—</span>
                  {isOngoing ? (
                    <InfinityIcon className="size-4 text-info" aria-hidden />
                  ) : (
                    <span>{end}</span>
                  )}
                </span>
              </div>
            </div>
          </div>
        </CollapsibleTrigger>

        <CollapsibleContent className="overflow-hidden duration-300 data-[state=closed]:animate-collapsible-fade-up data-[state=open]:animate-collapsible-fade-down">
          {position.description && (
            <Prose className="mt-4 pl-14">
              <Markdown>{position.description}</Markdown>
            </Prose>
          )}

          {Array.isArray(position.skills) && position.skills.length > 0 && (
            <ul className="mt-3 flex flex-wrap gap-1.5 pl-14">
              {position.skills.map((skill, index) => (
                <li key={index} className="flex">
                  <Tag>{skill}</Tag>
                </li>
              ))}
            </ul>
          )}
        </CollapsibleContent>
      </div>
    </CollapsibleWithContext>
  );
}
