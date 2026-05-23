"use client";

import { ExternalLink, Github, MoveRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

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

export function ProjectCard({
  project,
  shouldPreloadImage,
}: {
  project: Project;
  shouldPreloadImage?: boolean;
}) {
  const [title, subtitle = "Software Application"] = project.title.split(" – ");
  const year = project.period.start.split("-")[0];
  const hasStudy = hasCaseStudy(project.id);

  const action = hasStudy ? (
    <Link
      href={`/projects/${project.id}`}
      className="group/action inline-flex items-center gap-1 border border-foreground/10 px-2.5 py-1 font-mono text-[9px] text-foreground/58 transition-all hover:border-foreground/24 hover:text-foreground"
    >
      Case Study
      <MoveRight className="size-3 transition-transform group-hover/action:translate-x-0.5" />
    </Link>
  ) : (
    <Dialog>
      <DialogTrigger asChild>
        <button
          type="button"
          className="group/action inline-flex cursor-pointer items-center gap-1 border border-foreground/10 px-2.5 py-1 font-mono text-[9px] text-foreground/58 transition-all hover:border-foreground/24 hover:text-foreground"
        >
          Details
          <MoveRight className="size-3 transition-transform group-hover/action:translate-x-0.5" />
        </button>
      </DialogTrigger>
      <DialogContent className="max-h-[85vh] w-[calc(100vw-2rem)] max-w-2xl overflow-y-auto rounded-lg border-foreground/10 bg-background p-4 text-foreground sm:p-6">
        <DialogHeader>
          <div className="mb-2 flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-3">
            {project.logo && (
              <div className="relative size-12 shrink-0 overflow-hidden rounded-lg border border-foreground/10">
                <Image
                  src={project.logo}
                  alt={project.title}
                  fill
                  className="object-cover"
                  unoptimized
                />
              </div>
            )}
            <div className="text-left">
              <DialogTitle className="font-serif text-xl leading-tight font-medium text-foreground italic">
                {project.title}
              </DialogTitle>
              <DialogDescription className="mt-1 font-mono text-xs text-foreground/50">
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
                className="border border-foreground/10 bg-foreground/[0.04] px-3 py-1 font-mono text-xs text-foreground/70"
              >
                {tech}
              </span>
            ))}
          </div>

          <p className="text-sm leading-relaxed whitespace-pre-line text-foreground/70">
            {project.description}
          </p>

          <div className="flex flex-wrap gap-3 pt-2">
            {project.githubUrl && (
              <Link
                href={project.githubUrl}
                target="_blank"
                className="inline-flex flex-1 items-center justify-center gap-2 border border-foreground/10 bg-foreground/[0.04] px-4 py-2 font-mono text-xs text-foreground transition-colors hover:bg-foreground/[0.08] sm:flex-none"
              >
                <Github className="size-4" />
                View Source
              </Link>
            )}
            <Link
              href={project.link}
              target="_blank"
              className="inline-flex flex-1 items-center justify-center gap-2 bg-foreground px-4 py-2 font-mono text-xs font-semibold text-background transition-opacity hover:opacity-88 sm:flex-none"
            >
              <ExternalLink className="size-4" />
              Visit Live
            </Link>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );

  return (
    <article className="group/project flex min-h-full flex-col overflow-hidden border border-foreground/[0.08] bg-foreground/[0.018] transition-colors duration-200 hover:bg-foreground/[0.04]">
      <div className="relative overflow-hidden border-b border-foreground/[0.06] bg-foreground/[0.025] select-none">
        {project.logo ? (
          <Image
            src={project.logo}
            alt={project.title}
            width={1200}
            height={630}
            priority={shouldPreloadImage}
            unoptimized
            className="aspect-[1200/630] w-full object-cover opacity-88 grayscale transition duration-500 group-hover/project:scale-[1.02] group-hover/project:opacity-100 group-hover/project:grayscale-0"
          />
        ) : (
          <div className="flex aspect-[1200/630] items-center justify-center font-serif text-5xl text-foreground/20 italic">
            {title.charAt(0)}
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-4 p-4">
        <div>
          <h3 className="font-serif text-[1.2rem] leading-snug font-medium text-foreground/86 italic transition-colors group-hover/project:text-foreground">
            {title}
          </h3>
          <p className="mt-1 font-mono text-[10px] leading-relaxed text-foreground/42">
            {subtitle}
          </p>
        </div>

        <div className="mt-auto flex flex-wrap items-center gap-1.5">
          {project.skills.slice(0, 2).map((skill) => (
            <span
              key={skill}
              className="border border-foreground/8 bg-background/35 px-2 py-0.5 font-mono text-[8.5px] text-foreground/42"
            >
              {skill}
            </span>
          ))}
          {project.skills.length > 2 && (
            <span className="font-mono text-[8.5px] text-foreground/30">
              +{project.skills.length - 2}
            </span>
          )}
          <span className="ml-auto font-mono text-[9px] text-foreground/28">
            {year}
          </span>
        </div>

        <div className="flex items-center justify-between border-t border-foreground/[0.055] pt-3">
          {action}
          {project.githubUrl && (
            <Link
              href={project.githubUrl}
              target="_blank"
              aria-label={`${title} source code`}
              className="text-foreground/34 transition-colors hover:text-foreground/70"
            >
              <Github className="size-4" />
            </Link>
          )}
        </div>
      </div>
    </article>
  );
}
