"use client";

import { CollapsibleList } from "@/components/collapsible-list";

import { CERTIFICATIONS } from "../../data/certifications";
import { Panel, PanelHeader, PanelTitle } from "../panel";
import { CertificationItem } from "./certification-item";

export function Certifications() {
  return (
    <Panel id="certs">
      <PanelHeader>
        <PanelTitle>Certifications</PanelTitle>
      </PanelHeader>

      <CollapsibleList
        items={CERTIFICATIONS}
        max={4}
        renderItem={(item) => <CertificationItem certification={item} />}
      />
    </Panel>
  );
}
