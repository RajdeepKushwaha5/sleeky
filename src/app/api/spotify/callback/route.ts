import { type NextRequest, NextResponse } from "next/server";

const client_id = process.env.SPOTIFY_CLIENT_ID!;
const client_secret = process.env.SPOTIFY_CLIENT_SECRET!;
const redirect_uri =
  process.env.APP_URL + "/api/spotify/callback" ||
  "https://rajdeep-singh.vercel.app/api/spotify/callback";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");
  const error = searchParams.get("error");

  if (error) {
    return NextResponse.json({ error }, { status: 400 });
  }

  if (!code) {
    return NextResponse.json({ error: "No code provided" }, { status: 400 });
  }

  const basicAuth = Buffer.from(`${client_id}:${client_secret}`).toString(
    "base64"
  );

  const response = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      Authorization: `Basic ${basicAuth}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "authorization_code",
      code,
      redirect_uri,
    }),
  });

  if (!response.ok) {
    const errorData = await response.text();
    return NextResponse.json(
      { error: "Token exchange failed", details: errorData },
      { status: response.status }
    );
  }

  const data = await response.json();

  // Display the refresh token for the user to copy
  return new NextResponse(
    `<!DOCTYPE html>
<html>
<head><title>Spotify Auth Success</title></head>
<body style="font-family: monospace; padding: 2rem; background: #0a0a0a; color: #fafafa;">
  <h1 style="color: #1DB954;">✓ Spotify Authorization Successful</h1>
  <p>Copy this refresh token and add it to your <code>.env.local</code> and Vercel environment variables:</p>
  <pre style="background: #1a1a1a; padding: 1rem; border-radius: 8px; overflow-x: auto; border: 1px solid #333;">SPOTIFY_REFRESH_TOKEN=${data.refresh_token}</pre>
  <p style="color: #888; margin-top: 1rem;">You can now delete the <code>/api/spotify/auth</code> and <code>/api/spotify/callback</code> routes.</p>
</body>
</html>`,
    {
      headers: { "Content-Type": "text/html" },
    }
  );
}
