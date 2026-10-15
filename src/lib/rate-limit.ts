const hits = new Map<string, { count: number; reset: number }>();

export function rateLimit(key: string, limit = 8, windowMs = 60_000) {
  const now = Date.now();
  const row = hits.get(key);
  if (!row || now > row.reset) {
    hits.set(key, { count: 1, reset: now + windowMs });
    return { ok: true, remaining: limit - 1 };
  }
  if (row.count >= limit) return { ok: false, remaining: 0 };
  row.count += 1;
  return { ok: true, remaining: limit - row.count };
}
