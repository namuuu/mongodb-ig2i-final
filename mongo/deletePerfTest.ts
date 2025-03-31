
import { InsertManyResult } from "mongodb";
import { UserModel } from "../models/UserModel";
import { MongoClient } from "mongodb";
import * as faker from "../faker/fakerHandler";
import * as config from "../config/variables";
import timer from "../utils/timer";


export async function deletePerfTest(client: MongoClient) {
	let userBatchPerTest = [10000000];
	let results: { batchSize: number; meanTime: number }[] = [];
	let numberOfTest = 5
	for (const userBatch of userBatchPerTest) {
		const listUser: UserModel[] = faker.generateUsers(userBatch);
		const collection = client.db(config.DB_NAME).collection(config.COLLECTION_NAME);
		const testTimes: number[] = [];
		console.log(`Test with ${userBatch} users :`);
		for(let i = 0; i < numberOfTest; i++) {
			await collection.deleteMany({});
			const inserManyResult: InsertManyResult = await collection.insertMany(listUser);
			timer.start();
			await collection.deleteMany({});
			timer.stop();
			testTimes.push(timer.getDuration("ms"));
			console.log(`\tTest ${i + 1} : ${inserManyResult.insertedCount} documents were deleted in ${timer.getDuration("ms").toFixed(2)} ms`);
		}

		const mean = testTimes.reduce((a, b) => a + b, 0) / testTimes.length;
		results.push({ batchSize: userBatch, meanTime: mean });
	
		console.log(`\tMean time for ${userBatch} users: ${mean.toFixed(2)} ms`);
	}

	// Afficher les résultats sous forme de matrice
	console.log("Results :");
	console.table(results);
}