import { searchGroupedPerfTest } from '../mongo/searchGroupedPerfTest';
import * as MongoManager from '../mongoManager'


const main = async () => {
	await MongoManager.execute(searchGroupedPerfTest);
}

main().catch(console.error).finally(() => {
	console.log("Finished");
});