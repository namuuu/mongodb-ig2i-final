import { searchUniquePerfTest } from '../mongo/searchUniquePerfTest';
import * as MongoManager from '../mongoManager'


const main = async () => {
	await MongoManager.execute(searchUniquePerfTest);
}

main().catch(console.error).finally(() => {
	console.log("Finished");
});