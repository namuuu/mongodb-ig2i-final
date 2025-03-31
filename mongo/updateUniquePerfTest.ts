
import { InsertManyResult } from "mongodb";
import { UserModel } from "../models/UserModel";
import { MongoClient } from "mongodb";
import * as fakerHandler from "../faker/fakerHandler";
import { faker } from '@faker-js/faker';
import * as config from "../config/variables";
import timer from "../utils/timer";



export async function updateUniquePerfTest(client: MongoClient) {
	// ça serait cool de faire de pouvoir le paramétrer
	let userBatchPerTest = [10000000];
	let results: { batchSize: number; meanTime: number }[] = [];
	let numberOfTest = 5
	for (const userBatch of userBatchPerTest) {
		const listUser: UserModel[] = fakerHandler.generateUsers(userBatch);
		const collection = client.db(config.DB_NAME).collection(config.COLLECTION_NAME);
		const testTimes: number[] = [];
		console.log(`Test with ${userBatch} users :`);
		await collection.deleteMany({});
		const inserManyResult: InsertManyResult = await collection.insertMany(listUser);
		for(let i = 0; i < numberOfTest; i++) {
			const index = Math.floor(listUser.length/2);
			timer.start();
			const updateResult = await collection.updateMany(
				{ id: listUser[index].id },
				{ $set: { nom: faker.person.lastName() } }
			);
			timer.stop();
			testTimes.push(timer.getDuration("ms"));
			console.log(`\tTest ${i + 1} : ${updateResult.modifiedCount} documents were updated in ${timer.getDuration("ms").toFixed(2)} ms`);
		}

		const mean = testTimes.reduce((a, b) => a + b, 0) / testTimes.length;
		results.push({ batchSize: userBatch, meanTime: mean });
	
		console.log(`\tMean time for ${userBatch} users: ${mean.toFixed(2)} ms`);
	}

	// Afficher les résultats sous forme de matrice
	console.log("Results :");
	console.table(results);
}