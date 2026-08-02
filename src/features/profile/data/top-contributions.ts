export type TopContribution = {
  /** Display name of the org / project. */
  name: string;
  /** Contribution count shown on the right (merged PRs by default — edit freely). */
  count: number;
  /** Link to the org or repository. */
  url: string;
  /** Logo URL (GitHub org avatars work out of the box). */
  logo: string;
};

/**
 * "Top contributions in" — a hand-maintained ranking shown under the GitHub
 * heatmap. GitHub exposes no public per-repo contribution counts without a
 * token, so this is a static list; counts default to merged-PR totals and can
 * be edited to whatever metric you prefer. Order doesn't matter — the UI sorts
 * by count descending.
 */
export const TOP_CONTRIBUTIONS: TopContribution[] = [
  {
    name: "OpenMetadata",
    count: 12,
    url: "https://github.com/open-metadata/OpenMetadata",
    logo: "https://github.com/open-metadata.png",
  },
  {
    name: "Cognee",
    count: 8,
    url: "https://github.com/topoteretes/cognee",
    logo: "https://github.com/topoteretes.png",
  },
  {
    name: "MLLAM",
    count: 5,
    url: "https://github.com/mllam/neural-lam",
    logo: "https://github.com/mllam.png",
  },
  {
    name: "Accomplish",
    count: 3,
    url: "https://github.com/accomplish-ai/accomplish",
    logo: "https://github.com/accomplish-ai.png",
  },
  {
    name: "Oumi",
    count: 1,
    url: "https://github.com/oumi-ai/oumi",
    logo: "https://github.com/oumi-ai.png",
  },
];
