import { deletePerfTest } from '../mongo/deletePerfTest';
import * as MongoManager from '../mongoManager'


const main = async () => {
	await MongoManager.execute(deletePerfTest);
}

main().catch(console.error).finally(() => {
	console.log("Finished");
});