
import * as MongoManager from '../mongoManager'

const main = async () => {
	await MongoManager.getShardStatus();
}

main().catch(console.error).finally(() => { console.log("Finished"); });