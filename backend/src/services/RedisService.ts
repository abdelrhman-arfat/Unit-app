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

  createKey(name: string, filter: object): string {
    return `${name}:${JSON.stringify(filter)}`;
  }

  async getDataInCache<T = any>(key: string): Promise<T | null> {
    const result = await redis.get(key);
    return result ? JSON.parse(result) : null;
  }
  async doKeyAndCache<T>(
    name: string,
    filter: object,
    fetchFunction: () => Promise<T>,
    ttl = 300 // Cache time in seconds
  ): Promise<T> {
    const key = this.createKey(name, filter);

    const cached = await this.getDataInCache<T>(key);
    if (cached) return cached;

    const freshData = await fetchFunction();
    await redis.set(key, JSON.stringify(freshData), "EX", ttl);

    return freshData;
  }

  async storeDataInCache<T>(key: string, data: T): Promise<void> {
    await redis.set(key, JSON.stringify(data));
  }

  async deleteDataInCache(key: string): Promise<number> {
    return await redis.del(key);
  }
}

export default RedisService.getInstance();
