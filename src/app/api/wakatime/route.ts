import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

import { rateLimit } from "@/lib/rate-limit";

export async function GET(request: NextRequest) {
  // Rate limit: 30 requests per 5 minutes per IP
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    "anonymous";
  const { allowed } = await rateLimit(`ratelimit:wakatime:${ip}`, 30, 300);
  if (!allowed) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  }
  try {
    // WakaTime no longer accepts plugin API keys here. Use either a public
    // "Coding Activity" JSON share link or a personal OAuth token.
    const shareUrl = process.env.WAKATIME_SHARE_URL;
    const accessToken = process.env.WAKATIME_ACCESS_TOKEN;

    if (!shareUrl && !accessToken) {
      return NextResponse.json(
        { error: "WakaTime is not configured" },
        { status: 500 }
      );
    }

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 10000);

    const response = await fetch(
      shareUrl ??
        "https://wakatime.com/api/v1/users/current/summaries?range=last_7_days",
      {
        headers: shareUrl ? {} : { Authorization: `Bearer ${accessToken}` },
        next: { revalidate: 300 }, // Cache for 5 minutes
        signal: controller.signal,
      }
    );

    clearTimeout(timeout);

    if (!response.ok) {
      throw new Error(`WakaTime API error: ${response.status}`);
    }

    const data = await response.json();

    return NextResponse.json(data);
  } catch (error) {
    console.error("WakaTime API Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch WakaTime stats" },
      { status: 500 }
    );
  }
}
