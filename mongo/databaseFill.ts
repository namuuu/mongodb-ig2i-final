import { InsertManyResult } from "mongodb";
import * as MongoManager from "../mongoManager";
import * as faker from "../faker/fakerHandler";


export async function fillDatabase() {
    const listUser : MongoUser[] = faker.generateUsers(100);
    const collection = MongoManager.client.db("shard").collection("COLLEC_01");

    await collection.deleteMany({});

    const result: InsertManyResult = await collection.insertMany(listUser);

    console.log(`${result.insertedCount} documents were inserted`);

    MongoManager.close();
}