import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

import { getRedis } from "@/lib/redis";

export const dynamic = "force-dynamic";

function viewsKey(slug: string) {
  return `views:blog:${slug}:unique`;
}

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const redis = getRedis();
    const views = await redis.scard(viewsKey(slug));
    return NextResponse.json(
      { views },
      { headers: { "Cache-Control": "no-store, max-age=0" } }
    );
  } catch (error) {
    console.error("Blog views GET error:", error);
    return NextResponse.json({ views: 0 }, { status: 500 });
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const redis = getRedis();
    const body = await request.json().catch(() => null);
    const visitorId =
      typeof body?.visitorId === "string" && body.visitorId.length > 0
        ? body.visitorId
        : null;

    if (!visitorId) {
      return NextResponse.json({ error: "Missing visitorId" }, { status: 400 });
    }

    await redis.sadd(viewsKey(slug), visitorId);
    const views = await redis.scard(viewsKey(slug));

    return NextResponse.json(
      { views },
      { headers: { "Cache-Control": "no-store, max-age=0" } }
    );
  } catch (error) {
    console.error("Blog views POST error:", error);
    return NextResponse.json({ views: 0 }, { status: 500 });
  }
}
