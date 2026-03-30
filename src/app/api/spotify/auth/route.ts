import { NextResponse } from "next/server";

const client_id = process.env.SPOTIFY_CLIENT_ID!;
const redirect_uri =
  process.env.APP_URL + "/api/spotify/callback" ||
  "https://rajdeep-singh.vercel.app/api/spotify/callback";

const scopes = [
  "user-read-recently-played",
  "user-read-currently-playing",
].join(" ");

export function GET() {
  const params = new URLSearchParams({
    response_type: "code",
    client_id,
    scope: scopes,
    redirect_uri,
  });

  return NextResponse.redirect(
    `https://accounts.spotify.com/authorize?${params.toString()}`
  );
}
