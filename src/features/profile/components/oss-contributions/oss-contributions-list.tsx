"use client";

import { ArrowRightIcon, LoaderIcon } from "lucide-react";
import { use } from "react";

import { GITHUB_USERNAME } from "@/config/site";

import type { OSSContribution } from "../../types/oss-contributions";
import { OSSContributionItem } from "./oss-contribution-item";

export function OSSContributionsList({
  contributions,
}: {
  contributions: Promise<OSSContribution[]>;
}) {
  const data = use(contributions);

  return (
    <>
      <div className="border-t border-foreground/[0.06]">
        {data.map((contribution) => (
          <div
            key={contribution.id}
            className="border-b border-foreground/[0.06]"
          >
            <OSSContributionItem contribution={contribution} />
          </div>
        ))}
      </div>

      <div className="flex justify-center pt-6 pb-1">
        <a
          href={`https://github.com/${GITHUB_USERNAME}`}
          target="_blank"
          rel="noopener noreferrer"
          className="quiet-action group"
        >
          See more on GitHub
          <ArrowRightIcon />
        </a>
      </div>
    </>
  );
}

export function OSSContributionsFallback() {
  return (
    <div className="flex h-[200px] w-full items-center justify-center">
      <LoaderIcon className="animate-spin text-muted-foreground" />
    </div>
  );
}
