const SPOTIFY_TOKEN_URL = "https://accounts.spotify.com/api/token";
const SPOTIFY_API_BASE = "https://api.spotify.com/v1";

const client_id = process.env.SPOTIFY_CLIENT_ID!;
const client_secret = process.env.SPOTIFY_CLIENT_SECRET!;
const refresh_token = process.env.SPOTIFY_REFRESH_TOKEN!;

const basicAuth = Buffer.from(`${client_id}:${client_secret}`).toString(
  "base64"
);

async function getAccessToken(): Promise<string> {
  const response = await fetch(SPOTIFY_TOKEN_URL, {
    method: "POST",
    headers: {
      Authorization: `Basic ${basicAuth}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token,
    }),
  });

  if (!response.ok) {
    throw new Error(`Failed to refresh Spotify token: ${response.status}`);
  }

  const data = await response.json();
  return data.access_token;
}

export interface SpotifyTrack {
  name: string;
  artists: { name: string }[];
  album: {
    name: string;
    images: { url: string; width: number; height: number }[];
  };
  external_urls: { spotify: string };
  id: string;
}

export interface RecentlyPlayedItem {
  track: SpotifyTrack;
  played_at: string;
}

export async function getRecentlyPlayed(): Promise<RecentlyPlayedItem | null> {
  try {
    const accessToken = await getAccessToken();

    const response = await fetch(
      `${SPOTIFY_API_BASE}/me/player/recently-played?limit=1`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        next: { revalidate: 60 }, // Cache for 60 seconds
      }
    );

    if (!response.ok) {
      console.error(`Spotify API error: ${response.status}`);
      return null;
    }

    const data = await response.json();
    return data.items?.[0] ?? null;
  } catch (error) {
    console.error("Failed to fetch recently played:", error);
    return null;
  }
}

export async function getNowPlaying(): Promise<{
  isPlaying: boolean;
  track: SpotifyTrack | null;
} | null> {
  try {
    const accessToken = await getAccessToken();

    const response = await fetch(
      `${SPOTIFY_API_BASE}/me/player/currently-playing`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        next: { revalidate: 30 },
      }
    );

    if (response.status === 204) {
      return { isPlaying: false, track: null };
    }

    if (!response.ok) {
      return null;
    }

    const data = await response.json();
    return {
      isPlaying: data.is_playing,
      track: data.item,
    };
  } catch (error) {
    console.error("Failed to fetch now playing:", error);
    return null;
  }
}
