import type { Request, Response, NextFunction, RequestHandler } from "express";
import redis from "../config/redis";

type RateLimitOptions = {
  limit: number;
  windowSec: number;
  keyPrefix?: string;
  keyGenerator?: (req: Request) => string;
  message?: string;
  statusCode?: number;
  setHeaders?: boolean;
};

const LUA_SLIDING_WINDOW = `
local current_key  = KEYS[1]
local previous_key = KEYS[2]
local limit        = tonumber(ARGV[1])
local window       = tonumber(ARGV[2])
local now          = tonumber(ARGV[3])

local current_count  = tonumber(redis.call("GET", current_key) or "0")
local previous_count = tonumber(redis.call("GET", previous_key) or "0")

local current_window_start = math.floor(now / window) * window
local elapsed = now - current_window_start
local weight  = math.max(0, 1 - (elapsed / window))

local estimated = math.floor(previous_count * weight) + current_count

if estimated >= limit then
  local ttl = redis.call("TTL", current_key)
  if ttl < 0 then ttl = window end
  return { 1, estimated, ttl }
end

redis.call("INCR", current_key)
redis.call("EXPIRE", current_key, window * 2)

local ttl = redis.call("TTL", current_key)
if ttl < 0 then ttl = window end

return { 0, estimated + 1, ttl }
`;

function getClientIp(req: Request): string {
  return req.ip || req.socket.remoteAddress || "unknown";
}

function getRouteKey(req: Request): string {
  if (req.route?.path) {
    return `${req.baseUrl}${req.route.path}`;
  }
  return `${req.baseUrl}${req.path}`;
}

function getWindowKeys(
  prefix: string,
  route: string,
  id: string,
  windowSec: number,
): { currentKey: string; previousKey: string } {
  const now = Math.floor(Date.now() / 1000);
  const currentWindow = Math.floor(now / windowSec);
  const previousWindow = currentWindow - 1;

  return {
    currentKey: `${prefix}:${route}:${id}:${currentWindow}`,
    previousKey: `${prefix}:${route}:${id}:${previousWindow}`,
  };
}

export function rateLimit(options: RateLimitOptions): RequestHandler {
  const {
    limit,
    windowSec,
    keyPrefix = "rl",
    keyGenerator,
    message = "Too many requests. Please try again later.",
    statusCode = 429,
    setHeaders = true,
  } = options;

  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = keyGenerator ? keyGenerator(req) : getClientIp(req);
      const route = getRouteKey(req);
      const { currentKey, previousKey } = getWindowKeys(
        keyPrefix,
        route,
        id,
        windowSec,
      );

      const now = Math.floor(Date.now() / 1000);

      const result = (await redis.eval(
        LUA_SLIDING_WINDOW,
        2,
        currentKey,
        previousKey,
        limit.toString(),
        windowSec.toString(),
        now.toString(),
      )) as [number, number, number];

      const blocked = result[0] === 1;
      const count = result[1];
      const ttl = result[2] <= 0 ? windowSec : result[2];
      const remaining = Math.max(0, limit - count);

      if (setHeaders) {
        res.setHeader("X-RateLimit-Limit", String(limit));
        res.setHeader("X-RateLimit-Remaining", String(remaining));
        res.setHeader(
          "X-RateLimit-Reset",
          String(Math.floor(Date.now() / 1000) + ttl),
        );
        res.setHeader("Retry-After", String(ttl));
      }

      if (blocked) {
        res.status(statusCode).json({
          success: false,
          message,
          retryAfterSec: ttl,
        });
        return;
      }

      next();
    } catch (err) {
      console.error("rateLimit error:", err);
      next();
    }
  };
}
