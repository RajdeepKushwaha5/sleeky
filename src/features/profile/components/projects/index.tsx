"use client";

import { ArrowRightIcon } from "lucide-react";
import { motion } from "motion/react";

import { PROJECTS } from "../../data/projects";
import { Panel, PanelHeader, PanelTitle } from "../panel";
import { ProjectCard } from "./project-card";

export function Projects() {
  const visibleProjects = PROJECTS.slice(0, 4);

  return (
    <Panel id="projects">
      <PanelHeader>
        <PanelTitle>
          Projects
          <sup className="ml-1 font-mono text-sm text-muted-foreground select-none">
            ({PROJECTS.length})
          </sup>
        </PanelTitle>
      </PanelHeader>

      <div className="mx-auto mt-8 grid max-w-5xl grid-cols-1 gap-8 px-4 sm:mt-12 sm:grid-cols-2">
        {visibleProjects.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{
              duration: 0.5,
              delay: index * 0.1,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
          >
            <ProjectCard project={project} shouldPreloadImage={index <= 2} />
          </motion.div>
        ))}
      </div>

      {PROJECTS.length > 4 && (
        <div className="mt-8 flex justify-center">
          <a
            href="/projects"
            className="group inline-flex items-center gap-2 rounded-full bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground transition-all hover:bg-primary/90"
          >
            View All Projects
            <ArrowRightIcon className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
          </a>
        </div>
      )}
    </Panel>
  );
}
