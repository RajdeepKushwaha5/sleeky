import {
  ArrowLeft,
  CheckCircle2,
  ExternalLink,
  Github,
  Lightbulb,
  Rocket,
  Settings,
  Target,
} from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Button } from "@/components/ui/button";
import { ScrollProgress } from "@/components/ui/scroll-progress";
import { PROJECTS } from "@/features/profile/data/projects";
import { getCaseStudy } from "@/features/projects/data/case-studies";
import type { CaseStudySection } from "@/features/projects/types/case-study";
import { cn } from "@/lib/utils";

export async function generateStaticParams() {
  // Only generate pages for projects with case studies
  const projectsWithCaseStudies = PROJECTS.filter((p) => getCaseStudy(p.id));
  return projectsWithCaseStudies.map((project) => ({
    slug: project.id,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const slug = (await params).slug;
  const project = PROJECTS.find((p) => p.id === slug);

  if (!project) {
    return { title: "Project Not Found" };
  }

  return {
    title: `${project.title} | Case Study`,
    description: project.description?.split("\n")[0] || project.title,
  };
}

function SectionIcon({
  type,
}: {
  type: "problem" | "process" | "solution" | "results";
}) {
  const iconClass = "size-5";
  switch (type) {
    case "problem":
      return <Target className={iconClass} />;
    case "process":
      return <Settings className={iconClass} />;
    case "solution":
      return <Lightbulb className={iconClass} />;
    case "results":
      return <Rocket className={iconClass} />;
  }
}

function CaseStudySectionComponent({
  section,
  type,
  index,
}: {
  section: CaseStudySection;
  type: "problem" | "process" | "solution" | "results";
  index: number;
}) {
  const colors = {
    problem: "from-foreground/5 to-transparent border-foreground/10",
    process: "from-foreground/5 to-transparent border-foreground/10",
    solution: "from-foreground/5 to-transparent border-foreground/10",
    results: "from-foreground/5 to-transparent border-foreground/10",
  };

  const iconColors = {
    problem: "text-foreground/60 bg-foreground/5",
    process: "text-foreground/60 bg-foreground/5",
    solution: "text-foreground/60 bg-foreground/5",
    results: "text-foreground/60 bg-foreground/5",
  };

  return (
    <section
      className={cn(
        "relative overflow-hidden rounded-2xl border bg-gradient-to-br p-6 md:p-8",
        colors[type]
      )}
    >
      {/* Section Number */}
      <div className="absolute top-4 right-4 font-mono text-6xl font-bold text-foreground/5 select-none">
        {String(index + 1).padStart(2, "0")}
      </div>

      <div className="relative space-y-4">
        {/* Header */}
        <div className="flex items-center gap-3">
          <div className={cn("rounded-xl p-2.5", iconColors[type])}>
            <SectionIcon type={type} />
          </div>
          <h2 className="font-serif text-xl font-semibold md:text-2xl">
            {section.title}
          </h2>
        </div>

        {/* Content */}
        <p className="leading-relaxed text-foreground/70">{section.content}</p>

        {/* Highlights */}
        {section.highlights && section.highlights.length > 0 && (
          <ul className="mt-4 grid gap-2 sm:grid-cols-2">
            {section.highlights.map((highlight, i) => (
              <li
                key={i}
                className="flex items-start gap-2 text-sm text-foreground/60"
              >
                <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-foreground/40" />
                {highlight}
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const slug = (await params).slug;
  const project = PROJECTS.find((p) => p.id === slug);
  const caseStudy = getCaseStudy(slug);

  if (!project || !caseStudy) {
    notFound();
  }

  const sections = [
    { type: "problem" as const, data: caseStudy.problem },
    { type: "process" as const, data: caseStudy.process },
    { type: "solution" as const, data: caseStudy.solution },
    { type: "results" as const, data: caseStudy.results },
  ];

  return (
    <>
      <ScrollProgress />

      <div className="mx-auto max-w-4xl px-4 py-8">
        {/* Back Button */}
        <div className="mb-8">
          <Button
            variant="ghost"
            size="sm"
            asChild
            className="gap-2 text-muted-foreground hover:text-foreground"
          >
            <Link href="/projects">
              <ArrowLeft className="size-4" />
              Back to Projects
            </Link>
          </Button>
        </div>

        {/* Hero Section */}
        <header className="mb-12 space-y-6">
          {/* Project Logo */}
          {project.logo && (
            <div className="relative aspect-video w-full overflow-hidden rounded-2xl border border-border/25">
              <Image
                src={project.logo}
                alt={project.title}
                fill
                className="object-cover grayscale dark:grayscale-0"
                priority
                unoptimized
              />
            </div>
          )}

          <div className="space-y-4">
            {/* Title */}
            <h1 className="font-serif text-3xl font-semibold tracking-tight md:text-4xl lg:text-5xl">
              {project.title}
            </h1>

            {/* Description */}
            {project.description && (
              <p className="text-lg text-foreground/70">
                {project.description.split("\n")[0]}
              </p>
            )}

            {/* Metrics */}
            {caseStudy.metrics && caseStudy.metrics.length > 0 && (
              <div className="flex flex-wrap gap-4 pt-2">
                {caseStudy.metrics.map((metric, i) => (
                  <div
                    key={i}
                    className="rounded-xl border border-border/25 bg-card/30 px-4 py-3 text-center"
                  >
                    <div className="font-mono text-2xl font-bold text-foreground">
                      {metric.value}
                    </div>
                    <div className="text-xs text-foreground/50">
                      {metric.label}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Tech Stack */}
            <div className="flex flex-wrap gap-2 pt-2">
              {project.skills.map((tech) => (
                <span
                  key={tech}
                  className="rounded-full bg-foreground/5 px-3 py-1.5 text-xs font-medium text-foreground/60"
                >
                  {tech}
                </span>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-3 pt-4">
              <Button asChild className="gap-2">
                <Link
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ExternalLink className="size-4" />
                  View Live Demo
                </Link>
              </Button>
              {project.githubUrl && (
                <Button variant="outline" asChild className="gap-2">
                  <Link
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Github className="size-4" />
                    View Source
                  </Link>
                </Button>
              )}
            </div>
          </div>
        </header>

        {/* Case Study Sections */}
        <div className="space-y-6">
          {sections.map((section, index) => (
            <CaseStudySectionComponent
              key={section.type}
              section={section.data}
              type={section.type}
              index={index}
            />
          ))}
        </div>

        {/* Footer CTA */}
        <footer className="mt-12 rounded-2xl border border-border/25 bg-card/30 p-8 text-center">
          <h3 className="font-serif text-xl font-semibold">
            Interested in working together?
          </h3>
          <p className="mt-2 text-foreground/60">
            Let&apos;s build something amazing.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Button asChild>
              <Link href="/#contact">Get in Touch</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/projects">View More Projects</Link>
            </Button>
          </div>
        </footer>
      </div>
    </>
  );
}
