import redis from "../config/RedisConfig.js";

// Use Singleton Pattern
class RedisService {
  private static instance: RedisService;

  private constructor() {}

  public static getInstance(): RedisService {
    if (!RedisService.instance) {
      RedisService.instance = new RedisService();
    }
    return RedisService.instance;
  }

  static createKey(name: string, filter: object): string {
    return `${name}:${JSON.stringify(filter)}`;
  }

  static async getDataInCache<T = any>(key: string): Promise<T | null> {
    const result = await redis.get(key);
    return result ? JSON.parse(result) : null;
  }
  static async doKeyAndCache<T>(
    name: string,
    filter: object,
    fetchFunction: () => Promise<T>,
    ttl = 300 // Cache time in seconds
  ): Promise<T> {
    const key = RedisService.createKey(name, filter);

    const cached = await RedisService.getDataInCache<T>(key);
    if (cached) {
      return cached;
    }

    const freshData = await fetchFunction();
    await redis.set(key, JSON.stringify(freshData), "EX", ttl);
    return freshData;
  }

  static async storeDataInCache<T>(key: string, data: T): Promise<void> {
    await redis.set(key, JSON.stringify(data));
  }

  /**
   * @name delKeysByPrefix
   * @param prefix
   * @description delete keys by prefix with pattern for ex:`name` -> `name:filter1:filter1...etc`
   */
  static async delKeysByPrefix(prefix: string) {
    const keys = await redis.keys(`${prefix}*`);
    if (keys.length > 0) {
      await redis.del(...keys);
    }
  }

  static async deleteDataInCache(key: string): Promise<number> {
    return await redis.del(key);
  }
}

export default RedisService;
