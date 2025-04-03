import { InsertManyResult } from "mongodb";
import { UserModel } from "../models/UserModel";
import { MongoClient } from "mongodb";
import * as faker from "../faker/fakerHandler";
import * as config from "../config/variables";
import timer from "../utils/timer";

export async function fillDatabase(client: MongoClient) {
    const listUser : UserModel[] = faker.generateUsers(100);
    const collection = client.db(config.DB_NAME).collection(config.COLLECTION_NAME);
    
    timer.start();
    await collection.deleteMany({});
    timer.stop();
    console.log(`Delete operation took ${timer.getDuration("ms")} ms`);

    timer.start();
    const result: InsertManyResult = await collection.insertMany(listUser);
    timer.stop();
    console.log(`${result.insertedCount} documents were inserted in ${timer.getDuration("ms")} ms`);
}