import dotenv from "dotenv";

dotenv.config();

export const config = {
  port: process.env.PORT || 3000,
  jwtSecret: process.env.JWT_SECRET || "jwt_secret",
  dbUri: process.env.DB_URI || "mongodb://localhost:27017/task-manager",
  rateLimiter: {
    windowMs: process.env.WINDOW_MS || 15 * 60 * 1000,
    max: process.env.RATE_LIMITER_MAX || 100,
    message:
      process.env.RATE_LIMITER_MESSAGE ||
      "Too many requests, please try again later.",
  },
  encryption: {
    salt: 10,
  },
  redis: {
    host: process.env.REDIS_HOST || "localhost",
    port: process.env.REDIS_PORT || "6379",
    url:
      process.env.REDIS_URL ||
      `redis://${process.env.REDIS_HOST || "localhost"}:${
        process.env.REDIS_PORT || "6379"
      }`,
    timeout: process.env.REDIS_TIMEOUT || 5000,
  },
  roles: { authorizedRoles: ["admin", "regular"] },
};
