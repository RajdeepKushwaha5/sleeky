import type { Metadata } from "next";

import { PROJECTS } from "@/features/profile/data/projects";
import { ProjectItem } from "@/features/projects/components/project-item";
import { hasCaseStudy } from "@/features/projects/data/case-studies";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "A showcase of my projects, from collaborative coding platforms to cultural desktop experiences.",
};

export default function ProjectsPage() {
  // Sort projects: case studies first, then by date
  const sortedProjects = [...PROJECTS].sort((a, b) => {
    const aHasStudy = hasCaseStudy(a.id);
    const bHasStudy = hasCaseStudy(b.id);
    if (aHasStudy && !bHasStudy) return -1;
    if (!aHasStudy && bHasStudy) return 1;
    return 0;
  });

  const featuredProjects = sortedProjects.filter((p) => hasCaseStudy(p.id));
  const otherProjects = sortedProjects.filter((p) => !hasCaseStudy(p.id));

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      {/* Header */}
      <div className="mb-12 space-y-4">
        <div className="inline-flex items-center gap-2 rounded-full border border-border/50 bg-card/50 px-3 py-1 text-xs font-medium text-foreground/60">
          <span className="size-1.5 animate-pulse rounded-full bg-green-500" />
          Portfolio
        </div>
        <h1 className="font-serif text-4xl font-semibold tracking-tight md:text-5xl">
          Projects
        </h1>
        <p className="max-w-2xl font-mono text-sm text-muted-foreground">
          {metadata.description}
        </p>
      </div>

      {/* Featured Projects with Case Studies */}
      {featuredProjects.length > 0 && (
        <section className="mb-16">
          <div className="mb-6 flex items-center gap-3">
            <h2 className="font-mono text-xs font-medium uppercase tracking-wider text-foreground/50">
              Featured Case Studies
            </h2>
            <div className="h-px flex-1 bg-border/50" />
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-2">
            {featuredProjects.map((project, index) => (
              <ProjectItem
                key={project.id}
                project={project}
                shouldPreloadImage={index < 4}
              />
            ))}
          </div>
        </section>
      )}

      {/* Other Projects */}
      {otherProjects.length > 0 && (
        <section>
          <div className="mb-6 flex items-center gap-3">
            <h2 className="font-mono text-xs font-medium uppercase tracking-wider text-foreground/50">
              All Projects
            </h2>
            <div className="h-px flex-1 bg-border/50" />
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {otherProjects.map((project, index) => (
              <ProjectItem
                key={project.id}
                project={project}
                shouldPreloadImage={index < 6}
              />
            ))}
          </div>
        </section>
      )}

      {/* GitHub CTA */}
      <section className="mt-16 rounded-2xl border border-border/50 bg-card/30 p-8 text-center">
        <div className="mx-auto max-w-md space-y-4">
          <div className="mx-auto flex size-12 items-center justify-center rounded-full border border-border/50 bg-foreground/5">
            <svg
              viewBox="0 0 24 24"
              fill="currentColor"
              className="size-6 text-foreground/60"
            >
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
          </div>
          <h3 className="font-serif text-xl font-semibold">
            Explore More on GitHub
          </h3>
          <p className="text-sm text-foreground/60">
            These are just a few highlights. Check out my GitHub profile for more projects, experiments, and open-source contributions.
          </p>
          <a
            href="https://github.com/RajdeepKushwaha5"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-border/50 bg-foreground/5 px-5 py-2.5 text-sm font-medium text-foreground/80 transition-colors hover:bg-foreground/10"
          >
            <svg
              viewBox="0 0 24 24"
              fill="currentColor"
              className="size-4"
            >
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
            Visit GitHub Profile
          </a>
        </div>
      </section>
    </div>
  );
}
