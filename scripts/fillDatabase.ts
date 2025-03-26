import * as MongoManager from '../mongoManager'

function main() {
    MongoManager.connect()

    MongoManager.fill.fillDatabase();
}

main();