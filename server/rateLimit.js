/* ==================================================================
   In-memory rate limiting

   Keyed by client IP. Suitable for a single-node deployment or for a
   small team behind one process. Swap for a shared store if the API
   is ever scaled horizontally.
   ================================================================== */

const buckets = new Map()

export function rateLimit(key, { windowMs, max }) {
  const now = Date.now()
  let bucket = buckets.get(key)

  if (!bucket || bucket.resetAt <= now) {
    bucket = { count: 0, resetAt: now + windowMs }
    buckets.set(key, bucket)
  }

  bucket.count += 1

  if (buckets.size > 10000) {
    for (const [mapKey, value] of buckets) {
      if (value.resetAt <= now) buckets.delete(mapKey)
    }
  }

  if (bucket.count > max) {
    return {
      allowed: false,
      retryAfter: Math.max(1, Math.ceil((bucket.resetAt - now) / 1000)),
    }
  }

  return { allowed: true, remaining: Math.max(0, max - bucket.count) }
}
