
import "dotenv/config";

export const MONGOS_URI = process.env.MONGOS_URI || "mongodb://localhost:27017";
export const DB_NAME = process.env.DB_NAME || "shard";
export const COLLECTION_NAME = process.env.COLLECTION_NAME || "COLLECT_1"
export const BATCH_SIZE = process.env.BATCH_SIZE ? parseInt(process.env.BATCH_SIZE) : 10000;
export const NB_TEST = process.env.NB_TEST ? parseInt(process.env.NB_TEST) : 5;
