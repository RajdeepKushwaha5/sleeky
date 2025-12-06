import { CollapsibleList } from "@/components/collapsible-list";
import { CustomCursor } from "@/components/custom-cursor";

import { PROJECTS } from "../../data/projects";
import { Panel, PanelHeader, PanelTitle } from "../panel";
import { ProjectItem } from "./project-item";

export function Projects() {
  return (
    <>
      <CustomCursor targetSelector="[data-project-item]" />
      <Panel id="projects">
        <PanelHeader>
          <PanelTitle>
            Projects
            <sup className="ml-1 font-mono text-sm text-muted-foreground select-none">
              ({PROJECTS.length})
            </sup>
          </PanelTitle>
        </PanelHeader>

        <CollapsibleList
          items={PROJECTS}
          max={4}
          renderItem={(item) => <ProjectItem project={item} />}
        />
      </Panel>
    </>
  );
}
