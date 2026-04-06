"use client";

import { ArrowRightIcon } from "lucide-react";
import { motion } from "motion/react";
import Link from "next/link";

import { PROJECTS } from "../../data/projects";
import { Panel, PanelHeader, PanelTitle } from "../panel";
import { ProjectCard } from "./project-card";

export function Projects() {
  const visibleProjects = PROJECTS.slice(0, 2);

  return (
    <Panel id="projects">
      <PanelHeader>
        <PanelTitle>Projects</PanelTitle>
      </PanelHeader>

      <div className="py-5">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
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
              <ProjectCard project={project} shouldPreloadImage={index <= 1} />
            </motion.div>
          ))}
        </div>
      </div>

      {PROJECTS.length > 2 && (
        <div className="flex justify-center pt-2 pb-1">
          <Link
            href="/projects"
            className="group inline-flex items-center gap-2 rounded-full border border-border/25 px-6 py-2 text-[13px] font-medium tracking-wide text-foreground transition-all duration-300 hover:border-border/40 hover:bg-foreground/[0.04]"
          >
            View All Projects
            <ArrowRightIcon className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>
      )}
    </Panel>
  );
}
