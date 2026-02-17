"use client";

import { ExternalLink, Github } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { TechIcon } from "@/components/tech-icons";
import type { Project } from "@/features/profile/types/projects";
import { hasCaseStudy } from "@/features/projects/data/case-studies";
import { cn } from "@/lib/utils";

export function ProjectItem({
  project,
  shouldPreloadImage,
}: {
  project: Project;
  shouldPreloadImage?: boolean;
}) {
  const hasStudy = hasCaseStudy(project.id);

  return (
    <div
      className={cn(
        "group/project relative flex flex-col overflow-hidden rounded-2xl border border-border/25 bg-card/40",
        "transition-all duration-300",
        "hover:border-border/45 hover:bg-card hover:shadow-lg"
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

        {/* Case Study Badge */}
        {hasStudy && (
          <div className="absolute top-3 left-3">
            <span className="rounded-full bg-primary/90 px-2.5 py-1 text-[10px] font-medium text-primary-foreground backdrop-blur-sm">
              Case Study
            </span>
          </div>
        )}

        {/* Hover Actions Overlay */}
        <div className="absolute inset-0 flex items-center justify-center gap-3 bg-black/60 opacity-0 backdrop-blur-sm transition-all duration-300 group-hover/project:opacity-100">
          {hasStudy ? (
            <Link
              href={`/projects/${project.id}`}
              className="rounded-full bg-white px-4 py-2 text-sm font-medium text-black transition-all duration-300 hover:scale-105"
            >
              View Project
            </Link>
          ) : (
            <>
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
            </>
          )}
        </div>
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
        <div className="mt-auto flex flex-wrap items-center gap-2 pt-2">
          {project.skills.slice(0, 5).map((tech) => (
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
          {project.skills.length > 5 && (
            <span className="inline-flex items-center rounded-full border border-border/20 bg-muted/30 px-2.5 py-1 text-[10px] font-medium text-foreground/50">
              +{project.skills.length - 5}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
