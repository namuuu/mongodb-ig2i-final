import { MongoClient } from 'mongodb';
import moment from 'moment';

async function createUser() {
    // Modifier pour faire différents tests
    const nb_insert: number = 100;
    
    // NB : Changer le port si besoin (27017 par défaut)
    const client = new MongoClient("mongodb://localhost:32772");
    await client.connect();
    const db = client.db("shard");
    const users = db.collection("COLLEC_01");

    // Setup et lancement du timer
    moment.locale("fr");
    const start = moment();

    // Insertion de nb_insert lignes
    for (let i = 0; i < nb_insert; i++) {
        const newUser = {
            id: i + 100,
            name: `newUser${i}`,
        };
        await users.insertOne(newUser);
    }

    // Fin du timer
    const end = moment();
    console.log(`Insertion de ${nb_insert} lignes effectuée(s) en ${end.diff(start, "milliseconds")} ms`);

    await client.close();
}

// Exécuter la fonction
createUser().catch(console.error);
