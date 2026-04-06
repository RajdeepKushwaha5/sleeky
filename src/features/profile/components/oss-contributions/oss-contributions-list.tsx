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
      <div>
        {data.map((contribution) => (
          <div key={contribution.id} className="border-b border-border/25">
            <OSSContributionItem contribution={contribution} />
          </div>
        ))}
      </div>

      <div className="flex justify-center pt-5 pb-1">
        <a
          href={`https://github.com/${GITHUB_USERNAME}`}
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center gap-2 rounded-full border border-border/25 px-6 py-2 text-[13px] font-medium tracking-wide text-foreground transition-all duration-300 hover:border-border/40 hover:bg-foreground/[0.04]"
        >
          See more on GitHub
          <ArrowRightIcon className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
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
