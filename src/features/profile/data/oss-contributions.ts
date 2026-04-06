import { GITHUB_USERNAME } from "@/config/site";

import type { OSSContribution } from "../types/oss-contributions";

type GitHubSearchItem = {
  id: number;
  title: string;
  html_url: string;
  pull_request?: { merged_at: string | null };
  repository_url: string;
  created_at: string;
};

type GitHubSearchResponse = {
  items: GitHubSearchItem[];
};

export async function getLatestMergedPRs(): Promise<OSSContribution[]> {
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 10000);

    const query = encodeURIComponent(
      `is:pr author:${GITHUB_USERNAME} is:merged -user:${GITHUB_USERNAME} sort:updated-desc`
    );

    const res = await fetch(
      `https://api.github.com/search/issues?q=${query}&per_page=4`,
      {
        next: { revalidate: 86400 },
        signal: controller.signal,
        headers: {
          Accept: "application/vnd.github+json",
        },
      }
    );

    clearTimeout(timeout);

    if (!res.ok) return FALLBACK_CONTRIBUTIONS;

    const data = (await res.json()) as GitHubSearchResponse;

    if (!data.items || data.items.length === 0) return FALLBACK_CONTRIBUTIONS;

    return data.items.map((item) => {
      const repoFullName = item.repository_url.replace(
        "https://api.github.com/repos/",
        ""
      );
      const org = repoFullName.split("/")[0];

      return {
        id: String(item.id),
        title: item.title,
        organization: org,
        url: item.html_url,
        year: new Date(item.created_at).getFullYear(),
      };
    });
  } catch {
    return FALLBACK_CONTRIBUTIONS;
  }
}

const FALLBACK_CONTRIBUTIONS: OSSContribution[] = [
  {
    id: "calcom-webhook-dialog",
    title: "feat: add delete confirmation dialog to webhook list items",
    organization: "calcom",
    url: "https://github.com/calcom/cal.com",
    year: 2025,
  },
  {
    id: "accomplish-mcp-tool",
    title: "feat: add native desktop automation via MCP tool integration",
    organization: "accomplish-ai",
    url: "https://github.com/accomplish-ai/accomplish/pull/691",
    year: 2026,
  },
  {
    id: "oumi-loading-spinners",
    title: "feat: add visual loading spinners for inference operations",
    organization: "oumi-ai",
    url: "https://github.com/oumi-ai/oumi/pull/2085",
    year: 2025,
  },
  {
    id: "calcom-hover-fix",
    title: "fix(ui): fixing the hover bug in the dropdown component",
    organization: "calcom",
    url: "https://github.com/calcom/cal.com",
    year: 2025,
  },
];
