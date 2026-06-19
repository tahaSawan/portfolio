import {
  RATE_LIMIT_MAX_REQUESTS,
  RATE_LIMIT_WINDOW_MS,
} from "@/lib/rag/config";

type Bucket = {
  count: number;
  resetAt: number;
};

const globalStore = globalThis as unknown as {
  ragRateLimitBuckets?: Map<string, Bucket>;
};

function buckets(): Map<string, Bucket> {
  if (!globalStore.ragRateLimitBuckets) {
    globalStore.ragRateLimitBuckets = new Map();
  }
  return globalStore.ragRateLimitBuckets;
}

export type RateLimitResult =
  | { ok: true; remaining: number }
  | { ok: false; retryAfterSec: number };

export function checkRateLimit(key: string): RateLimitResult {
  const now = Date.now();
  const map = buckets();
  const existing = map.get(key);

  if (!existing || now >= existing.resetAt) {
    map.set(key, {
      count: 1,
      resetAt: now + RATE_LIMIT_WINDOW_MS,
    });
    return { ok: true, remaining: RATE_LIMIT_MAX_REQUESTS - 1 };
  }

  if (existing.count >= RATE_LIMIT_MAX_REQUESTS) {
    const retryAfterSec = Math.ceil((existing.resetAt - now) / 1_000);
    return { ok: false, retryAfterSec };
  }

  existing.count += 1;
  return { ok: true, remaining: RATE_LIMIT_MAX_REQUESTS - existing.count };
}

export function clientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    return forwarded.split(",")[0]?.trim() ?? "unknown";
  }
  return request.headers.get("x-real-ip") ?? "unknown";
}
