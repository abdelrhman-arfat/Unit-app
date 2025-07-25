import Redis from "ioredis";
import { REDIS_HOST, REDIS_PORT } from "../constants/ENV.js";

if (!REDIS_HOST || !REDIS_PORT) {
  throw new Error("REDIS_HOST or REDIS_PORT is not defined in .env");
}
const redis = new Redis({
  host: REDIS_HOST,
  port: Number(REDIS_PORT),
});

redis.on("connect", () => {
  console.log("✅ Connected to Redis");
});

redis.on("error", (err) => {
  console.error("❌ Redis connection error:", err);
});

export default redis;
