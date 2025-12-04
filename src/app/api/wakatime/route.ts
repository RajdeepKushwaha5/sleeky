import { NextResponse } from "next/server";

export async function GET() {
  try {
    const apiKey = process.env.WAKATIME_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        { error: "WakaTime API key not configured" },
        { status: 500 }
      );
    }

    const response = await fetch(
      "https://wakatime.com/api/v1/users/current/summaries?range=last_7_days",
      {
        headers: {
          Authorization: `Basic ${Buffer.from(apiKey).toString("base64")}`,
        },
        next: { revalidate: 300 }, // Cache for 5 minutes
      }
    );

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
