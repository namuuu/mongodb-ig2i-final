
import { MongoClient } from "mongodb";
import * as faker from "../faker/fakerHandler";

export async function shardStatus(client: MongoClient) {
	const configDb = client.db("config");
	const shardsCollection = configDb.collection("shards");
	const shards = await shardsCollection.find({}).toArray();

	console.log("Shards:");
	for (const shard of shards) {
		console.log(`[${shard.state ? "ACTIVE" : "INACTIVE"}] ${shard.host}`);
	}
	const collectionsCollection = configDb.collection("collections");
	const collections = await collectionsCollection.find({}).toArray();
}