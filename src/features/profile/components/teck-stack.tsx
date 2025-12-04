import React from "react";

import { SimpleTooltip } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

import { TECH_STACK } from "../data/tech-stack";
import { Panel, PanelContent, PanelHeader, PanelTitle } from "./panel";

export function TeckStack() {
  return (
    <Panel id="stack">
      <PanelHeader>
        <PanelTitle>Stack</PanelTitle>
      </PanelHeader>

      <PanelContent
        className={cn(
          "[--pattern-foreground:var(--color-zinc-950)]/5 dark:[--pattern-foreground:var(--color-white)]/5",
          "bg-[radial-gradient(var(--pattern-foreground)_1px,transparent_0)] bg-size-[10px_10px] bg-center",
          "bg-zinc-950/0.75 dark:bg-white/0.75"
        )}
      >
        <ul className="flex flex-wrap gap-4 select-none">
          {TECH_STACK.map((tech) => {
            return (
              <li key={tech.key} className="flex">
                <SimpleTooltip content={tech.title}>
                  <a
                    href={tech.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={tech.title}
                    className="block transition-opacity hover:opacity-70"
                  >
                    <span className="block text-zinc-900 dark:text-zinc-100 [&>img]:w-8 [&>img]:h-8">
                      {tech.theme ? (
                        <>
                          <img
                            src={`/tech-stack-icons/${tech.key}-light.svg`}
                            alt={`${tech.title} light icon`}
                            className="hidden [html.light_&]:block"
                          />
                          <img
                            src={`/tech-stack-icons/${tech.key}-dark.svg`}
                            alt={`${tech.title} dark icon`}
                            className="hidden [html.dark_&]:block"
                          />
                        </>
                      ) : (
                        <img
                          src={`/tech-stack-icons/${tech.key}.svg`}
                          alt={`${tech.title} icon`}
                        />
                      )}
                    </span>
                    <span className="sr-only">{tech.title}</span>
                  </a>
                </SimpleTooltip>
              </li>
            );
          })}
        </ul>
      </PanelContent>
    </Panel>
  );
}
