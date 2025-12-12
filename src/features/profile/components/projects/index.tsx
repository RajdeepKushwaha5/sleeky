"use client";

import { ArrowRightIcon, ChevronDown } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";

import { TiltCard } from "@/components/tilt-card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import { PROJECTS } from "../../data/projects";
import { Panel, PanelHeader, PanelTitle } from "../panel";
import { ProjectCard } from "./project-card";

export function Projects() {
  const [showAll, setShowAll] = useState(false);
  const visibleProjects = showAll ? PROJECTS : PROJECTS.slice(0, 4);

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
            <TiltCard>
              <ProjectCard project={project} shouldPreloadImage={index <= 2} />
            </TiltCard>
          </motion.div>
        ))}
      </div>

      {!showAll && PROJECTS.length > 4 && (
        <div className="mt-8 flex justify-center">
          <Button
            variant="default"
            onClick={() => setShowAll(true)}
            className="group flex items-center gap-2 rounded-full pr-4 pl-6"
          >
            View More
            <ArrowRightIcon className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Button>
        </div>
      )}

      {showAll && PROJECTS.length > 4 && (
        <div className="mt-8 flex justify-center">
          <Button
            variant="ghost"
            onClick={() => setShowAll(false)}
            className="group flex items-center gap-2 text-muted-foreground hover:text-foreground"
          >
            Show Less
            <ChevronDown className="h-4 w-4 rotate-180 transition-transform duration-300 group-hover:-translate-y-1" />
          </Button>
        </div>
      )}
    </Panel>
  );
}
