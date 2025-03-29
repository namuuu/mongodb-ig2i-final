import { MongoClient } from 'mongodb';
import moment from 'moment';

async function deleteUsers() {

    // Modifier pour faire différents tests
    const nb_delete: number = 10;

    // Connexion à MongoDB
    const client = new MongoClient("mongodb://localhost:32772");
    await client.connect();
    const db = client.db("shard");
    const users = db.collection("COLLEC_01");

    // Setup et lancement du timer
    moment.locale("fr");
    const start = moment();

    const documentsToDelete = await users.find().limit(nb_delete).toArray(); // Limite à 'limit' documents
    const result = await users.deleteMany({
        _id: { $in: documentsToDelete.map(doc => doc._id) }  // Supprime les documents par leur _id
    });

    // Fin du timer
    const end = moment();

    console.log(`${result.deletedCount} utilisateurs supprimés.`);
    console.log(`Suppression effectuée en ${end.diff(start, "milliseconds")} ms`);

    await client.close();
}

// Exécuter la fonction pour supprimer 100 utilisateurs
deleteUsers().catch(console.error);  // Limiter la suppression à 100 utilisateurs
