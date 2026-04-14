"use client";

import { motion, type Variants } from "motion/react";
import React from "react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { EXPERIENCES } from "../../data/experiences";
import { Panel, PanelHeader, PanelTitle } from "../panel";
import { ExperienceItem } from "./experience-item";

const WORK_EXPERIENCES = EXPERIENCES.filter(
  (e) => !e.positions.some((p) => p.title === "Open Source Contributor")
);

const OSS_EXPERIENCES = EXPERIENCES.filter((e) =>
  e.positions.some((p) => p.title === "Open Source Contributor")
);

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
  return (
    <Panel id="experience">
      <PanelHeader>
        <PanelTitle>Experience</PanelTitle>
      </PanelHeader>

      <Tabs defaultValue="work">
        <TabsList className="mb-4 h-auto gap-2 rounded-full border border-border/25 bg-transparent p-1 dark:border-white/[0.08] dark:bg-white/[0.03]">
          <TabsTrigger
            value="work"
            className="rounded-full px-4 py-1.5 text-[13px] tracking-wide data-[state=active]:bg-foreground/[0.06] data-[state=active]:shadow-none dark:text-muted-foreground/70 dark:data-[state=active]:bg-white/[0.1] dark:data-[state=active]:text-foreground/90"
          >
            Work
          </TabsTrigger>
          <TabsTrigger
            value="open-source"
            className="rounded-full px-4 py-1.5 text-[13px] tracking-wide data-[state=active]:bg-foreground/[0.06] data-[state=active]:shadow-none dark:text-muted-foreground/70 dark:data-[state=active]:bg-white/[0.1] dark:data-[state=active]:text-foreground/90"
          >
            Open Source
          </TabsTrigger>
          <TabsTrigger
            value="all"
            className="rounded-full px-4 py-1.5 text-[13px] tracking-wide data-[state=active]:bg-foreground/[0.06] data-[state=active]:shadow-none dark:text-muted-foreground/70 dark:data-[state=active]:bg-white/[0.1] dark:data-[state=active]:text-foreground/90"
          >
            All
          </TabsTrigger>
        </TabsList>

        <TabsContent value="work">
          <ExperienceList experiences={WORK_EXPERIENCES} />
        </TabsContent>

        <TabsContent value="open-source">
          <ExperienceList experiences={OSS_EXPERIENCES} />
        </TabsContent>

        <TabsContent value="all">
          <ExperienceList experiences={EXPERIENCES} />
        </TabsContent>
      </Tabs>
    </Panel>
  );
}
