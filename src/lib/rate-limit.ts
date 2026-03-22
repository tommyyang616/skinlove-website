// Rate Limiting via Upstash Redis
const REDIS_URL = process.env.UPSTASH_REDIS_REST_URL || "";
const REDIS_TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN || "";

async function redisCmd(cmd: string[]) {
  if (!REDIS_URL || !REDIS_TOKEN) return null;
  const res = await fetch(`${REDIS_URL}`, {
    method: "POST",
    headers: { Authorization: `Bearer ${REDIS_TOKEN}`, "Content-Type": "application/json" },
    body: JSON.stringify(cmd),
  });
  const data = await res.json();
  return data.result;
}

export async function checkRateLimit(key: string, maxRequests: number, windowSeconds: number): Promise<{ ok: boolean; remaining: number }> {
  const redisKey = `skinlove:rate:${key}`;
  const count = await redisCmd(["INCR", redisKey]);
  if (count === 1) await redisCmd(["EXPIRE", redisKey, String(windowSeconds)]);
  const remaining = Math.max(0, maxRequests - (count || 0));
  return { ok: (count || 0) <= maxRequests, remaining };
}
