import { NextResponse } from "next/server";

import { getRecentlyPlayed } from "@/lib/spotify";

export async function GET() {
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
