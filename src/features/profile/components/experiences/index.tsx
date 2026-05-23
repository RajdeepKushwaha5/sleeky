"use client";

import { ChevronDownIcon } from "lucide-react";
import React from "react";

import { EXPERIENCES } from "../../data/experiences";
import { Panel, PanelHeader, PanelTitle } from "../panel";
import { ExperienceItem } from "./experience-item";

const DEFAULT_VISIBLE = 3;

export function Experiences() {
  const [isExpanded, setIsExpanded] = React.useState(false);
  const remaining = EXPERIENCES.length - DEFAULT_VISIBLE;
  const visible = isExpanded
    ? EXPERIENCES
    : EXPERIENCES.slice(0, DEFAULT_VISIBLE);

  return (
    <Panel id="experience">
      <PanelHeader>
        <PanelTitle>Experience</PanelTitle>
      </PanelHeader>

      <div>
        {visible.map((exp, index) => {
          const isLastVisible =
            !isExpanded && index === visible.length - 1 && remaining > 0;
          return (
            <div
              key={exp.id}
              className="border-b border-foreground/[0.055] last:border-0"
            >
              <ExperienceItem experience={exp} dimmed={isLastVisible} />
            </div>
          );
        })}
      </div>

      {!isExpanded && remaining > 0 && (
        <div className="flex justify-center">
          <button
            type="button"
            className="quiet-action mt-3"
            data-direction="down"
            onClick={() => setIsExpanded(true)}
          >
            Show {remaining} more
            <ChevronDownIcon />
          </button>
        </div>
      )}
    </Panel>
  );
}
