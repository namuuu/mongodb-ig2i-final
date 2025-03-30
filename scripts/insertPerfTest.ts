import * as MongoManager from '../mongoManager'


const main = async () => {
	await MongoManager.insertTest();
}

main().catch(console.error).finally(() => {
	console.log("Finished");
});