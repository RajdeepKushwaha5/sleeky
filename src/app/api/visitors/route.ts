import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

import { rateLimit } from "@/lib/rate-limit";
import { getRedis } from "@/lib/redis";

export const dynamic = "force-dynamic";

const VISITORS_SET = "site:visitors:unique";

export async function GET() {
  try {
    const redis = getRedis();
    const count = await redis.scard(VISITORS_SET);
    return NextResponse.json(
      { count },
      { headers: { "Cache-Control": "no-store, max-age=0" } }
    );
  } catch (error) {
    console.error("Visitor count GET error:", error);
    return NextResponse.json({ count: 0 }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    // Rate limit: 10 requests per 5 minutes per IP
    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
      "anonymous";
    const { allowed } = await rateLimit(`ratelimit:visitors:${ip}`, 10, 300);
    if (!allowed) {
      return NextResponse.json({ error: "Too many requests" }, { status: 429 });
    }

    const redis = getRedis();
    const body = await request.json().catch(() => null);
    const visitorId =
      typeof body?.visitorId === "string" && body.visitorId.length > 0
        ? body.visitorId
        : null;

    if (!visitorId) {
      return NextResponse.json({ error: "Missing visitorId" }, { status: 400 });
    }

    await redis.sadd(VISITORS_SET, visitorId);
    const count = await redis.scard(VISITORS_SET);

    return NextResponse.json(
      { count },
      { headers: { "Cache-Control": "no-store, max-age=0" } }
    );
  } catch (error) {
    console.error("Visitor count POST error:", error);
    return NextResponse.json({ count: 0 }, { status: 500 });
  }
}
