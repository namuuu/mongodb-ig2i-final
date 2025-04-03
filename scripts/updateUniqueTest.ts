import { updatePerfTest } from '../mongo/updatePerfTest';
import { updateUniquePerfTest } from '../mongo/updateUniquePerfTest';
import * as MongoManager from '../mongoManager'


const main = async () => {
	await MongoManager.execute(updateUniquePerfTest);
}

main().catch(console.error).finally(() => {
	console.log("Finished");
});