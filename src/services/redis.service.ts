import redis from "redis";
import logger from "../utils/logger";
import { config } from "../config/config";
import { createClient, RedisClientType } from "redis";

class RedisService {
  private client! : RedisClientType;

  constructor() {
    this.initializeClient();
  }

  private async initializeClient() {
    this.client = createClient({
      socket: {
        host: config.redis.host,
        port: parseInt(config.redis.port as string, 10),
        timeout: +config.redis.timeout, 
      },
    });

    // Handle connection errors
    this.client.on("error", (err :any) => {
        this.stopRedisClient();
        logger.error("Redis Client Error", err);
    });

    try {
      // Attempt to connect with a timeout
      await this.client.connect();
      logger.info("Connected to Redis");
    } catch (error) {
      const errorMessage = (error as Error).message;
      logger.error(
        "Failed to connect to Redis within the timeout period:",
        errorMessage
      );
    }
  }

  // Stop Redis client if unable to connect
  private stopRedisClient() {
    logger.info("Stopping Redis connection attempts");
    this.client.disconnect();
  }

  // Set a key with expiration (in seconds)
  async setex(key: string, value: string, seconds: number): Promise<void> {
    try {
      await this.client.set(key, value, { EX: seconds });
    } catch (err) {
        logger.error(`Error setting key ${key} in Redis:`, err);
      throw err;
    }
  }

  // Get a key's value
  async get(key: string): Promise<string | null> {
    try {
      return await this.client.get(key);
    } catch (err) {
        logger.error(`Error getting key ${key} from Redis:`, err);
      throw err;
    }
  }

  // Delete a key
  async del(key: string): Promise<void> {
    try {
      await this.client.del(key);
    } catch (err) {
      console.error(`Error deleting key ${key} from Redis:`, err);
      throw err;
    }
  }
}

export default new RedisService();
