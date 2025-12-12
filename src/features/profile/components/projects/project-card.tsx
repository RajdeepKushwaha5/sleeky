"use client";

import {
  ExternalLink,
  Github,
  Loader2,
  MoveRight,
  Sparkles,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

import { TechIcon } from "@/components/tech-icons";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import type { Project } from "@/features/profile/types/projects";
import { cn } from "@/lib/utils";

export function ProjectCard({
  project,
  shouldPreloadImage,
}: {
  project: Project;
  shouldPreloadImage?: boolean;
}) {
  // Determine status based on data
  // Only show "Live" as per user request
  const isOngoing = false;
  const statusLabel = "Live";

  return (
    <div
      className={cn(
        "group/project relative flex flex-col overflow-hidden rounded-2xl bg-card",
        "border border-border/50 dark:border-white/10",
        "shadow-sm transition-all duration-500",
        "hover:shadow-xl hover:shadow-black/5 dark:hover:shadow-black/20",
        "hover:border-border dark:hover:border-white/20"
      )}
    >
      {/* Gradient border glow on hover */}
      <div className="pointer-events-none absolute -inset-px rounded-2xl bg-gradient-to-br from-white/5 via-transparent to-white/5 opacity-0 transition-opacity duration-500 group-hover/project:opacity-100" />

      {/* Image Section */}
      <div className="relative aspect-[16/10] w-full overflow-hidden">
        {project.logo ? (
          <>
            <Image
              src={project.logo}
              alt={project.title}
              fill
              className="object-cover grayscale transition-all duration-700 group-hover/project:scale-105 group-hover/project:grayscale-0"
              priority={shouldPreloadImage}
              unoptimized
            />
            {/* Subtle gradient overlay at bottom for text contrast */}
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/20 to-transparent" />
          </>
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-muted/30 to-muted/10">
            <span className="text-7xl font-black text-muted-foreground/10 select-none">
              {project.title.charAt(0)}
            </span>
          </div>
        )}

        {/* Status Badge - Glass morphism style */}
        <div className="absolute top-3 left-3 z-10 flex items-center gap-1.5 rounded-full border border-white/20 bg-black/50 px-2.5 py-1 backdrop-blur-md">
          <div className={cn("relative flex h-1.5 w-1.5")}>
            <span
              className={cn(
                "absolute inline-flex h-full w-full animate-ping rounded-full opacity-75",
                isOngoing ? "bg-amber-400" : "bg-emerald-400"
              )}
            ></span>
            <span
              className={cn(
                "relative inline-flex h-1.5 w-1.5 rounded-full",
                isOngoing ? "bg-amber-500" : "bg-emerald-500"
              )}
            ></span>
          </div>
          <span className="text-[9px] font-semibold tracking-wider text-white uppercase">
            {statusLabel}
          </span>
        </div>

        {/* Hover Actions Overlay */}
        <div className="absolute inset-0 flex items-center justify-center gap-3 bg-black/50 opacity-0 backdrop-blur-sm transition-all duration-300 group-hover/project:opacity-100">
          {project.githubUrl && (
            <Link
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex size-12 items-center justify-center rounded-full bg-white text-black shadow-lg transition-all duration-300 hover:scale-110"
              aria-label="View Source"
            >
              <Github className="size-5" />
            </Link>
          )}
          <Link
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="flex size-12 items-center justify-center rounded-full bg-black text-white shadow-lg ring-1 ring-white/20 transition-all duration-300 hover:scale-110"
            aria-label="Visit Project"
          >
            <ExternalLink className="size-5" />
          </Link>
        </div>
      </div>

      {/* Content Section */}
      <div className="flex flex-1 flex-col gap-3 p-5">
        <div className="space-y-1.5">
          <Link
            href={project.link}
            target="_blank"
            className="group/title block"
          >
            <h3 className="text-base leading-snug font-semibold tracking-tight text-foreground underline-offset-4 transition-colors group-hover/title:underline">
              {project.title}
            </h3>
          </Link>
          <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
            <span>{project.period.start}</span>
            <span className="text-muted-foreground/40">→</span>
            <span>{project.period.end || "Present"}</span>
          </div>
        </div>

        {/* Tech Stack - Refined pills */}
        <div className="flex flex-wrap gap-1.5">
          {project.skills.slice(0, 4).map((tech) => (
            <span
              key={tech}
              className="inline-flex items-center gap-1 rounded-full bg-muted/50 px-2 py-0.5 text-[10px] font-medium text-muted-foreground ring-1 ring-border/50 ring-inset dark:ring-white/10"
            >
              <TechIcon name={tech} className="size-2.5" />
              {tech}
            </span>
          ))}
          {project.skills.length > 4 && (
            <span className="inline-flex items-center rounded-full bg-muted/30 px-2 py-0.5 text-[10px] text-muted-foreground">
              +{project.skills.length - 4}
            </span>
          )}
        </div>

        {/* View Details Footer */}
        <div className="mt-auto">
          <Dialog>
            <DialogTrigger asChild>
              <button className="group/btn flex w-full items-center justify-between border-t border-border/40 pt-3 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground">
                <span>View Details</span>
                <MoveRight className="size-3 transition-transform duration-300 group-hover/btn:translate-x-1" />
              </button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <div className="mb-2 flex items-center gap-3">
                  {project.logo && (
                    <div className="relative size-10 overflow-hidden rounded-md border border-border/50">
                      <Image
                        src={project.logo}
                        alt={project.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                  <div>
                    <DialogTitle className="text-xl">
                      {project.title}
                    </DialogTitle>
                    <DialogDescription className="text-xs">
                      {project.period.start} - {project.period.end || "Present"}
                    </DialogDescription>
                  </div>
                </div>
              </DialogHeader>

              <div className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  {project.skills.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-md bg-secondary/30 px-2 py-1 text-xs font-medium text-secondary-foreground"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="prose prose-sm max-w-none dark:prose-invert">
                  <p className="text-sm leading-relaxed whitespace-pre-line text-muted-foreground">
                    {project.description}
                  </p>
                </div>

                <div className="flex gap-3 pt-2">
                  {project.githubUrl && (
                    <Link
                      href={project.githubUrl}
                      target="_blank"
                      className="inline-flex items-center gap-2 rounded-lg border border-border bg-secondary/50 px-4 py-2 text-sm font-medium transition-colors hover:bg-secondary"
                    >
                      <Github className="size-4" />
                      View Source
                    </Link>
                  )}
                  <Link
                    href={project.link}
                    target="_blank"
                    className="inline-flex items-center gap-2 rounded-lg bg-black px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-zinc-800 dark:bg-white dark:text-black dark:hover:bg-zinc-200"
                  >
                    <ExternalLink className="size-4" />
                    Visit Live
                  </Link>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
}
