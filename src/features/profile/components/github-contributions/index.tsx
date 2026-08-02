import { Suspense } from "react";

import { getGitHubContributions } from "../../data/github-contributions";
import { Panel } from "../panel";
import { GitHubContributionFallback, GitHubContributionGraph } from "./graph";
import { TopContributions } from "./top-contributions";

export function GitHubContributions() {
  const contributions = getGitHubContributions();

  return (
    <Panel id="github">
      <h2 className="sr-only">GitHub Contributions</h2>

      <Suspense fallback={<GitHubContributionFallback />}>
        <GitHubContributionGraph contributions={contributions} />
      </Suspense>

      <TopContributions />
    </Panel>
  );
}
