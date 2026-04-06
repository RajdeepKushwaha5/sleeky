"use client";

import { ArrowUpRightIcon, GitPullRequestArrowIcon } from "lucide-react";
import React from "react";

import type { OSSContribution } from "../../types/oss-contributions";

export function OSSContributionItem({
  contribution,
}: {
  contribution: OSSContribution;
}) {
  return (
    <div className="group/oss flex items-center hover:bg-accent2">
      <div
        className="mx-4 flex size-6 shrink-0 items-center justify-center"
        aria-hidden
      >
        <GitPullRequestArrowIcon className="size-4 text-purple-400 dark:text-purple-300/80" />
      </div>

      <div className="flex flex-1 items-center gap-3 border-l border-dashed border-border/25 py-3.5 pr-2 pl-4">
        <div className="min-w-0 flex-1">
          <h3 className="mb-0.5 truncate leading-snug font-medium text-foreground/90">
            {contribution.title}
            <span className="ml-2 inline-flex rounded-md border border-border/30 bg-muted/50 px-1.5 py-0.5 align-middle font-mono text-[0.65rem] font-medium text-muted-foreground">
              {contribution.year}
            </span>
          </h3>
          <p className="text-sm text-muted-foreground">
            Contributed to{" "}
            <span className="font-medium text-foreground/60">
              {contribution.organization}
            </span>
          </p>
        </div>

        <a
          href={contribution.url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex size-8 shrink-0 items-center justify-center rounded-lg border border-border/30 bg-card/40 text-muted-foreground transition-all duration-200 hover:border-border/60 hover:bg-card/80 hover:text-foreground"
          aria-label={`View ${contribution.title}`}
        >
          <ArrowUpRightIcon className="size-4" />
        </a>
      </div>
    </div>
  );
}
