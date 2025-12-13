"use client";

import { Panel, PanelContent, PanelHeader, PanelTitle } from "./panel";

export function About() {
  return (
    <Panel id="about">
      <PanelHeader>
        <PanelTitle>About</PanelTitle>
      </PanelHeader>

      <PanelContent>
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
          {/* Image - Cool Round Style */}
          <div className="relative shrink-0 grayscale dark:grayscale-0">
            <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-[#2c4036] via-[#415d4e] to-[#2c4036] opacity-100 blur-md" />
            <div className="relative aspect-square h-24 w-24 overflow-hidden rounded-full border-2 border-background ring-2 ring-white/10 sm:h-32 sm:w-32">
              <img
                src="/final_about.png"
                alt="About"
                className="h-full w-full object-cover transition-transform duration-500 hover:scale-110"
              />
            </div>
          </div>

          <div className="space-y-3">
            <p className="font-serif text-lg leading-relaxed text-foreground/90 sm:text-xl">
              Full-stack developer and competitive programmer building clean,
              reliable web products.
            </p>

            <p className="text-sm text-foreground/60">
              Building with{" "}
              <span className="text-foreground/80">LLMs & Generative AI</span>,{" "}
              <span className="text-foreground/80">Blockchain</span> (Ethereum,
              Solana), and <span className="text-foreground/80">Web3</span>.
            </p>

            <p className="text-xs text-foreground/40">
              1+ year experience • 10+ projects • Always learning
            </p>
          </div>
        </div>
      </PanelContent>
    </Panel>
  );
}
