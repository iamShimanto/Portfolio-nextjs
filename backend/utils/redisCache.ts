import redis from "../config/redis";

type Json = string | number | boolean | null | Json[] | { [key: string]: Json };

function safeStringify(value: unknown): string {
  return JSON.stringify(value);
}

function safeParse<T>(value: string | null): T | null {
  if (value == null) return null;
  try {
    return JSON.parse(value) as T;
  } catch {
    return null;
  }
}

export async function setCache<T = unknown>(
  key: string,
  value: T,
  ttlSec: number = 3600,
): Promise<boolean> {
  try {
    const payload = safeStringify(value);

    if (ttlSec && ttlSec > 0) {
      // SET key value EX ttlSec
      await redis.set(key, payload, "EX", ttlSec);
    } else {
      await redis.set(key, payload);
    }
    return true;
  } catch (err) {
    console.error("setCache error:", err);
    return false;
  }
}

export async function getCache<T = unknown>(key: string): Promise<T | null> {
  try {
    const data = await redis.get(key);
    return safeParse<T>(data);
  } catch (err) {
    console.error("getCache error:", err);
    return null;
  }
}

export async function delCache(key: string): Promise<boolean> {
  try {
    await redis.del(key);
    return true;
  } catch (err) {
    console.error("delCache error:", err);
    return false;
  }
}

export async function existsCache(key: string): Promise<boolean> {
  try {
    const n = await redis.exists(key);
    return n === 1;
  } catch {
    return false;
  }
}

export async function delCacheByPrefix(
  prefix: string,
  options: { batchSize?: number } = {},
): Promise<number> {
  const batchSize = options.batchSize ?? 200;
  let cursor = "0";
  let deleted = 0;

  try {
    do {
      const res = await redis.scan(
        cursor,
        "MATCH",
        `${prefix}*`,
        "COUNT",
        String(batchSize),
      );

      cursor = res[0];
      const keys = res[1] ?? [];
      if (keys.length) {
        deleted += await redis.del(...keys);
      }
    } while (cursor !== "0");

    return deleted;
  } catch (err) {
    console.error("delCacheByPrefix error:", err);
    return deleted;
  }
}
