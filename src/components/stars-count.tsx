import { SOURCE_CODE_GITHUB_REPO } from "@/config/site";

export async function StarsCount() {
  let stargazers_count = -1;

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 10000);

    const data = await fetch(
      `https://api.github.com/repos/${SOURCE_CODE_GITHUB_REPO}`,
      {
        headers: {
          Accept: "application/vnd.github+json",
          Authorization: `Bearer ${process.env.GITHUB_API_TOKEN}`,
          "X-GitHub-Api-Version": "2022-11-28",
        },
        next: { revalidate: 86400 }, // Cache for 1 day (86400 seconds)
        signal: controller.signal,
      }
    );

    clearTimeout(timeout);

    if (data.ok) {
      const json = await data.json();
      stargazers_count = json?.stargazers_count ?? -1;
    }
  } catch {
    // Fail silently — show -1
  }

  return (
    <span className="text-center text-xs tabular-nums">
      {stargazers_count.toLocaleString()}
    </span>
  );
}
