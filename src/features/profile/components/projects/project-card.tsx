"use client";

import { ExternalLink, Github, MoveRight } from "lucide-react";
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
import { hasCaseStudy } from "@/features/projects/data/case-studies";
import { cn } from "@/lib/utils";

export function ProjectCard({
  project,
  shouldPreloadImage,
}: {
  project: Project;
  shouldPreloadImage?: boolean;
}) {
  return (
    <div
      className={cn(
        "group/project flex h-full flex-col overflow-hidden rounded-2xl border border-border/50 bg-card/80",
        "transition-all duration-500 ease-out",
        "hover:border-border hover:bg-card hover:shadow-xl hover:shadow-black/[0.04] dark:hover:shadow-black/30",
        "hover:-translate-y-1"
      )}
    >
      {/* Image Section */}
      <div className="relative aspect-[16/10] w-full overflow-hidden">
        {project.logo ? (
          <Image
            src={project.logo}
            alt={project.title}
            fill
            className="object-cover grayscale transition-all duration-500 group-hover/project:scale-105 group-hover/project:grayscale-0 dark:grayscale-0"
            priority={shouldPreloadImage}
            unoptimized
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-muted/50 to-muted/20">
            <span className="font-serif text-6xl font-medium text-foreground/10 italic select-none">
              {project.title.charAt(0)}
            </span>
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className="flex flex-1 flex-col gap-3 p-5">
        <div className="space-y-1.5">
          <h3 className="font-serif text-lg font-medium text-foreground/90 italic transition-colors group-hover/project:text-foreground">
            {project.title}
          </h3>
          <p className="font-mono text-xs text-foreground/40">
            {project.period.start}
          </p>
        </div>

        {/* Description */}
        {project.description && (
          <p className="line-clamp-2 text-sm text-foreground/60">
            {project.description.split("\n")[0]}
          </p>
        )}

        {/* Tech Stack with Icons */}
        <div className="flex flex-wrap items-center gap-2 pt-1">
          {project.skills.slice(0, 4).map((tech) => (
            <div
              key={tech}
              className="group/tech flex items-center gap-1.5 rounded-full border border-dashed border-primary/40 bg-gradient-to-r from-background to-muted/50 px-2.5 py-1 shadow-md shadow-primary/10"
              title={tech}
            >
              <TechIcon
                name={tech}
                className="size-4 transition-transform duration-300 group-hover/tech:scale-110"
              />
              <span className="text-[10px] font-medium text-foreground/70 transition-colors group-hover/tech:text-foreground">
                {tech}
              </span>
            </div>
          ))}
          {project.skills.length > 4 && (
            <span className="inline-flex items-center rounded-full border border-border/20 bg-muted/30 px-2.5 py-1 text-[10px] font-medium text-foreground/50">
              +{project.skills.length - 4}
            </span>
          )}
        </div>

        {/* View Details Footer */}
        <div className="mt-auto pt-2">
          {hasCaseStudy(project.id) ? (
            <Link
              href={`/projects/${project.id}`}
              className="group/btn flex w-full items-center justify-between text-xs font-medium text-foreground/40 transition-colors hover:text-foreground/70"
            >
              <span>View Case Study</span>
              <MoveRight className="size-3 transition-transform duration-300 group-hover/btn:translate-x-1" />
            </Link>
          ) : (
            <Dialog>
              <DialogTrigger asChild>
                <button className="group/btn flex w-full items-center justify-between text-xs font-medium text-foreground/40 transition-colors hover:text-foreground/70">
                  <span>View Details</span>
                  <MoveRight className="size-3 transition-transform duration-300 group-hover/btn:translate-x-1" />
                </button>
              </DialogTrigger>
              <DialogContent className="max-h-[85vh] w-[calc(100vw-2rem)] max-w-2xl overflow-y-auto rounded-2xl p-4 sm:p-6">
                <DialogHeader>
                  <div className="mb-2 flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-3">
                    {project.logo && (
                      <div className="relative size-12 shrink-0 overflow-hidden rounded-xl">
                        <Image
                          src={project.logo}
                          alt={project.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                    )}
                    <div className="text-left">
                      <DialogTitle className="font-serif text-xl leading-tight font-medium italic">
                        {project.title}
                      </DialogTitle>
                      <DialogDescription className="mt-1 font-mono text-xs">
                        {project.period.start} -{" "}
                        {project.period.end || "Present"}
                      </DialogDescription>
                    </div>
                  </div>
                </DialogHeader>

                <div className="space-y-4">
                  <div className="flex flex-wrap gap-2">
                    {project.skills.map((tech) => (
                      <span
                        key={tech}
                        className="rounded-full bg-foreground/5 px-3 py-1 text-xs font-medium text-foreground/60"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="prose prose-sm max-w-none dark:prose-invert">
                    <p className="text-sm leading-relaxed whitespace-pre-line text-foreground/70">
                      {project.description}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-3 pt-2">
                    {project.githubUrl && (
                      <Link
                        href={project.githubUrl}
                        target="_blank"
                        className="inline-flex flex-1 items-center justify-center gap-2 rounded-full border border-border/50 bg-card/60 px-4 py-2 text-sm font-medium transition-colors hover:bg-accent sm:flex-none"
                      >
                        <Github className="size-4" />
                        View Source
                      </Link>
                    )}
                    <Link
                      href={project.link}
                      target="_blank"
                      className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-foreground px-4 py-2 text-sm font-medium text-background transition-colors hover:bg-foreground/90 sm:flex-none"
                    >
                      <ExternalLink className="size-4" />
                      Visit Live
                    </Link>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          )}
        </div>
      </div>
    </div>
  );
}
