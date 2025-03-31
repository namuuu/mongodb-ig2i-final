
import { InsertManyResult } from "mongodb";
import { UserModel } from "../models/UserModel";
import { MongoClient } from "mongodb";
import * as faker from "../faker/fakerHandler";
import * as config from "../config/variables";
import timer from "../utils/timer";


export async function insertPerfTest(client: MongoClient) {
	// ça serait cool de faire de pouvoir le paramétrer
	let userBatchPerTest = [config.BATCH_SIZE];
	let results: { batchSize: number; meanTime: number }[] = [];
	let numberOfTest = config.NB_TEST;
	for (const userBatch of userBatchPerTest) {
		const listUser: UserModel[] = faker.generateUsers(userBatch);
		const collection = client.db(config.DB_NAME).collection(config.COLLECTION_NAME);
		const testTimes: number[] = [];
		console.log(`Test with ${userBatch} users :`);
		for(let i = 0; i < numberOfTest; i++) {
			await collection.deleteMany({});
			timer.start();
			const inserManyResult: InsertManyResult = await collection.insertMany(listUser);
			timer.stop();
			testTimes.push(timer.getDuration("ms"));
			console.log(`\tTest ${i + 1} : ${inserManyResult.insertedCount} documents were inserted in ${timer.getDuration("ms").toFixed(2)} ms`);
		}

		const mean = testTimes.reduce((a, b) => a + b, 0) / testTimes.length;
		results.push({ batchSize: userBatch, meanTime: mean });
	
		console.log(`\tMean time for ${userBatch} users: ${mean.toFixed(2)} ms`);
	}

	// Afficher les résultats sous forme de matrice
	console.log("Results :");
	console.table(results);

	/*
	const collection = client.db(config.DB_NAME).collection(config.COLLECTION_NAME);

	// ça serait cool de faire de pouvoir le paramétrer
	let batchsizes = [100, 1000, 5000, 10000];
	let numberOfTest = 5
	let listUser: UserModel[] = [];

	let results: { batchSize: number; meanTime: number }[] = [];

	const benchmark = new Benchmark(batchsizes, numberOfTest);

	benchmark.setBeforeEachTest(async (batchSize) => {
		collection.deleteMany({});
		listUser = faker.generateUsers(batchSize);
	});

	benchmark.setExecuteTest(async (batchSize) => {
		const inserManyResult: InsertManyResult = await collection.insertMany(listUser);
	});
	benchmark.setName("Insert Performance Test");

	const benchmarkResults = await benchmark.launch();
	*/
}