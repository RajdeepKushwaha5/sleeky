"use client";

import { Panel, PanelContent, PanelHeader, PanelTitle } from "./panel";

export function About() {
  return (
    <Panel id="about">
      <PanelHeader>
        <PanelTitle>About</PanelTitle>
      </PanelHeader>

      <PanelContent>
        <div className="flex flex-col gap-7 sm:flex-row sm:items-center">
          {/* Image - Premium Round Style */}
          <div className="relative shrink-0 grayscale transition-all duration-700 hover:grayscale-0 dark:grayscale-0">
            <div className="absolute -inset-0.5 rounded-full bg-gradient-to-br from-foreground/[0.06] to-foreground/[0.02] blur-sm" />
            <div className="relative aspect-square h-24 w-24 overflow-hidden rounded-full ring-[3px] ring-border/40 ring-offset-[4px] ring-offset-background sm:h-32 sm:w-32">
              <img
                src="/final_about.png"
                alt="About"
                className="h-full w-full object-cover transition-transform duration-700 ease-out hover:scale-105"
              />
            </div>
          </div>

          <div className="space-y-4">
            <p className="font-serif text-lg leading-[1.6] text-foreground/90 sm:text-xl">
              Full-stack developer and competitive programmer building clean,
              reliable web products.
            </p>

            <p className="text-sm leading-relaxed text-foreground/55">
              Building with{" "}
              <span className="font-medium text-foreground/75">
                LLMs & Generative AI
              </span>
              ,{" "}
              <span className="font-medium text-foreground/75">Blockchain</span>{" "}
              (Ethereum, Solana), and{" "}
              <span className="font-medium text-foreground/75">Web3</span>.
            </p>

            <div className="flex items-center gap-4 pt-1">
              <span className="inline-flex items-center rounded-full border border-border/40 bg-muted/40 px-3 py-1 text-[11px] font-medium tracking-wide text-muted-foreground">
                1+ year exp
              </span>
              <span className="inline-flex items-center rounded-full border border-border/40 bg-muted/40 px-3 py-1 text-[11px] font-medium tracking-wide text-muted-foreground">
                10+ projects
              </span>
              <span className="inline-flex items-center rounded-full border border-border/40 bg-muted/40 px-3 py-1 text-[11px] font-medium tracking-wide text-muted-foreground">
                Always learning
              </span>
            </div>
          </div>
        </div>
      </PanelContent>
    </Panel>
  );
}
