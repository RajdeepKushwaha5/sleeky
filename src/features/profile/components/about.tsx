"use client";

import { motion } from "motion/react";

import { Panel, PanelContent, PanelHeader, PanelTitle } from "./panel";

export function About() {
  return (
    <Panel id="about">
      <PanelHeader>
        <PanelTitle>About</PanelTitle>
      </PanelHeader>

      <PanelContent>
        <div className="flex flex-col items-center gap-6 text-center sm:flex-row sm:items-start sm:gap-7 sm:text-left">
          {/* Image - Premium Round Style */}
          <motion.div
            className="relative shrink-0 grayscale transition-all duration-700 hover:grayscale-0 dark:grayscale-0"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <div className="absolute -inset-0.5 rounded-full bg-gradient-to-br from-foreground/[0.06] to-foreground/[0.02] blur-sm" />
            <div className="relative aspect-square h-24 w-24 overflow-hidden rounded-full ring-[3px] ring-border/40 ring-offset-[4px] ring-offset-background sm:h-28 sm:w-28">
              <img
                src="/final_about.png"
                alt="About"
                className="h-full w-full object-cover transition-transform duration-700 ease-out hover:scale-105"
              />
            </div>
          </motion.div>

          <div className="flex-1 space-y-3">
            <p className="font-serif text-lg leading-[1.65] text-foreground/90 sm:text-xl">
              Full-stack developer and{" "}
              <a
                href="https://en.wikipedia.org/wiki/Competitive_programming"
                target="_blank"
                rel="noopener noreferrer"
                className="underline decoration-foreground/30 underline-offset-3 transition-colors hover:decoration-foreground/60"
              >
                competitive programmer
              </a>{" "}
              building clean, reliable web products — from idea to production.
            </p>

            <p className="text-sm leading-relaxed text-foreground/55">
              Currently deep into{" "}
              <a
                href="https://en.wikipedia.org/wiki/Large_language_model"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-foreground/80 underline decoration-foreground/20 underline-offset-3 transition-colors hover:decoration-foreground/50"
              >
                LLMs &amp; Generative AI
              </a>
              , crafting smart integrations that actually work. Equally
              comfortable in the{" "}
              <a
                href="https://en.wikipedia.org/wiki/Blockchain"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-foreground/80 underline decoration-foreground/20 underline-offset-3 transition-colors hover:decoration-foreground/50"
              >
                Blockchain &amp; Web3
              </a>{" "}
              space — writing{" "}
              <a
                href="https://en.wikipedia.org/wiki/Solidity"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-foreground/80 underline decoration-foreground/20 underline-offset-3 transition-colors hover:decoration-foreground/50"
              >
                Solidity
              </a>{" "}
              contracts, building on{" "}
              <a
                href="https://en.wikipedia.org/wiki/Ethereum"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-foreground/80 underline decoration-foreground/20 underline-offset-3 transition-colors hover:decoration-foreground/50"
              >
                Ethereum
              </a>{" "}
              &amp; Solana, and shipping dApps with real users.
            </p>

            <p className="text-[12px] leading-relaxed text-muted-foreground/45 italic">
              ↳ always building something new —{" "}
              <a
                href="#projects"
                className="underline underline-offset-3 transition-colors hover:text-muted-foreground/70"
              >
                see projects
              </a>
            </p>
          </div>
        </div>
      </PanelContent>
    </Panel>
  );
}
