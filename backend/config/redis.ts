import Redis from "ioredis";
import { env } from "./envConfig";

const createNoopRedis = () => {
  const noop = async () => null;

  return {
    eval: async () => [0, 0, 0] as [number, number, number],
    set: async () => "OK",
    get: async () => null,
    del: async () => 0,
    exists: async () => 0,
    scan: async () => ["0", []] as [string, string[]],
    ping: async () => "PONG",
    on: () => undefined,
    connect: noop,
    disconnect: noop,
  } as unknown as Redis;
};

const redis = env.REDIS_URL
  ? new Redis(env.REDIS_URL, {
      maxRetriesPerRequest: null,
      enableReadyCheck: true,
      lazyConnect: false,

      reconnectOnError(error) {
        const targetErrors = ["READONLY", "ETIMEDOUT", "ECONNRESET"];
        return targetErrors.some((targetError) =>
          error.message.includes(targetError),
        );
      },
    })
  : createNoopRedis();

if (!env.REDIS_URL) {
  console.warn("REDIS_URL is not set. Using a no-op Redis client.");
}

redis.on("connect", () => {
  console.log("Redis connected");
});

redis.on("ready", () => {
  console.log("Redis ready");
});

redis.on("error", (err) => {
  console.error("Redis error:", err.message);
});

redis.on("close", () => {
  console.warn("Redis connection closed");
});

export default redis;
