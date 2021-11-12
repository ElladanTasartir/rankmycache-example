import { Injectable } from '@nestjs/common';
import { RankMyCache, CacheProviders } from 'rankmycache';
import { cache } from '../../config';

@Injectable()
export class CacheService {
  private cacheClient: RankMyCache;

  constructor() {
    this.cacheClient = new RankMyCache({
      ...cache,
      type: CacheProviders.IOREDIS,
    });
  }

  async get<T>(key: string): Promise<T> {
    const cachedResponse = await this.cacheClient.get<T>(key);
    cachedResponse && console.log('fui de cache');
    return cachedResponse;
  }

  set<T>(key: string, data: T): Promise<void> {
    console.log('settar o cache');
    return this.cacheClient.set(key, data);
  }

  delete(key: string): Promise<void> {
    console.log('deletar o cache');
    return this.cacheClient.delete(key);
  }
}
