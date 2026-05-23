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
    <div className="group/oss flex items-center transition-colors hover:bg-foreground/[0.025]">
      <div
        className="mx-4 flex size-8 shrink-0 items-center justify-center text-foreground/34 transition-colors group-hover/oss:text-foreground/60"
        aria-hidden
      >
        <GitPullRequestArrowIcon className="size-4" />
      </div>

      <div className="flex flex-1 items-center gap-3 overflow-hidden py-4 pr-2 sm:py-5 sm:pr-4">
        <div className="min-w-0 flex-1">
          <h3 className="mb-1 truncate leading-snug font-medium text-foreground/82 transition-colors group-hover/oss:text-foreground">
            {contribution.title}
            <span className="ml-2 inline-flex rounded-md border border-border/15 bg-foreground/[0.03] px-1.5 py-0.5 align-middle font-mono text-[0.65rem] font-medium text-muted-foreground">
              {contribution.year}
            </span>
          </h3>
          <p className="text-sm text-foreground/45">
            Contributed to{" "}
            <span className="font-medium text-foreground/58">
              {contribution.organization}
            </span>
          </p>
        </div>

        <a
          href={contribution.url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex size-8 shrink-0 items-center justify-center text-foreground/32 transition-all duration-200 hover:text-foreground"
          aria-label={`View ${contribution.title}`}
        >
          <ArrowUpRightIcon className="size-4" />
        </a>
      </div>
    </div>
  );
}
