import { Suspense } from "react";

import { getLatestMergedPRs } from "../../data/oss-contributions";
import { Panel, PanelHeader, PanelTitle } from "../panel";
import {
  OSSContributionsFallback,
  OSSContributionsList,
} from "./oss-contributions-list";

export function OSSContributions() {
  const contributions = getLatestMergedPRs();

  return (
    <Panel id="oss-contributions">
      <PanelHeader>
        <PanelTitle>Open Source Contributions</PanelTitle>
      </PanelHeader>

      <Suspense fallback={<OSSContributionsFallback />}>
        <OSSContributionsList contributions={contributions} />
      </Suspense>
    </Panel>
  );
}
