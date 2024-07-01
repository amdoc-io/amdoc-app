import { LRUCache } from "lru-cache";
import { LRUCacheType } from "../model/CacheModel";
import { cacheOptions } from "../config/CacheConfig";

export const serializeLRUCache = (
  cache: LRUCacheType | undefined
): { key: any; value: any }[] => {
  if (!cache) return [];
  const arr: { key: any; value: any }[] = [];
  cache.forEach((value, key) => {
    arr.push({ key, value });
  });
  return arr.reverse();
};

export const deserializeLRUCache = (
  entries: { key: any; value: any }[] | undefined
) => {
  const cache = new LRUCache<string, string | number>(cacheOptions);
  if (entries) {
    entries.forEach((item) => {
      const { key, value } = item || {};
      cache.set(key, value);
    });
  }
  return cache;
};
