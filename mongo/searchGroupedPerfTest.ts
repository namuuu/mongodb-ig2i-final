
import { InsertManyResult } from "mongodb";
import { UserModel } from "../models/UserModel";
import { MongoClient } from "mongodb";
import * as faker from "../faker/fakerHandler";
import * as config from "../config/variables";
import timer from "../utils/timer";


export async function searchGroupedPerfTest(client: MongoClient) {
	// ça serait cool de faire de pouvoir le paramétrer
	let userBatchPerTest = [config.BATCH_SIZE];
	let results: { batchSize: number; meanTime: number }[] = [];
	let numberOfTest = config.NB_TEST;
	for (const userBatch of userBatchPerTest) {
		console.log(`Test with ${userBatch} users :`);
		const listUser: UserModel[] = faker.generateUsers(userBatch);
		const collection = client.db(config.DB_NAME).collection(config.COLLECTION_NAME);
		const testTimes: number[] = [];
		await collection.deleteMany({});
		const inserManyResult: InsertManyResult = await collection.insertMany(listUser);
		for(let i = 0; i < numberOfTest; i++) {
			timer.start();
			const cursor = collection.find({ nom: { $regex: /a/ } });
			timer.stop();
			testTimes.push(timer.getDuration("ms"));
			const result = await cursor.toArray();
			console.log(`\tTest ${i + 1} : Found ${result.length} documents in ${timer.getDuration("ms").toFixed(2)} ms`);
		}

		const mean = testTimes.reduce((a, b) => a + b, 0) / testTimes.length;
		results.push({ batchSize: userBatch, meanTime: mean });
	
		console.log(`\tMean time for ${userBatch} users: ${mean.toFixed(2)} ms`);
	}

	// Afficher les résultats sous forme de matrice
	console.log("Results :");
	console.table(results);
}