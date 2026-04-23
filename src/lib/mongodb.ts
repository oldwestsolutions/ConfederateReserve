import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

declare global {
  // eslint-disable-next-line no-var
  var mongooseCache: MongooseCache | undefined;
}

const g = global as unknown as { mongoose: MongooseCache };
const cache: MongooseCache = g.mongoose ?? { conn: null, promise: null };
if (!g.mongoose) g.mongoose = cache;

export async function connectDB(): Promise<typeof mongoose | null> {
  if (!MONGODB_URI) {
    return null;
  }
  if (cache.conn) return cache.conn;
  if (!cache.promise) {
    cache.promise = mongoose.connect(MONGODB_URI, {
      bufferCommands: false,
    });
  }
  try {
    cache.conn = await cache.promise;
  } catch (e) {
    cache.promise = null;
    throw e;
  }
  return cache.conn;
}

export function isDbConfigured(): boolean {
  return Boolean(MONGODB_URI);
}
