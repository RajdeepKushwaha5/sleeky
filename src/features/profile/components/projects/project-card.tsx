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
        "group/project relative flex flex-col overflow-hidden rounded-2xl border border-border/50 bg-card/80",
        "transition-all duration-300",
        "hover:bg-card"
      )}
    >
      {/* Image Section */}
      <div className="relative aspect-[16/10] w-full overflow-hidden rounded-t-2xl">
        {project.logo ? (
          <>
            <Image
              src={project.logo}
              alt={project.title}
              fill
              className="object-cover grayscale transition-all duration-500 group-hover/project:scale-105 group-hover/project:grayscale-0"
              priority={shouldPreloadImage}
              unoptimized
            />
          </>
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-muted/30">
            <span className="font-serif text-6xl font-medium italic text-foreground/10 select-none">
              {project.title.charAt(0)}
            </span>
          </div>
        )}

        {/* Hover Actions Overlay */}
        <div className="absolute inset-0 flex items-center justify-center gap-3 bg-black/50 opacity-0 backdrop-blur-sm transition-all duration-300 group-hover/project:opacity-100">
          {project.githubUrl && (
            <Link
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex size-12 items-center justify-center rounded-full bg-white/90 text-black transition-all duration-300 hover:scale-110"
              aria-label="View Source"
            >
              <Github className="size-5" />
            </Link>
          )}
          <Link
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="flex size-12 items-center justify-center rounded-full bg-black/90 text-white transition-all duration-300 hover:scale-110"
            aria-label="Visit Project"
          >
            <ExternalLink className="size-5" />
          </Link>
        </div>
      </div>

      {/* Content Section */}
      <div className="flex flex-1 flex-col gap-4 p-5">
        <div className="space-y-2">
          <Link
            href={project.link}
            target="_blank"
            className="group/title block"
          >
            <h3 className="font-serif text-lg font-medium italic text-foreground/90 transition-colors group-hover/title:text-foreground">
              {project.title}
            </h3>
          </Link>
          <p className="font-mono text-xs text-foreground/40">
            {project.period.start} → {project.period.end || "Present"}
          </p>
        </div>

        {/* Tech Stack */}
        <div className="flex flex-wrap gap-1.5">
          {project.skills.slice(0, 4).map((tech) => (
            <span
              key={tech}
              className="inline-flex items-center gap-1 rounded-full bg-foreground/5 px-2.5 py-1 text-[10px] font-medium text-foreground/50"
            >
              <TechIcon name={tech} className="size-2.5" />
              {tech}
            </span>
          ))}
          {project.skills.length > 4 && (
            <span className="inline-flex items-center rounded-full bg-foreground/5 px-2.5 py-1 text-[10px] text-foreground/40">
              +{project.skills.length - 4}
            </span>
          )}
        </div>

        {/* View Details Footer */}
        <div className="mt-auto pt-2">
          <Dialog>
            <DialogTrigger asChild>
              <button className="group/btn flex w-full items-center justify-between text-xs font-medium text-foreground/40 transition-colors hover:text-foreground/70">
                <span>View Details</span>
                <MoveRight className="size-3 transition-transform duration-300 group-hover/btn:translate-x-1" />
              </button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl rounded-2xl">
              <DialogHeader>
                <div className="mb-2 flex items-center gap-3">
                  {project.logo && (
                    <div className="relative size-12 overflow-hidden rounded-xl">
                      <Image
                        src={project.logo}
                        alt={project.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                  <div>
                    <DialogTitle className="font-serif text-xl italic">
                      {project.title}
                    </DialogTitle>
                    <DialogDescription className="font-mono text-xs">
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

                <div className="flex gap-3 pt-2">
                  {project.githubUrl && (
                    <Link
                      href={project.githubUrl}
                      target="_blank"
                      className="inline-flex items-center gap-2 rounded-full border border-border/50 bg-card/60 px-4 py-2 text-sm font-medium transition-colors hover:bg-accent"
                    >
                      <Github className="size-4" />
                      View Source
                    </Link>
                  )}
                  <Link
                    href={project.link}
                    target="_blank"
                    className="inline-flex items-center gap-2 rounded-full bg-foreground px-4 py-2 text-sm font-medium text-background transition-colors hover:bg-foreground/90"
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

