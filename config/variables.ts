
import "dotenv/config";

export const MONGOS_URI = process.env.MONGOS_URI || "mongodb://localhost:27017";
export const DB_NAME = process.env.DB_NAME || "shard";
export const COLLECTION_NAME = process.env.COLLECTION_NAME || "COLLECT_1"
