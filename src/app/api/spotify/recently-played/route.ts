import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

import { rateLimit } from "@/lib/rate-limit";
import { getRecentlyPlayed } from "@/lib/spotify";

export async function GET(request: NextRequest) {
  // Rate limit: 30 requests per 5 minutes per IP
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    "anonymous";
  const { allowed } = await rateLimit(`ratelimit:spotify:${ip}`, 30, 300);
  if (!allowed) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  }
  if (!process.env.SPOTIFY_REFRESH_TOKEN) {
    return NextResponse.json(
      { error: "Spotify not configured" },
      { status: 503 }
    );
  }

  const recentlyPlayed = await getRecentlyPlayed();

  if (!recentlyPlayed) {
    return NextResponse.json(
      { error: "No recently played track found" },
      { status: 404 }
    );
  }

  const { track, played_at } = recentlyPlayed;

  return NextResponse.json({
    song: track.name,
    artist: track.artists.map((a) => a.name).join(", "),
    album: track.album.name,
    album_art_url: track.album.images[0]?.url ?? "",
    track_id: track.id,
    track_url: track.external_urls.spotify,
    played_at,
  });
}
