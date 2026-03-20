import type { Activity } from "@/components/ui/contribution-graph";
import { GITHUB_USERNAME } from "@/config/site";

type GitHubContributionsResponse = {
  contributions: Activity[];
};

export async function getGitHubContributions() {
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 10000);

    const res = await fetch(
      `https://github-contributions-api.jogruber.de/v4/${GITHUB_USERNAME}?y=last`,
      {
        next: { revalidate: 86400 }, // Cache for 1 day (86400 seconds)
        signal: controller.signal,
      }
    );

    clearTimeout(timeout);

    if (!res.ok) return [];

    const data = (await res.json()) as GitHubContributionsResponse;
    return data.contributions;
  } catch {
    return [];
  }
}
