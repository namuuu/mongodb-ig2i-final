import { MongoClient } from "mongodb";
import { connect, close } from "./config/database";
import { fillDatabase } from "./mongo/databaseFill";
import { insertPerfTest } from "./mongo/insertPerfTest";
import { shardStatus } from "./mongo/shardStatus";


export const fill = async () => {
	const client = await connect();
	await fillDatabase(client);
	await close();
}

export const insertTest = async () => {
	const client = await connect();
	await insertPerfTest(client);
	await close();
}

export const getShardStatus = async () => {
	const client = await connect();
	await shardStatus(client);
	await close();
}

export const execute = async (callback: (client: MongoClient) => Promise<void>) => {
	const client = await connect();
	await callback(client);
	await close();
};

