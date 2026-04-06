import dayjs from "dayjs";

import { CollapsibleList } from "@/components/collapsible-list";

import { OSS_CONTRIBUTIONS } from "../../data/oss-contributions";
import { Panel, PanelHeader, PanelTitle } from "../panel";
import { OSSContributionItem } from "./oss-contribution-item";

export function OSSContributions() {
  return (
    <Panel id="oss-contributions">
      <PanelHeader>
        <div className="flex items-baseline gap-3">
          <PanelTitle>Open Source Contributions</PanelTitle>
          <span className="font-mono text-sm text-muted-foreground">
            {dayjs().format("MMMM D, YYYY")}
          </span>
        </div>
      </PanelHeader>

      <CollapsibleList
        items={OSS_CONTRIBUTIONS}
        max={5}
        keyExtractor={(item) => item.id}
        renderItem={(item) => <OSSContributionItem contribution={item} />}
      />
    </Panel>
  );
}
