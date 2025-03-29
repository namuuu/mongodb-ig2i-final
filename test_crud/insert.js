const { MongoClient } = require("mongodb");
const moment = require('moment');

async function createUser() {
    // Modifier pour faire des différents tests
    let nb_insert = 100;
    // NB : Changer le port si besoin (27017 par défaut)
    const client = new MongoClient("mongodb://localhost:27017");
    await client.connect();
    const db = client.db("test_db");
    const users = db.collection("users");

    // Setup et lancement du timer
    moment.locale('fr');
    const start = moment();

    for(let i = 0; i < nb_insert; i++) {
        const newUser = {
            id: (i+100),
            name: "newUser" + i,
        };
        await users.insertOne(newUser);
    }

    // Fin du timer
    const end = moment();

    console.log("Insertion de " + nb_insert + " lignes effectuée(s) en " + end.diff(start, 'milliseconds') + " ms");

    await client.close();
}

createUser().catch(console.error);
