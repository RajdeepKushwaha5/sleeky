import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

import { rateLimit } from "@/lib/rate-limit";
import { getNowPlaying } from "@/lib/spotify";

export async function GET(request: NextRequest) {
  // Rate limit: 60 requests per 5 minutes per IP
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    "anonymous";
  const { allowed } = await rateLimit(`ratelimit:spotify-now:${ip}`, 60, 300);
  if (!allowed) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  }

  if (!process.env.SPOTIFY_REFRESH_TOKEN) {
    return NextResponse.json(
      { error: "Spotify not configured" },
      { status: 503 }
    );
  }

  const result = await getNowPlaying();

  if (!result || !result.isPlaying || !result.track) {
    return NextResponse.json({ isPlaying: false });
  }

  return NextResponse.json({
    isPlaying: true,
    song: result.track.name,
    artist: result.track.artists.map((a) => a.name).join(", "),
    album: result.track.album.name,
    album_art_url: result.track.album.images[0]?.url ?? "",
    track_id: result.track.id,
    track_url: result.track.external_urls.spotify,
  });
}
