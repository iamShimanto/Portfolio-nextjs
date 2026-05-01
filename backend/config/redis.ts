import Redis from "ioredis";
import { env } from "./envConfig";

const redis = new Redis(env.REDIS_URL, {
  maxRetriesPerRequest: 3,
  enableReadyCheck: true,
  lazyConnect: false,

  reconnectOnError(error) {
    const targetErrors = ["READONLY", "ETIMEDOUT", "ECONNRESET"];
    return targetErrors.some((targetError) =>
      error.message.includes(targetError),
    );
  },
});

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
