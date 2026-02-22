"use client";

import { useState } from "react";

import { SimpleTooltip } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

import { TECH_STACK } from "../data/tech-stack";
import { Panel, PanelContent, PanelHeader, PanelTitle } from "./panel";

type Category = {
  label: string;
  keys: string[];
};

const CATEGORIES: Category[] = [
  {
    label: "Languages",
    keys: [
      "typescript",
      "javascript",
      "python",
      "cpp",
      "java",
      "rust",
      "solidity",
    ],
  },
  {
    label: "Frontend",
    keys: ["react", "nextjs", "tailwindcss", "expressjs"],
  },
  {
    label: "Backend & DB",
    keys: ["nodejs", "mongodb", "postgresql", "mysql", "redis"],
  },
  {
    label: "Blockchain",
    keys: ["ethereum", "solana", "solidity"],
  },
  {
    label: "Infra & Tools",
    keys: ["docker", "git", "github", "aws", "azure", "postman", "npm", "pnpm"],
  },
  {
    label: "AI & ML",
    keys: [
      "tensorflow",
      "pytorch",
      "numpy",
      "pandas",
      "scikit-learn",
      "chatgpt",
    ],
  },
];

function TechIcon({
  techKey,
  title,
  hasTheme,
  size = "md",
}: {
  techKey: string;
  title: string;
  hasTheme?: boolean;
  size?: "sm" | "md";
}) {
  const sizeClass = size === "sm" ? "h-5 w-5" : "h-8 w-8";
  return (
    <>
      {hasTheme ? (
        <>
          <img
            src={`/tech-stack-icons/${techKey}-light.svg`}
            alt={`${title} icon`}
            className={cn(sizeClass, "hidden [html.light_&]:block")}
          />
          <img
            src={`/tech-stack-icons/${techKey}-dark.svg`}
            alt={`${title} icon`}
            className={cn(sizeClass, "hidden [html.dark_&]:block")}
          />
        </>
      ) : (
        <img
          src={`/tech-stack-icons/${techKey}.svg`}
          alt={`${title} icon`}
          className={sizeClass}
        />
      )}
    </>
  );
}

export function TeckStack() {
  const [view, setView] = useState<"icons" | "category">("icons");

  const techMap = new Map(TECH_STACK.map((t) => [t.key, t]));

  return (
    <Panel id="stack">
      <PanelHeader>
        <div className="flex items-center justify-between">
          <PanelTitle>Stack</PanelTitle>
          {/* View toggle */}
          <div className="flex items-center gap-1 rounded-full border border-border/30 bg-muted/20 p-0.5">
            <button
              onClick={() => setView("icons")}
              className={cn(
                "rounded-full px-3 py-1 font-mono text-[10px] tracking-[0.1em] uppercase transition-all duration-200",
                view === "icons"
                  ? "bg-foreground text-background shadow-sm"
                  : "text-muted-foreground/60 hover:text-muted-foreground"
              )}
            >
              Icons
            </button>
            <button
              onClick={() => setView("category")}
              className={cn(
                "rounded-full px-3 py-1 font-mono text-[10px] tracking-[0.1em] uppercase transition-all duration-200",
                view === "category"
                  ? "bg-foreground text-background shadow-sm"
                  : "text-muted-foreground/60 hover:text-muted-foreground"
              )}
            >
              Category
            </button>
          </div>
        </div>
      </PanelHeader>

      <PanelContent>
        {/* ── ICONS VIEW ───────────────────────────────── */}
        {view === "icons" && (
          <div
            className={cn(
              "[--pattern-foreground:var(--color-zinc-950)]/3 dark:[--pattern-foreground:var(--color-white)]/3",
              "bg-[radial-gradient(var(--pattern-foreground)_0.5px,transparent_0)] bg-size-[12px_12px] bg-center",
              "rounded-2xl p-4"
            )}
          >
            <ul className="flex flex-wrap gap-5 select-none">
              {TECH_STACK.map((tech) => (
                <li key={tech.key} className="flex">
                  <SimpleTooltip content={tech.title}>
                    <a
                      href={tech.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={tech.title}
                      className="block transition-all duration-300 hover:scale-110 hover:opacity-70"
                    >
                      <span className="block text-zinc-900 dark:text-zinc-100">
                        <TechIcon
                          techKey={tech.key}
                          title={tech.title}
                          hasTheme={tech.theme}
                          size="md"
                        />
                      </span>
                      <span className="sr-only">{tech.title}</span>
                    </a>
                  </SimpleTooltip>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* ── CATEGORY VIEW (justaditya style) ─────────── */}
        {view === "category" && (
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {CATEGORIES.map((cat) => {
              const seenInCat = new Set<string>();
              const techs = cat.keys
                .map((k) => techMap.get(k))
                .filter((t): t is NonNullable<typeof t> => {
                  if (!t || seenInCat.has(t.key)) return false;
                  seenInCat.add(t.key);
                  return true;
                });

              return (
                <div key={cat.label} className="flex flex-col gap-3">
                  {/* Category header with divider */}
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-[10px] font-semibold tracking-[0.15em] whitespace-nowrap text-muted-foreground/50 uppercase">
                      {cat.label}
                    </span>
                    <div className="h-px flex-1 bg-border/40" />
                  </div>

                  {/* Tech rows */}
                  <div className="flex flex-col gap-2.5">
                    {techs.map((tech) => (
                      <a
                        key={tech.key}
                        href={tech.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={tech.title}
                        className="group flex items-center gap-3 text-foreground/55 transition-colors duration-200 hover:text-foreground/90"
                      >
                        <span className="shrink-0 opacity-60 transition-opacity group-hover:opacity-90">
                          <TechIcon
                            techKey={tech.key}
                            title={tech.title}
                            hasTheme={tech.theme}
                            size="sm"
                          />
                        </span>
                        <span className="text-sm leading-none font-normal">
                          {tech.title}
                        </span>
                      </a>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </PanelContent>
    </Panel>
  );
}
