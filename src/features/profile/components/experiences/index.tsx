"use client";

import { ChevronDownIcon, ChevronUpIcon } from "lucide-react";
import { motion, type Variants } from "motion/react";
import React from "react";

import { Button } from "@/components/ui/button";

import { EXPERIENCES } from "../../data/experiences";
import { Panel, PanelHeader, PanelTitle } from "../panel";
import { ExperienceItem } from "./experience-item";

const DEFAULT_VISIBLE_EXPERIENCES = 3;

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

function ExperienceList({ experiences }: { experiences: typeof EXPERIENCES }) {
  return (
    <motion.div
      className="space-y-3"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {experiences.map((experience) => (
        <motion.div key={experience.id} variants={itemVariants}>
          <ExperienceItem experience={experience} />
        </motion.div>
      ))}
    </motion.div>
  );
}

export function Experiences() {
  const [isExpanded, setIsExpanded] = React.useState(false);
  const hasMoreExperiences = EXPERIENCES.length > DEFAULT_VISIBLE_EXPERIENCES;
  const visibleExperiences = isExpanded
    ? EXPERIENCES
    : EXPERIENCES.slice(0, DEFAULT_VISIBLE_EXPERIENCES);

  return (
    <Panel id="experience">
      <PanelHeader>
        <PanelTitle>Experience</PanelTitle>
      </PanelHeader>

      <ExperienceList
        key={isExpanded ? "all-experiences" : "preview-experiences"}
        experiences={visibleExperiences}
      />

      {hasMoreExperiences && (
        <div className="mt-2 flex justify-center">
          <Button
            className="bg-foreground/[0.06] px-4 text-foreground/80 hover:bg-foreground/[0.1] dark:bg-white/[0.08] dark:hover:bg-white/[0.12]"
            size="sm"
            type="button"
            variant="ghost"
            onClick={() => setIsExpanded((current) => !current)}
            aria-expanded={isExpanded}
          >
            {isExpanded ? "Show Less" : "Show More"}
            {isExpanded ? (
              <ChevronUpIcon className="size-4" aria-hidden />
            ) : (
              <ChevronDownIcon className="size-4" aria-hidden />
            )}
          </Button>
        </div>
      )}
    </Panel>
  );
}
