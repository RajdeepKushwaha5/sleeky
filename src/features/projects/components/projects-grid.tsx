"use client";

import { AnimatePresence, motion } from "motion/react";
import React from "react";

import type { Project } from "@/features/profile/types/projects";
import { cn } from "@/lib/utils";

import {
  getProjectCategory,
  PROJECT_CATEGORIES,
  type ProjectCategory,
} from "../lib/categorize";
import { ProjectItem } from "./project-item";

type Filter = "All" | ProjectCategory;

export function ProjectsGrid({ projects }: { projects: Project[] }) {
  const [active, setActive] = React.useState<Filter>("All");

  // Only show filter chips for categories that actually have projects.
  const filters = React.useMemo<Filter[]>(() => {
    const present = new Set(projects.map(getProjectCategory));
    return ["All", ...PROJECT_CATEGORIES.filter((c) => present.has(c))];
  }, [projects]);

  const counts = React.useMemo(() => {
    const map: Record<string, number> = { All: projects.length };
    for (const project of projects) {
      const category = getProjectCategory(project);
      map[category] = (map[category] ?? 0) + 1;
    }
    return map;
  }, [projects]);

  const visible =
    active === "All"
      ? projects
      : projects.filter((p) => getProjectCategory(p) === active);

  return (
    <section>
      {/* Filter chips */}
      <div className="mb-6 flex flex-wrap items-center gap-2">
        {filters.map((filter) => {
          const isActive = active === filter;
          return (
            <button
              key={filter}
              type="button"
              onClick={() => setActive(filter)}
              aria-pressed={isActive}
              className={cn(
                "inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 font-mono text-[11px] tracking-wide uppercase transition-colors duration-200",
                isActive
                  ? "border-foreground/80 bg-foreground text-background"
                  : "border-border/20 bg-foreground/[0.02] text-foreground/55 hover:border-foreground/30 hover:text-foreground"
              )}
            >
              {filter}
              <span
                className={cn(
                  "text-[9px]",
                  isActive ? "text-background/60" : "text-foreground/30"
                )}
              >
                {counts[filter] ?? 0}
              </span>
            </button>
          );
        })}
      </div>

      {/* Grid */}
      <motion.div
        layout
        className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
      >
        <AnimatePresence mode="popLayout">
          {visible.map((project, index) => (
            <motion.div
              key={project.id}
              layout
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <ProjectItem project={project} shouldPreloadImage={index < 6} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}
