import { updatePerfTest } from '../mongo/updatePerfTest';
import * as MongoManager from '../mongoManager'


const main = async () => {
	await MongoManager.execute(updatePerfTest);
}

main().catch(console.error).finally(() => {
	console.log("Finished");
});