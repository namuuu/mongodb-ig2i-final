import { MongoClient } from "mongodb";
import * as config from "./variables";

const client = new MongoClient(config.MONGOS_URI);

export const connect = async () => {
    await client.connect();
    console.log(`Connected to ${config.MONGOS_URI}`);
    return client;
};

export const close = async () => {
  await client.close();
  console.log(`Connection closed`);
};