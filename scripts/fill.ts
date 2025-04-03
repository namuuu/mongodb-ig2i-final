import * as MongoManager from '../mongoManager'


const main = async () => {
    await MongoManager.fill();
}

main().catch(console.error);