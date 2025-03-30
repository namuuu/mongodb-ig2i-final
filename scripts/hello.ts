
import * as config from "../config/variables";

function main()
{
    console.log("Hello, World!");
    console.log("Env : {");
    console.log(`\tMONGO_URI : ${config.MONGOS_URI}`);
    console.log(`\tDB_NAME : ${config.DB_NAME}`);
    console.log(`\tCOLLECTION_NAME : ${config.COLLECTION_NAME}`);
    console.log("}");
}

main();