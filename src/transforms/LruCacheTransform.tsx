import { createTransform } from "redux-persist";
import {
  deserializeLRUCache,
  serializeLRUCache,
} from "../utils/LruCacheSerializer";

const LRUCacheTransform = createTransform(
  (inboundState: any, key) => {
    const serializedCache = serializeLRUCache(inboundState.cache);
    return { ...inboundState, cache: serializedCache };
  },
  (outboundState: any, key) => {
    const deserializedCache = deserializeLRUCache(outboundState.cache);
    return { ...outboundState, cache: deserializedCache };
  },
  { whitelist: ["history"] }
);

export default LRUCacheTransform;
