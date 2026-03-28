import { getRedis } from "@/lib/redis";

interface RateLimitResult {
  allowed: boolean;
  remaining: number;
  resetInSeconds: number;
}

/**
 * Sliding-window rate limiter using Upstash Redis.
 *
 * @param key    Unique key (e.g. `ratelimit:contact:<ip>`)
 * @param limit  Max requests allowed within the window
 * @param windowSeconds  Window duration in seconds
 */
export async function rateLimit(
  key: string,
  limit: number,
  windowSeconds: number
): Promise<RateLimitResult> {
  const redis = getRedis();
  const current = (await redis.get<number>(key)) ?? 0;

  if (current >= limit) {
    const ttl = await redis.ttl(key);
    return {
      allowed: false,
      remaining: 0,
      resetInSeconds: ttl > 0 ? ttl : windowSeconds,
    };
  }

  const pipe = redis.pipeline();
  pipe.incr(key);
  // Only set expiry if this is the first request in the window
  if (current === 0) {
    pipe.expire(key, windowSeconds);
  }
  await pipe.exec();

  return {
    allowed: true,
    remaining: limit - current - 1,
    resetInSeconds: windowSeconds,
  };
}
